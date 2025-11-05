import Layout from "@/components/Layout/Layout";
import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Col, FloatingLabel, Form, Nav, NavLink, Row, Tab } from "react-bootstrap";
import Select from "react-select";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { api } from "src/config";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import locations from "@/data/location";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateCampaign = () => {
	// Template
	const [isLoadingSave, setLoadingSave] = useState(false);
	const router = useRouter();
	// Setup
	const token = Cookies.get("TOKEN");
	const {t} = useTranslation();
	const [fileProfile, setFileProfile] = useState([]);
	const [idCardFront, setIdCardFront] = useState([]);
	const [idCardBack, setIdCardBack] = useState([]);
	const [passport, setPassport] = useState([]);
	const [location, setLocation] = useState();
	const [againstHumanity, setAgainstHumanity] = useState("");
	const [politicalUse, setPoliticalUse] = useState("");
	const options2 = [
		{ value: "ID_CARD", label: "អត្តសញ្ញាណប័ណ្ណ" },
		{ value: "PASSPORT", label: "កាតលិខិតឆ្លងដែន" },
	];
	const options3 = [
		{ value: "male", label: "ប្រុស" },
		{ value: "female", label: "ស្រី" },
	];

	const [documentType, setDocumentType] = useState({ value: "ID_CARD", label: "អត្តសញ្ញាណប័ណ្ណ" });
	const [genderType, setGenderType] = useState({ value: "male", label: "ប្រុស" });
	const [address, setAddress] = useState({});

	const campaignForm = useFormik({
		initialValues: {
			location: null,
			city: null,
			date: null,
			phoneNumber: null,
			fullName: null,
			documentType: "",
			identityNumber: null,
			genderType: "",
			idCardBack: null,
			idCardFront: null,
			passport: null,
			profile: null,
		},
		validationSchema: Yup.object({
			date: Yup.date().required(),
			age: Yup.number().required(),
			phoneNumber: Yup.string().required(),
			fullName: Yup.string().required(),
			identityNumber: Yup.string().required(),
			// location: Yup.string().required(),
		}),
		onSubmit: async () => {
			campaignForm.values.documentType = documentType || "";
			campaignForm.values.genderType = genderType || "";
			campaignForm.values.location = location ? location.value : "";
			campaignForm.values.idCardBack = idCardBack?.length > 0 ? idCardBack[0]?.serverId : "";
			campaignForm.values.idCardFront = idCardFront?.length > 0 ? idCardFront[0]?.serverId : "";
			campaignForm.values.passport = passport?.length > 0 ? passport[0]?.serverId : "";
			campaignForm.values.profile = fileProfile?.length > 0 ? fileProfile[0]?.serverId : "";
			campaignForm.values.city = {houseNumber: campaignForm.values?.houseNumber,streetNumber: campaignForm.values?.streetNumber,teamNumber: campaignForm.values?.teamNumber,phum: campaignForm.values?.phum,sangkat: campaignForm.values?.sangkat,khan: campaignForm.values?.khan};
			campaignForm.values.politicalUse = politicalUse;
			campaignForm.values.againstHumanity = againstHumanity;
			setLoadingSave(true);
			await axios
				.request({
					method: "post",
					maxBodyLength: Infinity,
					url: `${api.BASE_URL}/web/campaign/user/application`,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					data: campaignForm.values,
				})
				.then((response) => {
					console.log(response);
					if (response.data.status == "success") {
						router.replace("/dashboard");
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

	return (
		<Layout pageTitle="Create Application For Member">
			{isLoadingSave && (
				<div className="lds-dual-ring-container" style={{ zIndex: 1000, height: "100vh", width: "100vw", position: "fixed" }}>
					<div className="lds-dual-ring"></div>
				</div>
			)}

			<section className="campaign-form-container">
				<div className="section">
					<div className="container">
						<div className="section-title">
							<h2 className="section-title__title" style={{ fontSize: "33px" }}>
								Create New {t('general.application_for_membership')}
							</h2>
							<Breadcrumb>
								<Breadcrumb.Item onClick={() => router.replace("/")}>Home</Breadcrumb.Item>
								<Breadcrumb.Item onClick={() => router.replace("/dashboard")}>Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item active>Create {t('general.application_for_membership')}</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<Tab.Container
							defaultActiveKey={1}
							mountOnEnter={true}
							onSelect={(e) => {
								setActive(e);
								window.scrollTo({ top: 0, behavior: "smooth" });
								campaignForm?.submitForm();
							}}
						>
							<Row>
								<Col md={4}>
									<Nav variant="tabs" className="nav nav-tabs tab-cards" id="submitListingTab">
										<Nav.Item className="d-flex flex-column">
											<Nav.Link eventKey={1}>
												{t('general.personal_information')}
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
								<Col md={8}>
									<Form onSubmit={campaignForm.handleSubmit} style={{ fontSize: "14px", fontWeight: "500" }} id="form-create-campaign">
										<Tab.Content className="d-flex flex-column flex-grow-1">
											<Tab.Pane eventKey={1}>
												<Row className="justify-content-between">
													<Col lg={8}>
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
																id="fullName"
																placeholder="ខ្ញុំបាទ/នាងខ្ញុំឈ្មោះ"
																name="fullName"
																onChange={campaignForm.handleChange}
																value={campaignForm.values.fullName}
															/>
															{campaignForm.errors.fullName && campaignForm.touched.fullName ? (
																<div className="text-danger">{campaignForm.errors.fullName}</div>
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
																type="number"
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
																defaultValue={documentType}
															/>
															<div className="form-floating">
																<input
																	type="text"
																	className="form-control"
																	id="id-number"
																	placeholder="ID / Passport Number"
																	name="identityNumber"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.identityNumber}
																/>
																<label for="id-number">លេខអត្តសញ្ញាណប័ណ្ណ / លេខលិខិតឆ្លងដែន</label>
																{campaignForm.errors.identityNumber && campaignForm.touched.identityNumber ? (
																	<div className="text-danger">{campaignForm.errors.identityNumber}</div>
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
															<div className="input-group">
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
																		value={address?.houseNumber}
																	/>
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
																		value={address?.streetNumber}
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
																		value={address?.teamNumber}
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
																		value={address?.phum}
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
																		value={address?.sangkat}
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
																		value={address?.khan}
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
													<Col lg={3}>
														<div className="mb-3">
															<label for="exampleFormControlInput1" className="form-label main-label">
																រូបថត 4 x 6
															</label>
															<div style={{ maxWidth: "150px" }}>
																<FilePond
																	files={fileProfile}
																	onupdatefiles={setFileProfile}
																	allowMultiple={true}
																	maxFiles={1}
																	storeAsFile={true}
																	server={`${api.BASE_URL}/save-image/users`}
																	name="file"
																	labelIdle='<span className="filepond--label-action">Browse Profile</span>'
																	stylePanelLayout="circle"
																/>
															</div>
														</div>
													</Col>
												</Row>
											</Tab.Pane>
										</Tab.Content>
										<>
											{/* <button type="submit" className="btn-thm btn-thm-primary" onClick={() => onSubmitForm()}>
												<i className="fas fa-save"></i> Submit
											</button> */}
											{
												documentType?.value == "ID_CARD" ? (
													<>
														{
															idCardFront.length > 0 && againstHumanity && politicalUse ? (
																<button type="submit" className="btn-thm btn-thm-primary">
																	<i className="fas fa-save"></i> Submit
																</button>
															) : (
																<button type="submit" disabled style={{backgroundColor: "grey"}} className="btn-thm btn-thm-primary">
																	<i className="fas fa-save"></i> Submit
																</button>
															)
														}
													</>
												) : (
													<>
														{
															passport.length > 0 && againstHumanity && politicalUse ? (
																<button type="submit" className="btn-thm btn-thm-primary">
																	<i className="fas fa-save"></i> Submit
																</button>
															) : (
																<button type="submit" disabled style={{backgroundColor: "grey"}} className="btn-thm btn-thm-primary">
																	<i className="fas fa-save"></i> Submit
																</button>
															)
														}
													</>
												)
											}
											
										</>
									</Form>
								</Col>
							</Row>
						</Tab.Container>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CreateCampaign;
