import Layout from "@/components/Layout/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Badge, Breadcrumb, Button, Container, Modal, Stack } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { api } from "src/config";

const WithdrawHistory = () => {
	const [withdrawHistories, setWithdrawHistory] = useState([]);
	const [campaign, setCampaign] = useState(null);
	const token = Cookies.get("TOKEN");
	const router = useRouter();
	const columns = [
		{
			name: "No",
			selector: (row, index) => <strong>{index + 1}</strong>,
			minWidth: "35px",
			grow: 0,
		},
		{
			name: "Date",
			selector: (row) => row.requestDate,
			sortable: true,
		},
		{
			name: "Withdraw",
			selector: (row) => <span>${row.requestAmount.toFixed(2) || "0.0"}</span>,
			sortable: true,
		},
		{
			name: "Bank Account",
			selector: (row) => row.accountNumber,
			sortable: true,
		},
		{
			name: "Account Name",
			selector: (row) => row.accountName,
			sortable: true,
		},
		{
			name: "Status",
			grow: 0,
			cell: (row) => (
				<Stack direction="horizontal" gap={2}>
					{row.withdrawStatus === "PENDING" ? (
						<Badge pill bg="warning" text="dark">
							PENDING
						</Badge>
					) : row.withdrawStatus === "APPROVE" ? (
						<Badge pill bg="success">
							APPROVED
						</Badge>
					) : row.withdrawStatus === "REJECT" ? (
						<Badge pill bg="danger">
							REJECTED
						</Badge>
					) : null}
				</Stack>
			),
		},
	];

	const fetchWithdrawHistories = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/withdraw/histories?id=${router?.query?.id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				setWithdrawHistory(response.data?.withdraw);
                setCampaign(response.data?.campaign);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (token) {
			fetchWithdrawHistories();
		} else {
			router.replace("/");
		}
	}, [token, router]);

	return (
		<Layout pageTitle="Withdraw">
			<section className="dashboard-container">
				<Container>
					<Breadcrumb>
						<Breadcrumb.Item onClick={() => router.replace("/")}>Home</Breadcrumb.Item>
						<Breadcrumb.Item onClick={() => router.replace("/dashboard")}>Dashboard</Breadcrumb.Item>
						<Breadcrumb.Item onClick={() => router.replace("/dashboard/withdraw")}>Withdraw</Breadcrumb.Item>
						<Breadcrumb.Item active>...</Breadcrumb.Item>
					</Breadcrumb>

					<div className="dashboard-body">
						<div className="dashboard-body-header">
							<div className="dashboard-data-record">
								
								<div className="record-item">
									<span className="icon-donation"></span>
									<div className="record-item-info">
										<p>Funds Raised</p>
										<p className="record-count">${campaign?.totalRaised?.toFixed(2)}</p>
									</div>
								</div>
                                <div className="record-item">
									<span className="icon-dollar-sign"></span>
									<div className="record-item-info">
										<p>Balance</p>
										<p className="record-count">${campaign?.balance?.toFixed(2)}</p>
									</div>
								</div>
								<div className="record-item">
									<span className="icon-generous"></span>
									<div className="record-item-info">
										<p>Total Withdraw</p>
										<p className="record-count">${campaign?.totalWithdraw?.toFixed(2)}</p>
									</div>
								</div>
							</div>
							<Link href="/dashboard/withdraw">
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
							data={withdrawHistories}
							pagination
						/>
					</div>
				</Container>
			</section>
		</Layout>
	);
};

export default WithdrawHistory;
