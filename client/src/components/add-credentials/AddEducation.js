import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';

export class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolId: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: '',
      description: '',
      errors: {},
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const educationData = {
      schoolId: this.state.schoolId,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    if (educationData.current === '') {
      educationData.current = 'false';
    }
    this.props.addEducation(educationData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended.
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="schoolId"
                placeHolder="* School or Bootcamp"
                value={this.state.schoolId}
                onChange={this.onChange}
                error={errors.schoolId}
              />
              <TextFieldGroup
                name="degree"
                placeHolder="* Degree or Certificate"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                name="fieldOfStudy"
                placeHolder="Field of study"
                value={this.state.fieldOfStudy}
                onChange={this.onChange}
                error={errors.fieldOfStudy}
              />
              <h6>From date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
              />
              <div
                className="from-check md-4"
                style={{ padding: '0 0 20px 20px', marginTop: '-10px' }}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current School
                </label>
              </div>
              <TextAreaFieldGroup
                name="description"
                placeHolder="Education description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about your experience and what you learned"
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = {
  addEducation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
