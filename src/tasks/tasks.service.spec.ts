import {Test} from '@nestjs/testing'
import { TasksModule } from './tasks.module';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = ()=>({
    getTasks: jest.fn(),
});

const mockUser={
    username:'TestNo1',
    password:'Password1+',
    id:'00000001',
    tasks:[]
}

describe('TasksService',()=>{
    let tasksService:TasksService;
    let tasksRepository;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers:[TasksService,
            {provide: TasksRepository, useFactory:mockTasksRepository}],
        }).compile();

        tasksService=module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('getTasks',()=>{
        it('calls TasksRepository.getTasks',async ()=>{
            expect(tasksRepository.getTasks).not.toHaveBeenCalled;
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result =  await tasksService.getTasks(null,mockUser);

            expect(tasksRepository.getTasks).toHaveBeenCalled;
            expect(result).toEqual('someValue');
        });
    });

});