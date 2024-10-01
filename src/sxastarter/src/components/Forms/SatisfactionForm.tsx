import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
import StepOne from './SatisfactionForm/StepOne';

const SatisfactionForm = (props: SatisfactionFormModel): JSX.Element => {
  return (
    <div>
      <div>
        <Image field={props.fields.IconImage} />
      </div>
      <StepOne props={props} />
    </div>
  );
};

export default SatisfactionForm;
