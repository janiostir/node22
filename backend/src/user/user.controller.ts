import {Controller, Get} from '@nestjs/common';
import {get} from "http";

@Controller('users')
export class UserController {

    @Get()
    all(){
        return 'vss je zakon!';
    }

}
