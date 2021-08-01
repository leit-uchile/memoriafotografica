import React, { useState } from "react";
import Categorize from "./DragNCategorize/Categorize";
import Modify from "./Modify/Modify";
import Suggestions from "./Suggestions/Suggestion";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import "./styles.css";

const Metadata = () => {
  const [activeTab, setActiveTab] = useState("2");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs style={{ marginBottom: "1em" }}>
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "active" : ""}
            onClick={() => {
              toggle("1");
            }}
          >
            Clasificar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => {
              toggle("2");
            }}
          >
            Buscar y Modificar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "3" ? "active" : ""}
            onClick={() => {
              toggle("3");
            }}
          >
            Sugerencias de Metadata
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12" className="metadata-classifier">
              <Categorize active={activeTab === "1"} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Modify active={activeTab === "2"} />
        </TabPane>
        <TabPane tabId="3">
          <Suggestions active={activeTab === "3"} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Metadata;
