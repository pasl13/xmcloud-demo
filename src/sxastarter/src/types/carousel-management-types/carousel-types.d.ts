// Type for the Carousel configuration data
interface CarouselData {
  CarouselTitle: string;
  CarouselTransitionSpeed: number | null;
  CarouselAutoplay: boolean;
  CarouselAutoplayInterval: number | null;
  CarouselShowNavigationArrow: boolean;
}

// Type for each individual slide
interface CarouselSlide {
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
