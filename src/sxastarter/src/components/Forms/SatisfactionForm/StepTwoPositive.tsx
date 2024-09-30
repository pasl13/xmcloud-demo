import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
const StepTwoPositive = ({
  props,
}: {
  satisfaction: string;
  props: SatisfactionFormModel;
  textInput?: string;
}) => {
  return (
    <div>
      <h3>{props.fields.PositiveFinalMessage.value}</h3>
    </div>
  );
};

export default StepTwoPositive;
