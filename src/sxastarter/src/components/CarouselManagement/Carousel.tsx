import React from 'react';
import CarouselSlide from 'src/atoms/CarouselManagement/CarouselSlide';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CarouselDataProps } from 'src/types/carousel-management-types';

interface CarouselProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: CarouselDataProps;
  };
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
