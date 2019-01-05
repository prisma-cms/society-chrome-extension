import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../view/Object/Editable";

import { withStyles } from 'material-ui';

import MembersList from "./Members";
import MessagesList from "./Messages";

const styles = theme => {

  return {
    root: {
      border: "1px solid blue",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  }
}

class ChatRoomView extends EditableView {


  canEdit() {

    const {
      id,
      CreatedBy,
    } = this.getObjectWithMutations() || {}


    const {
      id: createdById,
    } = CreatedBy || {};

    const {
      id: currentUserId,
    } = this.getCurrentUser() || {};

    return !id || (currentUserId && currentUserId === createdById) ? true : false;
  }


  renderDefaultView() {

    const {
      Grid,
    } = this.context;

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();

    const {
      id: objectId,
      Members,
    } = object;

    let members;

    let messages;

    if (objectId) {

      members = <MembersList
        Members={Members}
      />

      messages = <MessagesList
        Room={object}
      />

    }


    return <div
      className={classes.chat}
    >
      <Grid
        container
        spacing={16}
      >

        <Grid
          item
          xs
        >
          {this.getTextField({
            name: "name",
            label: "Название комнаты",
          })}
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Grid
            container
            spacing={8}
          >

            <Grid
              item
              xs
            >
              {messages}
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={3}
            >
              {members}
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    </div>

  }

  renderEditableView() {

    return this.renderDefaultView();
  }

  render() {

    const {
      classes,
    } = this.props;

    return <div
      className={classes.root}
    >
      {super.render()}
    </div>
  }

}


export default withStyles(styles)(props => <ChatRoomView
  {...props}
/>);