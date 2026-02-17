// frontend/src/submit.js
import { useStore } from './store'; // Store se data lene ke liye

export const handleSubmit = async (nodes, edges) => {
    try {
        const response = await fetch('/api/pipelines/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Critical fix for Backend
            },
            body: JSON.stringify({ nodes, edges }), // Sending pure JSON
        });

        if (response.ok) {
            const result = await response.json();
            
            // Alert
            alert(`
🎉 Pipeline Analysis Results
============================
• Number of Nodes: ${result.num_nodes}
• Number of Edges: ${result.num_edges}
• Is DAG (No Loops): ${result.is_dag ? 'Yes ✅' : 'No ❌'}
            `);
        } else {
            const errorData = await response.json();
            console.error('Backend Error:', errorData);
            alert(`Error: ${errorData.detail?.[0]?.msg || 'Validation failed'}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to connect to backend. Is uvicorn running?');
    }
};