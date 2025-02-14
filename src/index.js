import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
  </MantineProvider>
);
 