import Layout from "@/components/Layout/Layout";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAlert } from "react-alert";
import { Breadcrumb, Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { api } from "src/config";

const Withdraw = () => {
	const alert = useAlert();
	const [campaignList, setCampaignList] = useState([]);
	const [campaignRecord, setCampaignRecord] = useState({
		pending: 0,
		draft: 0,
		complete: 0,
		inactive: 0,
		reject: 0,
		fail: 0,
		total: 0,
	});
	const [balance, setBalance] = useState(0.0);
	const [showModal, setShowModal] = useState(false);
	const [selectCampaign, setSelectCampaign] = useState(null);
	const [isFetchingWithdraw, setFetchingWithdraw] = useState(false);
	const [user, setUser] = useState(null);
	const token = Cookies.get("TOKEN");
	const router = useRouter();

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
					setUser(response.data);
				})
				.catch((error) => {
					console.log(error);
					router.replace("/");
				});
		} else {
			router.replace("/");
		}
	}, [token]);

	const requestWithdraw = async (payload) => {
		setFetchingWithdraw(true);
		await axios
			.request({
				method: "post",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/withdraw`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: payload
			})
			.then((response) => {
				if(response.data?.status === "success") {
					alert.success(<span style={{ fontSize: "12px" }}>Withdraw Successfully</span>);
					fetchCampaignList();
				} else {
					alert.error(response.data?.message);
				}
			})
			.catch((error) => {
				console.log(error);
				alert.error("Something went wrong on our end!");
			}).finally(() => {
				setFetchingWithdraw(false);
				handleClose();
			});
	};
	const withdrawForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			campaignId: selectCampaign?.id || "",
			requestAmount: "",
			accountName: user?.accountName || "",
			accountNumber: user?.accountNumber || "",
		},
		onSubmit: (values) => requestWithdraw(values),
	});
	const handleOpen = (campaign) => {
		setSelectCampaign(campaign);
		setShowModal(true);
		setBalance(campaign?.balance);
	};
	const handleClose = () => {
		setShowModal(false);
		setBalance(0.0);
		withdrawForm.resetForm();
	};
	
	const columns = useMemo(
		() => [
			{
				name: "No",
				selector: (row, index) => <strong>{index + 1}</strong>,
				minWidth: "35px",
				grow: 0,
			},
			{
				name: "Campaign",
				selector: (row) => row.campaignTile,
				cell: (row) => (
					<div className="table_title_img">
						<div className="table_img">
							<img src={row.campaignGallery.length > 0 ? api.RESOURCE + row.campaignGallery[0] : ""} alt="" />
						</div>
						<div className="table_title">
							<div className="text-truncate" style={{ width: "180px" }}>
								{row.campaignTile || "--/--"}
							</div>
						</div>
					</div>
				),
				minWidth: "250px",
				grow: 0,
				sortable: true,
			},
			{
				name: "Goal",
				selector: (row) => <span>${row.goal.toFixed(2) || "0.0"}</span>,
				sortable: true,
			},
			{
				name: "Donors",
				selector: (row) => row.totalDonation,
				sortable: true,
				minWidth: "93px",
				grow: 0,
			},
			{
				name: "Funds Raised",
				selector: (row) => <span>${row.totalRaised.toFixed(2) || "0.0"}</span>,
				sortable: true,
				minWidth: "130px",
			},
			{
				name: "Total Withdraw",
				selector: (row) => <span>${row.totalWithdraw?.toFixed(2) || "0.0"}</span>,
				sortable: true,
				minWidth: "146px",
			},
			{
				name: "Balance",
				selector: (row) => <span>${row.balance?.toFixed(2) || "0.0"}</span>,
				sortable: true,
			},
			{
				name: "Action",
				minWidth: "200px",
				grow: 0,
				cell: (row) => (
					<>
						<button
							type="button"
							class="btn btn-sm btn-light"
							style={{ padding: ".25rem .5rem", fontSize: ".75rem" }}
							onClick={() => router.replace(`/dashboard/withdraw/${row.id}`)}
						>
							View History
						</button>
						|
						<button
							type="button"
							class="btn btn-sm btn-primary"
							style={{ padding: ".25rem .5rem", fontSize: ".75rem" }}
							onClick={() => handleOpen(row)}
						>
							Withdraw
						</button>
					</>
				),
			},
		],
		[handleOpen]
	);

	const fetchCampaignList = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/campaign-web`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				setCampaignList(response.data?.data);
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
			});
	};

	useEffect(() => {
		if (token) {
			fetchCampaignList();
		} else {
			router.replace("/");
		}
	}, [token]);

	return (
		<Layout pageTitle="Withdraw">
			<section className="dashboard-container">
				<Container>
					<Breadcrumb>
						<Breadcrumb.Item onClick={() => router.replace("/")}>Home</Breadcrumb.Item>
						<Breadcrumb.Item onClick={() => router.replace("/dashboard")}>Dashboard</Breadcrumb.Item>
						<Breadcrumb.Item active>Withdraw</Breadcrumb.Item>
					</Breadcrumb>

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
							<Link href="/dashboard">
								<a className="main-menu__donate-btn" style={{ border: "none" }}>
									<i className="fas fa-arrow-left"></i> Go Back
								</a>
							</Link>
						</div>
						<DataTable
							customStyles={{
								headCells: {
									style: {
										fontWeight: "bold",
										fontSize: "13px",
										paddingRight: "0px",
									},
								},
								cells: {
									style: {
										paddingRight: "0px",
									},
								},
							}}
							columns={columns}
							data={campaignList}
							pagination
						/>

						<Modal show={showModal} centered size="md" onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title style={{ lineHeight: "1", margin: "0", padding: "0", fontSize: "18px", fontWeight: "800" }}>Withdraw</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form
									onSubmit={(e) => {
										e.preventDefault();
										withdrawForm.handleSubmit();
										return false;
									}}
									action="#"
									autoComplete="off"
									style={{ padding: "3rem 1rem", paddingBottom: "0.5rem", paddingTop: "1rem" }}
								>
									<div className="overall_balance">
										<h2>Overall Balance</h2>
										<span className="overall_balance_price">
											{balance?.toFixed(2)} <span className="overall_balance_currency">USD</span>
										</span>
									</div>
									<Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
										<Form.Label style={{ fontSize: "1rem", marginBottom: "0px" }}>Request Amount (USD)</Form.Label>
										<Form.Control
											type="number"
											placeholder="Enter Amount"
											name="requestAmount"
											onChange={withdrawForm.handleChange}
											onBlur={withdrawForm.handleBlur}
											value={withdrawForm.values.requestAmount || ""}
										/>
									</Form.Group>
									<Form.Group className="mb-2" controlId="exampleForm.ControlInput2">
										<Form.Label style={{ fontSize: "1rem", marginBottom: "0px" }}>Account Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Account Name"
											name="accountName"
											onChange={withdrawForm.handleChange}
											onBlur={withdrawForm.handleBlur}
											value={withdrawForm.values.accountName || ""}
										/>
									</Form.Group>
									<Form.Group className="mb-2" controlId="exampleForm.ControlInput3">
										<Form.Label style={{ fontSize: "1rem", marginBottom: "0px" }}>Account Number</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Account Number"
											name="accountNumber"
											onChange={withdrawForm.handleChange}
											onBlur={withdrawForm.handleBlur}
											value={withdrawForm.values.accountNumber || ""}
										/>
									</Form.Group>
									{isFetchingWithdraw ? <button
										type="submit"
										className="main-menu__donate-btn"
										style={{ border: "none", marginTop: "0.5rem", width: "100%", textAlign: "center" }}
										// disabled
									>
										<Spinner animation="border" size="sm" /> Loading...
									</button> : <button
										type="submit"
										className="main-menu__donate-btn"
										style={{ border: "none", marginTop: "0.5rem", width: "100%", textAlign: "center" }}
										// disabled
									>
										Request Withdraw
									</button>}
									
								</Form>
							</Modal.Body>
						</Modal>
					</div>
				</Container>
			</section>
		</Layout>
	);
};

export default Withdraw;
