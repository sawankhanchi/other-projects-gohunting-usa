/*
 * Renders a group of checkboxes that can be used to select
 * multiple values from a set of options.
 *
 * The corresponding component when rendering the selected
 * values is PropertyGroup.
 *
 */

import React from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FieldArray } from 'react-final-form-arrays';
import { FieldDescriptionCheckBox, ValidationError } from '..';

import css from './CustomPackageGroup.module.css';

const CustomPackageGroupRenderer = props => {
  const { className, rootClassName, label1,label2,label3,label4 , twoColumns, id, fields, options, meta, selectedPackageId, onSelected } = props;

  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(css.list, css.twoColumns) : css.list;

  return (
    <fieldset className={classes}>
        {options.map((option, index) => {
 const fieldId = `${id}.${option.key}`;
          return (<FieldDescriptionCheckBox
                id={fieldId}
                name={fields.name}
                label={option.name}
                value={option.key}
                currency={option.currency}
                description={option.description}
                price={option.price}
                onSelected={onSelected}
              />
          );
        })}

      <ValidationError fieldMeta={{ ...meta }} />
      </fieldset>
  );
};

CustomPackageGroupRenderer.defaultProps = {
  id:"selectedCustomPackage",
  rootClassName: null,
  className: null,
  label1: "Select",
  label2: "Name",
  label3: "Price",
  label4:  "Description",
  twoColumns: false,
};

CustomPackageGroupRenderer.propTypes = {
  id:string,
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label1: node,
  label2: node,
  label3: node,
  label4: node,
  options: arrayOf(
    shape({
      name: string.isRequired,
      price: node.isRequired,
      description: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
};

 const CustomPackageGroup = props => <FieldArray component={CustomPackageGroupRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
CustomPackageGroup.propTypes = {
  name: string.isRequired,
};

export default CustomPackageGroup;
