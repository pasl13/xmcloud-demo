'use client';

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { AgChartOptions } from 'ag-charts-community';

interface Field {
  name: string;
  jsonValue: {
    value: string;
  };
}

interface ChartData {
  fields: Field[];
}

interface SimpleBarChartProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      ChartData: ChartData;
    };
  };
}

export const Default = (props: SimpleBarChartProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const fieldsObject = props.fields?.data?.ChartData.fields.reduce(
    (acc: Record<string, string>, field: Field) => {
      acc[field.name] = field.jsonValue.value;
      return acc;
    },
    {}
  );

  const { ChartTitle, ChartColor, ChartXLabel, ChartYLabel, ChartData } = fieldsObject;

  const processedData = ChartData.split('&').map((item) => {
    const [xKey, yValue] = item.split('=');
    return { [ChartXLabel]: xKey, [ChartYLabel]: Number(yValue) };
  });

  const [chartOptions, setChartOptions] = useState<AgChartOptions>({
    title: { text: ChartTitle },
    data: processedData,
    series: [{ type: 'bar', xKey: ChartXLabel, yKey: ChartYLabel, fill: ChartColor }],
    axes: [
      { type: 'category', position: 'bottom' },
      { type: 'number', position: 'left' },
    ],
  });

  // useEffect(() => {
  //   setChartOptions((prevOptions) => ({
  //     ...prevOptions,
  //     title: { text: ChartTitle },
  //     data: processedData,
  //     series: [{ type: 'bar', xKey: ChartXLabel, yKey: ChartYLabel, fill: ChartColor }],
  //     axes: [
  //       { type: 'category', position: 'bottom' },
  //       { type: 'number', position: 'left' },
  //     ],
  //   }));
  // }, [ChartTitle, ChartColor, ChartXLabel, ChartYLabel, ChartData]);

  if (!fieldsObject) {
    return <div>No data</div>;
  }

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>{ChartTitle}</p>
        <AgCharts options={chartOptions} />
      </div>
    </div>
  );
};
