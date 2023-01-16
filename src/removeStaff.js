import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class RemoveStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        id: '',
    };
  }

  remove = () => {
    let http = new XMLHttpRequest();
    var url = '/removeStaff';
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
          alert("Staff Removed!")
          }
          else alert("No such staff exists!");
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

  onIdChange = (e) => {
    this.setState({
        id: e.target.value
    })
  }

  render() {
    return (
    <div>
        <h2>Remove Staff</h2>
            <label> Staff Name:</label><br/>
            <Input
                onChange={this.onNameChange}
                placeholder="Enter staff name"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Staff name to remove">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <label> Staff ID:</label><br/>
            <Input
                onChange={this.onIdChange}
                placeholder="Enter staff id"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Staff id to remove">
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

export default RemoveStaff;