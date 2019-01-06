import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
// import Button from 'material-ui/Button';
// import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
// import Collapse from 'material-ui/transitions/Collapse';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
// import Portal from 'material-ui/Portal';
// import { MenuItem, MenuList } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import NotificationsIcon from "material-ui-icons/Notifications";
import NotificationsActiveIcon from "material-ui-icons/NotificationsActive";
import { IconButton, ListItem } from 'material-ui';
// import { ListItemAvatar } from 'material-ui';
import { ListItemText } from 'material-ui';
import { ListItemSecondaryAction } from 'material-ui';
import { ListItemIcon } from 'material-ui';
import { List } from 'material-ui';

import DeleteIcon from "material-ui-icons/Delete";
import MessageIcon from "material-ui-icons/Message";

// import { Avatar } from 'material-ui';

import PrismaCmsComponent from "@prisma-cms/component";

const styles = theme => {

  return {
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing.unit * 2,
    },
    popperClose: {
      pointerEvents: 'none',
    },
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {
      // color: "white",

      "&.active": {
        color: theme.palette.secondary.main
      },
    },
    listItemText: {
      paddingLeft: 0,
      paddingRight: 22,
    },
  };
};

class MenuListComposition extends PrismaCmsComponent {

  state = {
    ...super.state,
    open: false,
  };

  handleToggle = () => {

    // console.log("handleToggle");

    this.setState({ open: !this.state.open });
  };

  handleClose = event => {

    // console.log("handleClose");

    if (this.target1.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };


  deleteNotice(variables) {

    const {
      deleteNotice,
    } = this.props;

    // this.mutate({
    //   mutation: deleteNotice,
    //   ...props,
    // });

    deleteNotice({
      // variables: {
      //   ...variables,
      // },
      variables,
    });
  }


  renderItems(objects) {

    const {
      ChatRoomLink,
    } = this.context;

    const {
      classes,
    } = this.props;

    return objects.map(n => {

      const {
        id: noticeId,
        type,
      } = n;

      let item;

      // console.log("item", n);


      switch (type) {

        case "ChatMessage":
          {
            const {
              ChatMessage,
            } = n;

            const {
              contentText,
              Room,
            } = ChatMessage || {};

            let secondary = contentText && contentText.substr(0, 25) || undefined;

            item = <ListItem
              key={noticeId}
              onClick={this.handleClose}
            // dense
            >

              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>

              <ListItemText
                primary={<ChatRoomLink
                  object={Room}
                />}
                secondary={secondary}
                className={classes.listItemText}
              />

              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();

                    this.deleteNotice({
                      where: {
                        id: noticeId,
                      },
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>;
          }

          break;
      }

      return item;
    });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;


    let items = [];

    const {
      data: {
        objectsConnection,
      },
    } = this.props;

    const objects = objectsConnection && objectsConnection.edges.map(({ node }) => node) || [];

    items = this.renderItems(objects);


    let Icon = NotificationsIcon;

    if (items.length) {
      Icon = NotificationsActiveIcon;
    }

    return (
      <div className={classes.root} >
        <Manager>
          <Target>
            <div
              ref={node => {
                this.target1 = node;
              }}
            >
              <IconButton
                aria-owns={open ? 'menu-list-grow' : null}
                aria-haspopup="true"
                onClick={event => {

                  event.preventDefault();
                  event.stopPropagation();

                  this.handleToggle();

                }}
                className={[classes.icon, items.length && !open ? "active" : ""].join(" ")}
              >
                <Icon

                />
              </IconButton>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            {/* <ClickAwayListener onClickAway={this.handleClose}> */}
            <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
              <Paper>
                <List
                // role="menu"
                // dense
                >
                  {items}
                </List>
              </Paper>
            </Grow>
            {/* </ClickAwayListener> */}
          </Popper>
        </Manager>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);