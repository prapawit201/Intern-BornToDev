// import React from "react";
import React, { Fragment } from "react";
import Navbar from "../component/Navbar"
import pic from "../image/Scrum.png"
import "../App.css";
export default class OutlinedButtons extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <center><img id="picHome"src={pic}/></center>
        <div className="container">
          <section id="enter">
          <button type="button" class="btn btn-outline-info">Enter to Website</button>
          </section>
        </div>
      </div>
    );
  }
}
