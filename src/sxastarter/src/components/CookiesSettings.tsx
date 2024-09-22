// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
// import ListCookieTypes from 'src/atoms/Cookies Management/ListCookieTypes';
// import { CookieItemType } from 'src/types';
// import Cookies from 'js-cookie';
// import {
//   Avatar,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Switch,
// } from '@nextui-org/react';
// import { DataProps } from 'src/types';

// interface CookiesSettingsProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
//   fields: {
//     data: DataProps;
//   };
// }
// export const Default = (props: CookiesSettingsProps): JSX.Element => {
//   const id = props.params.RenderingIdentifier;
//   const { cookiesSetingsData, subItemsData } = props.fields?.data;
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isFooterVisible, setFooterVisible] = useState(false);

//   const cookieItems: CookieItemType[] = useMemo(() => {
//     if (!subItemsData?.children?.results) {
//       return []; // Early return with an empty array if data is undefined
//     }
//     return subItemsData?.children?.results.map((item, index) => {
//       const title = item.fields.find((field) => field.name === 'CookieTypeTitle')?.jsonValue.value;
//       const description = item.fields.find((field) => field.name === 'CookieTypeDescription')
//         ?.jsonValue.value;
//       const isEnabled = item.fields.find((field) => field.name === 'CookieTypeEnabled')?.jsonValue
//         .value;
//       const isSelected = item.fields.find((field) => field.name === 'CookieTypeIsSelected')
//         ?.jsonValue.value;
//       const name = item.fields.find((field) => field.name === 'CookieTypeName')?.jsonValue.value;

//       return {
//         id: index,
//         title: title,
//         description: description,
//         isEnabled: isEnabled,
//         isSelected: isSelected ? true : false,
//         name: name,
//       };
//     });
//   }, [subItemsData]);

//   const [cookieState, setCookieState] = useState<CookieItemType[]>(cookieItems);
//   const [selectedItem, setSelectedItem] = useState(cookieItems[0]);

//   useEffect(() => {
//     const hasAcceptedCookies = Cookies.get('hasAcceptedCookies');
//     if (!hasAcceptedCookies) {
//       setFooterVisible(true);
//     } else {
//       const updatedCookieState = cookieItems.map((item) => {
//         const cookieValue = Cookies.get(String(item.name));
//         return {
//           ...item,
//           isSelected: cookieValue === 'true' ? true : item.isSelected,
//         };
//       });
//       setCookieState(updatedCookieState);
//     }
//   }, [cookieItems]);

//   const title = cookiesSetingsData.fields.find((field) => field.name === 'CookieSettingsTitle')
//     ?.jsonValue.value;

//   const description = cookiesSetingsData.fields.find(
//     (field) => field.name === 'CookieSettingsDescription'
//   )?.jsonValue.value;

//   const submitButtonLabel = cookiesSetingsData.fields.find(
//     (field) => field.name === 'CookieSettingsSubmitChangesButtonLabel'
//   )?.jsonValue.value;
//   const acceptAllButtonLabel = cookiesSetingsData.fields.find(
//     (field) => field.name === 'CookieSettingsAcceptAllButtonLabel'
//   )?.jsonValue.value;
//   const onlyRequiredButtonLabel = cookiesSetingsData.fields.find(
//     (field) => field.name === 'CookieSettingsOnlyRequiredButtonLabel'
//   )?.jsonValue.value;

//   const handleSwitchChange = (value: boolean) => {
//     if (selectedItem) {
//       const updatedItems = cookieState.map((item) => {
//         return item.id == selectedItem.id ? { ...item, isSelected: value } : item;
//       });
//       setCookieState(updatedItems);
//       setSelectedItem({ ...selectedItem, isSelected: value });
//     }
//   };

//   const handleAcceptRequiredCookies = () => {
//     const updatedItems = cookieState.map((item) => {
//       if (item.isEnabled) {
//         Cookies.set(String(item.name), 'true');
//         return { ...item, isSelected: true };
//       } else {
//         Cookies.set(String(item.name), 'false');
//         return { ...item, isSelected: false };
//       }
//     });
//     setCookieState(updatedItems);
//     Cookies.set('hasAcceptedCookies', 'true');
//     setModalOpen(false);
//     setFooterVisible(false);
//   };

