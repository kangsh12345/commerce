import { useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '~/components/Button/Button';

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState('');

  const handleUpload = () => {
    if (inputRef.current && inputRef.current.files) {
      const fd = new FormData();

      fd.append(
        'image',
        inputRef.current.files[0],
        inputRef.current.files[0].name,
      );

      fetch(
        'https://api.imgbb.com/1/upload?key=9e3b8740723914b4e53305afd96dd058',
        { method: 'POST', body: fd },
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);

          setImage(data.data.image.url);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" />
      <Button onClick={handleUpload}>업로드</Button>
      {image !== '' && (
        <div className="h-[500px] w-[500px] relative">
          <Image src={image} fill alt="" style={{ objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}
