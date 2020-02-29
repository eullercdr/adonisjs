'use strict'
const Task = use('App/Models/Task')
class TaskController {
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()
    return tasks
  }

  async store ({ request, params }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])
    const task = Task.create({ ...data, project_id: params.projects_id })
    return task
  }

  async show ({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id)
    return task
  }

  async update ({ params, request, response }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])
    const task = await Task.findOrFail(params.id)
    task.merge(data)
    await task.save()
    return task
  }

  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}

module.exports = TaskController
