export const Viewfinder = () => (
  <svg
    width="50px"
    viewBox="0 0 100 100"
    fill="none"
    stroke="rgba(255, 0, 0, 0.5)"
    strokeWidth="5"
    style={{
      top: 0,
      left: 0,
      zIndex: 1,
      boxSizing: 'border-box',
      border: '50px solid rgba(0, 0, 0, 0.3)',
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}>
    <path d="M13,0 L0,0 L0,13" />
    <path d="M0,87 L0,100 L13,100" />
    <path d="M87,100 L100,100 L100,87" />
    <path d="M100,13 L100,0 87,0" />
  </svg>
);
