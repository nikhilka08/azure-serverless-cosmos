import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { memberOfRelation, groupVertexLabel } from 'src/Shared/graph.constants';
import { GremlinService } from 'src/Shared/Gremlin/gremlin.service';
import {
  addRelation,
  listVertexByLabel,
  listVertexRelations,
  dropRelationBetweenVertices,
} from 'src/Shared/Gremlin/gremlinQuery.util';
import { PersonGroupIDDto } from './validator.dto';

@Injectable()
export class GroupService {
  constructor(private readonly gremlinService: GremlinService) {}
  async fetchAllGroups() {
    try {
      console.log('Fetching groups list');
      const query = listVertexByLabel(groupVertexLabel);
      const groupList = await this.gremlinService.gremlinClient().submit(query);
      return groupList;
    } catch (error) {
      console.log(`Error Fetching groups list ${JSON.stringify(error)}`);
      throw new HttpException(error.statusMessage, error.statusCode);
    }
  }

  async addPersonToGroup(data: PersonGroupIDDto) {
    console.log(`Items in data ${JSON.stringify(data)}`);
    const query = addRelation(data.personId, data.groupId, memberOfRelation);
    try {
      const personMemberOfQuery = listVertexRelations(
        data.personId,
        memberOfRelation,
      );
      const memberData = await this.gremlinService
        .gremlinClient()
        .submit(personMemberOfQuery);

      const isMember =
        memberData &&
        memberData._items.find(element => element.id === data.groupId);
      if (isMember) {
        throw new HttpException(
          'Already a member of this group',
          HttpStatus.CONFLICT,
        );
      }
      return await this.gremlinService.gremlinClient().submit(query);
    } catch (error) {
      throw new HttpException(
        error.statusMessage || error.message,
        error.statusCode || error.status,
      );
    }
  }

  async listGroupsOfPerson(personId: string) {
    const query = `g.V('${personId}').out('MemberOf').values('name')`;
    try {
      return await this.gremlinService.gremlinClient().submit(query);
    } catch (error) {
      console.log('error----', error);
      throw new HttpException(error.statusMessage, error.statusCode);
    }
  }

  async removePersonFromGroup(data: PersonGroupIDDto) {
    const query = dropRelationBetweenVertices(data.personId, data.groupId);
    try {
      await this.gremlinService.gremlinClient().submit(query);
    } catch (error) {
      console.log('error----', error);
      throw new HttpException(error.statusMessage, error.statusCode);
    }
  }
}
