import gql from 'graphql-tag';

export const ADD_ITEM_VERSION = gql`
  mutation AddItemVersion($itemId: ID!, $language: String!) {
    addItemVersion(input: { itemId: $itemId, language: $language }) {
      item {
        itemId
      }
    }
  }
`;

export const UPDATE_DISPLAY_NAME = gql`
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

// Official
export const CREATE_GOVERNMENT_OFFICIAL = gql`
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
        language: "en"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

export const UPDATE_GOVERNMENT_OFFICIAL = gql`
  mutation UpdateGovernmentOfficial($itemId: ID!, $bio: String!) {
    updateItem(input: { itemId: $itemId, fields: [{ name: "Bio", value: $bio }], language: "pt" }) {
      item {
        itemId
      }
    }
  }
`;

// Constitutional Government
export const CREATE_CONSTITUTIONAL_GOVERNMENT = gql`
  mutation CreateConstitutionalGovernment(
    $itemName: String!
    $title: String!
    $logo: String!
    $description: String!
    $startDate: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "Title", value: $title }
          { name: "Logo", value: $logo }
          { name: "Description", value: $description }
          { name: "StartDate", value: $startDate }
        ]
        templateId: $templateId
        parent: $parent
        language: "en"
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

export const UPDATE_CONSTITUTIONAL_GOVERNMENT = gql`
  mutation UpdateConstitituinalGovernment($itemId: ID!, $title: ID!, $description: String!) {
    addItemVersion: addItemVersion(input: { itemId: $itemId, language: "pt" }) {
      item {
        itemId
      }
    }
    updateItem: updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Title", value: $title }, { name: "Description", value: $description }]
        language: "pt"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

// Prime Minister
export const CREATE_PRIME_MINISTER = gql`
  mutation CreatePrimeMinister(
    $title: String!
    $official: String!
    $startDate: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: "prime-minister"
        fields: [
          { name: "Title", value: $title }
          { name: "Official", value: $official }
          { name: "StartDate", value: $startDate }
        ]
        templateId: $templateId
        parent: $parent
        language: "en"
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

export const UPDATE_PRIME_MINISTER = gql`
  mutation UpdatePrimeMinister($itemId: ID!, $title: String!, $displayName: String!) {
    addItemVersion: addItemVersion(input: { itemId: $itemId, language: "pt" }) {
      item {
        itemId
      }
    }

    updateItem: updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Title", value: $title }, { name: "__Display name", value: $displayName }]
        language: "pt"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

export const CREATE_VICE = gql`
  mutation CreateVice(
    $title: String!
    $official: String!
    $startDate: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: "vice"
        fields: [
          { name: "Title", value: $title }
          { name: "Official", value: $official }
          { name: "StartDate", value: $startDate }
        ]
        templateId: $templateId
        parent: $parent
        language: "en"
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

export const UPDATE_VICE = gql`
  mutation UpdateVice($itemId: ID!, $title: String!, $displayName: String!) {
    addItemVersion: addItemVersion(input: { itemId: $itemId, language: "pt" }) {
      item {
        itemId
      }
    }

    updateItem: updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Title", value: $title }, { name: "__Display name", value: $displayName }]
        language: "pt"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

// Upload Media
export const PRESIGNED_UPLOAD_URL = gql`
  mutation UploadMedia($itemPath: String!, $language: String!) {
    uploadMedia(input: { itemPath: $itemPath, language: $language }) {
      presignedUploadUrl
    }
  }
`;

export const UPDATE_ALT_AND_TITLE_IMAGE = gql`
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

export const UPDATE_ITEM_EN = gql`
  mutation UpdateItemEn($itemId: ID!, $title: String!, $description: String!) {
    updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Title", value: $title }, { name: "Description", value: $description }]
        language: "en"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment(
    $itemName: String!
    $key: String!
    $text: String!
    $wordGender: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "Key", value: $key }
          { name: "Text", value: $text }
          { name: "WordGender", value: $wordGender }
        ]
        templateId: $templateId
        parent: $parent
        language: "en"
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

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment(
    $itemId: ID!
    $displayName: String!
    $key: String!
    $text: String!
    $wordGender: String!
  ) {
    addItemVersionEn: addItemVersion(input: { itemId: $itemId, language: "pt" }) {
      item {
        itemId
      }
    }

    updateItem: updateItem(
      input: {
        itemId: $itemId
        fields: [
          { name: "__Display name", value: $displayName }
          { name: "Key", value: $key }
          { name: "Text", value: $text }
          { name: "WordGender", value: $wordGender }
        ]
        language: "pt"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

export const CREATE_SECRETARY_OF_STATE_PAGE = gql`
  mutation CreateSecretaryOfStatePage(
    $itemName: String!
    $title: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [{ name: "Title", value: $title }]
        templateId: $templateId
        parent: $parent
        language: "en"
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

export const UPDATE_SECRETARY_OF_STATE_PAGE = gql`
  mutation UpdateSecretaryOfStatePage($itemId: ID!, $title: String!, $displayName: String!) {
    addItemVersion: addItemVersion(input: { itemId: $itemId, language: "pt" }) {
      item {
        itemId
      }
    }

    updateItem: updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Title", value: $title }, { name: "__Display name", value: $displayName }]
        language: "pt"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

export const ADD_SECRETARY_OF_STATE = gql`
  mutation AddSecretaryOfState(
    $itemName: String!
    $title: String!
    $official: String!
    $startDate: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "Title", value: $title }
          { name: "Official", value: $official }
          { name: "StartDate", value: $startDate }
        ]
        templateId: $templateId
        parent: $parent
        language: "en"
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
