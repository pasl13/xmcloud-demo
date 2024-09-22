// import React, { useState, useMemo } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import gql from 'graphql-tag';
// import dynamic from 'next/dynamic';
// import {
//   Autocomplete,
//   AutocompleteItem,
//   Button,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   Select,
//   SelectItem,
//   Spacer,
//   Spinner,
//   useDisclosure,
// } from '@nextui-org/react';
// import removeAccents from 'remove-accents';
// import { processImageUpload } from 'src/utils/imageUploadUtils';
// import SitecoreGuidUtils from 'src/utils/sitecoreGuid';

// interface Official {
//   name: string;
//   itemId: string;
// }

// interface ResultsNode {
//   itemId: string;
//   field: {
//     value: string;
//   };
// }

// interface OfficialsData {
//   officials: {
//     children: {
//       nodes: ResultsNode[];
//     };
//   };
//   sexes: {
//     children: {
//       nodes: ResultsNode[];
//     };
//   };
// }

// interface FormData {
//   fullName: string;
//   sex: string;
//   bio: string;
//   bioPhoto: File | null;
//   cardPhoto: File | null;
//   bioEn: string;
// }

// interface FormErrors {
//   fullName: string;
//   sex: string;
//   bioPhoto?: string;
//   cardPhoto?: string;
// }

// interface AddOfficialProps {
//   onSelectOfficial: (official: { itemId: string; name: string }) => void;
// }

// const GET_OFFICIALS = gql`
//   query GetOfficials {
//     officials: item(where: { path: "/sitecore/content/Demo/Demo/Data/Government Officials" }) {
//       children {
//         nodes {
//           itemId
//           field(name: "FullName") {
//             value
//           }
//         }
//       }
//     }
//     sexes: item(where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Sex" }) {
//       children {
//         nodes {
//           itemId
//           field(name: "SexType") {
//             value
//           }
//         }
//       }
//     }
//   }
// `;

// const CREATE_GOVERNMENT_OFFICIAL = gql`
//   mutation CreateGovernmentOfficial(
//     $itemName: String!
//     $fullName: String!
//     $sexId: String!
//     $bio: String!
//     $bioPhoto: String!
//     $cardPhoto: String!
//     $templateId: ID!
//     $parent: ID!
//   ) {
//     createItem(
//       input: {
//         name: $itemName
//         fields: [
//           { name: "FullName", value: $fullName }
//           { name: "Sex", value: $sexId }
//           { name: "Bio", value: $bio }
//           { name: "BioPhoto", value: $bioPhoto }
//           { name: "CardPhoto", value: $cardPhoto }
//         ]
//         templateId: $templateId
//         parent: $parent
//         language: "pt"
//       }
//     ) {
//       item {
//         itemId
//         name
//         path
//       }
//     }
//   }
// `;

// const PRESIGNED_UPLOAD_URL = gql`
//   mutation UploadMedia($itemPath: String!, $language: String!) {
//     uploadMedia(input: { itemPath: $itemPath, language: $language }) {
//       presignedUploadUrl
//     }
//   }
// `;

// const UPDATE_ALT_AND_TITLE_IMAGE = gql`
//   mutation UpdateAltAndTitleImage(
//     $itemId: ID!
//     $alt: String!
//     $title: String!
//     $language: String!
//   ) {
//     updateItem(
//       input: {
//         itemId: $itemId
//         fields: [{ name: "Alt", value: $alt }, { name: "Title", value: $title }]
//         language: $language
//       }
//     ) {
//       item {
//         itemId
//       }
//     }
//   }
// `;

// const ADD_ITEM_VERSION_EN = gql`
//   mutation AddItemVersionEn($itemId: ID!) {
//     addItemVersion(input: { itemId: $itemId, language: "en" }) {
//       item {
//         itemId
//       }
//     }
//   }
// `;

// const UPDATE_DISPLAY_NAME = gql`
//   mutation UpdateDisplayName($itemId: ID!, $displayName: String!, $language: String!) {
//     updateItem(
//       input: {
//         itemId: $itemId
//         fields: [{ name: "__Display name", value: $displayName }]
//         language: $language
//       }
//     ) {
//       item {
//         itemId
//       }
//     }
//   }
// `;

// const UPDATE_ITEM_EN = gql`
//   mutation UpdateItemEn($itemId: ID!, $bio: String!) {
//     updateItem(input: { itemId: $itemId, fields: [{ name: "Bio", value: $bio }], language: "en" }) {
//       item {
//         itemId
//       }
//     }
//   }
// `;

