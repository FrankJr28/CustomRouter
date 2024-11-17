import { lazy, Suspense } from 'react'
import HomePage from './pages/Home'
import AboutPage from './pages/AboutPage'
import Page404 from './pages/404'
import SearchPage from './pages/Search'

import { Router } from './Router'
import { Route } from './Route'
import { Component } from 'react'

const LazyHomePage = lazy(()=> import('./pages/Home.jsx'))
const LazyAboutPage = lazy(()=> import('./pages/AboutPage.jsx'))

const appRoutes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
    /*path: '/search/:query',*/
    //Component: ({ routeParams }) => <h1>Buscado {routeParams.query} </h1>
  }
]

function App() {
  /*defaultComponent={Page404}*/ 
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>} >
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router> 
      </Suspense>
    </main>
  )
}

export default App
