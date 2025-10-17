import React, { useEffect, useRef } from 'react';
import type { GHLFormConfig } from '../../lib/ghl/client';

export interface GHLFormProps extends GHLFormConfig {
  title?: string;
  description?: string;
}

export default function GHLForm({
  formId,
  className = '',
  style = 'inline',
  height = '600px',
  width = '100%',
  title,
  description
}: GHLFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formId || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    script.setAttribute('data-form', formId);

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, [formId]);

  if (style === 'modal' || style === 'popup') {
    return (
      <div className={`ghl-form-container ${className}`}>
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        <button
          className="btn btn-primary"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).openGHLForm) {
              (window as any).openGHLForm(formId);
            }
          }}
        >
          Open Form
        </button>
      </div>
    );
  }

  return (
    <div className={`ghl-form-wrapper ${className}`}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      <div
        ref={containerRef}
        className="ghl-form-embed"
        style={{
          width,
          minHeight: height,
          position: 'relative'
        }}
      />
    </div>
  );
}