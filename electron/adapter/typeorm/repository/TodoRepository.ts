import {EntityRepository, TreeRepository} from 'typeorm'
import {Todo} from '../entity/Todo'

@EntityRepository(Todo)
export class TodoRepository extends TreeRepository<Todo> {

}