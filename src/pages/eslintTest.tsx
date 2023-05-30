import Image from 'next/image';
import styled from '@emotion/styled';

export default function eslintTest() {
  return (
    <ImageContainer>
      <Image
        alt="test"
        src={
          'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/1-900x900_900x900.jpg?v=1529459207'
        }
        fill
      />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  position: relative;
  height: 780px;
  width: 620px;
`;
