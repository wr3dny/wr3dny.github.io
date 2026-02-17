export const PATHS: Record<string, string> = {
  HOME: "/",
  BOOKS: "/books",
  GALLERY: "/gallery",
  LEGO: "/lego",
  MODELS: "/models",
  WASGIJ: "/wasgij",
  GALLERY_DETAIL: "/gallery/:galleryId",
};

export const toGallery = () => PATHS.GALLERY;
export const toGalleryDetail = (galleryId: string) => `/gallery/${galleryId}`;
export const toGalleryPhoto = (galleryId: string, photoId: string) =>
  `/gallery/${galleryId}/${photoId}`;
