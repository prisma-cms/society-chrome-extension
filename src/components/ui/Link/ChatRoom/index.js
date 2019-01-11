import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from "material-ui/Typography";


import Context from "@prisma-cms/context";

import OpenInBrowserIcon from "material-ui-icons/OpenInBrowser";

export class ChatRoomLink extends Component {


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
      Grid,
    } = this.context;

    let {
      id,
      name,
    } = object;

    name = name || id;

    if (!name || !id) {
      return null;
    }

    const url = `/chat-rooms/${id}`;

    return <Grid
      container
    >
      <Grid
        item
      >
        <Link
          to={url}
          title={name}
          {...other}
        >
          {children || <Typography
            component="span"
          >
            {name}
          </Typography>}
        </Link>
      </Grid>
      <Grid
        item
      >
        <a
          href={`https://modxclub.ru${url}`}
          title={name}
          target="_blank"
        >
          <Typography
            component="span"
          >
            <OpenInBrowserIcon

            />
          </Typography>
        </a>
      </Grid>
    </Grid>
  }
}


export default ChatRoomLink;