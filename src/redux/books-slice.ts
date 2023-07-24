import { createSlice } from "@reduxjs/toolkit";
import { Book } from "@/app/types/Book";


type InitialState = {
  books: Array<Book>,
  openedBook: Partial<Book>,
}

const initialState: InitialState = {
  books: [],
  openedBook: {},
} 

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooks(state, { payload }) {
      state.books = payload;
    },
    addBook(state, { payload }) {
      state.books.push(payload);
    },
    updateBook(state, { payload }) {
      const updatedBooksArr = state.books.map((book) =>
        book.id === payload.id ? payload : book
      );
      state.books = updatedBooksArr;
    },
    deleteBook(state, { payload }) {
      const filteredBooks = state.books.filter((book) => book.id !== payload);
      state.books = filteredBooks;
    },
    setOpenedBook(state, { payload }) {
      const openedBook = state.books.find((book) => book.id === payload);
      if (openedBook) {
        state.openedBook = openedBook;
      }
    },
  },
});

export const { fetchBooks, addBook, updateBook, deleteBook, setOpenedBook } = booksSlice.actions;
