import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
    public index({view}: HttpContextContract) {
        return view.render('index');
    }

    public about({view,params}: HttpContextContract) {
        const name = params.name;
        return view.render('about', {name});

        //return params.name ? `This is ${params.name}'s abour page` : 'This is about page';
    }

    public contact({view}: HttpContextContract) {
        return view.render('contact');
    }
}
