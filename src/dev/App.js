import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'

import * as queryFragments from "../schema/generated/api.fragments";

import DevRenderer from "./Renderer";

window.link = "Sdfewfwefedsfdsfs"

export default class DevApp extends Component {

  static propTypes = {
    queryFragments: PropTypes.object.isRequired,
  }

  static defaultProps = {
    queryFragments,
    lang: "ru",
  }

  render() {

    const {
      ...other
    } = this.props;

    return <PrismaCmsApp
      Renderer={DevRenderer}
      apolloOptions={{
        // endpoint: "https://modxclub.ru/api/"
        endpoint: "http://localhost:4000"
      }}
      // pure={true}
      {...other}
    />
  }
}

