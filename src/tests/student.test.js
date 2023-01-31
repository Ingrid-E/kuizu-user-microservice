const request = require('supertest');
const app = require('../../app');
const sinon = require('sinon');
const Student = require('../models/student-model');

describe('Student', () => {
  
  test('GET /student', async () => {
    // Mock the findAll method of the User model to return a predetermined set of users
    Student.findAll = await jest.fn(() => [{ id_student: 1, id_user: 3 }, { id_student: 2, id_user: 1 }]);

    const response = await request(app).get('/student');

    expect(response.status).toBe(200);
    const {data:{student}} = response.body;
    expect(student).toEqual([
      { id_student: 1, id_user: 3 },
      { id_student: 2, id_user: 1 }
    ]);
  });
  
  test('GET /student/:id_student', async () => {
    
    Student.findByPk = await jest.fn(() => [{ id_student: 34, id_user: 65 }])
    const result = await request(app).get('/student/34');
    const {data:{student}} = result.body;
    expect(student).toEqual([{ id_student: 34, id_user: 65 }]);
  });

  test('DELETE /student', async () => {
    const sandbox = sinon.createSandbox();
    const deleteStub = sandbox.stub(Student, 'destroy');

    const testStudent = { id_student: 43, id_user: 12 };
    deleteStub.resolves(testStudent);

    const res = await request(app)
      .delete('/student/'+testStudent.id_student)
      .expect(200);

    const {student} = res.body;
    expect(student).toEqual(testStudent);

    sandbox.restore();
  });

  test('PUT /student/:id_student', async () => {
    const sandbox = sinon.createSandbox();
    const updateStub = sandbox.stub(Student, 'update');

    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/student/31')
      .send({id_user:14})
      .expect(200);

    const {success} = res.body;
    expect(success).toEqual(status);

    sandbox.restore();
    
  });

  /*test('POST /student/', async () => {
    const sandbox = sinon.createSandbox();
    const server = app.listen();
    // Stub the Sequelize `create` method
    sandbox.stub(Student, 'create').resolves({ id_user: 30 });

    // Send a POST request to the route
    const response = await request(server)
      .post('/student')
      .send({ id_user:30 });

    // Assert that the response is correct
    expect(response.status).toEqual(201);

    sandbox.restore();
    server.close();

  });*/

});