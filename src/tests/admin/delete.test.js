const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const Admin = require('../models/admin-model');

describe('DELETE /admin/:id', () => {

  const sandbox = sinon.createSandbox();
  const app = require('../../app'); // your express server
  const deleteStub = sandbox.stub(Admin, 'destroy'); // put your Sequelize model

  it('should delete a user', async () => {
    const testAdmin = { id_admin: 33, id_user: 72 };
    deleteStub.resolves(testAdmin);

    const res = await request(app)
      .delete('/admin/'+testAdmin.id_admin)
      .expect(200);

    const {data:{admin}} = res.body;
    expect(admin).to.deep.equal(testAdmin);

    sandbox.restore();
  });
});
