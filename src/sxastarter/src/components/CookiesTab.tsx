import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface CookiesTabProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: CookiesTabProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>CookiesTab Component</p>
      </div>
    </div>
  );
};
