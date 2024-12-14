import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import "./Node.css";

function PatientAge({ data }) {
    console.log("Age");

    const [age, setAge] = useState('');

    const onChange = useCallback((evt) => {
        const newAge = evt.target.value;
        setAge(newAge);
        localStorage.setItem('patientAge', newAge);
    }, []);

    return (
        <div className='glassmorphism'>
            <div className="form-group">
                <label htmlFor="age">Patient Age:</label>
                <input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={onChange}
                    className="input-field"
                />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </div>
    );
}

export default PatientAge;
