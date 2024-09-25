import { useState } from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
import StepCancel from './StepCancel'; // Import StepTwoA component (adjust the path if needed)
import StepTwoPositive from './StepTwoPositive';
const StepTwoNegative = ({
  satisfaction: initialSatisfaction,
  ...props
}: { satisfaction: string } & SatisfactionFormModel) => {
  const [satisfaction, setSatisfaction] = useState<string>(initialSatisfaction); // Store button click value
  const [showStepCancel, setShowStepCancel] = useState<boolean>(false); // Track if we should show the next step
  const [showStepTwoPositive, setShowStepTwoPositive] = useState<boolean>(false);
  const [textInput, setText] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const handleBackClick = () => {
    setSatisfaction('');
    setShowStepCancel(true); // Show the second part of the form after a selection
  };
  const handleSubmitClick = (satisfaction: string) => {
    if (textInput === '') {
      setInputError(true);
    } else {
      setSatisfaction(satisfaction);
      setShowStepTwoPositive(true); // Show the second part of the form after a selection
    }
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      {!showStepCancel && !showStepTwoPositive ? (
        <>
          <div>
            {/* Div for Title */}
            <h3>{props.fields.OpinionPageTitle.value}</h3>
          </div>
          <div>
            <textarea
              id="user-text"
              name="user-text"
              placeholder={props.fields.OpinionPageInputText.value}
              onChange={handleTextChange}
              style={{
                border: inputError ? '2px solid #D12332' : '1px solid #ccc', // Error border
                backgroundColor: inputError ? '#FEF1F2' : 'white', // Error background
              }}
            ></textarea>
          </div>
          <div>
            {inputError && (
              <p>
                <Image field={props.fields.AlertImage} alt="Alert Image" />
                {props.fields.OpinionErrorMessage.value}
              </p>
            )}
          </div>
          <div>
            {/* Div for buttons */}
            <button onClick={() => handleBackClick()}>
              {props.fields.OpinionPageNegativeButton.value}
            </button>
            <button onClick={() => handleSubmitClick(satisfaction)}>
              {props.fields.OpinionPagePositiveButton.value}
            </button>
          </div>

          <p>In the previous step, you selected: {satisfaction}</p>
        </>
      ) : showStepCancel ? (
        <StepCancel props={props} />
      ) : (
        <StepTwoPositive satisfaction={satisfaction} props={props} textInput={textInput} />
      )}
    </div>
  );
};

export default StepTwoNegative;
