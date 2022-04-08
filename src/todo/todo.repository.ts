import { EntityRepository } from 'typeorm';
import { CustomRepository } from './customRepository';
import { TodoEntity } from './Entity/todo.entity';

@EntityRepository(TodoEntity)
export class TodoRepository extends CustomRepository<TodoEntity> {}
