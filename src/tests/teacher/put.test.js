const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');

const Teacher = require('../../models/teacher-model')
const app = require('../../../app');

describe('PUT /teacher/:id', () => {

    const sandbox = sinon.createSandbox();
    const updateStub = sandbox.stub(Teacher, 'update'); // Teacher is your Sequelize model

  it('should update a user', async () => {
    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/teacher/27')
      .send({id_user:10})
      .expect(200);

    const {success} = res.body;
    expect(success).to.deep.equal(status);

    sandbox.restore();
    
  });
});
