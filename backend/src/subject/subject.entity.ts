import {Post} from "../post/post.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {User} from "../user/user.entity";

@Entity()
export class Subject {

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     @IsNotEmpty()
     title: string;

     @Column()
     description: string;


     created_at: Date;

     updated_at: Date;

     @OneToMany(()=>User, (user)=> user.posts, {eager: true})

     posts: Post[];
}