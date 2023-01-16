import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class RemoveClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        id: '',
    };
  }

  remove = () => {
    let http = new XMLHttpRequest();
    var url = '/removeClient';
    var name = this.state.name
    var id = this.state.id

    // if (name == "") {
    //     alert("Provide name to add staff")
    //     return
    // }

    var params = "name=" + name + "&id=" + id;

    axios.post(url, params)
    .then(function (response) {
     if (response.data === "removed") {
          alert("Client Removed")
          window.location.href = "/allClients"
          } 
      else {alert("No such client exists!");
        window.location.href = "/allClients"}
            
    })
    .catch(function (error) {
      alert("An Error Occurred ", error);
  });
  }

  cancel = () => {
    window.location.href = "/allClients";
  } 

  onNameChange = (e) => {
    this.setState({
        name: e.target.value
    })
  }

  onIdChange = (e) => {
    this.setState({
        id: e.target.value
    })
  }

  render() {
    return (
    <div>
        <h2>Remove Client</h2>
            <label> Client Name:</label><br/>
            <Input
                onChange={this.onNameChange}
                placeholder="Client's name to remove"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Name of the client to be removed">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <label> Client ID:</label><br/>
            <Input
                onChange={this.onIdChange}
                placeholder="Client's id to remove"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title=" Id of the client to be removed">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <Button type="primary" onClick={this.remove}>Remove</Button> &nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.cancel}>Cancel</Button>
        </div>
    );
  }
}

export default RemoveClient;