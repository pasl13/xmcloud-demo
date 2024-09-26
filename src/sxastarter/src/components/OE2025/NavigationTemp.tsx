import React, { ReactElement, useMemo } from 'react';
import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  NavigationBar,
  NavigationLink,
  NavigationLinkProps,
  NavigationRoot,
  NavigationRootProps,
  RelatedNavigationLink,
} from '@ama-pt/agora-design-system';

interface Fields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children: Array<Fields>;
  Styles: string[];
}

type NavigationProps = {
  params?: { [key: string]: string };
  fields: Fields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  relativeLevel: number;
};

export const Default = (props: NavigationProps): JSX.Element => {
  console.log(props);
  const selectedArea = 'area-1';

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

    return ret;
  }, [selectedArea]);

  return (
    <div className={`component navigation`}>
      <div className="menu-humburger" />
      <div className="component-content">
        <h1>Navigation</h1>
        <NavigationBar
          label="Main navigation menu"
          openMenuLabel="Menu"
          modalAriaLabel="Main Navigation Modal"
          modalCloseLabel="Close"
          backToRootLabel="Back"
        >
          {activeNavigationItems}
        </NavigationBar>
      </div>
    </div>
  );
};
