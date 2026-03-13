import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import Footer from '../../src/components/Footer/Footer';


export default function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
