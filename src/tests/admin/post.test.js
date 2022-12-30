const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app');
const Admin = require('../models/admin-model');

describe('POST /admin', () => {

    const sandbox = sinon.createSandbox();
    const server = app.listen();

  it('creates a new user', async () => {
    // Stub the Sequelize `create` method
    sandbox.stub(Admin, 'create').resolves({ id_user: 99 });

    // Send a POST request to the route
    const response = await request(server)
      .post('/admin')
      .send({ id_user:99 });

    // Assert that the response is correct
    expect(response.status).to.equal(201);
    //expect(response.body).to.deep.equal({ id: 1, name: 'Bob' });

    sandbox.restore();
    server.close();

  });
});
