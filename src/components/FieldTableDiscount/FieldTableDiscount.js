
 /**
 * Name : FieldTableDiscount
 * Description : Custom Field  FieldTableDiscount listing 
 */

import React , {Fragment} from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';

import classNames from 'classnames';
import css from './FieldTableDiscount.module.css';
import { FormattedMessage } from '../../util/reactIntl';
import image from '../../assets/delete.png';
import { FieldTextInput} from '../../components';



const FieldTableDiscountRenderer = props => {
     const { label1, label2,label3, id, options, rootClassName,className, intl, formId , fields } = props;

     const classes = classNames(rootClassName || css.root, className);

return(
    <table className={classes}>
             <tr>
            {label1 && <th>{label1}</th>}
            {label2 && <th>{label2}</th>}
            {label3 && <th>{label3}</th>}
            </tr>   
  { fields.map((option, index) => {
                const fieldId = `${id}.${option.key}`;
                return (<tr key={fieldId}>
                       <td><FieldTextInput
                className={css.numberInput}
                  type="number"
                  // id={`${id}[${index}]discount`}
                  // name={`${id}[${index}]discount`}
                  name={`${option}.discount`}
                  id={`${option}.discount`}
                  // placeholder={discountInPercentagePlaceholderMessage}
                /></td>
                    <td><FieldTextInput
                  className={css.numberInput}
                  type="number"
                  // id={`${id}[${index}]seats`}
                  // name={`${id}[${index}]seats`}
                  name={`${option}.seats`}
                  id={`${option}.seats`}
                /></td>
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
)
    

   
};

FieldTableDiscountRenderer.defaultProps = {
  rootClassName: null,
  className: null,
  label1: null,
  label2: null,
  label3: "Actions",
  options:[]
};

FieldTableDiscountRenderer.propTypes = {
  rootClassName: string,
  className: string,
  label1: node,
  label2: node,
  label3: node,
  options: arrayOf(shape({
    discount: string,
    seats: string,
    })),
};

const FieldTableDiscount = props => <FieldArray component={FieldTableDiscountRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldTableDiscount.propTypes = {
    name: string.isRequired,
};

export default FieldTableDiscount;
