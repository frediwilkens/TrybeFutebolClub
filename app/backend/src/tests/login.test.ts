import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Efetuando o login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
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
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Não é possível logar com a senha incorreta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
          password: '32165497654',
        });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('Não é possível logar sem informar uma senha', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
        });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('Não é possível logar sem informar um email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          password: '365464',
        });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});

describe('Efetuando o login com e-mail não cadastrado', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(null);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Não é possível logar', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
          email: 'teste@teste.com',
          password: 'secret_admin',
        });


    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});
