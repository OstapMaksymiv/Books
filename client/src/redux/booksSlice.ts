import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type Book, type BooksState } from "./types";

const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3400/api/books";

export const fetchBooks = createAsyncThunk<Book[]>("books/fetchBooks", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addBook = createAsyncThunk<Book, Book>("books/addBook", async (newBook) => {
  const res = await axios.post(API_URL, newBook);
  return res.data;
});

export const updateBook = createAsyncThunk<Book, Book>("books/updateBook", async (book) => {
  const res = await axios.put(`${API_URL}/${book.id}`, book);
  return res.data;
});

export const deleteBook = createAsyncThunk<string, string>("books/deleteBook", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch failed";
      })

      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
