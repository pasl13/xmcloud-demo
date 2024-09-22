'use client';
import React from 'react';
import CarouselSlide from 'src/atoms/CarouselManagement/CarouselSlide';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CarouselResponse } from 'src/types/carousel-management-types';
import { parseCarouselData } from 'src/utils/parseCarouselDataFields';
import { Carousel } from '@material-tailwind/react';
interface CarouselProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: CarouselResponse;
}

export const Default = (props: CarouselProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const carouselData = parseCarouselData(props.fields.data);
  const slides = carouselData.carouselSlides.map((slide, index) => {
    const altText =
      typeof slide.CarouselSlideImage.alt === 'string' ? slide.CarouselSlideImage.alt : '';
    const titleText = typeof slide.CarouselSlideTitle === 'string' ? slide.CarouselSlideTitle : '';
    const descriptionText =
      typeof slide.CarouselSlideDescription === 'string' ? slide.CarouselSlideDescription : '';
    const linkHref =
      typeof slide.CarouselSlideLink.href === 'string' ? slide.CarouselSlideLink.href : '';

    return (
      <CarouselSlide
        key={index}
        CarouselSlideImage={{
          ...slide.CarouselSlideImage,
          alt: altText,
        }}
        CarouselSlideTitle={titleText}
        CarouselSlideDescription={descriptionText}
        CarouselSlideLink={{
          ...slide.CarouselSlideLink,
          href: linkHref,
        }}
      />
    );
  });

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div>
          <Carousel className="rounded-xl">{slides}</Carousel>
        </div>
      </div>
    </div>
  );
};
