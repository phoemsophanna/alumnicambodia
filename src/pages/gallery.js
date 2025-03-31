import GalleryPage from "@/components/GalleryPage/GalleryPage";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";

const Gallery = () => {
  return (
    <Layout pageTitle="Gallery">
      <PageHeader pageTitle="Gallery" />
      <GalleryPage />
    </Layout>
  );
};

export default Gallery;
