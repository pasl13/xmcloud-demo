import { SubItemsData } from '../../types/cookies-management-types/cookiesSettingstypes';
import CookieItem from './CookieItem';
import { CookieItemType } from 'src/types';
interface ListCookieTypesProps extends SubItemsData {
  onSelect: React.Dispatch<React.SetStateAction<CookieItemType | null>>;
  cookieItems: CookieItemType[];
}
export default function ListCookieTypes({ onSelect, cookieItems }: ListCookieTypesProps) {
  return (
    <div className="cookie-types-list">
      {cookieItems.map((cookieType, index) => (
        <CookieItem key={index} fields={cookieType} onSelect={onSelect} />
      ))}
    </div>
  );
}
