# Finances - Backend

**Version 1.0.0**

Este proyecto nace por mi hábito de mantener mis finanzas bien ordenadas, teniendo registro de todos mis gastos.
Aquí podremos ingresar nuestros gastos y ver de forma gráfica los cambios en nuestros gastos, manteniendo estos en orden.

---

## Tecnologies & Libraries:

- Node.js
- Express.js
- JavaScript
- HTML / CSS
- Mongoose / MongoDB
- Validator
- BCryptjs
- JsonWebToken

---

## Run Server

1. Clone or download the repo
2. Run 'npm install'
3. Run 'touch config.env'
4. Create the following variables: 
  ```
  PORT=3000
  NODE_ENV= development/production
  SECRET_KEY=super_secret_key_of_my_lovely_heart
  DATABASE=mongodb+srv://user:<password>@.mongodb.net/database
  DATABASE_PASSWORD=
  GOOGLE_ID=
  GOOGLE_SECRET=
  JWT_SECRET=MY_SUPER_SECRET_PASSWORD_FOR_JWT
  JWT_EXPIRES_IN=12h
  ```
5. Navigate to https://developers.google.com/identity/sign-in/web/sign-in
6. Follow the instructions to get a Client Id and paste it in GOOGLE_ID
7. Run 'npm run dev'

---

## Learn More

- To learn Express, check out the [Express documentation](http://expressjs.com/).
- To learn Mongoose, check out the [Mongoose documentation](https://mongoosejs.com/).
- To learn MongoDB, check out the [MongoDB documentation](https://www.mongodb.com/).

---

## Authors

- Julio Cid <julio.cid.b@gmail.com>.

---

## License & copyright

Julio Cid, Frontend Developer.