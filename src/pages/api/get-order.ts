import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { OrderItem, Orders, PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

interface ResponseProps extends Orders {
  orderItems: OrderItem[];
}

async function getOrder(userId: string) {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(orders);

    const response: ResponseProps[] = [];

    //orders 안에 있는 orderItemIds로 orderItem을 꺼내고 products 테이블에서 이미지 등 정보를 조홥한다.
    for (const order of orders) {
      const orderItems: OrderItem[] = [];
      for (const id of order.orderItemIds
        .split(',')
        .map(item => Number(item))) {
        const res: OrderItem[] =
          await prisma.$queryRaw`SELECT i.id, quantity, amount, i.price, name, image_url, productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${id};`;
        orderItems.push.apply(orderItems, res);
      }
      response.push({ ...order, orderItems });
    }

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

  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' });
    return;
  }

  try {
    const wishList = await getOrder(String(session.id));
    res.status(200).json({ items: wishList, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
