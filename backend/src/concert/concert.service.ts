import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConcertService {
  constructor(private db: PrismaService){}

  create(createConcertDto: CreateConcertDto) {
    if (createConcertDto.startTime < new Date()){
      throw new BadRequestException("Start time can't be in the past");
    }
    else {
      return this.db.concert.create({
        data: {
          ...createConcertDto
        }
      })
    }
  }

  findAll() {
    return this.db.concert.findMany();
  }

  findOne(id: number) {
    return this.db.concert.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return this.db.concert.update({
      where: {
        id: id
      },
      data: {
        ...updateConcertDto
      }
    })
  }

  remove(id: number) {
    return this.db.concert.delete({
      where: {
        id: id
      }
    })
  }
}
