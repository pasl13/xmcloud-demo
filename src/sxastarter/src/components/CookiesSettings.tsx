import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: CookiesSettingsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p className='border-red-500'>CookiesSettings Component</p>
      </div>
    </div>
  );
};
