import React, { Component } from 'react';
import { arrayOf, func, node, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { formatCurrencyMajorUnit } from '../../util/currency';
import config from '../../config';

import { AreaFilterForm } from '../../forms';

import css from './AreaFilterPlain.module.css';

const RADIX = 10;

const getPriceQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames)
    ? queryParamNames[0]
    : typeof queryParamNames === 'string'
    ? queryParamNames
    : 'area';
};

// Parse value, which should look like "0,1000"
const parse = areaRange => {
  const [minArea, maxArea] = !!areaRange
    ? areaRange.split(',').map(v => Number.parseInt(v, RADIX))
    : [];
  // Note: we compare to null, because 0 as minPrice is falsy in comparisons.
  return !!areaRange && minArea != null && maxArea != null ? { minArea, maxArea } : null;
};

// Format value, which should look like { minPrice, maxPrice }
const format = (range, queryParamName) => {
  const { minArea, maxArea } = range || {};
  // Note: we compare to null, because 0 as minPrice is falsy in comparisons.
  const value = minArea != null && maxArea != null ? `${minArea},${maxArea}` : null;
  return { [queryParamName]: value };
};

class AreaFilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleChange(values) {
    const { onSubmit, queryParamNames } = this.props;
    const priceQueryParamName = getPriceQueryParamName(queryParamNames);
    onSubmit(format(values, priceQueryParamName));
  }

  handleClear() {
    const { onSubmit, queryParamNames } = this.props;
    const priceQueryParamName = getPriceQueryParamName(queryParamNames);
    onSubmit(format(null, priceQueryParamName));
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      label,
      queryParamNames,
      initialValues,
      min,
      max,
      step,
      intl,
      currencyConfig,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const areaQueryParam = getAreaQueryParamName(queryParamNames);
    const initialArea = initialValues ? parse(initialValues[areaQueryParam]) : {};
    const { minArea, maxArea } = initialPrice || {};

    const hasValue = value => value != null;
    const hasInitialValues = initialValues && hasValue(minArea) && hasValue(maxArea);

    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;
    const labelText = hasInitialValues
    ? intl.formatMessage(
      { id: 'AreaFilter.labelSelectedPlain' },
      {
        minArea: formatCurrencyMajorUnit(intl, currencyConfig.currency, minArea),
        maxArea: formatCurrencyMajorUnit(intl, currencyConfig.currency, maxArea),
      }
    )
  : label
  ? label
  : intl.formatMessage({ id: 'AreaFilter.label' });

  return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'AreaFilter.clear'} />
          </button>
        </div>
        <div className={css.formWrapper}>
          <AreaFilterForm
            id={id}
            initialValues={hasInitialValues ? initialArea : { minArea: min, maxArea: max }}
            onChange={this.handleChange}
            intl={intl}
            contentRef={node => {
              this.filterContent = node;
            }}
            min={min}
            max={max}
            step={step}
            liveEdit
            isOpen={this.state.isOpen}
          />
        </div>
      </div>
    );
  }
}

AreaFilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  step: number,
  currencyConfig: config.currencyConfig,
};

AreaFilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  queryParamNames: arrayOf(string).isRequired,
  onSubmit: func.isRequired,
  initialValues: shape({
    area: string,
  }),
  min: number.isRequired,
  max: number.isRequired,
  step: number,
  currencyConfig: propTypes.currencyConfig,

  // form injectIntl
  intl: intlShape.isRequired,
};

const AreaFilterPlain = injectIntl(AreaFilterPlainComponent);

export default AreaFilterPlain;
