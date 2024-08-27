'use client';
import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';
// import CookieModal from 'src/atoms/Shared Components/CookieModal';
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { DataProps } from 'src/types';

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: DataProps;
  };
}

export const Default = (props: CookiesSettingsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [modalOpen, setModalOpen] = useState(false);

  // const { fields, ...restProps } = props;
  // const { fields } = props;
  // const {
  //   Items,
  //   Title,
  //   Description,
  //   // Icon,
  //   OnlyRequiredButtonLabel,
  //   SubmitChangesButtonLabel,
  //   AcceptAllButtonLabel,
  // } = fields;
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<Item | null>(Items[0]);
  // const handleClose = () => {
  //   setModalOpen(false);
  // };

  console.log('CookiesSettings Component', props);
  // Items.map((item, index) => {
  //   console.log('item', item);
  //   console.log('---');
  //   console.log('index', index);
  // });
  // console.log('Items', Items);

  return (
    <div
      className={`
      fixed bottom-0 w-full bg-gray-800 text-white  ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="lg"
          onClick={() => setModalOpen(true)}
          style={{ cursor: 'pointer' }}
        />
        <Modal
          placement="center"
          backdrop="opaque"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          size="5xl"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={() => setModalOpen(false)}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => setModalOpen(false)}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

// <div className="component-content container mx-auto p-4">
//         <div className="grid grid-cols-2 gap-8">
//           <div className="container">
//             {Title && <h3 className="text-white py-2">{Title.value}</h3>}
//             {Description && <p className="text-white py-2">{Description.value}</p>}
//           </div>
//           <div className="flex flex-col gap-4 justify-center items-center">
//             {AcceptAllButtonLabel && (
//               <button
//                 className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                 onClick={() => setModalOpen(true)}
//               >
//                 {AcceptAllButtonLabel.value}
//               </button>
//             )}
//             {OnlyRequiredButtonLabel && (
//               <button
//                 className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                 onClick={() => setModalOpen(true)}
//               >
//                 {OnlyRequiredButtonLabel.value}
//               </button>
//             )}
//             {SubmitChangesButtonLabel && (
//               <button
//                 className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                 onClick={() => setModalOpen(true)}
//               >
//                 {SubmitChangesButtonLabel.value}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {modalOpen && (
//         <CookieModal isOpen={modalOpen} handleClose={handleClose}>
//           <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-lg">
//             {/* Header Section */}
//             <div className="w-full bg-gray-800 text-white p-4 rounded-t-lg flex flex-row">
//               <h2 className="text-xl font-bold">Cookies Management</h2>
//               <h3 className="text-xl font-bold ml-10">Centro de Preferências</h3>
//             </div>
//             {/* Content Section */}
//             <div className="flex flex-1 p-4 gap-4">
//               <div className="w-1/3 space-y-4">
//                 {/* <p>Left Column Content</p> */}
//                 {Items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="
//                     py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded justify-center"
//                   >
//                     <button onClick={() => setSelectedItem(item)}>
//                       <h4>{item.fields.Title.value}</h4>
//                     </button>
//                     {/* <p>{item.fields.Description.value}</p> */}
//                   </div>
//                 ))}
//               </div>
//               <div className="w-2/3">
//                 {/* <p>Right Column Content</p> */}
//                 {selectedItem && (
//                   <div className="container bg-gray-700 rounded text-white">
//                     <h4>{selectedItem.fields.Title.value}</h4>
//                     <p>{selectedItem.fields.Description.value}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* Footer Section */}
//             <div className="w-full bg-gray-200 p-4 rounded-b-lg flex justify-end gap-4">
//               <button
//                 type="button"
//                 className="
//                   py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
//                 onClick={handleClose}
//               >
//                 Cancelar
//               </button>
//               <button
//                 type="button"
//                 className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
//                 onClick={handleClose}
//               >
//                 Gravar Preferências
//               </button>
//             </div>
//           </div>
//         </CookieModal>
//       )}