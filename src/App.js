import React from "react";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import Main from "./components/Main";
import SearchPage from "./pages/SearchPage";
import RequestTokenPage from "./pages/RequestTokenPage";
import Root from "./components/Root.js";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const publicPath = process.env.REACT_APP_PUBLIC_URL;
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Main />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="requestToken" element={<RequestTokenPage />} />
      </Route>
    </>
  ),
  {
    basename: "/react-jamming",
  }
);

export default function App() {
  console.log(`Public path: ${publicPath}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
