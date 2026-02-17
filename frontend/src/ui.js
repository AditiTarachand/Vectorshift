// frontend/src/ui.js
import 'reactflow/dist/style.css';
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Nodes Import
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TranslationNode, APINode, LogicNode, DatabaseNode, NoteNode } from './nodes/fiveNodes';

// Logic Import
import { handleSubmit } from './submit'; 

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  translator: TranslationNode,
  api: APINode,
  logic: LogicNode,
  database: DatabaseNode,
  note: NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
            if (!type) return;

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: { id: nodeID, nodeType: `${type}` },
            };
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        
        <div ref={reactFlowWrapper} style={{ width: '100vw', height: 'calc(100vh - 80px)', backgroundColor: '#0f172a', position: 'relative' }}>
            
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                connectionLineStyle={{ stroke: '#f8fafc' }} 
            >
                <Background variant={BackgroundVariant.Dots} gap={gridSize} size={2} color="#475569" />
                <Controls />
                <MiniMap nodeColor="#8b5cf6" maskColor="rgba(15, 23, 42, 0.8)" style={{ backgroundColor: '#0f172a' }} />
            </ReactFlow>

           
            <div style={{
                position: 'absolute', 
                bottom: '30px',       
                left: '50%',          
                transform: 'translateX(-50%)', // Exact center alignment
                zIndex: 10            // Nodes for showing up
            }}>
                <button 
                    onClick={() => handleSubmit(nodes, edges)}
                    style={{
                        padding: '12px 40px',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Submit Pipeline
                </button>
            </div>
        </div>
    );
};