import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
/* import reportWebVitals from "./reportWebVitals"; */
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ThemeProvider } from "./component/ThemeContext";
import IndexPage from "./pages/IndexPage";
import ChangelogPage from "./pages/ChangelogPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <div className="text-t-primary min-h-screen">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/steamShark/" element={<IndexPage />} /> {/* Index route */}
              <Route path="/steamShark/changelog" element={<ChangelogPage />} />{/* Changelog page */}
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals();*/
