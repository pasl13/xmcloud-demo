import React from 'react';
import {
  //   Text,
  Image,
  ImageField,
  //   TextField,
  //   RichTextField,
  //   RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

type GalleryField = {
  name: string;
  jsonValue: {
    value: string;
    editable: string;
  };
};

type ResultsFieldGallery = {
  fields: GalleryField[];
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldGallery[];
      };
    };
  };
}

type GalleryProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: GalleryProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component gallery ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (datasource) {
    const galleries = datasource.children.results.map((galleryItem, index) => {
      const imageField = galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue
        ?.value;
      const image: ImageField = {
        value: typeof imageField === 'object' && 'src' in imageField ? imageField : undefined,
        editable: galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue?.editable,
      };

      //   const textField = galleryItem.fields.find((field) => field.name === 'ImageTitle')?.jsonValue;
      //   const text: TextField = {
      //     value: textField?.value,
      //     editable: textField?.editable,
      //   };

      //   const descriptionField = galleryItem.fields.find(
      //     (field) => field.name === 'ImageDescription'
      //   )?.jsonValue;
      //   const description: RichTextField = {
      //     value: descriptionField?.value,
      //     editable: descriptionField?.editable,
      //   };

      return (
        <div className={styles} id={id ? id : undefined} key={index}>
          {image && <Image field={image} />}
        </div>
      );
    });

    return <>{galleries}</>;
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="gallery-items">
        <h3>Gallery</h3>
      </div>
    </div>
  );
};
