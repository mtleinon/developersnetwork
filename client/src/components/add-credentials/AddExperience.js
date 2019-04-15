import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileActions';

export class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      title: '',
      location: '',
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

    const experienceData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    if (experienceData.current === '') {
      experienceData.current = 'false';
    }

    this.props.addExperience(experienceData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or currently
              have.
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="title"
                placeHolder="* Job Title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                name="company"
                placeHolder="* Company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                name="location"
                placeHolder="Location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
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
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                name="description"
                placeHolder="Job description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about the position"
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = {
  addExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
