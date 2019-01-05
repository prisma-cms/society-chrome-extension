import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";

// import ChatMessage from "./Message";

import ChatMessage from "../../../../ChatMessages/View/Object/";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ChatMessages extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    Room: PropTypes.object.isRequired,
  }

  // componentWillMount() {

  //   const {
  //     query: {
  //       createChatMessageProcessor,
  //     },
  //   } = this.context;

  //   Object.assign(this.state, {
  //     // createChatMessageProcessor: graphql(gql(createChatMessageProcessor)),
  //     createChatMessageProcessor: ,
  //   });

  //   super.componentWillMount && super.componentWillMount();
  // }

  render() {

    const {
      query: {
        createChatMessageProcessor,
      },
    } = this.context;


    const {
      Room,
    } = this.props;


    if (!Room) {
      return null;
    }

    const {
      id: roomId,
    } = Room;


    if (!roomId) {
      return null;
    }

    return (
      <div>
        Message:
        <ChatMessage
          data={{
            object: {
            },
          }}
          mutate={async ({
            variables,
          }) => {

            // console.log("variables", variables);

            let {
              data,
              ...other
            } = variables || {};

            return this.mutate({
              mutation: gql(createChatMessageProcessor),
              variables: {
                data: {
                  ...data,
                  Room: {
                    connect: {
                      id: roomId,
                    },
                  },
                },
                ...other,
              },
            });
          }}
        />
      </div>
    );
  }
}


export default ChatMessages;