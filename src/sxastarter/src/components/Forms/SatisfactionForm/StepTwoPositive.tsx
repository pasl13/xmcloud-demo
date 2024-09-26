import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';
const StepTwoPositive = ({
  satisfaction,
  props,
  textInput,
}: {
  satisfaction: string;
  props: SatisfactionFormModel;
  textInput?: string;
}) => {
  return (
    <div>
      <h3>{props.fields.PositiveFinalMessage.value}</h3>
      <p>In the previous step, you selected: {satisfaction}</p>
      {textInput && textInput.trim() !== '' && <p>In the previous step, you wrote: {textInput}</p>}
    </div>
  );
};

export default StepTwoPositive;
