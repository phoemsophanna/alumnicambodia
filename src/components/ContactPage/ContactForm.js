import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Col, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "src/config";
import * as Yup from "yup";

const ContactForm = () => {
	const { t } = useTranslation();
	const [loadingSave, setLoadingSave] = useState(false);
  const alert = useAlert();

	const contactForm = useFormik({
		initialValues: {
			name: "",
			email: "",
			number: "",
			subject: "",
			text: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			email: Yup.string().required(),
			number: Yup.string().required(),
			subject: Yup.string().required(),
			text: Yup.string().required(),
		}),
		onSubmit: async (values) => onSendMessage(values),
	});

	const onSendMessage = async (value) => {
		setLoadingSave(true);
		await axios
			.request({
				method: "post",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/contact/send-email`,
				headers: {
					"Content-Type": "application/json",
				},
				data: value,
			})
			.then((response) => {
        if (response.data?.status === "success") {
          alert.success("Email is sending successfully.");
        } else {
          alert.error(response.data.message);
        }
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoadingSave(false);
				contactForm.resetForm();
			});
	};

	return (
		<div className="contact-page__form">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					contactForm.handleSubmit();
					return false;
				}}
				className="contact-page__main-form contact-form-validated"
			>
				<Row>
					<Col xl={12}>
						<div className="contact-page__input-box">
							<input
								type="text"
								placeholder={t("general.Yourname")}
								name="name"
								value={contactForm.values.name}
								onChange={contactForm.handleChange}
								onBlur={contactForm.handleBlur}
								style={{ marginBottom: contactForm.touched.name && contactForm.errors.name ? "0px" : "10px" }}
							/>
							{contactForm.touched.name && (
								<small style={{ padding: "0 30px", fontSize: "14px", fontWeight: 400, color: "red" }}>{contactForm.errors.name}</small>
							)}
						</div>
					</Col>
				</Row>
				<Row>
					<Col xl={6}>
						<div className="contact-page__input-box">
							<input
								type="email"
								placeholder={t("general.Emailaddress")}
								name="email"
								value={contactForm.values.email}
								onChange={contactForm.handleChange}
								onBlur={contactForm.handleBlur}
								style={{ marginBottom: contactForm.touched.email && contactForm.errors.email ? "0px" : "10px" }}
							/>
							{contactForm.touched.email && (
								<small style={{ padding: "0 30px", fontSize: "14px", fontWeight: 400, color: "red" }}>{contactForm.errors.email}</small>
							)}
						</div>
					</Col>
					<Col xl={6}>
						<div className="contact-page__input-box">
							<input
								type="text"
								placeholder={t("general.Subject")}
								name="subject"
								value={contactForm.values.subject}
								onChange={contactForm.handleChange}
								onBlur={contactForm.handleBlur}
								style={{ marginBottom: contactForm.touched.subject && contactForm.errors.subject ? "0px" : "10px" }}
							/>
							{contactForm.touched.subject && (
								<small style={{ padding: "0 30px", fontSize: "14px", fontWeight: 400, color: "red" }}>{contactForm.errors.subject}</small>
							)}
						</div>
					</Col>
				</Row>
				<Row>
					<Col xl={12}>
						<div className="contact-page__input-box">
							<input
								type="text"
								placeholder={t("general.PhoneNumber")}
								name="number"
								value={contactForm.values.number}
								onChange={contactForm.handleChange}
								onBlur={contactForm.handleBlur}
								style={{ marginBottom: contactForm.touched.number && contactForm.errors.number ? "0px" : "10px" }}
							/>
							{contactForm.touched.number && (
								<small style={{ padding: "0 30px", fontSize: "14px", fontWeight: 400, color: "red" }}>{contactForm.errors.number}</small>
							)}
						</div>
					</Col>
					<Col xl={12}>
						<div className="contact-page__input-box">
							<textarea
								name="text"
								placeholder={t("general.Writemessage")}
								value={contactForm.values.text}
								onChange={contactForm.handleChange}
								onBlur={contactForm.handleBlur}
                style={{ marginBottom: contactForm.touched.text && contactForm.errors.text ? "0px" : "10px" }}
							></textarea>
              {contactForm.touched.text && (
								<small style={{ padding: "0 30px", fontSize: "14px", fontWeight: 400, color: "red" }}>{contactForm.errors.text}</small>
							)}
						</div>
						{loadingSave ? (
							<button type="button" className="thm-btn contact-page__btn">
								<Spinner animation="border" size="sm" />
								Loading...
							</button>
						) : (
							<button type="submit" className="thm-btn contact-page__btn">
								<i className="fas fa-arrow-circle-right"></i>
								{t("general.SendaMessage")}
							</button>
						)}
					</Col>
				</Row>
			</form>
		</div>
	);
};

export default ContactForm;
