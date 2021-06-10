import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';
import * as validators from '../../util/validators';

import css from './EditListingDescriptionForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        multipleSeats,
        types,
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
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

          // Last name
          const totalAcres = intl.formatMessage({
            id: 'EditListingDescriptionForm.totalAcres',
          });
          const totalAcrePlaceholder = intl.formatMessage({
            id: 'EditListingDescriptionForm.totalAcrePlaceholder',
          });
          const totalAcreRequired = intl.formatMessage({
            id: 'EditListingDescriptionForm.totalAcreRequired',
          });
          const totalAcreIsRequired = validators.required(totalAcreRequired);

           // Facebook Social Media
           const socialLink1 = intl.formatMessage({
            id: 'EditListingDescriptionForm.socialLink1',
          });

          const socialLink2 = intl.formatMessage({
                id: 'EditListingDescriptionForm.socialLink2',
              });

           const socialLink3 = intl.formatMessage({
            id: 'EditListingDescriptionForm.socialLink3',
          });
          const socialLinkPlaceholder = intl.formatMessage({
            id: 'EditListingDescriptionForm.socialLinkPlaceholder',
          });




              const categoryLabel = intl.formatMessage({
                id: 'EditListingDescriptionForm.categoryLabel',
              });
              const categoryPlaceholder = intl.formatMessage({
                id: 'EditListingDescriptionForm.categoryPlaceholder',
              });
              const multipleSlotsRequired = required(
                intl.formatMessage({
                  id: 'EditListingDescriptionForm.multipleSlotsRequired',
                })
              );



              const multipleSlotsLabel = intl.formatMessage({
                id: 'EditListingDescriptionForm.multipleSlots',
              });
              const multipleSlotsPlaceholder = intl.formatMessage({
                id: 'EditListingDescriptionForm.multipleSlotsPlaceholder',
              });
              const categoryRequired = required(
                intl.formatMessage({
                  id: 'EditListingDescriptionForm.multipleSlotsRequired',
                })
              );




      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;
      const validURLmesssage = intl.formatMessage({
        id: 'ProfileSettingsForm.validURLmessage',
      });
      const mustbeURL = validators.validURL(validURLmesssage);


      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />
        <div className={css.nameContainer}>
          <FieldTextInput
                    id="description"
                    name="description"
                    className={css.firstName}
                    type="textarea"
                    label={descriptionMessage}
                    placeholder={descriptionPlaceholderMessage}
                    validate={composeValidators(required(descriptionRequiredMessage))}
                  />

        </div>

        <div className={css.nameContainer}>
        <FieldTextInput

                    type="number"
                    id="area"
                    name="area"
                    label={totalAcres}
                    placeholder={totalAcrePlaceholder}
                    validate={totalAcreIsRequired}
                  />
          <CustomCategorySelectFieldMaybe
            id="type"
            name="type"
            types={types}

            label={categoryLabel}
            placeholder={categoryPlaceholder}
            required={categoryRequired}
          />
          <CustomCategorySelectFieldMaybe
            id="multipelSeats"
            name="multipelSeats"
            types={multipleSeats}

            label={multipleSlotsLabel}
            placeholder={multipleSlotsPlaceholder}
            required={multipleSlotsRequired}
          />
            </div>

            <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.socialLinks" />
                </h3>
                <FieldTextInput
                  type="text"
                  className={css.sociallinks}
                  id="socialLinks1"
                  name="socialLinks1"
                  label={socialLink1}
                  placeholder={socialLinkPlaceholder}
                  validate= {mustbeURL}
                />
                <FieldTextInput
                 type="text"
                 className={css.sociallinks}
                 id="socialLinks2"
                 name="socialLinks2"
                 label={socialLink2}
                 placeholder={socialLinkPlaceholder}
                 validate= {mustbeURL}
                />
                 <FieldTextInput
                 type="text"
                 className={css.sociallinks}
                 id="socialLinks3"
                 name="socialLinks3"
                 label={socialLink3}
                 placeholder={socialLinkPlaceholder}
                 validate= {mustbeURL}
                />
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

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  type: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
