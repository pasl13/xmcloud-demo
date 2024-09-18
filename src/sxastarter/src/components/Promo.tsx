import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { CardCollection, CardCollectionProps } from '@ama-pt/agora-design-system';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText className="promo-text" field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText className="promo-text" field={props.fields.PromoText2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithTextAndLink = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const args: CardCollectionProps = {
    headingLevel: 'h2',
  };

  if (props.fields) {
    return (
      <>
        <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
          <div className="component-content">
            <CardCollection
              {...args}
              title="Card Article Link only with icon"
              mainAnchor={{
                href: 'https://zeroheight.com/1be481dc2/p/94dc7b-componentes',
                target: '_blank',
                iconOnly: true,
                hasIcon: true,
                title: 'Praesent vitae Link',
              }}
            >
              <div>
                <h1>teste</h1>
              </div>
            </CardCollection>
          </div>
        </div>
      </>
      // <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
      //   <div className="component-content">
      //     <div className="field-promoicon">
      //       <JssImage field={props.fields.PromoIcon} />
      //     </div>
      //     <div className="promo-text">
      //       <div className="field-promotext">
      //         <JssRichText className="promo-text" field={props.fields.PromoText} />
      //       </div>
      //     </div>
      //     <div className="promo-link">

      //     </div>
      //   </div>
      // </div>
    );
  }
  return <PromoDefaultComponent {...props} />;
};
