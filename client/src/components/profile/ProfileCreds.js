import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default class ProfileCreds extends Component {
  static propTypes = {
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired
  };

  render() {
    const { experience, education } = this.props;

    const experienceList = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD.MM.YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            ' now'
          ) : (
            <Moment format=" DD.MM.YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        {exp.location === '' ? null : (
          <p>
            <strong>Location:</strong> {exp.location}
          </p>
        )}
        {exp.description === '' ? null : (
          <p>
            <strong>Description:</strong> {exp.description}
          </p>
        )}
      </li>
    ));

    const educationList = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.schoolId}</h4>
        <p>
          <Moment format="DD.MM.YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            ' now'
          ) : (
            <Moment format=" DD.MM.YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldOfStudy}
        </p>
        {edu.description === '' ? null : (
          <p>
            <strong>Description:</strong> {edu.description}
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experienceList.length > 0 ? (
            <ul className="list-group">{experienceList}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educationList.length > 0 ? (
            <ul className="list-group">{educationList}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}
