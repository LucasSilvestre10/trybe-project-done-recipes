import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import ProfileDetails from './pages/ProfileDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealDetail from './pages/MealDetail';
import DrinkDetail from './pages/DrinkDetail';

function App() {
  return (
    <Switch>

      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ ProfileDetails } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:id" component={ MealDetail } />
      <Route exact path="/drinks/:id" component={ DrinkDetail } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />

    </Switch>
  );
}

export default App;
