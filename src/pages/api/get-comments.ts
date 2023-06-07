import type { NextApiRequest, NextApiResponse } from 'next';
import { Comment, OrderItem, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResponseProps extends Comment, OrderItem {}

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    });

    console.log(orderItems);

    const response: ResponseProps[] = [];

    // orderItemId를 기반으로 Comment를 조회한다.
    for (const orderItem of orderItems) {
      const res = await prisma.comment.findUnique({
        where: {
          orderItemId: orderItem.id,
        },
      });

      if (res != null) {
        response.push({ ...orderItem, ...res });
      }
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
  const { id: productId } = req.query;

  try {
    const comment = await getComments(Number(productId));
    res.status(200).json({ items: comment, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
