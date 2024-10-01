import { useEffect, useState } from 'react';
import StepTwoNegative from './StepTwoNegative'; // Import StepTwoA component (adjust the path if needed)
import StepTwoPositive from './StepTwoPositive';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
import StepError from './StepError';

const StepOne = ({ props }: { props: SatisfactionFormModel }) => {
  const [satisfaction, setSatisfaction] = useState<string>(''); // Store button click value
  const [showStepTwoNegative, setShowStepTwoNegative] = useState<boolean>(false);
  const [showStepTwoPositive, setShowStepTwoPositive] = useState<boolean>(false);
  const [showStepError, setShowStepError] = useState<boolean>(false);
  //   const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const submitted = localStorage.getItem(window.location.href);
    if (submitted === 'true') {
      setIsFormSubmitted(true);
    }
  }, []);
  const handleSatisfactionPositiveClick = async (value: string) => {
    const formatedDate = formatDate(new Date());
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    setSatisfaction(value);
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
          satisfaction: props.fields.PositiveButton.value,
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
  };

  const handleSatisfactionNegativeClick = (value: string) => {
    setSatisfaction(value);
    setShowStepTwoNegative(true);
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

  return (
    <div>
      {/* Conditionally render Step One or Step Two */}
      {!showStepTwoNegative && !showStepTwoPositive && !isFormSubmitted && !showStepError ? (
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
      ) : showStepError ? (
        <StepError props={props} />
      ) : (
        <StepTwoPositive satisfaction={satisfaction} props={props} />
      )}
    </div>
  );
};

export default StepOne;
