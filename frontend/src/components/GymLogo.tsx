import React from 'react';

interface GymLogoProps {
  variant?: 'transparent' | 'dark' | 'light';
  className?: string;
  size?: number | string;
}

export default function GymLogo({ variant = 'transparent', className = '', size = '100%' }: GymLogoProps) {
  // Config background color based on variants
  const getBackgroundColor = () => {
    if (variant === 'dark') return 'url(#bgGrad)';
    if (variant === 'light') return '#F4F4F5'; // Clean light grey/white background
    return 'none'; // Transparent background
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      width={size} 
      height={size} 
      className={className}
    >
      <defs>
        {/* Background Gradients */}
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#141416" />
          <stop offset="100%" stopColor="#070708" />
        </radialGradient>

        {/* Gold Metallic Gradients */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3A8" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#FDF0A6" />
        </linearGradient>

        <linearGradient id="goldStroke" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#AA7C11" />
          <stop offset="50%" stopColor="#FFF3A8" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>

        {/* Crimson Gradients */}
        <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF2E54" />
          <stop offset="100%" stopColor="#9B0019" />
        </linearGradient>

        {/* Shadow Filters for 3D bevel effect */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
        </filter>

        <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer Boundary (Filled with selected background color) */}
      <circle 
        cx="250" 
        cy="250" 
        r="230" 
        fill={getBackgroundColor()} 
        stroke="url(#goldStroke)" 
        strokeWidth="6" 
        filter="url(#dropShadow)" 
      />
      
      {/* Inner Rings */}
      <circle cx="250" cy="250" r="215" fill="none" stroke="#D90429" strokeWidth="4" strokeDasharray="8 4" opacity="0.8" />
      <circle cx="250" cy="250" r="205" fill="none" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.5" />

      {/* Symmetrical Circular Frame (Behind Athlete) */}
      <path d="M 100 250 A 150 150 0 0 1 400 250" fill="none" stroke="url(#crimsonGrad)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />

      {/* Athlete Bodybuilder Silhouette */}
      <g fill={variant === 'light' ? '#27272A' : '#EAEAEA'} filter="url(#dropShadow)">
        {/* Trapezius and Neck */}
        <path d="M 230 155 Q 250 145 270 155 L 265 175 L 235 175 Z" />
        {/* Head/Face Silhouette */}
        <path d="M 238 140 Q 238 120 250 120 Q 262 120 262 140 Q 262 150 250 150 Q 238 150 238 140 Z" />
        {/* Beard Detail */}
        <path d="M 242 142 L 250 149 L 258 142 L 250 145 Z" fill="#111" />
        {/* Shoulders / Deltoids */}
        <path d="M 180 185 Q 215 175 235 182 L 220 215 Q 190 215 180 185 Z" />
        <path d="M 320 185 Q 285 175 265 182 L 280 215 Q 310 215 320 185 Z" />
        {/* Chest / Pectorals */}
        <path d="M 215 185 L 250 190 L 285 185 Q 290 220 250 225 Q 210 220 215 185 Z" fill={variant === 'light' ? '#FFFFFF' : '#FFFFFF'} />
        {/* Abs / Midsection */}
        <path d="M 224 228 L 276 228 L 268 280 L 232 280 Z" fill={variant === 'light' ? '#52525B' : '#D2D2D2'} />
        {/* Arms / Biceps */}
        <path d="M 180 185 Q 165 210 185 235 L 220 235 Q 210 200 180 185 Z" />
        <path d="M 320 185 Q 335 210 315 235 L 280 235 Q 290 200 320 185 Z" />
      </g>

      {/* Heavy Barbell */}
      <g filter="url(#dropShadow)">
        {/* Bar Shaft */}
        <rect x="70" y="238" width="360" height="8" rx="4" fill="url(#goldStroke)" />
        {/* Hand Grips */}
        <rect x="180" y="234" width="16" height="16" rx="2" fill="#D90429" />
        <rect x="304" y="234" width="16" height="16" rx="2" fill="#D90429" />
        {/* Loaded Plates Left */}
        <rect x="75" y="200" width="12" height="84" rx="3" fill={variant === 'light' ? '#3F3F46' : '#D2D2D2'} />
        <rect x="89" y="205" width="14" height="74" rx="3" fill="#18181B" stroke="#555" strokeWidth="2" />
        <rect x="105" y="210" width="16" height="64" rx="3" fill={variant === 'light' ? '#E4E4E7' : '#EAEAEA'} />
        {/* Collar Lock Left */}
        <circle cx="127" cy="242" r="8" fill="url(#goldGrad)" />

        {/* Loaded Plates Right */}
        <rect x="413" y="200" width="12" height="84" rx="3" fill={variant === 'light' ? '#3F3F46' : '#D2D2D2'} />
        <rect x="397" y="205" width="14" height="74" rx="3" fill="#18181B" stroke="#555" strokeWidth="2" />
        <rect x="379" y="210" width="16" height="64" rx="3" fill={variant === 'light' ? '#E4E4E7' : '#EAEAEA'} />
        {/* Collar Lock Right */}
        <circle cx="373" cy="242" r="8" fill="url(#goldGrad)" />
      </g>

      {/* Golden Crown */}
      <g fill="url(#goldGrad)" stroke="#A57A0F" strokeWidth="1" filter="url(#dropShadow)" transform="translate(0, -5)">
        <path d="M 230 108 L 270 108 L 268 114 L 232 114 Z" />
        <path d="M 230 108 L 226 90 L 238 98 L 250 82 L 262 98 L 274 90 L 270 108 Z" />
        <circle cx="226" cy="88" r="2.5" fill="#FFF" />
        <circle cx="250" cy="80" r="3.5" fill="#FFF" />
        <circle cx="274" cy="88" r="2.5" fill="#FFF" />
        <circle cx="250" cy="100" r="2" fill="#D90429" />
      </g>

      {/* Centerpiece: "MBF" Typography */}
      <g filter="url(#dropShadow)">
        <text 
          x="250" 
          y="360" 
          fontFamily="Georgia, 'Times New Roman', serif" 
          fontSize="82" 
          fontWeight="900" 
          fill="url(#goldGrad)" 
          stroke="#503A07"
          strokeWidth="2"
          textAnchor="middle" 
          letterSpacing="4"
          filter="url(#textGlow)"
        >
          MBF
        </text>
      </g>

      {/* Bottom Ribbon / Banner */}
      <g filter="url(#dropShadow)">
        <path d="M 90 380 L 410 380 Q 430 405 410 430 L 90 430 Q 70 405 90 380 Z" fill="url(#crimsonGrad)" stroke="url(#goldStroke)" strokeWidth="3.5" />
        <path d="M 90 380 L 65 395 L 90 410 Z" fill="#9B0019" />
        <path d="M 410 380 L 435 395 L 410 410 Z" fill="#9B0019" />

        <text 
          x="250" 
          y="414" 
          fontFamily="'Impact', 'Arial Black', sans-serif" 
          fontSize="28" 
          fontWeight="bold" 
          fill="#FFFFFF" 
          textAnchor="middle" 
          letterSpacing="2"
        >
          MUSCLE BAR FITNESS
        </text>
      </g>

      {/* Tagline */}
      <text 
        x="250" 
        y="465" 
        fontFamily="'Courier New', Courier, monospace, sans-serif" 
        fontSize="12" 
        fontWeight="bold" 
        fill={variant === 'light' ? '#71717A' : '#A3A3A3'} 
        textAnchor="middle" 
        letterSpacing="2"
      >
        STRENGTH • DISCIPLINE • TRANSFORMATION
      </text>
    </svg>
  );
}
