
 /**
 * Name : Fieldlisting
 * Description : Custom Field listing 
 */

import React , {Fragment} from 'react';
import { arrayOf, bool, node, number, shape, string } from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import classNames from 'classnames';
import css from './FieldTableListing.module.css';
import image from '../../assets/delete.png';
import { FieldTextInput } from '../../components';
import { required, composeValidators } from '../../util/validators';
import { FormattedMessage } from '../../util/reactIntl';

const FieldListingRenderer = props => {
    const { label1, label2,label3,label4, id, rootClassName,className , fields  } = props;
     

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

    const classes = classNames(rootClassName || css.root, className);
    return (
        <Fragment>
  <table className={classes}>
            <tr>
            {label1 && <th className={css.nameHeader}>{label1}</th>}
            {label2 && <th className={css.priceHeader} >{label2}</th>}
            {label3 && <th className={css.descriptionHeader}>{label3}</th>}
            {label4 && <th className={css.deleteHeader}>{label4}</th>}
            
            </tr>
            {fields.map((option, index) => {
                const fieldId = `${id}.${option.key}`;
                return (<tr key={fieldId}>
                    {/* <td>{option.name}</td> */}
                    <td><FieldTextInput
                      name={`${option}.name`}
                      id={`${option}.name`}
                    //   component="input"
                      className={css.columnItem}
                      type="text"     
                      validate={composeValidators(required(customPackageNameRequired))}
                        /></td>
                    <td>
                    <FieldTextInput
                       name={`${option}.price`}
                       id={`${option}.price`}
                    //    component="input"
                       className={css.priceColumn}
                       type="number"     
                        validate={composeValidators(required(customPackageNameRequired))}
                        />
                    </td>
                    <td><FieldTextInput
                      name={`${option}.description`}
                      id={`${option}.description`}
                    //   component="input"
                      className={css.columnItem}
                      type="text"     
                      validate={composeValidators(required(customPackageDescriptionRequired))}
                        /></td>
                    {/* <td>{option.price + " " + option.currency}</td> */}
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
{/* 
        <button
                type="button"
                onClick={() => fields.push({ name: 'fdsfsfsfsfs', price: 44444 })}
              >
                Add
       </button> */}
        </Fragment>
      
    );
};

FieldListingRenderer.defaultProps = {
    rootClassName: null,
    className: null,
    label1: null,
    label2: null,
    label3: null,
    label4: "Actions",
    options:[]
};

FieldListingRenderer.propTypes = {
    rootClassName: string,
    className: string,
    label1: node,
    label2: node,
    label3: node,
    label4: node,
    options: arrayOf(shape({
        name: string,
        price: number,  
      })),
};

const FieldTableListing = props => <FieldArray component={FieldListingRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldTableListing.propTypes = {
    name: string.isRequired,
};

export default FieldTableListing;
