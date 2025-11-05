import CausesDetailsPage from "@/components/CausesDetails/CausesDetails";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";

const ProjectDetails = () => {
	return (
		<Layout pageTitle="Project Details">
			<PageHeader pageTitle="Project Details" />
			<CausesDetailsPage />
		</Layout>
	);
};

export default ProjectDetails;
