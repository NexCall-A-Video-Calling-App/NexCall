import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import Routes from './routes/Routes.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient();
console.log(queryClient);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>

      <QueryClientProvider client={queryClient}>

      <RouterProvider router={Routes} />

      </QueryClientProvider>
   
    </AuthProvider>

  </StrictMode>,
)
