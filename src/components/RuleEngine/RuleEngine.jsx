import { useCallback, useState } from 'react';
import {
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useNodesState,
    useEdgesState,
    MiniMap,
    Controls,
    Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "./RuleEngine.css";
import PatientAge from '../PatientInfoNode/PatientAge';
import PatientWaitTime from '../PatientInfoNode/PatientWaitTime';
import PatientHeartRate from '../PatientInfoNode/PatientHeartRate';
import PatientSymptom from '../PatientInfoNode/PatientSymptom';
import Prediction from '../PredictionNode/Prediction';

const rfStyle = {
    backgroundColor: '#343434',
    borderRadius: '10px'
};

const defaultNodes = [
    {
        id: 'node-1',
        type: 'PatientAge',
        position: { x: 0, y: 0 },
        data: { value: '25' },
    },
    {
        id: 'node-2',
        type: 'PatientWaitTime',
        position: { x: 500, y: 0 },
        data: { value: '5_to_10' },
    },
    {
        id: 'node-3',
        type: 'PatientHeartRate',
        position: { x: 0, y: 200 },
        data: { value: '40-60' },
    },
    {
        id: 'node-4',
        type: 'PatientSymptom',
        position: { x: 500, y: 200 },
        data: { value: 'Headache' },
    },
    {
        id: 'node-5',
        type: 'Prediction',
        position: { x: 250, y: 400 },
        data: { aggregatedData: '' },
    },
];

const defaultEdges = [
    { id: 'e1-5', source: 'node-1', target: 'node-5' },
    { id: 'e2-5', source: 'node-2', target: 'node-5' },
    { id: 'e3-5', source: 'node-3', target: 'node-5' },
    { id: 'e4-5', source: 'node-4', target: 'node-5' },
];

const nodeTypes = { PatientAge, PatientWaitTime, PatientHeartRate, PatientSymptom, Prediction };

function RuleEngine() {
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

    const aggregateNodeData = useCallback(() => {
        const predictionNode = nodes.find((node) => node.type === 'Prediction');
        if (!predictionNode) return;

        const connectedNodeIds = edges
            .filter((edge) => edge.target === predictionNode.id)
            .map((edge) => edge.source);

        const aggregatedData = connectedNodeIds
            .map((nodeId) => nodes.find((node) => node.id === nodeId)?.data.value)
            .filter(Boolean) 
            .join(', ');

        setNodes((nds) =>
            nds.map((node) =>
                node.id === predictionNode.id
                    ? { ...node, data: { ...node.data, aggregatedData } }
                    : node
            )
        );
    }, [nodes, edges, setNodes]);

    const onNodesChanges = useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    const onEdgesChanges = useCallback(
        (changes) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
        },
        [setEdges]
    );

    const onConnect = useCallback(
        (connection) => {
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    return (
        <div className='rule-engine-container'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={rfStyle}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            <button className="aggregate-button" onClick={aggregateNodeData}>
                Check Urgency
            </button>
        </div>
    );
}

export default RuleEngine;