// const AddOfficial = ({ onSelectOfficial }: AddOfficialProps): JSX.Element => {
//   const [officialList, setOfficialList] = useState<Official[]>([]);
//   const [sexList, setSexList] = useState<Official[]>([]);
//   const [submitLoading, setSubmitLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [formData, setFormData] = useState<FormData>({
//     fullName: '',
//     sex: '',
//     bio: '',
//     bioPhoto: null,
//     cardPhoto: null,
//     bioEn: '',
//   });
//   const [formErrors, setFormErrors] = useState<FormErrors>({
//     fullName: '',
//     sex: '',
//   });

//   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

//   const { loading, refetch } = useQuery<OfficialsData>(GET_OFFICIALS, {
//     onCompleted: (data) => {
//       setOfficialList(
//         data.officials.children.nodes.map((official) => ({
//           name: official.field.value || '',
//           itemId: official.itemId,
//         }))
//       );

//       setSexList(
//         data.sexes.children.nodes.map((sex) => ({
//           name: sex.field.value || '',
//           itemId: sex.itemId,
//         }))
//       );
//     },
//   });

//   const [createGovernmentOfficial] = useMutation(CREATE_GOVERNMENT_OFFICIAL);
//   const [presignedUploadUrl] = useMutation(PRESIGNED_UPLOAD_URL);
//   const [updateAltAndTitleImage] = useMutation(UPDATE_ALT_AND_TITLE_IMAGE);
//   const [addItemVersionEn] = useMutation(ADD_ITEM_VERSION_EN);
//   const [updateDisplayName] = useMutation(UPDATE_DISPLAY_NAME);
//   const [updateItemEn] = useMutation(UPDATE_ITEM_EN);

//   const handleOfficialSelect = (key: string | null) => {
//     if (!key) return;

//     const selectedOfficial = officialList.find((official) => official.itemId === key);

//     if (selectedOfficial) {
//       onSelectOfficial?.(selectedOfficial);
//     }
//   };

//   const handleFullNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSexSelectionChange = (sexId: string) => {
//     setFormData((prev) => ({ ...prev, sex: sexId }));
//     if (sexId) {
//       setFormErrors((prev) => ({ ...prev, sex: '' }));
//     }
//   };

//   const handleBioPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setFormData((prev) => ({
//       ...prev,
//       bioPhoto: file,
//     }));
//   };

//   const handleCardPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setFormData((prev) => ({
//       ...prev,
//       cardPhoto: file,
//     }));
//   };

//   const validateForm = (): boolean => {
//     const errors: FormErrors = {
//       fullName: '',
//       sex: '',
//       bioPhoto: '',
//       cardPhoto: '',
//     };

//     if (!formData.fullName.trim()) errors.fullName = 'Please enter a full name';
//     if (!formData.sex) errors.sex = 'Please select a sex';
//     if (!formData.bioPhoto) errors.bioPhoto = 'Please upload a bio photo';
//     if (!formData.cardPhoto) errors.cardPhoto = 'Please upload a card photo';

//     setFormErrors(errors);
//     return Object.values(errors).every((error) => !error);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setSubmitLoading(true);

//       const itemName = removeAccents(formData.fullName.trim());

//       try {
//         const bioPhotoUrlId = await processImageUpload({
//           presignedUploadUrl,
//           uploadPath: 'Project/Demo/Demo/Government Officials/Bio Photo',
//           itemName,
//           imageFile: formData.bioPhoto,
//           alt: formData.fullName,
//           title: formData.fullName,
//           altEn: formData.fullName,
//           titleEn: formData.fullName,
//           updateAltAndTitleImage,
//           addItemVersionEn,
//         });

//         const cardPhotoUrlId = await processImageUpload({
//           presignedUploadUrl,
//           uploadPath: 'Project/Demo/Demo/Government Officials/Card Photo',
//           itemName,
//           imageFile: formData.cardPhoto,
//           alt: formData.fullName,
//           title: formData.fullName,
//           altEn: formData.fullName,
//           titleEn: formData.fullName,
//           updateAltAndTitleImage,
//           addItemVersionEn,
//         });

//         const response = await createGovernmentOfficial({
//           variables: {
//             itemName,
//             fullName: formData.fullName,
//             sexId: SitecoreGuidUtils.convertRawToGuid(formData.sex),
//             bio: formData.bio,
//             bioPhoto: bioPhotoUrlId
//               ? `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(bioPhotoUrlId)}" />`
//               : '',
//             cardPhoto: cardPhotoUrlId
//               ? `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(
//                   cardPhotoUrlId
//                 )}" />`
//               : '',
//             templateId: '{3F331F63-E5A3-4B22-B4E5-1AA7F42C5C48}',
//             parent: '{A4E2981B-986B-459A-970B-9D8DC1C934EA}',
//           },
//         });

