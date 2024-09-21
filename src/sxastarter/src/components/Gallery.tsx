import React, { FC, useState, useEffect, useCallback } from 'react';
import {
  Image as JSSImage,
  ImageField,
  RichTextField,
  TextField,
  Text,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  ModalConfiguration,
  ModalProvider,
  ModalProviderProps,
  useModalContext,
} from '@ama-pt/agora-design-system';
import Image from 'next/image';

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

type CurrentStoryProps = {
  datasource: Fields;
  styles: string;
  id?: string;
};

type GalleryProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type ModalData = {
  title: TextField;
  description: RichTextField;
  image: ImageField;
};

const ContentComponent: FC<{
  modalData: ModalData;
  darkMode: boolean;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentIndex: number;
  totalImages: number;
  nextTitle?: string;
  prevTitle?: string;
}> = ({
  modalData,
  darkMode,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  currentIndex,
  totalImages,
  nextTitle,
  prevTitle,
}) => {
  const textColor = darkMode ? 'white' : '[var(--color-neutral-900)]';
  console.log(textColor);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (event.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasNext, hasPrev, onNext, onPrev]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-container">
          {hasPrev && (
            <div className="modal-arrow modal-prev">
              <button onClick={onPrev}>
                <Image
                  src="/images/icons/chevron-left.png"
                  alt="left-arrow"
                  width={50}
                  height={50}
                />
              </button>
              {prevTitle && <p className="arrow-title">{prevTitle}</p>}
            </div>
          )}
          <div className="modal-header">
            <span>{`${currentIndex + 1}/${totalImages}`}</span>
          </div>
          <div className="modal-title">
            <h3>{modalData.title && <Text field={modalData.title} />}</h3>{' '}
          </div>
          <div className="modal-body">
            <div className="modal-image">
              {modalData.image && <JSSImage field={modalData.image} />}
            </div>
            <div className="modal-description">
              {modalData.description && <RichText field={modalData.description} />}
            </div>
          </div>
          {hasNext && (
            <div className="modal-arrow modal-next">
              <button onClick={onNext}>
                <Image
                  src="/images/icons/chevron-right.png"
                  alt="right-arrow"
                  width={50}
                  height={50}
                />
              </button>
              {nextTitle && <p className="arrow-title">{nextTitle}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CurrentStory: FC<CurrentStoryProps> = ({ datasource, styles, id }) => {
  const { show } = useModalContext();
  const darkMode = false;
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Memoize getModalDataByIndex to prevent unnecessary recalculations
  const getModalDataByIndex = useCallback(
    (index: number): ModalData => {
      const galleryItem = datasource.data.datasource.children.results[index];
      const imageField = galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue
        ?.value;
      const titleField = galleryItem.fields.find((field) => field.name === 'ImageTitle')?.jsonValue;
      const descriptionField = galleryItem.fields.find(
        (field) => field.name === 'ImageDescription'
      )?.jsonValue;

      const image: ImageField = {
        value: typeof imageField === 'object' && 'src' in imageField ? imageField : undefined,
        editable: galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue?.editable,
      };

      const title: TextField = {
        value: titleField?.value || '',
        editable: titleField?.editable || '',
      };

      const description: RichTextField = {
        value: descriptionField?.value || '',
        editable: descriptionField?.editable || '',
      };

      return { title, description, image };
    },
    [datasource]
  );

  // Memoize handleNext to prevent unnecessary recalculations
  const handleNext = useCallback(() => {
    if (
      currentIndex !== null &&
      currentIndex < datasource.data.datasource.children.results.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, datasource]);

  // Memoize handlePrev to prevent unnecessary recalculations
  const handlePrev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // Memoize showModal to prevent unnecessary re-renders
  const showModal = useCallback(
    (modalData: ModalData, index: number) => {
      const totalImages = datasource.data.datasource.children.results.length;

      // Use nullish coalescing (??) to handle null values
      const nextTitle =
        index < totalImages - 1
          ? datasource.data.datasource.children.results[index + 1].fields.find(
              (field) => field.name === 'ImageTitle'
            )?.jsonValue?.value ?? undefined
          : undefined;

      const prevTitle =
        index > 0
          ? datasource.data.datasource.children.results[index - 1].fields.find(
              (field) => field.name === 'ImageTitle'
            )?.jsonValue?.value ?? undefined
          : undefined;

      show(
        <ContentComponent
          modalData={modalData}
          darkMode={darkMode}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={index < totalImages - 1}
          hasPrev={index > 0}
          currentIndex={index}
          totalImages={totalImages}
          nextTitle={nextTitle} // No longer null
          prevTitle={prevTitle} // No longer null
        />,
        {
          closeButtonLabel: 'Close',
          darkMode: false,
          onClose: () => {
            setCurrentIndex(null);
          },
        } as ModalConfiguration
      );
    },
    [darkMode, datasource, handleNext, handlePrev, show]
  );

  // Effect to update modal content whenever currentIndex changes
  useEffect(() => {
    if (currentIndex !== null) {
      const modalData = getModalDataByIndex(currentIndex);
      showModal(modalData, currentIndex);
    }
  }, [currentIndex, getModalDataByIndex, showModal]);

  const openModalHandler = (index: number) => {
    setCurrentIndex(index);
  };

  const renderGalleryItems = datasource.data.datasource.children.results.map(
    (galleryItem, index) => {
      const imageField = galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue
        ?.value;
      const image: ImageField = {
        value: typeof imageField === 'object' && 'src' in imageField ? imageField : undefined,
        editable: galleryItem.fields.find((field) => field.name === 'Image')?.jsonValue?.editable,
      };

      return (
        <div
          className={styles}
          id={id || undefined}
          key={index}
          onClick={() => openModalHandler(index)}
        >
          {image && <JSSImage field={image} />}
        </div>
      );
    }
  );

  return <>{renderGalleryItems}</>;
};

export const Default: FC<GalleryProps> = (props) => {
  const { fields, params } = props;
  const datasource = fields?.data?.datasource;
  const styles = `component gallery ${params.styles}`.trim();
  const id = params.RenderingIdentifier;

  if (datasource) {
    const modalProviderProps: ModalProviderProps = {
      children: undefined,
      dismissOnEscape: true,
    };

    return (
      <ModalProvider {...modalProviderProps}>
        <CurrentStory datasource={fields} styles={styles} id={id} />
      </ModalProvider>
    );
  }

  return (
    <div className={styles} id={id || undefined}>
      <div className="gallery-items">
        <h3>Gallery</h3>
      </div>
    </div>
  );
};
