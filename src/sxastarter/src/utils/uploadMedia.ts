import { MutationFunction } from '@apollo/client';

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

  // Fetch a token
  const response = await fetch('https://auth.sitecorecloud.io/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      audience: 'https://api.sitecorecloud.io',
      grant_type: 'client_credentials',
      client_id: 'g86AvchdargPs6JKG8a4ozUO2o7Lehm8',
      client_secret: 're9C6_TNPotTYF8wNVw9SvniPfoLvNu8NynXPDR8-Xky3uPIlCvSIEN8xdieanAH',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch token');
  }

  // Upload the file using the presigned URL
  const requestUploadMedia = await fetch(presignedUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
    body: formData,
  });

  // Parse the JSON response to the expected format
  const responseUploadMedia: UploadMediaResponse = await requestUploadMedia.json();

  // Return the parsed response object
  return responseUploadMedia;
};
