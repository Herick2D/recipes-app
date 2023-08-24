import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesButtons from './components/CategoriesButtons';

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <CategoriesButtons pathname={ pathname } />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
