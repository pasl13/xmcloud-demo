import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

// interface CarouselSlideProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
// }

const CarouselSlide = (props): JSX.Element => {
  console.log('CarouselSlide component data:', props);
  return (
    <div>
      <div className="component-content">
        <p>CarouselSlide Component</p>
      </div>
    </div>
  );
};

export default CarouselSlide;
