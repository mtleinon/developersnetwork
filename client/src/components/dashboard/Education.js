import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

export class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.schoolId}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD.MM.YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            ' now'
          ) : (
            <Moment format=" DD.MM.YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table" style={{ fontSize: '1.3rem' }}>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteEducation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);