//         const newOfficial = response.data?.createItem?.item;
//         await updateDisplayName({
//           variables: { itemId: newOfficial.itemId, displayName: formData.fullName, language: 'pt' },
//         });
//         await addItemVersionEn({
//           variables: {
//             itemId: newOfficial.itemId,
//           },
//         });
//         await updateItemEn({
//           variables: {
//             itemId: newOfficial.itemId,
//             bio: formData.bioEn,
//           },
//         });
//         await updateDisplayName({
//           variables: { itemId: newOfficial.itemId, displayName: formData.fullName, language: 'en' },
//         });

//         setOfficialList((prevList) => [
//           ...prevList,
//           { name: newOfficial.name, itemId: newOfficial.itemId },
//         ]);

//         await refetch();

//         onOpenChange();
//       } catch (error: unknown) {
//         if (error instanceof Error && error.message.includes('The item name')) {
//           setErrorMessage('The name already exists, please choose another.');
//         } else {
//           setErrorMessage('An error occurred while adding the official. Please try again.');
//         }
//       } finally {
//         setSubmitLoading(false);
//       }
//     }
//   };

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="government-official">
//       <div className="flex items-center space-x-4">
//         <Autocomplete
//           label="Select an official"
//           size="lg"
//           radius="sm"
//           onSelectionChange={handleOfficialSelect}
//         >
//           {officialList.map((official) => (
//             <AutocompleteItem key={official.itemId} value={official.itemId}>
//               {official.name}
//             </AutocompleteItem>
//           ))}
//         </Autocomplete>

//         <Button color="primary" onPress={onOpen} size="lg" radius="sm">
//           Add New Official
//         </Button>
//       </div>

//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="normal">
//         <ModalContent>
//           {() => (
//             <>
//               <form onSubmit={handleSubmit}>
//                 <ModalHeader className="flex flex-col gap-1">Government Official</ModalHeader>
//                 <ModalBody>
//                   <Input
//                     type="text"
//                     label="Full Name"
//                     size="lg"
//                     isRequired
//                     radius="sm"
//                     isClearable
//                     name="fullName"
//                     isInvalid={!!formErrors.fullName}
//                     errorMessage={formErrors.fullName}
//                     onChange={handleFullNameInputChange}
//                     value={formData.fullName}
//                   />

//                   <Spacer y={2} />

//                   <Select
//                     label="Select a sex"
//                     size="lg"
//                     radius="sm"
//                     isInvalid={!!formErrors.sex}
//                     errorMessage={formErrors.sex}
//                     value={formData.sex}
//                     onSelectionChange={(keys) =>
//                       handleSexSelectionChange(Array.from(keys).join(''))
//                     }
//                   >
//                     {sexList.map((sex) => (
//                       <SelectItem key={sex.itemId} value={sex.itemId}>
//                         {sex.name}
//                       </SelectItem>
//                     ))}
//                   </Select>

//                   <Spacer y={2} />

//                   <Input
//                     type="file"
//                     size="lg"
//                     isRequired
//                     radius="sm"
//                     onChange={handleBioPhotoFileChange}
//                     isInvalid={!!formErrors.bioPhoto}
//                     color={formErrors.bioPhoto ? 'danger' : 'default'}
//                     errorMessage={formErrors.bioPhoto}
//                     label="Bio Photo"
//                   />

//                   <Spacer y={2} />

//                   <Input
//                     type="file"
//                     size="lg"
//                     isRequired
//                     radius="sm"
//                     onChange={handleCardPhotoFileChange}
//                     isInvalid={!!formErrors.cardPhoto}
//                     color={formErrors.cardPhoto ? 'danger' : 'default'}
//                     errorMessage={formErrors.cardPhoto}
//                     label="Card Photo"
//                   />

//                   <Spacer y={2} />

//                   <ReactQuill
//                     theme="snow"
//                     value={formData.bio}
//                     onChange={(value) => setFormData((prev) => ({ ...prev, bio: value }))}
//                     placeholder="Bio in PT"
//                   />

//                   <Spacer y={2} />

//                   <ReactQuill
//                     theme="snow"
//                     value={formData.bioEn}
//                     onChange={(value) => setFormData((prev) => ({ ...prev, bioEn: value }))}
//                     placeholder="Bio in EN"
//                   />
//                 </ModalBody>
//                 <ModalFooter>
//                   <div className="flex justify-end">
//                     <Button type="submit" color="primary" size="lg" disabled={submitLoading}>
//                       {submitLoading ? <Spinner size="sm" /> : 'Add Official'}
//                     </Button>
//                   </div>

//                   {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//                 </ModalFooter>
//               </form>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default AddOfficial;
export {};
