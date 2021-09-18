import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Layout.module.css';

const Layout = props => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
