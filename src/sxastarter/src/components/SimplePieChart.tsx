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

interface SimplePieChartProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      ChartData: ChartData;
    };
  };
}

export const Default = (props: SimplePieChartProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  // Destructuring the fields from data.ChartData.fields
  const fieldsObject = props.fields?.data?.ChartData.fields.reduce(
    (acc: Record<string, string>, field: Field) => {
      acc[field.name] = field.jsonValue.value;
      return acc;
    },
    {}
  );

  const { ChartTitle, ChartColor, ChartXLabel, ChartYLabel, ChartData } = fieldsObject || {};

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
        type: 'pie',
        angleKey: ChartYLabel, // The numeric value for the slice
        sectorLabelKey: ChartXLabel, // The label for the slice (e.g., year or category)
        fills: generateRandomColors(processedData.length), // Optional: if you want to set a single color for the pie
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
          type: 'pie',
          angleKey: ChartYLabel, // Numeric value for the slice
          sectorLabelKey: ChartXLabel, // Label for the slice
          fills: generateRandomColors(processedData.length), // Optional: color for pie slices
        },
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
