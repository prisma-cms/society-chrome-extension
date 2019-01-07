import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import {
  styles as defaultStyles,
  // styles,
  TableView as TableViewProto,
} from '../../../../../../view/List';

import ChatMessage from "../../../../../ChatMessages/View/Object";

import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Button } from 'material-ui';
import gql from 'graphql-tag';

export const styles = theme => {

  const {
    root,
    ...other
  } = defaultStyles(theme);

  return {
    // root: {
    //   height: "100%",
    //   display: "flex",
    //   flexDirection: "column",
    //   // "& #chat-panel": {
    //   //   height: "100%",
    //   // },

    //   "& .active": {
    //     border: "1px solid green",
    //   },
    // },
    scrollContainer: {
      width: "100%",
      height: "100%",
      // flex: 1,
      overflowX: "hidden",
      overflowY: "auto",
      position: "relative",
    },
    ...other
  }
}


export class TableView extends TableViewProto {


  // static propTypes = {
  //   ...TableViewProto.propTypes,
  // }

  static defaultProps = {
    ...TableViewProto.defaultProps,
    title: "",
  };

  componentDidMount() {

    // console.log("TableView componentDidMount");

    Events.scrollEvent.register('begin', function (to, element) {
      // console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function (to, element) {
      // console.log("end", arguments);
    });

    // scrollSpy.unmount(window.document);
    // scrollSpy.mount(this.getScrollContainer());
    scrollSpy.update();

    // console.log("scrollSpy", scrollSpy);
    // setTimeout(() => {

    //   // scroll.scrollToBottom({
    //   //   container: this.getScrollContainer(),
    //   // });

    //   this.scrollToBottom();
    // }, 3000);
    // this.scrollToBottom();

    super.componentDidMount && super.componentDidMount();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      objectsConnection,
    } = this.props.data || {};

    const {
      objectsConnection: prevData,
    } = prevProps.data || {};

    // console.log("componentDidUpdate", objectsConnection === prevData);

    if ((objectsConnection || prevData) && (objectsConnection !== prevData)) {

      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
    }

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
  }


  scrollToTop() {
    scroll.scrollToTop({
      container: this.getScrollContainer(),
    });
  }

  scrollToBottom() {
    scroll.scrollToBottom({
      container: this.getScrollContainer(),
    });
  }

  scrollTo() {
    scroll.scrollTo(100, {
      container: this.getScrollContainer(),
    });
  }

  scrollMore() {
    scroll.scrollMore(100, {
      container: this.getScrollContainer(),
    });
  }

  handleSetActive(to) {
    // console.log("handleSetActive", to);
  }

  getScrollContainer = () => {
    return this.scrollContainer;
  }


  renderContent() {

    const {
      data: {
        loading,
        objectsConnection,
      },
      classes,
      // updateChatMessageProcessor,
    } = this.props;

    const {
      Grid,
      query: {
        updateChatMessageProcessor,
      },
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};


    let messages;

    let items = [];

    messages = objectsConnection && objectsConnection.edges.map(({ node }) => node).map((n, index) => {

      // const {
      //   id,
      //   contentText: message,
      //   CreatedBy,
      // } = n;

      // const {
      //   id: createdById,
      //   fullname,
      //   username,
      // } = CreatedBy;

      // return new Message({
      //   id: currentUserId && currentUserId === createdById ? 0 : 1,
      //   message,
      //   senderName: fullname || username,
      // })

      // items.push(<Grid
      //   key={n.id}
      //   item
      // >
      //   <Link
      //     activeClass="active"
      //     to={n.id}
      //     spy={true}
      //     smooth={true}
      //     duration={500}
      //     onSetActive={this.handleSetActive}
      //     container={this.getScrollContainer()}
      //   >
      //     {n.id}
      //   </Link>
      // </Grid>);

      return <Element
        key={n.id}
        name={n.id}
      >
        <ChatMessage
          data={{
            object: n,
          }}
          mutate={(props) => {
            return this.mutate({
              mutation: gql(updateChatMessageProcessor),
              ...props,
            });
          }}
        />
      </Element>
    }) || [];

    // messages = [];


    return <div
      className={classes.scrollContainer}
      ref={element => {
        this.scrollContainer = element;
      }}
    >
      {messages}
    </div>


    // return (
    //   <div
    //     className={classes.root}
    //   >

    //     <div
    //       className={classes.links}
    //     >
    //       <Grid
    //         container
    //         spacing={8}
    //       >
    //         {items}
    //       </Grid>
    //     </div>

    //     <div
    //       className={classes.scrollContainer}
    //       ref={element => {
    //         this.scrollContainer = element;
    //       }}
    //     >
    //       {messages}
    //     </div>
    //   </div>
    // );

  }

}


export default withStyles(styles)(props => <TableView
  {...props}
/>);