import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../../data/data";
import { getReposData } from "../../data/data";
import LastUpdated from "../../utils/LastUpdated";
import setRepoColor from "../../utils/setRepoColor";
import Pagination from "../pagination/Pagination";
import "./Profile.scss";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);

  // set data to states
  useEffect(() => {
    getProfileData().then((data) => {
      setProfileData(data);
    });

    getReposData().then((data) => {
      setReposData(data);
      setLoading(false);
    });
  }, []);

  // Get current repos
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = reposData.slice(indexOfFirstRepo, indexOfLastRepo);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="profile">
      <p className="name">User Profile</p>

      <div className="profile__info">
        <article className="profile__info__avatar">
          <img src={profileData?.avatar_url} alt={profileData.login} />
        </article>

        <article className="profile__info__details">
          <h2>{profileData?.login}</h2>
          <p>@{profileData?.twitter_username}</p>
          <p>{profileData?.bio}</p>
        </article>

        <article className="profile__info__stats">
          <div>
            <h3>{profileData.public_repos}</h3>
            <p>Repos</p>
          </div>

          <div>
            <h3>{profileData.followers}</h3>
            <p>Followers</p>
          </div>

          <div>
            <h3>{profileData.following}</h3>
            <p>Following</p>
          </div>
        </article>

        <article className="profile__info__repos">
          <h3>Repositories</h3>
          <div className="repos__list">
            {currentRepos?.map((repo) => {
              return (
                <div className="repo" key={repo.id}>
                  <Link to={`/home/${repo.id}`}>{repo.name}</Link>
                  <p>{repo.description}</p>

                  <div className="repo__status">
                    <div className="repo__language">
                      <span className={setRepoColor(repo.language)}></span>
                      <p>{repo.language}</p>
                    </div>

                    <p>{LastUpdated(repo.updated_at)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <Pagination
          currentPage={currentPage}
          reposPerPage={reposPerPage}
          totalRepos={reposData.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </section>
  );
};

export default Profile;
