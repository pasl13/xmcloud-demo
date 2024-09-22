import React from 'react';
interface CarouselSlideProps {
  CarouselSlideImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  CarouselSlideTitle: string;
  CarouselSlideDescription: string;
  CarouselSlideLink: {
    href: string;
  };
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  CarouselSlideImage,
  CarouselSlideTitle,
  // CarouselSlideDescription,
  // CarouselSlideLink
}): JSX.Element => {
  // console.log('CarouselSlide component data:', props);
  return (
    <>
      <div className="relative h-full w-full">
        <img
          src={CarouselSlideImage.src}
          alt={CarouselSlideImage.alt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">{CarouselSlideTitle}</h2>
        </div>
      </div>
    </>
  );
};

export default CarouselSlide;
