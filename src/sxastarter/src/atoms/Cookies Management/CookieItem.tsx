import { SubItemFields } from "src/types";

interface CookieTypeProps {
  fields: SubItemFields[];
}

export default function CookieItem({ fields }: CookieTypeProps) {
  // const title = fields.find((field) => field.name === 'CookieTypeTitle')?.value;
  // const description = fields.find((field) => field.name === 'CookieTypeDescription')?.value;
  // const isEnabled = fields.find((field) => field.name === 'CookieTypeEnabled')?.value;

  return <div>Cookie Type</div>;
}
