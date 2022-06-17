import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';
import User from '../database/models/user';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  describe('GET /matches', () => {

    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves([
          {
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 1,
            awayTeam: 8,
            awayTeamGoals: 1,
            inProgress: false,
            teamHome: {
              teamName: 'São Paulo'
            },
            teamAway: {
              teamName: 'Grêmio'
            }
          },
        ] as unknown as Match[]);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Ao funcionar corretamente retorna o status certo', async () => {
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('GET /matches?inProgress=false', () => {

    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves([
          {
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 1,
            awayTeam: 8,
            awayTeamGoals: 1,
            inProgress: false,
            teamHome: {
              teamName: 'São Paulo'
            },
            teamAway: {
              teamName: 'Grêmio'
            }
          },
        ] as unknown as Match[]);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna apenas partidas finalizadas', async () => {
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false')

      const checkInProgress = chaiHttpResponse.body
        .every((match: Match) => match.inProgress === false)
  
      expect(checkInProgress).to.be.equal(true);
    });
  })

  describe('GET /matches?inProgress=true', () => {
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves([
          {
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 1,
            awayTeam: 8,
            awayTeamGoals: 1,
            inProgress: true,
            teamHome: {
              teamName: 'São Paulo'
            },
            teamAway: {
              teamName: 'Grêmio'
            }
          },
        ] as unknown as Match[]);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna apenas partidas em andamento', async () => {
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true')
  
      const checkInProgress = chaiHttpResponse.body
        .every((match: Match) => match.inProgress === true)
  
      expect(checkInProgress).to.be.equal(true);
    });
  })

  describe('POST /matches', () => {
    let chaiLoginData: Response;
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Team, 'findByPk')
        .resolves({ id: 16, teamName: 'homeTeste' } as Team)
      sinon
        .stub(Team, 'findOne')
        .resolves({ id: 8, teamName: 'AwayTeste' } as Team)
      sinon
        .stub(Match, 'create')
        .resolves({
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: true,
        } as Match);

      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'admin',
          email: 'admin@admin.com',
          role: 'admin',
          password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i',
        } as User);
    });
  
    after(()=>{
      (Match.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
      (Team.findOne as sinon.SinonStub).restore();
      (Team.findByPk as sinon.SinonStub).restore();
    })
  
    it('É possível criar uma partida corretamente', async () => {
      chaiLoginData = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        })

      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiLoginData.body.token)
          .send({
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeam: 8,
            awayTeamGoals: 2,
            inProgress: true,
          })

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.have.property('homeTeam');
      expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body).to.have.property('awayTeam');
      expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
      expect(chaiHttpResponse.body).to.have.property('inProgress');
    });

    it('Não é possível cadastrar uma nova partida com token inválido', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'tokeninvalido')
      .send({
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('Não é possível cadastrar uma nova partida sem token', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })

  describe('POST /matches away team não cadastrada', () => {
    let chaiHttpResponse: Response;
    let chaiLoginData: Response;
  
    before(async () => {
      sinon
        .stub(Team, 'findOne')
        .resolves(undefined);
      sinon
        .stub(Team, 'findByPk')
        .resolves({ id: 1, teamName: 'teste' } as Team)
      sinon
        .stub(Match, 'create')
        .resolves(undefined);
      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'admin',
          email: 'admin@admin.com',
          role: 'admin',
          password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i',
        } as User);
    });
  
    after(()=>{
      (Match.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
      (Team.findOne as sinon.SinonStub).restore();
      (Team.findByPk as sinon.SinonStub).restore();
    })
  
    it('Não é possível cadastrar uma partida com um time não cadastrado', async () => {
      chaiLoginData = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        })

      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiLoginData.body.token)
          .send({
            homeTeam: 1,
            awayTeam: 96546,
            homeTeamGoals: 99,
            awayTeamGoals: 2,
            inProgres: true,
          })
  
      expect(chaiHttpResponse.body).to.be.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    });
  })

  describe('POST /matches home team não cadastrada', () => {
    let chaiHttpResponse: Response;
    let chaiLoginData: Response;
  
    before(async () => {
      sinon
        .stub(Team, 'findOne')
        .resolves({ id: 1, teamName: 'teste' } as Team);
      sinon
        .stub(Team, 'findByPk')
        .resolves(undefined)
      sinon
        .stub(Match, 'create')
        .resolves(undefined);
      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'admin',
          email: 'admin@admin.com',
          role: 'admin',
          password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i',
        } as User);
    });
  
    after(()=>{
      (Match.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
      (Team.findOne as sinon.SinonStub).restore();
      (Team.findByPk as sinon.SinonStub).restore();
    })
  
    it('Não é possível cadastrar uma partida com um time não cadastrado', async () => {
      chaiLoginData = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        })

      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiLoginData.body.token)
          .send({
            homeTeam: 3213132132123,
            awayTeam: 1,
            homeTeamGoals: 99,
            awayTeamGoals: 2,
            inProgres: true,
          })
  
      expect(chaiHttpResponse.body).to.be.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    });
  })


  describe('POST /matches teste de middleware', () => {
    let chaiHttpResponse: Response;
    let chaiLoginData: Response;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'admin',
          email: 'admin@admin.com',
          role: 'admin',
          password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i',
        } as User);
    })

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Não é possível cadastrar uma partida com o mesmo time se enfrentando', async () => {
      chaiLoginData = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        })

      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiLoginData.body.token)
          .send({
            homeTeam: 1,
            awayTeam: 1,
            homeTeamGoals: 99,
            awayTeamGoals: 2,
            inProgres: true,
          })
  
      expect(chaiHttpResponse.body).to.be.have.property('message');
      expect(chaiHttpResponse.body.message)
        .to.be.equal('It is not possible to create a match with two equal teams');
    });
  })

  describe('PATCH /matches/:id/finish', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves(undefined);
    });
  
    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })
  
    it('É possível finalizar uma partida em andamento', async () => {
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/41/finish')
  
      expect(chaiHttpResponse.body).to.be.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    });
  })

  describe('PATCH /matches/:id', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves(undefined);
    });
  
    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })
  
    it('Ao editar uma partida em andamento retorna o status correto', async () => {
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/43')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
});

