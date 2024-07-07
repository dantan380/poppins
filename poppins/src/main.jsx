import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import FamilyProfilePage from './pages/FamilyProfilePage.jsx';
import { CheckInProvider } from './context/CheckInContext.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'family/:familyId',
    element: <FamilyProfilePage />
  },
  {
    path: 'reports/',
    element: <ReportsPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CheckInProvider>
    <RouterProvider router={router} />
  </CheckInProvider>
)
