import Layout from "@/components/Layout/Layout";
import { useRootContext } from "@/context/context";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, FloatingLabel, Form, Image, Nav, Row, Spinner, Tab } from "react-bootstrap";
import ReactVisibilitySensor from "react-visibility-sensor";
import { api } from "src/config";
import Select from "react-select";
import Swal from "sweetalert2";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Dashboard = () => {
	const options2 = [
		{ value: "ID_CARD", label: "Identity Card" },
		{ value: "PASSPORT", label: "Passport Card" },
	];
	const [documentType, setDocumentType] = useState({ value: "ID_CARD", label: "Identity Card" });
	const [idCardFront, setIdCardFront] = useState([]);
	const [idCardBack, setIdCardBack] = useState([]);
	const [passport, setPassport] = useState([]);
	const [campaignRecord, setCampaignRecord] = useState({
		pending: 0,
		draft: 0,
		complete: 0,
		inactive: 0,
		reject: 0,
		fail: 0,
		total: 0,
	});
	const [campaignList, setCampaignList] = useState([]);
	const [countStart, setCountStart] = useState(false);
	const [activeTabClasses, setActive] = useState(1);
	const { updateUserCache } = useRootContext();
	const [user, setUser] = useState(null);
	const token = Cookies.get("TOKEN");
	const router = useRouter();
	const [isLoadingList, setLoadingList] = useState(false);
	const [fileProfile, setFileProfile] = useState([]);

	const fetchCampaignList = async (status) => {
		setLoadingList(true);
		setCampaignList([]);
		const reqStatus =
			status == 2
				? "PENDING"
				: status == 3
				? "DRAFT"
				: status == 4
				? "COMPLETE"
				: status == 5
				? "INACTIVE"
				: status == 6
				? "REJECTED"
				: status == 7
				? "FAILED"
				: null;
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/campaign-web${reqStatus ? `?status=${reqStatus}` : ""}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				setCampaignList(response.data.data);
				setCampaignRecord({
					totalCampaign: response.data?.record?.totalCampaign,
					totalRaised: response.data?.record?.totalRaised,
					totalDonation: response.data?.record?.totalDonation,
					pending: response.data?.record?.pending,
					draft: response.data?.record?.draft,
					complete: response.data?.record?.complete,
					inactive: response.data?.record?.inactive,
					reject: response.data?.record?.reject,
					fail: response.data?.record?.fail,
					total: response.data?.record?.total,
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoadingList(false);
			});
	};

	const deleteCampaign = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Are you sure you want to delete this campaign? This action cannot be reverse.",
			showCancelButton: true,
			confirmButtonColor: "#04735b",
			confirmButtonText: "Delete",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoadingList(true);
				await axios
					.request({
						method: "delete",
						maxBodyLength: Infinity,
						url: `${api.BASE_URL}/campaign-web/delete/${id}`,
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					})
					.then((response) => {
						console.log(response);
						Swal.fire({
							title: "Deleted!",
							text: "Your campaign has been deleted.",
							icon: "success",
						});
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {
						setLoadingList(false);
						fetchCampaignList();
					});
			}
		});
	};

	useEffect(async () => {
		if (token) {
			let config = {
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/auth/user-profile`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			await axios
				.request(config)
				.then((response) => {
					response.data.image = response.data.image
						? response.data.image
						: "https://res.cloudinary.com/dufghzvge/image/upload/v1719182746/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158_hyq2qt.webp";
					setUser(response.data);
				})
				.catch((error) => {
					console.log(error);
					router.replace("/");
				});
			fetchCampaignList();
		} else {
			router.replace("/");
		}
		return () => {
			setCampaignList([]);
		};
	}, [token]);

	const onVisibilityChange = (isVisible) => {
		if (isVisible) {
			setCountStart(true);
		}
	};

	const [toggleEditProfile, setToggleEditProfile] = useState(false);
	const [loadingSave, setLoadingSave] = useState(false);

	const campaignForm = useFormik({
		initialValues: {
			firstName: user?.firstName || "",
			lastName: user?.lastName || "",
			email: user?.email || "",
			phoneNumber: user?.phoneNumber || "",
			image: user?.image,
			idType: user?.idType,
			idNumber: user?.idNumber || "",
			idCardBack: user?.idCardBack || "",
			idCardFront: user?.idCardFront || "",
			passport: user?.passport || "",
			accountName: user?.accountName || "",
			accountNumber: user?.accountNumber || "",
		},
		onSubmit: async (values) => {
			values.image = fileProfile?.length > 0 ? fileProfile[0]?.serverId || fileProfile[0]?.source : "";
			values.idCardBack = idCardBack?.length > 0 ? idCardBack[0]?.serverId || idCardBack[0]?.source : "";
			values.idCardFront = idCardFront?.length > 0 ? idCardFront[0]?.serverId || idCardFront[0]?.source : "";
			values.passport = passport?.length > 0 ? passport[0]?.serverId || passport[0]?.source : "";
			values.idType = documentType.value || "";
			console.log(values);
			setLoadingSave(true);
			await axios
				.request({
					method: "post",
					maxBodyLength: Infinity,
					url: `${api.BASE_URL}/auth/change-user-info`,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					data: values,
				})
				.then((response) => {
					console.log(response);
					if (response.data.message == "success") {
						setToggleEditProfile((currToggle) => !currToggle);
						response.data.data.image = response.data.data.image
							? response.data.data.image
							: "https://res.cloudinary.com/dufghzvge/image/upload/v1719182746/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158_hyq2qt.webp";
						setUser(response.data.data);
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoadingSave(false);
				});
		},
	});

	useEffect(() => {
		setFileProfile(user?.image ? [{ source: user?.image, options: { type: "local" } }] : []);
		setIdCardFront(user?.idCardBack ? [{ source: user?.idCardBack, options: { type: "local" } }] : []);
		setIdCardBack(user?.idCardBack ? [{ source: user?.idCardBack, options: { type: "local" } }] : []);
		setPassport(user?.passport ? [{ source: user?.passport, options: { type: "local" } }] : []);
		campaignForm.values.firstName = user?.firstName;
		campaignForm.values.lastName = user?.lastName;
		campaignForm.values.email = user?.email;
		campaignForm.values.phoneNumber = user?.phoneNumber;
		campaignForm.values.accountName = user?.accountName;
		campaignForm.values.accountNumber = user?.accountNumber;
		campaignForm.values.idNumber = user?.idNumber;
		campaignForm.values.idType = user?.idType;
		setDocumentType(user?.idType === "ID_CARD" ? { value: "ID_CARD", label: "Identity Card" } : { value: "PASSPORT", label: "Passport Card" });
	}, [toggleEditProfile]);

	const logOut = () => {
		Cookies.remove("TOKEN");
		Cookies.remove("USER");
		router.replace("/");
		updateUserCache(null);
	};

	return (
		<Layout pageTitle="Dashboard">
			<section className="dashboard-container">
				<Container>
					{!toggleEditProfile ? (
						<Breadcrumb>
							<Breadcrumb.Item onClick={() => router.replace("/")}>Home</Breadcrumb.Item>
							<Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
						</Breadcrumb>
					) : (
						<Breadcrumb>
							<Breadcrumb.Item onClick={() => router.replace("/")}>Home</Breadcrumb.Item>
							<Breadcrumb.Item onClick={() => setToggleEditProfile((curr) => !curr)}>Dashboard</Breadcrumb.Item>
							<Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
						</Breadcrumb>
					)}

					<div className="dashboard-account">
						{!toggleEditProfile ? (
							<>
								<div className="account-profile">
									<img src={user?.image ? `${api.RESOURCE}${user?.image}` : ""} alt="" />
									<div className="account-info">
										<p>
											<strong>
												<i className="fas fa-user"></i>
											</strong>{" "}
											{user?.firstName} {user?.lastName}
										</p>
										<p>
											<strong>
												<i className="fas fa-phone-square-alt"></i>{" "}
											</strong>{" "}
											{user?.phoneNumber}
										</p>
										<p>
											<strong>
												<i className="fas fa-envelope"></i>
											</strong>{" "}
											{user?.email}
										</p>
										<p>
											<strong>
												<i className="fas fa-calendar-check"></i>
											</strong>{" "}
											Join at {user?.joinAt}
										</p>
										<div className="account-action">
											<button type="button" className="edit-info" onClick={() => setToggleEditProfile((currentToggle) => !currentToggle)}>
												<i className="fas fa-user-edit"></i> Edit
											</button>{" "}
											<span>|</span>{" "}
											<button type="button" className="logout" onClick={logOut}>
												<i className="fas fa-sign-out-alt"></i> Logout
											</button>
										</div>
									</div>
								</div>
								<div className="account-total-donation d-md-flex d-none">
									<span className="icon-coin"></span>
									<div className="total">
										<p className="total-title">Total Donations</p>
										<p className="total-balance">${user?.totalDonation?.toFixed(2) || 0.0}</p>
									</div>
								</div>
							</>
						) : null}
						<Form
							onSubmit={(event) => {
								event.preventDefault();
								campaignForm.handleSubmit();
								return false;
							}}
							style={{ fontSize: "14px", fontWeight: "500", width: "100%", display: toggleEditProfile ? "block" : "none" }}
						>
							<Row className="justify-content-between">
								<Col lg={2}>
									<div className="mb-3">
										{toggleEditProfile ? (
											<div style={{ maxWidth: "150px" }}>
												<FilePond
													files={fileProfile}
													onupdatefiles={setFileProfile}
													allowMultiple={true}
													maxFiles={1}
													storeAsFile={true}
													server={`${api.BASE_URL}/save-image/user-profile`}
													name="file"
													labelIdle='<span className="filepond--label-action">Browse Profile</span>'
													stylePanelLayout="circle compact"
												/>
											</div>
										) : null}
									</div>
								</Col>
								<Col lg={10}>
									<Row>
										<Col lg={6}>
											<FloatingLabel controlId="firstname" label="First Name" className="mb-3">
												<Form.Control
													type="text"
													placeholder="Enter first name"
													onChange={campaignForm.handleChange}
													name="firstName"
													value={campaignForm.values.firstName}
												/>
											</FloatingLabel>
										</Col>
										<Col lg={6}>
											<FloatingLabel controlId="lastname" label="Last Name" className="mb-3">
												<Form.Control
													type="text"
													placeholder="Enter last name"
													onChange={campaignForm.handleChange}
													name="lastName"
													value={campaignForm.values.lastName}
												/>
											</FloatingLabel>
										</Col>
										<Col lg={12}>
											<FloatingLabel controlId="email" label="Email Address" className="mb-3">
												<Form.Control
													disabled={user?.loginWith == 2 || user?.loginWith == 3 ? true : false}
													type="text"
													placeholder="Enter email address"
													onChange={campaignForm.handleChange}
													name="email"
													value={campaignForm.values.email}
												/>
											</FloatingLabel>
										</Col>
										<Col lg={12}>
											<FloatingLabel controlId="phoneNumber" label="Phone Number" className="mb-3">
												<Form.Control
													disabled={user?.loginWith == 1 ? true : false}
													name="phoneNumber"
													type="text"
													placeholder="Enter phone number"
													onChange={campaignForm.handleChange}
													value={campaignForm.values.phoneNumber}
												/>
											</FloatingLabel>
										</Col>
									</Row>
									<div>
										<label className="form-label main-label">Document Type</label>
										<Select
											options={options2}
											className="campaign-select-input mb-2"
											placeholder="Document Type"
											onChange={setDocumentType}
											defaultValue={documentType}
											value={documentType}
										/>
										<div className="form-floating">
											<input
												type="text"
												className="form-control"
												id="id-number"
												placeholder="ID / Passport Number"
												name="idNumber"
												onChange={campaignForm.handleChange}
												value={campaignForm.values.idNumber}
											/>
											<label htmlFor="id-number">ID / Passport Number</label>
										</div>
										<Row className="mt-2" style={{ display: documentType?.value == "PASSPORT" ? "none" : "" }}>
											<Col>
												<FilePond
													files={idCardFront}
													onupdatefiles={setIdCardFront}
													allowMultiple={true}
													maxFiles={1}
													storeAsFile={true}
													server={`${api.BASE_URL}/save-image/campaign`}
													name="file"
													labelIdle='<span className="filepond--label-action">Upload Front ID Card</span>'
													stylePanelLayout="compact"
												/>
											</Col>
											<Col>
												<FilePond
													files={idCardBack}
													onupdatefiles={setIdCardBack}
													allowMultiple={true}
													maxFiles={1}
													storeAsFile={true}
													server={`${api.BASE_URL}/save-image/campaign`}
													name="file"
													labelIdle='<span className="filepond--label-action">Upload Back ID Card</span>'
													stylePanelLayout="compact"
												/>
											</Col>
										</Row>
										<Row className="mt-2" style={{ display: documentType?.value == "ID_CARD" ? "none" : "" }}>
											<Col>
												<FilePond
													files={passport}
													onupdatefiles={setPassport}
													allowMultiple={true}
													maxFiles={1}
													storeAsFile={true}
													server={`${api.BASE_URL}/save-image/campaign`}
													name="file"
													labelIdle='<span className="filepond--label-action">Upload Passport Identification Page</span>'
													stylePanelLayout="compact"
												/>
											</Col>
										</Row>
									</div>
									<div className="mb-3">
										<label className="form-label main-label">Bank Account</label>
										<Row>
											<Col>
												<div className="form-floating mb-2">
													<input
														type="text"
														className="form-control"
														id="account-name"
														placeholder="Account Name"
														name="accountName"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.accountName}
													/>
													<label htmlFor="account-name">Account Name</label>
												</div>
											</Col>
											<Col>
												<div className="form-floating">
													<input
														type="text"
														className="form-control"
														id="account-number"
														placeholder="Account Number"
														name="accountNumber"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.accountNumber}
													/>
													<label htmlFor="account-number">Account Number</label>
												</div>
											</Col>
										</Row>
									</div>
									<button type="submit" className="btn-thm-small">
										{loadingSave ? (
											<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
										) : (
											<i className="fas fa-save"></i>
										)}{" "}
										Save
									</button>{" "}
									<button type="button" className="btn-thm-outline-small" onClick={() => setToggleEditProfile((currentToggle) => !currentToggle)}>
										<i className="fas fa-angle-left"></i> Back to profile
									</button>
								</Col>
							</Row>
						</Form>
					</div>

					<div className="account-total-donation d-md-none d-flex">
						<span className="icon-coin"></span>
						<div className="total">
							<p className="total-title">Total Donations</p>
							<p className="total-balance">${user?.totalDonation?.toFixed(2) || 0.0}</p>
						</div>
					</div>

					<div className="dashboard-body">
						<div className="dashboard-body-header">
							<div className="dashboard-data-record">
								<div className="record-item">
									<span className="icon-donation"></span>
									<div className="record-item-info">
										<p>Campaigns</p>
										<p className="record-count">{campaignRecord?.totalCampaign}</p>
									</div>
								</div>
								<div className="record-item">
									<span className="icon-fundraiser"></span>
									<div className="record-item-info">
										<p>Funds Raised</p>
										<p className="record-count">${campaignRecord?.totalRaised?.toFixed(2)}</p>
									</div>
								</div>
								<div className="record-item">
									<span className="icon-donation-1"></span>
									<div className="record-item-info">
										<p>Donors</p>
										<p className="record-count">{campaignRecord?.totalDonation}</p>
									</div>
								</div>
							</div>
							<Link href="/dashboard/withdraw">
								<a className="main-menu__donate-btn" style={{ border: "none" }}>
									<i className="fas fa-plus"></i> Request Withdraw
								</a>
							</Link>
							<Link href="/form-campaign">
								<a className="main-menu__donate-btn" style={{ border: "none" }}>
									<i className="fas fa-plus"></i> New Campaign
								</a>
							</Link>
						</div>

						<Tab.Container
							defaultActiveKey={1}
							mountOnEnter={true}
							onSelect={(e) => {
								setActive({ [e]: activeTabClasses });
								fetchCampaignList(e);
							}}
						>
							<Nav variant="tabs" style={{ overflowX: "auto", overflowY: "hidden" }} className=" d-flex flex-nowrap flex-row mt-2 menu-tab" justify>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={1}>Recently Added ({campaignRecord.total})</Nav.Link>
								</Nav.Item>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={2}>Pending Campaign ({campaignRecord.pending})</Nav.Link>
								</Nav.Item>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={3}>Draft ({campaignRecord.draft})</Nav.Link>
								</Nav.Item>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={4}>Complete ({campaignRecord.complete})</Nav.Link>
								</Nav.Item>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={5}>Inactive ({campaignRecord.inactive})</Nav.Link>
								</Nav.Item>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={6}>Rejected ({campaignRecord.reject})</Nav.Link>
								</Nav.Item>
								<Nav.Item className="d-flex  flex-column">
									<Nav.Link eventKey={7}>Failed ({campaignRecord.fail})</Nav.Link>
								</Nav.Item>
							</Nav>
							<Tab.Content className="d-flex flex-column flex-grow-1">
								<Tab.Pane eventKey={1}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.totalRaised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.totalRaised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.totalRaised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.totalRaised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey={2}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.raised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.raised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey={3}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.raised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.raised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey={4}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.raised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.raised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey={5}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.raised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.raised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey={6}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.raised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.raised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey={7}>
									<Row>
										{campaignList.map((el, index) => (
											<Col xl={4} lg={6} md={6} key={index}>
												<div className={"my-4"}>
													<div style={{ userSelect: "none" }} className="causes-one__single animated fadeInLeft">
														<div className="causes-one__img">
															<div className="causes-one__img-box">
																<Link href={`/projects/${el.id}`}>
																	<Image
																		src={el.campaignGallery?.length > 0 ? `${api.RESOURCE}${el.campaignGallery[0]}` : "/causes-one-img-1.jpg"}
																		alt=""
																		style={{ cursor: "pointer" }}
																	/>
																</Link>
															</div>
															<div className="causes-one__category" style={{ backgroundColor: "#6c757d" }}>
																<span>
																	<span className="icon-access_alarms"></span> {el.status}
																</span>
															</div>
														</div>
														<div className="causes-one__content">
															<h3 className="causes-one__title">{el.campaignTile}</h3>
															<span className="causes-one__date">
																Created: <strong>{el.createdAt}</strong>
															</span>
														</div>
														<div className="causes__progress-contain">
															<div className="causes-one__progress">
																<ReactVisibilitySensor offset={{ top: 10 }} delayedCall={true} onChange={onVisibilityChange}>
																	<div className="bar">
																		<div
																			className="bar-inner count-bar"
																			data-percent={`${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`}
																			style={{
																				width: `${countStart ? Math.round((+el.raised / +el.goal) * 100) : 0}%`,
																				opacity: 1,
																			}}
																		>
																			<div className="count-text" style={{ opacity: 1 }}>
																				{countStart && el.goal > 0 ? Math.round((+el.raised / +el.goal) * 100) : 0}%
																			</div>
																		</div>
																	</div>
																</ReactVisibilitySensor>
																<div className="causes-one__goals">
																	<p>
																		<span>${el.raised.toFixed(2)}</span> Raised
																	</p>
																	<p>
																		<span>${el.goal.toFixed(2)}</span> Goal
																	</p>
																</div>
															</div>
														</div>
														{el.status == "DRAFT" || el.status == "PENDING" ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn delete thm-btn-sm" onClick={() => deleteCampaign(el.id)}>
																	<i className="fas fa-trash"></i> Delete
																</button>
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : el.allowEdit == 1 ? (
															<div className="causes-single-btn__contain">
																<button className="thm-btn edit thm-btn-sm" onClick={() => router.replace(`/form-campaign/${el.id}`)}>
																	<i className="far fa-edit"></i> Edit Detail
																</button>
															</div>
														) : null}
													</div>
												</div>
											</Col>
										))}
									</Row>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</div>
				</Container>
			</section>
		</Layout>
	);
};

export default Dashboard;
