import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class RetrieveClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        clientInfo: [],
        reports: [],
        value: ''
    };
  }

  componentDidMount = () => {
    this.retrieveClientInfo()
}

  retrieveClientInfo = () => {
    let http = new XMLHttpRequest();
    var url = '/retrieveClient';

    axios.post(url)
    .then(function (response) {
        this.setState({
            value: response.data
        })           
    }.bind(this))
    .catch(function (error) {
      alert("An Error Occurred ", error);
  });
  }

  addreport = () => {
    window.location.href = "/addReport";
  }

  deletereport = () => {
    window.location.href = "/deleteReport";
  } 

  back = () => {
    window.location.href = "/allClients";
  } 

  handleChange = (e) => {
    this.setState({
        value: e.target.value
    })
  }

  TextFormatter(text) {
    const newText = text.split('\n').map(word => <p>{word}</p>);
    return newText;
  }

  render() {
    return (
    <div>
        <h2>Client Information</h2> 

        <p>{this.TextFormatter(this.state.value)}</p>
          <Button type="primary" onClick={this.addreport}>Add Report</Button> &nbsp;
            <Button type="primary" onClick={this.back}>Back</Button> &nbsp;
            <Button type="primary" onClick={this.deletereport}>Delete Report</Button>
        </div>
    );
  }
}

export default RetrieveClient;