import React, { useState, Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Button, FieldTableListing, Form , FieldTextInput, FieldCurrencyInput, FieldTableEditable, FieldDateInput} from '../../components';
import css from './CustomNonSiteUsersTable.module.css';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import CustomCategorySelectFieldMaybe from '../../forms/EditListingDescriptionForm/CustomCategorySelectFieldMaybe';
const identity = v => v;
const { Money } = sdkTypes;
/**
 * Name : CustomNonSiteUsersTable
 * Description : Custom Price package
 */

const CustomNonSiteUsersTable = props => {

      let {saveActionMsg,addMoreTitle, form, values, invalid , formId, id, intl} = props;

      const [showAddNew, setShowAddNew] = useState(false);

      const typeOptions = findOptionsForSelectFilter('multipleSeats', config.custom.filters);

      const otherTypesLabel =
      <p className={css.error}>
        <FormattedMessage id="EditListingnonsiteUsersForm.nonsiteUsers" />
      </p>;



      const customPackageName = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackageName"
        />
      );

      const customPackageNamePlaceholderMessage = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackageNamePlaceholderMessage"
        />
      );

      const customPackageNameRequired = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackageNameRequired"
        />
      );


      const customPackagePrice = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackagePrice"
        />
      );

      const stillOwnes = (
        <FormattedMessage
          id="EditListingDescriptionForm.stillOwnes"
        />
      );
      const currentPayment = (
        <FormattedMessage
          id="EditListingDescriptionForm.currentPayment"
        />
      );


      const customPackagePricePlaceholderMessage = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackagePricePlaceholderMessage"
        />
      );

      const customPackagePriceRequired = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackagePriceRequired"
        />
      );

      const categoryLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.hasPaid',
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



     let dateInputProps = {
        // name: 'bookingDate',
        useMobileMargins: false,
        // id: `EmptyDateInputForm.bookingDate`,
        label: 'Paid On',
        placeholderText: moment().format('ddd, MMMM D'),
        format: identity,
        validate: composeValidators(required('Required')),
        onBlur: () => console.log('onBlur called from DateInput props.'),
        onFocus: () => console.log('onFocus called from DateInput props.'),
      };
     /**
      * Adding Name and price to FeildListing table
      */


       const handleSubmitAdd = event => {

        console.log("customPackagePaidOncustomPackagePaidOn",values)
        // const value = event.target.value;
        let customOptionsFiltersObj =  values[id] ?  values[id] : [];
        customOptionsFiltersObj.push({
            name: values[`${formId}-nonSiteUsersName`],
            hasPaid: values[`${formId}-nonSiteUsersHasPaid`],
            currentPayment: values[`${formId}-customPackageCurrentPayment`].amount/100 ,
            currentPaymentCurrency:  values[`${formId}-customPackageCurrentPayment`].currency,
            stillOwns: values[`${formId}-customPackageStillOwns`].amount/100 ,
            stillOwnsCurrency:  values[`${formId}-customPackageStillOwns`].currency,
            paidOn:  values[`${formId}-customPackagePaidOn`],
        })

        setShowAddNew(false)
         form.change(`${formId}-nonSiteUsersName`, "");
         form.change(`${formId}-customPackageCurrentPayment`, "");
         form.change(`${formId}-customPackageStillOwns`, "");
         form.change(`${id}`,customOptionsFiltersObj );
         form.change(`${formId}-customPackagePaidOn`, "");
      };

      return (
          <Fragment id={id}>
            <h1 className={css.title}>{otherTypesLabel}</h1>
                <FieldTableEditable formId={formId} intl={intl} label1={"Name"} label2={"Has Paid"}  label3={"Current Payment"}  label4={"Still owes"} label5={"Paid On"}  className={css.features} id={id} name={id} options={values[id] ?  values[id] : []} />

                {!showAddNew  ? <Button
                    className={css.addMore}

                    onClick={res => {
                      setShowAddNew(true)
                    }}  >
                          {addMoreTitle}
                 </Button> :

                <div className={css.nameContainer}>
              <FieldTextInput

                    id={`${formId}-nonSiteUsersName`}
                    name={`${formId}-nonSiteUsersName`}

                    className={css.firstName}
                    // onFocus={() => this.handleSelectFocus()}
                    // onBlur={() => this.handleSelectBlur()}
                    // onChange={event => handleOnChange(event)}
                    type="text"
                    label={customPackageName}
                    // placeholder={customPackageNamePlaceholderMessage}
                    validate={composeValidators(required(customPackageNameRequired))}
                  />

                <CustomCategorySelectFieldMaybe
                            id={`${formId}-nonSiteUsersHasPaid`}
                            name={`${formId}-nonSiteUsersHasPaid`}
                            types={typeOptions}
                            className={css.firstName}
                            label={categoryLabel}
                            // placeholder={categoryPlaceholder}
                            // required={categoryRequired}
                        />
              {/* <FieldTextInput
                    className={css.lastName}
                    type="text"
                    id={`${formId}-customPackagePrice`}
                    name={`${formId}-customPackagePrice`}
                    label={customPackagePrice}
                    // placeholder={customPackagePricePlaceholderMessage}
                    validate={composeValidators(required(customPackagePriceRequired))}
                  /> */}

                <FieldCurrencyInput
                            id={`${formId}-customPackageCurrentPayment`}
                            name={`${formId}-customPackageCurrentPayment`}
                            className={css.lastName}
                            label={currentPayment}
                            currencyConfig={config.currencyConfig}
                            validate={priceValidators}
                          />

                <FieldCurrencyInput
                            id={`${formId}-customPackageStillOwns`}
                            name={`${formId}-customPackageStillOwns`}
                            className={css.lastName}
                            label={stillOwnes}
                            // placeholder={pricePlaceholderMessage}
                            currencyConfig={config.currencyConfig}
                            validate={priceValidators}
                          />
                <FieldDateInput
                            id={`${formId}-customPackagePaidOn`}
                            name={`${formId}-customPackagePaidOn`}
                            {...dateInputProps} />

                    <Button
                    className={css.lastName}
                    disabled={invalid}
                    onClick={res => {
                      handleSubmitAdd(res)
                    }}>
                      {saveActionMsg}
                 </Button>
              </div>}
          </Fragment>
      );
    }

    CustomNonSiteUsersTable.defaultProps = {
  saveActionMsg:"Add",
  addMoreTitle:"Add More",
};

CustomNonSiteUsersTable.propTypes = {
  className: string,
   saveActionMsg:string,
   formId: string.isRequired,
};

export default CustomNonSiteUsersTable;
