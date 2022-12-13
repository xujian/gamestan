import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamePage from './pages/GamePage'

const MasterLayout = lazy(() => import('./layouts/master'))
const HomePage = lazy(() => import('./pages/HomePage'))


const MasterRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:id" element={<GamePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default MasterRoutes