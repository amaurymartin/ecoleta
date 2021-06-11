import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/home/home'
import CollectionPointsNew from './pages/collection-points/new/collection-points-new'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CollectionPointsNew} path="/collection-points/new" />
    </BrowserRouter>
  )
}

export default Routes
