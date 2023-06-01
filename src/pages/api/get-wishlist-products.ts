import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getWishlistProducts(userId: string) {
  try {
    const wishlist = await prisma.wishList
      .findUnique({
        where: {
          userId: userId,
        },
      })
      .then(item => item?.productIds.split(',').map(Number));

    if (wishlist && wishlist.length > 0) {
      const response = await prisma.products.findMany({
        where: {
          id: { in: wishlist },
        },
      });

      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const session = await getServerSession(req, res, authOptions);

  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' });
    return;
  }

  try {
    const products = await getWishlistProducts(String(session.id));
    res.status(200).json({ items: products, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
