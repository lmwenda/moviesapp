import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "#2d4f85",
    padding: "10px 80px",

    color: "white",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
}));

const AppPagination = ({ numberOfPages }) => {
  const classes = useStyles();
  //handle change
  const handleChange = page => {
    localStorage.setItem("page", page);
    window.scroll(0, 0);
    window.location.reload();
  };
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Pagination
          onChange={e => handleChange(e.target.textContent)}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          count={numberOfPages}
        />
      </div>
    </div>
  );
};

export default AppPagination;