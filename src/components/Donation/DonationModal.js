import { useRootContext } from "@/context/context";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ButtonGroup, Col, Container, Form, Image, Modal, Row, ToggleButton } from "react-bootstrap";
import ReactVisibilitySensor from "react-visibility-sensor";
import BrandLogo from "../../assets/images/LOGO-CAA New.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { api } from "src/config";
import Cookies from "js-cookie";
import LogoKhqr from "../../assets/images/khqr.png";
import LogoCredit from "../../assets/images/credit_card.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import * as Yup from "yup";

const DonationModal = () => {
	// Setup
	const token = Cookies.get("TOKEN");
	const [isLoadingSave, setLoadingSave] = useState(false);
	const router = useRouter();
	const alert = useAlert();
	// Template
	const { donationModal, toggleDonation, lang, donationDetail } = useRootContext();
	const [suggestPrice, setSuggestPrice] = useState(1);
	const [radioValue, setRadioValue] = useState("");
	const [tip, setTip] = useState(0);
	const [tipCustom, setTipCustom] = useState(false);
	const [termModal, setTermModal] = useState(false);
	const [term,setTerm] = useState(null);

	const donationSubmit = useFormik({
		initialValues: {
			campaignId: null,
			donateType: radioValue,
			amount: suggestPrice,
			tip: tip,
			total: 0,
			paymentMethod: null,
			note: null,
			isConfirmAgreement: false,
		},
		validationSchema: Yup.object({
			paymentMethod: Yup.string().required("Please select payment method"),
			amount: Yup.number().min(1, "Please enter amount!").required("Please enter amount!"),
		}),
		onSubmit: async (values) => {
			values.campaignId = donationDetail?.id;
			values.donateType = radioValue;
			values.total = values.amount + values.tip;
			console.log(values);
			if (values.isConfirmAgreement) {
				onSaveDonation(values);
			}
		},
	});

	const onSaveDonation = async (values) => {
		setLoadingSave(true);

		let config = {
			"Content-Type": "application/json",
		};
		if (token) {
			config = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
		}
		await axios
			.request({
				method: "post",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/donation`,
				headers: config,
				data: values,
			})
			.then((response) => {
				console.log(response);
				if (response.data.status == "success") {
					reset();
					toggleDonation(false, null);
					alert.success(<span style={{ fontSize: "12px" }}>Donation Successfully!</span>);
				} else {
					alert.error("You just broke something!");
				}
			})
			.catch((error) => {
				console.log(error);
				alert.error("You just broke something!");
			})
			.finally(() => {
				setLoadingSave(false);
				donationSubmit.resetForm();
				setSuggestPrice(1);
				setRadioValue("");
				setTip(0);
				setTipCustom(false);
			});
	};

	const reset = () => {
		donationSubmit.resetForm();
		setSuggestPrice(1);
		setRadioValue("");
		setTip(0);
		setTipCustom(false);
	};

	const fetchTerm = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/donation-term`,
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": lang
				},
			})
			.then((response) => {
				setTerm(response.data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	}

	useEffect(() => {
		setSuggestPrice(1);
		setRadioValue("");
		setTip(0);
		setTipCustom(false);
		fetchTerm();
		return () => {
			reset();
		};
	}, [lang]);

	const handleClickSuggestPrice = (price) => {
		setSuggestPrice(price);
		donationSubmit.setFieldValue("amount", price);
	};

	const handleChangePrice = (e) => {
		if (!isNaN(e.target.value)) {
			donationSubmit.setFieldValue(e.target.name, parseFloat(e.target.value));
		} else {
			donationSubmit.setFieldValue(e.target.name, 0);
		}
		if (e.target.value === "") {
			donationSubmit.setFieldValue(e.target.name, 0);
		}
	};
	const [countStart, setCountStart] = useState(false);

	const onVisibilityChange = (isVisible) => {
		if (isVisible) {
			setCountStart(true);
		}
	};

	const radios = ["Daily", "Weekly", "Monthly", "Yearly"];

	return (
		<Modal
			show={donationModal}
			onHide={() => {
				toggleDonation(false, null);
				reset();
			}}
			fullscreen={true}
			keyboard={false}
			centered
		>
			<Modal.Header closeButton>
				<div className="donation-header">
					<Image src={BrandLogo.src} alt="" />
					<Modal.Title>DONATION</Modal.Title>
				</div>
			</Modal.Header>
			<Modal.Body>
				{isLoadingSave && (
					<div className="lds-dual-ring-container" style={{ zIndex: 1000, height: "100vh", width: "100vw", position: "fixed" }}>
						<div className="lds-dual-ring"></div>
					</div>
				)}
				<Container>
					<Form onSubmit={donationSubmit.handleSubmit}>
						<Row>
							<Col xl={7} lg={7}>
								<div className="donation-wrapper d-lg-none d-block mb-4">
									<div
										className="donation-detail"
										style={{
											backgroundImage: `url('${api.RESOURCE}${donationDetail?.campaignGallery[0]}')`,
										}}
									>
										<div className="donation-one__bottom">
											<h3 className="donation-one__bottom-title">
												<a>{donationDetail?.campaignTile}</a>
											</h3>

											<p>
												<i className="fas fa-search-dollar"></i> <strong>${donationDetail?.goal}</strong> Goal
												<i className="fas fa-hand-holding-usd ms-4"></i> <strong>${donationDetail?.totalRaised}</strong> Raised
											</p>
										</div>
									</div>
								</div>
								<div className="donation-wrapper-left">
									<div className="form-big-label">
										<h2>Enter Donation</h2>
										<p>100% of all donations go to the beneficiaries</p>
									</div>
									<div className="donation__input-container">
										{/* <div className="multi-button">
											{radios.map((el, index) => (
												<button
													key={index}
													type="button"
													className={el == radioValue ? "active" : ""}
													onClick={() => {
														if(el !== radioValue) {
															setRadioValue(el);
														} else {
															setRadioValue(null);
														}
													}}
												>
													{el == radioValue ? <i className="far fa-calendar-check"></i> : <i className="far fa-calendar"></i>} {el}
												</button>
											))}
										</div> */}

										<div className="donation__input-price">
											<input
												type="text"
												placeholder="Your name"
												name="amount"
												autoComplete="off"
												onChange={handleChangePrice}
												onBlur={donationSubmit.handleBlur}
												value={donationSubmit.values.amount}
											/>
											<span>USD ($) </span>
										</div>
										{donationSubmit.touched.amount && donationSubmit.errors.amount ? (
											<small className="text-danger" style={{ fontSize: "14px" }}>
												{donationSubmit.errors.amount}
											</small>
										) : null}

										<div className="donation__input-price-suggest">
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(1)}
												className={parseFloat(donationSubmit.values.amount) === 1 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 1 ? <i className="far fa-check-circle"></i> : null} $1
											</button>
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(2)}
												className={parseFloat(donationSubmit.values.amount) === 2 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 2 ? <i className="far fa-check-circle"></i> : null} $2
											</button>
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(5)}
												className={parseFloat(donationSubmit.values.amount) === 5 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 5 ? <i className="far fa-check-circle"></i> : null} $5
											</button>
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(10)}
												className={parseFloat(donationSubmit.values.amount) === 10 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 10 ? <i className="far fa-check-circle"></i> : null} $10
											</button>
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(20)}
												className={parseFloat(donationSubmit.values.amount) === 20 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 20 ? <i className="far fa-check-circle"></i> : null} $20
											</button>
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(50)}
												className={parseFloat(donationSubmit.values.amount) === 50 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 50 ? <i className="far fa-check-circle"></i> : null} $50
											</button>
											<button
												type="button"
												onClick={() => handleClickSuggestPrice(100)}
												className={parseFloat(donationSubmit.values.amount) === 100 ? "thm-btn active" : "thm-btn"}
											>
												{parseFloat(donationSubmit.values.amount) === 100 ? <i className="far fa-check-circle"></i> : null} $100
											</button>
										</div>
									</div>
									{/* <div
										style={{
											display: "block",
											width: "100%",
											background: "#eff5f4",
											padding: "40px 21px 30px",
											borderRadius: "18px",
											marginTop: "2rem",
										}}
									>
										{!tipCustom ? (
											<Slider
												min={0}
												max={25}
												marks={{
													0: "0%",
													5: "5%",
													10: "10%",
													15: "15%",
													20: "20%",
													25: "25%",
												}}
												step={null}
												onChange={(value) => {
													setTip(value);
													donationSubmit.values.tip = parseFloat(donationSubmit.values.amount) * parseFloat(value / 100);
												}}
												defaultValue={0}
												railStyle={{ height: 10, backgroundColor: "#fff" }}
												trackStyle={{ height: 10, backgroundColor: "#04735b" }}
												handleStyle={{
													height: 12,
													width: 12,
													marginLeft: 0,
													marginTop: "-1px",
													borderColor: "#04735b",
												}}
												dotStyle={{ height: 12, width: 12, marginBottom: "-5px", borderColor: "#04735b" }}
											/>
										) : (
											<div className="donation__input-price">
												<input
													type="text"
													placeholder="Enter your tip"
													name="tip"
													autoComplete="off"
													onChange={donationSubmit.handleChange}
													value={donationSubmit.values.tip}
												/>
												<span>USD ($) </span>
											</div>
										)}

										<button
											type="button"
											className={`thm-btn donation-custom-tip ${tipCustom ? "active" : ""}`}
											onClick={() => {
												setTipCustom(!tipCustom);
												setTip(null);
												donationSubmit.values.tip = 0;
											}}
										>
											<i className="fas fa-donate"></i> {!tipCustom ? "Custom Tip" : "Close Custom Tip"}
										</button>
									</div> */}
									<div className="causes__progress-contain">
										<div className="causes-one__progress">
											<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
												<div className="bar">
													<div
														className="bar-inner count-bar"
														data-percent={`${(donationDetail?.totalRaised / donationDetail?.goal) * 100}%`}
														style={{ width: `${((donationDetail?.totalRaised / donationDetail?.goal) * 100) >= 100 ? 100 : (donationDetail?.totalRaised / donationDetail?.goal) * 100}%`, opacity: 1 }}
													>
														<div className="count-text" style={{ opacity: 1, width: "auto" }}>
															{((donationDetail?.totalRaised / donationDetail?.goal) * 100).toFixed(2)}%
														</div>
													</div>
												</div>
											</ReactVisibilitySensor>
											<div className="causes-one__goals">
												<p>
													<span>${donationDetail?.totalRaised}</span> Raised
												</p>
												<p>
													<span>${donationDetail?.goal}</span> Goal
												</p>
											</div>
										</div>
									</div>
									<Form.Label style={{ color: "#333", fontWeight: "800" }}>Payment Options</Form.Label>
									<div className="payment-options">
										<Form.Check type="radio" id={`check-api-radio-3`}>
											<Form.Check.Input type="radio" name="paymentMethod" onChange={donationSubmit.handleChange} value="KHQR" />
											<Form.Check.Label>
												<div className="check-payment-option">
													<Image src={LogoKhqr.src} style={{borderRadius: "10px"}} alt="" />
													<div className="check-payment-option-content">
														<h4>KHQR</h4>
														<p>Scan to pay with member bank app</p>
													</div>
												</div>
											</Form.Check.Label>
										</Form.Check>
										<Form.Check type="radio" id={`check-api-radio-1`}>
											<Form.Check.Input type="radio" name="paymentMethod" onChange={donationSubmit.handleChange} value="CREDIT_DEBIT_CARD" />
											<Form.Check.Label>
												<div className="check-payment-option">
													<Image src={LogoCredit.src} style={{borderRadius: "10px"}} alt="" />
													<div className="check-payment-option-content">
														<h4>Credit/Debit Card</h4>
														<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704630599/4Cards_1x_bhrnwd.png" alt="" />
													</div>
												</div>
											</Form.Check.Label>
										</Form.Check>
										{/* <Form.Check type="radio" id={`check-api-radio-2`}>
											<Form.Check.Input type="radio" name="paymentMethod" onChange={donationSubmit.handleChange} value="SATHAPANA_PAY" />
											<Form.Check.Label>
												<div className="check-payment-option">
													<Image src="https://res.cloudinary.com/dufghzvge/image/upload/v1704627775/60x60bb_g3qhge.jpg" alt="" />
													<div className="check-payment-option-content">
														<h4>Sathapana Pay</h4>
														<p>Scan to pay with Sathapan Mobile</p>
													</div>
												</div>
											</Form.Check.Label>
										</Form.Check> */}
										{donationSubmit.errors.paymentMethod ? (
											<small className="text-danger" style={{ fontSize: "14px" }}>
												{donationSubmit.errors.paymentMethod}
											</small>
										) : null}
									</div>
									<Form.Label style={{ color: "#333", fontWeight: "800", marginTop: "1.6rem" }}>Note</Form.Label>
									<div className="donation__input-box">
										<textarea
											name="note"
											placeholder="Write message"
											rows="2"
											onChange={donationSubmit.handleChange}
											value={donationSubmit.values.note}
										></textarea>
									</div>
									<div className="donation-wrapper d-lg-none d-block mt-4 mb-3">
										<h2 className="mt-0">Your Donation Summary</h2>
										<div className="divide"></div>
										<div className="donation-grid">
											<span className="donation-grid-title">Donation</span>
											<span className="donation-grid-data">${parseFloat(donationSubmit.values.amount).toFixed(2)}</span>
										</div>
										{/* <div className="donation-grid">
											<span className="donation-grid-title">Tip</span>
											<span className="donation-grid-data">
												${donationSubmit.values.tip ? parseFloat(donationSubmit.values.tip).toFixed(2) : 0.0}
											</span>
										</div> */}
										<div className="divide dash"></div>
										<div className="donation-grid">
											<span className="donation-grid-data">Total</span>
											<span className="donation-grid-data">
												${(parseFloat(donationSubmit.values.amount) + parseFloat(donationSubmit.values.tip)).toFixed(2)}
											</span>
										</div>
									</div>
									<div style={{display: "flex",alignItems: "center",gap: "5px",marginTop: "10px"}}>
										<Form.Check
											type="checkbox"
											id={`default-checkbox`}
											name="isConfirmAgreement"
											onChange={donationSubmit.handleChange}
											value={donationSubmit.values.isConfirmAgreement}
											isInvalid={!donationSubmit.errors.isConfirmAgreement && donationSubmit.touched.isConfirmAgreement}
										/>
										<Form.Check.Label htmlFor="default-checkbox" style={{fontSize: "14px"}}>
											By continuing, you agree with{' '}
											<span onClick={() => setTermModal(!termModal)} style={{ textDecoration: 'underline' }}>
											Terms and Privacy
											</span>
										</Form.Check.Label>
									</div>
									
									{
										donationSubmit.values.isConfirmAgreement && !donationSubmit.errors.paymentMethod ? (
											<button type="submit" className="thm-btn donation-page__btn">
												<i className="fas fa-donate"></i> DONATE
											</button>
										) : (
											<button type="submit" style={{backgroundColor: "grey"}} disabled className="thm-btn donation-page__btn">
												<i className="fas fa-donate"></i> DONATE
											</button>
										)
									}
								</div>
							</Col>
							<Col xl={5} lg={5}>
								<div className="donation-wrapper d-lg-block d-none">
									<div
										className="donation-detail"
										style={{
											backgroundImage: `url('${api.RESOURCE}${donationDetail?.campaignGallery[0]}')`,
										}}
									>
										<div className="donation-one__bottom">
											<h3 className="donation-one__bottom-title">
												<a>{donationDetail?.campaignTile}</a>
											</h3>

											<p>
												<i className="fas fa-search-dollar"></i> <strong>${donationDetail?.goal}</strong> Goal
												<i className="fas fa-hand-holding-usd ms-4"></i> <strong>${donationDetail?.totalRaised}</strong> Raised
											</p>
										</div>
									</div>
									<h2>Your Donation Summary</h2>
									<div className="divide"></div>
									<div className="donation-grid">
										<span className="donation-grid-title">Donation</span>
										<span className="donation-grid-data">${parseFloat(donationSubmit.values.amount).toFixed(2)}</span>
									</div>
									{/* <div className="donation-grid">
										<span className="donation-grid-title">Tip</span>
										<span className="donation-grid-data">${donationSubmit.values.tip ? parseFloat(donationSubmit.values.tip).toFixed(2) : 0.0}</span>
									</div> */}
									<div className="divide dash"></div>
									<div className="donation-grid">
										<span className="donation-grid-data">Total</span>
										<span className="donation-grid-data">
											${(parseFloat(donationSubmit.values.amount) + parseFloat(donationSubmit.values.tip)).toFixed(2)}
										</span>
									</div>
								</div>
							</Col>
						</Row>
					</Form>

					<div className={`term-modal ${termModal ? 'active' : ""}`} style={{width: "100vw", height: "100%", display: "flex", alignItems: "center", position: "fixed",top: "0",left: "0"}}>
						
						<div className="term-container">
							<button onClick={() => setTermModal(!termModal)}><i class="far fa-times-circle"></i></button>
							<div className="term-scroll">
								<div className="fs-16 fw-5 text-gray mb-4 pb-lg-2" dangerouslySetInnerHTML={{__html: term?.description}}></div>
							</div>
						</div>
					</div>
				</Container>
			</Modal.Body>
		</Modal>
	);
};

export default DonationModal;
