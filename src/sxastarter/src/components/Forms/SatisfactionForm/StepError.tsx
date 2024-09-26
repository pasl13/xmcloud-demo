import { useState } from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
import StepOne from './StepOne';

const StepError = ({ props }: { props: SatisfactionFormModel }) => {
  const [showSatisfactionForm, setShowSatisfactionForm] = useState<boolean>(false);

  const handleBackClick = () => {
    setShowSatisfactionForm(true); // Show the second part of the form after a selection
  };

  return (
    <div>
      {!showSatisfactionForm ? (
        <>
          <div>
            <Image field={props.fields.AlertImage} alt="Alert Image" />
          </div>
          <div>
            <h3>{props.fields.NotSubmittedTitle.value}</h3>
            <p>{props.fields.NotSubmittedSubtitle.value}</p>
          </div>
          <div>
            <button onClick={handleBackClick}>{props.fields.NotSubmittedBackButton.value}</button>
          </div>
        </>
      ) : (
        // Ensure space between SatisfactionForm and {...props}
        <StepOne props={props} />
      )}
    </div>
  );
};

export default StepError;
