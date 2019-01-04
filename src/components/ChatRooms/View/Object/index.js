import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "apollo-cms/lib/DataView/Object/Editable";

class ChatRoomView extends EditableView {
  // render() {
  //   return (
  //     <div>
  //       ChatRoomView
  //     </div>
  //   );
  // }


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


  renderEditableView() {

    const {
      Grid,
    } = this.context;

    return <Grid
      container
      spacing={16}
    >

      <Grid
        item
      >
        {this.getTextField({
          name: "name",
        })}
      </Grid>

    </Grid>

  }

}


export default ChatRoomView;