import { Button } from '@nextui-org/react';
interface CookieTypeProps {
  fields: CookieItemType;
  key: number;
  onSelect: any;
}

interface CookieItemType {
  id: number;
  name: string;
  title: string;
  description: string;
  isRequired: boolean;
  isSelected: boolean;
  isEnabled: boolean;
}

export default function CookieItem({ fields, onSelect }: CookieTypeProps) {
  const title = fields.title;
  const description = fields.description;
  const isEnabled = fields.isEnabled;
  const isSelected = fields.isSelected;
  const name = fields.name;
  const id = fields.id;

  return (
    <div
      key={id}
      className="py-2 px-4 hover:bg-gray-700 text-black font-bold rounded justify-center"
    >
      <Button
        onClick={() =>
          onSelect({
            id: id,
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
