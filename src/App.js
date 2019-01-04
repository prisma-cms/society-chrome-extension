import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import Context from '@prisma-cms/context';

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";


import ChatRooms from "./components/ChatRooms";
import ChatRoom from "./components/ChatRooms/ChatRoom";


export {
  Context,
  ContextProvider,
  SubscriptionProvider,

  ChatRooms,
  ChatRoom,
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