import { Image, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { BannerModel } from 'src/models/BannerModel';
import { RichText as JssRichText, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

const Banner = (props: BannerModel): JSX.Element => {
  console.log(props.fields.Image);
  const { sitecoreContext } = useSitecoreContext();
  const textField = props.fields.Text;
  const updateMessageFieldEmpty =
    !props.fields.UpdateMessage ||
    !props.fields.UpdateMessage.value ||
    props.fields.UpdateMessage.value.trim() === '';
  const isTextEmpty = !textField || !textField.value || textField.value.trim() === '';
  const isEditingMode = sitecoreContext.pageEditing;
  return (
    <div
      className="component banner"
      style={{ backgroundImage: `url(${props.fields.Image?.value?.src})` }}
    >
      <div className="component-content">
        <div className="banner-breadcrumb">
          <Placeholder name="breadcrumb-placeholder" rendering={props.rendering} />
        </div>
        <div className="banner-field-lecturetime">
          <Text field={props.fields.LectureTime} />
        </div>
        <div className="banner-field-title">
          <JssRichText field={props.fields.Title} />
        </div>
        {(!isTextEmpty || isEditingMode) && (
          <div className="banner-field-text">
            <JssRichText field={props.fields.Text} />
          </div>
        )}
        {(!updateMessageFieldEmpty || isEditingMode) && (
          <div className="banner-field-updatemessage">
            <Text field={props.fields.UpdateMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;

export const WithImageBySide = (props: BannerModel): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const textField = props.fields.Text;
  const updateMessageFieldEmpty =
    !props.fields.UpdateMessage ||
    !props.fields.UpdateMessage.value ||
    props.fields.UpdateMessage.value.trim() === '';
  const isTextEmpty = !textField || !textField.value || textField.value.trim() === '';
  const isEditingMode = sitecoreContext.pageEditing;
  return (
    <div className="component banner">
      <div className="component-content">
        <div className="banner-breadcrumb">
          <Placeholder name="breadcrumb-placeholder" rendering={props.rendering} />
        </div>
        <div className="banner-field-lecturetime">
          <Text field={props.fields.LectureTime} />
        </div>
        <div className="banner-field-title">
          <JssRichText field={props.fields.Title} />
        </div>
        {(!isTextEmpty || isEditingMode) && (
          <div className="banner-field-text">
            <JssRichText field={props.fields.Text} />
          </div>
        )}
        {(!updateMessageFieldEmpty || isEditingMode) && (
          <div className="banner-field-updatemessage">
            <Text field={props.fields.UpdateMessage} />
          </div>
        )}
      </div>
      <div className="banner-field-image">
        <Image field={props.fields.Image} />
      </div>
    </div>
  );
};
