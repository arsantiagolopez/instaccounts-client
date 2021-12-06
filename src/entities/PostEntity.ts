import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { InstagramEntity } from "./InstagramEntity";

@Entity("posts")
export class PostEntity {
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id!: string;

  @Column({ type: "varchar", nullable: false })
  username!: string;

  @Column({ type: "int", nullable: false })
  height!: number;

  @Column({ type: "int", nullable: false })
  width!: number;

  @Column({ type: "varchar", nullable: false })
  image!: string;

  @Column({ type: "text", nullable: true })
  caption?: string;

  @Column({ type: "varchar", nullable: true })
  location?: string;

  @Column({ type: "int", nullable: false })
  comments!: number;

  @Column({ type: "int", nullable: false })
  likes!: number;

  @Column({ type: "varchar", nullable: false })
  timestamp!: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isCarousel!: boolean;

  @Column({ type: "varchar", array: true, nullable: true })
  carouselImages?: string[];

  @Column({ type: "uuid", nullable: false })
  instagramId!: string;

  @ManyToOne(() => InstagramEntity, (instagram) => instagram.posts)
  instagram!: InstagramEntity;
}
