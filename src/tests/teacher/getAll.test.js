const request = require('supertest');
const app = require('../../../app');

const Teacher = require('../../models/teacher-model');

describe('GET /teacher', () => {
  
  test('should return all of teachers', async () => {
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
  
  test('should return a specific value when called', async () => {
    
    Teacher.findByPk = await jest.fn(() => [{ id_teacher: 34, id_user: 65 }])
    const result = await request(app).get('/teacher/34');
    const {data:{teacher}} = result.body;
    expect(teacher).toEqual([{ id_teacher: 34, id_user: 65 }]);
  });
});

