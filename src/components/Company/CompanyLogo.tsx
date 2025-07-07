import React from 'react';

interface CompanyLogoProps {
    src: string;
    alt?: string;
    className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
    src,
    alt = 'Company Logo',
    className = '',
}) => {
    return (
        <div className={`${className}`}><img
                src={src}
                alt={alt}
                className="rounded-lg w-full h-full stroke-yellow-2 object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/150';
                }}
            />
        </div>
    );
};

export default CompanyLogo;