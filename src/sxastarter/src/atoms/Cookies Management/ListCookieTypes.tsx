import { SubItemsData } from '../../types/cookiesManagementTypes/cookiesSettingstypes';
import CookieItem from './CookieItem';

export default function ListCookieTypes(props: SubItemsData) {
  console.log('ListCookieTypes:', props);
  const cookieTypes = props.children.results;
  console.log('cookieTypes:', cookieTypes);
  return (
    <div className="cookie-types-list">
      {cookieTypes.map((cookieType, index) => (
        <CookieItem key={index} fields={cookieType.fields} />
      ))}
    </div>
  );
}
