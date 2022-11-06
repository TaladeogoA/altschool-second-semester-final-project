//  Profile data

export const getProfileData = async () => {
  const response = await fetch("https://api.github.com/users/taladeogoa");
  const data = await response.json();
  return data;
};

// Repos data

export const getReposData = async () => {
  const response = await fetch("https://api.github.com/users/taladeogoa/repos");
  const data = await response.json();
  console.log(data);
  return data;
};

// Followers data
export const getFollowersData = async () => {
  const response = await fetch(
    "https://api.github.com/users/taladeogoa/followers"
  );
  const data = await response.json();
  //   console.log(data);
  return data;
};
