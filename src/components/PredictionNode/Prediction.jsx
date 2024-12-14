import { Handle, Position } from '@xyflow/react';
import { useState, useEffect } from 'react';
import "../PatientInfoNode/Node.css"
function getUrgencyRanking(patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime) {
    let urgency = "Low"; // Default value

    if (patientWaitTime) {
        const waitTime = parseInt(patientWaitTime);
        console.log("Waittime", patientWaitTime);
        if (patientWaitTime === "over_30") {
            urgency = "Urgent"; // Always urgent if wait time > 30 mins
            return urgency;
        }
    }
    // Heart Rate logic
    if (patientHeartRate) {
        // If heart rate is less than 40 or more than 100, it's urgent
        if (patientHeartRate === '<40' || patientHeartRate === '>100') {
            urgency = "Urgent";
            return urgency;
        }
        // If heart rate is between 40-60 or 60-100, it's low urgency
        else if (patientHeartRate === '40-60' || patientHeartRate === '60-100') {
            if (urgency === "Low") urgency = "Low"; // Maintain low urgency unless overridden
        }
        // Additional heart rate check for rates between 60-80
        else if (patientHeartRate === '60-80') {
            urgency = "Medium";
        }
    }

    // Age logic
    if (patientAge) {
        const age = parseInt(patientAge);
        if (age < 12) {
            urgency = "Medium"; // Children are moderate urgency
        } else if (age > 75) {
            urgency = "Urgent"; // Elderly patients are urgent
        }
    }

    // Symptom severity logic
    if (patientSymptom) {
        const severeSymptoms = ["Chest pain", "Severe headache", "Difficulty breathing"];
        const moderateSymptoms = ["Mild headache", "Back pain", "Fatigue"];

        // Severe symptoms are always urgent
        if (severeSymptoms.includes(patientSymptom)) {
            urgency = "Urgent";
        }
        // Moderate symptoms are medium urgency
        else if (moderateSymptoms.includes(patientSymptom)) {
            urgency = urgency === "Low" ? "Medium" : urgency; // Promote to medium if not urgent
        }
    }

    // Severity level logic
    if (patientSeverity) {
        if (patientSeverity === "High") {
            urgency = "Urgent"; // High severity is always urgent
            return urgency;
        } else if (patientSeverity === "Medium") {
            urgency = urgency === "Low" ? "Medium" : urgency; // Promote to medium if not urgent
        }
    }

    // Wait time logic - This logic overrides everything

    console.log("Urgency is: ", urgency);
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
    console.log({ patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime });
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