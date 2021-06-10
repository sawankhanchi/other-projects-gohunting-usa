import React, { Component } from 'react';
import { bool, func, node, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';

import { FilterForm } from '../../forms';
import css from './FilterPlain.module.css';
// import {SelectMultipleFilter} from '../../components';
import { propTypes } from '../../util/types';




class FilterPlainComponent extends Component {
  constructor(props) {
    super(props);
   
    this.state = { isOpen: true };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.initialValue = this.initialValue.bind(this);
    this.initialValues = this.initialValues.bind(this);
  }

  handleChange(values) {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  handleClear() {
    const { onSubmit, onClear } = this.props;

    if (onClear) {
      onClear();
    }

    onSubmit(null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }
  
  handleSelectSingle(urlParam, option) {
    const urlQueryParams = this.props.urlQueryParams;
    this.setState(prevState => {
      const prevQueryParams = prevState.currentQueryParams;
      const mergedQueryParams = { ...urlQueryParams, ...prevQueryParams };

      // query parameters after selecting the option
      // if no option is passed, clear the selection for the filter
      const currentQueryParams = option
        ? { ...mergedQueryParams, [urlParam]: option }
        : { ...mergedQueryParams, [urlParam]: null };

      return { currentQueryParams };
    });
    
  }

  handleSelectMultiple(urlParam, options) {
   const urlQueryParams = this.props.urlQueryParams;
    this.setState(prevState => {
      const prevQueryParams = prevState.currentQueryParams;
      const mergedQueryParams = { ...urlQueryParams, ...prevQueryParams };

      // query parameters after selecting options
      // if no option is passed, clear the selection from state.currentQueryParams
      const currentQueryParams =
        options && options.length > 0
          ? { ...mergedQueryParams, [urlParam]: options.join(',') }
          : { ...mergedQueryParams, [urlParam]: null };

      return { currentQueryParams };
    });
  }
  initialValue(paramName) {
    const currentQueryParams = this.state.currentQueryParams;
    const urlQueryParams = this.props.urlQueryParams;

    // initialValue for a select should come either from state.currentQueryParam or urlQueryParam
    const currentQueryParam = currentQueryParams[paramName];

    return typeof currentQueryParam !== 'undefined' ? currentQueryParam : urlQueryParams[paramName];
  }

  // resolve initial values for a multi value filter
  initialValues(paramName) {
    const currentQueryParams = this.state.currentQueryParams;
    const urlQueryParams = this.props.urlQueryParams;

    const splitQueryParam = queryParam => (queryParam ? queryParam.split(',') : []);

    // initialValue for a select should come either from state.currentQueryParam or urlQueryParam
    const hasCurrentQueryParam = typeof currentQueryParams[paramName] !== 'undefined';

    return hasCurrentQueryParam
      ? splitQueryParam(currentQueryParams[paramName])
      : splitQueryParam(urlQueryParams[paramName]);
  }
  render() {
    const {
      rootClassName,
      className,
      plainClassName,
      id,
      intl,
      urlQueryParams,
      label,
      isSelected,
      children,
      initialValues,
      keepDirtyOnReinitialize,
      contentPlacementOffset,
      
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const labelClass = isSelected ? css.filterLabelSelected : css.filterLabel;
  
  
    return (
     
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{label}</span>
          </button>

        <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'FilterPlain.clear'} />
          </button>
        </div>
        <div
          id={id}
          className={classNames(plainClassName, css.plain, { [css.isOpen]: this.state.isOpen })}
          ref={node => {
            this.filterContent = node;
          }}
        >
          <FilterForm
            id={`${id}.form`}
            liveEdit
            contentPlacementOffset={contentPlacementOffset}
            onChange={this.handleChange}
            initialValues={initialValues}
            keepDirtyOnReinitialize={keepDirtyOnReinitialize}
          >
   



            {children}
            </FilterForm>

        </div>
        
      </div>
      
    );
   
  }
}

FilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  filterParamNames: [],
  plainClassName: null,
  // initialValues: null,
  keepDirtyOnReinitialize: false,
  
  ageGroupsFilter: null,
};

FilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  plainClassName: string,
  
  urlQueryParams: object.isRequired,
  filterParamNames: string,
  id: string.isRequired,
  onSubmit: func.isRequired,
  label: node.isRequired,
  isSelected: bool.isRequired,
  children: node.isRequired,
  initialValues: object,
  keepDirtyOnReinitialize: bool,
  ageGroupsFilter: propTypes.filterConfig,
  // form injectIntl
  intl: intlShape.isRequired,
};

const FilterPlain = injectIntl(FilterPlainComponent);

export default FilterPlain;
