import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const user = await prisma?.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
