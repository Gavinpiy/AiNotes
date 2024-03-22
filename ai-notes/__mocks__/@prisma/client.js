// __mocks__/@prisma/client.js
module.exports = {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        note: {
          findMany: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Note', content: 'Test Content' }]),
        },
      };
    }),
  };