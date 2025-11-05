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
import locations from "@/data/location";
import * as Yup from "yup";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useTranslation } from "react-i18next";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Dashboard = () => {
	const options2 = [
		{ value: "ID_CARD", label: "Identity Card" },
		{ value: "PASSPORT", label: "Passport Card" },
	];
	const options3 = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
	];
	const [documentType, setDocumentType] = useState({ value: "ID_CARD", label: "Identity Card" });
	const [genderType, setGenderType] = useState({ value: "female", label: "Female" });
	const [idCardFront, setIdCardFront] = useState([]);
	const [idCardBack, setIdCardBack] = useState([]);
	const [passport, setPassport] = useState([]);
	const [location, setLocation] = useState();
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
	const {t} = useTranslation();
	const [user, setUser] = useState(null);
	const [information, setInformation] = useState(null);
	const token = Cookies.get("TOKEN");
	const router = useRouter();
	const [isLoadingList, setLoadingList] = useState(false);
	const [fileProfile, setFileProfile] = useState([]);
	const [address, setAddress] = useState({});
	const [againstHumanity, setAgainstHumanity] = useState({});
	const [politicalUse, setPoliticalUse] = useState({});
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

	const [toggleEditProfile, setToggleEditProfile] = useState(false);
	const [loadingSave, setLoadingSave] = useState(false);

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

			let configInformation = {
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/auth/user-information`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			await axios
				.request(configInformation)
				.then((response) => {
					console.log(response.data);
					setInformation(response.data);
					setAddress(JSON.parse(response?.data?.city ? response?.data?.city : "{}"));
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
	}, [token,toggleEditProfile]);

	const onVisibilityChange = (isVisible) => {
		if (isVisible) {
			setCountStart(true);
		}
	};

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
			fullname: information?.fullname || "",
			gender: information?.gender || "",
			age: information?.age || "",
			city: information?.city || "",
			date: information?.date || "",
			location: information?.location || "",
			houseNumber: address?.houseNumber || "",
			streetNumber: address?.streetNumber || "",
			teamNumber: address?.teamNumber || "",
			phum: address?.phum || "",
			sangkat: address?.sangkat || "",
			khan: address?.khan || "",
		},
		onSubmit: async (values) => {
			console.log(values);
			values.image = fileProfile?.length > 0 ? fileProfile[0]?.serverId || fileProfile[0]?.source : "";
			values.idCardBack = idCardBack?.length > 0 ? idCardBack[0]?.serverId || idCardBack[0]?.source : "";
			values.idCardFront = idCardFront?.length > 0 ? idCardFront[0]?.serverId || idCardFront[0]?.source : "";
			values.passport = passport?.length > 0 ? passport[0]?.serverId || passport[0]?.source : "";
			values.idType = documentType.value || "";
			values.gender = genderType.value || "",
			values.location = location ? location.value : "";
			values.city = {houseNumber: values?.houseNumber,streetNumber: values?.streetNumber,teamNumber: values?.teamNumber,phum: values?.phum,sangkat: values?.sangkat,khan: values?.khan};
			values.politicalUse = politicalUse;
			values.againstHumanity = againstHumanity;
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
						// setUser(response.data.data);
						// setInformation(response.data.info);
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
		setIdCardFront(user?.idCardFront ? [{ source: user?.idCardFront, options: { type: "local" } }] : []);
		setIdCardBack(user?.idCardBack ? [{ source: user?.idCardBack, options: { type: "local" } }] : []);
		setPassport(user?.passport ? [{ source: user?.passport, options: { type: "local" } }] : []);
		setDocumentType(user?.idType === "ID_CARD" ? { value: "ID_CARD", label: "Identity Card" } : { value: "PASSPORT", label: "Passport Card" });
		setGenderType(information?.gender === "male" ? { value: "male", label: "Male" } : { value: "female", label: "Famale" });
		setAgainstHumanity(information?.againstHumanity);
		setPoliticalUse(information?.politicalUse);
		console.log(user?.idType === "ID_CARD",information?.gender === "male");
		campaignForm.values.firstName = user?.firstName;
		campaignForm.values.lastName = user?.lastName;
		campaignForm.values.email = user?.email;
		campaignForm.values.phoneNumber = user?.phoneNumber;
		campaignForm.values.idNumber = user?.idNumber;
		campaignForm.values.idType = user?.idType;
		// Information
		campaignForm.values.fullname = information?.fullname;
		campaignForm.values.gender = information?.gender;
		campaignForm.values.age = information?.age;
		campaignForm.values.city = information?.city;
		campaignForm.values.date = information?.date;
		campaignForm.values.houseNumber = address?.houseNumber;
		campaignForm.values.streetNumber = address?.streetNumber;
		campaignForm.values.teamNumber = address?.teamNumber;
		campaignForm.values.phum = address?.phum;
		campaignForm.values.sangkat = address?.sangkat;
		campaignForm.values.khan = address?.khan;
		// campaignForm.values.location = information?.location;
		setLocation({value: information?.location, label: information?.location});
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
										<p className="total-balance">${parseFloat(user?.totalDonation)?.toFixed(2) || 0.0}</p>
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
													// disabled={user?.loginWith == 1 ? true : false}
													name="phoneNumber"
													type="text"
													placeholder="Enter phone number"
													onChange={campaignForm.handleChange}
													value={campaignForm.values.phoneNumber}
												/>
											</FloatingLabel>
										</Col>
									</Row>
									{
										user?.isMember == 1 ? (
											<Col md={12}>
												<h2 className="section-title__title" style={{ fontSize: "33px" }}>
													{t('general.personal_information')}
												</h2>
												<div className="mb-3">
													<label for="phoneNumber" className="form-label main-label">
														ទូរស័ព្ទលេខ
													</label>
													<input
														type="text"
														className="form-control"
														id="phoneNumber"
														placeholder="ទូរស័ព្ទលេខ"
														name="phoneNumber"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.phoneNumber}
													/>
													{campaignForm.errors.phoneNumber && campaignForm.touched.phoneNumber ? (
														<div className="text-danger">{campaignForm.errors.phoneNumber}</div>
													) : null}
												</div>
												<div className="mb-3">
													<label for="fullName" className="form-label main-label">
														ខ្ញុំបាទ/នាងខ្ញុំឈ្មោះ
													</label>
													<input
														type="text"
														className="form-control"
														id="fullname"
														placeholder="ខ្ញុំបាទ/នាងខ្ញុំឈ្មោះ"
														name="fullname"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.fullname}
													/>
													{campaignForm.errors.fullname && campaignForm.touched.fullname ? (
														<div className="text-danger">{campaignForm.errors.fullname}</div>
													) : null}
												</div>
												<div className="mb-3">
													<label for="gender" className="form-label main-label">
														ភេទ
													</label>
													<Select
														options={options3}
														className="campaign-select-input mb-2"
														placeholder="ភេទ"
														onChange={setGenderType}
														defaultValue={genderType}
													/>
												</div>
												<div className="mb-3">
													<label for="age" className="form-label main-label">
														អាយុ
													</label>
													<input
														type="text"
														className="form-control"
														id="age"
														placeholder="អាយុ"
														name="age"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.age}
													/>
													{campaignForm.errors.age && campaignForm.touched.age ? (
														<div className="text-danger">{campaignForm.errors.age}</div>
													) : null}
												</div>
												<div className="mb-3">
													<label className="form-label main-label">ប្រភេទអត្តសញ្ញាណ</label>
													<Select
														options={options2}
														className="campaign-select-input mb-2"
														placeholder="Document Type"
														onChange={setDocumentType}
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
														<label for="id-number">លេខអត្តសញ្ញាណប័ណ្ណ / លេខលិខិតឆ្លងដែន</label>
														{campaignForm.errors.idNumber && campaignForm.touched.idNumber ? (
															<div className="text-danger">{campaignForm.errors.idNumber}</div>
														) : null}
													</div>
													<Row className="mt-2" style={{ display: documentType?.value == "ID_CARD" ? "" : "none" }}>
														<Col>
															<FilePond
																files={idCardFront}
																onupdatefiles={setIdCardFront}
																allowMultiple={true}
																maxFiles={1}
																storeAsFile={true}
																server={`${api.BASE_URL}/save-image/users`}
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
																server={`${api.BASE_URL}/save-image/users`}
																name="file"
																labelIdle='<span className="filepond--label-action">Upload Back ID Card</span>'
																stylePanelLayout="compact"
															/>
														</Col>
														<div style={{display: `${idCardFront.length > 0 ? "none" : "block"}`}} className="text-danger">
															សូមបំពេញរូបភាពអត្តសញ្ញាណប័ណ្ណផ្ទៃខាងមុខចាំបាច់ !
														</div>
													</Row>
													<Row className="mt-2" style={{ display: documentType?.value == "PASSPORT" ? "" : "none" }}>
														<Col>
															<FilePond
																files={passport}
																onupdatefiles={setPassport}
																allowMultiple={true}
																maxFiles={1}
																storeAsFile={true}
																server={`${api.BASE_URL}/save-image/users`}
																name="file"
																labelIdle='<span className="filepond--label-action">Upload Passport Identification Page</span>'
																stylePanelLayout="compact"
															/>
														</Col>
														<div style={{display: `${passport.length > 0 ? "none" : "block"}`}} className="text-danger">
															សូមបំពេញរូបភាពលិខិតឆ្លងដែនផ្ទៃខាងមុខចាំបាច់ !
														</div>
													</Row>
												</div>
												<div className="mb-3">
													<label for="exampleFormControlInput1" className="form-label main-label">
														រាជធានី/ខេត្ត
													</label>
													<div className="form-group">
														{/* <input
															type="text"
															className="form-control"
															placeholder="Location"
															aria-label="location"
															aria-describedby="button-addon2"
															name="location"
															onChange={campaignForm.handleChange}
															value={campaignForm.values.location}
														/> */}
														<Select
															options={locations}
															className="campaign-select-input"
															placeholder="រាជធានី/ខេត្ត"
															isClearable={true}
															isSearchable={true}
															onChange={setLocation}
															name="location"
															value={location}
														/>
													</div>
													{campaignForm.errors.location && campaignForm.touched.location ? (
														<div className="text-danger">{campaignForm.errors.location}</div>
													) : null}
												</div>
												<div className="mb-3">
													<label for="creatorCity" className="form-label main-label">
														ទីលំនៅបច្ចុប្បន្ន
													</label>
													<div className="row g-3">
														<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
															<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ផ្ទះលេខ</label>
															<input
																type="text"
																className="form-control"
																id="houseNumber"
																placeholder="ផ្ទះលេខ"
																name="houseNumber"
																onChange={campaignForm.handleChange}
																value={campaignForm?.values?.houseNumber}
															/>
															{campaignForm.errors.houseNumber && campaignForm.touched.houseNumber ? (
																<div className="text-danger">{campaignForm.errors.houseNumber}</div>
															) : null}
														</Col>
														<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
															<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ផ្លូវលេខ</label>
															<input
																type="text"
																className="form-control"
																id="streetNumber"
																placeholder="ផ្លូវលេខ"
																name="streetNumber"
																onChange={campaignForm.handleChange}
																value={campaignForm?.values?.streetNumber}
															/>
														</Col>
														<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
															<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ក្រុមទី</label>
															<input
																type="text"
																className="form-control"
																id="teamNumber"
																placeholder="ក្រុមទី"
																name="teamNumber"
																onChange={campaignForm.handleChange}
																value={campaignForm?.values?.teamNumber}
															/>
														</Col>
														<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
															<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ភូមិ</label>
															<input
																type="text"
																className="form-control"
																id="phum"
																placeholder="ភូមិ"
																name="phum"
																onChange={campaignForm.handleChange}
																value={campaignForm?.values?.phum}
															/>
														</Col>
														<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
															<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ឃុំ/សង្កាត់</label>
															<input
																type="text"
																className="form-control"
																id="sangkat"
																placeholder="ឃុំ/សង្កាត់"
																name="sangkat"
																onChange={campaignForm.handleChange}
																value={campaignForm?.values?.sangkat}
															/>
														</Col>
														<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
															<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ស្រុក/ខណ្ឌ</label>
															<input
																type="text"
																className="form-control"
																id="khan"
																placeholder="ស្រុក/ខណ្ឌ"
																name="khan"
																onChange={campaignForm.handleChange}
																value={campaignForm?.values?.khan}
															/>
														</Col>
													</div>
												</div>
												<div className="mb-3">
													<label for="date" className="form-label main-label">
														ថ្ងៃធ្វើលិខិត
													</label>
													<input
														type="date"
														className="form-control"
														id="date"
														placeholder="Date"
														name="date"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.date}
													/>
												</div>
												<div className="mb-3">
													<label for="date" className="form-label main-label">
														តើអ្នកបាននិងកំពុងចូលរួមសកម្មភាពបម្រើឲ្យចលនាណាមួយនៅក្រៅប្រទេស ឬក្នុងប្រទេស ដើម្បី ប្រឆាំងនឹងមនុស្សជាតិដែរឬទេ?
													</label>
													<div className="row">
														<div style={{display: "flex",alignItems: "center",gap: "5px", flex: "25%", maxWidth: "25%"}}>
															<input
																style={{width: "25px",height: "25px"}}
																type="radio"
																id="agree"
																name="againstHumanity"
																value="agree"
																checked={againstHumanity == "agree"}
																onChange={(e) => setAgainstHumanity(e.target.value)}
															/>
															<label htmlFor="agree" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>បានចូលរួម</label>
														</div>
														<div style={{display: "flex",alignItems: "center",gap: "5px",flex: "26%", maxWidth: "26%"}}>
															<input
																style={{width: "25px",height: "25px"}}
																type="radio"
																id="disagree"
																name="againstHumanity"
																value="disagree"
																checked={againstHumanity == "disagree"}
																onChange={(e) => setAgainstHumanity(e.target.value)}
															/>
															<label  htmlFor="disagree" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>មិនបានចូលរួម</label>
														</div>
													</div>
													<div style={{display: `${againstHumanity ? "none" : "block"}`}} className="text-danger">
														សូមបំពេញព័ត៌មាននៅខាងលើនេះដោយត្រឹមត្រូវ!
													</div>
												</div>
												<div className="mb-3">
													<label for="date" className="form-label main-label">
														ខ្ញុំបាទ/នាងខ្ញុំសុំធានា និងអះអាងថា មិនយកតួនាទីជាសមាជិក ឫសកម្មភាពសមាគម ទៅបម្រើផល ប្រយោជន៍ឲ្យគណបក្សនយោបាយណាមួយឡើយ ។ <br />
														ខ្ញុំបាទ/នាងខ្ញុំ សូមធានា និងអះអាងថា អ្វីដែលបានរាបរាប់ខាងលើសុទ្ធតែជាការពិតទាំងអស់ បើសិន មានចំណុចណាមួយមិនពិត ខ្ញុំបាទ/នាងខ្ញុំសូមទទួលខុសត្រូវចំពោះមុខច្បាប់ជាធរមានដោយខ្លួនឯង ។
													</label>
													<div className="row">
														<div style={{display: "flex",alignItems: "center",gap: "5px", flex: "25%", maxWidth: "25%"}}>
															<input
																style={{width: "25px",height: "25px"}}
																type="radio"
																id="accept"
																name="politicalUse"
																value="accept"
																checked={politicalUse == "accept"}
																onChange={(e) => setPoliticalUse(e.target.value)}
															/>
															<label htmlFor="accept" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>យល់ព្រម</label>
														</div>
														<div style={{display: "flex",alignItems: "center",gap: "5px",flex: "26%", maxWidth: "26%"}}>
															<input
																style={{width: "25px",height: "25px"}}
																type="radio"
																id="reject"
																name="politicalUse"
																value="reject"
																checked={politicalUse == "reject"}
																onChange={(e) => setPoliticalUse(e.target.value)}
															/>
															<label  htmlFor="reject" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>មិនយល់ព្រម</label>
														</div>
													</div>
													<div style={{display: `${politicalUse ? "none" : "block"}`}} className="text-danger">
														សូមបំពេញព័ត៌មាននៅខាងលើនេះដោយត្រឹមត្រូវ!
													</div>
												</div>
											</Col>
										) : ""
									}
									{
										documentType?.value == "ID_CARD" ? (
											<>
												{
													idCardFront.length > 0 && againstHumanity && politicalUse ? (
														<button type="submit" className="btn-thm-small">
															{loadingSave ? (
																<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
															) : (
																<i className="fas fa-save"></i>
															)}{" "}
															Save
														</button>
													) : (
														<button type="submit" disabled style={{backgroundColor: "grey"}} className="btn-thm-small">
															{loadingSave ? (
																<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
															) : (
																<i className="fas fa-save"></i>
															)}{" "}
															Save
														</button>
													)
												}
											</>
										) : (
											<>
												{
													passport.length > 0 && againstHumanity && politicalUse ? (
														<button type="submit" className="btn-thm-small">
															{loadingSave ? (
																<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
															) : (
																<i className="fas fa-save"></i>
															)}{" "}
															Save
														</button>
													) : (
														<button type="submit" disabled style={{backgroundColor: "grey"}} className="btn-thm-small">
															{loadingSave ? (
																<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
															) : (
																<i className="fas fa-save"></i>
															)}{" "}
															Save
														</button>
													)
												}
											</>
										)
									}
									{"  "}
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
							<p className="total-balance">${parseFloat(user?.totalDonation)?.toFixed(2) || 0.0}</p>
						</div>
					</div>
					
					{
						user?.isMember != 1 ? (
							<div className="dashboard-body">
								<h2 className="section-title__title text-center">{t('general.for_membership')}</h2>
								<p className="total-balance text-center">
									Join the community to get benefit our country
								</p>
								<div className="text-center">
									<Link href="/form-information">
										<a className="main-menu__donate-btn" style={{ display: "inline-block", border: "none" }}>
											Join a Member Now
										</a>
									</Link>
								</div>
							</div>
						) : ""
					}
					

					{/* <div className="dashboard-body">
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
					</div> */}
				</Container>
			</section>
		</Layout>
	);
};

export default Dashboard;
