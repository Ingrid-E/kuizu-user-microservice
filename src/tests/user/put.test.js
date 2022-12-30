const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const User = require('../../models/user-model')
const app = require('../../../app');

describe('PUT /user/:id', () => {

    const sandbox = sinon.createSandbox();
    const updateStub = sandbox.stub(User, 'update'); // User is your Sequelize model

  it('should update a user', async () => {
    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/user/98')
      .send({firstname: "Bada", lastname: "Bias", email: "badases1998@gmail.com", imgurl: "http://imgurl.ses.kr/1998",
      lastlogin: "2002-12-24 09:15:00.000"})
      .expect(200);

    const {success} = res.body;
    expect(success).to.deep.equal(status);

    sandbox.restore();
    
  });
});
