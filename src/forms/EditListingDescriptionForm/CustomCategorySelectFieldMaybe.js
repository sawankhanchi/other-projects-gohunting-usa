import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, types , label, placeholder, required} = props;

  return types ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={label}
      validate={required}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {types.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomCategorySelectFieldMaybe;
