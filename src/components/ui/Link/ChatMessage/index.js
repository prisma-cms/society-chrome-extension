import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from "material-ui/Typography";


import Context from "@prisma-cms/context";
 
export class ChatMessageLink extends Component {

  
  static contextType = Context;

  render() {

    const {
      object,
      children,
      ...other
    } = this.props;


    if (!object) {
      return null;
    }

    const {
      Link,
    } = this.context;

    const {
      id,
    } = object;


    if (!id) {
      return null;
    }

    const name = id;

    return <Link
      to={`/chat-messages/${id}`}
      title={name}
      {...other}
    >
      {children || <Typography
        component="span"
      >
        {name}
      </Typography>}
    </Link>
  }
}


export default ChatMessageLink;