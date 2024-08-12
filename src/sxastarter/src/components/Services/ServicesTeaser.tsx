import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ServiceFields, ServiceProps, Default as Service } from 'src/atoms/Services/Service';

interface ServiceTeaserFields {
  Services: Array<Services>;
}

interface Services {
  fields: ServiceFields;
}

type ServicesTeaserProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ServiceTeaserFields;
};

export const Default = (props: ServicesTeaserProps): JSX.Element => {
  // const id = props.params.RenderingIdentifier;

  return (
    <section id="services" className="services section.bg">
      <div className="container" data-aos="fade-up">
        <div className="row">
          {props.fields.Services.map((service, index) => {
            const serviceProps: ServiceProps = {
              params: props.params,
              fields: service.fields,
            };
            return <Service key={index} {...serviceProps} />;
          })}
        </div>
      </div>
    </section>
  );
};
