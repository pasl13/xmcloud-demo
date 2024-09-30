import React from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Ancestor {
  name: string;
  displayName: string;
  path: string;
  url: {
    hostName: string;
    path: string;
    scheme: string;
    siteName: string;
    url: string;
  };
}

interface FieldString {
  value: string;
}
interface FieldJson {
  jsonValue: {
    value: {
      src: string;
      alt: string;
      width: string;
      height: string;
    };
  };
}

interface Datasource {
  ancestors: Ancestor[];
  iconimage: FieldJson;
  rootname: FieldString;
}
interface Data {
  datasource: Datasource;
}

interface Fields {
  data: Data;
}

type BreadcrumbProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const Breadcrumb = (props: BreadcrumbProps): JSX.Element => {
  const ancestors = props.fields.data.datasource?.ancestors;
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item-home">
        <a href={props.fields.data.datasource?.ancestors[ancestors.length - 1].url.url}>
          <span>{props.fields.data.datasource?.rootname.value}</span>
        </a>
      </li>
      {ancestors?.length > 2 &&
        ancestors
          .slice(1, -1)
          .reverse()
          .map((ancestor, index) => (
            <React.Fragment key={index}>
              <li className="breadcrumb-icon">
                <Image field={props.fields.data.datasource.iconimage.jsonValue} />
              </li>
              <li className="breadcrumb-item-sub">
                <a href={ancestor.url.url}>
                  <span>{ancestor.name}</span>
                </a>
              </li>
            </React.Fragment>
          ))}
      {ancestors?.length > 1 && (
        <React.Fragment key={0}>
          <li className="breadcrumb-icon">
            <Image field={props.fields.data.datasource.iconimage.jsonValue} />
          </li>
          <li className="breadcrumb-item-current">
            <a href={ancestors[0].url.url}>
              <span>{ancestors[0].name}</span>
            </a>
          </li>
        </React.Fragment>
      )}
    </ol>
  );
};
export default Breadcrumb;
