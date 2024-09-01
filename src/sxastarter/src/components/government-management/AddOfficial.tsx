import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  CalendarDate,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { parseDate } from '@internationalized/date';
import removeAccents from 'remove-accents';
import { processImageUpload } from 'src/utils/imageUploadUtils';
import SitecoreGuidUtils from 'src/utils/sitecoreGuid';

interface Official {
  name: string;
  itemId: string;
}

interface ResultsNode {
  itemId: string;
  field: {
    value: string;
  };
}

interface OfficialsData {
  officials: {
    children: {
      nodes: ResultsNode[];
    };
  };
  sexes: {
    children: {
      nodes: ResultsNode[];
    };
  };
}

interface FormData {
  fullName: string;
  sex: string;
  bio: string;
  startDate: CalendarDate;
  bioPhoto: File | null;
  cardPhoto: File | null;
  bioEn: string;
}

interface FormErrors {
  fullName: string;
  sex: string;
  startDate?: string;
  bioPhoto?: string;
  cardPhoto?: string;
}

const GET_OFFICIALS = gql`
  query GetOfficials {
    officials: item(where: { path: "/sitecore/content/Demo/Demo/Data/Government Officials" }) {
      children {
        nodes {
          itemId
          field(name: "FullName") {
            value
          }
        }
      }
    }
    sexes: item(where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Sex" }) {
      children {
        nodes {
          itemId
          field(name: "SexType") {
            value
          }
        }
      }
    }
  }
`;

const CREATE_GOVERNMENT_OFFICIAL = gql`
  mutation CreateGovernmentOfficial(
    $itemName: String!
    $fullName: String!
    $sexId: String!
    $bio: String!
    $bioPhoto: String!
    $cardPhoto: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "FullName", value: $fullName }
          { name: "Sex", value: $sexId }
          { name: "Bio", value: $bio }
          { name: "BioPhoto", value: $bioPhoto }
          { name: "CardPhoto", value: $cardPhoto }
        ]
        templateId: $templateId
        parent: $parent
        language: "pt"
      }
    ) {
      item {
        itemId
        name
        path
      }
    }
  }
`;

const PRESIGNED_UPLOAD_URL = gql`
  mutation UploadMedia($itemPath: String!, $language: String!) {
    uploadMedia(input: { itemPath: $itemPath, language: $language }) {
      presignedUploadUrl
    }
  }
`;

const UPDATE_ALT_AND_TITLE_IMAGE = gql`
  mutation UpdateAltAndTitleImage(
    $itemId: ID!
    $alt: String!
    $title: String!
    $language: String!
  ) {
    updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Alt", value: $alt }, { name: "Title", value: $title }]
        language: $language
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

const ADD_ITEM_VERSION_EN = gql`
  mutation AddItemVersionEn($itemId: ID!) {
    addItemVersion(input: { itemId: $itemId, language: "en" }) {
      item {
        itemId
      }
    }
  }
`;

const UPDATE_DISPLAY_NAME = gql`
  mutation UpdateDisplayName($itemId: ID!, $displayName: String!, $language: String!) {
    updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "__Display name", value: $displayName }]
        language: $language
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

const UPDATE_ITEM_EN = gql`
  mutation UpdateItemEn($itemId: ID!, $bio: String!) {
    updateItem(input: { itemId: $itemId, fields: [{ name: "Bio", value: $bio }], language: "en" }) {
      item {
        itemId
      }
    }
  }
`;

