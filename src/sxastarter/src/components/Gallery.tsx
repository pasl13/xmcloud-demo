import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageField,
  Image as JSSImage,
  RichText as JSSRichText,
  RichTextField,
  Text as JSSText,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';

type GalleryField = {
  name: string;
  jsonValue: {
    value: string | undefined;
    editable: string | undefined;
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
  const { fields, params } = props;
  const datasource = fields?.data?.datasource;
  const styles = `component gallery ${params.styles}`.trim();
  const id = params.RenderingIdentifier;

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<
    { image: ImageField; title: TextField; description: RichTextField }[]
  >([]);

  useEffect(() => {
    if (datasource) {
      const items = datasource.children.results.map((galleryItem) => {
        const imageField = galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue
          ?.value;
        const image: ImageField = {
          value: typeof imageField === 'object' && 'src' in imageField ? imageField : undefined,
          editable: galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue?.editable,
        };

        const titleField = galleryItem.fields.find(
          (field) => field.name === 'ImageTitle'
        )?.jsonValue;
        const title: TextField = {
          value: titleField?.value || '',
          editable: titleField?.editable || '',
        };

        const descriptionField = galleryItem.fields.find(
          (field) => field.name === 'ImageDescription'
        )?.jsonValue;
        const description: RichTextField = {
          value: descriptionField?.value || '',
          editable: descriptionField?.editable || '',
        };

        return { image, title, description };
      });

      setGalleryItems(items);
    }
  }, [datasource]);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const goToNext = useCallback(() => {
    if (currentIndex < galleryItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, galleryItems.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // Add keyboard navigation for left and right arrows
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, goToNext, goToPrev]);

  if (!datasource || galleryItems.length === 0) {
    return (
      <div className={styles} id={id || undefined}>
        <div className="gallery-items">
          <h3>Gallery</h3>
        </div>
      </div>
    );
  }

  const currentItem = galleryItems[currentIndex];
  const nextIndex = (currentIndex + 1) % galleryItems.length;
  const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const nextItem = galleryItems[nextIndex];
  const prevItem = galleryItems[prevIndex];

  return (
    <>
      {galleryItems.map((galleryItem, index) => (
        <div className={styles} id={id || undefined} key={index} onClick={() => handleOpen(index)}>
          {galleryItem.image && <JSSImage field={galleryItem.image} />}
        </div>
      ))}

      {currentItem && (
        <Dialog open={open} handler={handleClose} className="rounded-xl p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800 cursor-pointer z-50"
            aria-label="Close"
          >
            <span className="text-3xl font-bold">×</span>
          </button>

          <div className="flex justify-center items-center text-gray-600 text-sm mt-4">
            <span className="font-bold">{currentIndex + 1}</span>/{galleryItems.length}
          </div>

          <DialogHeader className="text-2xl font-bold text-center mt-4 mb-4">
            {currentItem.title && <JSSText field={currentItem.title} />}
          </DialogHeader>

          <DialogBody className="flex items-center justify-between gap-4">
            <Button
              variant="text"
              className="rounded-full p-2 border border-gray-300 hover:bg-gray-100"
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              <span className="text-2xl">←</span>
            </Button>

            <div className="flex flex-col items-center justify-center">
              {currentItem.image && <JSSImage field={currentItem.image} className="mb-4" />}
              {currentItem.description && (
                <JSSRichText
                  field={currentItem.description}
                  className="text-center text-gray-700"
                />
              )}
            </div>

            <Button
              variant="text"
              className="rounded-full p-2 border border-gray-300 hover:bg-gray-100"
              onClick={goToNext}
              disabled={currentIndex === galleryItems.length - 1}
            >
              <span className="text-2xl">→</span>
            </Button>
          </DialogBody>

          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <div className="text-left">
              {prevItem && <span className="font-semibold">{prevItem.title.value}</span>}
            </div>
            <div className="text-right">
              {nextItem && <span className="font-semibold">{nextItem.title.value}</span>}
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
