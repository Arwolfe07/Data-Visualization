import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import './PieChart.css';

const PieChart = () => {
    const data = useSelector(state => state.dataReducer);
    const [labelValues, setLabelValues] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('United States of America');
    const [barData, setBarData] = useState(null);


    useEffect(() => {
        const updatedLabelValues = {};

        data?.forEach((elem) => {
            if (!updatedLabelValues[elem.sector]) {
                updatedLabelValues[elem.sector] = 1;
            } else {
                updatedLabelValues[elem.sector]++;
            }
        });

        setLabelValues(updatedLabelValues);
    }, [data]);

    useEffect(() => {
        const countryData = data?.filter(
            (entry) => entry.country === selectedCountry
        );

        const sectors = {};
        countryData?.forEach((entry) => {
            if (!sectors[entry.sector]) {
                sectors[entry.sector] = [];
            }
            sectors[entry.sector].push(entry.intensity);
        });

        const sectorLabels = Object.keys(sectors);
        const sectorIntensities = sectorLabels.map(
            (sector) => sectors[sector]
        );
        setBarData({
            labels: sectorLabels,
            datasets: [
                {
                    label: "Intensity",
                    data: sectorIntensities,
                    backgroundColor: 'rgba(144, 104, 190, 0.7)',
                },
            ],
        });
    }, [data, selectedCountry])

    const getRandomColor = (index) => {
        const colors = [
            "#FF0080",
            "#00BFFF",
            "#FFD700",
            "#32CD32",
            "#FF4500",
            "#9400D3",
        ];
        return colors[index % colors.length];
    };

    const chartData = {
        labels: Object.keys(labelValues),
        datasets: [
            {
                data: Object.values(labelValues),
                backgroundColor: Object.keys(labelValues).map((_, index) =>
                    getRandomColor(index)
                )
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                position: "average",
            },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            x: {
                grid: {
                    display: false,
                },
                stacked: true,
            },
            y: {
                stacked: true,
                grid: {
                    color: "gray",
                },
            },
        },
    };

    if (!barData) return <p>Loading...</p>

    return (
        <div className='big-container'>
            <div>
                <h3>Sector Chart</h3>
                <Pie options={chartOptions} data={chartData} style={{ width: '400px', height: '400px' }} />
            </div>
            <div>
                <h3>Country Chart</h3>
                <Bar data={barData} options={barOptions} />
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className='select-country'>
                    <option value="United States of America">
                        United States of America
                    </option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
            </div>
        </div>
    )
}

export default PieChart;