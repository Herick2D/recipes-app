import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './routes';
import { RecipiesProvider } from './contexts/recipiesContexts';

function App() {
  return (
    <RecipiesProvider>
      <Router />
    </RecipiesProvider>

  );
}

export default App;
