import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    teamName: 'Bahia',
  },
  {
    id: 3,
    teamName: 'Botafogo',
  },
  {
    id: 4,
    teamName: 'Corinthians',
  },
  {
    id: 5,
    teamName: 'Cruzeiro',
  },
  {
    id: 6,
    teamName: 'Ferroviária',
  },
  {
    id: 7,
    teamName: 'Flamengo',
  },
  {
    id: 8,
    teamName: 'Grêmio',
  },
  {
    id: 9,
    teamName: 'Internacional',
  },
  {
    id: 10,
    teamName: 'Minas Brasília',
  },
  {
    id: 11,
    teamName: 'Napoli-SC',
  },
  {
    id: 12,
    teamName: 'Palmeiras',
  },
  {
    id: 13,
    teamName: 'Real Brasília',
  },
  {
    id: 14,
    teamName: 'Santos',
  },
  {
    id: 15,
    teamName: 'São José-SP',
  },
  {
    id: 16,
    teamName: 'São Paulo',
  },
]

describe('Teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves(teams as Team[]);
    
    sinon
      .stub(Team, 'findByPk')
      .resolves(teams[7] as Team)
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('É possível retornar todas as equipes', async () => { 
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

    const isAllAboutTeams: boolean = chaiHttpResponse.body
      .every((team: Team) => team.id && team.teamName);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(16);
    expect(isAllAboutTeams).to.be.true;
  });

  it('É possível retornar apenas uma equipe', async () => { 
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams/8')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });

});

describe('Team não existente no DB', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, 'findByPk')
      .resolves(null)
  });

  after(() => {
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Não é possível encontrar uma equipe não cadastrada', async () => { 
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams/999999999999')

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});
