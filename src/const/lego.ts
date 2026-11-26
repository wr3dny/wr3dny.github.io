// Lista życzeń LEGO — edytuj ten plik ręcznie.
// url = strona zestawu, image = adres zdjęcia (oba sprawdź w przeglądarce),
// price = cena orientacyjna w zł. Strona sortuje zestawy od najtańszego.
// Kolekcja posiadanych LEGO nie jest jeszcze zaimplementowana.
export type LegoSet = {
  setNumber: number;
  price: number;
  year: number;
  url: string;
  image: string;
  alt: string;
  series: string;
};
export const LegoWishlist: LegoSet[] = [
  {
    setNumber: 10357,
    year: 2025,
    price: 498,
    url: "https://zklockow.pl/lego-10357-icons-shelby-cobra-427-s-c",
    image:
      "https://zklockow.pl/img/960/lego-icons-10357-shelby-cobra-427-s-c-1.jpg",
    alt: "LEGO Icons Shelby Cobra 427 S/C",
    series: "Icons",
  },
  {
    setNumber: 11379,
    year: 2026,
    price: 389,
    url: "https://zklockow.pl/lego-11379-icons-book-nook-ksiegarnia",
    image:
      "https://zklockow.pl/img/960/lego-icons-11379-book-nook-ksiegarnia-1.jpg",
    alt: "LEGO Bookstore",
    series: "Icons",
  },
  {
    setNumber: 11376,
    year: 2026,
    price: 473,
    url: "https://zklockow.pl/lego-11376-icons-ford-model-t",
    image: "https://zklockow.pl/img/960/lego-icons-11376-ford-model-t-1.jpg",
    alt: "LEGO Icons Ford Model T",
    series: "Icons",
  },
  {
    setNumber: 11381,
    year: 2026,
    price: 439,
    url: "https://zklockow.pl/lego-11381-icons-jaguar-e-type",
    image: "https://zklockow.pl/img/960/lego-icons-11381-jaguar-e-type-1.jpg",
    alt: "LEGO Icons Jaguar E-Type",
    series: "Icons",
  },
];
