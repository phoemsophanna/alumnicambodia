import GalleryPage from "@/components/GalleryPage/GalleryPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("header.GALLERY")}>
      <PageHeader pageTitle={t("header.GALLERY")} type="GALLERY" />
      <GalleryPage />
    </Layout>
  );
};

export default Gallery;
