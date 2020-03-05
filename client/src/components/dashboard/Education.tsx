import React from 'react';
import { useDispatch } from 'react-redux';

import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';
import { EducationType } from '../../types/profileTypes';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const dispatch = useDispatch();

  const onDeleteClick = (id: string) => {
    dispatch(deleteEducation(id));
  };

  const educationComp = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.schoolId}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format='DD.MM.YYYY'>{edu.from}</Moment> -
        {edu.to === null ? (
          ' now'
        ) : (
          <Moment format=' DD.MM.YYYY'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => onDeleteClick(edu._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className='mb-4'>Education Credentials</h4>
      <table className='table' style={{ fontSize: '1.3rem' }}>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>{educationComp}</tbody>
      </table>
    </div>
  );
}
