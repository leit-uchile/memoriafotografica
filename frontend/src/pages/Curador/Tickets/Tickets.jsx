import React, { useState } from "react";
import Categorize from "./Categorize/Categorize";
import TicketList from "./List/TicketList";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

const Tickets = () => {
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
            Adjudicar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => {
              toggle("2");
            }}
          >
            Mis tareas
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Categorize active={activeTab === "1"} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <TicketList active={activeTab === "2"} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tickets;
