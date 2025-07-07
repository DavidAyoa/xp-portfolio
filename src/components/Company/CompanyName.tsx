import React from 'react';

type ValidTags = 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface CompanyNameProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  tag?: ValidTags;
}

const CompanyName: React.FC<CompanyNameProps> = ({
  className = '',
  tag: Tag = 'span',
  ...props
}) => {
  return (
    <Tag 
      className={`font-orbitron font-bold tracking-wider text-xl md:text-2xl ${className}`}
      {...props}
    >
      AGE OF AI LLC
    </Tag>
  );
};

export default CompanyName;
