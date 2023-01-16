import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: ''
    };
  }

  save = () => {
    let http = new XMLHttpRequest();
    var url = '/addClient';
    var name = this.state.name

    var params = "name=" + name;

    axios.post(url, params)
    .then(function (response) {
     if (response.data === "ok") {
          alert("Client Added")
          }
          else alert("An Error occured");
          window.location.href = "/allClients"
            
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

  render() {
    return (
    <div>
        <h2>Add Staff</h2>
            <label> Name:</label><br/>
            <Input
                onChange={this.onNameChange}
                placeholder="Enter Client's Name"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Client's First and Last Name">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <Button type="primary" onClick={this.save}>Save</Button> &nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.cancel}>Cancel</Button>
        </div>
    );
  }
}

export default AddClient;