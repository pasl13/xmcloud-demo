import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Icon } from '@ama-pt/agora-design-system';

interface ResultsField {
  src: string;
  displayName: string;
  extension: string;
  size: string;
}

interface Fields {
  data: {
    datasource?: {
      file: { jsonValue: { value: ResultsField } };
    };
  };
}

interface CallToActionProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: CallToActionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  if (!props?.fields?.data?.datasource) {
    return (
      <div className={props.params.styles} id={id ? id : undefined}>
        <div className="component-content">
          <h3>Link List</h3>
        </div>
      </div>
    );
  }

  const { src, displayName, extension, size } = props.fields.data.datasource.file.jsonValue.value;

  const sizeInMB = (parseInt(size) / (1024 * 1024)).toFixed(2);

  return (
    <div className={`component call-to-action ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <a href={src} target="_blank" rel="noopener noreferrer" className="card-link">
          <Card className="card">
            <CardBody className="card-body">
              <div className="card-content">
                <Typography variant="h5" color="blue-gray" className="card-title">
                  {displayName}
                </Typography>
                <p className="card-subtitle">
                  {extension.toUpperCase()} | {sizeInMB}MB
                </p>
              </div>
              <div className="card-divider"></div>
              <div className="card-icon-container">
                <Icon
                  name="agora-line-download"
                  color="fill-primary-500"
                  aria-hidden
                  className="card-icon"
                />
              </div>
            </CardBody>
          </Card>
        </a>
      </div>
    </div>
  );
};
