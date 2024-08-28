import { SubItemFields } from 'src/types';
import { Button } from '@nextui-org/react';
interface CookieTypeProps {
  fields: SubItemFields[];
  key: number;
  onSelect: any;
}

export default function CookieItem({ fields, key, onSelect }: CookieTypeProps) {
  const title = fields.find((field) => field.name === 'CookieTypeTitle')?.jsonValue.value;
  const description = fields.find((field) => field.name === 'CookieTypeDescription')?.jsonValue
    .value;
  const isEnabled = fields.find((field) => field.name === 'CookieTypeEnabled')?.jsonValue.value;
  const isSelected = fields.find((field) => field.name === 'CookieTypeIsSelected')?.jsonValue.value;
  const name = fields.find((field) => field.name === 'CookieTypeName')?.jsonValue.value;

  return (
    <div
      key={key}
      className="py-2 px-4 hover:bg-gray-700 text-black font-bold rounded justify-center"
    >
      <Button
        onClick={() =>
          onSelect({
            title: title,
            description: description,
            isEnabled: isEnabled,
            isSelected: isSelected,
            name: name,
          })
        }
      >
        {title}
      </Button>
    </div>
  );
}
