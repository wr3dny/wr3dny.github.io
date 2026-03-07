export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type GalleryConfig = {
  id: string;
  title: string;
  description?: string;
  coverSrc: string;
  images: GalleryImage[];
};

const imageModules = import.meta.glob(
  "../../assets/gImages/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const img = (fileName: string): string => {
  const path = `../../assets/gImages/${fileName}`;
  const image = imageModules[path];

  if (!image) {
    throw new Error(`Image not found: ${path}`);
  }

  return image;
};

export const GALLERIES: GalleryConfig[] = [
  {
    id: "gdynia-2026-1",
    title: "Gdynia 02/2026",
    coverSrc: img("IMG_7556.jpeg"),
    images: [
      { id: "7556", src: img("IMG_7556.jpeg"), alt: "Gdynia 7556" },
      { id: "7557", src: img("IMG_7557.jpeg"), alt: "Gdynia 7557" },
      { id: "7582", src: img("IMG_7582.jpeg"), alt: "Gdynia 7582" },
      { id: "7588", src: img("IMG_7588.jpeg"), alt: "Gdynia 7588" },
    ],
  },
  {
    id: "mila-baltica-2016",
    title: "Mila Baltica 03/2016",
    coverSrc: img("WP_20150826_010.jpg"),
    images: [
      { id: "010", src: img("WP_20150826_010.jpg"), alt: "MB010" },
      { id: "032", src: img("WP_20150826_032.jpg"), alt: "MB032" },
      { id: "042", src: img("WP_20150826_042.jpg"), alt: "MB042" },
      { id: "045", src: img("WP_20150826_045.jpg"), alt: "MB045" },
    ],
  },
];
