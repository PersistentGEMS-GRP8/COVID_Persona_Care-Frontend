import Navbar from './layout/navbar'

import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="home">
       <Navbar/> 
       <p>HOME PAGE</p>
      </div>
    );
  }
}
export default Home;