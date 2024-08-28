import { Button } from '@nextui-org/react';
import { CookieItemType } from 'src/types';
interface CookieTypeProps {
  fields: CookieItemType;
  onSelect: React.Dispatch<React.SetStateAction<CookieItemType | null>>;
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
