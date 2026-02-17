// frontend/src/nodes/fiveNodes.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

// 1. TRANSLATION NODE (Transformation)
export const TranslationNode = ({ id, data }) => {
  const [lang, setLang] = useState('French');
  
  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Language Translator"
      icon="🌐" 
      handles={[
        { id: 'input', type: 'target', position: Position.Left, style: { top: '50%' } },
        { id: 'translated', type: 'source', position: Position.Right, style: { top: '50%' } }
      ]}
    >
      <label style={{ display: 'block', color: '#cbd5e1' }}>Target Language:</label>
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
      >
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Hindi">Hindi</option>
      </select>
      <div style={{ fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>
        Converts input text to {lang}.
      </div>
    </BaseNode>
  );
};

// 2. API CALL NODE (External Data)
export const APINode = ({ id, data }) => {
    const [method, setMethod] = useState('GET');

    return (
      <BaseNode 
        id={id} 
        data={data} 
        title="API Request"
        icon="🔌"
        handles={[
          { id: 'params', type: 'target', position: Position.Left, style: { top: '40%' } },
          { id: 'response', type: 'source', position: Position.Right, style: { top: '60%' } }
        ]}
      >
        <div style={{display:'flex', gap: '5px'}}>
            <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ width: '80px', padding: '5px', borderRadius: '4px', background: '#0f172a', color: '#fff', border: '1px solid #475569'}}>
                <option>GET</option>
                <option>POST</option>
            </select>
            <input type="text" placeholder="https://api..." style={{ flex: 1, padding: '5px', borderRadius: '4px', background: '#0f172a', color: '#fff', border: '1px solid #475569'}} />
        </div>
      </BaseNode>
    );
};

// 3. LOGIC/FILTER NODE (Control Flow)
export const LogicNode = ({ id, data }) => {
    return (
      <BaseNode 
        id={id} 
        data={data} 
        title="Logic Filter"
        icon="⚡"
        handles={[
          { id: 'input', type: 'target', position: Position.Left, style: { top: '50%' } },
          { id: 'true', type: 'source', position: Position.Right, style: { top: '30%', background: '#22c55e' } }, // Green for True
          { id: 'false', type: 'source', position: Position.Right, style: { top: '70%', background: '#ef4444' } } // Red for False
        ]}
      >
        <label style={{color: '#cbd5e1'}}>If Input Contains:</label>
        <input type="text" placeholder="e.g. 'Error'" style={{ width: '100%', padding: '5px', borderRadius: '4px', background: '#0f172a', color: '#fff', border: '1px solid #475569'}} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: '5px', color: '#94a3b8' }}>
            <span>Then → Top</span>
            <span>Else → Bottom</span>
        </div>
      </BaseNode>
    );
};

// 4. DATABASE NODE (Storage)
export const DatabaseNode = ({ id, data }) => {
    return (
      <BaseNode 
        id={id} 
        data={data} 
        title="Save to DB"
        icon="🗄️"
        handles={[
          { id: 'data', type: 'target', position: Position.Left, style: { top: '50%' } }
        ]}
      >
        <label style={{color: '#cbd5e1'}}>Table Name:</label>
        <input type="text" placeholder="users_table" style={{ width: '100%', padding: '5px', borderRadius: '4px', background: '#0f172a', color: '#fff', border: '1px solid #475569'}} />
        <div style={{ marginTop: '5px', padding: '5px', background: '#334155', borderRadius: '4px', fontSize: '10px', textAlign: 'center' }}>
            Status: Ready 🟢
        </div>
      </BaseNode>
    );
};

// 5. NOTE NODE (Documentation - No Handles)
export const NoteNode = ({ id, data }) => {
    return (
      <BaseNode 
        id={id} 
        data={data} 
        title="Sticky Note"
        icon="📝"
        handles={[]} // No connections needed for notes
      >
        <textarea 
            placeholder="Write comments here..." 
            style={{ 
                width: '100%', 
                height: '60px', 
                background: '#fef3c7', // Yellow sticky note color
                color: '#451a03', 
                border: 'none', 
                borderRadius: '4px',
                padding: '8px',
                resize: 'none'
            }}
        />
      </BaseNode>
    );
};