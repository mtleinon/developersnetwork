import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function InputGroup({ name, placeHolder, value, error, icon, type, onChange }) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

InputGroup.propType = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  disabled: PropTypes.string
};

InputGroup.defaultProps = {
  type: 'text'
};
export default InputGroup;
