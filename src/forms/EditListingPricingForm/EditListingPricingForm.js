import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldTextInput, CustomDiscount, CustomPackageForm } from '../../components';
import css from './EditListingPricingForm.module.css';
import arrayMutators from 'final-form-arrays'

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      // potentially other mutators could be merged here
      ...arrayMutators
    }}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        addMoreDiscounts,
        values,
        formId,
        form,
        type,
        id,
        priceId
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });


      const discountInPercentagePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.discountInPercentage',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes} >
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
               <div className={css.priceBox}>
               <span className={css.priceColor}>
                      <FormattedMessage id="EditListingPricingForm.price" />
                    </span>
                  <FieldCurrencyInput
                    id={priceId}
                    name={priceId}
                    className={css.priceInput}
                    autoFocus
                    // label={pricePerUnitMessage}
                    placeholder={pricePlaceholderMessage}
                    currencyConfig={config.currencyConfig}
                    validate={priceValidators}
                  />

                    <span className={css.priceColor}>
                      <FormattedMessage id={
                       type ? "EditListingPricingForm.pricePerNight" : "EditListingPricingForm.pricePerDayperSeat" } />
                    </span>
               </div>
                <CustomDiscount  
                    type={type} 
                    intl={intl} 
                    form={form} 
                    values={values}
                    invalid={invalid}
                    formId={formId}
                    id={id} 
                    name={id}
                    options={values[id] ?  values[id] : []}/>

                <CustomPackageForm 
                    intl={intl}
                    form={form} 
                    values={values}
                    invalid={invalid} 
                    formId={formId}
                    id={"custompackage"} 
                    name={"custompackage"}/>

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = { 
  id: "seasonalDiscounts",
  priceId:"price",
  fetchErrors: null,
};

EditListingPricingFormComponent.propTypes = {
  priceId: string,
  id: string.isRequired,
  type: string.isRequired,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const EditListingPricingForm = EditListingPricingFormComponent

export default compose(injectIntl)(EditListingPricingForm);