//   const handleUpdateCookiesPreferences = () => {
//     cookieState.forEach((cookie) => {
//       Cookies.set(String(cookie.name), cookie.isSelected?.toString() ?? 'false');
//     });
//     Cookies.set('hasAcceptedCookies', 'true');
//     setModalOpen(false);
//     setFooterVisible(false);
//   };

//   const handleAcceptAllCookies = () => {
//     const updatedItems = cookieState.map((item) => ({ ...item, isSelected: true }));
//     setCookieState(updatedItems);
//     updatedItems.forEach((cookie) => {
//       Cookies.set(String(cookie.name), 'true');
//     });
//     Cookies.set('hasAcceptedCookies', 'true');
//     setModalOpen(false);
//     setFooterVisible(false);
//   };

//   return (
//     <div
//       className={`
//       fixed bottom-0 w-full bg-gray-800 text-white  ${props.params.styles}`}
//       id={id ? id : undefined}
//     >
//       <div
//         style={{
//           position: 'fixed',
//           bottom: '10px',
//           left: '10px',
//           cursor: 'pointer',
//         }}
//         onClick={() => setFooterVisible(!isFooterVisible)}
//       >
//         <Avatar
//           src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
//           size="lg"
//           style={{ cursor: 'pointer' }}
//         />
//       </div>

//       {isFooterVisible && (
//         <div className="component-content container mx-auto p-4">
//           <div className="grid grid-cols-2 gap-8">
//             <div className="container">
//               {title && <h3 className="text-white py-2">{title}</h3>}
//               {description && <p className="text-white py-2">{description}</p>}
//             </div>
//             <div className="flex flex-col gap-4 justify-center items-center">
//               {submitButtonLabel && (
//                 <button
//                   className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                   onClick={() => setModalOpen(true)}
//                 >
//                   {submitButtonLabel}
//                 </button>
//               )}
//               {onlyRequiredButtonLabel && (
//                 <button
//                   className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                   onClick={handleAcceptRequiredCookies}
//                 >
//                   {onlyRequiredButtonLabel}
//                 </button>
//               )}
//               {acceptAllButtonLabel && (
//                 <button
//                   className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                   onClick={handleAcceptAllCookies}
//                 >
//                   {acceptAllButtonLabel}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {modalOpen && (
//         <Modal
//           placement="center"
//           backdrop="opaque"
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           size="full"
//         >
//           <ModalContent>
//             {() => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   <h1>Cookies Management</h1>
//                 </ModalHeader>
//                 <ModalBody>
//                   <div className="flex flex-1 p-4 gap-4">
//                     <div className="w-1/3 space-y-4">
//                       <ListCookieTypes onSelect={setSelectedItem} cookieItems={cookieState} />
//                     </div>
//                     <div className="w-2/3">
//                       <div className="container rounded text-black">
//                         {selectedItem && (
//                           <div className="grid grid-cols-2 ">
//                             <div>
//                               <h4>{selectedItem.title}</h4>
//                               <p>{selectedItem.description}</p>
//                             </div>
//                             <div className="flex items-center justify-center">
//                               {selectedItem.isEnabled ? (
//                                 <h3>Required Cookie</h3>
//                               ) : (
//                                 <div>
//                                   <Switch
//                                     isSelected={selectedItem.isSelected}
//                                     onChange={(e) => handleSwitchChange(e.target.checked)}
//                                     size="lg"
//                                   />
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="light" onPress={handleAcceptRequiredCookies}>
//                     Accept only required
//                   </Button>
//                   <Button color="primary" onPress={handleUpdateCookiesPreferences}>
//                     Confirm my choices
//                   </Button>
//                   <Button color="primary" onPress={handleAcceptAllCookies}>
//                     Accept all cookies
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// };
