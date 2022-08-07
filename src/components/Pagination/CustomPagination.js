import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function CustomPagination({ setPage, numberOfPage = 10 }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numberOfPage}
          onClick={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
