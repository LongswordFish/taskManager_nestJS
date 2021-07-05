import { NotFoundException } from "@nestjs/common";
import { User } from "../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskTdo } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import {Task} from './task.entity'

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    
    async getTasks(filterDto: GetTasksFilterDto, user:User): Promise<Task[]>{
        const{status,search}= filterDto;

        const query=this.createQueryBuilder('task');
        query.where({user});

        if(status){
            console.log(`status is ${status}`);
            query.andWhere('task.status = :status',{status});
        }

        if(search){
            console.log(`search is ${search}`);
            query.andWhere(
                '(LOWER(task.title)  LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)'
                ,{search: `%${search}%`}
            )
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskTdo,user:User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task=this.create(
            {title,
            description,
            status:TaskStatus.OPEN,
            user,
        });
    
        await this.save(task);
        return task;
    }

    async deleteTask(id:string, user:User):Promise<void>{
        // const task= await this.findOne(id);
        // if(task){
        //     await this.delete(id);

        // }
        // else{
        //     throw new NotFoundException(`Cannot find task with Id ${id}`);
        // }

        const result=await this.delete({id,user});
        console.log(result.affected);
        if(result.affected==0){
            throw new NotFoundException(`Cannot find task with Id ${id}`);
        }
        
    }



}

