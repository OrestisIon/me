// Temporary debug component to check environment variables
export default function EnvDebug() {
  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      background: 'black',
      color: 'lime',
      padding: '10px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      border: '2px solid lime'
    }}>
      <div>REACT_APP_ADMIN_CODE: {process.env.REACT_APP_ADMIN_CODE || 'NOT SET'}</div>
      <div>All env vars: {Object.keys(process.env).filter(k => k.startsWith('REACT_APP_')).join(', ')}</div>
    </div>
  );
}
