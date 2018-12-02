import React from "react";
import ReactDOM from "react-dom";
import Download from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import saveAs from 'file-saver';
import axios from "axios";

class DownloadPDF extends React.Component {
  state = {
    contacts: []
  };

  // componentDidMount() {
  //   axios
  //     .get("https://raw.githubusercontent.com/hasrulreeza/myjson/master/responsepdf.json")
  //     .then(response => {
  //       // create an array of contacts only with relevant data
  //       const newContacts = response.data.map(c => {
  //         return {
  //           id: c.id,
  //           filename: c.filename,
  //           contentdata: c.contentdata

  //         };
  //       });

  //       // create a new "state" object without mutating
  //       // the original state object.
  //       const newState = Object.assign({}, this.state, {
  //         contacts: newContacts
  //       });

  //       // store the new state object in the component's state
  //       this.setState(newState);
  //     })
  //     .catch(error => console.log(error));
  // }

  download(reportName, pdfURL) {

    var oReq = new XMLHttpRequest();
    // The Endpoint of your server 
    var URLToPDF = "https://raw.githubusercontent.com/hasrulreeza/mypdf/master/test.pdf";

    // Configure XMLHttpRequest
    oReq.open("GET", URLToPDF, true);

    // Important to use the blob response type
    oReq.responseType = "arraybuffer";

    // When the file request finishes
    // Is up to you, the configuration for error events etc.
    
    oReq.onload = function () {
      // Once the file is downloaded, open a new window with the PDF
      // Remember to allow the POP-UPS in your browser
      var file = new Blob([oReq.response], {
        type: 'application/pdf'
      });

      // Generate file download directly in the browser !
      saveAs(file, reportName+".pdf");
    };

    
    oReq.send();

  }
  render() {
    return (
      <div>
        <IconButton color="primary" onClick={this.download.bind(this, this.props.reportName, this.props.pdfURL)}>
          <Download />
        </IconButton>
      </div>
    );
  }
}
/*

       
      <button onClick={this.download}>{this.props.pdfURL}</button>
*/

//onClick={this.download(this.props.pdfURL)}
export default DownloadPDF;
//ReactDOM.render(<SimpleDownloadFile />, document.getElementById("View"));
