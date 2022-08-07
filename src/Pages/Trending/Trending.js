import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { REACT_APP_API_KEY } from "../../config/config";
import "./Trending.css";
// import useSort from "../../hooks/UseSort";

function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  // let sortedContent = useSort(content);
  // setContent(sortedContent);
  // console.log(sortedContent);

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`
    );

    // setContent(data.results);
    let sort = data.results.sort(handleSort);
    setContent(sort);
  };

  const handleSort = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <span className="pageTitle">Trending</span>

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
                media_type={content.media_type}
                vote_avg={content.vote_average}
              />
            );
          })}
      </div>
      <Pagination setPage={setPage} />
    </div>
  );
}

export default Trending;
