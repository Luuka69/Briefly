interface BrieflyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrieflyLogo({ className = '', size = 'md' }: BrieflyLogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="brieflyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#brieflyGradient)" />
      
      {/* Letter B stylized */}
      <path
        d="M30 25 L30 75 L52 75 C58 75 65 72 65 63 C65 57 62 53 57 52 C61 51 63 47 63 42 C63 33 58 25 50 25 Z M38 33 L48 33 C52 33 55 35 55 40 C55 45 52 47 48 47 L38 47 Z M38 54 L50 54 C54 54 57 56 57 61 C57 66 54 68 50 68 L38 68 Z"
        fill="white"
      />
      
      {/* Notification dot */}
      <circle cx="72" cy="28" r="8" fill="#EF4444" />
      <circle cx="72" cy="28" r="6" fill="#F87171" />
      
      {/* Sparkle effect */}
      <path
        d="M75 18 L76 20 L78 21 L76 22 L75 24 L74 22 L72 21 L74 20 Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}
