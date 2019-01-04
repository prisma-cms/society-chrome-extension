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



// class ChatRoomsConnector extends Component {


//   static propTypes = {
//     fragments: PropTypes.object.isRequired,
//   };

//   static contextTypes = {
//     getQueryFragment: PropTypes.func.isRequired,
//   }


//   constructor(props) {

//     console.log("ChatRoomsConnector constructor");

//     super(props)

//   }


//   componentWillMount() {

//     const {
//       fragments,
//     } = this.props;


//     const {
//       ChatRoomNoNestingFragment,
//     } = fragments;


//     const query = `
//         query {
//           chatRoomsConnection {
//             aggregate{
//               count
//             }
//             edges{
//               node{
//                 ...ChatRoomNoNesting
//               }
//             }
//           }
//         }

//         ${ChatRoomNoNestingFragment}
//       `;

//     this.Renderer = graphql(gql(query))(ChatRooms);

//   }


//   render() {

//     const {
//       Renderer,
//     } = this;

//     return <Renderer
//       {...this.props}
//     />;
//   }
// }


export default ChatRooms; 