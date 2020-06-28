import React, { useState, useEffect } from "react";
import ContactTable from "./ContactTable";
import PhotoTable from "./PhotoTable";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { webadmin } from "../../../actions";

const EmailRequests = ({ messages, getMessages, updatedMessage }) => {
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (activeTab === "2") {
      getMessages();
    }
  }, [activeTab, updatedMessage, getMessages]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <h2>Mensajes recibidos</h2>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "active" : ""}
            onClick={() => {
              toggle("1");
            }}
          >
            Solicitud de fotos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => {
              toggle("2");
            }}
          >
            Contacto
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <PhotoTable />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <ContactTable messages={messages} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.webadmin.messages,
  updatedMessage: state.webadmin.updatedMessage,
});

const mapActionsToProps = (dispatch) => ({
  getMessages: () => dispatch(webadmin.getMessages()),
});

export default connect(mapStateToProps, mapActionsToProps)(EmailRequests);
