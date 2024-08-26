import { MutationFunction } from '@apollo/client';
import { getTokenFromApi } from './getTokenClient';

interface PresignedUploadUrlResponse {
  uploadMedia: {
    presignedUploadUrl: string;
  };
}

interface PresignedUploadUrlVariables {
  itemPath: string;
}

interface UploadMediaResponse {
  Id: string;
  Name: string;
  ItemPath: string;
}

export const generatePresignedUrlAndUpload = async (
  presignedUploadUrl: MutationFunction<PresignedUploadUrlResponse, PresignedUploadUrlVariables>,
  path: string,
  itemName: string,
  file: File | null
): Promise<UploadMediaResponse | null> => {
  if (!file) {
    return null;
  }

  const token = await getTokenFromApi();
  if (!token) {
    throw new Error('Failed to fetch token');
  }

  // Construct the path for the file upload
  const itemPath = `${path}/${itemName}`;

  // Request presigned URL for uploading the file
  const presignedUploadUrlResponse = await presignedUploadUrl({
    variables: { itemPath },
  });

  console.log('presignedUploadUrlResponse', presignedUploadUrlResponse);

  // Get the presigned URL from the response
  const presignedUrl = presignedUploadUrlResponse?.data?.uploadMedia?.presignedUploadUrl;
  if (!presignedUrl) {
    throw new Error('Failed to get presigned URL');
  }

  // Create a FormData object to hold the file
  const formData = new FormData();
  formData.append('file', file);

  // Upload the file using the presigned URL
  const requestUploadMedia = await fetch(presignedUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ',
    },
    body: formData,
  });

  // Parse the JSON response to the expected format
  const responseUploadMedia: UploadMediaResponse = await requestUploadMedia.json();

  // Return the parsed response object
  return responseUploadMedia;
};
