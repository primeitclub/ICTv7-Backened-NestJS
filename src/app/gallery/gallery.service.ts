import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './Album.entity';
import { Repository } from 'typeorm';
import { createGalleryDTO, updateGalleryDTO } from './gallery.dto';
import isValidUUID from 'src/utils/checkUUID.util';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>
  ) {}

  async getAlbums() {
    const albums = await this.albumRepository.find({
      relations: { photos: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'All albums fetched successfully.',
      albums
    };
  }

  async createAlbum(request: createGalleryDTO) {
    const { slug } = request;

    const slugAlreadyInUse = await this.albumRepository.findOne({
      where: { slug }
    });

    if (slugAlreadyInUse)
      throw new HttpException('Slug is already in use.', HttpStatus.FOUND);

    const album = await this.albumRepository.save(request);

    return {
      statusCode: HttpStatus.OK,
      message: 'New album created successfully.',
      album
    };
  }

  async updateAlbum(id: string, request: updateGalleryDTO) {
    const { title, slug, thumbnail } = request;
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    let albumExists = await this.albumRepository.findOne({ where: { id } });

    if (!albumExists)
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);

    albumExists = {
      ...albumExists,
      title,
      slug,
      thumbnail
    };

    const updatedAlbum = await this.albumRepository.save(albumExists);

    return {
      statusCode: HttpStatus.OK,
      message: 'Album updated successfully.',
      updatedAlbum
    };
  }

  async deleteAlbum(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    const albumExists = await this.albumRepository.findOne({ where: { id } });

    if (!albumExists)
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);

    await this.albumRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'Album deleted successfully.'
    };
  }
}
