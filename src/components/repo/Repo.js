import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LastUpdated from "../../utils/LastUpdated";
import { getReposData } from "../../data/data";
import "./Repo.scss";

const Repo = () => {
  const [reposData, setReposData] = useState([]);
  const { repoId } = useParams();

  useEffect(() => {
    getReposData().then((data) => {
      setReposData(data);
    });
  }, []);

  const repo = reposData.find((repo) => {
    return repo.id === parseInt(repoId);
  });
  console.log(repo);

  return (
    <section className="single-repo">
      <Link className="link" to="/">
        Back to Profile
      </Link>

      <div className="repo__info">
        <article className="repo__info__details">
          <a href={repo?.html_url} target="_blank">
            {repo?.name}
          </a>
          <p>
            {repo?.description ? repo?.description : "No description provided."}
          </p>
        </article>

        <article className="repo__info__stats">
          <div>
            <h3>{repo?.stargazers_count}</h3>
            <p>Stars</p>
          </div>

          <div>
            <h3>{repo?.language}</h3>
            <p>Language</p>
          </div>

          <div>
            <h3>{LastUpdated(repo?.updated_at)}</h3>
            <p>Last Updated</p>
          </div>

          <a className="link" href={repo?.html_url} target="_blank">
            Go to Github page
          </a>
        </article>
      </div>
    </section>
  );
};

export default Repo;
