// import React, { useMemo, useState } from 'react';
// import { Button, CalendarDate, DatePicker, Input, Spacer, Spinner } from '@nextui-org/react';
// import { parseDate } from '@internationalized/date';
// import { useMutation } from '@apollo/client';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';
// import gql from 'graphql-tag';
// import removeAccents from 'remove-accents';
// import { processImageUpload } from 'src/utils/imageUploadUtils';
// import SitecoreGuidUtils from 'src/utils/sitecoreGuid';

// interface AddConstitutionalGovernmentProps {
//   onAddGovernment: (itemId?: string, title?: string, titleEn?: string, startDate?: string) => void;
// }

// interface FormData {
//   governmentName: string;
//   title: string;
//   logo: File | null;
//   description: string;
//   startDate: CalendarDate;
//   titleEn: string;
//   descriptionEn: string;
// }

// interface FormErrors {
//   governmentName: string;
//   title: string;
//   description: string;
//   startDate: string;
//   titleEn: string;
//   descriptionEn: string;
//   logo: string;
// }

// const CREATE_CONSTITUTIONAL_GOVERNMENT = gql`
//   mutation CreateConstitutionalGovernment(
//     $itemName: String!
//     $title: String!
//     $logo: String!
//     $description: String!
//     $startDate: String!
//     $templateId: ID!
//     $parent: ID!
//   ) {
//     createItem(
//       input: {
//         name: $itemName
//         fields: [
//           { name: "Title", value: $title }
//           { name: "Logo", value: $logo }
//           { name: "Description", value: $description }
//           { name: "StartDate", value: $startDate }
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

// const UPDATE_ITEM_EN = gql`
//   mutation UpdateItemEn($itemId: ID!, $title: String!, $description: String!) {
//     updateItem(
//       input: {
//         itemId: $itemId
//         fields: [{ name: "Title", value: $title }, { name: "Description", value: $description }]
//         language: "en"
//       }
//     ) {
//       item {
//         itemId
//       }
//     }
//   }
// `;

// const AddConstitutionalGovernment = ({
//   onAddGovernment,
// }: AddConstitutionalGovernmentProps): JSX.Element => {
//   const [formData, setFormData] = useState<FormData>({
//     governmentName: '',
//     title: '',
//     description: '',
//     logo: null,
//     startDate: parseDate(new Date().toJSON().slice(0, 10)),
//     titleEn: '',
//     descriptionEn: '',
//   });
//   const [formErrors, setFormErrors] = useState<FormErrors>({
//     governmentName: '',
//     title: '',
//     description: '',
//     startDate: '',
//     titleEn: '',
//     descriptionEn: '',
//     logo: '',
//   });
//   const [submitLoading, setSubmitLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

//   const [createConstitutionalGovernment] = useMutation(CREATE_CONSTITUTIONAL_GOVERNMENT);
//   const [presignedUploadUrl] = useMutation(PRESIGNED_UPLOAD_URL);
//   const [updateAltAndTitleImage] = useMutation(UPDATE_ALT_AND_TITLE_IMAGE);
//   const [addItemVersionEn] = useMutation(ADD_ITEM_VERSION_EN);
//   const [updateItemEn] = useMutation(UPDATE_ITEM_EN);

//   const handleGovernmentNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setFormData((prev) => ({ ...prev, governmentName: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => ({ ...prev, governmentName: '' }));
//     }
//   };

//   const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setFormData((prev) => ({ ...prev, title: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => ({ ...prev, title: '' }));
//     }
//   };

//   const handleTitleEnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setFormData((prev) => ({ ...prev, titleEn: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => ({ ...prev, titleEn: '' }));
//     }
//   };

//   const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setFormData((prev) => ({
//       ...prev,
//       logo: file,
//     }));
//   };

//   const handleStartDateChange = (date: CalendarDate | null) => {
//     setFormData((prev) => ({ ...prev, startDate: date! }));
//     if (date) {
//       setFormErrors((prev) => ({ ...prev, startDate: '' }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const errors: FormErrors = {
//       governmentName: '',
//       title: '',
//       description: '',
//       startDate: '',
//       titleEn: '',
//       descriptionEn: '',
//       logo: '',
//     };

//     if (!formData.governmentName.trim()) errors.governmentName = 'Please enter a governement name';
//     if (!formData.title.trim()) errors.title = 'Please enter a title in Portuguese';
//     if (!formData.titleEn.trim()) errors.titleEn = 'Please enter a title in English';
//     if (!formData.logo) errors.logo = 'Please upload a logo';
//     if (!formData.startDate) errors.startDate = 'Please select a start date';

