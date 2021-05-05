import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserOAuth {
  GOOGLE = 'GOOGLE',
  NAVER = 'NAVER',
}
registerEnumType(UserOAuth, { name: 'UserOAuth' });

export enum UserRole {
  CLIENT = 'CLIENT',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  SERVER_ADMIN = 'SERVER_ADMIN',
}
registerEnumType(UserRole, { name: 'UserRole' });

// 한 달 동안 활동이 1번도 없다면 휴면유저
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DORMANCY = 'DORMANY',
}
registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'ACTIVE[활동], DORMANCY[휴면]',
});

// ! 유저가 보는 정보들이 아님
// ! 개발자 / DBA 들이 보는 정보들
// ! 유저가 스스로 수정할 수 없는 정보들
@Entity()
@ObjectType()
export class UserInfo {
  @PrimaryColumn()
  nickname!: string;

  @Column()
  @Field(() => String)
  @Length(2)
  country!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role!: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ type: 'enum', enum: UserOAuth, nullable: true })
  oauth?: UserOAuth;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: '회원탈퇴/복구 이유' })
  @IsString()
  @IsOptional()
  reason?: string;
}
