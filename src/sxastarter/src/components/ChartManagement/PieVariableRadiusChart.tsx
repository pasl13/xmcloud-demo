'use client';
import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgPolarChartOptions, AgPieSeriesOptions } from 'ag-charts-community'; // Use AgPolarChartOptions for pie charts
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

  console.log('fieldsObject', fieldsObject);
  const { ChartTitle, ChartXLabel, ChartYLabel, ChartData, ChartRadiusData } = fieldsObject || {};
  const processedData = ChartData.split('&').map((item) => {
    const [label, value] = item.split('=') as [string, string];
    const radius = ChartRadiusData.split('&').reduce((acc, item) => {
      const [radiusLabel, radiusValue] = item.split('=');
      if (radiusLabel === label) {
        acc = Number(radiusValue);
      }
      return acc;
    }, Math.random() * 100);
    return { [ChartXLabel]: label, [ChartYLabel]: Number(value), radius };
  });

  const generateRandomColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  };

  const [chartOptions, setChartOptions] = useState<AgPolarChartOptions>({
    title: { text: ChartTitle },
    data: processedData,
    series: [
      {
        type: 'pie',
        angleKey: ChartYLabel,
        radiusKey: 'radius',
        sectorLabelKey: ChartXLabel,
        fills: generateRandomColors(processedData.length),
      } as AgPieSeriesOptions,
    ],
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      title: { text: ChartTitle },
      data: processedData,
      series: [
        {
          type: 'pie',
          angleKey: ChartYLabel,
          radiusKey: 'radius',
          sectorLabelKey: ChartXLabel,
          fills: generateRandomColors(processedData.length),
        } as AgPieSeriesOptions,
      ],
    }));
  }, [ChartTitle, ChartXLabel, ChartYLabel, ChartData, ChartRadiusData]);

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
