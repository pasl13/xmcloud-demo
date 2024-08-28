import { SubItemsData } from '../../types/cookiesManagementTypes/cookiesSettingstypes';
import CookieItem from './CookieItem';
interface ListCookieTypesProps extends SubItemsData {
  onSelect: any;
  cookieItems: any;
}
export default function ListCookieTypes({ onSelect, cookieItems }: ListCookieTypesProps) {
  // console.log('ListCookieTypes:', children);
  // console.log('onSelect:', onSelect);
  // console.log('cookieTypes:', cookieTypes);
  return (
    <div className="cookie-types-list">
      {cookieItems.map((cookieType, index) => (
        <CookieItem key={index} fields={cookieType} onSelect={onSelect} />
      ))}
    </div>
  );
}
