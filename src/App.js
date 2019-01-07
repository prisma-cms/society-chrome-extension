import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import Context from '@prisma-cms/context';

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

import Notices from "./components/Notices";

import ChatRooms from "./components/pages/ChatRooms";
import ChatRoom from "./components/pages/ChatRooms/ChatRoom";
import CreateChatRoom from "./components/pages/ChatRooms/ChatRoom/Create";

import ChatMessages from "./components/pages/ChatMessages";
import ChatMessage from "./components/pages/ChatMessages/ChatMessage";


export {
  ContextProvider,
  SubscriptionProvider,

  Notices,

  ChatRooms,
  ChatRoom,
  CreateChatRoom,

  ChatMessages,
  ChatMessage,
}

class App extends Component {

  static contextType = Context;

  render() {
    return (
      <div>
        My awesome component
      </div>
    );
  }
}

export default App;