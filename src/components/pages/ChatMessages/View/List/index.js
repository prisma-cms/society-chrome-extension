import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  styles,
  TableView,
} from '../../../../view/List';

import { withStyles } from 'material-ui/styles';


class ChatMessagesListView extends TableView {


  static defaultProps = {
    ...TableView.defaultProps,
    title: "Чат-сообщения",
  };


  getColumns() {

    const {
      ChatMessageLink,
      ChatRoomLink,
      UserLink,
      Grid,
    } = this.context;

    return [
      // {
      //   id: "id",
      // },
      {
        id: "id",
        label: "ID сообщения",
        renderer: (value, record) => {

          return record ? <ChatMessageLink
            object={record}
          /> : null;
        },
      },
      {
        id: "Room",
        label: "Название комнаты",
        renderer: (value, record) => {

          return value ? <ChatRoomLink
            object={value}
          /> : null;
        },
      },
      {
        id: "CreatedBy",
        label: "Автор сообщения",
        renderer: (value) => {

          return value ? <UserLink
            user={value}
          /> : null;
        },
      },
    ]

  }

}


export default withStyles(styles)(props => <ChatMessagesListView
  {...props}
/>);