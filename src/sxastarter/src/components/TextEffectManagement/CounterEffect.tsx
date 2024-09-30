// import React, { useEffect, useRef, useState } from 'react';
// import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
// import { CountUp } from 'countup.js';

// interface CounterField<T> {
//   value: T;
// }
// interface CounterEffectProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
//   fields: {
//     counterTargetNumber: CounterField<number>;
//     counterPrefix: CounterField<string>;
//     counterSuffix: CounterField<string>;
//     counterDuration: CounterField<string>; // Since it seems to be a string from your example
//     counterAutoplayOption: CounterField<boolean>;
//   };
// }

// export const Default = (props: CounterEffectProps): JSX.Element => {
//   const id = props.params.RenderingIdentifier;
//   // const [fields, setFields] = useState([]);
//   // const [hydrated, setHydrated] = useState(false);
//   const fields = props.fields;
//   const counterRef = useRef(null);
//   console.log('CounterEffectProps', props);

//   // useEffect(() => {
//   //   if (props.fields && !hydrated) {
//   //     setFields(props.fields);
//   //     setHydrated(true);
//   //   }
//   // }, [props.fields, hydrated]);

//   const targetNumber = fields.counterTargetNumber.value;
//   const prefix = fields.counterPrefix.value;
//   const suffix = fields.counterSuffix.value;
//   const duration = parseFloat(fields.counterDuration.value); // Convert string duration to number
//   const autoplay = fields.counterAutoplayOption.value;

//   useEffect(() => {
//     if (counterRef.current) {
//       const countUp = new CountUp(counterRef.current, targetNumber, {
//         prefix: '€',
//         duration: 2, // Adjust the duration as needed
//       });
//       if (!countUp.error) {
//         countUp.start();
//       } else {
//         console.error(countUp.error);
//       }
//     }
//   }, [targetNumber]);

//   return (
//     <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
//       <div className="component-content">
//         <div>
//           <h1>Title Here</h1>
//           {/* Render the Rich Text but with a span for the number */}
//           {/* <div
//             dangerouslySetInnerHTML={{
//               __html: richText.replace(
//                 /\d+/, // Assuming the number is identifiable and easy to replace
//                 `<span id="counter" ref=${counterRef}>0</span>`
//               ),
//             }}
//           /> */}
//           <div>{targetNumber}</div>
//         </div>
//       </div>
//     </div>
//   );
// };
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
    counterDuration: CounterField<string>; // Since it seems to be a string from your example
    counterAutoplayOption: CounterField<boolean>;
  };
}

export const Default = (props: CounterEffectProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const fields = props.fields;
  const counterRef = useRef<HTMLSpanElement>(null);

  const targetNumber = fields.counterTargetNumber.value;
  const prefix = fields.counterPrefix.value;
  const suffix = fields.counterSuffix.value;
  const duration = parseFloat(fields.counterDuration.value); // Convert string duration to number
  const autoplay = fields.counterAutoplayOption.value;

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

  return (
    <div id={id ? id : undefined}>
      <span ref={counterRef}>0</span>
    </div>
  );
};

export default Default;