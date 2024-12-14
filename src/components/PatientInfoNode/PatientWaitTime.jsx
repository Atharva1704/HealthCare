import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import "./Node.css";  

const handleStyle = { left: 10 };

function PatientWaitTime({ data }) {
    console.log("Wait time");
    const [waitTime, setWaitTime] = useState(data.value || 'less_than_5'); 

    const waitTimeOptions = [
        { label: 'Less than 5 mins', value: 'less_than_5' },
        { label: '5 to 10 mins', value: '5_to_10' },
        { label: '10 to 20 mins', value: '10_to_20' },
        { label: '20 to 30 mins', value: '20_to_30' },
        { label: 'Over 30 mins', value: 'over_30' },
    ];

    const onWaitTimeChange = useCallback((evt) => {
        const selectedValue = evt.target.value;
        setWaitTime(selectedValue); 
        localStorage.setItem('patientWaitTime', selectedValue);
    }, []);

    useEffect(() => {
        const savedWaitTime = localStorage.getItem('patientWaitTime');
        if (savedWaitTime) setWaitTime(savedWaitTime);
    }, []);

    return (
        <div className='glassmorphism'>
            <div className="form-group">
                <label htmlFor="waitTime">Patient Wait Time:</label>
                <select
                    id="waitTime"
                    value={waitTime}
                    onChange={onWaitTimeChange}
                    className="select-field"
                >
                    {waitTimeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            />
        </div>
    );
}

export default PatientWaitTime;
