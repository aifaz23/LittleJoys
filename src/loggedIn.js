import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
const axios = require('axios');

class LoggedIn extends Component {
    constructor(props) {
      super(props);
    }

    openStaff = (e) => {
        window.location.href = '/staffInfo'
    }

    openClient = (e) => {
        window.location.href = "/allClients"
    }

    render() {
        return (
            <div>
                <h2>Little Joys System</h2>
                <Button type="primary" onClick={this.openStaff}>Staff Info</Button>
                <br/>
                <br/>
                <Button type="primary" onClick={this.openClient}>Client Info</Button>
                <br/>
            </div>
        );
      }
    }

export default LoggedIn;