import bcrypt from "bcryptjs";

const users = [
  {
    fullName: "Users Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
     isAdmin:true
  },
  {
    fullName: "Ade Tomisin",
    email: "adetomisin@gmail.com",
    password: bcrypt.hashSync("23344433", 10),
    isAdmin:false
  },
];
export default users;
