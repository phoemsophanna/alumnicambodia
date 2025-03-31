import { useRootContext } from "@/context/context";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, Image, Modal, Row, Spinner } from "react-bootstrap";
import BrandLogo from "../../assets/images/cda-logo.png";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useGoogleLogin } from "@react-oauth/google";
import { postData } from "src/tools/api";
import { validateEmail } from "src/tools/validation";
import Cookies from "js-cookie";
import axios from "axios";
import { auth } from "../../../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import OtpInput from "react-otp-input";
import * as Yup from "yup";
import { useRouter } from "next/router";

const LoginModal = () => {
	const router = useRouter();
	const [type, setType] = useState("password");
	const [icon, setIcon] = useState("fa-eye-slash");
	const [type1, setType1] = useState("password");
	const [icon1, setIcon1] = useState("fa-eye-slash");
	const [type2, setType2] = useState("password");
	const [icon2, setIcon2] = useState("fa-eye-slash");
	const [type3, setType3] = useState("password");
	const [icon3, setIcon3] = useState("fa-eye-slash");
	const [type4, setType4] = useState("password");
	const [icon4, setIcon4] = useState("fa-eye-slash");
	const [message, setMessage] = useState(null);
	const [forgetPassMessage, setForgetPassMessage] = useState(null);
	const [phone, setPhone] = useState("");
	const { loginModal, toggleLogin, toggleLoginSuccess, updateUserCache } = useRootContext();
	const [modalTitle, setModalTitle] = useState("SIGN_IN");
	const [isLoading, setLoading] = useState(false);
	const [isOtpLoading, setOtpLoading] = useState(false);
	const [registerMsg, setRegisterMsg] = useState("");

	const loginSubmit = useFormik({
		initialValues: {
			userLogin: "",
			userAuth: "",
			loginWith: 1,
		},
		onSubmit: async (values) => {
			setLoading(true);
			if (validateEmail(values.userLogin)) {
				values.loginWith = 2;
			} else {
				values.loginWith = 1;
			}

			await postData("/auth/login-web", values).then((data) => {
				if (data.status == "success") {
					toggleLoginSuccess(true);
					toggleLogin(false);
					updateUserCache(data.data);
					Cookies.set("TOKEN", data.token);
					Cookies.set("USER", JSON.stringify(data.data));
				} else {
					setMessage(data.message);
				}
				setLoading(false);
			});
			console.log(response);
		},
	});

	const registerSubmit = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
			loginWith: 1,
			isAgree: 0,
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("First Name is required"),
			lastName: Yup.string().required("Last Name is required"),
			password: Yup.string().required("Password is required").min(6),
			confirmPassword: Yup.string()
				.required("Confirm password is required")
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.min(6),
		}),
		onSubmit: async (values) => {
			console.log(values);
			values.phoneNumber = values.loginWith == 1 ? phone : "";
			values.email = values.loginWith == 2 ? values.email : "";
			if (values.loginWith == 1) {
				// onSignup();
				onSignupWithPhone();
			} else {
				onSignupWithEmail();
			}
		},
	});

	const verifyAccountForm = useFormik({
		initialValues: {
			userLogin: "",
			loginWith: 1,
		},
		onSubmit: async (values) => {
			setLoading(true);
			if (validateEmail(values.userLogin)) {
				values.loginWith = 2;
			} else {
				values.loginWith = 1;
			}

			await postData("/auth/check-account", values)
				.then(async (data) => {
					if (data.status == "success") {
						if (values.loginWith === 2) {
							await postData("/auth/send-code", { email: values.userLogin })
								.then((data) => {
									if (data.status == "success") {
										setShowForgetPassOTP(true);
									}
								})
								.catch((e) => console.error(e));
						} else {
							// onForgetPassword(`+855${values.userLogin}`);
							await postData("/auth/send-phone-code", { phoneNumber: `+855${values.userLogin?.slice(1)}`, verifyType: "FORGET_PASSWORD" })
								.then((data) => {
									if (data.status == "success") {
										setShowForgetPassOTP(true);
									}
								})
								.catch((e) => console.error(e));
						}
						setForgetPassMessage("");
					} else {
						setForgetPassMessage(data.message);
					}
					setLoading(false);
				})
				.finally(() => {
					setLoading(false);
				});
		},
	});

	const forgotSubmit = useFormik({
		initialValues: {
			username: "",
			password: "",
			confirmPassword: "",
			userLogin: 1
		},
		validationSchema: Yup.object({
			password: Yup.string().required("Password is required").min(6),
			confirmPassword: Yup.string()
				.required("Confirm password is required")
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.min(6),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			if (validateEmail(values.username)) {
				values.loginWith = 2;
			} else {
				values.loginWith = 1;
			}
			await postData("/auth/forget-pass", values)
				.then(async (data) => {
					if (data.status == "success") {
						setForgetPassMessage("");
						setModalTitle("SIGN_IN");
					} else {
						setForgetPassMessage(data.message);
					}
				})
				.catch((e) => {
					console.error(e);
				})
				.finally(() => {
					setLoading(false);
				});
		},
	});

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			setLoading(true);
			await axios
				.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
					headers: {
						Authorization: `Bearer ${tokenResponse.access_token}`,
						Accept: "application/json",
					},
				})
				.then(async (response) => {
					await postData("/auth/google-auth", {
						firstName: response.data?.given_name,
						lastName: response.data?.family_name,
						email: response.data?.email,
						phoneNumber: "",
						loginWith: 2,
						image: response.data?.picture,
					}).then((data) => {
						console.log(data);
						if (data.status == "success") {
							toggleLogin(false);
							toggleLoginSuccess(true);
							updateUserCache(data.data);
							Cookies.set("TOKEN", data.token);
							Cookies.set("USER", JSON.stringify(data.data));
						} else {
							setMessage(data.message);
						}
					});
				})
				.catch((err) => {
					console.error("Error: " + err);
				})
				.finally(() => {
					setLoading(false);
				});
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const [otp, setOtp] = useState("");
	const [showOTP, setShowOTP] = useState(false);
	const [showForgetPassOTP, setShowForgetPassOTP] = useState(false);

	function onCaptchVerify() {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
				size: "invisible",
				callback: (response) => {
					onSignup();
				},
			});
		}
	}

	function onSignup() {
		setLoading(true);
		onCaptchVerify();

		const appVerifier = window.recaptchaVerifier;

		signInWithPhoneNumber(auth, phone, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setShowOTP(true);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function onCaptchVerifyForget() {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container-2", {
				size: "invisible",
				callback: (response) => {
					onForgetPassword();
				},
			});
		}
	}

	function onForgetPassword(phonNumber) {
		setLoading(true);
		onCaptchVerifyForget();
		 

		const appVerifier = window.recaptchaVerifier;

		signInWithPhoneNumber(auth, phonNumber, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setShowForgetPassOTP(true);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
		
	}

	function onOTPVerify() {
		setOtpLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (res) => {
				setOtpLoading(false);
				setShowOTP(false);
				setLoading(true);
				await postData("/auth/register-web", registerSubmit.values)
					.then((data) => {
						if (data.status == "success") {
							setModalTitle("SIGN_IN");
							registerSubmit.resetForm();
						} else {
							setMessage(data.message);
						}
						setLoading(false);
					})
					.catch((e) => setLoading(false));
			})
			.catch((err) => {
				console.log(err);
				setMessage("Verify code is incorrect");
				setOtpLoading(false);
			});
	}

	function onOTPVerifyForgetPass() {
		setOtpLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (res) => {
				setShowForgetPassOTP(false);
			})
			.catch((err) => {
				console.log(err);
			}).finally(() => {
				setOtpLoading(false);
			});
	}

	const onSignupWithPhone = async () => {
		setLoading(true);
		await postData("/auth/send-phone-code", { phoneNumber: registerSubmit.values?.phoneNumber, verifyType: "REGISTER" })
			.then((data) => {
				if (data.status == "success") {
					setLoading(false);
					setShowOTP(true);
				} else {
					setRegisterMsg(data.message);
				}
				setLoading(false);
			})
			.catch((e) => setLoading(false));
	};

	const onOTPVerifyPhone = async () => {
		setOtpLoading(true);
		await postData("/auth/verify-phone-code", { phoneNumber: registerSubmit.values?.phoneNumber, verificationCode: otp })
			.then(async (data) => {
				if (data.status == "success") {
					setLoading(true);
					setShowOTP(false);
					await postData("/auth/register-web", registerSubmit.values)
						.then((data) => {
							if (data.status == "success") {
								setModalTitle("SIGN_IN");
								registerSubmit.resetForm();
							} else {
								setMessage(data.message);
							}
							setLoading(false);
						})
						.catch((e) => setLoading(false));
				} else {
					setMessage(data.message);
				}
				setOtpLoading(false);
			})
			.catch((e) => setOtpLoading(false));
	};

	const onSignupWithEmail = async () => {
		setLoading(true);
		await postData("/auth/send-code", { email: registerSubmit.values?.email })
			.then((data) => {
				if (data.status == "success") {
					setLoading(false);
					setShowOTP(true);
				} else {
					setMessage(data.message);
				}
				setLoading(false);
			})
			.catch((e) => setLoading(false));
	};

	const onOTPVerifyEmail = async () => {
		setOtpLoading(true);
		await postData("/auth/verify-code", { email: registerSubmit.values?.email, code: otp })
			.then(async (data) => {
				if (data.status == "success") {
					setLoading(true);
					setShowOTP(false);
					await postData("/auth/register-web", registerSubmit.values)
						.then((data) => {
							if (data.status == "success") {
								setModalTitle("SIGN_IN");
								registerSubmit.resetForm();
							} else {
								setMessage(data.message);
							}
							setLoading(false);
						})
						.catch((e) => setLoading(false));
				} else {
					setMessage(data.message);
				}
				setOtpLoading(false);
			})
			.catch((e) => setOtpLoading(false));
	};

	const onOtpVerifyEmailForgotPass = async () => {
		setOtpLoading(true);
		await postData("/auth/verify-code", { email: verifyAccountForm.values?.userLogin, code: otp })
			.then(async (data) => {
				if (data.status == "success") {
					setShowForgetPassOTP(false);
					setModalTitle("FORGET_PASSWORD");
					forgotSubmit.values?.username = verifyAccountForm.values?.userLogin;
				} else {
					setMessage(data.message);
				}
			})
			.catch((e) => {
				console.error(e);
			}).finally(() => {
				setOtpLoading(false);
			});
	}
	const onOtpVerifyPhoneForgotPass = async () => {
		setOtpLoading(true);
		await postData("/auth/verify-phone-code", { phoneNumber: `+855${verifyAccountForm.values?.userLogin?.slice(1)}`, verificationCode: otp })
			.then(async (data) => {
				if (data.status == "success") {
					setShowForgetPassOTP(false);
					setModalTitle("FORGET_PASSWORD");
					forgotSubmit.values?.username = verifyAccountForm.values?.userLogin;
				} else {
					setMessage(data.message);
				}
			})
			.catch((e) => {
				console.error(e);
			}).finally(() => {
				setOtpLoading(false);
			});
	}

	const handleToggle = () => {
		if (type === "password") {
			setIcon("fa-eye");
			setType("text");
		} else {
			setIcon("fa-eye-slash");
			setType("password");
		}
	};
	const handleToggle1 = () => {
		if (type1 === "password") {
			setIcon1("fa-eye");
			setType1("text");
		} else {
			setIcon1("fa-eye-slash");
			setType1("password");
		}
	};
	const handleToggle2 = () => {
		if (type2 === "password") {
			setIcon2("fa-eye");
			setType2("text");
		} else {
			setIcon2("fa-eye-slash");
			setType2("password");
		}
	};
	const handleToggle3 = () => {
		if (type3 === "password") {
			setIcon3("fa-eye");
			setType3("text");
		} else {
			setIcon3("fa-eye-slash");
			setType3("password");
		}
	};
	const handleToggle4 = () => {
		if (type4 === "password") {
			setIcon4("fa-eye");
			setType4("text");
		} else {
			setIcon4("fa-eye-slash");
			setType4("password");
		}
	};

	useEffect(() => {
		console.log("Init");
		return () => {
			console.log("Out");
		};
	}, [modalTitle]);

	return (
		<Modal show={loginModal} onHide={() => toggleLogin()} fullscreen={true} keyboard={false} centered>
			<Modal.Body className="login_modal--container">
				<div id="recaptcha-container"></div>
				<div id="recaptcha-container-2"></div>
				{isLoading && (
					<div className="lds-dual-ring-container">
						<div className="lds-dual-ring"></div>
					</div>
				)}
				{showOTP && (
					<div className="opt-section">
						<div className="container d-flex justify-content-center align-items-center">
							<div className="position-relative">
								<div className="card p-2 text-center">
									<h6>
										Please enter code <br />
										to verify your account
									</h6>
									<div>
										{" "}
										<span>A code has been sent to</span>{" "}
										{registerSubmit?.values?.loginWith == 1 ? (
											<small>*******{phone.slice(phone.length - 4)}</small>
										) : (
											<small>{registerSubmit?.values?.email}</small>
										)}
									</div>
									<OtpInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props) => <input {...props} />} />
									<small className="text-danger">{message}</small>
									<div className="mt-4">
										{isOtpLoading ? (
											<Button variant="primary" disabled className="px-4 validate">
												<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
												Verifying...
											</Button>
										) : registerSubmit?.values?.loginWith == 1 ? (
											<button className="btn btn-danger px-4 validate" onClick={() => onOTPVerifyPhone()}>
												Validate
											</button>
											// <button className="btn btn-danger px-4 validate" onClick={() => onOTPVerify()}>
											// 	Validate
											// </button>
										) : (
											<button className="btn btn-danger px-4 validate" onClick={() => onOTPVerifyEmail()}>
												Validate
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{showForgetPassOTP && (
					<div className="opt-section">
						<div className="container d-flex justify-content-center align-items-center">
							<div className="position-relative">
								<div className="card p-2 text-center">
									<h6>
										Please enter code <br />
										to verify your account
									</h6>
									<div>
										{" "}
										<span>A code has been sent to</span>{" "}
										{verifyAccountForm?.values?.loginWith == 1 ? (
											<small>*******{verifyAccountForm?.values?.userLogin.slice(phone.length - 4)}</small>
										) : (
											<small>{verifyAccountForm?.values?.userLogin}</small>
										)}
									</div>
									<OtpInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props) => <input {...props} />} />
									<small className="text-danger">{message}</small>
									<div className="mt-4">
										{isOtpLoading ? (
											<Button variant="primary" disabled className="px-4 validate">
												<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
												Verifying...
											</Button>
										) : verifyAccountForm?.values?.loginWith == 1 ? (
											// <button className="btn btn-danger px-4 validate" onClick={() => onOTPVerifyForgetPass()}>
											// 	Validate
											// </button>
											<button className="btn btn-danger px-4 validate" onClick={() => onOtpVerifyPhoneForgotPass()}>
												Validate
											</button>
										) : (
											<button className="btn btn-danger px-4 validate" onClick={() => onOtpVerifyEmailForgotPass()}>
												Validate
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="login__modal--wrapper">
					<div
						className="login__modal--left"
						style={{
							backgroundImage: "url('https://res.cloudinary.com/dufghzvge/image/upload/v1704773272/we-inspire-img.7547ff8e_n0crhj_yerfjd.jpg')",
						}}
					>
						<div className="login__modal--header" onClick={() => toggleLogin()}>
							<Image src={BrandLogo.src} alt="" />
							<div className="login__modal--header-contain">
								<h1>សមាគម អភិវឌ្ឍន៍ កុមារ</h1>
								<h2>Children Development Association</h2>
							</div>
						</div>
						<div className="login__modal--footer">
							<p>
								© Copyright 2023 Children Development Association | Designed by{" "}
								<a target="_blank" rel="noreferrer" href="https://www.camgotech.com">
									www.camgotech.com
								</a>
							</p>
						</div>
					</div>
					<div className="login__modal--right">
						<CloseButton onClick={() => toggleLogin()} />
						<Container>
							{modalTitle === "SIGN_IN" ? (
								<Form onSubmit={loginSubmit.handleSubmit} className="login__modal--form">
									<h3>Sign in</h3>
									<span style={{ fontSize: "13px", color: "red", fontWeight: "500" }}>{message}</span>
									<Form.Group className="mb-3" controlId="formGroupEmail">
										<Form.Label>Email or Phone number</Form.Label>
										<Form.Control
											name="userLogin"
											type="text"
											placeholder="Enter email or phone number"
											autoComplete="off"
											onChange={loginSubmit.handleChange}
											value={loginSubmit.values.userLogin}
										/>
									</Form.Group>
									<Form.Group className="mb-4 input-icon" controlId="formGroupPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											name="userAuth"
											type={type}
											placeholder="Password"
											autoComplete="new-password"
											onChange={loginSubmit.handleChange}
											value={loginSubmit.values.userAuth}
										/>
										<i className={`far ${icon}`} onClick={() => handleToggle()}></i>
										<button type="button" className="forget-pass-btn" onClick={() => setModalTitle("VERIFY_ACCOUNT")}>
											Forget Password?
										</button>
									</Form.Group>
									<input type="hidden" name="loginWith" onChange={loginSubmit.handleChange} value={loginSubmit.values.loginWith} />
									<button type="submit" className="thm-btn">
										Sign In
									</button>
									<div className="login__modal--form-footer">
										<p></p>
										<div className="login__modal--form-redirect">
											Don&apos;t have an account?{" "}
											<a href="#" onClick={() => setModalTitle("SIGN_UP")}>
												Sign Up
											</a>
										</div>
									</div>
									<p className="text-center" style={{ fontSize: "14px", marginTop: "10px" }}>
										<small>Or</small>
									</p>
									<div className="text-center">
										<button type="button" className="login-with-google-btn" onClick={loginWithGoogle}>
											Sign in with Google
										</button>
									</div>
								</Form>
							) : modalTitle === "SIGN_UP" ? (
								<Form onSubmit={registerSubmit.handleSubmit} className="login__modal--form">
									
									<h3>Sign up with phone</h3>
									<small className="text-danger">{registerMsg}</small>
									<Row>
										<Col lg={6}>
											<Form.Group className="mb-3" controlId="formGroupEmail">
												<Form.Label>First Name</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter first name"
													autoComplete="off"
													name="firstName"
													onChange={registerSubmit.handleChange}
													value={registerSubmit.values.firstName}
													isInvalid={registerSubmit.errors.firstName}
												/>
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group className="mb-3" controlId="formGroupEmail">
												<Form.Label>Last Name</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter first name"
													autoComplete="off"
													name="lastName"
													onChange={registerSubmit.handleChange}
													value={registerSubmit.values.lastName}
													isInvalid={registerSubmit.errors.lastName}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Form.Group className="mb-3" controlId="formGroupEmail">
										<Form.Label>
											<Row>
												<Col>
													<Form.Check
														style={{ whiteSpace: "nowrap" }}
														type="radio"
														name="loginWith"
														value={1}
														checked={registerSubmit.values.loginWith == 1 ? true : false}
														onChange={registerSubmit.handleChange}
														id="default-radio-1"
														label="Phone number"
													/>
												</Col>
												<Col>
													<Form.Check
														style={{ whiteSpace: "nowrap" }}
														type="radio"
														name="loginWith"
														value={2}
														checked={registerSubmit.values.loginWith == 2 ? true : false}
														onChange={registerSubmit.handleChange}
														id="default-radio-2"
														label="Email address"
													/>
												</Col>
											</Row>
										</Form.Label>
										{registerSubmit.values.loginWith == 1 ? (
											<PhoneInput defaultCountry="kh" value={phone} name="phoneNumber" onChange={setPhone} />
										) : (
											<Form.Control
												type="email"
												placeholder="Enter email address"
												autoComplete="off"
												name="email"
												onChange={registerSubmit.handleChange}
												value={registerSubmit.values.email}
											/>
										)}
									</Form.Group>
									<Form.Group className="mb-3 input-icon" controlId="formGroupPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type={type1}
											placeholder="Password (6 characters)"
											autoComplete="new-password"
											name="password"
											onChange={registerSubmit.handleChange}
											value={registerSubmit.values.password}
											isInvalid={registerSubmit.errors.password}
										/>
										<i className={`far ${icon1}`} style={{ right: registerSubmit.errors.password ? "30px" : "20px" }} onClick={() => handleToggle1()}></i>
									</Form.Group>
									<Form.Group className="mb-2 input-icon" controlId="formGroupPassword">
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											type={type2}
											placeholder="Password (6 characters)"
											autoComplete="new-password"
											name="confirmPassword"
											onChange={registerSubmit.handleChange}
											value={registerSubmit.values.confirmPassword}
											isInvalid={registerSubmit.errors.confirmPassword}
										/>
										<i
											className={`far ${icon2}`}
											style={{ right: registerSubmit.errors.confirmPassword ? "30px" : "20px" }}
											onClick={() => handleToggle2()}
										></i>
									</Form.Group>
									{registerSubmit.errors.confirmPassword == "Passwords must match" ? (
										<span className="text-danger" style={{ fontSize: "10px" }} type="invalid">
											{registerSubmit.errors.confirmPassword}
										</span>
									) : null}
									<Form.Check type="checkbox" id="check-agree" className="mb-3">
										<Form.Check.Input type="checkbox" name="isAgree" onChange={registerSubmit.handleChange} value={1} />
										<Form.Check.Label>
											I Agree{" "}
											<a
												href="#"
												onClick={() => {
													toggleLogin();
													router.replace("/terms-conditions");
												}}
											>
												Terms & Conditions
											</a>{" "}
											and{" "}
											<a
												href="#"
												onClick={() => {
													toggleLogin();
													router.replace("/privacy-policy");
												}}
											>
												Privacy Policy
											</a>{" "}
											.
										</Form.Check.Label>
									</Form.Check>
									<button type="submit" id="send-code-button" className="thm-btn" disabled={registerSubmit.values.isAgree == 1 ? false : true}>
										Sign Up
									</button>
									<div className="login__modal--form-footer">
										<div className="login__modal--form-redirect">
											Already have an account?{" "}
											<a href="#" onClick={() => setModalTitle("SIGN_IN")}>
												Sign In
											</a>
										</div>
									</div>
									<p className="text-center" style={{ fontSize: "14px", marginTop: "10px" }}>
										<small>Or</small>
									</p>
									<div className="text-center">
										<button type="button" className="login-with-google-btn" onClick={loginWithGoogle}>
											Sign Up with Google
										</button>
									</div>
								</Form>
							) : modalTitle == "VERIFY_ACCOUNT" ? (
								<Form onSubmit={verifyAccountForm.handleSubmit} className="login__modal--form">
									<h3>Forgot Password</h3>
									<span style={{ fontSize: "13px", color: "red", fontWeight: "500" }}>{forgetPassMessage}</span>
									<Form.Group className="mb-3" controlId="formGroupEmail">
										<Form.Label>Email or Phone number</Form.Label>
										<Form.Control
											name="userLogin"
											type="text"
											placeholder="Enter email or phone number that forgot"
											autoComplete="off"
											onChange={verifyAccountForm.handleChange}
											value={verifyAccountForm.values.userLogin}
										/>
									</Form.Group>
									<button type="submit" className="thm-btn">
										Reset Password
									</button>
									<p className="text-center" style={{ fontSize: "14px", marginTop: "10px" }}>
										<small>Or</small>
									</p>
									<div className="login__modal--form-footer">
										<div className="login__modal--form-redirect">
											<a href="#" onClick={() => setModalTitle("SIGN_IN")}>
												Sign In
											</a>
										</div>
									</div>
								</Form>
							) : modalTitle === "FORGET_PASSWORD" ? (
								<Form onSubmit={forgotSubmit.handleSubmit} className="login__modal--form">
									<h3>Change Password</h3>

									<Form.Group className="mb-3 input-icon" controlId="formGroupPassword">
										<Form.Label>New Password</Form.Label>
										<Form.Control
											type={type3}
											placeholder="Password (6 characters)"
											autoComplete="new-password"
											name="password"
											onChange={forgotSubmit.handleChange}
											value={forgotSubmit.values.password}
											isInvalid={forgotSubmit.errors.password}
										/>
										<i className={`far ${icon3}`} style={{ right: forgotSubmit.errors.password ? "30px" : "20px" }} onClick={() => handleToggle3()}></i>
									</Form.Group>
									<Form.Group className="mb-2 input-icon" controlId="formGroupPassword">
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											type={type4}
											placeholder="Password (6 characters)"
											autoComplete="new-password"
											name="confirmPassword"
											onChange={forgotSubmit.handleChange}
											value={forgotSubmit.values.confirmPassword}
											isInvalid={forgotSubmit.errors.confirmPassword}
										/>
										<i
											className={`far ${icon4}`}
											style={{ right: forgotSubmit.errors.confirmPassword ? "30px" : "20px" }}
											onClick={() => handleToggle4()}
										></i>
									</Form.Group>
									{forgotSubmit.errors.confirmPassword == "Passwords must match" ? (
										<span className="text-danger" style={{ fontSize: "10px" }} type="invalid">
											{forgotSubmit.errors.confirmPassword}
										</span>
									) : null}
									<button type="submit" className="thm-btn">
										Submit
									</button>
								</Form>
							) : null}
						</Container>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
