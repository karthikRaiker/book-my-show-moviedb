const useGenre = (selectedGenres = []) => {
  if (selectedGenres.length < 1) return "";

  const convertGenreId = selectedGenres.map(
    (selectedGenre) => selectedGenre.id
  );

  const genreForUrl = convertGenreId.reduce((acc, curr) => acc + "," + curr);
  return genreForUrl;
};

export default useGenre;
