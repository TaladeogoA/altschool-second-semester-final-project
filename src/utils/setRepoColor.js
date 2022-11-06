const setRepoColor = (language) => {
  switch (language) {
    case "JavaScript":
      return "yellow";
    case "HTML":
      return "orange";
    case "CSS":
      return "blue";
    case "Python":
      return "green";
    case "SCSS":
      return "purple";
    default:
      return "";
  }
};

export default setRepoColor;
