// import React, { useState } from 'react';
// import { AgCharts } from 'ag-charts-react';
// import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

// interface SimpleBarChartProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
// }

// export const Default = (props: SimpleBarChartProps): JSX.Element => {
//   const id = props.params.RenderingIdentifier;
//   console.log('props:', props);
//   const [ chartOptions, setChartOptions] = useState({
//     data: [
//       { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
//       { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
//       { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
//       { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
//       { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
//       { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
//     ],
//     series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
//   });

//   return (
//     <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
//       <div className="component-content">
//         <p>SimpleBarChart Component</p>
//         <AgCharts options={chartOptions} />
//       </div>
//     </div>
//   );
// };

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

interface SubItemsData {
  children: {
    results: unknown[];
  };
}

interface SimpleBarChartProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      ChartData: ChartData;
      subItemsData: SubItemsData;
    };
  };
}

export const Default = (props: SimpleBarChartProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  console.log('props:', props);
  const fieldsObject = props.fields?.data?.ChartData.fields.reduce(
    (acc: Record<string, string>, field: Field) => {
      acc[field.name] = field.jsonValue.value;
      return acc;
    },
    {}
  );
  const { ChartTitle, ChartColor, ChatXLabel, ChatYLabel, ChartData } = fieldsObject;

  const processedData = ChartData.split('&').map((item) => {
    const [year, value] = item.split('=');
    return { year, value: Number(value) };
  });

  const [chartOptions, setChartOptions] = useState({
    title: { text: ChartTitle },
    data: processedData,
    series: [{ type: 'bar', xKey: 'year', yKey: 'value', fill: ChartColor }],
    axes: [
      { type: 'category', position: 'bottom', label: { text: ChatXLabel } },
      { type: 'number', position: 'left', label: { text: ChatYLabel } },
    ],
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      title: { text: ChartTitle },
      data: processedData,
      series: [{ type: 'bar', xKey: 'year', yKey: 'value', fill: ChartColor }],
      axes: [
        { type: 'category', position: 'bottom', label: { text: ChatXLabel } },
        { type: 'number', position: 'left', label: { text: ChatYLabel } },
      ],
    }));
  }, [ChartTitle, ChartColor, ChatXLabel, ChatYLabel, ChartData]);

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
