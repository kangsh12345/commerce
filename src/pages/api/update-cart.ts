import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { Cart, PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateCart(item: Cart) {
  try {
    const response = await prisma.cart.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: item.quantity,
        amount: item.amount,
      },
    });

    return response;
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
  const { item } = JSON.parse(req.body);

  console.log(`update-cart| req.body item : ${JSON.stringify(item)}`);

  if (session == null || session.id !== item.userId) {
    res
      .status(200)
      .json({ items: [], message: 'no Session or Invalid Session' });
    return;
  }

  try {
    const wishList = await updateCart(item);
    res.status(200).json({ items: wishList, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
