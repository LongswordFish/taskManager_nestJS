import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.dev`],
    }),
    TasksModule,
    // TypeOrmModule.forRootAsync({
    //   imports:[ConfigModule],
    //   inject: [ConfigService],
    //   useFactory:async (configService:ConfigService)=>{
    //     return{
    //       type:'postgres',
    //       autoLoadEntities:true,
    //       synchronize:true,
    //       host:configService.get('DB_HOST'),
    //       port:configService.get('DB_PORT'),
    //       username:configService.get('DB_USERNAME'),
    //       password:configService.get('DB_PASSWORD'),
    //       database:configService.get('DB_DATABASE'),
    //     }
    //   },
    // }),
    TypeOrmModule.forRoot({
      type:'postgres',
      autoLoadEntities:true,
      synchronize:true,
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'task-management',
    }),
    AuthModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
