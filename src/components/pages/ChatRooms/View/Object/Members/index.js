import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";


class ChatRoomMembers extends Component {

  static propTypes = {
    Members: PropTypes.array.isRequired,
  }

  static contextType = Context;

  render() {

    const {
      Grid,
      UserLink,
    } = this.context;

    const {
      Members,
    } = this.props;

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