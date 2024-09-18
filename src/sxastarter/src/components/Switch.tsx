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
  const [args, setArgs] = useState<AgoraSwitchProps | null>(null);
  const [isOn, setIsOn] = useState(true);

  const text = props.fields ? (
    <JssRichText field={props.fields.SwtichText} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );

  useEffect(() => {
    async function fetchData() {
      const labelValue = props.fields?.SwtichText?.value || 'Default label';

      const updatedArgs: AgoraSwitchProps = {
        label: labelValue,
      };

      startTransition(() => {
        setArgs(updatedArgs);
      });
    }

    fetchData();
  }, [props.fields]);

  const onChange = () => setIsOn(!isOn);

  if (!args) {
    return null;
  }

  return (
    <div className="p-16">
      <Switch onChange={onChange} checked={isOn} />
      <div className="component-content">{text}</div>
      <div className="p-8">
        <p>Toggle IsOn: {isOn ? 'true' : 'false'}</p>
      </div>
    </div>
  );
};
