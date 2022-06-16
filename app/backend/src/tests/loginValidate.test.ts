import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Validando o login', () => {
  let chaiLoginData : Response;
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

  it('Com o token correto retorna a role do usuário', async () => { 
    chaiLoginData = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

    chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', chaiLoginData.body.token)
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.text).to.be.equal('admin');
  });
});
