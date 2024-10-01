import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
import StepCancel from './StepCancel';
import StepTwoPositive from './StepTwoPositive';
import { useState } from 'react';
import StepError from './StepError';
const StepTwoNegative = ({
  satisfaction: initialSatisfaction,
  ...props
}: { satisfaction: string } & SatisfactionFormModel) => {
  const [satisfaction, setSatisfaction] = useState<string>(initialSatisfaction);
  const [showStepCancel, setShowStepCancel] = useState<boolean>(false);
  const [showStepTwoPositive, setShowStepTwoPositive] = useState<boolean>(false);
  const [textInput, setText] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  // const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showStepError, setShowStepError] = useState<boolean>(false);

  const handleBackClick = () => {
    setSatisfaction('');
    setShowStepCancel(true);
  };
  const handleSubmitClick = async (satisfaction: string) => {
    const formatedDate = formatDate(new Date());
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const safeTextInput = textInput
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');
    if (textInput === '') {
      setInputError(true);
    } else {
      setSatisfaction(satisfaction);
      try {
        const response = await fetch('/api/forms/sendFormAnswer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.href,
            formatedDate,
            randomNumber,
            satisfaction,
            safeTextInput,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success === true) {
            localStorage.setItem(window.location.href, 'true');
            setShowStepTwoPositive(true);
          }
        } else {
          setShowStepError(true);
        }
      } catch (error) {
        setShowStepError(true);
      }
      // createSitecoreItem(formatedDate, randomNumber, safeTextInput);
    }
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  return (
    <div>
      {!showStepCancel && !showStepTwoPositive && !showStepError ? (
        <>
          <div>
            <h3>{props.fields.OpinionPageTitle.value}</h3>
          </div>
          <div>
            <textarea
              id="user-text"
              name="user-text"
              placeholder={props.fields.OpinionPageInputText.value}
              onChange={handleTextChange}
              style={{
                border: inputError ? '2px solid #D12332' : '1px solid #ccc',
                backgroundColor: inputError ? '#FEF1F2' : 'white',
              }}
            ></textarea>
          </div>
          <div>
            {inputError && (
              <p>
                <Image field={props.fields.AlertImage} />
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
        </>
      ) : showStepError ? (
        <StepError props={props} />
      ) : showStepCancel ? (
        <StepCancel props={props} />
      ) : (
        <StepTwoPositive satisfaction={satisfaction} props={props} textInput={textInput} />
      )}
    </div>
  );
};

export default StepTwoNegative;
