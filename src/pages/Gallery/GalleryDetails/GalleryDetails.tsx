import { Link, useParams } from "react-router-dom";
import { GALLERIES } from "../galleries.data";
import { Carousel } from "../../../components/Carousel/Carousel";

export const GalleryDetail = () => {
  const { galleryId, photoId } = useParams<{
    galleryId: string;
    photoId?: string;
  }>();

  const gallery = GALLERIES.find((g) => g.id === galleryId);

  if (!gallery) {
    return (
      <div>
        <p>Gallery not found: {galleryId}</p>
        <Link to="/gallery">Back to gallery list</Link>
      </div>
    );
  }

  const startIndex = photoId
    ? gallery.images.findIndex((image) => image.id === photoId)
    : 0;

  return (
    <div>
      <div>
        <Link to="/gallery">← Back</Link>
        <h3>{gallery.title}</h3>
      </div>

      {gallery.description ? <p>{gallery.description}</p> : null}

      <Carousel
        photos={gallery.images}
        initialIndex={startIndex >= 0 ? startIndex : 0}
      />
    </div>
  );
};
