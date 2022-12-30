const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const Admin = require('../models/admin-model')
const app = require('../../app');

describe('PUT /admin/:id', () => {

    const sandbox = sinon.createSandbox();
    const updateStub = sandbox.stub(Admin, 'update'); // Admin is your Sequelize model

  it('should update a user', async () => {
    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/admin/13')
      .send({id_user:123})
      .expect(200);

    const {success} = res.body;
    expect(success).to.deep.equal(status);

    sandbox.restore();
    
  });
});
