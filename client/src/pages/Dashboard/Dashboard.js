import React from 'react';
import {useSelector} from 'react-redux';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartComponent from '../../components/ChartComponent/ChartComponent';
import './Dashboard.css';

Chart.register(CategoryScale);


const Dashboard = () => {
  const data = useSelector(state => state.dataReducer);
  if(!data) return <p>Loading...</p>;

  return (
    <div className='all-container'>
      <ChartComponent data={data}/>
    </div>
  )
}

export default Dashboard;