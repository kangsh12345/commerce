import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateOrderStatus(id: number, status: number) {
  try {
    const response = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    console.log(response);

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
  const { id, status, userId } = JSON.parse(req.body);

  if (session == null || session.id !== userId) {
    res
      .status(200)
      .json({ items: [], message: 'no Session or Invalid Session' });
    return;
  }

  try {
    const wishList = await updateOrderStatus(id, status);
    res.status(200).json({ items: wishList, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
