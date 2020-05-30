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
import { getMessages } from "../../../actions/webadmin_api";

const EmailRequests = ({messages, getMessages, requestsPhoto, getRequests}) => {
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    getRequests();
    getMessages();
  }, [activeTab]);

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
            Contacto
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => {
              toggle("2");
            }}
          >
            Solicitud de fotos
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <ContactTable messages={[]}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <PhotoTable requests={requestsPhoto} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.site_misc.curador.loading,
  requestsPhoto: state.webadmin.requests,
  messages: state.webadmin.messages
});

const mapActionsToProps = dispatch => ({
  getRequests: () => dispatch(webadmin.getRequests()),
  getMessages: () => dispatch(webadmin.getMessages())
});

export default connect(mapStateToProps, mapActionsToProps)(EmailRequests);



