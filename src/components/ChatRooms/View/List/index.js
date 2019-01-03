import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  styles,
  TableView,
} from 'apollo-cms/lib/DataView/List/Table';
import { withStyles } from 'material-ui/styles';


class ChatRoomsListView extends TableView {


  static defaultProps = {
    ...TableView.defaultProps,
    title: "Чат-комнаты",
    columnData: [],
  };


  getColumns() {

    return [
      {
        id: "id",
      },
      {
        id: "name",
      },
    ]

  }

}


export default withStyles(styles)(ChatRoomsListView);