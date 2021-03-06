import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

interface TextAreaFieldGroupPros {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  info?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}: TextAreaFieldGroupPros) {
  return (
    <div className='form-group'>
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className='form-text text-mutet'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propType = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  disabled: PropTypes.string
};

export default TextAreaFieldGroup;
