import BecomeVolunteerPage from "@/components/BecomeVolunteerPage/BecomeVolunteerPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";

const BecomeVolunteer = () => {
  return (
    <Layout pageTitle="Become a Volunteer">
      <PageHeader pageTitle="Become a Volunteer" />
      <BecomeVolunteerPage />
    </Layout>
  );
};

export default BecomeVolunteer;
