import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../view/Object/Editable";

import { withStyles, IconButton } from 'material-ui';

import MembersList from "./Members";
import MessagesList from "./Messages";
import NewMessage from "./NewMessage";

import PublicIcon from "material-ui-icons/Public";
import { Typography } from 'material-ui';

const styles = theme => {

  return {
    root: {
      // border: "1px solid blue",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    membersShortList: {
      alignItems: "start",
      display: "inline-flex",

      "& > *": {
        margin: 2,
      },
    },
    chat: {
      height: "100%",
      // border: "1px solid green",
      display: "flex",
      flexDirection: "column",
    },
    messages: {
      overflow: "hidden",
      // border: "1px solid yellow",
      flex: 1,
    },
    editor: {
      // border: "1px solid red",
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



  renderHeader() {

    const {
      Grid,
      UserLink,
    } = this.context;

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();
    const inEditMode = this.isInEditMode();
    const canEdit = this.canEdit();


    const {
      isPublic,
      Members,
      code,
    } = object;


    let publicButton = <PublicIcon
      color={isPublic ? "primary" : "disabled"}
    />;


    if (inEditMode) {
      publicButton = <IconButton
        onClick={event => {
          this.updateObject({
            isPublic: !isPublic,
          })
        }}
      >
        {publicButton}
      </IconButton>
    }


    let membersList;


    if (Members && Members.length) {
      const members = Members.slice(0, 5);
      membersList = members.map(n => {

        return <UserLink
          key={n.id}
          user={n}
          showName={false}
          size="small"
        />

      })
    }

    return <Grid
      container
      spacing={8}
      alignItems="center"
    >

      <Grid
        item
        xs
      >
        {inEditMode ?
          this.getTextField({
            name: "name",
            label: "Название комнаты",
            helperText: "Название может быть произвольным",
          })
          : <Typography
            variant="title"
            align="left"
          >
            {this.getTitle()}
          </Typography>
        }

      </Grid>

      {canEdit ?
        <Grid
          item
        >
          {inEditMode ?
            this.getTextField({
              name: "code",
              label: "Код",
              helperText: "Уникальный ключ комнаты",
            })
            : code}
        </Grid>
        :
        null}

      <Grid
        item
        className={classes.membersShortList}
      >
        {/* <MembersList
          Members={Members}
          showName={false}
        /> */}

        {membersList}

      </Grid>

      <Grid
        item
      >
        {this.getButtons()}
      </Grid>

      <Grid
        item
      >
        {publicButton}
      </Grid>

    </Grid>
  }


  renderDefaultView() {

    const {
      Grid,
    } = this.context;

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();
    const canEdit = this.canEdit();
    const inEditMode = this.isInEditMode();


    const {
      id: objectId,
      Members,
      isPublic,
    } = object;

    let members;
    let messages;
    let editor;

    if (objectId) {

      members = <MembersList
        Members={Members}
      />

      messages = <MessagesList
        // Room={object}
        where={{
          Room: {
            id: objectId,
          },
        }}
      />

      editor = <NewMessage
        Room={object}
      />

    }




    return <div
      className={classes.chat}
    >
      <div
        className={classes.messages}
      >

        {messages}

      </div>
      <div
        className={classes.editor}
      >

        {editor}
      </div>
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