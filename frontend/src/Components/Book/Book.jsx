import { useEffect } from "react";
import { useState } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { bookData } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "@material-ui/lab/Pagination";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import green from "@material-ui/core/colors/green";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: "90px auto",
  },
  pagination: {
    position: "fixed",
    bottom: "10px",
    right: "30px",
    margin: "auto",
    // background: "rgb(247, 234, 211)",
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  category: {
    display: "flex",
  },
}));

const Book = () => {
  const [tempdata, setTempdata] = useState([]);
  const [currdata, setCurrdata] = useState([]);
  const [searchdata, setSearchdata] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("all");
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state);

  const searchBook = (e) => {
    if (e.target.value) {
      let val = e.target.value.trim().split(" ");
      const temp = searchdata.filter((el) =>
        val.some((obj) => {
          return el["title"].toLowerCase().includes(obj.toLowerCase());
        })
      );
      setTempdata(temp);
    } else {
      setTempdata(searchdata);
    //   setValue("all");
    }
  };

  const changePage = (e, page) => {
    setPage(page);
  };

  const handleChange = (event, value) => {
    //   console.log(1)
    if (value === "all") {
      setSearchdata(data);
      setTempdata(data);
    } else {
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].category === value) temp.push(data[i]);
      }
      setSearchdata(temp);
      setTempdata(temp);
    }
    setValue(value);
    changePage(null,1)
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(bookData());
  }, [dispatch]);

  useEffect(() => {
    //   console.log(1)
    setSearchdata(data);
    setTempdata(data);
    let temp1 = {};
    for (let i = 0; i < data.length; i++) {
      temp1[data[i]["category"]] = true;
    }

    let temp2 = [];
    for (let key in temp1) {
      temp2.push(key);
    }

    setCategory(temp2);
  }, [data]);

  useEffect(() => {
    // console.log(1)
    let arr = tempdata.filter(
      (e, i) => i >= (page - 1) * 3 && i <= page * 3 - 1
    );
    setCurrdata(arr);
  }, [tempdata, page]);

  const classes = useStyles();

  return (
    <>
      {isLoading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
      <>
        <div className={classes.root}>
          <AppBar color="secondary" position="fixed">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Bookibrary
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={searchBook}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Filter by Category</FormLabel>
                <RadioGroup
                  row
                  aria-label="category"
                  name="category"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="all"
                    control={<GreenRadio />}
                    label="All"
                  />
                  {category &&
                    category.map((e, i) => (
                      <FormControlLabel
                        key={i}
                        value={e}
                        control={<GreenRadio />}
                        label={e}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
              <div className={classes.grow} />
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div id="book">
          {!isLoading && currdata.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Total Chapters</th>
                  <th>Publisher</th>
                  <th>Year</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {currdata.map((e) => (
                  <tr key={e._id}>
                    <td>{e.title}</td>
                    <td>{e.category}</td>
                    <td>{e.author}</td>
                    <td>{e.totalChapters}</td>
                    <td>{e.publisher}</td>
                    <td>{e.published}</td>
                    <td>{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            onChange={(e, page) => changePage(e, page)}
            className={classes.pagination}
            count={Math.ceil(tempdata.length / 3)}
            variant="outlined"
            defaultPage={1}
            boundaryCount={2}
            color="primary"
          />
        </div>
      </>
      {error && (
        <>
          <Snackbar
            className={classes.error}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Something went wrong!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default Book;
