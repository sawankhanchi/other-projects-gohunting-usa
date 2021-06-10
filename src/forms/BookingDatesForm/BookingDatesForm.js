import React, { Component, useEffect } from 'react';
import { string, bool, arrayOf, array, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';
import { required,requiredNumber, bookingDatesRequired, composeValidators,minmaxDateRange } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, IconSpinner, PrimaryButton, FieldDateRangeInput, FieldPhoneNumberInput } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.module.css';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null, errorShowMoreDays: false, errorShowLessDays : false , errorDays: 0,
      startDate: null, endDate: null, seats : 1
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.fetchDataWhenChangeInCustomPackage = this.fetchDataWhenChangeInCustomPackage.bind(this);
  }


  componentDidUpdate(prevProps){
    if (prevProps.customPackages.length !== this.props.customPackages.length) {
       this.fetchDataWhenChangeInCustomPackage();
    }
  }
  
  fetchDataWhenChangeInCustomPackage(){
    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;
   let {startDate , endDate, seats} = this.state;
    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {
       let stDate = moment(endDate), etDate = moment(startDate),
      days =  stDate.diff(etDate, 'days')+1;

      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate, seats , units:days,unitType:this.props.unitType,customPackages:this.props.customPackages},
        listingId,
        isOwnListing,
      });
    }
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
   if(this.props.type) {
   const startDate = e.availablityStartDate;
    const endDate = e.availablityEndDate;
    this.props.onSubmit({bookingDates:{startDate,endDate},seats:e.seats});
   } else {
    const { startDate, endDate } = e.bookingDates || {};

    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
   }

  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues) {
     const { startDate, endDate } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};
    const seats = formValues.values && formValues.values.seats ? formValues.values.seats : 1;
    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;
    let stDate = moment(endDate), etDate = moment(startDate),
      days =  stDate.diff(etDate, 'days')+1;

    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {

      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate, seats , units:days,unitType:this.props.unitType,customPackages:this.props.customPackages},
        listingId,
        isOwnListing,
      });
      this.setState({startDate, endDate, seats })
    }
  
  }
  handleseatChange(form, sDate, eDate) {
    const startDate = new Date(sDate);
    const endDate = new Date(eDate);

    const seats = form.getFieldState("seats") && form.getFieldState("seats").value ? parseInt(form.getFieldState("seats").value) : 1;
    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;
    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {

      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate, seats, units:1,unitType:this.props.unitType,customPackages:this.props.customPackages },
        listingId,
        isOwnListing,
      });
      this.setState({startDate, endDate, seats })
    }

    }

  render() {
    const { rootClassName, className, allowMultipleSeats, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);


    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
            type,
            form,
            nonSiteUsers,

          } = fieldRenderProps;

          let { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};
          if(type) {
            startDate = values.availablityStartDate;
            endDate = values.availablityEndDate;
          }
          const seats = values && values.seats && parseInt(values.seats)>0 ? parseInt(values.seats) : 1;

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingEndTitle',
          });
          const requiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.requiredDate',
          });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });

          const errorCustomShowMoreDays = intl.formatMessage({
            id: 'BookingDatesForm.customBookingErrorMoreDays',
          });

          const errorCustomShowessDays = intl.formatMessage({
            id: 'BookingDatesForm.customBookingErrorLessDays',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data.
          // Note: lineItems are calculated and fetched from FTW backend
          // so we need to pass only booking data that is needed otherwise
          // If you have added new fields to the form that will affect to pricing,
          // you need to add the values to handleOnChange function
          const bookingData =
            startDate && endDate
              ? {
                  unitType,
                  startDate,
                  endDate,
                  seats,
                  units:1,
                }
              : null;
          const showEstimatedBreakdown =
            bookingData && lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;

          const bookingInfoMaybe = showEstimatedBreakdown ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} lineItems={lineItems} />
            </div>
          ) : null;

          const loadingSpinnerMaybe = fetchLineItemsInProgress ? (
            <IconSpinner className={css.spinner} />
          ) : null;

          const bookingInfoErrorMaybe = fetchLineItemsError ? (
            <span className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.fetchLineItemsError" />
            </span>
          ) : null;
          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();

          const startDatePlaceholderText = startDatePlaceholder ||
            type? intl.formatDate(new Date(values.availablityStartDate), dateFormatOptions) : intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText = endDatePlaceholder ||
             type? intl.formatDate(new Date(values.availablityEndDate), dateFormatOptions) : intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          // console.log(values)

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}
              { <FormSpy
                subscription={{values:true}}
                onChange={values => {
                 type? this.handleseatChange(form, startDate, endDate):this.handleOnChange(values);
                }}
              />}

               {allowMultipleSeats &&  <div className={css.field}>
                <FieldPhoneNumberInput  className={css.person}
                  type="number"
                  name="seats"
                  id="seats"
                  label={"Looking to book seats (Number)"}
                  placeholder={1}
                  validate={requiredNumber('Enter number upto {} available seats',values.maximumNumberOfSeatsPerDay?parseInt(values.maximumNumberOfSeatsPerDay - nonSiteUsers):seats)}
                />

          </div>
        }
          <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={unitType}
                startDateId={`${formId}.bookingStartDate`}
                startDateLabel={bookingStartLabel}
                startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`${formId}.bookingEndDate`}
                endDateLabel={bookingEndLabel}
                endDatePlaceholderText={endDatePlaceholderText}
                focusedInput={this.state.focusedInput}
                onFocusedInputChange={this.onFocusedInputChange}
                format={identity}
                timeSlots={timeSlots}
                seats={values.seats}
                useMobileMargins
                validate={type?undefined:composeValidators(
                  required(requiredMessage),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage),
                  minmaxDateRange(errorCustomShowessDays,errorCustomShowMoreDays,values.minimumNumberOfDays,values.maximumNumberOfDays)
                )}
                disabled={type||fetchLineItemsInProgress}
              />

              {bookingInfoMaybe}
              {loadingSpinnerMaybe}
              {bookingInfoErrorMaybe}



              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit" >
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,
  allowMultipleSeats: bool,
  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
