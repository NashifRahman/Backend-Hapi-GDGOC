import { bookData } from "./bookdata.js";
import { nanoid } from "nanoid";

const addBookHandler = (req, res) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const result = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (result.readPage > result.pageCount) {
    const response = res.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (result.pageCount == result.readPage) {
    result.finished = true;
  }

  if (result.name != undefined) {
    const successResponse = res.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });

    bookData.push(result);
    successResponse.code(201);
    return successResponse;
  } else {
    const failResponse = res.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    failResponse.code(400);
    return failResponse;
  }
};

const getBookHandler = (req, h) => {
  const { reading, finished, name } = req.query;

  if (name) {
    console.log("masuk");
    console.log(name);
    const searchBook = bookData.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
    console.log(searchBook);
    const response = h.response({
      status: "success",
      data: {
        books: searchBook.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  if (reading == 1) {
    const searchBook = bookData.filter((value) => value.reading == true);
    const response = h.response({
      status: "success",
      data: {
        books: searchBook.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (reading == 0) {
    const searchBook = bookData.filter((value) => value.reading == false);
    const response = h.response({
      status: "success",
      data: {
        books: searchBook.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished == 1) {
    const searchBook = bookData.filter((value) => value.finished == true);
    const response = h.response({
      status: "success",
      data: {
        books: searchBook.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (finished == 0) {
    const searchBook = bookData.filter((value) => value.finished == false);
    const response = h.response({
      status: "success",
      data: {
        books: searchBook.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (bookData.length == 0) {
    const response = h.response({
      status: "success",
      data: {
        books: bookData,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: bookData.map(({ id, name, publisher }) => ({
        id,
        name,
        publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIDHandler = (req, res) => {
  const { bookid } = req.params;

  const searchBook = bookData.find((value) => value.id == bookid);

  if (searchBook) {
    const response = res.response({
      status: "success",
      data: {
        book: searchBook,
      },
    });
    response.code(200);
    return response;
  }

  const response = res.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (req, res) => {
  const { bookid } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const findIndex = bookData.findIndex((value) => value.id == bookid);
  const searchBook = bookData.find((value) => value.id == bookid);

  if (readPage > pageCount) {
    const response = res.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (name == undefined) {
    const response = res.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (searchBook && searchBook.name !== undefined) {
    bookData[findIndex] = {
      ...bookData[findIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    const response = res.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);
    return response;
  }

  const response = res.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

const deleteBookByIDHandler = (req, res) => {
  const { bookid } = req.params;

  const indexData = bookData.findIndex((value) => value.id == bookid);

  if (indexData != -1) {
    bookData.splice(indexData, 1);
    const response = res
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
    return response;
  }

  const response = res
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);

  return response;
};

export {
  getBookHandler,
  addBookHandler,
  getBookByIDHandler,
  editBookByIdHandler,
  deleteBookByIDHandler,
};
