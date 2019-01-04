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

    const {
      ChatRoomLink,
      UserLink,
    } = this.context;

    return [
      // {
      //   id: "id",
      // },
      {
        id: "name",
        renderer: (value, record) => {

          return record ? <ChatRoomLink
            object={record}
          /> : null;
        },
      },
      {
        id: "CreatedBy",
        renderer: (value) => {

          return value ? <UserLink
            user={value}
          /> : null;
        },
      },
    ]

  }

}


export default withStyles(styles)(props => <ChatRoomsListView
  {...props}
/>);