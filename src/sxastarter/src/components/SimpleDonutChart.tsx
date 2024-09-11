'use client';
import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface Field {
  name: string;
  jsonValue: {
    value: string;
  };
}

interface ChartData {
  fields: Field[];
}

interface SimpleDonutChartProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      ChartData: ChartData;
    };
  };
}

export const Default = (props: SimpleDonutChartProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const fieldsObject = props.fields?.data?.ChartData.fields.reduce(
    (acc: Record<string, string>, field: Field) => {
      acc[field.name] = field.jsonValue.value;
      return acc;
    },
    {}
  );

  const { ChartTitle, ChartXLabel, ChartYLabel, ChartData } = fieldsObject || {};

  const processedData = ChartData.split('&').map((item) => {
    const [label, value] = item.split('=');
    return { [ChartXLabel]: label, [ChartYLabel]: Number(value) };
  });

  const generateRandomColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generates a random hex color
      colors.push(color);
    }
    return colors;
  };

  const [chartOptions, setChartOptions] = useState({
    title: { text: ChartTitle },
    data: processedData,
    series: [
      {
        type: 'donut',
        calloutLabelKey: ChartXLabel,
        angleKey: ChartYLabel,
        innerRadiusRatio: 0.7, // Donut Chart shape
        fills: generateRandomColors(processedData.length), // Random colors for donut slices
      },
    ],
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      title: { text: ChartTitle },
      data: processedData,
      series: [
        {
          type: 'donut',
          calloutLabelKey: ChartXLabel, // The label for each slice
          angleKey: ChartYLabel, // Numeric value for each slice
          innerRadiusRatio: 0.7, // Donut shape
          fills: generateRandomColors(processedData.length), // Random colors for donut slices
        },
      ],
    }));
  }, [ChartTitle, ChartXLabel, ChartYLabel, ChartData]);

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
