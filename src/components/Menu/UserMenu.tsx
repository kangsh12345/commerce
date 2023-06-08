import { ComponentPropsWithoutRef, forwardRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Menu, UnstyledButton } from '@mantine/core';
import { IconListDetails, IconMessageCircle } from '@tabler/icons-react';

export interface MenuProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  path: string;
}

interface UserButtonProps extends ComponentPropsWithoutRef<'button'> {
  image: string;
  alt: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, alt, ...others }: UserButtonProps, ref) => (
    <UnstyledButton ref={ref} {...others}>
      <Image
        src={image}
        alt="profile"
        width={30}
        height={30}
        style={{ borderRadius: '50%' }}
      />
    </UnstyledButton>
  ),
);

export function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Menu shadow="md" width={160} position="bottom-end">
      <Menu.Target>
        <UserButton image={session?.user?.image!} alt="profile" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => router.push('/my')}
          icon={<IconListDetails size={16} />}
          className="text-sm"
        >
          주문내역
        </Menu.Item>
        <Menu.Item
          onClick={() => router.push('/my/comments')}
          icon={<IconMessageCircle size={16} />}
          className="text-sm"
        >
          내 후기
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
