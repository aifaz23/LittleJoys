import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    };
  }

    login = () => {
        var url = '/login';
        var username = this.state.username
        var password = this.state.password

        var params = "username=" + username + "&password=" + password;

        axios.post(url, params)
          .then(function (response) {
           if (response.data === "ok") {
                window.location.href = '/loggedIn'
                }
                else alert("Login Failed - wrong username/password");
          })
          .catch(function (error) {
            alert("An Error Occurred ", error);
        });

    };
    onUserNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
  render() {
    return (
    <div>
        <h2>Little Joys - Login</h2>
            <label> Username:</label><br/>
            <Input
                onChange={this.onUserNameChange}
                placeholder="Enter your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <br/>
            <label> Password:</label><br/>
            <Space direction="vertical">
                <Input.Password
                    placeholder="Enter password"
                    onChange={this.onPasswordChange}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

                />
            </Space>
            <br/>
            <Button type="primary" onClick={this.login}>Login</Button>
            <br/>
        </div>
    );
  }
}

export default MainPage;