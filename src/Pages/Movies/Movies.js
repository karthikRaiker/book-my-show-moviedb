import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/CustomPagination";
import { REACT_APP_API_KEY } from "../../config/config";
import CustomGenres from "../../components/CustomGenres/CustomGenres";
import useGenre from "../../hooks/UseGenre";

function Movies() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreForUrl = useGenre(selectedGenres);
  console.log(genreForUrl);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreForUrl]);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`
    );
    setContent(data.results);
    setNumberOfPage(data.total_pages);
  };

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <CustomGenres
        setPage={setPage}
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        type="movie"
      />
      <div className="Trending-Container">
        {content &&
          content.map((content) => {
            return (
              <SingleContent
                key={content.id}
                id={content.id}
                poster={content.poster_path}
                title={content.title || content.name}
                date={content.first_air_date || content.release_date}
                media_type="movie"
                vote_avg={content.vote_average}
              />
            );
          })}
      </div>
      {numberOfPage > 1 && (
        <Pagination setPage={setPage} numberOfPage={numberOfPage} />
      )}
    </div>
  );
}

export default Movies;
