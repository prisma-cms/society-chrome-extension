
import React, {
  Component,
} from 'react';


import {
  Context,
} from "../../App";

import * as UI from "../ui";

class ContextProvider extends Component {

  static contextType = Context;


  // componentWillMount() {

  //   const {
  //     query,
  //     ...other
  //   } = this.context;

  //   this.newContext = {
  //     query: {
  //       ...query,
  //       ...this.prepareQuery(),
  //     },
  //     ...other
  //   }

  // }


  render() {

    const {
      children,
    } = this.props;

    let {
      query,
    } = this.context;

    Object.assign(this.context, {
      query: {
        ...query,
        ...this.prepareQuery(),
      },
      ...UI,
    });

    return <Context.Provider
      value={this.context}
    >
      {children || null}
    </Context.Provider>;

  }


  prepareQuery() {


    return {
      ...this.prepareChatRoomQuery(),
      ...this.prepareChatMessageQuery(),
    }

  }


  prepareChatRoomQuery() {
    const {
      queryFragments,
    } = this.context;


    const {
      ChatRoomNoNestingFragment,
      UserNoNestingFragment,
    } = queryFragments;


    const chatRoomFragment = `
      fragment chatRoom on ChatRoom {
        ...ChatRoomNoNesting
        CreatedBy{
          ...UserNoNesting
        }
        Members{
          ...UserNoNesting
        }
      }

      ${ChatRoomNoNestingFragment}
      ${UserNoNestingFragment}
    `;


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
              ...chatRoom
            }
          }
        }
      }

      ${chatRoomFragment}
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
          ...chatRoom
        }
      }

      ${chatRoomFragment}
    `;


    const chatRoom = `
      query chatRoom (
        $where: ChatRoomWhereUniqueInput!
      ){
        object: chatRoom(
          where: $where
        ){
          ...chatRoom
        }
      }

      ${chatRoomFragment}
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
            ...chatRoom
          }
        }
      }

      ${chatRoomFragment}
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
            ...chatRoom
          }
        }
      }

      ${chatRoomFragment}
    `;


    return {
      chatRoomsConnection,
      chatRooms,
      chatRoom,
      createChatRoomProcessor,
      updateChatRoomProcessor,
    }
  }


  prepareChatMessageQuery() {
    const {
      queryFragments,
    } = this.context;


    const {
      ChatRoomNoNestingFragment,
      ChatMessageNoNestingFragment,
      UserNoNestingFragment,
    } = queryFragments;


    const chatMessageFragment = `
      fragment chatMessage on ChatMessage {
        ...ChatMessageNoNesting
        CreatedBy{
          ...UserNoNesting
        }
        Room{
          ...ChatRoomNoNesting
        }
      }

      ${ChatMessageNoNestingFragment}
      ${UserNoNestingFragment}
      ${ChatRoomNoNestingFragment}
    `;


    const chatMessagesConnection = `
      query chatMessagesConnection (
        $where: ChatMessageWhereInput
        $orderBy: ChatMessageOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: chatMessagesConnection (
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
              ...chatMessage
            }
          }
        }
      }

      ${chatMessageFragment}
    `;


    const chatMessages = `
      query chatMessages (
        $where: ChatMessageWhereInput
        $orderBy: ChatMessageOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: chatMessages (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...chatMessage
        }
      }

      ${chatMessageFragment}
    `;


    const chatMessage = `
      query chatMessage (
        $where: ChatMessageWhereUniqueInput!
      ){
        object: chatMessage(
          where: $where
        ){
          ...chatMessage
        }
      }

      ${chatMessageFragment}
    `;


    const createChatMessageProcessor = `
      mutation createChatMessageProcessor(
        $data: ChatMessageCreateInput!
      ) {
        response: createChatMessageProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...chatMessage
          }
        }
      }

      ${chatMessageFragment}
    `;


    const updateChatMessageProcessor = `
      mutation updateChatMessageProcessor(
        $data: ChatMessageUpdateInput!
        $where: ChatMessageWhereUniqueInput!
      ) {
        response: updateChatMessageProcessor(
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
            ...chatMessage
          }
        }
      }

      ${chatMessageFragment}
    `;


    return {
      chatMessagesConnection,
      chatMessages,
      chatMessage,
      createChatMessageProcessor,
      updateChatMessageProcessor,
    }
  }

}

export default ContextProvider;