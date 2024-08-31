import { MutationFunction } from '@apollo/client';
import { generatePresignedUrlAndUpload } from './generatePresignedUrlAndUpload';
import SitecoreGuidUtils from './sitecoreGuid';

interface PresignedUploadUrlResponse {
  uploadMedia: {
    presignedUploadUrl: string;
  };
}

interface PresignedUploadUrlVariables {
  itemPath: string;
  language: string;
}

interface ProcessImageUploadParams {
  presignedUploadUrl: MutationFunction<PresignedUploadUrlResponse, PresignedUploadUrlVariables>;
  uploadPath: string;
  itemName: string;
  imageFile: File | null;
  alt: string;
  title: string;
  altEn: string;
  titleEn: string;
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
  altEn,
  titleEn,
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

  console.log('imageUrl', imageUrl);

  if (imageUrl?.Id) {
    const itemId = SitecoreGuidUtils.convertRawHyphenatedToGuid(imageUrl.Id);

    await updateAltAndTitleImage({
      variables: {
        itemId,
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
        itemId,
        altEn,
        titleEn,
        language: 'en',
      },
    });

    return itemId;
  }

  return null;
};
