import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/homePage/HomePage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import BookPage from "./pages/BookPage/BookPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/library",
          element: <LibraryPage />,
        },
        {
          path: "/book/:id",
          element: <BookPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
