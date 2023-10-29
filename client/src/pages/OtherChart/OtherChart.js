import React, { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import './OtherChart.css';

const OtherChart = () => {
    const data = useSelector(state => state.dataReducer);
    const [labelValues, setLabelValues] = useState({});
    const [newLabelValues, setNewLabelValues] = useState({});
    const [selectedOption,setSelectedOption] = useState('Pestle');

    useEffect(() => {
        const updatedLabel = {};

        data?.forEach(element => {
            if (!updatedLabel[element.region]) {
                updatedLabel[element.region] = 1;
            } else {
                updatedLabel[element.region]++;
            }
        });
        setLabelValues(updatedLabel);
    }, [data]);

    useEffect(() => {
        const updatedLabel = {};
        if (selectedOption === 'Pestle') {
            data?.forEach(element => {
                if (!updatedLabel[element.pestle]) {
                    updatedLabel[element.pestle] = 1;
                } else {
                    updatedLabel[element.pestle]++;
                }
            });
        }else if(selectedOption==='Source')
        {
            data?.forEach(element => {
                if (!updatedLabel[element.source]) {
                    updatedLabel[element.source] = 1;
                } else {
                    updatedLabel[element.source]++;
                }
            });
        }
        setNewLabelValues(updatedLabel);
    }, [data,selectedOption]);

    const chartData = {
        labels: Object.keys(labelValues),
        datasets: [
            {
                data: Object.values(labelValues),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0',
                    '#3F51B5',
                ],
            }
        ]
    }

    const barChartData = {
        labels: Object.keys(newLabelValues),
        datasets: [
            {
                data: Object.values(newLabelValues),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0',
                    '#3F51B5',
                ],
            }
        ]
    }

    return (
        <div className='other-chart-container'>
            <div>
                <h3>Region Distribution</h3>
                <Doughnut data={chartData} />
            </div>
            <div className='char'>
                <h3>Pestle Distribution</h3>
                <Bar data={barChartData} style={{height: '85%'}}/>

                <select value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                    <option value='Pestle'>Pestle</option>
                    <option value='Source'>Source</option>
                </select>
            </div>
        </div>
    )
}

export default OtherChart;