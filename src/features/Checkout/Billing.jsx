import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import { clickOnCard } from './redux';
import ViewHeader from './Header.jsx';
import BillingForm from './Billing-Form.jsx';
import { cardMapSelector } from '../Card/redux';

const cx = classnames.bind(styles);
const propTypes = {
  cards: PropTypes.array,
  clickOnCard: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  cardMapSelector,
  cardMap => ({ cards: _.map(cardMap, card => card) }),
);

const mapDispatchToProps = { clickOnCard };

export function Billing({ clickOnCard, cards }) {
  return (
    <div className={ cx('billing') }>
      <ViewHeader>Your Credit Card</ViewHeader>
      <div className={ cx('list') }>
        {
          cards.map(card =>
            (
              <button
                className={ cx('list-button') }
                key={ card.id }
                onClick={ () => clickOnCard(card.id) }
                >
                <p><bold>{ card.name }</bold></p>
                <p>Card ending in: { card.last4 }</p>
              </button>
            )
          )
        }
      </div>
      <div className={ cx('billing-content') }>
        <header>
          <h4>Add Your Card</h4>
        </header>
        <Elements>
          <BillingForm />
        </Elements>
      </div>
    </div>
  );
}

Billing.displayName = 'Billing';
Billing.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);
