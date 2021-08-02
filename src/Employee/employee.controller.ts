import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Endpoint } from './employee.constants';
import { GroupService } from './employee.service';
import { PersonGroupIDDto } from './validator.dto';

@Controller(Endpoint.Employee)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(Endpoint.ListGroups)
  async fetchAllGroups() {
    console.log('Started list group service.');
    return await this.groupService.fetchAllGroups();
  }

  @Post(Endpoint.AddPersonToGroup)
  async addPersonToGroup(@Body() data: PersonGroupIDDto) {
    const item = await this.groupService.addPersonToGroup(data);
    console.log('what is goinf on', item);
    return item;
  }

  @Get(Endpoint.ListGroupsOfPerson)
  async listGroupsOfPerson(@Param('id') id: string) {
    return await this.groupService.listGroupsOfPerson(id);
  }

  @Delete(Endpoint.RemovePersonFromGroup)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removePersonFromGroup(@Body() params: PersonGroupIDDto) {
    await this.groupService.removePersonFromGroup(params);
  }
}
