import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

const databaseId = process.env.NOTION_DB_ID;

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: String(databaseId),
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
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
  try {
    const response = await getItems();
    res.status(200).json({ items: response?.results, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
