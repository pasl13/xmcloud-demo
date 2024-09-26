import { useState } from 'react';
import StepTwoNegative from './StepTwoNegative'; // Import StepTwoA component (adjust the path if needed)
import StepTwoPositive from './StepTwoPositive';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';

const StepOne = ({ props }: { props: SatisfactionFormModel }) => {
  const [satisfaction, setSatisfaction] = useState<string>(''); // Store button click value
  const [showStepTwoNegative, setShowStepTwoNegative] = useState<boolean>(false); // Track if we should show the next step
  const [showStepTwoPositive, setShowStepTwoPositive] = useState<boolean>(false); // Track if we should show the next step
  // Function to handle button clicks and update satisfaction state
  const handleSatisfactionPositiveClick = (value: string) => {
    setSatisfaction(value);
    setShowStepTwoPositive(true); // Show the second part of the form after a selection
  };
  const handleSatisfactionNegativeClick = (value: string) => {
    setSatisfaction(value);
    setShowStepTwoNegative(true); // Show the second part of the form after a selection
  };

  return (
    <div>
      {/* Conditionally render Step One or Step Two */}
      {!showStepTwoNegative && !showStepTwoPositive ? (
        <div>
          <h2>{props.fields.Question.value}</h2>
          {/* Buttons for Yes and No */}
          {/* <Button {...args} /> */}
          <button
            onClick={() => handleSatisfactionPositiveClick(props.fields.PositiveButton.value)}
          >
            {props.fields.PositiveButton.value}
          </button>
          <button
            onClick={() => handleSatisfactionNegativeClick(props.fields.NegativeButton.value)}
          >
            {props.fields.NegativeButton.value}
          </button>
        </div>
      ) : showStepTwoNegative ? (
        <StepTwoNegative satisfaction={satisfaction} {...props} />
      ) : (
        <StepTwoPositive satisfaction={satisfaction} props={props} />
      )}
    </div>
  );
};

export default StepOne;
