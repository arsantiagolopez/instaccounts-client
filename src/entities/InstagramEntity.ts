import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./index";
import { PostEntity } from "./PostEntity";

@Entity("instagrams")
export class InstagramEntity {
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  username!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "int", nullable: true })
  followers?: number;

  @Column({ type: "int", nullable: true })
  following?: number;

  @Column({ type: "varchar", nullable: true })
  image?: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isAuthorized!: boolean;

  @Column({ type: "timestamp", nullable: false, default: new Date() })
  lastActive!: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;

  @Column({ type: "uuid", nullable: false })
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.instagrams)
  user!: UserEntity;

  @OneToMany(() => PostEntity, (post) => post.instagram)
  posts!: PostEntity[];
}
