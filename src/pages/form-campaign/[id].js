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
import LocationPickerModal from "@/components/GoogleMap/LocationPickerModal";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateCampaign = (props) => {
	// Template
	const [isLoadingSave, setLoadingSave] = useState(false);
	const router = useRouter();
	const [autoTranslate, setAutoTranslate] = useState(true);
	const [showLocationPicker, setLocationPicker] = useState(false);
	// Setup
	const token = Cookies.get("TOKEN");
	const [activeTabClasses, setActive] = useState(1);
	const [editorHtml, setEditorHtml] = useState("");
	const [editorHtml1, setEditorHtml1] = useState("");
	const [campaignGallery, setCampaignGallery] = useState([]);
	const [fileVideos, setFileVideos] = useState([]);
	const [fileProfile, setFileProfile] = useState([]);
	const [idCardFront, setIdCardFront] = useState([]);
	const [idCardBack, setIdCardBack] = useState([]);
	const [passport, setPassport] = useState([]);
	const [options, setOptions] = useState(null);
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
	const options2 = [
		{ value: "identity", label: "Identity Card" },
		{ value: "passport", label: "Passport Card" },
	];
	function handleChange(html) {
		console.log(html);
		setEditorHtml(html);
	}
	function handleChange1(html) {
		setEditorHtml1(html);
	}
	const API_KEY = "AIzaSyDn6hn38KkZyMzq5uFLNd4kogBmzPkyCho";
	const API_URL = "https://translation.googleapis.com/language/translate/v2";

	const translateText = async (text, targetLanguage) => {
		const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
			q: text,
			target: targetLanguage,
		});

		return response.data.data.translations[0].translatedText;
	};
	const [campaignCategory, setCampaignCategory] = useState(null);
	const fetchCategories = async () => {
		await axios
			.get(`${api.BASE_URL}/category-dropdown`)
			.then((res) => {
				if (res.data.status == "success") {
					setOptions(res.data.categories?.map((el) => ({ value: el.id, label: el.name })));
				}
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};
	const [documentType, setDocumentType] = useState({ value: "identity", label: "Identity Card" });

	const [detail, setDetail] = useState(null);

	const fetchDetail = async (id) => {
		// fetch single post
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/campaign-web/detail?id=${id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setDetail(response.data.model);
			})
			.catch((err) => {
				console.error("Error: " + err);
			});
	};

	useEffect(() => {
		if (router.query.id) {
			console.log(router.query.id);
			fetchDetail(router.query.id);
		}
	}, [router]);

	useEffect(() => {
		fetchCategories();
		setCampaignCategory(detail?.campaignCategory);
		setDocumentType(detail?.documentType);
		setEditorHtml(detail?.fullStory);
		setEditorHtml1(detail?.fullStoryKm);
		setCampaignGallery(
			detail?.campaignGallery?.length > 0 ? detail?.campaignGallery?.map((img) => ({ source: img, options: { type: "local" } })) : []
		);
		setFileVideos(detail?.videoFile ? [{ source: detail?.videoFile, options: { type: "local" } }] : []);
		setFileProfile(detail?.profile ? [{ source: detail?.profile, options: { type: "local" } }] : []);
		setIdCardFront(detail?.idCardFront ? [{ source: detail?.idCardFront, options: { type: "local" } }] : []);
		setIdCardBack(detail?.idCardBack ? [{ source: detail?.idCardBack, options: { type: "local" } }] : []);
		setPassport(detail?.passport ? [{ source: detail?.passport, options: { type: "local" } }] : []);
	}, [detail]);

	const campaignForm = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: detail?.id,
			campaignCategory: detail?.campaignCategory,
			location: detail?.location,
			city: detail?.city,
			campaignTile: detail?.campaignTile,
			campaignTileKm: detail?.campaignTileKm,
			fullStory: detail?.fullStory,
			fullStoryKm: detail?.fullStoryKm,
			additionalInformation: detail?.additionalInformation,
			additionalInformationKm: detail?.additionalInformationKm,
			involvement: detail?.involvement,
			involvementKm: detail?.involvementKm,
			referenceLink: detail?.referenceLink,
			goal: detail?.goal,
			startDate: detail?.startDate,
			endDate: detail?.endDate,
			gratitude: detail?.gratitude,
			gratitudeKm: detail?.gratitudeKm,
			campaignFor: detail?.campaignFor,
			phoneNumber: detail?.phoneNumber,
			fullName: detail?.fullName,
			documentType: detail?.documentType,
			identityNumber: detail?.identityNumber,
			creatorLocation: detail?.creatorLocation,
			creatorCity: detail?.creatorCity,
			receiveByBank: detail?.receiveByBank,
			accountName: detail?.accountName,
			accountNumber: detail?.accountNumber,
			videoLink: detail?.videoLink,
			campaignGallery: detail?.campaignGallery,
			videoFile: detail?.videoFile,
			idCardBack: detail?.idCardBack,
			idCardFront: detail?.idCardFront,
			passport: detail?.passport,
			profile: detail?.profile,
			status: detail?.status,
		},
		validationSchema: Yup.object({
			campaignTile: Yup.string().required(),
			goal: Yup.number().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date().required(),
			phoneNumber: Yup.string().required(),
			fullName: Yup.string().required(),
			identityNumber: Yup.string().required(),
			receiveByBank: Yup.string().required(),
			accountName: Yup.string().required(),
			accountNumber: Yup.string().required(),
		}),
		onSubmit: () => {},
	});

	const onSubmitForm = async () => {
		campaignForm.values.campaignCategory = campaignCategory || "";
		campaignForm.values.fullStory = editorHtml1 || "";
		campaignForm.values.fullStoryKm = editorHtml || "";
		campaignForm.values.documentType = documentType || "";
		campaignForm.values.campaignGallery = campaignGallery?.length > 0 ? campaignGallery.map((file) => file.serverId || file.source) : [];
		campaignForm.values.videoFile = fileVideos?.length > 0 ? fileVideos[0]?.serverId || fileVideos[0]?.source : "";
		campaignForm.values.idCardBack = idCardBack?.length > 0 ? idCardBack[0]?.serverId || idCardBack[0]?.source : "";
		campaignForm.values.idCardFront = idCardFront?.length > 0 ? idCardFront[0]?.serverId || idCardFront[0]?.source : "";
		campaignForm.values.passport = passport?.length > 0 ? passport[0]?.serverId || passport[0]?.source : "";
		campaignForm.values.profile = fileProfile?.length > 0 ? fileProfile[0]?.serverId || fileProfile[0]?.source : "";
		campaignForm.values.status = "PENDING";
		console.log(campaignForm.values);

		setLoadingSave(true);
		await axios
			.request({
				method: "post",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/campaign-web`,
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
	};

	const saveDraft = async () => {
		campaignForm.values.campaignCategory = campaignCategory || "";
		campaignForm.values.fullStory = editorHtml1 || "";
		campaignForm.values.fullStoryKm = editorHtml || "";
		campaignForm.values.documentType = documentType || "";
		campaignForm.values.campaignGallery = campaignGallery?.length > 0 ? campaignGallery.map((file) => file.serverId || file.source) : [];
		campaignForm.values.videoFile = fileVideos?.length > 0 ? fileVideos[0]?.serverId || fileVideos[0]?.source : "";
		campaignForm.values.idCardBack = idCardBack?.length > 0 ? idCardBack[0]?.serverId || idCardBack[0]?.source : "";
		campaignForm.values.idCardFront = idCardFront?.length > 0 ? idCardFront[0]?.serverId || idCardFront[0]?.source : "";
		campaignForm.values.passport = passport?.length > 0 ? passport[0]?.serverId || passport[0]?.source : "";
		campaignForm.values.profile = fileProfile?.length > 0 ? fileProfile[0]?.serverId || fileProfile[0]?.source : "";
		campaignForm.values.status = "DRAFT";

		setLoadingSave(true);
		await axios
			.request({
				method: "post",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/campaign-web`,
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
	};

	const handleNextTapCampaign = () => {
		if (campaignForm.values.campaignTile && campaignCategory?.value) {
			return false;
		} else {
			return true;
		}
	};

	const handleNextTapMedia = () => {
		if (campaignGallery.length > 0) {
			return false;
		} else {
			return true;
		}
	};

	const handleNextTapGoal = () => {
		if (
			campaignForm.values.goal &&
			campaignForm.values.startDate &&
			campaignForm.values.endDate
		) {
			return false;
		} else {
			return true;
		}
	};
	const handleSelectLocation = (value) => {
		console.log(value);
		campaignForm.values.location = value?.address;
		campaignForm.values.city = value?.city;
	};

	return (
		<Layout pageTitle="Update Campaign">
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
								Update Campaign
							</h2>
							<Breadcrumb>
								<Breadcrumb.Item onClick={() => router.replace("/")}>Home</Breadcrumb.Item>
								<Breadcrumb.Item onClick={() => router.replace("/dashboard")}>Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item active>Update Campaign</Breadcrumb.Item>
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
										<Nav.Item className="d-flex  flex-column">
											<Nav.Link eventKey={1}>
												<span>01</span> Campaign
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="d-flex  flex-column">
											<Nav.Link eventKey={2} disabled={handleNextTapCampaign()}>
												<span>02</span> Media
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="d-flex  flex-column">
											<Nav.Link eventKey={3} disabled={handleNextTapCampaign() || handleNextTapMedia()}>
												<span>03</span> Goal
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="d-flex flex-column">
											<Nav.Link eventKey={4} disabled={handleNextTapCampaign() || handleNextTapMedia() || handleNextTapGoal()}>
												<span>04</span> Personal Information
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
								<Col md={8}>
									<Form onSubmit={campaignForm.handleSubmit} style={{ fontSize: "14px", fontWeight: "500" }} id="form-create-campaign">
										<Tab.Content className="d-flex flex-column flex-grow-1">
											<Tab.Pane eventKey={1}>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Campaign Category
													</label>
													<Select
														options={options}
														className="campaign-select-input"
														placeholder="Select Campaign"
														isClearable={true}
														isSearchable={true}
														onChange={setCampaignCategory}
														name="campaignCategory"
														value={campaignCategory}
														defaultValue={campaignCategory}
													/>
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Location
													</label>
													<div className="input-group">
														<input
															type="text"
															className="form-control"
															placeholder="Location"
															aria-label="Location"
															aria-describedby="button-addon2"
															name="location"
															onChange={campaignForm.handleChange}
															value={campaignForm.values.location}
														/>
														<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => setLocationPicker(true)}>
															<i className="fas fa-map-marker-alt"></i>
														</button>
													</div>
													<LocationPickerModal
														show={showLocationPicker}
														onHide={() => setLocationPicker(false)}
														onSelectLocation={handleSelectLocation}
													/>
													{campaignForm.errors.location && campaignForm.touched.location ? (
														<div className="text-danger">{campaignForm.errors.location}</div>
													) : null}
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														City/Province
													</label>
													<input
														type="text"
														className="form-control"
														id="exampleFormControlInput1"
														placeholder="City/Province"
														name="city"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.city}
													/>
													{campaignForm.errors.city && campaignForm.touched.city ? (
														<div className="text-danger">{campaignForm.errors.city}</div>
													) : null}
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Campaign
													</label>
													<div className="translate-card">
														<label htmlFor="exampleFormControlInput1" className="form-label with-form-check">
															Title
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	checked={autoTranslate}
																	onChange={() => setAutoTranslate(!autoTranslate)}
																	id="flexCheckDefaultTitle"
																/>
																<label className="form-check-label" htmlFor="flexCheckDefaultTitle">
																	Auto-Translate
																</label>
															</div>
														</label>
														<div className="input-translate">
															<div className="form-floating">
																<input
																	type="text"
																	className="form-control bottom-0"
																	id="campaignTileKm"
																	name="campaignTileKm"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.campaignTileKm}
																/>
																<label htmlFor="campaignTileKm">Khmer</label>
															</div>
															{autoTranslate ? (
																<button
																	className="btn-translate"
																	type="button"
																	onClick={async () => {
																		if (campaignForm.values.campaignTileKm) {
																			campaignForm.setFieldValue("campaignTile", await translateText(campaignForm.values.campaignTileKm, "en"));
																		} else {
																			campaignForm.setFieldValue("campaignTileKm", await translateText(campaignForm.values.campaignTile, "km"));
																		}
																	}}
																>
																	<i className="fas fa-sync"></i>
																</button>
															) : null}

															<div className="form-floating">
																<input
																	type="text"
																	className="form-control top-0"
																	id="campaignTile"
																	name="campaignTile"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.campaignTile}
																/>
																<label htmlFor="campaignTile">English</label>
															</div>
														</div>
														{(campaignForm.errors.campaignTileKm && campaignForm.touched.campaignTileKm) ||
														(campaignForm.errors.campaignTile && campaignForm.touched.campaignTile) ? (
															<div className="text-danger">Campaign title is required</div>
														) : null}
													</div>
												</div>
												<div className="mb-3">
													<div className="translate-card">
														<label htmlFor="exampleFormControlInput1" className="form-label with-form-check">
															Full Story
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	checked={autoTranslate}
																	onChange={() => setAutoTranslate(!autoTranslate)}
																	id="flexCheckDefaultFullStory"
																/>
																<label className="form-check-label" htmlFor="flexCheckDefaultFullStory">
																	Auto-Translate
																</label>
															</div>
														</label>
														<div className="input-translate">
															<ReactQuill
																theme="snow"
																onChange={handleChange}
																value={editorHtml}
																modules={{
																	toolbar: [
																		[{ header: "1" }, { header: "2" }, { font: [] }],
																		[{ size: [] }],
																		["bold", "italic", "underline", "strike", "blockquote"],
																		[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
																		["link", "image", "video"],
																		["clean"],
																	],
																	clipboard: {
																		// toggle to add extra line breaks when pasting HTML:
																		matchVisual: false,
																	},
																}}
																formats={[
																	"header",
																	"font",
																	"size",
																	"bold",
																	"italic",
																	"underline",
																	"strike",
																	"blockquote",
																	"list",
																	"bullet",
																	"indent",
																	"link",
																	"image",
																	"video",
																]}
																placeholder="Khmer"
															/>
															{autoTranslate ? (
																<button
																	className="btn-translate"
																	type="button"
																	onClick={async () => {
																		if (editorHtml) {
																			setEditorHtml1(await translateText(editorHtml, "en"));
																		} else {
																			setEditorHtml(await translateText(editorHtml1, "km"));
																		}
																	}}
																>
																	<i className="fas fa-sync"></i>
																</button>
															) : null}
															<ReactQuill
																theme="snow"
																onChange={handleChange1}
																value={editorHtml1}
																modules={{
																	toolbar: [
																		[{ header: "1" }, { header: "2" }, { font: [] }],
																		[{ size: [] }],
																		["bold", "italic", "underline", "strike", "blockquote"],
																		[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
																		["link", "image", "video"],
																		["clean"],
																	],
																	clipboard: {
																		// toggle to add extra line breaks when pasting HTML:
																		matchVisual: false,
																	},
																}}
																formats={[
																	"header",
																	"font",
																	"size",
																	"bold",
																	"italic",
																	"underline",
																	"strike",
																	"blockquote",
																	"list",
																	"bullet",
																	"indent",
																	"link",
																	"image",
																	"video",
																]}
																placeholder="English"
															/>
														</div>
													</div>
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Additional Information
													</label>
													<div className="translate-card">
														<label htmlFor="exampleFormControlInput1" className="form-label with-form-check">
															Use of Funds
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	checked={autoTranslate}
																	onChange={() => setAutoTranslate(!autoTranslate)}
																	id="flexCheckDefaultAddInfo"
																/>
																<label className="form-check-label" htmlFor="flexCheckDefaultAddInfo">
																	Auto-Translate
																</label>
															</div>
														</label>
														<div className="input-translate">
															<div className="form-floating">
																<textarea
																	className="form-control bottom-0 text-area-h-1"
																	placeholder="..."
																	id="additionalInformationKm"
																	name="additionalInformationKm"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.additionalInformationKm}
																></textarea>
																<label htmlFor="additionalInformationKm">Khmer</label>
															</div>
															{autoTranslate ? (
																<button
																	className="btn-translate"
																	type="button"
																	onClick={async () => {
																		if (campaignForm.values.additionalInformationKm) {
																			campaignForm.setFieldValue(
																				"additionalInformation",
																				await translateText(campaignForm.values.additionalInformationKm, "en")
																			);
																		} else {
																			campaignForm.setFieldValue(
																				"additionalInformationKm",
																				await translateText(campaignForm.values.additionalInformation, "km")
																			);
																		}
																	}}
																>
																	<i className="fas fa-sync"></i>
																</button>
															) : null}
															<div className="form-floating">
																<textarea
																	className="form-control top-0 text-area-h-1"
																	placeholder="..."
																	id="additionalInformation"
																	name="additionalInformation"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.additionalInformation}
																></textarea>
																<label htmlFor="additionalInformation">English</label>
															</div>
														</div>
														{(campaignForm.errors.additionalInformationKm && campaignForm.touched.additionalInformationKm) ||
														(campaignForm.errors.additionalInformation && campaignForm.touched.additionalInformation) ? (
															<div className="text-danger">Additional Information is required</div>
														) : null}
													</div>
												</div>
												<div className="mb-3">
													<div className="translate-card">
														<label htmlFor="exampleFormControlInput1" className="form-label with-form-check">
															Your Involvement
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	checked={autoTranslate}
																	onChange={() => setAutoTranslate(!autoTranslate)}
																	id="flexCheckDefaultInvo"
																/>
																<label className="form-check-label" htmlFor="flexCheckDefaultInvo">
																	Auto-Translate
																</label>
															</div>
														</label>
														<div className="input-translate">
															<div className="form-floating">
																<textarea
																	className="form-control bottom-0 text-area-h-1"
																	placeholder="..."
																	id="involvementKm"
																	name="involvementKm"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.involvementKm}
																></textarea>
																<label htmlFor="involvementKm">Khmer</label>
															</div>
															{autoTranslate ? (
																<button
																	className="btn-translate"
																	type="button"
																	onClick={async () => {
																		if (campaignForm.values.involvementKm) {
																			campaignForm.setFieldValue("involvement", await translateText(campaignForm.values.involvementKm, "en"));
																		} else {
																			campaignForm.setFieldValue("involvementKm", await translateText(campaignForm.values.involvement, "km"));
																		}
																	}}
																>
																	<i className="fas fa-sync"></i>
																</button>
															) : null}
															<div className="form-floating">
																<textarea
																	className="form-control top-0 text-area-h-1"
																	placeholder="..."
																	id="involvement"
																	name="involvement"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.involvement}
																></textarea>
																<label htmlFor="involvement">English</label>
															</div>
														</div>
														{(campaignForm.errors.involvementKm && campaignForm.touched.involvementKm) ||
														(campaignForm.errors.involvement && campaignForm.touched.involvement) ? (
															<div className="text-danger">Involvement is required</div>
														) : null}
													</div>
												</div>
												<div className="mb-3">
													<label htmlFor="reference-link" className="form-label main-label">
														Reference Link
													</label>
													<input
														type="text"
														className="form-control"
														id="reference-link"
														placeholder="Reference Link"
														name="referenceLink"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.referenceLink}
													/>
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey={2}>
												<div className="mb-3 gallery-container">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Photo
													</label>
													<FilePond
														files={campaignGallery}
														onupdatefiles={setCampaignGallery}
														allowMultiple={true}
														maxFiles={5}
														server={`${api.BASE_URL}/save-image/campaign`}
														name="file"
														labelIdle='Drag & Drop photos or <span className="filepond--label-action">Browse</span>'
													/>
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Video
													</label>
													<div className="card-upload-video">
														<div className="form-floating">
															<input
																type="text"
																className="form-control"
																id="videoLink"
																placeholder="http://..."
																name="videoLink"
																onChange={campaignForm.handleChange}
																value={campaignForm.values.videoLink}
															/>
															<label htmlFor="videoLink">Video Link</label>
														</div>
														<span className="card-upload-video-hr">OR</span>
														<FilePond
															files={fileVideos}
															onupdatefiles={setFileVideos}
															allowMultiple={true}
															maxFiles={1}
															storeAsFile={true}
															server={`${api.BASE_URL}/save-image/campaign`}
															name="file"
															labelIdle='Drag & Drop video or <span className="filepond--label-action">Browse</span>'
														/>
													</div>
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey={3}>
												<div className="mb-3">
													<label htmlFor="goal-1" className="form-label main-label">
														Goal
													</label>
													<input
														type="text"
														className="form-control"
														id="goal-1"
														placeholder="Amount in US dollars ($)"
														name="goal"
														onChange={campaignForm.handleChange}
														value={campaignForm.values.goal}
													/>
												</div>
												<div className="mb-3">
													<label htmlFor="goal-1" className="form-label main-label">
														Duration
													</label>
													<Row>
														<Col lg={6}>
															<FloatingLabel controlId="floatingInput" label="Start Date" className="mb-3">
																<Form.Control
																	type="date"
																	placeholder="enter date"
																	name="startDate"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.startDate}
																/>
															</FloatingLabel>
														</Col>
														<Col lg={6}>
															<FloatingLabel controlId="floatingInput2" label="End Date" className="mb-3">
																<Form.Control
																	type="date"
																	placeholder="enter date"
																	name="endDate"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.endDate}
																/>
															</FloatingLabel>
														</Col>
													</Row>
												</div>
												<div className="mb-3">
													<div className="translate-card">
														<label htmlFor="exampleFormControlInput1" className="form-label with-form-check">
															Gratitude to the donor
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	checked={autoTranslate}
																	onChange={() => setAutoTranslate(!autoTranslate)}
																	id="flexCheckDefaultDonor"
																/>
																<label className="form-check-label" htmlFor="flexCheckDefaultDonor">
																	Auto-Translate
																</label>
															</div>
														</label>
														<div className="input-translate">
															<div className="form-floating">
																<textarea
																	className="form-control bottom-0 text-area-h-1"
																	placeholder="..."
																	id="gratitude-1"
																	name="gratitudeKm"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.gratitudeKm}
																></textarea>
																<label htmlFor="gratitude-1">Khmer</label>
															</div>
															{autoTranslate ? (
																<button
																	className="btn-translate"
																	type="button"
																	onClick={async () => {
																		if (campaignForm.values.gratitudeKm) {
																			campaignForm.setFieldValue("gratitude", await translateText(campaignForm.values.gratitudeKm, "en"));
																		} else {
																			campaignForm.setFieldValue("gratitudeKm", await translateText(campaignForm.values.gratitude, "km"));
																		}
																	}}
																>
																	<i className="fas fa-sync"></i>
																</button>
															) : null}
															<div className="form-floating">
																<textarea
																	className="form-control top-0 text-area-h-1"
																	placeholder="..."
																	id="gratitude-2"
																	name="gratitude"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.gratitude}
																></textarea>
																<label htmlFor="gratitude-2">English</label>
															</div>
														</div>
													</div>
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey={4}>
												<div className="mb-3">
													<label htmlFor="campaignFor" className="form-label main-label">
														Create a campaign for{" "}
													</label>
													<div className="pill-style-radio-inline">
														<label className="pill-style-radio">
															<input
																type="radio"
																name="campaignFor"
																checked={campaignForm.values.campaignFor == 1}
																id="radio1"
																onChange={campaignForm.handleChange}
																value={1}
															/>
															<span>MYSELF</span>
														</label>
														<label className="pill-style-radio" htmlFor="radio2">
															<input
																type="radio"
																name="campaignFor"
																checked={campaignForm.values.campaignFor == 2}
																id="radio2"
																onChange={campaignForm.handleChange}
																value={2}
															/>
															<span>SOMEONE ELSE</span>
														</label>
													</div>
												</div>
												<Row className="justify-content-between">
													<Col lg={8}>
														<div className="mb-3">
															<label htmlFor="phoneNumber" className="form-label main-label">
																Phone Number
															</label>
															<input
																type="text"
																className="form-control"
																id="phoneNumber"
																placeholder="Phone Number"
																name="phoneNumber"
																onChange={campaignForm.handleChange}
																value={campaignForm.values.phoneNumber}
															/>
														</div>
														<div className="mb-3">
															<label htmlFor="fullName" className="form-label main-label">
																Full Name
															</label>
															<input
																type="text"
																className="form-control"
																id="fullName"
																placeholder="Full Name"
																name="fullName"
																onChange={campaignForm.handleChange}
																value={campaignForm.values.fullName}
															/>
														</div>
														<div className="mb-3">
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
																	name="identityNumber"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.identityNumber}
																/>
																<label htmlFor="id-number">ID / Passport Number</label>
															</div>
															<Row className="mt-2" style={{ display: documentType?.value == "passport" ? "none" : "" }}>
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
															<Row className="mt-2" style={{ display: documentType?.value == "identity" ? "none" : "" }}>
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
															<label htmlFor="exampleFormControlInput1" className="form-label main-label">
																Location
															</label>
															<div className="input-group">
																<input
																	type="text"
																	className="form-control"
																	placeholder="Location"
																	aria-label="Location"
																	aria-describedby="button-addon2"
																	name="creatorLocation"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.creatorLocation}
																/>
																<button className="btn btn-outline-secondary" type="button" id="button-addon2">
																	<i className="fas fa-map-marker-alt"></i>
																</button>
															</div>
														</div>
														<div className="mb-3">
															<label htmlFor="creatorCity" className="form-label main-label">
																City/Province
															</label>
															<input
																type="text"
																className="form-control"
																id="creatorCity"
																placeholder="City/Province"
																name="creatorCity"
																onChange={campaignForm.handleChange}
																value={campaignForm.values.creatorCity}
															></input>
														</div>
														<div className="mb-3">
															<label className="form-label main-label">Bank Account to Receive Funds</label>
															<FloatingLabel controlId="floatingSelect" label="Choose Bank" className="mb-2">
																<Form.Select
																	aria-label="Choose Bank"
																	name="receiveByBank"
																	onChange={campaignForm.handleChange}
																	value={campaignForm.values.receiveByBank}
																>
																	<option>Choose Bank</option>
																	<option value="sathapana">Sathapana Bank Payment</option>
																	<option value="noaccount">I don't have any account yet.</option>
																</Form.Select>
															</FloatingLabel>
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
														</div>
													</Col>
													<Col lg={3}>
														<div className="mb-3">
															<label htmlFor="exampleFormControlInput1" className="form-label main-label">
																Profile Picture
															</label>
															<div style={{ maxWidth: "150px" }}>
																<FilePond
																	files={fileProfile}
																	onupdatefiles={setFileProfile}
																	allowMultiple={true}
																	maxFiles={1}
																	storeAsFile={true}
																	server={`${api.BASE_URL}/save-image/campaign`}
																	name="file"
																	labelIdle='<span className="filepond--label-action">Browse Profile</span>'
																	stylePanelLayout="compact circle"
																/>
															</div>
														</div>
													</Col>
												</Row>
											</Tab.Pane>
										</Tab.Content>

										{activeTabClasses == 1 ? (
											<>
												<NavLink eventKey={handleNextTapCampaign() ? 1 : 2}>
													<button type="button" className="btn-thm btn-thm-primary">
														<i className="fas fa-arrow-circle-right"></i>Next
													</button>
												</NavLink>
												{!handleNextTapCampaign() ? (
													<button type="button" className="btn-thm btn-thm-info" onClick={() => saveDraft()}>
														<i className="fas fa-save"></i>Save Draft
													</button>
												) : null}
											</>
										) : activeTabClasses == 2 ? (
											<>
												<NavLink eventKey={1}>
													<button type="button" className="btn-thm btn-thm-light">
														<i className="fas fa-arrow-circle-left"></i>Back
													</button>
												</NavLink>
												<NavLink eventKey={handleNextTapMedia() ? 2 : 3}>
													<button type="button" className="btn-thm btn-thm-primary">
														<i className="fas fa-arrow-circle-right"></i>Next
													</button>
												</NavLink>
												{!handleNextTapCampaign() ? (
													<button type="button" className="btn-thm btn-thm-info" onClick={() => saveDraft()}>
														<i className="fas fa-save"></i>Save Draft
													</button>
												) : null}
											</>
										) : activeTabClasses == 3 ? (
											<>
												<NavLink eventKey={2}>
													<button type="button" className="btn-thm btn-thm-light">
														<i className="fas fa-arrow-circle-left"></i>Back
													</button>
												</NavLink>
												<NavLink eventKey={handleNextTapGoal() ? 3 : 4}>
													<button type="button" className="btn-thm btn-thm-primary">
														<i className="fas fa-arrow-circle-right"></i>Next
													</button>
												</NavLink>
												<button type="button" className="btn-thm btn-thm-info">
													<i className="fas fa-save"></i>Save Draft
												</button>
											</>
										) : (
											<>
												<NavLink eventKey={3}>
													<button type="button" className="btn-thm btn-thm-light">
														<i className="fas fa-arrow-circle-left"></i>Back
													</button>
												</NavLink>
												<button type="button" className="btn-thm btn-thm-info">
													<i className="fas fa-save"></i>Save Draft
												</button>
											</>
										)}
										{!handleNextTapCampaign() && !handleNextTapMedia() && !handleNextTapGoal() ? (
											<button type="submit" className="btn-thm btn-thm-primary" onClick={() => onSubmitForm()}>
												<i className="fas fa-save"></i>Submit
											</button>
										) : null}
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

export default UpdateCampaign;
