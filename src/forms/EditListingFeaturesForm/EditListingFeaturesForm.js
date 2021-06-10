import React, {Fragment} from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import { compose } from 'redux';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form , CustomPackageForm } from '../../components';

import css from './EditListingFeaturesForm.module.css';

const EditListingFeaturesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        form,
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
        values,
        publicData,
        invalid,
        amentiesId,
        intl,

      } = formRenderProps;


      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
        </p>
      ) : null;



      const bigGameSectionLabel =
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.bigGameSectionLabel" />
        </p>;

      const smallGameSectionLabel =
      <p className={css.error}>
        <FormattedMessage id="EditListingFeaturesForm.smallGameSectionLabel" />
      </p>;

      const fishTypeLabel =
      <p className={css.error}>
        <FormattedMessage id="EditListingFeaturesForm.fishTypeLabel" />
      </p>;

      const otherTypesLabel =
      <p className={css.error}>
        <FormattedMessage id="EditListingFeaturesForm.otherTypesLabel" />
      </p>;



          // console.log(publicData.type==='regular'?"yes":"no")
      const options = findOptionsForSelectFilter('amenities', filterConfig);


const test = publicData.type === 'seasonal' ? 'Regular' : 'Seasonal'


const filteredOptions = options.filter( option => option.key != test )
console.log("amenities", filteredOptions)
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}


        <div className={css.boxcon}>
         {filteredOptions.map((option)=>{
           return(
             <Fragment>
               <div className={css.box}>
            <h3 className={css.boxTitle}>{option.label}</h3>
            <FieldCheckboxGroup className={css.features}
             id={`${amentiesId}.[${option.key}]`}
             name={`${amentiesId}.[${option.key}]`}
             options={option.amenitiesOption} />
             </div>
            </Fragment>
           )
         })}
         </div>
          {/* <CustomPackageForm intl={intl} form={form} values={values} invalid={invalid} formId={formId} id={"custompackage"}  name={"custompackage"}/> */}
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

EditListingFeaturesFormComponent.defaultProps = {
  amentiesId:"amentiesArray",
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingFeaturesFormComponent.propTypes = {
  amentiesId:string,
  rootClassName: string,
  className: string,
  name: string.isRequired,
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
  filterConfig: propTypes.filterConfig,
};

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

// export default EditListingFeaturesForm;

export default compose(injectIntl)(EditListingFeaturesForm);
