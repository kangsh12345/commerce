import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { Comment, OrderItem, PrismaClient } from '@prisma/client';

import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

interface ResponseProps {
  comment: Comment;
  info: OrderItemDetail;
}

interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

async function getComments(userId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId,
      },
    });

    const response: ResponseProps[] = [];

    // orderItemId를 기반으로 Comment를 조회한다.
    for (const comment of comments) {
      const orderItemDetail: OrderItemDetail =
        await prisma.$queryRaw`SELECT i.id, quantity, amount, i.price, name, image_url, productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${comment.orderItemId};`;

      response.push({ comment, info: orderItemDetail[0] });
    }

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

  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' });
    return;
  }

  try {
    const comment = await getComments(String(session.id));
    res.status(200).json({ items: comment, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
