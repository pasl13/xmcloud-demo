// Utility function to parse Sitecore data into typed data
import { CarouselDataProps } from "src/types/carousel-management-types";
export const parseCarouselData = (data: CarouselDataProps): CarouselProps => {
  // Extract carousel configuration
  const carouselData: CarouselData = {
    CarouselTitle: data.carouselData.fields.find((field: any) => field.name === 'CarouselTitle')?.jsonValue.value || '',
    CarouselTransitionSpeed: data.carouselData.fields.find((field: any) => field.name === 'CarouselTransitionSpeed')?.jsonValue.value || null,
    CarouselAutoplay: data.carouselData.fields.find((field: any) => field.name === 'CarouselAutoplay')?.jsonValue.value || false,
    CarouselAutoplayInterval: data.carouselData.fields.find((field: any) => field.name === 'CarouselAutoplayInterval')?.jsonValue.value || null,
    CarouselShowNavigationArrow: data.carouselData.fields.find((field: any) => field.name === 'CarouselShowNavigationArrow')?.jsonValue.value || false,
  };

  // Extract carousel slides
  const carouselSlides: CarouselSlide[] = data.carouselSlidesDataa.children.results.map((slide: any) => ({
    CarouselSlideImage: {
      src: slide.fields.find((field: any) => field.name === 'CarouselSlideImage')?.jsonValue.value.src || '',
      alt: slide.fields.find((field: any) => field.name === 'CarouselSlideImageAltText')?.jsonValue.value || '',
      width: parseInt(slide.fields.find((field: any) => field.name === 'CarouselSlideImage')?.jsonValue.value.width, 10) || 0,
      height: parseInt(slide.fields.find((field: any) => field.name === 'CarouselSlideImage')?.jsonValue.value.height, 10) || 0,
    },
    CarouselSlideTitle: slide.fields.find((field: any) => field.name === 'CarouselSlideTitle')?.jsonValue.value || '',
    CarouselSlideDescription: slide.fields.find((field: any) => field.name === 'CarouselSlideDescription')?.jsonValue.value || '',
    CarouselSlideLink: {
      href: slide.fields.find((field: any) => field.name === 'CarouselSlideLink')?.jsonValue.value.href || '',
    },
  }));

  return {
    carouselData,
    carouselSlides,
  };
};
