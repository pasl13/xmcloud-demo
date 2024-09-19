import React, { useEffect, useState } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { Switch } from '@ama-pt/agora-design-system';

interface Fields {
  LabelOn: { value: string };
  LabelOff: { value: string };
}

interface SwitchProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = ({ params, fields }: SwitchProps): JSX.Element | null => {
  const { RenderingIdentifier: id, styles = '' } = params;
  const [isOn, setIsOn] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleChange = () => setIsOn((prevState) => !prevState);

  if (!isHydrated) return null;

  const currentLabel = isOn ? fields.LabelOn.value : fields.LabelOff.value;

  return (
    <div className={`component switch ${styles.trimEnd()}`} id={id || undefined}>
      <div className="switch-container">
        <Switch onChange={handleChange} checked={isOn} label={currentLabel} />
      </div>
    </div>
  );
};
