const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../../app');
const Teacher = require('../../models/teacher-model');

describe('POST /teacher', () => {

    const sandbox = sinon.createSandbox();
    const server = app.listen();

  it('creates a new user', async () => {
    // Stub the Sequelize `create` method
    sandbox.stub(Teacher, 'create').resolves({ id_user: 36 });

    // Send a POST request to the route
    const response = await request(server)
      .post('/teacher')
      .send({ id_user:36 });

    // Assert that the response is correct
    expect(response.status).to.equal(201);
    //expect(response.body).to.deep.equal({ id: 1, name: 'Bob' });

    sandbox.restore();
    server.close();

  });
});
