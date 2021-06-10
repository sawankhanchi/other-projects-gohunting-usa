/**
 * Renders non-reversal line items that are not listed in the
 * `LINE_ITEMS` array in util/types.js
 *
 * The line items are rendered so that the line item code is formatted to human
 * readable form and the line total is printed as price.
 *
 * If you require another kind of presentation for your line items, add them to
 * the `LINE_ITEMS` array in util/types.js and create a specific line item
 * component for them that can be used in the `BookingBreakdown` component.
 */
import React from 'react';
import { intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { humanizeLineItemCode } from '../../util/data';
import { LINE_ITEMS,LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemUnknownItemsMaybe = props => {
  const { transaction, isProvider, intl, unitType, seats, persons } = props;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const translationKey = isNightly
    ? 'BookingBreakdown.baseUnitNight'
    : isDaily
    ? 'BookingBreakdown.baseUnitDay'
    : 'BookingBreakdown.baseUnitQuantity';

    const translationKeyperson = 'BookingBreakdown.baseUnitPerson';

  // resolve unknown non-reversal line items
  const allItems = transaction.attributes.lineItems.filter(
    item => LINE_ITEMS.indexOf(item.code) === -1 && !item.reversal
  );

  const items = isProvider
    ? allItems.filter(item => item.includeFor.includes('provider'))
    : allItems.filter(item => item.includeFor.includes('customer'));

  return items.length > 0 ? (
    <React.Fragment>
      {items.map((item, i) => {
        const quantity = item.units;
        // console.log("hello", items)


        const label =
          quantity && quantity > 1
            ? `${humanizeLineItemCode(item.code)} * ${quantity} * ${seats} persons`
            :item.seats && item.seats > 1
            ? `${humanizeLineItemCode(item.code)} * ${item.seats} persons`: humanizeLineItemCode(item.code);
            // console.log(label);


        const formattedTotal = formatMoney(intl, item.lineTotal);
        return (
          <div key={`${i}-item.code`} className={css.lineItem}>
            <span className={css.itemLabel}>{label}</span>

            <span className={css.itemValue}>{formattedTotal}</span>

          </div>

        );
      })}
    </React.Fragment>
  ) : null;
};

LineItemUnknownItemsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnknownItemsMaybe;
