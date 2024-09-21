import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface CarouselSlideProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const CarouselSlide = (props: CarouselSlideProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>CarouselSlide Component</p>
      </div>
    </div>
  );
};

export default CarouselSlide;
