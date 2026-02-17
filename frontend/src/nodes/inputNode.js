
// frontend/src/nodes/inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode'; 

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon="📥"
      handles={[
       
        { id: 'value', type: 'source', position: Position.Right },
        
       
        { 
          id: 'test-target', 
          type: 'target', 
          position: Position.Left, 
          style: { top: '50%', background: '#ef4444', width: '10px', height: '10px' } 
        } 
      ]}
    >
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
          <span style={{color: '#cbd5e1'}}>Field Name:</span>
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            style={{background: '#0f172a', color: 'white', border: '1px solid #334155', borderRadius: '4px', padding: '6px'}}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
          <span style={{color: '#cbd5e1'}}>Type:</span>
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            style={{background: '#0f172a', color: 'white', border: '1px solid #334155', borderRadius: '4px', padding: '6px'}}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
    </BaseNode>
  );
}