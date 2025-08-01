import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { register } from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
register();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
