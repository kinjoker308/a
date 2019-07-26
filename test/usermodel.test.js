require('../helpers/dbconnect')
const { User, UserModel } = require('../models/user.model');

describe('User test', ()=>{
    beforeEach(async ()=>{
        await UserModel.deleteMany({})
    })
    test('Test user signUp missing email',async ()=>{
        try{
            await User.signUp(null,'admin','111111')
        }
        catch(error){
            expect(error.message).toBe('Missing email!');
        }
    })
    test('Test user signUp email exist',async ()=>{
        await User.signUp('admin@gmail.com','admin','111111')
        try{
            await User.signUp('admin@gmail.com','admin02','111111')
        }
        catch(error){
            expect(error.message).toBe('Email exists!')
        }
    })
    test('Test user signUp success',async ()=>{
        const user = await User.signUp('admin@gmail.com','admin','111111')
        expect(user.name).toBe('admin')
        expect(user.email).toBe('admin@gmail.com')
    })
    afterEach(async ()=>{
        await UserModel.deleteMany({})
    })
})