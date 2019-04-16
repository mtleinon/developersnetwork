import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: 'e2d64dcdf47dcea51028',
      clientSecret: 'd2f09318fc87b4df8322d7471106d38fef395570',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  static propTypes = {
    githubusername: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { githubusername } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log('CATCH: ', err));
  }

  render() {
    const { repos } = this.state;
    const githubusername = this.props.githubusername;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forsk_count}</span>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <hr />
        <h2 className="mb-4">Latest GitHub Repos</h2>
        {repoItems}
      </div>
    );
  }
}

/*

https://github.com/settings/applications/1049230

0 users

Client ID
e2d64dcdf47dcea51028
Client Secret
d2f09318fc87b4df8322d7471106d38fef395570

*/
