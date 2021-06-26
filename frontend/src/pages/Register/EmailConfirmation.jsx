import React, { useEffect } from "react";
import { connect } from "react-redux";
import { user } from "../../actions";
import { bindActionCreators } from "redux";
import { selectUserActivate } from "../../reducers";
import MessageConfirmation from './CompleteRegistrationMessage'

const EmailConfirmation = ({ location, activateCode, status }) => {
  useEffect(() => {
    let code = location.search;
    code = code.slice(code.indexOf("code=") + 5);
    activateCode(code);
  }, [activateCode, location.search]);

  if (status === true) {
    return <MessageConfirmation status={true} />;
  }
  return <MessageConfirmation status={false} />;
};

const mapStateToProps = (state) => ({
  status: selectUserActivate(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      activateCode: user.getRegisterLink,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(EmailConfirmation);
