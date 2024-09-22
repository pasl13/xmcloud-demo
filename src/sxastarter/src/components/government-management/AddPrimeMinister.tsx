// import React, { useState } from 'react';
// import { Button } from '@nextui-org/react';
// import { useMutation } from '@apollo/client';
// import gql from 'graphql-tag';
// import SitecoreGuidUtils from 'src/utils/sitecoreGuid';
// import AddOfficial from './AddOfficial';

// interface Official {
//   name: string;
//   itemId: string;
// }

// interface AddPrimeMinisterProps {
//   onAddPrimeMinister: (itemId: string) => void;
//   itemId: string;
//   title: string;
//   titleEn: string;
//   startDate: string;
// }

// const CREATE_PRIME_MINISTER = gql`
//   mutation CreatePrimeMinister(
//     $title: String!
//     $official: String!
//     $startDate: String!
//     $templateId: ID!
//     $parent: ID!
//   ) {
//     createItem(
//       input: {
//         name: "prime-minister"
//         fields: [
//           { name: "Title", value: $title }
//           { name: "Official", value: $official }
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

// const UPDATE_PRIME_MINISTER = gql`
//   mutation UpdatePrimeMinister($itemId: ID!, $title: String!, $displayName: String!) {
//     updateItemPt: updateItem(
//       input: {
//         itemId: $itemId
//         fields: [{ name: "__Display name", value: $displayName }]
//         language: "pt"
//       }
//     ) {
//       item {
//         itemId
//       }
//     }

//     addItemVersionEn: addItemVersion(input: { itemId: $itemId, language: "en" }) {
//       item {
//         itemId
//       }
//     }

//     updateItemEn: updateItem(
//       input: { itemId: $itemId, fields: [{ name: "Title", value: $title }], language: "en" }
//     ) {
//       item {
//         itemId
//       }
//     }
//   }
// `;

// const AddPrimeMinister = ({
//   onAddPrimeMinister,
//   itemId,
//   title,
//   titleEn,
//   startDate,
// }: AddPrimeMinisterProps): JSX.Element => {
//   const [selectedOfficial, setSelectedOfficial] = useState<Official>();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const [createPrimeMinister] = useMutation(CREATE_PRIME_MINISTER);
//   const [UpdatePrimeMinister] = useMutation(UPDATE_PRIME_MINISTER);

//   const handleOfficialSelection = (official: { itemId: string; name: string }) => {
//     console.log('Selected official:', official);
//     setSelectedOfficial(official);
//   };

//   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
//     e.preventDefault();

//     if (!selectedOfficial) {
//       setErrorMessage('No official selected.');
//       return;
//     }

//     try {
//       const { data } = await createPrimeMinister({
//         variables: {
//           title: `${selectedOfficial.name} - Primeiro-Ministro - ${title}`,
//           official: SitecoreGuidUtils.convertRawToGuid(selectedOfficial.itemId),
//           startDate,
//           templateId: '{A33A3B59-C0A6-4611-B8C8-48CFD42F112D}',
//           parent: itemId,
//         },
//       });

//       const newItemId = SitecoreGuidUtils.convertRawToGuid(data?.createItem?.item?.itemId);

//       if (newItemId) {
//         await UpdatePrimeMinister({
//           variables: {
//             itemId: newItemId,
//             title: `${selectedOfficial.name} - Prime Minister - ${titleEn}`,
//             displayName: 'primeiro-ministro',
//           },
//         });
//         onAddPrimeMinister(newItemId);
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error && error.message.includes('The item name')) {
//         setErrorMessage('The name already exists, please choose another.');
//       } else {
//         setErrorMessage('An error occurred while adding the official. Please try again.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
//       <h2 className="text-2xl font-semibold">Add Prime Minister</h2>
//       <AddOfficial onSelectOfficial={handleOfficialSelection} />
//       <div className="flex justify-end">
//         <Button type="submit" color="primary" size="lg">
//           Add Prime Minister
//         </Button>

//         {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//       </div>
//     </form>
//   );
// };

// export default AddPrimeMinister;
export {};
