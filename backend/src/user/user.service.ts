import {Delete, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async all(): Promise<any> {
        return this.userRepository.find();
    }

    create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async update(id, data): Promise<User> {
        await this.userRepository.update(id, data);
        return this.findOne({id});
    }

    delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }


}
