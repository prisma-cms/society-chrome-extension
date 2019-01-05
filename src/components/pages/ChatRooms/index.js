import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



import View from "./View/List";

import ListPage from "../List";


class ChatRoomsPage extends ListPage {


  static propTypes = {
    ...ListPage.propTypes,
    View: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...ListPage.defaultProps,
    View,
    first: 10,
  }


  componentWillMount() {

    const {
      query: {
        chatRoomsConnection,
      },
    } = this.context;

    this.Renderer = graphql(gql(chatRoomsConnection))(View);

    super.componentWillMount && super.componentWillMount();
  }


  setPageMeta(meta) {

    return super.setPageMeta({
      title: "Чат-комнаты",
      ...meta,
    });
  }



  render() {

    const {
      Renderer,
    } = this;

    const {
      View,
      where,
      ...other
    } = this.props;

    const filters = this.getFilters();


    return <Renderer
      where={{
        ...where,
        ...filters,
      }}
      {...this.getPaginationParams()}
      {...other}
    />
  }
}


export default ChatRoomsPage; 