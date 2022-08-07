import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { REACT_APP_API_KEY } from "../../config/config";
import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/CustomPagination";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <span className="pageTitle">Search</span>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="container"
            style={{ marginLeft: 10, backgroundColor: "rgb(108 102 102)" }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="search movie" />
          <Tab style={{ width: "50%" }} label="search series" />
        </Tabs>
      </ThemeProvider>
      <div className="Trending-Container" style={{ marginTop: "1rem" }}>
        {content.length &&
          content.map((content) => {
            return (
              <SingleContent
                key={content.id}
                id={content.id}
                poster={content.poster_path}
                title={content.title || content.name}
                date={content.first_air_date || content.release_date}
                media_type={type ? "tv" : "movie"}
                vote_avg={content.vote_average}
              />
            );
          })}
        {searchText && !content && type ? (
          <h2>No Series Found</h2>
        ) : (
          <h2>No Series/Movie Found</h2>
        )}
      </div>
      {numOfPages > 1 && (
        <Pagination setPage={setPage} numberOfPage={numOfPages} />
      )}
    </div>
  );
}

export default Search;
