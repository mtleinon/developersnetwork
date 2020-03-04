import React from 'react';
import classnames from 'classnames';

interface Options {
  label: string;
  value: string | number;
}

interface SelectListGroupProps {
  placeholder?: string;
  name: string;
  value: string;
  error?: string;
  info: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Options[];
}

export default function SelectListGroup({
  placeholder,
  name,
  value,
  error,
  info,
  onChange,
  options
}: SelectListGroupProps) {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className='form-group'>
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className='form-text text-mutet'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
}
