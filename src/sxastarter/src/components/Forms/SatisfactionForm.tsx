import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
// import StepTwoPositive from 'C:/GITHUB/xmcloud-demo/src/sxastarter/src/components/Forms/SatisfactionForm/StepTwoPositive';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
// import { Button } from '@ama-pt/agora-design-system';
import StepOne from './SatisfactionForm/StepOne';

const SatisfactionForm = (props: SatisfactionFormModel): JSX.Element => {
  return (
    <div>
      <div>
        <Image field={props.fields.IconImage} alt="Icon Image" />
      </div>
      <StepOne props={props} />
    </div>
  );
};

export default SatisfactionForm;
