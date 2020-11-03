import React, { useState } from "react";
import axios from "../config/base_axios";
import { Table, Row, Col } from "reactstrap";
class DataHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataName: "",
      dataValue: "",
      Data: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    let token = localStorage.getItem("usertoken");
    axios
      .get("/api/list/data", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          const data = res.data.data;
          this.setState({ Data: data });
        }
      });
    {
      this.loadData();
    }
  };
  loadData() {
    return this.state.Data.map((data) => {
      return (
        <Col sm="4">
          <div class="card" style={{ margin: 10 }}>
            <div class="card-body">
              <h4 class="card-title">{data.dataId}</h4>
              <hr />
              <p class="card-text">
                <b>Data Name :</b>
                {data.dataName}
                <br />
                <b>Data Value :</b>
                {data.dataValue}
              </p>
            </div>
          </div>
        </Col>
      );
    });
  }
  render() {
    return (
      <div class="container">
        <Row>
          <Col>
            <div class="card-group">{this.loadData()}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DataHistory;
