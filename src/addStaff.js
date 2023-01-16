import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        number: '',
        email: ''
    };
  }

  save = () => {
    let http = new XMLHttpRequest();
    var url = '/addStaff';
    var name = this.state.name
    var phone = this.state.number
    var email = this.state.email

    // if (name == "") {
    //     alert("Provide name to add staff")
    //     return
    // }

    var params = "name=" + name + "&phone=" + phone +"&email=" + email;

    axios.post(url, params)
    .then(function (response) {
     if (response.data === "ok") {
          alert("Staff Added")
          }
          else alert("An Error occured");
          window.location.href = "/staffInfo"
            
    })
    .catch(function (error) {
      alert("An Error Occurred ", error);
  });
  }

  cancel = () => {
    window.location.href = "/staffInfo";
  } 

  onNameChange = (e) => {
    this.setState({
        name: e.target.value
    })
  }

  onNumberChange = (e) => {
    this.setState({
        number: e.target.value
    })
  }

  onEmailChange = (e) => {
    this.setState({
        email: e.target.value
    })
  }

  render() {
    return (
    <div>
        <h2>Add Staff</h2>
            <label> Name:</label><br/>
            <Input
                onChange={this.onNameChange}
                placeholder="Enter your name"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Your First and Last Name">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <label> Phone Number:</label><br/>
            <Input
                onChange={this.onNumberChange}
                placeholder="(xxx) xxx-xxxx"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Your Phone Number">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <label> Email:</label><br/>
            <Input
                onChange={this.onEmailChange}
                placeholder="abc@something.com"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Your Email Id">
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

export default AddStaff;