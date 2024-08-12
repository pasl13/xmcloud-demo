import { registerComponent } from '@sitecore-feaas/clientside';
import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
// import profileImg from '@src/assets/images/marcelo_rebelo.jpg';
import profileImg from '../assets/images/marcelo_rebelo.jpg';

interface CustomCardProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: CustomCardProps): JSX.Element => {
  registerComponent(Default, {
    name: 'CustomCard',
    description: 'Custom Card Component',
  });

  const id = props.params?.RenderingIdentifier;
  // console.log("props:", props);

  return (
    <div className={`component ${props.params?.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        {/* <p>CustomCard Component</p> */}
        <div className="card flex flex-row" style={{ width: '60%' }}>
          <div className="col-md-4">
            <div className="rounded">
              <Image
                src={profileImg}
                className="card-img-left"
                alt="Person Photo"
                style={{ width: '100px', height: 'auto' }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Person Name</h5>
              <p className="card-text">Person Biography</p>
            </div>
          </div>
        </div>

        <div className="container border">
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
