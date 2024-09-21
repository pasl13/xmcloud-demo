// Type for the Carousel configuration data
export interface CarouselDataType {
  CarouselTitle: string;
  CarouselTransitionSpeed: number | null;
  CarouselAutoplay: boolean;
  CarouselAutoplayInterval: number | null;
  CarouselShowNavigationArrow: boolean;
}

// Type for each individual slide
export interface CarouselSlideType {
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

export interface CarouselDataProps {
  carouselData: CarouselDataType;
  carouselSlidesData: CarouselSlideType[];
}
