import React, { Component } from 'react';
import { navigateTo } from 'gatsby-link';

export default class Account extends Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      navigateTo('/account/orders');
    }
  }
  render() {
    return null;
  }
}
