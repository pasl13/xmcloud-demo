import React from 'react';
import {
  ComponentParams,
  Field,
  ImageField,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ServiceFields {
  Heading: Field<string>;
  Description: Field<string>;
  Image: ImageField;
}

export interface ServiceProps {
  params: ComponentParams;
  fields: ServiceFields;
}

export const Default = (props: ServiceProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <h4>
          <a href="">
            <JSSText field={props.fields.Heading} />
          </a>
        </h4>
        <p>
          <JSSText field={props.fields.Description} />
        </p>
      </div>
    </div>
  );
};
