import React from 'react';
import classnames from 'classnames';
// import PropTypes from 'prop-types';

type InputGroupProps = {
  name: string;
  placeholder?: string;
  value: string;
  label?: string;
  error?: string;
  icon: string;
  info?: string;
  type?: 'text' | 'password' | 'email' | 'date';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

function InputGroup({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}: InputGroupProps) {
  return (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <span className='input-group-text'>
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
}
export default InputGroup;
// InputGroup.propType = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   icon: PropTypes.string,
//   type: PropTypes.string.isRequired,
//   error: PropTypes.string,
//   onChange: PropTypes.string.isRequired,
//   disabled: PropTypes.string
// };

// InputGroup.defaultProps = {
//   type: 'text'
// };
// export default InputGroup;
