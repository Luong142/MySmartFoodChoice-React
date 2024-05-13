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

    // below is the front end.
    return (
        <div>
            <div className='title'>
                <h1>User demographics based on the number of users on the platform</h1>
            </div>

            <div className='pie'>
                <Pie data={pie1} />
                <Pie data={pie2} />
            </div>
        </div>
    );
};

export default Graph;
