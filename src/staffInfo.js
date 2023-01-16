import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
const axios = require('axios');


class StaffInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        data: []
    };
  }

  componentDidMount = () => {
      this.retrieveStaffInfo()
  }


    retrieveStaffInfo = () => {
    var url = '/staffInfo';


    axios.post(url)
    .then(function (response) {
        console.log(response.data);
        this.setState({
        data: response.data
    })
    }.bind(this))
    .catch(function (error) {
        console.log(error);
      alert("An Error Occurred ", error);
  });
  }

  
    addStaff = () => {
        window.location.href = "/addStaff"
    }

    removeStaff = () =>{
        window.location.href = "/removeStaff"
    }

    back = () => {
        window.location.href = "/loggedIn";
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h2>Staff information</h2>
                <Button type="primary" onClick={this.addStaff}>Add Staff</Button><br/>
                <Button type="primary" onClick={this.back}>Back</Button><br/>
                <h3>All Staff</h3>
                {this.state.data.map(data => 
                    <div>
                    <label>Name: </label>{data.name}<br/>
                    <label>Phone: </label>{data.phone}<br/>
                    <label>Email: </label>{data.email}<br/><br/>
                    <p>----------------</p>
                    </div>)}
                <Button type="primary" onClick={this.removeStaff}>Remove Staff</Button><br/>
            </div>
        );
    }
}

export default StaffInfo;