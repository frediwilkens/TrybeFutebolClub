import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboards', () => {
  describe('GET /leaderboard', () => {
    let chaiHttpResponse: Response;
  
    // before(async () => {
    //   sinon
    //     .stub(User, 'findOne')
    //     .resolves({
    //       id: 1,
    //       username: 'admin',
    //       email: 'admin@admin.com',
    //       role: 'admin',
    //       password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i',
    //     } as User);
    // });
  
    // after(()=>{
    //   (User.findOne as sinon.SinonStub).restore();
    // })
  
    it('Ao acessar o endpoint retorna o status correto', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  
    it('o endpoint retorna um array', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard')
  
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  
    it('o endpoint retorna 16 linhas da tabela', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard')
  
      expect(chaiHttpResponse.body.length).to.be.equal(16);
    });
  });
  
  describe('GET /leaderboard/home', () => {
    let chaiHttpResponse: Response;
  
    // before(async () => {
    //   sinon
    //     .stub(User, 'findOne')
    //     .resolves(null);
    // });
  
    // after(()=>{
    //   (User.findOne as sinon.SinonStub).restore();
    // })
  
      
    it('Ao acessar o endpoint retorna o status correto', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/home')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  
    it('o endpoint retorna um array', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/home')
  
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  
    it('o endpoint retorna 16 linhas da tabela', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/home')
  
      expect(chaiHttpResponse.body.length).to.be.equal(16);
    });
  });

  describe('GET /leaderboard/away', () => {
    let chaiHttpResponse: Response;
  
    // before(async () => {
    //   sinon
    //     .stub(User, 'findOne')
    //     .resolves(null);
    // });
  
    // after(()=>{
    //   (User.findOne as sinon.SinonStub).restore();
    // })
  
      
    it('Ao acessar o endpoint retorna o status correto', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/away')
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  
    it('o endpoint retorna um array', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/away')
  
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  
    it('o endpoint retorna 16 linhas da tabela', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/away')
  
      expect(chaiHttpResponse.body.length).to.be.equal(16);
    });
  });
});
