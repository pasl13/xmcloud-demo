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
  children?: {
    results: SubItem[];
  };
}

export interface DataProps {
  cookiesSetingsData: CookiesSettingsData;
  subItemsData: SubItemsData;
}

export interface CookieItemType {
  id: number;
  title?: string | boolean | undefined;
  description?: string | boolean | undefined;
  isEnabled?: string | boolean | undefined;
  isSelected:  boolean | undefined;
  name?: string | boolean | undefined;
}