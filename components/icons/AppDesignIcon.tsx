import React from 'react';

export const AppDesignIcon: React.FC<{ color?: string }> = ({ color = '#65F43A' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
    </svg>
);
