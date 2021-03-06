import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from 'typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';
import { TodoRepository } from './todo.repository';
import { StatsTodoDto } from './dto/stats-todo.dto';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: TodoRepository,
  ) {}
  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  /*findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias });
    }
    return this.todoRepository.find({ withDeleted: true});
  }*/
  findAll(searchTodoDto: SearchTodoDto) {
    const take = searchTodoDto.take || 10;
    const page = searchTodoDto.page || 1;
    const skip = (page - 1) * take;

    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    console.log('this is ' + criterias);
    console.log(searchTodoDto.criteria);
    console.log(searchTodoDto.status);
    if (criterias.length) {
      const result = this.todoRepository
        .createQueryBuilder('todo')
        .where('todo.name = :name', { name: searchTodoDto.criteria })
        .orWhere('todo.description = :description', {
          description: searchTodoDto.criteria,
        })
        .andWhere('todo.status = :status', { status: searchTodoDto.status })
        .take(take)
        .skip(skip);
      return result.getMany();
    }
    return this.todoRepository
      .createQueryBuilder('todo')
      .take(take)
      .skip(skip)
      .getMany();
  }

  findAllWithGenericPagination(searchTodoDto: SearchTodoDto) {
    const take = searchTodoDto.take || 10;
    const page = searchTodoDto.page || 1;
    const skip = (page - 1) * take;

    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    console.log('this is ' + criterias);
    console.log(searchTodoDto.criteria);
    console.log(searchTodoDto.status);

    const builder = this.todoRepository.createQueryBuilder('todo');
    let result;

    if (criterias.length) {
      result = this.todoRepository.getPaginatedData(take, skip);
      builder
        .where('todo.name = :name', { name: searchTodoDto.criteria })
        .orWhere('todo.description = :description', {
          description: searchTodoDto.criteria,
        })
        .andWhere('todo.status = :status', { status: searchTodoDto.status });
      return result.getMany();
    }
    result = this.todoRepository.getPaginatedData(take, skip);
    result = builder.getMany();
  }
  async stats(statsTodoDto: StatsTodoDto) {
    let result;

    if (statsTodoDto.date_debut && statsTodoDto.date_fin) {
      console.log(statsTodoDto.date_debut);
      result = this.todoRepository
        .createQueryBuilder('todo')
        .select('status as Status')
        .addSelect('COUNT(*) as Nombre')
        .where('createdAt >= :dd', {
          dd: statsTodoDto.date_debut,
        })
        .andWhere('createdAt <= :df', {
          df: statsTodoDto.date_fin,
        })
        .groupBy('status')
        .getRawMany();
    } else {
      result = this.todoRepository
        .createQueryBuilder('todo')
        .select('status as Status')
        .addSelect('COUNT(*) as Nombre')
        .groupBy('status')
        .getRawMany();
    }
    return result;
  }
}
