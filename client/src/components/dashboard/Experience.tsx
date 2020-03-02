import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { ExperienceType } from '../../types/profileTypes';

interface ExperienceProps {
  experience: ExperienceType[];
}

// export default function Experience({ experiences }: ExperienceType[]) {
export default function Experience({ experience }: ExperienceProps) {
  const dispatch = useDispatch();

  const onDeleteClick = (id: string) => {
    dispatch(deleteExperience(id));
  };

  const experienceComp = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='DD.MM.YYYY'>{exp.from}</Moment> -
        {exp.to === null ? (
          ' now'
        ) : (
          <Moment format=' DD.MM.YYYY'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => onDeleteClick(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className='mb-4'>Experience Credentials</h4>
      <table className='table' style={{ fontSize: '1.3rem' }}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>{experienceComp}</tbody>
      </table>
    </div>
  );
}

// export default Experience;
// Experience.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {
//   deleteExperience
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Experience);
