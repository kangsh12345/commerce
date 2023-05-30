import Image from 'next/image';
import styled from '@emotion/styled';

export interface CarouselImageProps {
  url: string;
}

export function CarouselImage({ url }: CarouselImageProps) {
  return (
    <ImageContainer>
      <Image
        src={url}
        alt="image"
        fill
        style={{
          objectFit: 'cover',
          backgroundPosition: '50% 50%',
        }}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8WA8AAicBUm5VYI8AAAAASUVORK5CYII="
      />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 780px;
  width: 620px;
`;
