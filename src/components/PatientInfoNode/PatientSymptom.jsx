import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import "./Node.css";

const handleStyle = { left: 10 };

function PatientSymptom({ data }) {
    console.log("Symptom");

    const [symptom, setSymptom] = useState(''); 
    const [severity, setSeverity] = useState('Mild'); 

    const symptomsList = [
        'Heart Pain',
        'Headache',
        'Abdominal Pain',
        'Chest Pain',
        'Nausea',
        'Shortness of Breath'
    ];

    const severityLevels = ['Mild', 'Moderate', 'Severe'];

    const onSymptomChange = useCallback((evt) => {
        const selectedSymptom = evt.target.value;
        setSymptom(selectedSymptom);
        localStorage.setItem('patientSymptom', selectedSymptom); 
        console.log("Symptom Changed:", selectedSymptom); 
    }, []);

    const onSeverityChange = useCallback((evt) => {
        const selectedSeverity = evt.target.value;
        setSeverity(selectedSeverity);
        localStorage.setItem('patientSeverity', selectedSeverity); 
        console.log("Severity Changed:", selectedSeverity); 
    }, []);

    useEffect(() => {
        const savedSymptom = localStorage.getItem('patientSymptom');
        const savedSeverity = localStorage.getItem('patientSeverity');
        if (savedSymptom) {
            setSymptom(savedSymptom); 
        }
        if (savedSeverity) {
            setSeverity(savedSeverity); 
        }
        console.log("Loaded from localStorage - Symptom:", savedSymptom, "Severity:", savedSeverity); 
    }, []);

    return (
        <div className='glassmorphism'>
            <div className="form-group">
                <label htmlFor="symptom">Patient Symptoms</label>
                <select
                    id="symptom"
                    value={symptom} 
                    onChange={onSymptomChange} 
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
                    value={severity} 
                    onChange={onSeverityChange}
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
