import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center transition-all duration-300 hover:scale-[1.01] ${className || ''}`}>
      <svg 
        id="Layer_1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 100"
        className="h-10 w-auto"
        aria-label="SwarupS NXT Logo"
      >
        {/* Brand Text: SwarupS (#2d3694) */}
        <text 
          transform="translate(123.66 56.8)" 
          className="fill-[#2d3694] dark:fill-white transition-colors duration-500"
          style={{ 
            fontSize: '59.17px', 
            letterSpacing: '-.02em', 
            fontFamily: "'Suez One', serif" 
          }}
        >
          <tspan x="0" y="0">SwarupS</tspan>
        </text>

        {/* Brand Text: NXT (#3bc1cf) */}
        <text 
          transform="translate(312.52 88.01)" 
          className="fill-[#3bc1cf] transition-colors duration-500"
          style={{ 
            fontSize: '36.41px', 
            letterSpacing: '-.02em', 
            fontFamily: "'Suez One', serif" 
          }}
        >
          <tspan x="0" y="0">NXT</tspan>
        </text>

        {/* Neural Geometric Icon Components */}
        <g className="transition-opacity duration-500">
          {/* Accent Blue Components (#3bc1cf) */}
          <rect className="fill-[#3bc1cf]" x="84.76" y="16.73" width="8.47" height="47.79" transform="translate(177.98 81.25) rotate(180)"/>
          <rect className="fill-[#3bc1cf]" x="33.66" y="46.67" width="8.47" height="36.41"/>
          
          <path className="fill-[#3bc1cf]" d="M92.7,58.02h-8.4s-.02,11.69-.02,11.89c0,4.59-3.72,8.31-8.31,8.31s-8.31-3.72-8.31-8.31c0-.2-.04-.63-.02-.83V31.38c0-.2,0-.78,0-.98,0-9.24-7.49-16.73-16.73-16.73s-16.73,7.49-16.73,16.73c0,.2,0,.39.02.59h-.02v12.63h8.4v-12.61h.05c-.01-.2-.03-.4-.03-.6,0-4.59,3.72-8.31,8.31-8.31s8.31,3.72,8.31,8.31c0,.2.04.78.02.98v37.7c0,.2,0,.63,0,.83,0,9.24,7.49,16.73,16.73,16.73s16.73-7.49,16.73-16.73c0-.16,0-.31-.01-.46h.01v-11.43Z"/>
          
          {/* Main Brand Path (#2d3694) with dark mode white fallback */}
          <path 
            className="fill-[#2d3694] dark:fill-white transition-colors duration-500"
            d="M109.27,5.69h-60.68c-.07,0-.14,0-.21.01-13.3.23-24.01,11.07-24.01,24.43s10.94,24.44,24.44,24.44c3.44,0,26.42.62,26.74.62,8.19,0,14.83,6.64,14.83,14.83s-6.06,14.22-13.73,14.78c-.02,0-.05,0-.07,0H15.88c-2.62,0-4.75,2.13-4.75,4.75s2.13,4.75,4.75,4.75h60.68c.22,0,.43-.02.64-.05,12.81-.76,22.97-11.39,22.97-24.39s-10.94-24.44-24.44-24.44c-3.44,0-26.42-.62-26.74-.62-8.19,0-14.83-6.64-14.83-14.83s6.18-14.36,13.98-14.8c.15.01.29.02.44.02h60.68c2.62,0,4.75-2.13,4.75-4.75s-2.13-4.75-4.75-4.75Z"
          />
          <rect className="fill-[#3bc1cf]" x="59.25" y="42.47" width="8.4" height="14.33"/>
        </g>
      </svg>
    </div>
  );
};

export default Logo;