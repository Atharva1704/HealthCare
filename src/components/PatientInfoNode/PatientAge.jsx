import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import "./Node.css"; // Import the custom CSS file

const handleStyle = { left: 10 };

function PatientAge({ data }) {
    console.log("Age");

    const [age, setAge] = useState(''); // Initially empty state

    const onChange = useCallback((evt) => {
        const newAge = evt.target.value;
        setAge(newAge); // Update the state with the new value

        // Save the updated value to localStorage
        localStorage.setItem('patientAge', newAge);
    }, []);

    return (
        <div className='glassmorphism'>
            <div className="form-group">
                <label htmlFor="age">Patient Age:</label>
                {/* Replace the Material-UI TextField with a standard HTML input */}
                <input
                    id="age"
                    type="number" // Age input should be a number
                    placeholder="Enter age"
                    value={age}  // Bind input value to state
                    onChange={onChange}  // Handle input change
                    className="input-field"
                />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </div>
    );
}

export default PatientAge;
