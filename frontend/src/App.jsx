import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./css/App.css";
import "./css/Alerts.css";
import "./css/Buttons.css";
import "./css/Forms.css";
import "./css/Metadata.css";
import "./css/Modals.css";
import "./css/Pagination.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./pages/Layout";
import store from "./store";
import AOS from "aos";
import "aos/dist/aos.css";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <Router>
          <Layout />
        </Router>
      </DndProvider>
    </Provider>
  );
};

export default App;