const AddOfficial: React.FC = (): JSX.Element => {
  const [officialList, setOfficialList] = useState<Official[]>([]);
  const [sexList, setSexList] = useState<Official[]>([]);
  const [selectedOfficialId, setSelectedOfficialId] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    sex: '',
    bio: '',
    bioPhoto: null,
    startDate: parseDate(new Date().toJSON().slice(0, 10)),
    cardPhoto: null,
    bioEn: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    fullName: '',
    sex: '',
    startDate: '',
  });

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const { loading } = useQuery<OfficialsData>(GET_OFFICIALS, {
    onCompleted: (data) => {
      setOfficialList(
        data.officials.children.nodes.map((official) => ({
          name: official.field.value || '',
          itemId: official.itemId,
        }))
      );

      setSexList(
        data.sexes.children.nodes.map((sex) => ({
          name: sex.field.value || '',
          itemId: sex.itemId,
        }))
      );
    },
  });

  const [createGovernmentOfficial] = useMutation(CREATE_GOVERNMENT_OFFICIAL);
  const [presignedUploadUrl] = useMutation(PRESIGNED_UPLOAD_URL);
  const [updateAltAndTitleImage] = useMutation(UPDATE_ALT_AND_TITLE_IMAGE);
  const [addItemVersionEn] = useMutation(ADD_ITEM_VERSION_EN);
  const [updateDisplayName] = useMutation(UPDATE_DISPLAY_NAME);
  const [updateItemEn] = useMutation(UPDATE_ITEM_EN);

  const handleOfficialSelect = (officialId: string) => setSelectedOfficialId(officialId);

  const handleFullNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSexSelectionChange = (sexId: string) => {
    setFormData((prev) => ({ ...prev, sex: sexId }));
    if (sexId) {
      setFormErrors((prev) => ({ ...prev, sex: '' }));
    }
  };

  const handleBioPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      bioPhoto: file,
    }));
  };

  const handleCardPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      cardPhoto: file,
    }));
  };

  const handleStartDateChange = (date: CalendarDate | null) => {
    setFormData((prev) => ({ ...prev, startDate: date! }));
    if (date) {
      setFormErrors((prev) => ({ ...prev, startDate: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      fullName: '',
      sex: '',
      startDate: '',
      bioPhoto: '',
      cardPhoto: '',
    };

    if (!formData.fullName.trim()) errors.fullName = 'Please enter a full name';
    if (!formData.sex) errors.sex = 'Please select a sex';
    if (!formData.startDate) errors.startDate = 'Please select a start date';
    if (!formData.bioPhoto) errors.bioPhoto = 'Please upload a bio photo';
    if (!formData.cardPhoto) errors.cardPhoto = 'Please upload a card photo';

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitLoading(true);

      const itemName = removeAccents(formData.fullName.trim());

      try {
        const bioPhotoUrlId = await processImageUpload({
          presignedUploadUrl,
          uploadPath: 'Project/Demo/Demo/Government Officials/Bio Photo',
          itemName,
          imageFile: formData.bioPhoto,
          alt: formData.fullName,
          title: formData.fullName,
          altEn: formData.fullName,
          titleEn: formData.fullName,
          updateAltAndTitleImage,
          addItemVersionEn,
        });

        const cardPhotoUrlId = await processImageUpload({
          presignedUploadUrl,
          uploadPath: 'Project/Demo/Demo/Government Officials/Card Photo',
          itemName,
          imageFile: formData.cardPhoto,
          alt: formData.fullName,
          title: formData.fullName,
          altEn: formData.fullName,
          titleEn: formData.fullName,
          updateAltAndTitleImage,
          addItemVersionEn,
        });

        const response = await createGovernmentOfficial({
          variables: {
            itemName,
            fullName: formData.fullName,
            sexId: SitecoreGuidUtils.convertRawToGuid(formData.sex),
            bio: formData.bio,
            bioPhoto: bioPhotoUrlId
              ? `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(bioPhotoUrlId)}" />`
              : '',
            cardPhoto: cardPhotoUrlId
              ? `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(
                  cardPhotoUrlId
                )}" />`
              : '',
            templateId: '{3F331F63-E5A3-4B22-B4E5-1AA7F42C5C48}',
            parent: '{A4E2981B-986B-459A-970B-9D8DC1C934EA}',
          },
        });

        const newOfficial = response.data?.createItem?.item;
        await updateDisplayName({
          variables: { itemId: newOfficial.itemId, displayName: formData.fullName, language: 'pt' },
        });
        await addItemVersionEn({
          variables: {
            itemId: newOfficial.itemId,
          },
        });
        await updateItemEn({
          variables: {
            itemId: newOfficial.itemId,
            bio: formData.bioEn,
          },
        });
        await updateDisplayName({
          variables: { itemId: newOfficial.itemId, displayName: formData.fullName, language: 'en' },
        });
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('The item name')) {
          setErrorMessage('The name already exists, please choose another.');
        } else {
          setErrorMessage('An error occurred while adding the official. Please try again.');
        }
      } finally {
        setSubmitLoading(false);
      }

      console.log('Form Submitted', formData);
      console.log('Official Selected:', selectedOfficialId);
    }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <Autocomplete
        label="Select an official"
        size="lg"
        radius="sm"
        onSelectionChange={handleOfficialSelect}
      >
        {officialList.map((official) => (
          <AutocompleteItem key={official.itemId} value={official.itemId}>
            {official.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <h2 className="text-2xl font-semibold">Add New Official</h2>

      <Input
        type="text"
        label="Full Name"
        size="lg"
        isRequired
        radius="sm"
        isClearable
        name="fullName"
        isInvalid={!!formErrors.fullName}
        errorMessage={formErrors.fullName}
        onChange={handleFullNameInputChange}
        value={formData.fullName}
      />

      <Spacer x={4} />

      <Select
        label="Select a sex"
        isRequired
        size="lg"
        radius="sm"
        isInvalid={!!formErrors.sex}
        errorMessage={formErrors.sex}
        value={formData.sex}
        onSelectionChange={(keys) => handleSexSelectionChange(Array.from(keys).join(''))}
      >
        {sexList.map((sex) => (
          <SelectItem key={sex.itemId} value={sex.itemId}>
            {sex.name}
          </SelectItem>
        ))}
      </Select>

      <Spacer x={4} />

      <Input
        type="file"
        size="lg"
        isRequired
        radius="sm"
        onChange={handleBioPhotoFileChange}
        isInvalid={!!formErrors.bioPhoto}
        color={formErrors.bioPhoto ? 'danger' : 'default'}
        errorMessage={formErrors.bioPhoto}
        label="Bio Photo"
      />

      <Spacer x={4} />

      <Input
        type="file"
        size="lg"
        isRequired
        radius="sm"
        onChange={handleCardPhotoFileChange}
        isInvalid={!!formErrors.cardPhoto}
        color={formErrors.cardPhoto ? 'danger' : 'default'}
        errorMessage={formErrors.cardPhoto}
        label="Card Photo"
      />

      <Spacer x={4} />

      <DatePicker
        label="Start Date"
        size="lg"
        isRequired
        radius="sm"
        value={formData.startDate}
        onChange={handleStartDateChange}
        isInvalid={!!formErrors.startDate}
        errorMessage={formErrors.startDate}
      />

      <Spacer x={10} />

      <ReactQuill
        theme="snow"
        value={formData.bio}
        onChange={(value) => setFormData((prev) => ({ ...prev, bio: value }))}
        placeholder="Bio in PT"
      />

      <Spacer x={10} />

      <ReactQuill
        theme="snow"
        value={formData.bioEn}
        onChange={(value) => setFormData((prev) => ({ ...prev, bioEn: value }))}
        placeholder="Bio in EN"
      />

      <div className="flex justify-end">
        <Button type="submit" color="primary" size="lg" disabled={submitLoading}>
          {submitLoading ? <Spinner size="sm" /> : 'Add Prime Minister'}
        </Button>
      </div>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default AddOfficial;
