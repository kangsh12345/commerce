import Image from 'next/image';

export function AutoSizeImage({
  src,
  size = 500,
}: {
  src: string;
  size?: number;
}) {
  interface ImageConfigProps {
    [key: string]: string;
  }

  const imageConfig: ImageConfigProps = {
    300: 'h-[300px] w-[300px]',
    500: 'h-[500px] w-[500px]',
  };

  return (
    <div className={`${imageConfig[String(size)]} relative`}>
      <Image src={src} fill alt="" style={{ objectFit: 'contain' }} />
    </div>
  );
}
