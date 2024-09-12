export interface Field {
  name: string;
  jsonValue: {
    value: string;
  };
}

export interface ChartData {
  fields: Field[];
}

export interface ChartProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: {
      ChartData: ChartData;
    };
  };
}