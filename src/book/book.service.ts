import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/database/Prismaservice';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new HttpException('Este livro já existe..!', HttpStatus.EXPECTATION_FAILED);
    }

    const book = await this.prisma.book.create({
      data,
    });

    throw new HttpException('Livro cadastrado com sucesso!!', HttpStatus.CREATED);
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async update(id: string, data: CreateBookDto) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new HttpException('Este livro não existe..!', HttpStatus.EXPECTATION_FAILED);
    }

    await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });
    
    throw new HttpException('Livro atualizado com sucesso!!', HttpStatus.OK);
  }
  
  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new HttpException('Este livro não existe..!', HttpStatus.EXPECTATION_FAILED);
    }
    
    await this.prisma.book.delete({
      where: {
        id,
      },
    })
    
    throw new HttpException('Livro removido com sucesso!!', HttpStatus.OK);
  }
  
}
