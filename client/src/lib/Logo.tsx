import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "h-14" }) => {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M136.5 70.2C147.5 81.2 147.5 99.2 136.5 110.2L101.5 145.2C90.5 156.2 72.5 156.2 61.5 145.2C50.5 134.2 50.5 116.2 61.5 105.2L96.5 70.2C107.5 59.2 125.5 59.2 136.5 70.2Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M60 110L50 100L40 110L30 100M60 100L65 105L70 100"
        stroke="url(#paint1_linear)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="84" cy="150" r="6" fill="url(#paint2_linear)" />
      <circle cx="60" cy="150" r="6" fill="url(#paint3_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="61.5"
          y1="61.5"
          x2="136.5"
          y2="145.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BFFF" />
          <stop offset="1" stopColor="#0000FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="30"
          y1="100"
          x2="70"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BFFF" />
          <stop offset="1" stopColor="#0000FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="78"
          y1="144"
          x2="90"
          y2="156"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BFFF" />
          <stop offset="1" stopColor="#0000FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="54"
          y1="144"
          x2="66"
          y2="156"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BFFF" />
          <stop offset="1" stopColor="#0000FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
