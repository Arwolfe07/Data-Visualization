import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchData } from './actions/data';
import PieChart from './pages/PieChart/PieChart';
import OtherChart from './pages/OtherChart/OtherChart';
import Root from './components/Root/Root';

const router = createBrowserRouter([{
  path: '/',
  element: <Root/>,
  children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: '/pie',
      element: <PieChart />
    },
    {
      path: '/other',
      element: <OtherChart />
    }
  ]
}]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App
