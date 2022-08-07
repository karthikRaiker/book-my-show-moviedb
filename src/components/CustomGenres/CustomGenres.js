import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { REACT_APP_API_KEY } from "../../config/config";

function CustomGenres({
  setPage,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
}) {
  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };

  const handleGenreAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleGenreDelete = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  console.log(genres);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.length
        ? selectedGenres.map((genre) => {
            return (
              <Chip
                style={{ margin: "2px" }}
                key={genre.id}
                label={genre.name}
                size="small"
                clickable
                color="primary"
                onDelete={() => {
                  handleGenreDelete(genre);
                }}
              />
            );
          })
        : ""}
      {genres.length
        ? genres.map((genre) => {
            return (
              <Chip
                style={{ margin: "2px", backgroundColor: "rgb(198, 198, 198)" }}
                key={genre.id}
                label={genre.name}
                size="small"
                clickable
                onClick={() => handleGenreAdd(genre)}
              />
            );
          })
        : ""}
    </div>
  );
}

export default CustomGenres;
