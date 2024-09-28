import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { BannerModel } from 'src/models/BannerModel';
import { RichText as JssRichText, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

const Banner = (props: BannerModel): JSX.Element => {
  return (
    <div className="component banner">
      <div className="component-content">
        <div className="banner-breadcrump">
          {/* BreadCrump Section */}
          <Placeholder name="breadcrumb-placeholder" rendering={props.rendering} />
        </div>
        <div>{props.fields.LectureTime.value}</div>
        <div className="banner-field-title">
          {/* Section used for "O OE205... para os Empresas" */}
          <JssRichText field={props.fields.Title} />
        </div>
        <div className="banner-field-text">
          {/* Section used for "Este é um orçamento... negativos nos seus orçamentos." */}
          <JssRichText field={props.fields.Text} />
        </div>
        <div className="banner-field-updatemessage">
          {/* Section used for "Atualizado em 13.09.2024" */}
          {props.fields.UpdateMessage.value}
        </div>
      </div>
      <div className="banner-field-image">
        <Image field={props.fields.Image} alt="Alt Image" />
      </div>
    </div>
  );
};

export default Banner;
