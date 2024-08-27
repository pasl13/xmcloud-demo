import { SubItemsData } from '../../types/cookiesManagementTypes/cookiesSettingstypes';
import CookieItem from './CookieItem';
interface ListCookieTypesProps extends SubItemsData {
  onSelect: any;
}
export default function ListCookieTypes({ onSelect, children }: ListCookieTypesProps) {
  // console.log('ListCookieTypes:', children);
  // console.log('onSelect:', onSelect);
  const cookieTypes = children.results;
  // console.log('cookieTypes:', cookieTypes);
  return (
    <div className="cookie-types-list">
      {cookieTypes.map((cookieType, index) => (
        <CookieItem key={index} fields={cookieType.fields} onSelect={onSelect} />
      ))}
    </div>
  );
}
