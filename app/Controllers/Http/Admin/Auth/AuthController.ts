import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import AuthValidator from 'App/Validators/AuthValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {

  public async registerShow({view}: HttpContextContract) {
    return view.render('admin/auth/register')
  }

  
  public async register({request, response,auth}: HttpContextContract) {
    const data = await request.validate(AuthValidator)

    const admin = await Admin.create(data)
    await auth.use('admin').login(admin)

    return response.redirect('/')

  }


  public async loginShow({view}: HttpContextContract) {
    return view.render('admin/auth/login')

  }

  public async login({request, response,auth}: HttpContextContract) {
    
    const {email,password} = await request.validate(LoginValidator)

    await auth.use('admin').attempt(email,password)

    return response.redirect('/')
  }

 

}
