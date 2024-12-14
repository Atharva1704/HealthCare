import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import "./Node.css";


function PatientHeartRate({ data }) {
    console.log("Heart Rate");

    const [heartRate, setHeartRate] = useState(data.value || '');

    const heartRateRanges = [
        { label: '<40', value: '<40' },
        { label: '40-60', value: '40-60' },
        { label: '60-100', value: '60-100' },
        { label: '>100', value: '>100' },
    ];

    const onHeartRateChange = useCallback((evt) => {
        const newHeartRate = evt.target.value;
        setHeartRate(newHeartRate);
        localStorage.setItem('patientHeartRate', newHeartRate);
    }, []);

    useEffect(() => {
        const savedHeartRate = localStorage.getItem('patientHeartRate');
        if (savedHeartRate) setHeartRate(savedHeartRate);
    }, []);

    return (
        <div className='glassmorphism'>
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

        </div>
    );
}

export default PatientHeartRate;
