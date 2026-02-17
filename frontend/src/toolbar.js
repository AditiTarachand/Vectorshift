// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '20px', 
            background: '#151b2d', /* Darker than node but lighter than body */
            borderBottom: '1px solid #334155',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            overflowX: 'auto' /* If small screen then scroll */
        }}>
            <div style={{ 
                color: '#e2e8f0', 
                fontSize: '18px', 
                fontWeight: 'bold',
                marginRight: '10px',
                borderRight: '1px solid #334155',
                paddingRight: '20px'
            }}>
                VectorShift <span style={{color: '#7c3aed', fontSize: '12px'}}>Pipeline</span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                
                {/* Divider for new nodes */}
                <div style={{width: '1px', background: '#334155', margin: '0 5px'}}></div>

                <DraggableNode type='translator' label='Translator' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='logic' label='Filter' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='note' label='Note' />
            </div>
        </div>
    );
};