import React, { useEffect, useState } from 'react';

interface Repo {
  id: string;
  html_url: string;
  name: string;
  description: string;
  stargazers_count: string;
  watchers_count: string;
  forks_count: string;
}

const NOT_FOUND = 'Not Found';

export default function ProfileGithub({
  githubusername
}: {
  githubusername: string;
}) {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    /* This fetch must be moved to backend to avoid using secrets in the client side */
    const clientId = 'e2d64dcdf47dcea51028';
    const clientSecret = 'd2f09318fc87b4df8322d7471106d38fef395570';
    const count = 5;
    const sort = 'created: asc';

    fetch(
      `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.message !== NOT_FOUND) {
          setRepos(data);
        }
      })
      .catch(err => console.log('CATCH: ', err));
  }, [githubusername]);

  // const { repos } = repos;

  const repoItems = repos.map(repo => (
    <div key={repo.id} className='card card-body mb-2'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>
            <a
              href={repo.html_url}
              className='text-info'
              target='_blank'
              rel='noopener noreferrer'
            >
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
      </div>
      <div className='col-md-6'>
        <span className='badge badge-info mr-1'>
          Stars: {repo.stargazers_count}
        </span>
        <span className='badge badge-secondary mr-1'>
          Watchers: {repo.watchers_count}
        </span>
        <span className='badge badge-success'>Forks: {repo.forks_count}</span>
      </div>
    </div>
  ));

  return (
    <div>
      <hr />
      <h2 className='mb-4'>Latest GitHub Repos</h2>
      {repoItems.length > 0 ? repoItems : 'No repos'}
    </div>
  );
}

/*

https://github.com/settings/applications/1049230

0 users

Client ID
e2d64dcdf47dcea51028
Client Secret
d2f09318fc87b4df8322d7471106d38fef395570

*/
