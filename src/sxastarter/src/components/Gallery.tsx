import React from 'react';
import { Text, Image, ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

type ImageValue = {
  src: string;
  alt: string;
  width: string;
  height: string;
};

type GalleryField = {
  name: string;
  jsonValue: {
    value: ImageValue | string;
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
      // Extract the Image field
      const imageField = galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue
        ?.value;
      const image: ImageField | undefined =
        typeof imageField === 'object' && imageField !== null && 'src' in imageField
          ? {
              value: { src: imageField.src, editable: true },
              editable: galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue
                ?.editable,
            }
          : undefined;

      // Extract the ImageTitle field
      const textField = galleryItem.fields.find((field) => field.name === 'ImageTitle')?.jsonValue
        ?.value;
      const text: TextField | undefined =
        typeof textField === 'string'
          ? {
              value: textField,
              editable: galleryItem.fields.find((field) => field.name === 'ImageTitle')?.jsonValue
                ?.editable,
            }
          : undefined;

      // Extract the ImageDescription field
      const descriptionField = galleryItem.fields.find((field) => field.name === 'ImageDescription')
        ?.jsonValue?.value;
      const description: TextField | undefined =
        typeof descriptionField === 'string'
          ? {
              value: descriptionField,
              editable: galleryItem.fields.find((field) => field.name === 'ImageDescription')
                ?.jsonValue?.editable,
            }
          : undefined;

      return (
        <div className={styles} id={id ? id : undefined} key={index}>
          {image && <Image field={image} />}
          {text && <Text field={text} tag="h3" />}
          {description && <Text field={description} tag="p" />}
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
