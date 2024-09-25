import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type SatisfactionFormModel = {
  fields: {
    PositiveButton: Field<string>;
    NegativeButton: Field<string>;
    Question: Field<string>;
    OpinionPageTitle: Field<string>;
    OpinionPageSubtitle: Field<string>;
    OpinionPagePositiveButton: Field<string>;
    OpinionPageNegativeButton: Field<string>;
    OpinionPageInputText: Field<string>;
    OpinionPageUnderText: Field<string>;
    OpinionErrorMessage: Field<string>;
    PositiveFinalMessage: Field<string>;
    ErrorTitle: Field<string>;
    ErrorSubtitle: Field<string>;
    ErrorBackButton: Field<string>;
    NotSubmittedTitle: Field<string>;
    NotSubmittedSubtitle: Field<string>;
    NotSubmittedBackButton: Field<string>;
    IconImage: ImageField;
    AlertImage: ImageField;
    SubmitAlertImage: ImageField;
  };
};
