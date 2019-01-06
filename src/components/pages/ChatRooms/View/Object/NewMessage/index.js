import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";


import ChatMessage from "../../../../ChatMessages/View/Object/";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class NewMessage extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    Room: PropTypes.object.isRequired,
  }


  state = {
    ...super.state,
    messageKey: new Date(),
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


    const {
      messageKey,
    } = this.state;

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
      <ChatMessage
        key={messageKey}
        data={{
          object: {
          },
        }}
        _dirty={{}}
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
        onSave={result => this.setState({
          messageKey: new Date(),
        })}
      />
    );
  }
}

export default NewMessage;