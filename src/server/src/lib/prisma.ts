import { Prisma } from '@prisma/client';

type RejectFunction = Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined;

type PrismaModel =
  | Prisma.ContentDelegate<RejectFunction>
  | Prisma.OfferDelegate<RejectFunction>
  | Prisma.UserDelegate<RejectFunction>
  | Prisma.ClientSegmentDelegate<RejectFunction>;

const getDataForUser = async (prismaModel: PrismaModel, email: string) => {
  // @ts-expect-error
  return prismaModel.findMany({
    where: {
      user: {
        email,
      },
    },
  });
};

const getOfferAndClientSegmentForUser = async (
  prismaModel: PrismaModel,
  clientSegmentId: string,
  offerId: string,
  email: string,
) => {
  // @ts-expect-error
  return prismaModel.findUnique({
    where: { email },
    include: {
      offers: { where: { id: offerId } },
      clientsegments: { where: { id: clientSegmentId } },
    },
  });
};

const saveDataForUser = async (prismaModel: PrismaModel, data: object, email: string) => {
  // @ts-expect-error
  return prismaModel.create({
    data: {
      ...data,
      user: { connect: { email } },
    },
  });
};

const saveContent = async (prismaModel: PrismaModel, data: any, email: string) => {
  const { seed, contentBody, offerId, clientSegmentId } = data;
  // @ts-expect-error
  return prismaModel.create({
    data: {
      seed,
      contentBody,
      offer: { connect: { id: offerId } },
      clientSegment: { connect: { id: clientSegmentId } },
      user: { connect: { email } },
    },
  });
};

const searchData = async (prismaModel: PrismaModel, searchTerm: string) => {
  // @ts-expect-error
  return prismaModel.findMany({
    where: {
      body: {
        search: searchTerm,
      },
    },
  });
};

const getUserOffersAndClientSegments = async (
  prismaModel: PrismaModel,
  offerIds: number[],
  clientsegmentIds: number[],
  email: string,
) => {
  // @ts-expect-error
  return prismaModel.findUnique({
    where: { email },
    include: {
      offers: { where: { id: { in: offerIds } } },
      clientsegments: { where: { id: { in: clientsegmentIds } } },
    },
  });
};

const getAllUserInfo = async (prismaModel: PrismaModel, email: string) => {
  // @ts-expect-error
  return prismaModel.findUnique({
    where: { email },
    include: {
      offers: true,
      clientsegments: true,
      content: true,
    },
  });
};

const findOrCreateUser = async (prismaModel: PrismaModel, issuer: string, email: string) => {
  // @ts-expect-error
  const user = await prismaModel.findUnique({ where: { email } });

  if (!user) {
    // @ts-expect-error
    await prismaModel.create({
      data: {
        id: issuer,
        email,
      },
    });
  }
  return user;
};

export {
  findOrCreateUser,
  getAllUserInfo,
  getDataForUser,
  getOfferAndClientSegmentForUser,
  getUserOffersAndClientSegments,
  saveContent,
  saveDataForUser,
  searchData,
  PrismaModel,
};
