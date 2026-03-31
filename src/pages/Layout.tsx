import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import Footer from '../../src/components/Footer/Footer';
import Loader from '../components/Loader/Loader';


export default function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
