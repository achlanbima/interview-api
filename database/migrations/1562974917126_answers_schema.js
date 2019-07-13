'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswersSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.integer('question_id').index('question_id').unsigned()
      table.integer('user_id').index('user_id').unsigned()
      table.text('answer')
      table.string('attachment')


      table.timestamps()

      table.foreign('question_id').references('questions.id')
      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswersSchema
