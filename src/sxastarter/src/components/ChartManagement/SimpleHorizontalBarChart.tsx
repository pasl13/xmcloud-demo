'use client';

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { ChartProps, Field } from 'src/types/chart-management-types/chartManagementTypes';

export const Default = (props: ChartProps): JSX.Element => {
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
    series: [
      {
        type: 'bar',
        direction: 'horizontal',
        xKey: ChartXLabel,
        yKey: ChartYLabel,
        fill: ChartColor,
      },
    ],
    axes: [
      { type: 'category', position: 'left' },
      { type: 'number', position: 'bottom' },
    ],
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      title: { text: ChartTitle },
      data: processedData,
      series: [
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: ChartXLabel,
          yKey: ChartYLabel,
          fill: ChartColor,
        },
      ],
      axes: [
        { type: 'category', position: 'left' },
        { type: 'number', position: 'bottom' },
      ],
    }));
  }, [ChartTitle, ChartColor, ChartXLabel, ChartYLabel, ChartData]);

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
