import React from "react";
//import { Link } from "react-router-dom";
import socketIO from "socket.io-client";
import axios from "axios";
const socketUrl = "http://localhost:3000";

axios.defaults.baseURL = "http://localhost:4000";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      carType: "",
      carNumber: "",
      license: "",
    };
  }

  async getCar(id) {
    const result = await axios.post("/cars/getCar", { userId: id });
    if (result.status === 201) {
      console.log("201");
      this.setState({
        name: result.data.name,
        mobile: result.data.mobile,
        carType: result.data.carType,
        carNumber: result.data.carNumber,
      });
    }
  }

  componentDidMount() {
    // this.getCar("5eee20e501ae941b001cce54")
    var socket = socketIO.connect(socketUrl);
    socket.on("connect", () => {
      socket.emit("adminSocket");
      socket.on("addCar", (car) => {
        alert("new car request");
        console.log("car: ", car.id);
        this.getCar(car._id);
        this.setState({
          license: car.car.license,
          name: car.car.carOwner,
          carType: car.car.carType,
          carNumber: car.car.carNumber,
        });
      });
    });
  }

  deny() {
    var socket = socketIO.connect(socketUrl);
    socket.on("connect", () => {
      socket.emit("carDeny");
      alert("Denied");
    });
  }
  approve() {
    this.getCar("5eee20e501ae941b001cce54");
    var socket = socketIO.connect(socketUrl);
    socket.on("connect", () => {
      socket.emit("carApprove");
      alert("Approved");
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Admin Panel</h1>

        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Car number</th>
              <th scope="col">Car type</th>
              <th scope="col">Driving license</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{this.state.name}</td>
              <td>{this.state.carNumber}</td>
              <td>{this.state.carType}</td>
              <td>{this.state.license}</td>
              <td>
                <button
                  style={{ marginRight: 10 }}
                  onClick={() => this.approve()}
                >
                  Approve
                </button>
                <button onClick={() => this.deny()}>Deny</button>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          style={{ marginBottom: 10, marginTop: 50, marginRight: 50 }}
          onClick={() => alert("please wait")}
        >
          Users
        </button>

        <button
          style={{ marginBottom: 10 }}
          onClick={() => alert("please wait")}
        >
          Vehicles
        </button>
      </div>
    );
  }
}

export default Home;
