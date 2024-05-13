import React from 'react';
import './All.css'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
    const pie1 = {
        labels: ['Vegetarian', 'Non-Vegetarian'],
        datasets: [
            {
                label: ['Vegetarian / Non-Vegetarian'],
                data: [14.3, 85.7],
                backgroundColor: ['pink', 'lightgreen'],
            },
            
        ],
    };

    const pie2 = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: ['Male / Female'],
                data: [20, 80],
                backgroundColor: ['pink', 'blue'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Change label color here
                    font: {
                        size: 16, // Change label font size here
                    },
                },
            },
        },
    };

    return (
        <div className='piecontainer'>
            <div className='title'>
                <h1>User demographics based on the number of users on the platform</h1>
            </div>

            <div className='pie'>
                <Pie data={pie1} options={options} />
                <Pie data={pie2} options={options} />
            </div>
        </div>
    );
};

export default Graph;
