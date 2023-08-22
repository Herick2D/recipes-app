import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Layout from '../components/Layout';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import MealId from '../pages/MealId';
import DrinkId from '../pages/DrinkId';
import RecipeDetails from '../components/Layout/components/RecipeDetails';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="" element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <h1>Not Found</h1> } />
        <Route path="/favorite-recipes" element={ <h1>Not Found</h1> } />
      </Route>
      <Route path="/meals/:id" element={ <MealId /> } />
      <Route path="/drinks/:id" element={ <DrinkId /> } />
      <Route path="/meals/:id/in-progress" element={ <h1>Not Found</h1> } />
      <Route path="/drinks/:id/in-progress" element={ <h1>Not Found</h1> } />
    </Routes>
  );
}

export default Router;
