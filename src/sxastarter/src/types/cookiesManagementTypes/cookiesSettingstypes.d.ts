export interface Field {
  name: string;
  jsonValue:{
    value: string | boolean;
  }
}

export interface CookiesSettingsData {
  fields: Field[];
}

export interface SubItemFields extends Field {
  name: "CookieTypeTitle" | "CookieTypeDescription" | "CookieTypeIsSelected" | "CookieTypeEnabled" | "CookieTypeName";
  jsonValue: {
    value: string | boolean;
  };
}

export interface SubItem {
  fields: SubItemFields[];
}

export interface SubItemsData {
  children: {
    results: SubItem[];
  };
}

export interface DataProps {
  cookiesSetingsData: CookiesSettingsData;
  subItemsData: SubItemsData;
}