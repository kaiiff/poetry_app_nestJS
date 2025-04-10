import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkMail = await this.prisma.user.findUnique({ where: { email } });
    if (checkMail)
      throw new UnauthorizedException('registered email id is already exist');

    return this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Incorrect password');

    const token = this.jwtService.sign({ userId: user.id });
    return {
      data: user,
      access_token: token,
    };
  }
}
