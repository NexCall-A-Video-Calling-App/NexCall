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

import toast, { Toaster } from 'react-hot-toast'
const notify = () => {
  toast('notify')
}

const queryClient = new QueryClient();
console.log(queryClient);

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes} />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </>,
)
