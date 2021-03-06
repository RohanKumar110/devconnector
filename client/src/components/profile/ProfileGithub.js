import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import React, { useEffect } from "react";
import { getGithubRepos } from "../../actions/profile";

function ProfileGithub(props) {
  const { repos, username, getGithubRepos } = props;

  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              {repo.description ? (
                <p>{repo.description}</p>
              ) : (
                <p>No Description</p>
              )}
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

const mapDispatchToProps = {
  getGithubRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
