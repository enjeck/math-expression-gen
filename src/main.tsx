import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Nav from "./Nav.tsx";
import { BrowserRouter } from 'react-router-dom';
import { MathJaxContext } from "better-react-mathjax";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MathJaxContext>
        <Nav />
        <App />
      </MathJaxContext>
    </BrowserRouter>
  </React.StrictMode>
);