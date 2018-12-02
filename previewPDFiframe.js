import React from "react";
import Iframe from "react-iframe";



class PreviewPDFiframe extends React.Component {
  componentDidMount () {
    console.log('3rd', this.props.previewurl);
  }
  

  render() {
    const { classes } = this.props;
    return (
          <Iframe
              url={this.props.previewurl}
              width="100%"
              height="100%"
              id="myIframe"
              className="myClassname"
              display="initial"
              position="relative" 
              allowFullScreen
            />
    );
  }
}




export default PreviewPDFiframe;
