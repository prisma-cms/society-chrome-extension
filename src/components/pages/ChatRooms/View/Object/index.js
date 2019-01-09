import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../view/Object/Editable";

import { withStyles, IconButton } from 'material-ui';

import ExitIcon from "material-ui-icons/ExitToApp";
import JoinIcon from "material-ui-icons/GroupAdd";

// import MembersList from "./Members";
import MessagesList from "./Messages";
import AddMember from "./AddMember";

import PublicIcon from "material-ui-icons/Public";

import gql from 'graphql-tag';

import { Typography } from 'material-ui';
import { NewMessage } from '../../../../../App';


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
      user: currentUser,
    } = this.context;

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();
    const inEditMode = this.isInEditMode();
    const canEdit = this.canEdit();


    const {
      id: objectId,
      isPublic,
      Members,
      code,
      Invitations,
      CreatedBy,
    } = object;


    const {
      id: currentUserId,
    } = currentUser || {};

    const {
      id: createdById,
    } = CreatedBy || {};


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


    let membersList = [];

    let members = [];

    // Invitations.map(n => n.User.id).concat(Members)

    if (Invitations && Invitations.length) {
      members = members.concat(Invitations.map(n => n.User));
    }

    if (Members && Members.length) {
      members = members.concat(Members);
    }

    members = members.slice(0, 5);

    if (Members && Members.length) {
      membersList = members.map(n => {

        return <Grid
          key={n.id}
          item
        >
          <UserLink
            user={n}
            showName={false}
            size="small"
          />
        </Grid>

      })
    }

    membersList.push(<Grid
      key="AddMember"
      item
    >
      <AddMember
        ChatRoom={object}
      />
    </Grid>);


    if (objectId) {

      if (Members && Members.find(n => n.id === currentUserId)) {

        if (createdById !== currentUserId) {

          membersList.push(<Grid
            key="Exit"
            item
          >
            <IconButton
              title="Покинуть чат"
              onClick={async event => {

                const {
                  query: {
                    leaveChatRoom,
                  },
                  client,
                } = this.context;

                await client.mutate({
                  mutation: gql(leaveChatRoom),
                  variables: {
                    where: {
                      id: objectId,
                    },
                  },
                })
                  .then(r => {

                  })
                  .catch(console.error);

              }}
            >
              <ExitIcon

              />
            </IconButton>
          </Grid>);

        }

      }
      else {

        if (currentUserId) {

          const Invitation = Invitations && Invitations.find(n => n.User.id === currentUserId) || null;

          if (Invitation || isPublic) {


            membersList.push(<Grid
              key="Join"
              item
            >
              <IconButton
                title="Вступить в чат"
                onClick={async event => {

                  const {
                    query: {
                      joinChatRoom,
                    },
                    client,
                  } = this.context;

                  await client.mutate({
                    mutation: gql(joinChatRoom),
                    variables: {
                      where: {
                        id: objectId,
                      },
                    },
                  })
                    .then(r => {

                    })
                    .catch(console.error);

                }}
              >
                <JoinIcon

                />
              </IconButton>
            </Grid>);
          }
        }

      }

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

        {membersList && membersList.length ?
          <Grid
            container
            alignItems="center"
            spacing={8}
          >
            {membersList}
          </Grid>
          : null
        }

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

    // let members;
    let messages;
    let editor;

    if (objectId) {

      // members = <MembersList
      //   object={object}
      // />

      messages = <MessagesList
        // Room={object}
        where={{
          Room: {
            id: objectId,
          },
        }}
      />

      editor = <NewMessage
        data={{
          Room: {
            connect: {
              id: objectId,
            },
          },
        }}
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