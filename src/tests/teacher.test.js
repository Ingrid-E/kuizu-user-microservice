const request = require('supertest');
const app = require('../../app');
const sinon = require('sinon');
const Teacher = require('../models/teacher-model');

describe('', () => {
  
    test('GET /teacher/', async () => {
      // Mock the findAll method of the User model to return a predetermined set of users
      Teacher.findAll = await jest.fn(() => [{ id_teacher: 1, id_user: 3 }, { id_teacher: 2, id_user: 1 }]);
  
      const response = await request(app).get('/teacher');
  
      expect(response.status).toBe(200);
      const {data:{teachers}} = response.body;
      expect(teachers).toEqual([
        { id_teacher: 1, id_user: 3 },
        { id_teacher: 2, id_user: 1 }
      ]);
    });
    
    test('GET /teacher/:id_teacher/', async () => {
      
      Teacher.findByPk = await jest.fn(() => [{ id_teacher: 34, id_user: 65 }])
      const result = await request(app).get('/teacher/34');
      const {data:{teacher}} = result.body;
      expect(teacher).toEqual([{ id_teacher: 34, id_user: 65 }]);
    });

    test('DELETE /teacher/:id_teacher/', async () => {
        const sandbox = sinon.createSandbox();
        const deleteStub = sandbox.stub(Teacher, 'destroy');

        const testTeacher = { id_teacher: 33, id_user: 72 };
        deleteStub.resolves(testTeacher);
    
        const res = await request(app)
          .delete('/teacher/'+testTeacher.id_teacher)
          .expect(200);
    
        const {teacher} = res.body;
        expect(teacher).toEqual(testTeacher);
    
        sandbox.restore();
      });

      test('PUT teacher/:id_teacher/', async () => {
        const sandbox = sinon.createSandbox();
        const updateStub = sandbox.stub(Teacher, 'update');

        const status = true;
        updateStub.resolves(status);
    
        const res = await request(app)
          .put('/teacher/27')
          .send({id_user:10})
          .expect(200);
    
        const {success} = res.body;
        expect(success).toEqual(status);
    
        sandbox.restore();
        
      });

    /*test('POST /teacher/', async () => {
    const sandbox = sinon.createSandbox();
    const server = app.listen();
    // Stub the Sequelize `create` method
    sandbox.stub(Teacher, 'create').resolves({ id_user: 72 });

    // Send a POST request to the route
    const response = await request(server)
      .post('/teacher')
      .send({ id_user:72 });

    // Assert that the response is correct
    expect(response.status).toEqual(201);

    sandbox.restore();
    server.close();

    });*/

  });