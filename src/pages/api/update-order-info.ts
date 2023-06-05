import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateOrderInfo(
  id: number,
  receiver: string,
  address: string,
  phoneNumber: string,
) {
  try {
    const response = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        receiver: receiver,
        address: address,
        phoneNumber: phoneNumber,
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
  const { id, receiver, address, phoneNumber, userId } = JSON.parse(req.body);

  if (session == null || session.id !== userId) {
    res
      .status(200)
      .json({ items: [], message: 'no Session or Invalid Session' });
    return;
  }

  try {
    const orderList = await updateOrderInfo(id, receiver, address, phoneNumber);
    res.status(200).json({ items: orderList, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
