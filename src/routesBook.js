import {
  addBookHandler,
  getBookByIDHandler,
  getBookHandler,
  editBookByIdHandler,
  deleteBookByIDHandler,
} from "./handler.js";

export const routesBook = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookid}",
    handler: getBookByIDHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookid}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookid}",
    handler: deleteBookByIDHandler,
  },
];
