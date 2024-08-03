import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import FamilyProfilePage from './pages/FamilyProfilePage.jsx';
import { CheckInProvider } from './context/CheckInContext.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import { ReportProvider } from './context/ReportContext.jsx';
import CreateFamilyProfilePage from './pages/CreateFamilyProfilePage.jsx';
import CheckedInPage from './pages/CheckedInPage.jsx';

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
  },
  {
    path: 'createFamily',
    element: <CreateFamilyProfilePage />
  },
  {
    path: 'checkedInSummary',
    element: <CheckedInPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CheckInProvider>
    <ReportProvider>
      <RouterProvider router={router} />
    </ReportProvider>
  </CheckInProvider>
)
