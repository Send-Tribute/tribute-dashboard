import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    width: '100%',
    marginTop: 10,
    overflowX: 'auto'
  },
  table: {}
});

const CustomTable = ({ headings, rows }) => {
  const classes = useStyles();

  let head = <TableCell />;
  if (headings && headings.length) {
    head = headings.map(heading => (
      <TableCell align="center" key={heading}>
        {heading}
      </TableCell>
    ));
  }

  let bodyRows = <TableRow />;
  if (rows && rows.length) {
    bodyRows = rows.map((row, i) => (
      <TableRow key={`${row[i].item + i}`}>
        {row.map((item, j) => (
          <TableCell align="center" key={`${item + j}`}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody>{bodyRows}</TableBody>
      </Table>
    </Paper>
  );
};

CustomTable.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  rows: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
};

export default CustomTable;
