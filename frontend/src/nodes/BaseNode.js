// frontend/src/nodes/BaseNode.js
import { Handle } from 'reactflow';

// 1. Styling Constants
const nodeStyles = {
  background: '#1e293b',
  color: '#f8fafc',
  border: '1px solid #475569',
  borderRadius: '8px',
  minWidth: '220px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative', // Critical for absolute handle positioning
};

const headerStyles = {
  background: '#334155',
  padding: '8px 12px',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
};

const contentStyles = {
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontSize: '12px',
};

const handleStyle = {
  width: '10px',
  height: '10px',
  background: '#7c3aed',
  border: '2px solid #fff',
  zIndex: 10,
};

// 2. The BaseNode Component
export const BaseNode = ({ id, data, title, children, handles = [], icon }) => {
  return (
    <div style={nodeStyles}>
      {/* Header Section */}
      <div style={headerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
          <span>{title}</span>
        </div>
        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{id}</span>
      </div>

      {/* Body Section */}
      <div style={contentStyles}>
        {children}
      </div>

      {/* Rendering Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          
          
         id={`${id}-${handle.id}`} 
    style={{ ...handleStyle, ...handle.style, zIndex: 10 }}
        />
      ))}
    </div>
  );
};