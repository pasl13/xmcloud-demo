import { ComponentRendering, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type BannerModel = {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    UpdateMessage: Field<string>;
    LectureTime: Field<string>;
    Image: ImageField;
  };
  rendering: ComponentRendering;
};
