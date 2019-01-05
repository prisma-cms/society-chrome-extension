import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  styles,
  TableView as TableViewProto,
} from 'apollo-cms/lib/DataView/List/Table';

import { withStyles } from 'material-ui/styles';


class TableView extends TableViewProto {


  static defaultProps = {
    ...TableView.defaultProps,
    columnData: [],
  };


  render() {

    const {
      Pagination,
    } = this.context;


    const {
      data: {
        objectsConnection,
        loading,
        variables: {
          first: limit,
        },
      },
      page,
    } = this.props;


    const {
      edges,
      aggregate,
    } = objectsConnection || {};

    
    const {
      count = 0,
    } = aggregate || {};


    return <Fragment>
      {super.render()}

      <Pagination
        limit={limit}
        total={count}
        page={page || 1}
        style={{
          marginTop: 20,
        }}
      />

    </Fragment>
  }

}


export {
  styles,
  TableView,
}

export default withStyles(styles)(props => <TableView
  {...props}
/>);