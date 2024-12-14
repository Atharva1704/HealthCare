import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import "./Node.css";

const handleStyle = { left: 10 };

function PatientSymptom({ data }) {
    console.log("Symptom");

    const [symptom, setSymptom] = useState(''); // Start with empty string
    const [severity, setSeverity] = useState('Mild'); // Default severity level

    // Problem categories for selection
    const symptomsList = [
        'Heart Pain',
        'Headache',
        'Abdominal Pain',
        'Chest Pain',
        'Nausea',
        'Shortness of Breath'
    ];

    // Severity levels
    const severityLevels = ['Mild', 'Moderate', 'Severe'];

    // Save the updated symptom and severity values to localStorage
    const onSymptomChange = useCallback((evt) => {
        const selectedSymptom = evt.target.value;
        setSymptom(selectedSymptom);
        localStorage.setItem('patientSymptom', selectedSymptom); // Save to localStorage
        console.log("Symptom Changed:", selectedSymptom); // Debug log
    }, []);

    const onSeverityChange = useCallback((evt) => {
        const selectedSeverity = evt.target.value;
        setSeverity(selectedSeverity);
        localStorage.setItem('patientSeverity', selectedSeverity); // Save to localStorage
        console.log("Severity Changed:", selectedSeverity); // Debug log
    }, []);

    useEffect(() => {
        // Initialize symptom and severity from localStorage (if available)
        const savedSymptom = localStorage.getItem('patientSymptom');
        const savedSeverity = localStorage.getItem('patientSeverity');
        if (savedSymptom) {
            setSymptom(savedSymptom); // Set symptom state from localStorage
        }
        if (savedSeverity) {
            setSeverity(savedSeverity); // Set severity state from localStorage
        }
        console.log("Loaded from localStorage - Symptom:", savedSymptom, "Severity:", savedSeverity); // Debug log
    }, []);

    return (
        <div className='glassmorphism'>
            <div className="form-group">
                <label htmlFor="symptom">Patient Symptoms</label>
                <select
                    id="symptom"
                    value={symptom} // Bind to symptom state
                    onChange={onSymptomChange} // Update symptom state on change
                >
                    <option value="">None</option>
                    {symptomsList.map((symptom, index) => (
                        <option key={index} value={symptom}>
                            {symptom}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="severity">Severity Level</label>
                <select
                    id="severity"
                    value={severity} // Bind to severity state
                    onChange={onSeverityChange} // Update severity state on change
                >
                    {severityLevels.map((level, index) => (
                        <option key={index} value={level}>
                            {level}
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

export default PatientSymptom;
