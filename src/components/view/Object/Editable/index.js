import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "apollo-cms/lib/DataView/Object/Editable";

class EditableObject extends EditableView {

  getTextField(props) {

    const inEditMode = this.isInEditMode();

    const {
      disabled,
    } = props;

    if (disabled === undefined && !inEditMode) {
      Object.assign(props, {
        disabled: true,
      });
    }

    return super.getTextField(props);
  }

}

export default EditableObject;