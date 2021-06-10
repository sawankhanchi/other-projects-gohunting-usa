import React ,{useCallback} from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { propTypes } from '../../util/types';
import {
  autocompleteSearchRequired,
  autocompletePlaceSelected,
  composeValidators,
} from '../../util/validators';
import { Form, LocationAutocompleteInputField, Button, FieldTextInput, ModalInMobile, SearchMap } from '../../components';
import { types as sdkTypes } from '../../util/sdkLoader';
import Map from '../../components/Map/Map';
import css from './EditListingLocationForm.module.css';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.

const { LatLng } = sdkTypes;

const identity = v => v;

export const EditListingLocationFormComponent = props => {


  const onMapMoveEnd =(viewportBoundsChanged, data, form) => {
      console.log("SearchPage",viewportBoundsChanged, data)
      form.change(`${'SearchPage.map'}`,data.viewportMapCenter );
  }
  const onMapMoveEndMethod = useCallback(debounce(onMapMoveEnd, SEARCH_WITH_MAP_DEBOUNCE), []);
  // this.onMapMoveEnd = debounce(this.onMapMoveEnd.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
  let {onManageDisableScrolling} = props;
  return(<FinalForm
    {...props}
    mutators={{
      setMin: (args, state, utils) => {
        utils.changeValue(state, 'maplocation', () => args)
      },
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
        values,
        form
      } = formRenderProps;

      const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });
      const addressPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressPlaceholder',
      });
      const addressRequiredMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressRequired',
      });
      const addressNotRecognizedMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressNotRecognized',
      });

      const optionalText = intl.formatMessage({
        id: 'EditListingLocationForm.optionalText',
      });

      const buildingMessage = intl.formatMessage(
        { id: 'EditListingLocationForm.building' },
        { optionalText: optionalText }
      );
      const buildingPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.buildingPlaceholder',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLocationForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLocationForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      // Set the prop for Map center default lat and lon
      props = { ...props, ...{
        center: new LatLng(30.71822201280078, 76.76094172111493),
        obfuscatedCenter: new LatLng(30.71822201280078, 76.76094172111493),
        address: 'Sharetribe',
        zoom: 15,
        addressOnMarker: (address) => {
          if (address && Object.keys(address).length && address.predictions) {
            if (address && Object.keys(address).length && address.predictions && address.search && values) {

              values.location = {
                search: address.predictions[0].place_name,
                selectedPlace: {
                  address: address.predictions[0].place_name,
                  origin: {
                    lat: address.search[1],
                    lng: address.search[0]
                  }
                }
              };
              form.mutators.setMin(values.location)
            }
          }
        }
      }
      };
      if (values.location && values.location.selectedPlace && values.location.selectedPlace.origin && values.location.selectedPlace.origin.lat && values.location.selectedPlace.origin.lng) {
      props['center'] = new LatLng(values.location.selectedPlace.origin.lat, values.location.selectedPlace.origin.lng);
      props['obfuscatedCenter'] = new LatLng(values.location.selectedPlace.origin.lat, values.location.selectedPlace.origin.lng);
      }
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <LocationAutocompleteInputField
            className={css.locationAddress}
            inputClassName={css.locationAutocompleteInput}
            iconClassName={css.locationAutocompleteInputIcon}
            predictionsClassName={css.predictionsRoot}
            validClassName={css.validLocation}
            autoFocus
            name="location"
            id="maplocation"
            label={titleRequiredMessage}
            placeholder={addressPlaceholderMessage}
            useDefaultPredictions={false}
            format={identity}
            valueFromForm={values.location}
            validate={composeValidators(
              autocompleteSearchRequired(addressRequiredMessage),
              autocompletePlaceSelected(addressNotRecognizedMessage)
            )}
          />

          <FieldTextInput
            className={css.building}
            type="text"
            name="building"
            id="building"
            label={buildingMessage}
            placeholder={buildingPlaceholderMessage}
          />

        <div style={{ height: 400 }}>
            <Map {...props} />
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
  />)
  };

EditListingLocationFormComponent.defaultProps = {
  selectedPlace: null,
  fetchErrors: null,
};

EditListingLocationFormComponent.propTypes = {
  onManageDisableScrolling: func.isRequired,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};


const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});


const EditListingLocationFormComponentFinal =
  connect(
    null,
    mapDispatchToProps
  )(EditListingLocationFormComponent);


export default compose(injectIntl)(EditListingLocationFormComponentFinal);
