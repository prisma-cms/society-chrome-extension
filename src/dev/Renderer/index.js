import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import App, {
  ContextProvider,
  SubscriptionProvider,

  ChatRooms,
  ChatRoom,

  ChatMessages,
  ChatMessage,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';

import { withStyles } from 'material-ui';


const styles = theme => {

  return {
    root: {
      // border: "1px solid",
      height: "100%",
      display: "flex",
      flexDirection: "column",

      "& #Renderer--body": {
        flex: 1,
        // border: "1px solid blue",
        overflow: "auto",
      },
    },
  };

}

class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  getRoutes() {

    let routes = super.getRoutes();

    return [
      {
        exact: true,
        path: "/",
        component: App,
      },
      {
        exact: true,
        path: "/chat-rooms",
        component: ChatRooms,
      },
      {
        exact: true,
        path: "/chat-rooms/:id",
        render: props => {

          const {
            match: {
              params: {
                id,
              },
            },
          } = props;

          return <ChatRoom
            key={id}
            where={{
              id,
            }}
            {...props}
          />
        },
      },
      {
        exact: true,
        path: "/chat-messages",
        component: ChatMessages,
      },
      {
        exact: true,
        path: "/chat-messages/:id",
        render: props => {

          const {
            match: {
              params: {
                id,
              },
            },
          } = props;

          return <ChatMessage
            key={id}
            where={{
              id,
            }}
            {...props}
          />
        },
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  renderMenu() {

    return <MainMenu />
  }


  renderWrapper() {

    return <ContextProvider>
      <SubscriptionProvider>
        {super.renderWrapper()}
      </SubscriptionProvider>
    </ContextProvider>;

  }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #root {
              height: 100%;
            }
          `,
        }}
      />
      <div
        className={classes.root}
      >
        {pure ? <App
          {...other}
        /> : super.render()}
      </div>
    </Fragment>;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);