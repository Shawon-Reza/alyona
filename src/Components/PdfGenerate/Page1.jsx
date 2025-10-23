import React from 'react';
// import bgImage from '../../assets/bg.png'; // Make sure to use the correct image path

const Page1 = () => {
  return (
    <div
      className="pdf-page"
      style={{
        width: '794px',      // A4 width @ 96dpi
        height: '1123px',    // A4 height @ 96dpi
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Background image */}
      <img
        src="https://w0.peakpx.com/wallpaper/34/624/HD-wallpaper-autumn-fall-nature-nature-fall-autumn-autumn-road-road-beautiful-autumn-thumbnail.jpg"
        alt="Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Bottom Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to top, #f5e9df, transparent)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '40px',
          right: '40px',
          zIndex: 2,
          textAlign: 'left',
          color: '#1e1b4b',
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
          YOUR SKIN TRENDS REPORT
        </p>

        <h1 style={{ fontSize: '40px', fontWeight: '700', margin: '0 0 8px' }}>
          July 2025
        </h1>

        <p style={{ fontSize: '14px', color: '#222' }}>
          Personalized recommendations based on your unique profile
        </p>
      </div>

      {/* Logo Icon Top-Left */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 2,
        }}
      >
        <svg
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
          <path d="M8 14s1.5-2 4-2 4 2 4 2" />
          <path d="M9 9h.01" />
          <path d="M15 9h.01" />
        </svg>
      </div>
    </div>
  );
};

export default Page1;
