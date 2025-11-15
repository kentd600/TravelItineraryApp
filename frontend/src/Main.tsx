import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Index.css'
import { AppRouter } from './routes/AppRoutes.tsx'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={AppRouter}/>
  </StrictMode>
)
