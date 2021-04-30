const urlBuilder = () => {
  return `${process.env.REACT_APP_OMDB_API_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}`
};

const apiConfig = {
  movie: {
    list: urlBuilder(),
    detail: urlBuilder(),
  }
};

export default apiConfig;
