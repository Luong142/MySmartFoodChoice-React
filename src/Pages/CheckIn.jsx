import React, { useState } from 'react';
import './CheckIn.css';
import Header from '../Components/Header';



function DailyCheckIn() {
    // State to keep track of selected day
    const [selectedDay, setSelectedDay] = useState(null);

    // Function to handle radio button change
    const handleRadioChange = (day) => {
        // Check if the selected day is already the current selected day
        if (selectedDay === day) {
            // If it is, deselect it
            setSelectedDay(null);
        } else {
            // If it's not, select it
            setSelectedDay(day);
        }
    };

    // Array of days of the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        
        <div className="daily-check-in-container">
        <Header />
        <h2>Daily Check-in</h2>
            <div className="check-in-days">
                {daysOfWeek.map(day => (
                    <div className="check-in-day" key={day}>
                        <input
                            type="radio"
                            id={day.toLowerCase()}
                            value={day}
                            checked={selectedDay === day}
                            onChange={() => handleRadioChange(day)}
                        />
                        <label htmlFor={day.toLowerCase()}>{day}</label>
                    </div>
                ))}
            </div>
            <button onClick={() => console.log('Selected day:', selectedDay)}>Submit Check-in</button>
        </div>
    );
}

export default DailyCheckIn;
