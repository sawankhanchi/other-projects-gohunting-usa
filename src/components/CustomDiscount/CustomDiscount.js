import React, { useState, Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Button, Form, FieldCurrencyInput, FieldTextInput,FieldTableDiscount, FieldTableEditable} from '../../components';
import css from './CustomDiscount.module.css';
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

const CustomDiscount = props => {

   let {addMoreDiscounts,addMoreTitle,addDiscount, form, values, invalid , formId, id, intl , type} = props;
   const [showAddNew, setShowAddNew] = useState(false);

   let discountObject = values[id] ?  values[id] : [];

   const handleSubmitAdd = event => {


    // const value = event.target.value;
    let customOptionsFiltersObj =  values[id] ?  values[id] : [];
    customOptionsFiltersObj.push({
      discount: values[`${formId}-discount`],
      seats: values[`${formId}-seats`],
    })

    setShowAddNew(false)
     form.change(`${formId}-discount`, "");
     form.change(`${formId}-seats`, "");
     form.change(`${id}`,customOptionsFiltersObj );
     console.log("customPackagePaidOncustomPackagePaidOn",values, id)
  };




      return (
          <Fragment id={id}>
            <FieldTableDiscount
              name={"FieldTableDiscount"}
              formId={formId} intl={intl} label1={"Discounts"} label2={"Seats"}  label3={"Actions"}  className={css.features} id={id} name={id} options={discountObject}
              /> 
          {!showAddNew  ? <Button
                    className={css.addMore}
               
                    onClick={res => {
                      setShowAddNew(true)
                    }}  >
                          {discountObject.length > 0 ? addMoreTitle : addDiscount}
                 </Button> :  
                  <Fragment>
           <div className={css.nameContainer}>
               <p className={css.priceColor}>
                      <FormattedMessage id="EditListingPricingForm.discount" />
                    </p>
               <FieldTextInput
                className={css.numberInput}
                  type="number"
                  id={`${formId}-discount`}
                  name={`${formId}-discount`}
                  // placeholder={discountInPercentagePlaceholderMessage}
                /> 

            <p className={css.priceColor}>
                      <FormattedMessage id= { type? "EditListingPricingForm.onBookingMoreThan":  "EditListingPricingForm.percentDiscountOnBookingMoreThan"}/>
                    </p>

                    <FieldTextInput
                  className={css.numberInput}
                  type="number"
                  id={`${formId}-seats`}
                  name={`${formId}-seats`}
                />
            <p className={css.priceColor}>
                      <FormattedMessage id= {type? "EditListingPricingForm.seat" :  "EditListingPricingForm.days"} />
                    </p>
        
               </div>
               <Button
                    className={css.addMoreSiscountButton}
                    disabled={invalid}
                    onClick={res => {
                      handleSubmitAdd(res)
                    }}>
                      {addMoreDiscounts}
                 </Button>
               </Fragment>
               }
           
          </Fragment>);
    }

  CustomDiscount.defaultProps = {
  type  : false,
  addMoreDiscounts: "Add",
  addMoreTitle:"Add More Discounts",
  addDiscount:"Add Discount",
};

CustomDiscount.propTypes = {
   type: string.isRequired,
   className: string,
   saveActionMsg:string,
   formId: string.isRequired,
   addMoreDiscounts: string,
};

export default CustomDiscount;
