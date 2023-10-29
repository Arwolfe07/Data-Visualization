import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ChartComponent.css';

const ChartComponent = ({ data }) => {
    const [option, setOption] = useState('intensity');

    const [yearsData, setYearsData] = useState(data?.filter(item => item.start_year !== null));
    const [filterYears, setFilterYears] = useState(yearsData.map(item => item.start_year));
    const [dataSets, setDataSets] = useState(yearsData?.map(item => item.likelihood));
    const [label, setLabel] = useState('Intensity');
    const [year, setYear] = useState('all');
    const [startOrEnd, setStartOrEnd] = useState('start');

    useEffect(() => {
        if (option === 'intensity') {
            setDataSets(yearsData?.map(item => item.intensity));
            setLabel('Intensity');
        } else if (option === 'likelihood') {
            setDataSets(yearsData?.map(item => item.likelihood));
            setLabel('Likelihood');
        }
        else if (option === 'relevance') {
            setDataSets(yearsData?.map(item => item.relevance));
            setLabel('Relevance');
        }
    }, [option, yearsData]);

    useEffect(() => {
        switch (year) {
            case '2016':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2016));
                break;
            case '2017':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2017));
                break;
            case '2018':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2018));
                break;
            case '2019':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2019));
                break;
            case '2020':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2020));
                break;
            case '2021':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2021));
                break;
            case '2022':
                setFilterYears(yearsData.map(item => item.start_year).filter(item => item === 2022));
                break;
            default:
                setFilterYears(yearsData.map(item => item.start_year));
                break;
        }
    }, [year,yearsData]);

    useEffect(() => {
        if (startOrEnd ==='end') {
            setYearsData(data?.filter(item => item.end_year !== null));
            setFilterYears(yearsData.map(item => item.end_year));
        } else {
             setYearsData(data?.filter(item => item.start_year !== null));
            setFilterYears(yearsData.map(item => item.start_year));
        }
    },[startOrEnd]);

    const getColor = (value) => {
        const colors = [
            '#7F00FF', // Blue
            '#FF8000' // Orange
        ];
        const dataLim = (Math.max(...dataSets) + Math.min(...dataSets)) / 2;
        if (value < dataLim) {
            return colors[1];
        }
        else {
            return colors[0];
        }
    };


    const chartData = {
        labels: filterYears,
        datasets: [
            {
                label: label,
                data: dataSets,
                backgroundColor: dataSets.map((value) => getColor(value)),
                borderColor: dataSets.map((value) => getColor(value)),
                borderWidth: 1,
            }
        ]
    }

    const chartOptions = {
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
                cornerRadius: 5,
                displayColors: false,
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {

                    font: {
                        family: 'Roboto',
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {

                    font: {
                        family: 'Roboto',
                        size: 14,
                        weight: 'bold',
                    },
                    callback: (value) => value + '%',
                },
            },
        },
        animation: {
            duration: 4000,
            easing: 'easeInOutQuart', // Use a smooth easing function
            mode: 'progressive',
        },
    };

    return (
        <div className='chart-component'>
            <h3>{label} Chart</h3>
            <div className='filter-section'>
                <select value={option} onChange={(e) => setOption(e.target.value)}>
                    <option value='intensity'>Intensity</option>
                    <option value='relevance'>Relevance</option>
                    <option value='likelihood'>Likelihood</option>
                </select>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='2016'>2016</option>
                    <option value='2017'>2017</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                </select>
                <select value={startOrEnd} onChange={(e) => setStartOrEnd(e.target.value)}>
                    <option value='start'>Start Year</option>
                    <option value='end'>End Year</option>
                </select>
            </div>
            <Bar data={chartData} plugins={[ChartDataLabels]} options={chartOptions} />
        </div>
    )
}

export default ChartComponent;