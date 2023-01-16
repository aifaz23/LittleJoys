import React, {Component, Fragment} from "react";
import { Input, Space, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
//material ui, ant design
const axios = require('axios');


class DeleteReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
    };
  }

  deletereport = () => {
    let http = new XMLHttpRequest();
    var url = '/deleteReport';
    var title = this.state.title

    var params = "title=" + title;


    axios.post(url, params)
    .then(function (response) {
     if (response.data === "ok") {
          alert("Report Deleted")
          }
          else alert("No report with title: " + title);
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

  render() {
    return (
    <div>
        <h2>Delete Report</h2>
            <label> Title:</label><br/>
            <Input
                onChange={this.onTitleChange}
                placeholder="Title of the report to delete"
            />
            <br/>
            <Button type="primary" onClick={this.deletereport}>Delete</Button> &nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.cancel}>Cancel</Button>
        </div>
    );
  }
}

export default DeleteReports;