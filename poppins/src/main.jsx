import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import FamilyProfilePage from './pages/FamilyProfilePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'family/:familyId',
    element: <FamilyProfilePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
   <RouterProvider router={router} />
  
)
