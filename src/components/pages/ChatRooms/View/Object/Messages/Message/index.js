/**
 * Отображение сообщения. На внешнем сайте не используется, только в админке
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from "material-ui/Paper";

import { withStyles, IconButton, Button } from 'material-ui';


import DoneIcon from "material-ui-icons/Done";
import DoneAllIcon from "material-ui-icons/DoneAll";

// import {
//   chatMessageMarkAsReaded,
// } from "query";

import PrismaComponent from '@prisma-cms/component';

export const styles = theme => {

  return {
    root: {
      margin: "0 0 20px 0",
    },
    message: {
      padding: "0 20px 20px",
    },
  }
}

class ChatMessage extends PrismaComponent {

  static propTypes = {
    ...PrismaComponent.propTypes,
    message: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    userLinkProps: PropTypes.object,
  }


  /**
   * Отмечаем, что сообщение прочтено
   */
  async markAsReaded(messageId) {

    await this.mutate({
      // mutation: chatMessageMarkAsReaded,
      variables: {
        id: messageId,
      },
    });

  }


  render() {

    const {
      UserLink,
      Editor,
    } = this.context;

    const {
      currentUser,
      message,
      classes,
      userLinkProps,
      ...other
    } = this.props;


    if (!currentUser || !message) {
      return null;
    }


    const {
      id: currentUserId,
    } = currentUser;

    const {
      id,
      text,
      User,
      ReadedBy,
    } = message;

    const {
      id: userId,
    } = User;


    let status;

    if (userId === currentUserId) {

      if (ReadedBy.find(n => n.User.id !== currentUserId)) {

        status = <DoneAllIcon
          style={{
            fontSize: "1.6rem",
            color: "green",
          }}
        />

      }
      else {
        status = <DoneIcon
          style={{
            fontSize: "1.6rem",
          }}
        />
      }

    }
    else {

      /**
       * Сообщение не мое, и если еще не прочтено, надо отметить прочтение
       */
      if (ReadedBy.find(n => n.User.id === currentUserId)) {
        status = <DoneAllIcon
          style={{
            fontSize: "1.6rem",
            color: "green",
          }}
        />
      }
      else {

        if (userId !== currentUserId) {
          status = <Button
            style={{
              height: "auto",
              width: "auto",
            }}
            onClick={event => {
              this.markAsReaded(id);
            }}
            size="small"
            color="secondary"
          >
            <DoneIcon
              style={{
                fontSize: "1.6rem",
              }}
            /> Отметить прочитанным
          </Button>
        }
      }
    }

    return <Paper
      className={classes.root}
    >

      {User ? <UserLink
        user={User}
        {...userLinkProps}
      /> : null}

      <div
        className={classes.message}
      >
        <Editor
          value={text}
          {...other}
        />

        {status}

      </div>
    </Paper>
  }
}

export default withStyles(styles)(props => <ChatMessage
  {...props}
/>);