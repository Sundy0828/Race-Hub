import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import { AuthProvider } from "./providers/AuthContext";
import { ApolloWrapper } from "./providers/ApolloWrapper";
import { TamaguiProvider } from "@tamagui/core";

const container = document.getElementById("root");
const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: (
      <AuthProvider>
        <ApolloWrapper>
          <TamaguiProvider>
            <App />
          </TamaguiProvider>
        </ApolloWrapper>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
