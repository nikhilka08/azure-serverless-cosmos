import { Module, Global } from '@nestjs/common';
import { GremlinService } from './gremlin.service';

@Global()
@Module({
  controllers: [],
  providers: [GremlinService],
  exports: [GremlinService],
})
export class GremlinModule {}