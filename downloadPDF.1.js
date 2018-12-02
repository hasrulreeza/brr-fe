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

  componentDidMount() {
    axios
    .get("https://raw.githubusercontent.com/hasrulreeza/myjson/master/responsepdf.json")
    .then(response => {
      // create an array of contacts only with relevant data
      const newContacts = response.data.map(c => {
        return {
          id: c.id,
          filename: c.filename,
          contentdata: c.contentdata

        };
      });

      // create a new "state" object without mutating
      // the original state object.
      const newState = Object.assign({}, this.state, {
        contacts: newContacts
      });

      // store the new state object in the component's state
      this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  download(reportName,pdfURL) {

// var oReq = new XMLHttpRequest();
// // The Endpoint of your server 
// //var URLToPDF = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

// // Configure XMLHttpRequest
// oReq.open("GET", pdfURL, true);

// // Important to use the blob response type
// oReq.responseType = "blob";

// // When the file request finishes
// // Is up to you, the configuration for error events etc.
// oReq.onload = function() {
//     // Once the file is downloaded, open a new window with the PDF
//     // Remember to allow the POP-UPS in your browser
//     var file = new Blob([oReq.response], { 
//         type: 'application/pdf' 
//     });
    
//     // Generate file download directly in the browser !
//     saveAs(file, reportName+".pdf");
// };

// oReq.send();
// var str1=atob(reportName);
// var blob = new Blob([str1], {type: "application/pdf;base64"});
// saveAs(blob, reportName+".pdf");

//var dlnk = document.getElementById('dwnldLnk');
//dlnk.href = pdf;

//dlnk.click();


  this.componentDidMount.bind(this);

   // console.log('response',response);
    console.log('this.state.contacts',this.state.contacts);

    var pdfname = this.state.contacts[0].filename;
    var base64pdf = this.state.contacts[0].contentdata;
    console.log('pdfname',pdfname);
    console.log('base64pdf',base64pdf);
// base64 string

var base64str = "data:application/pdf;base64,"+ base64pdf;
console.log('base64str',base64str.split(','));
var arr = base64str.split(',')
// decode base64 string, remove space for IE compatibility
var binary = atob(arr[1]);
var len = binary.length;
var buffer = new ArrayBuffer(len);
var view = new Uint8Array(buffer);
for (var i = 0; i < len; i++) {
   view[i] = binary.charCodeAt(i);
}
console.log('view',view)
// create the blob object with content-type "application/pdf"               
var blob1 = new Blob( [view], { type: "application/pdf" });
saveAs(blob1, pdfname);

  }
  render() {
    return (
   <div>
        <IconButton color="primary" onClick={this.download.bind(this,this.props.reportName,this.props.pdfURL)}>
        <Download/>
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
