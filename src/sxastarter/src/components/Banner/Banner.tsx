import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { BannerModel } from 'src/models/BannerModel';
import { RichText as JssRichText, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

const Banner = (props: BannerModel): JSX.Element => {
  console.log(props.fields.Image);
  return (
    <div
      className="component banner"
      style={{ backgroundImage: `url(${props.fields.Image?.value?.src})` }}
    >
      <div className="component-content">
        <div className="banner-breadcrumb">
          <Placeholder name="breadcrumb-placeholder" rendering={props.rendering} />
        </div>
        <div>{props.fields.LectureTime.value}</div>
        <div className="banner-field-title">
          <JssRichText field={props.fields.Title} />
        </div>
        <div className="banner-field-text">
          <JssRichText field={props.fields.Text} />
        </div>
        <div className="banner-field-updatemessage">{props.fields.UpdateMessage.value}</div>
      </div>
    </div>
  );
};

export default Banner;

export const withImageBySide = (props: BannerModel): JSX.Element => {
  return (
    <div className="component banner">
      <div className="component-content">
        <div className="banner-breadcrumb">
          <Placeholder name="breadcrumb-placeholder" rendering={props.rendering} />
        </div>
        <div>{props.fields.LectureTime.value}</div>
        <div className="banner-field-title">
          <JssRichText field={props.fields.Title} />
        </div>
        <div className="banner-field-text">
          <JssRichText field={props.fields.Text} />
        </div>
        <div className="banner-field-updatemessage">{props.fields.UpdateMessage.value}</div>
      </div>
      <div className="banner-field-image">
        <Image field={props.fields.Image} />
      </div>
    </div>
  );
};
