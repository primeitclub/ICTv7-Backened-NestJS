import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Event } from './Event.entity';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  companyName: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  linkedInURL: string;

  @Column({ type: 'varchar', nullable: true })
  twitterURL: string;

  @ManyToOne(() => Event, (event) => event.speakers)
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
