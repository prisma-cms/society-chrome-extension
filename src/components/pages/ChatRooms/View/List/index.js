import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  styles,
  TableView,
} from '../../../../view/List';

import { withStyles } from 'material-ui/styles';


class ChatRoomsListView extends TableView {


  static defaultProps = {
    ...TableView.defaultProps,
    title: "Чат-комнаты",
  };


  getColumns() {

    const {
      ChatRoomLink,
      UserLink,
      Grid,
    } = this.context;

    return [
      // {
      //   id: "id",
      // },
      {
        id: "name",
        label: "Название комнаты",
        renderer: (value, record) => {

          return record ? <ChatRoomLink
            object={record}
          /> : null;
        },
      },
      {
        id: "CreatedBy",
        label: "Владелец",
        renderer: (value) => {

          return value ? <UserLink
            user={value}
          /> : null;
        },
      },
      {
        id: "Members",
        label: "Участники",
        renderer: (value) => {

          return value && value.length ? <Grid
            container
            spacing={8}
          >
            {value.map(n => {
              const {
                id,
              } = n;

              return <Grid
                key={id}
                item
              >
                <UserLink
                  user={n}
                  showName={false}
                  size="small"
                />
              </Grid>
            })}
          </Grid> : null;
        },
      },
    ]

  }

}


export default withStyles(styles)(props => <ChatRoomsListView
  {...props}
/>);