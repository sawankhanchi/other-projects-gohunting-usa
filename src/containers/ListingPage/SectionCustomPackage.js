



  import React , {Fragment} from 'react';
  import { bool, func, shape, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import { CustomPackageGroup, Form } from '../../components';
import arrayMutators from 'final-form-arrays';
import { Form as FinalForm } from 'react-final-form';
import css from './SectionCustomPackage.module.css';
import classNames from 'classnames';
const SectionCustomPackage = props => (

  <FinalForm
  {...props}
  mutators={{ ...arrayMutators }}
  render={formRenderProps => {
    const {
      rootClassName,
      className,
      onSelected,
       values,
    } = formRenderProps;




  const {
    customPackageSelected,
      publicData } = props;
  if (!publicData) {
    return null;
  }

  const options = publicData && publicData.custompackage ? publicData.custompackage : [];
  // const selectedOptions = publicData && publicData.amentiesArray ? publicData.amentiesArray[options.key] : [];
  const classes = classNames(rootClassName || css.root, className);
 
  return (
    <Form className={classes} >
    <div className={css.sectionFeatures}>
       <h2 className={css.featuresTitle}>
         <FormattedMessage id="ListingPage.customPackageName" />
      </h2>
            <CustomPackageGroup className={css.features}
             id={`${customPackageSelected}`}
             name={`${customPackageSelected}`}
             onSelected={onSelected}
             options={options} />
    </div>
    </Form>
      );
    }}
  />
);




SectionCustomPackage.defaultProps = {
  customPackageSelected:"selectedCustomPackage",
  rootClassName: null,
  className: null,

};

SectionCustomPackage.propTypes = {
  customPackageSelected:string,
  rootClassName: string,
  className: string,

};


export default SectionCustomPackage;
