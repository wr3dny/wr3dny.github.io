import { Link } from "react-router-dom";
import { GALLERIES } from "../galleries.data.ts";

import styles from "./GalleryIndex.module.css";

export const GalleryIndex = () => {
  return (
    <div>
      <p>Select a gallery:</p>

      <div className={styles.galleries}>
        {GALLERIES.map((g) => (
          <Link
            key={g.id}
            to={`/gallery/${g.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 14,
              padding: 12,
              display: "block",
            }}
          >
            <img
              src={g.coverSrc}
              alt={`${g.title} cover`}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
            <h3 style={{ margin: "10px 0 4px" }}>{g.title}</h3>
            {g.description ? (
              <div style={{ opacity: 0.8, fontSize: 14 }}>{g.description}</div>
            ) : null}
            <div style={{ opacity: 0.7, fontSize: 12, marginTop: 6 }}>
              {g.images.length} photos
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
