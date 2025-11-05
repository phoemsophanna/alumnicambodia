import GalleryPage from "@/components/GalleryPage/GalleryPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import VideoPage from "@/components/VideoPage/VideoPage";
import React from "react";
import { useTranslation } from "react-i18next";

const Video = () => {
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("header.video")}>
      <PageHeader pageTitle={t("header.video")} type="VIDEO" />
      <VideoPage />
    </Layout>
  );
};

export default Video;
