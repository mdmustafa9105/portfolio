import React from 'react';

export const UiUxIcon: React.FC<{ color?: string }> = ({ color = '#65F43A' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 17.0917L3 12.0917L8 7.09174" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 7.09174L21 12.0917L16 17.0917" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 4.09174L9.5 20.0917" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
