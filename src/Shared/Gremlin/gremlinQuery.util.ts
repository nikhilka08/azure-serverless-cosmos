const addRelation = (vertex1Id: string, vertex2Id: string, relation: string) =>
  `g.V('${vertex1Id}').addE('${relation}').to(g.V('${vertex2Id}'))`;

const listVertexByLabel = (label: string) =>
  `g.V().hasLabel('${label}').values('name','id')`;

const listVertexRelations = (vertexId: string, relation: string) =>
  `g.V('${vertexId}').out('${relation}')`;

const dropRelationBetweenVertices = (vertex1Id: string, vertex2Id: string) =>
  `g.V('${vertex1Id}').bothE().where(otherV().hasId('${vertex2Id}')).drop()`;

export { addRelation, listVertexByLabel, listVertexRelations, dropRelationBetweenVertices };
