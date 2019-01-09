import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

import gql from 'graphql-tag';

import { IconButton } from "material-ui";
import AddIcon from "material-ui-icons/PersonAdd";
import CloseIcon from "material-ui-icons/Undo";

class ChatRoomAddMember extends Component {

  static contextType = Context;

  static propTypes = {
    ChatRoom: PropTypes.object.isRequired,
  };

  state = {
    value: undefined,
    opened: false,
  }

  render() {

    const {
      Grid,
      UserAutocomplete,
      user: currentUser,
    } = this.context;

    const {
      value,
      opened,
    } = this.state;

    const {
      ChatRoom,
    } = this.props;


    const {
      id: roomId,
      Members,
      Invitations,
    } = ChatRoom || {};

    const {
      id: currentUserId,
    } = currentUser || {};

    if (!roomId || !currentUserId || !Members || Members.findIndex(n => n.id === currentUserId) === -1) {
      return null;
    }

    let content = null;

    // console.log("Invitations", Invitations);

    if (opened) {

      let exclude = Members.map(({ id }) => id)
        .concat(Invitations.map(n => n.User.id))
        .concat([currentUserId]);


      // console.log("exclude", exclude);

      content = <Grid
        container
        alignItems="center"
      >
        <Grid
          item
        >
          <IconButton
            onClick={() => this.setState({
              opened: false,
            })}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid
          item
        >
          <UserAutocomplete
            where={{
              id_not_in: exclude,
            }}
            value={value}
            // value="cjqbpqrrw4mrc0860wyktotnn"
            onDelete={value ? (event) => {
              this.setState({
                value: undefined,
              })
            } : undefined}
            saveHandler={value ? async (event) => {
              // updateObject({
              //   blogID: undefined,
              // })

              const {
                query: {
                  inviteChatRoomProcessor,
                },
                client,
              } = this.context;

              await client.mutate({
                mutation: gql(inviteChatRoomProcessor),
                variables: {
                  data: {
                    User: {
                      id: value,
                    },
                  },
                  where: {
                    id: roomId,
                  },
                },
              })
                .then(r => {

                  this.setState({
                    value: undefined,
                    opened: false,
                  });
                })
                .catch(console.error);

            } : undefined}
            onSelect={(value, item) => {
              // console.log("onSelect", value, item);
              const {
                id,
              } = item;
              this.setState({
                value: id || undefined,
              })
            }}
          />
        </Grid>
      </Grid>
        ;
    }
    else {
      content = <IconButton
        onClick={() => this.setState({
          opened: true,
        })}
      >
        <AddIcon />
      </IconButton>
    }


    return content;
  }
}


export default ChatRoomAddMember;