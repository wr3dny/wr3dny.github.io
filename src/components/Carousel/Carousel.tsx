import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./Carousel.module.css";

type Photo = { src: string; alt?: string };

type Props = {
  photos: Photo[];
};

export const Carousel = ({ photos }: Props) => {
  const [i, setI] = useState(0);
  const hasMany = photos.length > 1;

  // If photos array changes (e.g. shorter list), keep index in bounds.
  useEffect(() => {
    if (i >= photos.length) setI(0);
  }, [i, photos.length]);

  const prev = useCallback(() => {
    setI((x) => (x - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setI((x) => (x + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!hasMany) return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasMany, prev, next]);

  if (photos.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <img
        className={styles.image}
        src={photos[i].src}
        alt={photos[i].alt ?? `Photo ${i + 1}`}
        loading="lazy"
      />

      {hasMany && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className={clsx(styles.navBtn, styles.left)}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className={clsx(styles.navBtn, styles.right)}
          >
            ›
          </button>

          <div className={styles.dotsWrap}>
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to photo ${idx + 1}`}
                onClick={() => setI(idx)}
                className={clsx(styles.dot, idx === i && styles.dotActive)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
