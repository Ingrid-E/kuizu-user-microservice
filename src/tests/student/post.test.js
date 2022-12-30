const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../../app');
const Student = require('../../models/student-model');

describe('POST /student', () => {

    const sandbox = sinon.createSandbox();
    const server = app.listen();

  test('Creates a new student', async () => {
    // Stub the Sequelize `create` method
    sandbox.stub(Student, 'create').resolves({ id_user: 30 });

    // Send a POST request to the route
    const response = await request(server)
      .post('/student')
      .send({ id_user:30 });

    // Assert that the response is correct
    expect(response.status).to.equal(201);
    //expect(response.body).to.deep.equal({ id: 1, name: 'Bob' });

    sandbox.restore();
    server.close();

  });
});
