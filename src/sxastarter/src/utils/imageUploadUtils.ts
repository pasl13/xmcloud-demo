import { MutationFunction } from '@apollo/client';
import { generatePresignedUrlAndUpload } from './generatePresignedUrlAndUpload';

interface ProcessImageUploadParams {
  presignedUploadUrl: any;
  uploadPath: string;
  itemName: string;
  imageFile: File | null;
  alt: string;
  title: string;
  updateAltAndTitleImage: MutationFunction;
  addItemVersionEn: MutationFunction;
}

export const processImageUpload = async ({
  presignedUploadUrl,
  uploadPath,
  itemName,
  imageFile,
  alt,
  title,
  updateAltAndTitleImage,
  addItemVersionEn,
}: ProcessImageUploadParams) => {
  if (!imageFile) return null;

  const imageUrl = await generatePresignedUrlAndUpload(
    presignedUploadUrl,
    uploadPath,
    itemName,
    imageFile
  );

  if (imageUrl?.Id) {
    await updateAltAndTitleImage({
      variables: {
        itemId: imageUrl.Id,
        alt,
        title,
        language: 'pt',
      },
    });

    await addItemVersionEn({
      variables: { itemId: imageUrl.Id },
    });

    await updateAltAndTitleImage({
      variables: {
        itemId: imageUrl.Id,
        alt,
        title,
        language: 'en',
      },
    });
  }

  return imageUrl?.Id;
};
