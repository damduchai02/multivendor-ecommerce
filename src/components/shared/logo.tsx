import Image from 'next/image';

import logo from '../../../public/assets/icons/logo-1.png';

function Logo() {
  return (
    <div className='grid place-content-center'>
      <Image src={logo} alt='Logo' className='h-60 w-auto' />
    </div>
  );
}

export default Logo;
