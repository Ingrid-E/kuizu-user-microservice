const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const Teacher = require('../../models/teacher-model');

describe('DELETE /teacher/:id', () => {

  const sandbox = sinon.createSandbox();
  const app = require('../../../app'); // your express server
  const deleteStub = sandbox.stub(Teacher, 'destroy'); // put your Sequelize model

  it('should delete a teacher', async () => {
    const testTeacher = { id_teacher: 33, id_user: 72 };
    deleteStub.resolves(testTeacher);

    const res = await request(app)
      .delete('/teacher/'+testTeacher.id_teacher)
      .expect(200);

    const {teacher} = res.body;
    expect(teacher).to.deep.equal(testTeacher);

    sandbox.restore();
  });
});
