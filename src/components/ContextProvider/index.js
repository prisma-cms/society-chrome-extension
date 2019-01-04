
import React, {
  Component,
} from 'react';


import {
  Context,
} from "../../App";


class SocietyContext extends Component {

  static contextType = Context;


  componentWillMount() {

    const {
      query,
      ...other
    } = this.context;

    this.newContext = {
      query: {
        ...query,
        ...this.prepareQuery(),
      },
      ...other
    }

  }


  render() {

    const {
      children,
    } = this.props;

    return <Context.Provider
      value={this.newContext}
    >
      {children || null}
    </Context.Provider>;

  }


  prepareQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      ChatRoomNoNestingFragment,
    } = queryFragments;



    const chatRoomsConnection = `
      query chatRoomsConnection (
        $where: ChatRoomWhereInput
        $orderBy: ChatRoomOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: chatRoomsConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...ChatRoomNoNesting
            }
          }
        }
      }

      ${ChatRoomNoNestingFragment}
    `;


    const chatRooms = `
      query chatRooms (
        $where: ChatRoomWhereInput
        $orderBy: ChatRoomOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: chatRooms (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...ChatRoomNoNesting
        }
      }

      ${ChatRoomNoNestingFragment}
    `;


    const chatRoom = `
      query chatRoom (
        $where: ChatRoomWhereUniqueInput!
      ){
        object: chatRooms (
          where: $where
        ){
          ...ChatRoomNoNesting
        }
      }

      ${ChatRoomNoNestingFragment}
    `;


    const createChatRoomProcessor = `
      mutation createChatRoomProcessor(
        $data: ChatRoomCreateInput!
      ) {
        response: createChatRoomProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ChatRoomNoNesting
          }
        }
      }

      ${ChatRoomNoNestingFragment}
    `;


    const updateChatRoomProcessor = `
      mutation updateChatRoomProcessor(
        $data: ChatRoomUpdateInput!
        $where: ChatRoomWhereUniqueInput!
      ) {
        response: updateChatRoomProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ChatRoomNoNesting
          }
        }
      }

      ${ChatRoomNoNestingFragment}
    `;



    return {
      chatRoomsConnection,
      chatRooms,
      chatRoom,
      createChatRoomProcessor,
      updateChatRoomProcessor,
    }

  }

}

export default SocietyContext;