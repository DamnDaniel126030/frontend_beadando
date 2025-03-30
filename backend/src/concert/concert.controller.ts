import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { NotFoundError } from 'rxjs';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  create(@Body() createConcertDto: CreateConcertDto) {
    try {
      return this.concertService.create(createConcertDto);
    }
    catch {
      throw new BadRequestException("Invalid data entry");
    }
  }

  @Get()
  findAll() {
    return this.concertService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const concert = await this.concertService.findOne(+id)
    if (concert == null){
      throw new NotFoundException("No concert found with this ID");
    }
    else {
      return concert;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto) {
    try {
      const concertToUpdate = await this.concertService.update(+id, updateConcertDto);
      return concertToUpdate;
    }
    catch {
      throw new NotFoundException("No concert found with this ID, update failed");
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const concertToDelete = await this.concertService.remove(+id);
      return concertToDelete;
    }
    catch{
      throw new NotFoundException("No concert found with this ID, delete failed");
    }
  }
}
