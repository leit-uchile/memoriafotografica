import React, { useState } from "react";
import Categorize from "./DragNCategorize/Categorize";
import Modify from "./Mofify/Modify";
import "./style.css";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

const Metadata = () => {
  const [activeTab, setActiveTab] = useState("2");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs>
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
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12" className="metadata-classifier">
              <Categorize />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Modify />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Metadata;
