import User from "../model/user.js";

export const initialUsers=[
    {
        username:"root",
        password:"skwa",
        name:"superuser"
    },
    {
        username:"admin",
        password:"admin123",
        name:"administrator"

    }
]

export const usersInDb=async()=>{
    const users=await User.find({})
    return users.map(user=>user.toJSON())
}

