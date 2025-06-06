import { prisma } from "../prisma.js";
import { faker } from "@faker-js/faker";
import { hash, verify } from "argon2";
import { generateToken } from "./generate-token.js";
import { token } from "morgan";

// @desc Auth user
// @route POST /api/login
// @access Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  const isCorrectPassword = await verify(user.password, password);

  const token = generateToken(user.id);

  if (user && isCorrectPassword) {
    res.status(200);

    res.json({
      message: "Вы авторизовались",
      user,
      token
    });
  } else {
    res.status(400);
    res.json({
      message: "Неверный логин или пароль"
    });
  }

};

// @desc Register user
// @route POST /api/register
// @access Public
export const registerhUser = async (req, res) => {
  const { email, password } = req.body;

  //проверка на существования юзера с таким же email
  const isHaveUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  //если существует, возвращаю сообщение, и выхожу из ф-ии
  if (isHaveUser) {
    res.status(400);
    res.json({
      message: "Пользователь с таким email уже существует"
    });

    return;
  };

  //если юзера нет, регистрирую
  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(password),    //генерирую hash
      name: faker.name.fullName()    //генерирую рандомное имя
    }
  });

  const token = generateToken(user.id);

  res.status(200);
  res.json({
    user,
    token
  });
};