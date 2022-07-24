import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task';
import User from 'App/Models/User';

export default class TasksController {
    public async index({view,auth}: HttpContextContract) {
        /* Another Process of Fetching Tasks */
        //const tasks = await Task.query().where('user_id', auth.user?.id).orderBy('id', 'desc');

        const user = auth.user
        await user?.load('tasks');
        const tasks = user?.tasks

        return view.render('tasks/index',{tasks});
    }

    public async store({request, response, session, auth}: HttpContextContract) {

        const taskSchema = schema.create({
            'title': schema.string({trim: true}, [
                rules.maxLength(255),
            ]),
        }) 

        const validatedData = await request.validate({
            schema: taskSchema,
            messages: {
                'title.required': 'Enter Task title',
                'title.maxLength': 'Task Title cannot exceed 255 characters'
            }
        })

        /*Other Process to create and Save Lucid Models*/

        //await Task.create(validatedData)
        //await auth.user?.related('tasks').create(validatedData)

        const user = await User.findOrFail(auth.user?.id)

        const task = new Task()
        task.fill(validatedData)
        
        await task.related('user').associate(user)
        await task.save()

        
        session.flash('notification', 'Task added successfully!')

        return response.redirect('back')

    }


    public async destroy({response, params, session}: HttpContextContract) {
        const task = await Task.findOrFail(params.id)

        await task.delete()
        session.flash('notification', 'Task deleted successfully!')

        return response.redirect('back')

    }


    public async update({request,response, session, params}:HttpContextContract) {
        const task = await Task.findOrFail(params.id)

        task.isCompleted = !!request.input('completed')
        
        await task.save()

        session.flash('notification', 'Task marked as completed successfully!')

        return response.redirect('back')
    }
}
