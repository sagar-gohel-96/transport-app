import React from 'react';

export const RupeeGrow = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props}>
      <path d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 16H2V2h14v14z" />
      <path d="M3.25 4.72h5v1.5h-5zM10 12.75h5v1.5h-5zm0-2.5h5v1.5h-5zM5 15h1.5v-2h2v-1.5h-2v-2H5v2H3V13h2zm6.09-7.05l1.41-1.41 1.41 1.41 1.06-1.06-1.41-1.42 1.41-1.41L13.91 3 12.5 4.41 11.09 3l-1.06 1.06 1.41 1.41-1.41 1.42z" />
    </svg>
  );
};
