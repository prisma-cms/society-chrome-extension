import React, { Component } from 'react';
import PropTypes from 'prop-types';


import ChatMessagesList from "../../../../ChatMessages";

import View from "./View";

class ChatRoomMessages extends ChatMessagesList {


  static defaultProps = {
    ...ChatMessagesList.defaultProps,
    first: undefined,
    // last: 5,
    View,
  }

}


export default ChatRoomMessages;