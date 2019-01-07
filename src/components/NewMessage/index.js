import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";


import ChatMessage from "../pages/ChatMessages/View/Object/";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class NewMessage extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    data: PropTypes.object.isRequired,
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
      data,
      onSave,
      ...other
    } = this.props;


    const {
      messageKey,
    } = this.state;

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
            data: variablesData,
            ...other
          } = variables || {};

          return this.mutate({
            mutation: gql(createChatMessageProcessor),
            variables: {
              data: {
                ...data,
                ...variablesData,
              },
              ...other,
            },
          })
        }}
        onSave={async result => {

          this.setState({
            messageKey: new Date(),
          });

          // console.log("onSave", onSave, result);

          return onSave ? await onSave(result) : result;
        }}
        {...other}
      />
    );
  }
}

export default NewMessage;