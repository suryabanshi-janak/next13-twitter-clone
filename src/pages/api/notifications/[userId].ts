import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const notificaitons = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json(notificaitons);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
