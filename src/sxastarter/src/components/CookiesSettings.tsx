'use client';
import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import CookieModal from 'src/atoms/Shared Components/CookieModal';
import {
  Avatar,
  Modal,
  Button
} from '@nextui-org/react';

interface FieldsTypes {
  OnlyRequiredButtonLabel: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
  Icon: Field<string>;
  SubmitChangesButtonLabel: Field<string>;
  AcceptAllButtonLabel: Field<string>;
  Items: Item[];
}

interface Item {
  id: Field<string>;
  url: Field<string>;
  name: Field<string>;
  displayName: Field<string>;
  fields: Fields;
}

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  'Is Selected': Field<string>;
  Enabled: Field<string>;
}

// interface ItemFields extends Fields{

// }

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: FieldsTypes;
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
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>
            <h3>Configurações de Cookies</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Conteúdo do modal aqui...</p>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={() => setModalOpen(false)}>
              Fechar
            </Button>
          </Modal.Footer>
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