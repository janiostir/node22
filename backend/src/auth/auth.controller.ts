import {BadRequestException, Body, Controller, NotFoundException, Post, Res} from '@nestjs/common';
import {register} from "tsconfig-paths";
import {UserService} from "../user/user.service";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./login.dto";
import {NotFoundError} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Response} from "express";


@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
                 ) {
    }

    @Post('register')
    async register(@Body() data: RegisterDto) {
        const hashed = await bcrypt.hash(data.password, 12);
        return this.userService.create({
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "password": hashed
        });
    }

    @Post('login')
    async login(@Body() data: LoginDto,
                @Res({passthrough:true}) response: Response) {
        const user = await this.userService.findOne({email: data.email});
        if (!user){
            throw new NotFoundException('Uporabnik ne obstaja');
        }

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new BadRequestException('Napačno geslo');
        }

        const jwt = await this.jwtService.signAsync({id: user.id})

        response.cookie('jwt', jwt, {httpOnly:true})

        return user;
    }

    @Post('Logout')
    logout(@Res({passthrough:true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }


}
