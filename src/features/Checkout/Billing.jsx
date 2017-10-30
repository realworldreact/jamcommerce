import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import {
  clickOnCard,
  clickOnAddCard,
  clickOnCancelCard,
  showAddCardSelector,
} from './redux';
import ViewHeader from './Header.jsx';
import BillingForm from './Billing-Form.jsx';
import { cardMapSelector } from '../Card/redux';

const cx = classnames.bind(styles);
const propTypes = {
  cards: PropTypes.array,
  clickOnAddCard: PropTypes.func.isRequired,
  clickOnCancelCard: PropTypes.func.isRequired,
  clickOnCard: PropTypes.func.isRequired,
  isCardListEmpty: PropTypes.bool,
  showAddCard: PropTypes.bool,
};

const mapStateToProps = createSelector(
  cardMapSelector,
  showAddCardSelector,
  (cardMap, showAddCard) => ({
    cards: _.map(cardMap, card => card),
    isCardListEmpty: _.isEmpty(cardMap),
    showAddCard,
  }),
);

const mapDispatchToProps = { clickOnCard, clickOnAddCard, clickOnCancelCard };

export function Billing({
  cards,
  clickOnAddCard,
  clickOnCancelCard,
  clickOnCard,
  isCardListEmpty,
  showAddCard,
}) {
  let header;
  if (isCardListEmpty || showAddCard) {
    header = (
      <header>
        <h4>Add Your Card</h4>
      </header>
    );
  } else {
    header = <button onClick={ clickOnAddCard }>Add New Card</button>;
  }
  return (
    <div className={ cx('billing') }>
      <ViewHeader>
        { isCardListEmpty ? 'Your Credit Card' : 'Your Credit Cards' }
      </ViewHeader>
      <div className={ cx('list') }>
        { cards.map(card =>
          (
            <button
              className={ cx('list-button') }
              key={ card.id }
              onClick={ () => clickOnCard(card.id) }
              >
              <p>
                <bold>
                  { card.name }
                </bold>
              </p>
              <p>
              Card ending in: { card.last4 }
              </p>
            </button>
          ),
        ) }
      </div>
      <div className={ cx('billing-content') }>
        { header }
        { (showAddCard || isCardListEmpty) &&
          <Elements>
            <BillingForm />
          </Elements> }
        { showAddCard && <button onClick={ clickOnCancelCard }>Cancel</button> }
      </div>
    </div>
  );
}

Billing.displayName = 'Billing';
Billing.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
