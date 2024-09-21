import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface CarouselProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: CarouselProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  console.log('Carousel component data:', props);
  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>Carousel Component</p>
      </div>
    </div>
  );
};
