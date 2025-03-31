import EventsDetailsPage from "@/components/EventsDetailsPage/EventsDetailsPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";

const EventDetails = () => {
  return (
    <Layout pageTitle="Events Details">
      <PageHeader pageTitle="Events Details" />
      <EventsDetailsPage />
    </Layout>
  );
};

export default EventDetails;
