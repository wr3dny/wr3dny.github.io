import { Route, Routes } from "react-router-dom";
import { GalleryIndex } from "./GalleryIndex/GalleryIndex.tsx";
import { GalleryDetail } from "./GalleryDetails/GalleryDetails.tsx";

export const Gallery = () => {
  return (
    <>
      <h2>Gallery</h2>

      <Routes>
        <Route index element={<GalleryIndex />} />
        <Route path=":galleryId" element={<GalleryDetail />} />
        <Route path=":galleryId/:photoId" element={<GalleryDetail />} />
      </Routes>
    </>
  );
};
