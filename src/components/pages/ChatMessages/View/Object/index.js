import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../view/Object/Editable";

import { withStyles, IconButton } from 'material-ui';

import SendIcon from "material-ui-icons/Send";

const styles = theme => {

  return {
    root: {
      // border: "1px solid blue",
      // height: "100%",
      // display: "flex",
      // flexDirection: "column",
    },
  }
}

class ChatMessageView extends EditableView {


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


  getTitle() {

    const {
      id,
    } = this.getObjectWithMutations() || {};

    return id;
  }

  renderDefaultView() {

    const {
      Grid,
      Editor,
    } = this.context;

    const {
      classes,
    } = this.props;

    const {
      id: objectId,
      text,
    } = this.getObjectWithMutations();


    return <div
      className={classes.chat}
    >
      <Grid
        container
        spacing={16}
      >


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
              <Editor
                value={text}
                readOnly={false}
                onChange={text => this.updateObject({
                  text,
                })}
              />


            </Grid>

            <Grid
              item
            >
              <IconButton
                onClick={event => this.save()}
              >
                <SendIcon />
              </IconButton>
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


export default withStyles(styles)(props => <ChatMessageView
  {...props}
/>);