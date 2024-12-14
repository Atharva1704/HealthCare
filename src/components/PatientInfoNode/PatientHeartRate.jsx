import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';  // Import MUI components
import "./Node.css";

const handleStyle = { left: 10 };

function PatientHeartRate({ data }) {
    console.log("Heart Rate");

    const [heartRate, setHeartRate] = useState(data.value || ''); // Default value

    // Options for heart rate ranges
    const heartRateRanges = [
        { label: '<40', value: '<40' },
        { label: '40-60', value: '40-60' },
        { label: '60-100', value: '60-100' },
        { label: '>100', value: '>100' },
    ];

    // Update heart rate range and save to localStorage
    const onHeartRateChange = useCallback((evt) => {
        const newHeartRate = evt.target.value;
        setHeartRate(newHeartRate);
        // Save to localStorage
        localStorage.setItem('patientHeartRate', newHeartRate);
    }, []);

    useEffect(() => {
        // Load the saved heart rate value from localStorage (if any)
        const savedHeartRate = localStorage.getItem('patientHeartRate');
        if (savedHeartRate) setHeartRate(savedHeartRate);
    }, []);

    return (
        <div className='glassmorphism'>
            {/* <Handle type="target" position={Position.Top} /> */}
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Patient Heart Rate</FormLabel>
                    <RadioGroup
                        name="heartRate"
                        value={heartRate}
                        onChange={onHeartRateChange}
                    >
                        {heartRateRanges.map((range) => (
                            <FormControlLabel
                                key={range.value}
                                value={range.value}
                                control={<Radio />}
                                label={range.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            {/* <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            /> */}
        </div>
    );
}

export default PatientHeartRate;
