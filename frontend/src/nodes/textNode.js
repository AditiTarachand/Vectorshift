import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store'; // Store import karein

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([{ id: 'output', type: 'source', position: Position.Right }]);
  const updateNodeField = useStore((state) => state.updateNodeField);

  
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText); // Store mein save karein
  };

 
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
        matches.add(match[1]);
    }

    const newHandles = Array.from(matches).map((variable, index) => ({
        id: variable, // ID sirf variable name hoga (e.g. 'input1')
        type: 'target',
        position: Position.Left,
        style: { top: `${(index + 1) * 20 + 30}px` }
    }));

    // Always add output handle
    newHandles.push({ id: 'output', type: 'source', position: Position.Right });
    setHandles(newHandles);
  }, [currText]);

  return (
   <BaseNode 
  key={`node-${id}-${handles.length}`} // <--- Ye line add karein
  id={id} 
  data={data} 
  title="Text Processor" 
  handles={handles}
>
        <label>
            <span>Variables detected: {handles.length - 1}</span>
            <textarea 
                value={currText} 
                onChange={handleTextChange} 
                style={{ width: '100%', minHeight: '60px', background: '#0f172a', color: '#fff' }}
            />
        </label>
    </BaseNode>
  );
};