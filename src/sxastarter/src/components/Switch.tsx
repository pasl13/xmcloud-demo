import React, { startTransition, useEffect, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Switch, SwitchProps as AgoraSwitchProps } from '@ama-pt/agora-design-system';

interface Fields {
  SwtichText: Field<string>;
}

interface SwitchProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: SwitchProps): JSX.Element | null => {
  const { RenderingIdentifier: id, styles = '' } = props.params;

  const [args, setArgs] = useState<AgoraSwitchProps | null>(null);
  const [isOn, setIsOn] = useState(true);

  const label = props.fields ? (
    <JssRichText field={props.fields.SwtichText} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );

  useEffect(() => {
    const fetchData = async () => {
      const labelValue = props.fields.SwtichText?.value || 'Default label';

      const updatedArgs: AgoraSwitchProps = {
        label: labelValue,
      };

      startTransition(() => {
        setArgs(updatedArgs);
      });
    };

    fetchData();
  }, [props.fields.SwtichText]);

  const handleChange = () => setIsOn((prevState) => !prevState);

  if (!args) {
    return null;
  }

  return (
    <div className={`component switch ${styles.trimEnd()}`} id={id ? id : undefined}>
      <div className="switch-container">
        <Switch onChange={handleChange} checked={isOn} />
      </div>
      <div className="component-content">
        {label}
      </div>
    </div>
  );
};
