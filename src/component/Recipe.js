import React, { useEffect, useState } from "react";
import Cards from "./CardComponent";
import "../styles/Recipe.css";
import { makeStyles } from "@material-ui/core/styles";
import Pic from "../source/burger.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Recipe() {
  const classes = useStyles();

  const APP_ID = "15c3a3ec";
  const APP_KEY = "d1abd6d091e5106805f2ea52f50c56e7";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState();
  const [query, setQuery] = useState("Vegetarian");

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  useEffect(() => {
    const getRecipies = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setRecipes(jsonData.hits);
      console.log(jsonData.hits);
    };
    getRecipies();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const newSearch = (e) => {
    e.preventDefault();
    search.length ? setQuery(search) : setQuery(query);
    setSearch("");
  };

  return (
    <div className={classes.root}>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <img className="toresize" src={Pic}></img>
            <a class="navbar-brand" href="#">
              <strong>Recipe App</strong>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <form onSubmit={newSearch} class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search for food"
                  value={search}
                  onChange={updateSearch}
                  aria-label="Search"
                ></input>
                <button class="btn btn-outline-success" type="search">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>

        <div className="grid container">
          {recipes.map((recipe) => (
            <Cards
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              caution={recipe.recipe.cautions}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
      <div className="copy">
        &copy; Designed & Developed by <strong>Sridhu Sekar</strong>
      </div>
    </div>
  );
}

export default Recipe;
