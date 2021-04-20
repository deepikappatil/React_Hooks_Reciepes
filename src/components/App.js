import React, { useState, useEffect } from 'react'
import edamam from '../apis/edamam'
import '../styles/App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = 'e355b0a5';
  const APP_KEY = '011c3620ad89123b5340680e1cbab2f5';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana')

  useEffect(() => {
   getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const { data } = await edamam.get(`/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    setRecipes(data.hits);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
            className="search-bar" 
            type="text" value={search} 
            onChange={(e) => setSearch(e.target.value)} 
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map((recipe) => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
