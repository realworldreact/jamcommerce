export { default } from '../features/Product';

export const productsQuery = graphql`
  query ProductPage($id: String!) {
    jamProduct(id: { eq: $id }) {
      ...Product_page
    }
  }
`;
