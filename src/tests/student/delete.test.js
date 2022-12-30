const sinon = require('sinon');
const request = require('supertest');
const { expect } = require('chai');
const Student = require('../../models/student-model');

describe('DELETE /student/:id', () => {

  const sandbox = sinon.createSandbox();
  const app = require('../../../app'); // your express server
  const deleteStub = sandbox.stub(Student, 'destroy'); // put your Sequelize model

  it('Should delete a student', async () => {
    const testStudent = { id_student: 43, id_user: 12 };
    deleteStub.resolves(testStudent);

    const res = await request(app)
      .delete('/student/'+testStudent.id_student)
      .expect(200);

    const {data:{student}} = res.body;
    expect(student).to.deep.equal(student);

    sandbox.restore();
  });
});
