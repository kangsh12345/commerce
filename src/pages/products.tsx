// import ImageGallery from 'react-image-gallery';

import Image from 'next/image';
import Carousel from 'nuka-carousel';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export default function Products() {
  // return <ImageGallery items={images} />;
  return (
    <Carousel animation="fade" autoplay withoutControls wrapAround speed={10}>
      {images.map(item => (
        <Image
          key={item.original}
          src={item.original}
          alt="image"
          width={1000}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        />
      ))}
    </Carousel>
  );
}
