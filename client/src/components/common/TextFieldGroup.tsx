import React from 'react';
import classnames from 'classnames';

type TextFieldGroupProps = {
  name: string;
  placeHolder: string;
  value: string;
  label?: string;
  error?: string;
  info?: string;
  type?: 'text' | 'password' | 'email';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

function TextFieldGroup({
  name,
  placeHolder,
  value,
  label,
  error,
  info,
  type = 'text',
  onChange,
  disabled = false
}: TextFieldGroupProps) {
  return (
    <div className='form-group'>
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className='form-text text-mutet'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
}

export default TextFieldGroup;
