import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import { Form, Avatar, Button, ImageFromFile, IconSpinner, FieldTextInput, LocationAutocompleteInputField, FieldSelect } from '../../components';
import css from './ProfileSettingsForm.module.css';
import svgProfile from '../../assets/svg-profilepicture.svg';
import svgBio from '../../assets/svg-bio.svg';
import svgFacebook from '../../assets/svg-facebook.svg';
import svgInstagram from '../../assets/svg-instagram.svg';
import svgLocation from '../../assets/svg-location.svg';
import svgWebsite from '../../assets/svg-website.svg';
import {
  autocompleteSearchRequired,
  autocompletePlaceSelected,
  composeValidators,
} from '../../util/validators';
import config from '../../config';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false };
    this.submittedValues = {};
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);
          const identity = v => v;
          // First name
          const firstNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // Last name
          const lastNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          // Bio
          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
          });
           // address
          const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });
          const addressPlaceholderMessage = intl.formatMessage({
            id: 'EditListingLocationForm.addressPlaceholder',
          });

            // Facebook Social Media
            const facebookLabel = intl.formatMessage({
              id: 'ProfileSettingsForm.facebookLabel',
            });
            const facebookPlaceholder = intl.formatMessage({
              id: 'ProfileSettingsForm.facebookPlaceholder',
            });

            // InstagramLabel Social Media
           const instagramLabel = intl.formatMessage({
                  id: 'ProfileSettingsForm.instagramLabel',
                });
           const instagramPlaceholder = intl.formatMessage({
                  id: 'ProfileSettingsForm.instagramPlaceholder',
                });

                const addressRequiredMessage = intl.formatMessage({
                  id: 'EditListingLocationForm.addressRequired',
                });
                const addressNotRecognizedMessage = intl.formatMessage({
                  id: 'EditListingLocationForm.addressNotRecognized',
                });

                const countryLabel = intl.formatMessage({
                  id: 'ProfileSettingsForm.countryLabel',
                });
                const stateLabel = intl.formatMessage({ id: 'ProfileSettingsForm.stateLabel' });


                     // Facebook Social Media
            const websiteLabel = intl.formatMessage({
              id: 'ProfileSettingsForm.websiteLabel',
            });
            const websitePlaceholder = intl.formatMessage({
              id: 'ProfileSettingsForm.websitePlaceholder',
            });
            const validURLmesssage = intl.formatMessage({
              id: 'ProfileSettingsForm.validURLmessage',
            });
            const mustbeURL = validators.validURL(validURLmesssage);

                const filterCountries = config.custom.listingCountry.filter(elm=>{return elm.key!=='all'});
                const filterStates = config.custom.listingStates.filter(elm=>{return elm.parentId === values['countryId']});

          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                rootClassName={css.uploadingImage}
                aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}
                {avatarComponent}
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
                </div>
                <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                </div>
              </div>
            );

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3>
                <div className={css.imageBox}>
                <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={css.label} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
                <div className={css.imageInfo}>
                  <div className={css.tip}>
                    <FormattedMessage id="ProfileSettingsForm.tip" />
                  </div>
                  <div className={css.fileInfo}>
                    <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                  </div>
                </div>
                </div>

              </div>
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourName" />
                  <img src={svgProfile} alt="profile" width="60"/>
                </h3>
                <div className={css.nameContainer}>
                  <FieldTextInput
                    className={css.firstName}
                    type="text"
                    id="firstName"
                    name="firstName"
                    label={firstNameLabel}
                    placeholder={firstNamePlaceholder}
                    validate={firstNameRequired}
                  />
                  <FieldTextInput
                    className={css.lastName}
                    type="text"
                    id="lastName"
                    name="lastName"
                    label={lastNameLabel}
                    placeholder={lastNamePlaceholder}
                    validate={lastNameRequired}
                  />
                </div>
              </div>

              <div className={classNames(css.sectionContainer)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.bioHeading" />
                  <img src={svgBio} alt="bio" width="47"/>
                </h3>
                <FieldTextInput
                  type="textarea"
                  id="bio"
                  name="bio"
                  label={bioLabel}
                  placeholder={bioPlaceholder}
                />
                <p className={css.bioInfo}>
                  <FormattedMessage id="ProfileSettingsForm.bioInfo" />
                </p>
              </div>
              {submitError}
              <div className={classNames(css.sectionContainer, css.lastSection)}>
              <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.address" />
                  </h3>
              <LocationAutocompleteInputField
                  className={css.locationAddress}
                  inputClassName={css.locationAutocompleteInput}
                  iconClassName={css.locationAutocompleteInputIcon}
                  predictionsClassName={css.predictionsRoot}
                  validClassName={css.validLocation}
                  autoFocus
                  name="location"
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

                    </div>
                              <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.socialLinks" />
                  <img src={svgInstagram} alt="instagram" width="40"/>
                  <img src={svgFacebook} alt="facebook" width="40"/>
                  <img src={svgWebsite} alt="website" width="40"/>
                </h3>
                <FieldTextInput
                  type="text"
                  id="facebook"
                  className={css.locationAddress}
                  name="facebook"
                  label={facebookLabel}
                  placeholder={facebookPlaceholder}
                  validate= {mustbeURL}
                />
                <FieldTextInput
                 type="text"
                 id="instagram"
                 className={css.locationAddress}
                 name="instagram"
                  label={instagramLabel}
                  placeholder={instagramPlaceholder}
                  validate= {mustbeURL}
                />

                <FieldTextInput
                  type="text"
                  id="website"
                  name="website"
                  className={css.locationAddress}
                  label={websiteLabel}
                  placeholder={websitePlaceholder}
                  validate= {mustbeURL}
                />
              </div>


              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
};

ProfileSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;
