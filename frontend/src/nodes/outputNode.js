// frontend/src/nodes/outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon="📤"
      handles={[
        // Regular Target Handle (Left side - for Data recieve )
        { id: 'value', type: 'target', position: Position.Left },

        // 🔴 TEST HANDLE (Right side - Loop wapas bhejne ke liye)
        { 
          id: 'test-source', 
          type: 'source', 
          position: Position.Right, 
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
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
            style={{background: '#0f172a', color: 'white', border: '1px solid #334155', borderRadius: '4px', padding: '6px'}}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
    </BaseNode>
  );
}
