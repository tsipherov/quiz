import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { logout } from "../../store/actions/authActions";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to={"/"} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
