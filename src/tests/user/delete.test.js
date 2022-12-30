const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../../models/user-model');

describe('DELETE /user/:id', () => {

  const sandbox = sinon.createSandbox();
  const app = require('../../../app'); // your express server
  const deleteStub = sandbox.stub(User, 'destroy'); // put your Sequelize model

  it('should delete a user', async () => {
    const testUser = { id_user:8, firstname:"Crilin", lastname:"Calvo", email:"calvito@gmail.com", imgurl:"http://imgurl.org.py", lastlogin: "2018-04-12 04:15:00.000"};
    deleteStub.resolves(testUser);

    const res = await request(app)
      .delete('/user/'+testUser.id_user)
      .expect(200);

    const {data:{user}} = res.body;
    expect(user).to.deep.equal(testUser); 

    sandbox.restore();
  });
});
