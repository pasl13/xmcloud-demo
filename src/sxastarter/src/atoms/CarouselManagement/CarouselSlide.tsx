import React from 'react';
// interface CarouselSlideProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
// }

const CarouselSlide = (props): JSX.Element => {
  console.log('CarouselSlide component data:', props);
  const carouselSlideImageData = props.CarouselSlideImage;
  console.log('carouselSlideImageData:', carouselSlideImageData);
  return (
    <>
      <img
        src={carouselSlideImageData.src}
        alt={carouselSlideImageData.alt}
        className="h-full w-full object-cover"
      />
    </>
  );
};

export default CarouselSlide;
