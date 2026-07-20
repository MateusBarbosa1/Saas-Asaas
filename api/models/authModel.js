const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function registerUser(userObject) {
  try {
    const user = await prisma.users.create({
      data: userObject,
    });
    return {
      success: true,
      message: "User created successfully",
      data: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    console.error(error);
    if (error.code == "P2002") {
      return {
        success: false,
        message: "Uma conta com esse email ja existe!",
      };
    }
    return {
      success: false,
      message: "Erro ao criar a conta!",
    };
  }
}
module.exports = {
  registerUser,
};
