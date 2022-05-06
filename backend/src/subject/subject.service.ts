import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Subject} from "./subject.entity";
import {Repository} from "typeorm";

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>
    ) {
    }

    getAll() {
        return this.subjectRepository.find();
    }

    getOne(id: number) {
        return this.subjectRepository.findOne({id});
    }
}
