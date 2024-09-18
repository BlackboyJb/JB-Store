import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Users Admin',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Ade Tomisin',
        email:'adetomisin@gmail.com',
        password:bcrypt.hashSync('23344433', 10),
        isAdmin:false
    },
    {
        name:'Dan King',
        email:'danking@gmail.com',
        password:bcrypt.hashSync('23344433', 10),
        isAdmin:false
    }
]
export default users