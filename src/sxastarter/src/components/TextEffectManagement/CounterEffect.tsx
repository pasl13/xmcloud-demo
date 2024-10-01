'use client';

import React, { useEffect, useRef } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CountUp } from 'countup.js';

interface CounterField<T> {
  value: T;
}

interface CounterEffectProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    counterTargetNumber: CounterField<number>;
    counterPrefix: CounterField<string>;
    counterSuffix: CounterField<string>;
    counterDuration: CounterField<string>;
    counterAutoplayOption: CounterField<boolean>;
    counterTitleText: CounterField<string>;
    counterBackgroundColor: CounterField<string>;
    counterTextColor: CounterField<string>;
  };
}

export const Default = (props: CounterEffectProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const fields = props.fields;
  const counterRef = useRef<HTMLSpanElement>(null);

  const targetNumber = fields.counterTargetNumber.value;
  const prefix = fields.counterPrefix.value;
  const suffix = fields.counterSuffix.value;
  const duration = parseFloat(fields.counterDuration.value);
  const autoplay = fields.counterAutoplayOption.value;
  const titleText = fields.counterTitleText.value;

  // Get the colors from the fields
  const backgroundColor = fields.counterBackgroundColor.value;
  const textColor = fields.counterTextColor.value;

  useEffect(() => {
    if (counterRef.current) {
      const countUp = new CountUp(counterRef.current, targetNumber, {
        prefix: prefix,
        suffix: suffix,
        duration: duration,
      });

      if (autoplay) {
        countUp.start();
      }
    }
  }, [targetNumber, prefix, suffix, duration, autoplay]);

  // Inline styles for dynamic colors
  const counterStyles = {
    backgroundColor: backgroundColor,
    color: textColor,
    padding: '10px',
    borderRadius: '5px',
    display: 'inline-block',
  };

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      {titleText ? (
        <div className="component-content-with-title">
          <h2>{titleText}</h2>
          <span ref={counterRef} style={counterStyles}>
            0
          </span>
        </div>
      ) : (
        <div className="component-content">
          <span ref={counterRef} style={counterStyles}>
            0
          </span>
        </div>
      )}
    </div>
  );
};

export default Default;
