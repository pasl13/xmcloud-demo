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

  if (props.fields.PromoIcon.value?.src && props.fields.PromoText.value) {
    return (
      <>
        <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
          <div
            className="component-content with-text-and-link"
            style={{
              backgroundImage: `url(${props.fields.PromoIcon.value.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <CardCollection
              {...args}
              title={props.fields.PromoText.value}
              mainAnchor={{
                href: props.fields.PromoLink.value.href,
                target: '_blank',
                iconOnly: true,
                hasIcon: true,
                title: props.fields.PromoText.value,
                leadingIcon: 'agora-line-arrow-right-circle',
                leadingIconHover: 'agora-solid-arrow-right-circle',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa reiciendis ducimus
              facere repudiandae! Officiis pariatur provident saepe voluptates facilis sint modi
              quod architecto voluptatibus! Aut cupiditate voluptatibus modi a totam.
            </CardCollection>
          </div>
        </div>
      </>
    );
  }
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
        </div>
        <div className="field-promolink">
          <JssLink field={props.fields.PromoLink} />
        </div>
      </div>
    </div>
  );
};
