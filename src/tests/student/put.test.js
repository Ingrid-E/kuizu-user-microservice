const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const Student = require('../../models/student-model')
const app = require('../../../app');

describe('PUT /student/:id', () => {

    const sandbox = sinon.createSandbox();
    const updateStub = sandbox.stub(Student, 'update'); // Admin is your Sequelize model

  it('Should update a student', async () => {
    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/student/31')
      .send({id_user:14})
      .expect(200);

    const {success} = res.body;
    expect(success).to.deep.equal(status);

    sandbox.restore();
    
  });
});
