import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { OrderItem, PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function addOrder(
  userId: string,
  items: Array<Omit<OrderItem, 'id'>>,
  orderInfo?: { receiver: string; address: string; phoneNumber: string },
) {
  try {
    const orderItemIds = <number[]>[];

    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      });

      console.log(`Create id: ${orderItem}`);
      orderItemIds.push(orderItem.id);
    }

    console.log(JSON.stringify(orderItemIds));

    // 만들어진 orderItemIds를 포함한 order를 만든다.

    const response = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
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
  const { items, orderInfo } = JSON.parse(req.body);

  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' });
    return;
  }

  try {
    const wishList = await addOrder(String(session.id), items, orderInfo);
    res.status(200).json({ items: wishList, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
