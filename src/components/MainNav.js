import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("Trending");
  const navigate = useNavigate();

  useEffect(() => {
    switch (value) {
      case "Trending":
        navigate("/");
        break;
      case "Movies":
        navigate("/movies");
        break;
      case "TV Series":
        navigate("/series");
        break;
      case "Search":
        navigate("/search");
        break;
      default:
        navigate("/");
    }
  }, [value, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
        backgroundColor: "#222",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        value="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        value="Movies"
        icon={<MovieCreationIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        value="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        value="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
