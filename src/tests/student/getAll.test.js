const request = require('supertest');
const app = require('../../../app');

const Student = require('../../models/student-model');

describe('GET /student', () => {
  
  test('should return all of students', async () => {
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
  
  test('should return a student', async () => {
    
    Student.findByPk = await jest.fn(() => [{ id_student: 34, id_user: 65 }])
    const result = await request(app).get('/student/34');
    const {data:{student}} = result.body;
    expect(student).toEqual([{ id_student: 34, id_user: 65 }]);
  });
});

