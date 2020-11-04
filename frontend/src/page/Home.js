// import React from "react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import pic from "../image/Scrum.png";
import "../App.css";
export default class OutlinedButtons extends React.Component {
  render() {
    return (
      <div>
        {/* <Navbar/> */}
        <center>
          <img id="picHome" src={pic} />
        </center>
        <div className="container">
          <section id="enter">
            <Link type="button" class="btn btn-outline-info" to="/login">
              Enter to Website
            </Link>
          </section>
        </div>
      </div>
    );
  }
}
