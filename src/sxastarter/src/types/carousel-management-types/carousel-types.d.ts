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

// Tipo para o valor JSON
export interface JsonValue<T> {
  value: {
    [key: string]: any;
  };
}

// Tipo para os campos do CarouselData
export interface CarouselDataField {
  name: string;
  jsonValue: JsonValue<string | number | boolean | null>;
}

// Tipo para os campos do CarouselSlide
export interface CarouselSlideField {
  name: string;
  jsonValue: JsonValue<{
    src?: string | undefined;
    alt?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    href?: string | undefined;
  } | string >;
}

// Tipo para os dados do Carousel
export interface CarouselData {
  fields: CarouselDataField[];
}

// Tipo para os dados dos slides do Carousel
export interface CarouselSlidesData {
  children: {
    results: {
      fields: CarouselSlideField[];
    }[];
  };
}

export interface CarouselResponseData {
  carouselData: CarouselData;
  carouselSlidesData: CarouselSlidesData;
}
// Tipo para o objeto completo
export interface CarouselResponse {
  data: CarouselResponseData
}