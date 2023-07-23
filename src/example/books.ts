import { BookData, ListData } from "./table-overview-example";

export const ELEMENT_DATA: BookData[] = [
  {
    id: 1,
    bookTitle: "Dune",
    year: "1965",
    authorName: "Frank Herbert",
    actions: true,
  },
  {
    id: 2,
    bookTitle: "Enders Game",
    year: "1984",
    authorName: "Orson Scott Card",
    actions: true,
  },
  {
    id: 3,
    bookTitle: "1984",
    year: "1949",
    authorName: "George Orwell",
    actions: true,
  },
  {
    id: 4,
    bookTitle: "Fahrenheit 451",
    year: "1953",
    authorName: "Ray Bradbury",
    actions: true,
  },
  {
    id: 5,
    bookTitle: "Brave New World",
    year: "1932",
    authorName: "Adlous Huxley",
    actions: true,
  },
];

export const LIST_DATA: ListData[] = [
  { id: 1, listTitle: "Fictions", actions: true, books: ELEMENT_DATA },
  { id: 2, listTitle: "Stories", actions: true, books: ELEMENT_DATA },
  { id: 3, listTitle: "Horror", actions: true, books: ELEMENT_DATA },
  { id: 4, listTitle: "Cars", actions: true, books: ELEMENT_DATA },
  { id: 5, listTitle: "Science", actions: true, books: ELEMENT_DATA },
];
