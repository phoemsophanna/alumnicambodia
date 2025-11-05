import BecomeVolunteer from "@/components/BecomeVolunteer/BecomeVolunteer";
import BrandOne from "@/components/BrandOne/BrandOne";
import CausesThree from "@/components/CausesThree/CausesThree";
import CountersTwo from "@/components/CountersTwo/CountersTwo";
import FeatureOne from "@/components/FeatureOne/FeatureOne";
import HelpThemTwo from "@/components/HelpThemTwo/HelpThemTwo";
import Layout from "@/components/Layout/Layout";
import MainSliderThree from "@/components/MainSliderThree/MainSliderThree";
import NeedHelp from "@/components/NeedHelp/NeedHelp";
import NewsThree from "@/components/NewsThree/NewsThree";
import TeamOne from "@/components/TeamOne/TeamOne";
import TestimonialTwo from "@/components/TestimonialTwo/TestimonialTwo";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import React from "react";

const Home3 = () => {
  return (
    <Layout pageTitle="Home Three">
      <MainSliderThree />
      <FeatureOne />
      <HelpThemTwo />
      <CausesThree />
      <BrandOne brandclassName="brand-three" />
      <TestimonialTwo />
      <CountersTwo />
      <NeedHelp />
      <TeamOne />
      <WhyChoose />
      <NewsThree />
      <BecomeVolunteer />
    </Layout>
  );
};

export default Home3;
