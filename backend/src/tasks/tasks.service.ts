import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { User } from '../users/entities/user.entity';
import { RoleName } from '../common/enums/role.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  /**
   * Creates a new task.
   * Permission: Restricted to ADMIN users only.
   */
  async create(dto: CreateTaskDto, creator: User): Promise<Task> {
    if (creator.role.name !== RoleName.ADMIN) {
      throw new ForbiddenException('Only admin can create tasks');
    }

    const assignedUser = await this.usersRepo.findOneByOrFail({
      id: dto.assignedUserId,
    });

    const task = this.tasksRepo.create({
      title: dto.title,
      description: dto.description ?? null,
      assignedUser,
      createdBy: creator,
    });
    return this.tasksRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto, user: User): Promise<Task> {
    if (user.role.name !== RoleName.ADMIN) {
      throw new ForbiddenException('Only admin can edit tasks');
    }

    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['assignedUser', 'createdBy'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description ?? null;
    if (dto.assignedUserId !== undefined) {
      task.assignedUser = await this.usersRepo.findOneByOrFail({
        id: dto.assignedUserId,
      });
    }

    return this.tasksRepo.save(task);
  }

  /**
   * Deletes a task.
   * Permission: Restricted to ADMIN users only.
   */
  async delete(id: number, user: User): Promise<void> {
    if (user.role.name !== RoleName.ADMIN) {
      throw new ForbiddenException('Only admin can delete tasks');
    }

    const result = await this.tasksRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async changeStatus(
    id: number,
    dto: ChangeStatusDto,
    user: User,
  ): Promise<Task> {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['assignedUser', 'createdBy'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isAdmin = user.role.name === RoleName.ADMIN;
    const isAssigned = task.assignedUser?.id === user.id;

    if (!isAdmin && !isAssigned) {
      throw new ForbiddenException('Not allowed to change status');
    }

    task.status = dto.status;
    return this.tasksRepo.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    return this.tasksRepo.find({
      relations: ['assignedUser', 'createdBy'],
    });
  }

  async findMyTasks(user: User): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { assignedUser: { id: user.id } },
      relations: ['assignedUser', 'createdBy'],
    });
  }

  async findOne(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['assignedUser', 'createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isAdmin = user.role.name === RoleName.ADMIN;
    const isAssigned = task.assignedUser?.id === user.id;

    if (!isAdmin && !isAssigned) {
      throw new ForbiddenException('Not allowed to view this task');
    }

    return task;
  }
}

