import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Layout from '../components/Layout';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import Recipe from '../pages/Recipe';
import RecipeInProgress from '../pages/RecipeInProgress';
import FavoriteRecipes from '../components/Layout/components/FavoriteRecipes';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="" element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <h1>Not Found</h1> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/meals/:id" element={ <Recipe /> } />
      <Route path="/drinks/:id" element={ <Recipe /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
    </Routes>
  );
}

export default Router;
