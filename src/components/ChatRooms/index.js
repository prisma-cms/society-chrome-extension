import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import {
  Context,
} from "../../App";

import View from "./View/List";


class ChatRooms extends Component {


  static propTypes = {
    View: PropTypes.func.isRequired,
  };

  static defaultProps = {
    View,
    // first: 10,
  }

  static contextType = Context;


  constructor(props) {

    console.log("ChatRooms constructor");

    super(props)

  }


  componentWillMount() {

    const {
      query: {
        chatRoomsConnection,
      },
    } = this.context;

    this.Renderer = graphql(gql(chatRoomsConnection))(View);

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


export default ChatRooms; 