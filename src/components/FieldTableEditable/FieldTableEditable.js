
 /**
 * Name : Fieldlisting
 * Description : Custom Field listing 
 */

import React from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import moment from 'moment';
import classNames from 'classnames';
import css from './FieldTableEditable.module.css';
import image from '../../assets/delete.png';
import CustomCategorySelectFieldMaybe from '../../forms/EditListingDescriptionForm/CustomCategorySelectFieldMaybe';
import { maxLength, required, composeValidators, bookingDateRequired } from '../../util/validators';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';
import { FieldTextInput , FieldCurrencyInput, FieldDateInput} from '../../components';
import { FormattedMessage } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as validators from '../../util/validators';
const { Money } = sdkTypes;
const identity = v => v;

let dateInputProps = {
  // name: 'bookingDate',  
  useMobileMargins: false,
  // id: `EmptyDateInputForm.bookingDate`,
  // label: 'Date',
  placeholderText: moment().format('ddd, MMMM D'),
  format: identity,
  validate: composeValidators(required('Required')),
  onBlur: () => console.log('onBlur called from DateInput props.'),
  onFocus: () => console.log('onFocus called from DateInput props.'),
};

const FieldTableEditableRenderer = props => {
    const { label1, label2,label3,label4,label5,label6, id, options, rootClassName,className, intl, formId , fields } = props;

    const typeOptions = findOptionsForSelectFilter('multipleSeats', config.custom.filters);
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



    const classes = classNames(rootClassName || css.root, className);

    return (
        <table className={classes}>
            <tr>
            {label1 && <th>{label1}</th>}
            {label2 && <th>{label2}</th>}
            {label3 && <th>{label3}</th>}
            {label4 && <th>{label4}</th>}
            {label5 && <th>{label5}</th>}
            {label6 && <th>{label6}</th>}
            
            </tr>
            {fields.map((option, index) => {
                const fieldId = `${id}.${option.key}`;
                return (<tr key={fieldId}>
                    {/* <td>{option.name}</td> */}

                    <td><FieldTextInput
                        // id={`${id}[${index}]name`}
                        // name={`${id}[${index}]name`}
                        name={`${option}.name`}
                        id={`${option}.name`}
                        className={css.firstName}
                        type="text"     
                        validate={composeValidators(required(customPackageNameRequired))}
                        /></td>
                        <td><CustomCategorySelectFieldMaybe
                            // id="type"
                            // name="type"
                            // id={`${id}[${index}]type`}
                            // name={`${id}[${index}]type`}
                            name={`${option}.hasPaid`}
                            id={`${option}.hasPaid`}
                            types={typeOptions}
                            // label={categoryLabel}
                            // placeholder={categoryPlaceholder}
                            // required={categoryRequired}
                        /></td>
                    {/* <td><FieldCurrencyInput
                        // id={`${id}[${index}]currentPayment`}
                        // name={`${id}[${index}]currentPayment`}     
                        name={`${option}.currentPayment`}
                        id={`${option}.currentPayment`}  
                        className={css.firstName}              
                        currencyConfig={config.currencyConfig}
                        validate={priceValidators}
                        /></td> */}
                    <td><FieldTextInput
                    // id={`${id}[${index}]stillOwns`}
                    // name={`${id}[${index}]stillOwns`}
                    name={`${option}.currentPayment`}
                    id={`${option}.currentPayment`}  
                    className={css.firstName}
                    type="text"
                    validate={composeValidators(required(customPackageNameRequired))}
                    /></td>   
                    <td><FieldTextInput
                    // id={`${id}[${index}]stillOwns`}
                    // name={`${id}[${index}]stillOwns`}
                    name={`${option}.stillOwns`}
                    id={`${option}.stillOwns`}
                    className={css.firstName}
                    type="text"
                    validate={composeValidators(required(customPackageNameRequired))}
                    /></td>
                      <td><FieldDateInput 
                      initialDate={option.paidOn}
                        // id={`${id}[${index}]paidOn`}
                        // name={`${id}[${index}]paidOn`}
                        name={`${option}.paidOn`}
                        id={`${option}.paidOn`}
                            {...dateInputProps} />     
                        </td> 
                    <td className={css.imageCenter} >
                        <button type="button" onClick={()=>{
                        fields.remove(index)    
                            }}>
                            <img className={css.deleteImage} src={image} alt="delete button." />
                        </button>
                    </td>
                </tr>)
            })}
        </table>
    );
};

FieldTableEditableRenderer.defaultProps = {
    rootClassName: null,
    className: null,
    label1: null,
    label2: null,
    label3: null,
    label4: null,
    label5: null,
    label6: "Actions",
    options:[]
};

FieldTableEditableRenderer.propTypes = {
    rootClassName: string,
    className: string,
    label1: node,
    label2: node,
    label3: node,
    label4: node,
    label5: node,
    label6: node,
    options: arrayOf(shape({
        name: string,
        price: string,
      })),
};

const FieldTableEditable = props => <FieldArray component={FieldTableEditableRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldTableEditable.propTypes = {
    name: string.isRequired,
};

export default FieldTableEditable;
