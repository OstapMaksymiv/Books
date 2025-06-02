import type { store } from "./store";
export interface Book {
    id: string;
    title: string;
    author: string;
    published: number;
    description: string;
    category: string[];
    image: string;
  }
export  interface BooksState {
    items: Book[];
    loading: boolean;
    error: string | null;
  } 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  