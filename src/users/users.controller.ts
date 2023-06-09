import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/file/multer.config';
import { FileService } from 'src/file/file.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService,
    private fileService: FileService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  // @Post()
  // async createUser(@Body() newUser: CreateUserDto) {
  //   return this.usersService.createUser(newUser);
  // }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('profilePic', multerConfig),
  )
  async updateUser(@GetUser() user: any, @Param('id') id: string, @Body() body: CreateUserDto, @UploadedFile() profilePic?: Express.Multer.File ) {
    if (user.id !== id) return { resp: 'Forbidden resource', status: HttpStatus.FORBIDDEN };
    if (profilePic) {
      const url = await this.fileService.createFiles(profilePic);
      return this.usersService.update(id, body, url);
    }
    return this.usersService.update(id, body);
  }
}