//     setFormErrors(errors);
//     return Object.values(errors).every((error) => !error);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setSubmitLoading(true);

//       const itemName = removeAccents(formData.governmentName);

//       try {
//         const logoId = await processImageUpload({
//           presignedUploadUrl,
//           uploadPath: 'Project/Demo/Demo/Logo',
//           itemName,
//           imageFile: formData.logo,
//           alt: formData.title,
//           title: formData.title,
//           altEn: formData.titleEn,
//           titleEn: formData.titleEn,
//           updateAltAndTitleImage,
//           addItemVersionEn,
//         });

//         const { data } = await createConstitutionalGovernment({
//           variables: {
//             itemName,
//             title: formData.title,
//             logo: logoId
//               ? `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(logoId)}" />`
//               : '',
//             description: formData.description,
//             startDate: SitecoreGuidUtils.formatDateToISOString(formData.startDate),
//             templateId: '{06500B0C-CFF1-48E2-92B0-369995A77C14}',
//             parent: '{5B40F5B4-7B72-40A4-931F-E0050864F3D2}',
//           },
//         });

//         const itemId = data?.createItem?.item?.itemId;
//         if (itemId) {
//           await addItemVersionEn({ variables: { itemId } });
//           await updateItemEn({
//             variables: {
//               itemId,
//               title: formData.titleEn,
//               description: formData.descriptionEn,
//             },
//           });

//           onAddGovernment(
//             itemId,
//             formData.title,
//             formData.titleEn,
//             SitecoreGuidUtils.formatDateToISOString(formData.startDate)
//           );
//         }
//       } catch (error: unknown) {
//         if (error instanceof Error && error.message.includes('The item name')) {
//           setErrorMessage('The name already exists, please choose another.');
//         }
//       } finally {
//         setSubmitLoading(false);
//       }
//       console.log('Form Submitted', formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
//       <h2 className="text-2xl font-semibold">Add Constitutional Government</h2>

//       <Input
//         type="text"
//         label="Government Name"
//         size="lg"
//         isRequired
//         radius="sm"
//         isClearable
//         isInvalid={!!formErrors.governmentName}
//         errorMessage={formErrors.governmentName}
//         onChange={handleGovernmentNameInputChange}
//         value={formData.governmentName}
//       />

//       <Spacer x={4} />

//       <Input
//         type="text"
//         label="Title [PT]"
//         size="lg"
//         isRequired
//         radius="sm"
//         isClearable
//         isInvalid={!!formErrors.title}
//         errorMessage={formErrors.title}
//         onChange={handleTitleInputChange}
//         value={formData.title}
//       />
//       <Input
//         type="text"
//         label="Title [EN]"
//         color="secondary"
//         size="lg"
//         isRequired
//         radius="sm"
//         isClearable
//         isInvalid={!!formErrors.titleEn}
//         errorMessage={formErrors.titleEn}
//         onChange={handleTitleEnInputChange}
//         value={formData.titleEn}
//       />

//       <Spacer x={4} />

//       <Input
//         type="file"
//         size="lg"
//         isRequired
//         radius="sm"
//         onChange={handleLogoFileChange}
//         isInvalid={!!formErrors.logo}
//         errorMessage={formErrors.logo}
//         label="Logo"
//       />

//       <Spacer x={4} />

//       <DatePicker
//         label="Start Date"
//         size="lg"
//         isRequired
//         radius="sm"
//         value={formData.startDate}
//         onChange={handleStartDateChange}
//         isInvalid={!!formErrors.startDate}
//         errorMessage={formErrors.startDate}
//       />

//       <Spacer x={4} />

//       <ReactQuill
//         theme="snow"
//         value={formData.description}
//         onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
//         placeholder="Description in PT"
//       />

//       <Spacer x={4} />

//       <ReactQuill
//         theme="snow"
//         value={formData.descriptionEn}
//         onChange={(value) => setFormData((prev) => ({ ...prev, descriptionEn: value }))}
//         placeholder="Description in EN"
//       />

//       <Spacer x={4} />

//       <div className="flex justify-end">
//         <Button type="submit" color="primary" size="lg" disabled={submitLoading}>
//           {submitLoading ? <Spinner size="sm" /> : 'Add Government'}
//         </Button>
//       </div>

//       {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//     </form>
//   );
// };

// export default AddConstitutionalGovernment;
export {};
