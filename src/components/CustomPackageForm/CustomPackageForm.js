import React, { useState, Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';

import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Button, FieldTableListing, Form , FieldTextInput, FieldCurrencyInput} from '../../components';
import css from './CustomPackageForm.module.css';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;
/**
 * Name : CustomPackageForm
 * Description : Custom Price package
 */

const CustomPackageForm = props => {

      let {saveActionMsg,addMoreTitle, form, values, invalid , formId, id, intl} = props;

      const [showAddNew, setShowAddNew] = useState(false);

      const otherTypesLabel =
      <p className={css.error}>
        <FormattedMessage id="EditListingFeaturesForm.customPackage" />
      </p>;



      const customPackageName = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackageNames"
        />
      );
      const customPackageDescription = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackageDescription"
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
      const customPackageDescriptionRequired = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackageDescriptionRequired"
        />
      );


      const customPackagePrice = (
        <FormattedMessage
          id="EditListingDescriptionForm.customPackagePrice"
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

     /**
      * Adding Name and price to FeildListing table
      */


       const handleSubmitAdd = event => {
        // const value = event.target.value;
        let customOptionsFiltersObj =  values[id] ?  values[id] : [];
        values[`${formId}-customPackageName`] && customOptionsFiltersObj.push({
            name: values[`${formId}-customPackageName`],
            price: values[`${formId}-customPackagePrice`].amount/100 ,
            currency:  values[`${formId}-customPackagePrice`].currency,
            description: values[`${formId}-customPackageDescription`],
            key:values[`${formId}-customPackageName`],
        })

        setShowAddNew(false)
         form.change(`${formId}-customPackageName`, "");
         form.change(`${formId}-customPackagePrice`, "");
         form.change(`${formId}-customPackageDescription`, "");
         form.change(`${id}`,customOptionsFiltersObj );
      };

      return (
          <Fragment key={id}>
            <div className={css.titlecon}>
            <h3 className={css.title}>{otherTypesLabel}</h3>
            <Button
                    className={css.lastName}
                    disabled={invalid}
                    onClick={res => {
                      handleSubmitAdd(res)
                    }}>
                      {saveActionMsg}
                 </Button>
                 </div>
                <FieldTableListing label1={"Name"} label2={"Price"} label3={"Description"} className={css.features} id={id} name={id} options={values[id] ?  values[id] : []} />

                {!showAddNew  ? <Button
                    className={css.addMore}

                    onClick={res => {
                      setShowAddNew(true)
                    }}  >
                          {addMoreTitle}
                 </Button> :

                <div >
                    <div className={css.nameContainer}>
              <FieldTextInput

                    id={`${formId}-customPackageName`}
                    name={`${formId}-customPackageName`}

                    className={css.firstNameandPrice}
                    // onFocus={() => this.handleSelectFocus()}
                    // onBlur={() => this.handleSelectBlur()}
                    // onChange={event => handleOnChange(event)}
                    type="text"
                    label={customPackageName}
                    // placeholder={customPackageNamePlaceholderMessage}
                    validate={composeValidators(required(customPackageNameRequired))}
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
                            id={`${formId}-customPackagePrice`}
                            name={`${formId}-customPackagePrice`}
                            className={css.firstNameandPrice}

                            label={customPackagePrice}
                            // placeholder={pricePlaceholderMessage}
                            currencyConfig={config.currencyConfig}
                            validate={priceValidators}
                          /> </div>
              <div className={css.nameContainer}>
                  <FieldTextInput

                            id={`${formId}-customPackageDescription`}
                            name={`${formId}-customPackageDescription`}

                            className={css.description}
                            // onFocus={() => this.handleSelectFocus()}
                            // onBlur={() => this.handleSelectBlur()}
                            // onChange={event => handleOnChange(event)}
                            type="textarea"
                            label={customPackageDescription}
                            // placeholder={customPackageNamePlaceholderMessage}
                            validate={composeValidators(required(customPackageDescriptionRequired))}
                          />     </div>


              </div>}
          </Fragment>
      );
    }

CustomPackageForm.defaultProps = {
  saveActionMsg:"Add",
  addMoreTitle:"Add More",
};

CustomPackageForm.propTypes = {
  className: string,
   saveActionMsg:string,
   formId: string.isRequired,
};

export default CustomPackageForm;
