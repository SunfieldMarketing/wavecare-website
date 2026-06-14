export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#050505',
      color: '#fff'
    }}>
      <div className="loader"></div>
      <style>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #00D1FF;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
