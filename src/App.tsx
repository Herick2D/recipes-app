import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './routes';
import { RecipesProvider } from './contexts/recipesContexts';

function App() {
  return (
    <RecipesProvider>
      <Router />
    </RecipesProvider>

  );
}

export default App;
