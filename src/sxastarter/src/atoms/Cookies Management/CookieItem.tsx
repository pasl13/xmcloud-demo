import { SubItemFields } from 'src/types';
import { Button } from '@nextui-org/react';
interface CookieTypeProps {
  fields: SubItemFields[];
  key: number;
  onSelect: any;
}

export default function CookieItem({ fields, key, onSelect }: CookieTypeProps) {
  const title = fields.find((field) => field.name === 'CookieTypeTitle')?.value;
  const description = fields.find((field) => field.name === 'CookieTypeDescription')?.value;
  const isEnabled = fields.find((field) => field.name === 'CookieTypeEnabled')?.value;

  return (
    <div
      key={key}
      className="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded justify-center"
    >
      <Button onClick={() => onSelect(key)}>
        {title}
      </Button>
      {/* <h3>{title}</h3>
      <p>{description}</p>
      <input type="checkbox" checked={!!isEnabled} readOnly /> */}
    </div>
  );
}
