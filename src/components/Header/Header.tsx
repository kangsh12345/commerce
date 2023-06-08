import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styled from '@emotion/styled';
import {
  IconHeart,
  IconHome,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react';

import { UserMenu } from '../Menu';

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="mt-8 mb-12">
      <HeaderContainer>
        <IconHome onClick={() => router.push('/')} />
        <span className="m-auto" />
        <IconHeart className="mr-4" onClick={() => router.push('/wishlist')} />
        <IconShoppingCart
          className="mr-4"
          onClick={() => router.push('/cart')}
        />
        {session ? (
          <UserMenu />
        ) : (
          <IconUser onClick={() => router.push('/auth/login')} />
        )}
      </HeaderContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
`;
