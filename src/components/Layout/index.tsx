import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Header from './components/Header';
import { RecipiesContexts } from '../../contexts/recipiesContexts';

function Layout() {
  const { recipies } = useContext(RecipiesContexts);
  useEffect(() => {
    console.log(recipies);
  }, [recipies]);
  return (
    <>
      <Header />
      { recipies.length > 0 && <p>{ recipies[0].strCategory }</p> }
      <Outlet />
    </>
  );
}

export default Layout;
