import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ChatRoomPage from "../";

class ChatRoomCreatePage extends ChatRoomPage {


  static defaultProps = {
    ...ChatRoomPage.defaultProps,
    data: {
      object: {},
    },
    _dirty: {
      name: "",
      isPublic: false,
    },
  }


  onSave = (result) => {
    // console.log("this result", result);

    const {
      response,
    } = result.data || {};

    const {
      id,
    } = response && response.data || {}

    if (id) {

      const {
        router: {
          history,
        },
      } = this.context;

      history.push(`/chat-rooms/${id}`);

    }
  }

  componentWillMount() {

    if (!this.Renderer) {

      const {
        View,
      } = this.props;

      const {
        query: {
          createChatRoomProcessor,
        },
      } = this.context;

      this.Renderer = compose(
        graphql(gql(createChatRoomProcessor)),
      )(View);

    }

    super.componentWillMount && super.componentWillMount();
  }

}


export default ChatRoomCreatePage;