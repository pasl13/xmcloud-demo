import React from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldText = {
  field: {
    jsonValue: TextField;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldText[];
      };
    };
  };
}

type OfficialManagerProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const OfficialDropdownItem = ({ field }: { field: TextField }): JSX.Element => {
  return <option value={field.value}>{field.value}</option>;
};

export const Default = (props: OfficialManagerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const datasource = props.fields?.data?.datasource;

  if (datasource) {
    const dropdownOptions = datasource.children.results
      .filter((element: ResultsFieldText) => element?.field?.jsonValue?.value)
      .sort((a, b) => (a.field.jsonValue.value + '').localeCompare(b.field.jsonValue.value + ''))
      .map((element: ResultsFieldText, key: number) => (
        <OfficialDropdownItem
          key={`${key}${element.field.jsonValue?.value || ''}`}
          field={element.field.jsonValue}
        />
      ));

    return (
      <div className={`component official-manager ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <h1>Official Manager Component</h1>
          <select className="officials-dropdown">{dropdownOptions}</select>
        </div>
      </div>
    );
  }

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <h1>Official Manager Component</h1>
      </div>
    </div>
  );
};
