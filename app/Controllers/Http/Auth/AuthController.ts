import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

    public async registerShow({view}: HttpContextContract) {
        return view.render('auth/register')
    }


    public async register({request,response,auth}: HttpContextContract) {
        const userSchema = schema.create({
            'name': schema.string({trim:true}),
            'email': schema.string({trim: true}, [
                rules.email(),
                rules.maxLength(255),
                rules.unique({table:'users', column:'email'})
            ]),
            password: schema.string({trim:true}, [
                rules.confirmed(),
                rules.maxLength(8)
            ]),
        }) 

        const validatedData = await request.validate({
            schema: userSchema
        })

        const user = await User.create(validatedData)

        await auth.login(user)
        return response.redirect('/')
    }



    public async loginShow({view}: HttpContextContract) {
        return view.render('auth/login')
    }

    public async login({session, response, request, auth}: HttpContextContract) {
        const {email, password} = request.all()

        try {
            await auth.attempt(email, password)
            return response.redirect('/')
        } catch (error) {
            session.flash('notification', 'Your email or password is incorect!')
            return response.redirect('back')
        }
    }



   public async logout({auth, response}: HttpContextContract) {
        await auth.logout();

        return response.redirect('/')
   }
}
