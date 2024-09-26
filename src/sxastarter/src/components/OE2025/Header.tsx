import {
  Area,
  Areas,
  Brand,
  GeneralBar,
  HeaderV2,
  HeaderV2Props,
  Institutional,
  Language,
  Languages,
  Logo,
  NavigationBar,
  NavigationLink,
  NavigationLinkProps,
  NavigationRoot,
  NavigationRootProps,
  RelatedNavigationLink,
} from '@ama-pt/agora-design-system';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  Placeholder,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React, { ReactElement, useMemo, useState } from 'react';

interface LanguageSelector {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: Record<string, unknown>;
}

interface NavigationFields {
  Title: {
    value: string;
  };
  NavigationTitle: {
    value: string;
  };
}

interface Navigation {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: NavigationFields;
}

interface Fields {
  data: {
    logo: {
      field: ImageField;
    };
    switchLabelOn: {
      field: TextField;
    };
    switchLabelOff: {
      field: TextField;
    };
    languageSelector: {
      field: Field<LanguageSelector>;
    };
    navigation: {
      field: Field<Navigation>;
    };
  };
}

type HeaderProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

export const Default = (props: HeaderProps): JSX.Element => {
  console.log('HeaderProps', props.params);
  const [selectedLang, setSelectedLang] = useState('PT');

  const handleLanguageChange = (val: string) => {
    setSelectedLang(val);
  };

  const [selectedArea, setSelectedArea] = useState('area-1');
  const handleAreaChange = (val: string) => {
    setSelectedArea(val);
  };

  const activeNavigationItems = useMemo(() => {
    let ret: Array<ReactElement<NavigationRootProps | NavigationLinkProps>> = [];

    if (selectedArea === 'area-1') {
      ret = [
        <NavigationRoot
          key={1}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 1 - Menu 1"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 5
            </a>
          </NavigationLink>

          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Relate Link 1
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Relate Link 2
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Relate Link 3
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Relate Link 4
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Relate Link 5
            </a>
          </RelatedNavigationLink>
        </NavigationRoot>,
        <NavigationRoot
          key={2}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 1 - Menu 2"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 1 - Menu 1 - Link 5
            </a>
          </NavigationLink>
        </NavigationRoot>,
        <NavigationLink key={3}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer" aria-current="page">
            Area 1 - Direct Link 1
          </a>
        </NavigationLink>,
        <NavigationLink key={4}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 1 - Direct Link 2
          </a>
        </NavigationLink>,
        <NavigationLink key={5}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 1 - Direct Link 3
          </a>
        </NavigationLink>,
      ];
    }

    if (selectedArea === 'area-2') {
      ret = [
        <NavigationRoot
          key={6}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 2 - Menu 1"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 5
            </a>
          </NavigationLink>

          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 1
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 2
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 3
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 4
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Relate Link 5
            </a>
          </RelatedNavigationLink>
        </NavigationRoot>,
        <NavigationRoot
          key={7}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 2 - Menu 2"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 2 - Menu 1 - Link 5
            </a>
          </NavigationLink>
        </NavigationRoot>,
        <NavigationLink key={8}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer" aria-current="page">
            Area 2 - Direct Link 1
          </a>
        </NavigationLink>,
        <NavigationLink key={9}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 2 - Direct Link 2
          </a>
        </NavigationLink>,
        <NavigationLink key={10}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 2 - Direct Link 3
          </a>
        </NavigationLink>,
      ];
    }

    if (selectedArea === 'area-3') {
      ret = [
        <NavigationRoot
          key={11}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 3 - Menu 1"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 5
            </a>
          </NavigationLink>

          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Relate Link 1
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Relate Link 2
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Relate Link 3
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Relate Link 4
            </a>
          </RelatedNavigationLink>
          <RelatedNavigationLink
            hasIcon
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Relate Link 5
            </a>
          </RelatedNavigationLink>
        </NavigationRoot>,
        <NavigationRoot
          key={12}
          linksAriaLabel="Main links list"
          relatedLinksAriaLabel="Related links list"
          label="Area 3 - Menu 2"
        >
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 1
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 2
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 3
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 4
            </a>
          </NavigationLink>
          <NavigationLink
            hasIcon
            leadingIcon="agora-line-calendar"
            leadingIconHover="agora-solid-calendar"
            trailingIcon="agora-line-arrow-right-circle"
            trailingIconHover="agora-solid-arrow-right-circle"
          >
            <a href="http://www.example.com" target="_blank" rel="noreferrer">
              Area 3 - Menu 1 - Link 5
            </a>
          </NavigationLink>
        </NavigationRoot>,
        <NavigationLink key={13}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer" aria-current="page">
            Area 3 - Direct Link 1
          </a>
        </NavigationLink>,
        <NavigationLink key={14}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 3 - Direct Link 2
          </a>
        </NavigationLink>,
        <NavigationLink key={15}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 3 - Direct Link 3
          </a>
        </NavigationLink>,
        <NavigationLink key={16}>
          <a href="http://www.example.com" target="_blank" rel="noreferrer">
            Area 3 - Direct Link 4
          </a>
        </NavigationLink>,
      ];
    }

    return ret;
  }, [selectedArea]);

  const args = (() => {
    const storyArgs: HeaderV2Props = {};
    return storyArgs;
  })();

  const phKey1 = `header-main-${props.params.DynamicPlaceholderId}`;
  const phKey2 = `header-navigation-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="min-h-screen mx-auto max-w-[1440px]">
      <header className="sticky top-0 z-sticky">
        <HeaderV2 {...args}>
          <Brand>
            <Logo>
              <a target="_blank" href="http://www.example.com" rel="noreferrer">
                <img
                  src={
                    args.darkMode
                      ? 'https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/-/media/Project/Microsites/OE2025/Header/OE2025-logo-1.png?h=105&iar=0&w=89&hash=64AFD4D79EE74D137130F8F5F94971FB'
                      : 'https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/-/media/Project/Microsites/OE2025/Header/OE2025-logo-1.png?h=105&iar=0&w=89&hash=64AFD4D79EE74D137130F8F5F94971FB'
                  }
                  className="h-64"
                  alt="Logo alternative text"
                />
              </a>
            </Logo>

            <Institutional>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem modi, nesciunt
              iusto alias illum.
            </Institutional>
          </Brand>

          <GeneralBar aria-label="Utilities menu">
            <Languages aria-label="Language list" onChange={handleLanguageChange}>
              <Language checked={selectedLang === 'PT'} value={'PT'} label="Portuguese" abbr="PT" />
              <Language checked={selectedLang === 'ES'} value={'ES'} label="Spanish" abbr="ES" />
              <Language checked={selectedLang === 'EN'} value={'EN'} label="English" abbr="EN" />
            </Languages>

            <Areas aria-label="Areas menu" onChange={handleAreaChange}>
              <Area label="Area 1" value="area-1" active={selectedArea === 'area-1'} />
              <Area label="Area 2" value="area-2" active={selectedArea === 'area-2'} />
              <Area label="Area 3" value="area-3" active={selectedArea === 'area-3'} />
            </Areas>
          </GeneralBar>

          <NavigationBar
            label="Main navigation menu"
            openMenuLabel="Menu"
            modalAriaLabel="Main Navigation Modal"
            modalCloseLabel="Close"
            backToRootLabel="Back"
          >
            {activeNavigationItems}
          </NavigationBar>
        </HeaderV2>
      </header>

      <main className="bg-neutral-400">
        <div className="container mx-auto flex flex-col gap-32">
          <h1>Placeholder</h1>
          <Placeholder name={phKey1} rendering={props.rendering} />
          <Placeholder name={phKey2} rendering={props.rendering} />
        </div>
      </main>
    </div>
  );
};
