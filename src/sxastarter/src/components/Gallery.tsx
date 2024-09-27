import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageField,
  Image as JSSImage,
  RichText as JSSRichText,
  RichTextField,
  Text as JSSText,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

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
        <Dialog open={open} handler={handleClose} className="modal-container">
          <DialogHeader className="modal-title">
            <div className="modal-count">
              <span className="modal-count-index">{currentIndex + 1}</span>/{galleryItems.length}
            </div>
            {currentItem.title && <JSSText field={currentItem.title} />}
            <button onClick={handleClose} className="modal-close" aria-label="Close">
              <span className="modal-close-icon">×</span>
            </button>
          </DialogHeader>

          <DialogBody className="modal-body">
            <div className="modal-content">
              {currentItem.image && <JSSImage field={currentItem.image} className="modal-image" />}
              {currentItem.description && (
                <JSSRichText field={currentItem.description} className="modal-description" />
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              className="modal-button-previous"
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              <span className="modal-button-icon">←</span>
            </Button>

            <Button
              variant="text"
              className="modal-button-next"
              onClick={goToNext}
              disabled={currentIndex === galleryItems.length - 1}
            >
              <span className="modal-button-icon">→</span>
            </Button>
          </DialogFooter>

          <div className="modal-footer">
            <div className="modal-prev">
              {prevItem && <span className="font-semibold">{prevItem.title.value}</span>}
            </div>
            <div className="modal-next text-right">
              {nextItem && <span className="font-semibold">{nextItem.title.value}</span>}
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
