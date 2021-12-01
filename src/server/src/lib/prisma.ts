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

export { getDataForUser, getOfferAndClientSegmentForUser, saveDataForUser, searchData, PrismaModel };
