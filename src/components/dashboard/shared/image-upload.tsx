import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  type?: 'standard' | 'profile' | 'cover';
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  disabled?: boolean;
  dontShowPreview?: boolean;
  cloudinaryKey: string;
}

function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  dontShowPreview,
  cloudinaryKey,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (result: any) => {
    onRemove(result.info.secure_url);
    onChange(result.info.secure_url);
  };

  return (
    <div className='relative mx-auto h-52 w-52 rounded-full border-2 bg-gray-200'>
      {value.length === 0 && (
        <Image
          src={value[0]}
          alt=''
          width={300}
          height={300}
          className='h-52 w-52 rounded-full object-cover'
        />
      )}

      <CldUploadWidget uploadPreset={cloudinaryKey} onSuccess={onSuccess}>
        {({ open }) => {
          const handleClick = () => {
            open();
          };

          return (
            <button
              type='button'
              className='absolute bottom-4 right-4 flex items-center rounded-full border-none bg-gradient-to-t from-blue-primary to-blue-300 px-6 py-3 text-[17px] font-medium text-white shadow-lg hover:shadow-md active:shadow-sm'
              disabled={disabled}
              onClick={handleClick}
            >
              <svg
                viewBox='0 0 640 512'
                fill='white'
                height='1em'
                xmlns='http://www.w3.org/2000/svg'
                className='mr-2'
              >
                <path d='M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z' />
              </svg>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
