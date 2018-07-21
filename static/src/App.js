import React, { Component } from 'react';
import Layout from "./pages/Layout";

class App extends Component {
  constructor(props){
      super(props);
      this.props = props;
      this.state = {
          loggedIn : false
      }
  }

  render() {
    return (
        <Layout appState={this.state} />
    );
  }
}

export default App;
