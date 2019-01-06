import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// import {
//   styles,
//   TableView,
// } from '../../../../view/List';

import { withStyles } from 'material-ui/styles';


import ChatMessage from "../Object";
import gql from 'graphql-tag';

import {
  styles,
  TableView,
} from '../../../../view/List';

class ChatMessagesListView extends TableView {


  static defaultProps = {
    ...TableView.defaultProps,
    title: "Чат-сообщения",
  };


  // getColumns() {

  //   const {
  //     ChatMessageLink,
  //     ChatRoomLink,
  //     UserLink,
  //     Grid,
  //   } = this.context;

  //   return [
  //     // {
  //     //   id: "id",
  //     // },
  //     {
  //       id: "id",
  //       label: "ID сообщения",
  //       renderer: (value, record) => {

  //         return record ? <ChatMessageLink
  //           object={record}
  //         /> : null;
  //       },
  //     },
  //     {
  //       id: "Room",
  //       label: "Название комнаты",
  //       renderer: (value, record) => {

  //         return value ? <ChatRoomLink
  //           object={value}
  //         /> : null;
  //       },
  //     },
  //     {
  //       id: "CreatedBy",
  //       label: "Автор сообщения",
  //       renderer: (value) => {

  //         return value ? <UserLink
  //           user={value}
  //         /> : null;
  //       },
  //     },
  //   ]

  // }

  renderContent() {

    const {
      data: {
        loading,
        objectsConnection,
      },
      classes,
    } = this.props;

    const {
      Grid,
      query: {
        updateChatMessageProcessor,
      },
    } = this.context;


    let messages = objectsConnection && objectsConnection.edges.map(({ node }) => node) || [];


    let messagesList = <Grid
      container
    >
      {messages.map(n => {

        return <Grid
          key={n.id}
          item
          xs={12}
        >
          <ChatMessage
            data={{
              object: n,
            }}
            mutate={props => {

              return this.mutate({
                mutation: gql(updateChatMessageProcessor),
                ...props
              });
            }}
          />
        </Grid>

      })}
    </Grid>

    return <div
      className={classes.root}
    >
      {messagesList}
    </div>;

  }

}


export default withStyles(styles)(props => <ChatMessagesListView
  {...props}
/>);