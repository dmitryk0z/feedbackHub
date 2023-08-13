import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Typography } from '@mui/material';
// Amplify
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { listProducts, reviewsByProductID } from '../graphql/queries';
// components
import { ProductList } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const apiResponse = await API.graphql(graphqlOperation(listProducts));
      const productList = apiResponse.data.listProducts.items;
      const productsWithImages = await Promise.all(
        productList.map(async (product) => {
          const imageUrl = await Storage.get(product.image, { level: 'public' });
          return { ...product, image: imageUrl };
        })
      );

      // Fetch and add reviews for each product
      const productsWithReviews = await Promise.all(
        productsWithImages.map(async (product) => {
          const apiResponse = await API.graphql(graphqlOperation(reviewsByProductID, { productID: product.id }));
          const reviews = apiResponse.data.reviewsByProductID.items;
          return { ...product, Reviews: reviews };
        })
      );
      setProducts(productsWithReviews);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <ProductList products={products} />
      </Container>
    </>
  );
}
