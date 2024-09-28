import React, { useMemo } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { Tab, TabBody, TabHeader, Tabs } from '@ama-pt/agora-design-system';

interface ResultsKeyPerformanceIndicator {
  title: { jsonValue: { value: string } };
  value: { jsonValue: { value: number } };
  color: { jsonValue: { value: string } };
}

interface ResultsGrowthKPI {
  tab: { jsonValue: { value: string } };
  referenceValue: { jsonValue: { value: string } };
  hasChildren: boolean;
  children: {
    results: ResultsKeyPerformanceIndicator[];
  };
}

interface Fields {
  data: {
    datasource: {
      hasChildren: boolean;
      children: {
        results: ResultsGrowthKPI[];
      };
    };
  };
}

interface GrowthKPIProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: GrowthKPIProps): JSX.Element => {
  const { RenderingIdentifier, styles } = props.params;
  const { datasource } = props.fields.data;
  const { BaseSize: baseSize, StepSize: stepSize } = props.params;

  const tabContent = useMemo(() => {
    if (!datasource?.hasChildren) {
      return [];
    }

    return datasource.children.results.map((result, index) => {
      const baseSizeValue = parseFloat(baseSize);
      const stepSizeValue = parseFloat(stepSize);

      const sortedKPIs = [...result.children.results].sort(
        (a, b) => a.value.jsonValue.value - b.value.jsonValue.value
      );

      const kpiSizes = sortedKPIs.map((_kpi, idx) => {
        return baseSizeValue + idx * stepSizeValue;
      });

      return (
        <Tab key={index}>
          <TabHeader>{result.tab.jsonValue.value}</TabHeader>
          <TabBody>
            <div className="kpi-indicator-container">
              {result.children.results.map((kpi, kpiIndex) => {
                const originalIndex = sortedKPIs.findIndex(
                  (sortedKPI) => sortedKPI.title.jsonValue.value === kpi.title.jsonValue.value
                );
                const adjustedSize = kpiSizes[originalIndex];

                return (
                  <div
                    className="kpi-indicator-bubble"
                    key={kpiIndex}
                    style={{
                      width: `${adjustedSize}px`,
                      height: `${adjustedSize}px`,
                      borderRadius: '50%',
                      backgroundColor: kpi.color.jsonValue.value,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <p className="kpi-title">{kpi.title.jsonValue.value}</p>
                    <p className="kpi-value">
                      {kpi.value.jsonValue.value.toString().replace('.', ',')}
                      <span className="kpi-percentage">%</span>
                    </p>
                    <p className="kpi-reference">{result.referenceValue.jsonValue.value}</p>
                  </div>
                );
              })}
            </div>
          </TabBody>
        </Tab>
      );
    });
  }, [datasource, baseSize, stepSize]);

  return (
    <div className={`component growth-kpi ${styles}`} id={RenderingIdentifier || undefined}>
      <div className="component-content">
        <Tabs currentType="neutral">{tabContent}</Tabs>
      </div>
    </div>
  );
};
