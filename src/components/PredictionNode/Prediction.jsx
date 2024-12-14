import { Handle, Position } from '@xyflow/react';
import "../PatientInfoNode/Node.css"

function getUrgencyRanking(patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime) {
    let urgency = "Low";

    if (patientWaitTime) {
        const waitTime = parseInt(patientWaitTime);
        console.log("Waittime", patientWaitTime);
        if (patientWaitTime === "over_30") {
            urgency = "Urgent";
            return urgency;
        }
    }
    if (patientHeartRate) {
        if (patientHeartRate === '<40' || patientHeartRate === '>100') {
            urgency = "Urgent";
            return urgency;
        }
        else if (patientHeartRate === '40-60' || patientHeartRate === '60-100') {
            if (urgency === "Low") urgency = "Low";
        }
        else if (patientHeartRate === '60-80') {
            urgency = "Medium";
        }
    }

    if (patientAge) {
        const age = parseInt(patientAge);
        if (age < 12) {
            urgency = "Medium";
        } else if (age > 75) {
            urgency = "Urgent";
        }
    }

    if (patientSymptom) {
        const severeSymptoms = ["Chest pain", "Severe headache", "Difficulty breathing"];
        const moderateSymptoms = ["Mild headache", "Back pain", "Fatigue"];

        if (severeSymptoms.includes(patientSymptom)) {
            urgency = "Urgent";
        }
        else if (moderateSymptoms.includes(patientSymptom)) {
            urgency = urgency === "Low" ? "Medium" : urgency;
        }
    }

    if (patientSeverity) {
        if (patientSeverity === "High") {
            urgency = "Urgent";
            return urgency;
        } else if (patientSeverity === "Medium") {
            urgency = urgency === "Low" ? "Medium" : urgency;
        }
    }


    console.log("Urgency is: ", urgency);
    return urgency;
}



function Prediction() {
    const patientAge = localStorage.getItem('patientAge');
    const patientHeartRate = localStorage.getItem('patientHeartRate');
    const patientSymptom = localStorage.getItem('patientSymptom');
    const patientSeverity = localStorage.getItem('patientSeverity');
    const patientWaitTime = localStorage.getItem('patientWaitTime');

    console.log({ patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime });
    const urgency = getUrgencyRanking(patientAge, patientHeartRate, patientSymptom, patientSeverity, patientWaitTime);

    const aggregatedData = [
        patientAge,
        patientHeartRate,
        patientSymptom,
        patientSeverity,
        patientWaitTime,
    ]
        .filter(Boolean)
        .join(', ');
    console.log("Data is;: ", aggregatedData);
    return (
        <div className='glassmorphism'>
            <Handle type="target" position={Position.Top} />
            <div>
                <h1>Prediction is: {urgency}</h1>
            </div>
        </div>
    );
}

export default Prediction;