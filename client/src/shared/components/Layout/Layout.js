import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MainNavigation from '../Navigation/MainNavigation';
import './Layout.module.css';
const Layout = props => {
  return (
    <>
      <Header>
        <MainNavigation />
      </Header>
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
