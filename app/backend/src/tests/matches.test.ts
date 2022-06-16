import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';

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
});

