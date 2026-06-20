import React from 'react';

const Icon = ({ children, size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" stroke={color} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    {children}
  </svg>
);

export const DiamondSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M12 2L2 9L12 22L22 9L12 2Z" />
    <path d="M2 9H22" />
    <path d="M8 9L12 2M16 9L12 2" />
  </Icon>
);

export const GraduationSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M22 10V6L12 2L2 6L12 10L22 6" />
    <path d="M6 12V17L12 20L18 17V12" />
    <path d="M22 6V10" />
  </Icon>
);

export const BoltSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={color} stroke="none" />
  </Icon>
);

export const CheckSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M20 6L9 17L4 12" />
  </Icon>
);

export const CheckCircleSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01L9 11.01" />
  </Icon>
);

export const PhoneSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.66 21 20.33 21.01 20 21.01C10.61 21.01 3 13.4 3 3.99C3 3.67 3.01 3.34 3.03 3.01C3.07 2.45 3.52 2.01 4.08 2.01H7.08C7.58 2.01 8 2.38 8.06 2.88C8.12 3.34 8.22 3.79 8.36 4.22C8.5 4.64 8.39 5.11 8.07 5.43L6.62 6.88C8.06 9.51 10.49 11.94 13.12 13.38L14.57 11.93C14.89 11.61 15.36 11.5 15.78 11.64C16.21 11.78 16.66 11.88 17.12 11.94C17.62 12 17.99 12.42 17.99 12.92V16.92H22Z" />
  </Icon>
);

export const EmailSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7L12 13L22 7" />
  </Icon>
);

export const WhatsAppSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke={color} strokeWidth="1" fill="none"/>
  </svg>
);

export const LocationSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" />
    <circle cx="12" cy="9" r="3" />
  </Icon>
);

export const LockSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

export const ClockSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6V12L16 14" />
  </Icon>
);

export const GlobeSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12H22" />
    <path d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" />
  </Icon>
);

export const BookSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" />
  </Icon>
);

export const UsersSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M17 21V19A4 4 0 0 0 13 15H5A4 4 0 0 0 1 19V21" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21V19A4 4 0 0 0 16 15.13" />
    <path d="M16 3.13A4 4 0 0 1 16 11" />
  </Icon>
);

export const CreditCardSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <path d="M1 10H23" />
  </Icon>
);

export const DollarSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5A3.5 3.5 0 0 0 6 8.5C6 10.5 7.5 12 9.5 12H14.5C16.5 12 18 13.5 18 15.5A3.5 3.5 0 0 1 14.5 19H6" />
  </Icon>
);

export const BarChartSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </Icon>
);

export const CalendarSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const PlusSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const LogoutSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M9 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H9" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Icon>
);

export const UserSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const StarSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export const ZoomSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <rect x="2" y="4" width="15" height="13" rx="2" />
    <path d="M17 9.5L22 7V14L17 11.5" />
  </Icon>
);

export const ShieldSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" />
    <path d="M9 12L11 14L15 10" />
  </Icon>
);

export const MessageSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" />
  </Icon>
);

export const InboxSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V12L18.55 5.11A2 2 0 0 0 16.76 4H7.24A2 2 0 0 0 5.45 5.11Z" />
  </Icon>
);

export const ExternalLinkSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M18 13V19A2 2 0 0 1 16 21H5A2 2 0 0 1 3 19V8A2 2 0 0 1 5 6H11" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </Icon>
);

export const CelebrationSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M10 17L5 22L3 18L8 13M10 17L14 13M10 17L13 20M14 13L19 8L21 12L16 17M14 13L11 10" />
    <circle cx="18" cy="6" r="2" fill={color} stroke="none" />
    <circle cx="6" cy="18" r="2" fill={color} stroke="none" />
  </Icon>
);

export const GemSVG = ({ size = 24, color = 'currentColor', style = {} }) => (
  <Icon size={size} color={color} style={style}>
    <path d="M6 3H18L22 9L12 22L2 9L6 3Z" />
    <path d="M2 9H22" />
    <path d="M12 3L8 9L12 22L16 9L12 3Z" />
  </Icon>
);