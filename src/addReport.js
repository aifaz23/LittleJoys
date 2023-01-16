import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        data: ''
    };
  }

  save = () => {
    let http = new XMLHttpRequest();
    var url = '/addReport';
    var title = this.state.title
    var data = this.state.data

    var params = "title=" + title + "&data="+data;

    axios.post(url, params)
    .then(function (response) {
     if (response.data === "ok") {
          alert("Report Added")
          }
          else alert("Report Not Added");
          window.location.href = "/retrieveClient"
            
    })
    .catch(function (error) {
      alert("An Error Occurred ", error);
  });
  }

  cancel = () => {
    window.location.href = "/retrieveClient";
  } 

  onTitleChange = (e) => {
    this.setState({
        title: e.target.value
    })
  }

  onDataChange = (e) => {
    this.setState({
        data: e.target.value
    })
  }


  render() {
    return (
    <div>
        <h2>Add Report</h2>
            <label> Title:</label><br/>
            <Input
                onChange={this.onTitleChange}
                placeholder="Title"
            />
            <br/>
            <label> Data:</label><br/>
            <textarea value={this.state.data} onChange={this.onDataChange} /><br/>
            <br/>
            <Button type="primary" onClick={this.save}>Save</Button> &nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.cancel}>Cancel</Button>
        </div>
    );
  }
}

export default AddReport;