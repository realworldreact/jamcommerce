export { default } from '../features/Products';

export const productsQuery = graphql`
  query ProductsPage {
    allJamProduct {
      edges {
        node {
          ...Products_products
        }
      }
    }
    jamCopy(name: { eq: "products" }){
      ...Products_copy
    }
  }
`;
