import React, { useState } from 'react';
import { Image as JSSImage, Text as JSSText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';

interface ResultsLanguageSelector {
  languageCode: { jsonValue: { value: string } };
  languageDisplayName: { jsonValue: { value: string } };
  languageFlag: { jsonValue: { src: string } };
}

interface Fields {
  data: {
    datasource: {
      hasChildren: boolean;
      children: {
        results: ResultsLanguageSelector[];
      };
    };
  };
}

interface LanguageSelectorProps {
  params: { [key: string]: string };
  fields: Fields;
}

export const Default = (props: LanguageSelectorProps): JSX.Element => {
  const { fields, params } = props;
  const id = params.RenderingIdentifier;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (languageCode: string) => {
    const pathWithoutLang = router.asPath.replace(`/${router.locale}`, '');
    window.location.href = `/${languageCode}${pathWithoutLang}`;
  };

  const languageList = fields.data.datasource?.children?.results || [];

  const currentLanguage = languageList.find(
    (lang) => lang.languageCode.jsonValue.value === router.locale
  );

  return (
    <div
      className={`component language-selector ${params.styles?.trim()}`}
      id={id ? id : undefined}
    >
      <button onClick={toggleDropdown} className="dropdown-button">
        <div className="dropdown-button-content">
          <span>
            <JSSText field={currentLanguage?.languageDisplayName.jsonValue} />
          </span>
          {currentLanguage && (
            <JSSImage field={currentLanguage.languageFlag.jsonValue} className="dropdown-flag" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {languageList.map((language) => {
            const languageCode = language.languageCode.jsonValue?.value as string;

            return (
              <button
                key={languageCode}
                onClick={() => {
                  changeLanguage(languageCode);
                  setIsOpen(false);
                }}
                className={`dropdown-item ${router.locale === languageCode ? 'active' : ''}`}
              >
                <div className="dropdown-item-content">
                  <span className="dropdown-display-name">
                    <JSSText field={language.languageDisplayName.jsonValue} />
                  </span>
                  <JSSImage field={language.languageFlag.jsonValue} className="dropdown-flag" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
