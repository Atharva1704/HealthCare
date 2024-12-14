import { Handle, Position } from '@xyflow/react';
import { useState, useEffect } from 'react';
import "../PatientInfoNode/Node.css"

function getUrgencyRanking(patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime) {
    let urgency = "Low"; // Default value

    // Heart Rate logic
    if (patientHeartRate) {
        if (patientHeartRate === '<40' || patientHeartRate === '>100') {
            urgency = "Urgent";
        } else if (patientHeartRate === '40-60' || patientHeartRate === '60-100') {
            urgency = "Low";
        }
    }

    // Age logic
    if (patientAge) {
        if (parseInt(patientAge) < 12 || parseInt(patientAge) > 75) {
            urgency = "Urgent";
        }
    }

    // Symptom severity logic
    if (patientSymptom) {
        const severeSymptoms = ["Chest pain", "Severe headache", "Difficulty breathing"];
        if (severeSymptoms.includes(patientSymptom)) {
            urgency = "Urgent";
        }
    }

    // Severity level logic
    if (patientSeverity) {
        if (patientSeverity === "High") {
            urgency = "Urgent";
        } else if (patientSeverity === "Medium") {
            urgency = "Low";
        }
    }

    // Wait time logic
    if (patientWaitTime) {
        const waitTime = parseInt(patientWaitTime);
        if (waitTime > 30) {
            urgency = "Urgent";
        }
    }

    return urgency;
}

const handleStyle = { left: 10 };

function Prediction({ data }) {
    // Retrieve values from localStorage
    const patientAge = localStorage.getItem('patientAge');
    const patientHeartRate = localStorage.getItem('patientHeartRate');
    const patientSymptom = localStorage.getItem('patientSymptom');
    const patientSeverity = localStorage.getItem('patientSeverity');

    const patientWaitTime = localStorage.getItem('patientWaitTime');
    const urgency = getUrgencyRanking(patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime);

    // Combine retrieved values into a comma-separated string
    const aggregatedData = [
        patientAge,
        patientHeartRate,
        patientSymptom,
        patientSeverity,
        patientWaitTime,
    ]
        .filter(Boolean) // Filter out null or undefined values
        .join(', ');
    console.log("Data is;: ", aggregatedData);
    return (
        <div className='glassmorphism'>
            <Handle type="target" position={Position.Top} />
            <div>
                <h1>Prediction is: {urgency}</h1>
                {/* <p>{aggregatedData}</p> Display comma-separated data */}
            </div>
            {/* <Handle type="source" position={Position.Bottom} id="a" />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            /> */}
        </div>
    );
}

export default Prediction;