import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

export class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD.MM.YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            ' now'
          ) : (
            <Moment format=" DD.MM.YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table" style={{ fontSize: '1.3rem' }}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}
Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience);
