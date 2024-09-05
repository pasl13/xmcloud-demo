import gql from 'graphql-tag';

export const GET_OFFICIALS = gql`
  query GetOfficials {
    officials: item(where: { path: "/sitecore/content/Demo/Demo/Data/Government Officials" }) {
      children {
        nodes {
          itemId
          field(name: "FullName") {
            value
          }
        }
      }
    }
    sexes: item(where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Sex" }) {
      children {
        nodes {
          itemId
          field(name: "SexType") {
            value
          }
        }
      }
    }
  }
`;

export const GET_DEPARTAMENTS = gql`
  query GetSecretaryOfStateDepartments {
    DepartamentsPt: item(
      where: {
        path: "/sitecore/content/Demo/Demo/Data/Collections/Secretary of State Departments"
        language: "pt"
      }
    ) {
      children {
        nodes {
          itemId
          fields(excludeStandardFields: true) {
            nodes {
              value
            }
          }
        }
      }
    }
    DepartamentsEn: item(
      where: {
        path: "/sitecore/content/Demo/Demo/Data/Collections/Secretary of State Departments"
        language: "en"
      }
    ) {
      children {
        nodes {
          itemId
          fields(excludeStandardFields: true) {
            nodes {
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_MINISTRIES = gql`
  query GetMinistries {
    DepartamentsPt: item(
      where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Ministries", language: "pt" }
    ) {
      children {
        nodes {
          itemId
          fields(excludeStandardFields: true) {
            nodes {
              value
            }
          }
        }
      }
    }
    DepartamentsEn: item(
      where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Ministries", language: "en" }
    ) {
      children {
        nodes {
          itemId
          fields(excludeStandardFields: true) {
            nodes {
              value
            }
          }
        }
      }
    }
  }
`;
