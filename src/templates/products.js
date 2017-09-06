export { default } from '../features/Products';

export const productsQuery = graphql`
  query ProductsPage {
    allMarkdownRemark {
      edges {
        node {
          ...Products_products
        }
      }
    }
    productYaml {
      ...Products_copy
    }
  }
`;
