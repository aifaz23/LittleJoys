import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
const axios = require('axios');


class AllClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        id: ''
    };
  }

  componentDidMount = () => {
      this.retrieveClientInfo()
  }

  retrieveClientInfo = () => {
    let http = new XMLHttpRequest();
    var url = '/clientInfo';

    axios.post(url)
    .then(function (response) {
            this.setState({
                data: response.data
            })
    }.bind(this))
    .catch(function (error) {
        console.log(error);
      alert("An Error Occurred ", error);
  });
  }

  retrieveClient = () => {
    let http = new XMLHttpRequest();
    var url = '/selectClient';

    var id = this.state.id

    if (id === '') {
        alert("Client id is required to retrieve client information!")
        return;
    }

    var params = "id=" + id;

    axios.post(url, params)
    .then(function (response) {
     if (response.data === "ok") {
            window.location.href = "/retrieveClient";
        }
        else alert("No Client with ID: " + id);
    })
    .catch(function (error) {
        console.log(error);
      alert("An Error Occurred ", error);
  });
  }

  
    addClient = () => {
        window.location.href = "/addClient"
    }

    removeClient = () =>{
        window.location.href = "/removeClient"
    }

    back = () => {
        window.location.href = "/loggedIn";
    }

    onTitleChange = (e) => {
        this.setState({
            id: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h2>All Clients</h2>
                <label> Retrieve Client Information:</label><br/>
                <Input
                onChange={this.onTitleChange}
                placeholder="Enter Client Id"
                />
                <Button type="primary" onClick={this.retrieveClient}>Retrieve</Button>
                <br/>
                <h3> List of Clients </h3>
                {this.state.data.map(data => 
                    <div>
                    <label>Name: </label>{data.name}<br/>
                    <label>Id: </label>{data.id}<br/><br/>
                    <p>----------------</p>
                    </div>)}
                <Button type="primary" onClick={this.addClient}>Add Client</Button><br/>
                <Button type="primary" onClick={this.back}>Back</Button><br/>
                <Button type="primary" onClick={this.removeClient}>Remove Client</Button><br/>
            </div>
        );
    }
}

export default AllClients;