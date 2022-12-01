import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";

import "./locales/i18n";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7F56D9"
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
