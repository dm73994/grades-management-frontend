import React, { type JSX } from 'react';
import './typography.css';

type Variant = 'title' | 'subtitle' | 'body' | 'label' | 'caption';

interface TypographyProps {
    variant?: Variant;
    children: React.ReactNode;
    className?: string;
}

const variantMap: Record<Variant, keyof JSX.IntrinsicElements> = {
    title: 'h1',
    subtitle: 'h2',
    body: 'p',
    label: 'label',
    caption: 'span',
};

const Typography = ({ variant = 'body', children, className = '' }: TypographyProps) => {
    const Component = variantMap[variant];

    return (
        <Component className={`typography typography-${variant} ${className}`}>
            {children}
        </Component>
    );
};

export default Typography;
