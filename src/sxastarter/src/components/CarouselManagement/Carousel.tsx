'use client';
import React from 'react';
import CarouselSlide from 'src/atoms/CarouselManagement/CarouselSlide';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CarouselResponse } from 'src/types/carousel-management-types';
import { parseCarouselData } from 'src/utils/parseCarouselDataFields';
// import { Button } from 'src/material-tailwind-components/Button';
interface CarouselProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: CarouselResponse;
}

export const Default = (props: CarouselProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const carouselData = parseCarouselData(props.fields.data);
  const slides = carouselData.carouselSlides.map((slide, index) => (
    <CarouselSlide key={index} {...slide} />
  ));
  console.log("carouselData:",carouselData.carouselData.CarouselTitle);
  // console.log('Carousel component data:', props);
  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div>
          carousel
        </div>
      </div>
    </div>
  );
};
