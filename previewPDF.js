import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import PreviewPDFiframe from "./previewPDFiframe";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});



class PreviewPDF extends React.Component {
  state = {
    open: false,
    pdfURL: null,
  };

  constructor () {
    super()
    this.renderMap = this.renderMap.bind(this);
  }
  
  handleOpen = () => {
    //this.setState({ open: true });
    axios
    .get("https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf")
    .then(response => {
        // "http://10.129.6.121:9999/brr-ms/getPdfReportById?id=10"
        // create an array of contacts only with relevant data
        // const newContacts = response.data.map(c => {
        //   return {
        //     id: c.id,
        //     name: c.name
        //   };
        // });

        // // create a new "state" object without mutating
        // // the original state object.
        // const newState = Object.assign({}, this.state, {
        //   contacts: newContacts
        // });

        // // store the new state object in the component's state
        // this.setState(newState);
        
        var buffer = response.data;
        // var view = new Uint8Array(buffer);
        var blob = new Blob([buffer], {
          type: 'application/pdf'
        });

        const objectURL = URL.createObjectURL(blob);
        console.log('1st',objectURL);

        const newState = Object.assign({}, this.state, {
          open: true,
          pdfURL: objectURL 
        });

        // const newState = this.state;
        // newState.pdfURL = objectURL;

        this.setState(newState);

      })
      .catch(error => console.log(error));

      console.log('2nd',this.state.pdfURL);

    // this.setState({ open: true });
    //var objectURL;
    // axios
    //   .get("http://10.129.6.121:9999/brr-ms/getPdfReportById?id=10")
    //   .then(response => {
    //     // create an array of contacts only with relevant data
    //     // const newContacts = response.data.map(c => {
    //     //   return {
    //     //     id: c.id,
    //     //     name: c.name
    //     //   };
    //     // });

    //     // create a new "state" object without mutating
    //     // the original state object.
    //     // const newState = Object.assign({}, this.state, {
    //     //   contacts: newContacts
    //     // });
    //     var buffer = response.data;
    //     // var view = new Uint8Array(buffer);
    //     var blob = new Blob([buffer], {
    //       type: 'application/pdf'
    //     });

    //     const objectURL = URL.createObjectURL(blob);
    //     // store the new state object in the component's state
    //     console.log('kkkkk', objectURL);

    //      var ifr = document.getElementById('myIframe');
    

    //      this.ifr.onload = () => {
    //        this.ifr.url = objectURL;
    //      }

    //     const newState = Object.assign({}, this.state, {
    //       open: true,
    //       pdfURL: objectURL
    //     });

    //     this.setState(newState);
    //   })
    //   .catch(error => console.log(error));

    // // console.log('433333',objectURL);
    // console.log('ayam3', this.state.pdfURL);
    /*var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    var objectURL;
    console.log('433333',objectURL);
    xhr.open('GET', 'http://10.129.6.121:9999/brr-ms/getPdfReportById?id=10', true);
    xhr.onload = function () {

      // Create the Blob URL:
      var buffer = xhr.response;
      // var view = new Uint8Array(buffer);
      var blob = new Blob([buffer], {
        type: 'application/pdf'
      });
       
      objectURL = URL.createObjectURL(blob);
      console.log('ayam1',objectURL);
      // this.setState({ pdfURL: objectURL });
      // window.open(objectURL,'_blank');
      // state.pdfURL = objectURL;
      // // Create an iframe to demonstrate it:
      //var iframe = document.createElement('iframe');
      // iframe.className = 'sample-iframe';
      //iframe.src = objectURL;
      //document.body.appendChild(iframe);
      //console.log(objectURL);
      //Iframe.url = objectURL;
    };
   
    xhr.send();
    console.log('ayam2',objectURL);
    this.setState({ pdfURL: "lembu"});
    console.log('ayam3',this.state.pdfURL);*/

  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /* preview(pdfURL) {
   // fake server request, getting the file url as response
   // setTimeout(() => {
     const response = {
       file:pdfURL
     };
     // server sent the url to the file!
     // now, let's download:
     // window.location.href = response.file;
     // you could also do:
        window.open(response.file,'_blank');
   // }, 100);
   onClick={this.preview.bind(this,this.props.pdfURL)}
   
 }*/

  // base64 string

  renderMap(){
    return (
      <PreviewPDFiframe previewurl={this.state.pdfURL}/>
    );
  }

  render() {
    const { classes } = this.props;
    const renderMap = this.renderMap();
    return (
      <div>
        <Button color="primary" onClick={this.handleOpen} style={{ textTransform: "none" }}>
          {this.props.reportName}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <PreviewPDFiframe previewurl={this.state.pdfURL}/>
            
          </div>
        </Modal>
      </div>
    );
  }
}




export default withStyles(styles)(PreviewPDF);
