import { GALLERIES } from "../galleries.data.ts";
import { Link } from "react-router-dom";

export const GalleryIndex = () => {
  return (
    <div>
      <p>Select gallery</p>

      <div>
        {GALLERIES.map((gal) => (
          <Link key={gal.id} to={`/gallery/${gal.id}`}>
            <img src={gal.coverSrc} alt={`${gal.title} cover`} />
            <h3>{gal.title}</h3>

            <div style={{ opacity: 0.8, fontSize: 14 }}>{gal.description}</div>

            <div style={{ opacity: 0.7, fontSize: 12, marginTop: 6 }}>
              {gal.images.length} photos
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
