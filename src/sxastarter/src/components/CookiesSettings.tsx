'use client';
import React, { useState, useEffect } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import ListCookieTypes from 'src/atoms/Cookies Management/ListCookieTypes';
import Cookies from 'js-cookie';
// import CookieModal from 'src/atoms/Shared Components/CookieModal';
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Switch,
} from '@nextui-org/react';
import { DataProps } from 'src/types';

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    data: DataProps;
  };
}

interface CookieItemType {
  id: number;
  name: string | undefined | boolean;
  title: string | undefined | boolean;
  description: string | undefined | boolean;
  isRequired: string | undefined | boolean;
  isSelected: string | undefined | boolean;
  isEnabled: string | undefined | boolean;
}

const initialState = {
  id: null,
  title: '',
  description: '',
  isEnabled: false,
  isSelected: false,
  name: '',
};

export const Default = (props: CookiesSettingsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { cookiesSetingsData, subItemsData } = props.fields?.data;
  const [cookieItems, setCookieItems] = useState<CookieItemType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFooterVisible, setFooterVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialState);

  // console.log('cookiesSetingsData:', cookiesSetingsData);
  // console.log('subItemsData:', subItemsData);
  // console.log('props:', props);
  // console.log("cookieItems:", cookieItems)
  console.log("selectedItem gETRAL:", selectedItem)

  useEffect(() => {
    // Inicializa o estado cookieItems com os dados recebidos via props
    const items : CookieItemType[] = [];
    subItemsData.children.results.forEach((item, index) => {
      const title = item.fields.find((field) => field.name === 'CookieTypeTitle')?.jsonValue.value;
      const description = item.fields.find((field) => field.name === 'CookieTypeDescription')
        ?.jsonValue.value;
      const isEnabled = item.fields.find((field) => field.name === 'CookieTypeEnabled')?.jsonValue
        .value;
      const isSelected = item.fields.find((field) => field.name === 'CookieTypeIsSelected')
        ?.jsonValue.value;
      const name = item.fields.find((field) => field.name === 'CookieTypeName')?.jsonValue.value;

      items.push({
        id: index,
        title: title,
        description: description,
        isEnabled: isEnabled,
        isSelected: isSelected,
        name: name,
      });
    });

    setCookieItems(items);
    setSelectedItem(items[0]);
    console.log("selectedItem:", selectedItem)
  }, [subItemsData]);

  const title = cookiesSetingsData.fields.find((field) => field.name === 'CookieSettingsTitle')
    ?.jsonValue.value;

  const description = cookiesSetingsData.fields.find(
    (field) => field.name === 'CookieSettingsDescription'
  )?.jsonValue.value;

  const submitButtonLabel = cookiesSetingsData.fields.find(
    (field) => field.name === 'CookieSettingsSubmitChangesButtonLabel'
  )?.jsonValue.value;
  const acceptAllButtonLabel = cookiesSetingsData.fields.find(
    (field) => field.name === 'CookieSettingsAcceptAllButtonLabel'
  )?.jsonValue.value;
  const onlyRequiredButtonLabel = cookiesSetingsData.fields.find(
    (field) => field.name === 'CookieSettingsOnlyRequiredButtonLabel'
  )?.jsonValue.value;

  const setCookieHandler = (cookieName: string) => {
    console.log('Setting cookies');
    Cookies.set('username', 'John Doe', { expires: 7 });
    // Cookies.set('padrão', 'true', { expires: 7 });
  };

  const handleSwitchChange = (value: boolean) => {
    console.log("handleSwitchChange:", value)
    if (selectedItem) {
      const updatedItems = cookieItems.map((item) => {
        console.log()
        console.log("selectedItem",selectedItem, item)
        item.id == selectedItem.id ? { ...item, isSelected: value } : item
      });
      setCookieItems(updatedItems);
      setSelectedItem({ ...selectedItem, isSelected: value });
    }
  };
  // console.log('selectedItem:', selectedItem);
  return (
    <div
      className={`
      fixed bottom-0 w-full bg-gray-800 text-white  ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          cursor: 'pointer',
        }}
        onClick={() => setFooterVisible(!isFooterVisible)}
      >
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="lg"
          // onClick={() => setModalOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {isFooterVisible && (
        <div className="component-content container mx-auto p-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="container">
              {title && <h3 className="text-white py-2">{title}</h3>}
              {description && <p className="text-white py-2">{description}</p>}
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              {acceptAllButtonLabel && (
                <button
                  className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                  onClick={() => setModalOpen(true)}
                >
                  {acceptAllButtonLabel}
                </button>
              )}
              {onlyRequiredButtonLabel && (
                <button
                  className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                  onClick={() => setModalOpen(true)}
                >
                  {onlyRequiredButtonLabel}
                </button>
              )}
              {submitButtonLabel && (
                <button
                  className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                  // onClick={() => setModalOpen(true)}
                  onClick={setCookieHandler}
                >
                  {/* {submitButtonLabel} */}
                  Testing set cookies Button!
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal
          placement="center"
          backdrop="opaque"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          size="full"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">Cookies Management</ModalHeader>
                <ModalBody>
                  <div className="flex flex-1 p-4 gap-4">
                    <div className="w-1/3 space-y-4">
                      <ListCookieTypes onSelect={setSelectedItem} cookieItems={cookieItems} />
                    </div>
                    <div className="w-2/3">
                      <div className="container rounded text-black">
                        {selectedItem && (
                          <div className="grid grid-cols-2 ">
                            <div>
                              <h4>{selectedItem.title}</h4>
                              <p>{selectedItem.description}</p>
                            </div>
                            <div className="flex items-center justify-center">
                              {selectedItem.isEnabled ? (
                                <h3>Required Cookie</h3>
                              ) : (
                                <Switch
                                  checked={selectedItem.isSelected}
                                  onChange={(e) => handleSwitchChange(e.target.checked)}
                                  disabled={selectedItem.isEnabled}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={() => setModalOpen(false)}>
                    Close with only necessary cookies action
                  </Button>
                  <Button color="primary" onPress={() => setModalOpen(false)}>
                    Update cookies preferences action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
