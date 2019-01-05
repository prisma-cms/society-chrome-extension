import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import View from "../View/Object";

import ObjectPage from "../../Object";


class ChatMessage extends ObjectPage {


  static propTypes = {
    ...ObjectPage.propTypes,
    View: PropTypes.func.isRequired,
  };


  static defaultProps = {
    ...ObjectPage.defaultProps,
    View,
    // first: 10,
  } 


  // constructor(props) {

  //   console.log("ChatMessages constructor");

  //   super(props)

  // }


  componentWillMount() {

    const {
      query: {
        chatMessage,
        updateChatMessageProcessor,
      },
    } = this.context;

    this.Renderer = compose(
      graphql(gql(chatMessage)),
      graphql(gql(updateChatMessageProcessor)),
    )(View);

  }


  render() {

    const {
      Renderer,
    } = this;

    const {
      View,
      ...other
    } = this.props;

    return <Renderer
      {...other}
    />
  }
}


export default ChatMessage; 