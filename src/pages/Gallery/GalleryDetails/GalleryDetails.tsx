// import { Link, useNavigate, useParams } from "react-router-dom";
// import { GALLERIES } from "../galleries.data.ts";

export const GalleryDetail = () => {
  // const { galleryId, photoId } = useParams();
  // const navigate = useNavigate();

  // const gallery = GALLERIES.find((g) => g.id === galleryId);
  // //
  // // if (!gallery) {
  // //   return (
  // //     <div>
  // //       <p>Gallery not found: {galleryId}</p>
  // //       <Link to="/gallery">Back to gallery list</Link>
  // //     </div>
  // //   );
  // // }

  return (
    <div>
      {/*<div style={{ display: "flex", gap: 12, alignItems: "center" }}>*/}
      {/*  <Link to="/gallery">← Back</Link>*/}
      {/*  <h3 style={{ margin: 0 }}>{gallery.title}</h3>*/}
      {/*</div>*/}

      {/*{gallery.description ? (*/}
      {/*  <p style={{ opacity: 0.8 }}>{gallery.description}</p>*/}
      {/*) : null}*/}

      {/*<Carousel*/}
      {/*  images={gallery.images}*/}
      {/*  startPhotoId={photoId}*/}
      {/*  // Optional: keep URL in sync with current slide*/}
      {/*  onSlideChange={(newPhotoId: string) => {*/}
      {/*    navigate(`/gallery/${gallery.id}/${newPhotoId}`, { replace: true });*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};
