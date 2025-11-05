import React from "react";
import { Form } from "react-bootstrap";

const SignUpForm = () => {
    const registerSubmit = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
			loginWith: 1,
			isAgree: 0
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
				onSignupWithPhone();
			} else {
				onSignupWithEmail();
			}
		},
	});
    
	return (
		<Form onSubmit={registerSubmit.handleSubmit} className="login__modal--form">
			<h3>Sign up with phone</h3>
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
				<i className={`far ${icon2}`} style={{ right: registerSubmit.errors.confirmPassword ? "30px" : "20px" }} onClick={() => handleToggle2()}></i>
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
			<button type="submit" className="thm-btn" disabled={registerSubmit.values.isAgree == 1 ? false : true}>
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
	);
};

export default SignUpForm;
