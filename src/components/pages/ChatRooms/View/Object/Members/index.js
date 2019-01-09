import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";


class ChatRoomMembers extends Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
  }

  static contextType = Context;

  render() {

    const {
      Grid,
      UserLink,
      user: currentUser,
    } = this.context;

    const {
      object: {
        Members,
        CreatedBy,
      },
    } = this.props;

    const {
      id: createdById,
    } = CreatedBy;

    return (
      <div>

        <Grid
          container
          spacing={8}
        >

          {Members && Members.map(n => {

            return <Grid
              key={n.id}
              item
              xs={12}
            >
              <UserLink
                user={n}
              />

            </Grid>

          })}

        </Grid>

      </div>
    );
  }
}


export default ChatRoomMembers;