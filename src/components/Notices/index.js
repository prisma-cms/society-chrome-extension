import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import PrismaCmsComponent from "@prisma-cms/component";

import View from "./View";


class Notices extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    View: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    View,
    first: 10,
  }


  componentWillMount() {

    const {
      query: {
        noticesConnection,
        deleteManyNotices,
        deleteNotice,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    this.Renderer = compose(
      graphql(gql(noticesConnection)),
      graphql(gql(deleteManyNotices), {
        name: "deleteManyNotices",
      }),
      graphql(gql(deleteNotice), {
        name: "deleteNotice",
      }),
    )(View);

    super.componentWillMount && super.componentWillMount();
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
      {...other}
    />
  }
}


export default Notices; 