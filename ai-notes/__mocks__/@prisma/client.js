
// a Jest mock for the Prisma Client. It's used to simulate the behavior of the Prisma Client in a testing environment without making actual calls to the database

module.exports = {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        note: {
          findMany: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Note', content: 'Test Content' }]),
        },
      };
    }),
  };