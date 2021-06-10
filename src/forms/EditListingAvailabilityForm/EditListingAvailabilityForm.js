import React, { Component, Fragment } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldTextInput, FieldDateRangeController } from '../../components';

import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import css from './EditListingAvailabilityForm.module.css';

export class EditListingAvailabilityFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
            formId,
            values,
            form
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;


          const minimumNumberOfDays = intl.formatMessage({
            id: 'EditListingAvailabilityForm.minimumNumberOfDays',
          });
          const minimumNumberOfDaysPlaceholder = intl.formatMessage({
            id: 'EditListingAvailabilityForm.minimumNumberOfDaysPlaceholder',
          });

          const maximumNumberOfDays = intl.formatMessage({
            id: 'EditListingAvailabilityForm.maximumNumberOfDays',
          });
          const maximumNumberOfDaysPlaceholder = intl.formatMessage({
            id: 'EditListingAvailabilityForm.maximumNumberOfDaysPlaceholder',
          });


          const maximumNumberOfSeatsPerDay = intl.formatMessage({
            id: 'EditListingAvailabilityForm.maximumNumberOfSeatsPerDay',
          });
          const maximumNumberOfSeatsPerSeason = intl.formatMessage({
            id: 'EditListingAvailabilityForm.maximumNumberOfSeatsPerSeason',
          });
          const maximumNumberOfSeatsPerDayPlaceholder = intl.formatMessage({
            id: 'EditListingAvailabilityForm.maximumNumberOfSeatsPerDayPlaceholder',
          });
          const maximumNumberOfSeatsPerSeasonPlaceholder = intl.formatMessage({
            id: 'EditListingAvailabilityForm.maximumNumberOfSeatsPerSeasonPlaceholder',
          });


    

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.calendarWrapper}>
              {this.props.type ?<div>

                <FieldDateRangeController
                    initializeStartDate={values["availablityStartDate"]}
                    initializeEndDate={values["availablityEndDate"]}
                    name="dates"
                    numberOfMonths={4}
                    onChange={((dates) => {
                      form.change(`availablityStartDate`, dates.startDate.getTime());
                      form.change(`availablityEndDate`, dates.endDate.getTime());
                    })}
                  // controllerRef={node => {
                  //    this.popupControllerRef = node;
                  // }}
        />


                  <FieldTextInput
                  className={css.numberInput}
                  type="number"
                  id="maximumNumberOfSeatsPerDay"
                  name="maximumNumberOfSeatsPerDay"
                  label={maximumNumberOfSeatsPerSeason}
                  placeholder={maximumNumberOfSeatsPerSeasonPlaceholder}
                />
            </div> :
             <Fragment>
              <ManageAvailabilityCalendar
                  availability={availability}
                  availabilityPlan={availabilityPlan}
                  listingId={listingId}
                />
                <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.socialLinks" />
                </h3>
                <div className={css.nameContainer}>
                <FieldTextInput
                className={css.numberInput}
                  type="number"
                  id="minimumNumberOfDays"
                  name="minimumNumberOfDays"
                  label={minimumNumberOfDays}
                  placeholder={minimumNumberOfDaysPlaceholder}
                />
                 <FieldTextInput
                 className={css.numberInput}
                  type="number"
                  id="maximumNumberOfDays"
                  name="maximumNumberOfDays"
                  label={maximumNumberOfDays}
                  placeholder={maximumNumberOfDaysPlaceholder}
                />

                 <FieldTextInput
                  className={css.numberInput}
                  type="number"
                  id="maximumNumberOfSeatsPerDay"
                  name="maximumNumberOfSeatsPerDay"
                  label={maximumNumberOfSeatsPerDay}
                  placeholder={maximumNumberOfSeatsPerDayPlaceholder}
                />
                 </div>
                  </div>

                  </Fragment>
                }
              </div>

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
  }
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  type: string.isRequired,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
