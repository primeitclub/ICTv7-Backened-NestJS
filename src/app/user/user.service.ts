import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/User.entity';
import { Repository } from 'typeorm';
import { UserType } from './user.enum';
import { addUsersDTO, updateUsersDTO } from './user.dto';
import { hashInformation } from 'src/utils/bcrypt.util';
import { UserTry } from './model/newUser.entitytry';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserTry, 'tryDB')
    private userTryRepository: Repository<UserTry>
  ) {}

  async createUser(user: {
    username: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    user_type: UserType;
    college_name: string;
    TnCFlag: boolean;
    verified: boolean;
  }) {
    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers() {
    const usertry = await this.userTryRepository.find();
    console.log(usertry);
    return await this.userRepository.find({
      relations: { events: true }
    });
  }

  async addUser(request: addUsersDTO) {
    const { username, email, password, user_type } = request;

    const userAlreadyExist = await this.findByEmail(email);

    if (userAlreadyExist)
      throw new HttpException(
        'Email has already been taken.',
        HttpStatus.FOUND
      );

    const hashedPassword = await hashInformation(password);

    const user = await this.createUser({
      username,
      email,
      phone: '+977 9876543210',
      password: hashedPassword,
      address: 'kathmandu',
      user_type,
      college_name: 'prime',
      TnCFlag: true,
      verified: true
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'New user added successfully.',
      user
    };
  }

  async updateUser(id: number, request: updateUsersDTO) {
    const { username, email, password, user_type } = request;

    let userExist = await this.findById(id);

    if (!userExist)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const hashedPassword = await hashInformation(password);

    userExist = {
      ...userExist,
      username,
      email,
      password: hashedPassword,
      user_type
    };

    await this.userRepository.save(userExist);

    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully.'
    };
  }

  async deleteUser(id: number) {
    const userExist = await this.findById(id);

    if (!userExist)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    await this.userRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully.'
    };
  }
}
