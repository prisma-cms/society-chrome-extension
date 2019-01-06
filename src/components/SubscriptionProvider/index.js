
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import gql from "graphql-tag";

import {
  Context,
} from "../../App";

export default class SubscriptionProvider extends Component {


  static contextType = Context;


  state = {
    subscriptions: [],
  }


  componentDidMount() {

    this.subscribe();

  }

  componentWillUnmount() {

    this.unsubscribe();

  }


  async subscribe() {

    const {
      client,
    } = this.context;


    if(!client){
      console.error("client is empty");
      return;
    }

    await this.unsubscribe();


    let {
      subscriptions,
    } = this.state;


    const subscribeChatRoom = gql`
      subscription chatRoom{
        chatRoom{
          mutation
          node{
            id
          }
        }
      }
    `;

    const chatRoomSub = await client
      .subscribe({
        query: subscribeChatRoom,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          await this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });


    subscriptions.push(chatRoomSub);


    const subscribeChatMessage = gql`
      subscription chatMessage{
        chatMessage{
          mutation
          node{
            id
          }
        }
      }
    `;

    const chatMessageSub = await client
      .subscribe({
        query: subscribeChatMessage,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          await this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });


    subscriptions.push(chatMessageSub);



    this.setState({
      subscriptions,
    });

  }


  unsubscribe() {


    return new Promise((resolve) => {

      const {
        subscriptions,
      } = this.state;

      if (subscriptions && subscriptions.length) {


        subscriptions.map(n => {
          n.unsubscribe();
        });

        Object.assign(this.state, {
          subscriptions: [],
        });

      }

      resolve();

    });

  }


  async reloadData() {

    const {
      client,
      loadApiData,
    } = this.context;

    await loadApiData();

    await client.reFetchObservableQueries();

  }


  render() {

    const {
      children,
      user,
      client,
      loadApiData,
      ...other
    } = this.props;

    return children ? <children.type
      {...children.props}
      {...other}
    /> : null;

  }

}