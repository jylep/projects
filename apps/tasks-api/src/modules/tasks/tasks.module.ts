import { Logger, Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, Logger]
})
export class TasksModule {}