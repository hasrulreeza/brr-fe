import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DownloadPDF from "./downloadPDF";
import PreviewPDF from "./previewPDF";


const styles = theme => ({
  root: {
    width: "%",
    overflowX: "auto",
    height: "100vh",
    font: "arial"
  }
});

let id = 0;
function createData(title, dateAdded, pdfURL) {
  id += 1;
  return { id, title, dateAdded, pdfURL };
}

const rows = [
  createData("September 2018 Monthly Report", "12th September 2018 13:45:20",""),
  createData("August 2018 Monthly Report", "31st August 2018 13:45:20","https://github.com/hasrulreeza/mypdf/blob/master/August 2018 Monthly Report.pdf"),
  createData("July 2018 Monthly Report", "8th July 2018 13:45:20","https://raw.githubusercontent.com/hasrulreeza/mypdf/master/test.pdf"),
  createData("June 2018 Monthly Report", "12th June 2018 13:45:20","https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf")
];

function reportTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
    <h2 style={{ padding: 10 }}>Monthly Reports</h2> 
      
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "60%" }}>
              <Typography variant="subtitle1">Title</Typography>
            </TableCell>
            <TableCell style={{ width: "40%" }}>
              <Typography variant="subtitle1">Date Added</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell>
                <PreviewPDF reportName={row.title} pdfURL={row.pdfURL} /> 
                </TableCell>
                <TableCell>{row.dateAdded}</TableCell>
                <TableCell style={{ textAlign: "right" }}>
                <DownloadPDF reportName={row.title} pdfURL={row.pdfURL} />  
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

reportTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(reportTable);
