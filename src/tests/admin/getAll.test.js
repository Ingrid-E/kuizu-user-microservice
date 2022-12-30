const request = require('supertest');
const app = require('../../../app');

const Admin = require('../../models/admin-model');

describe('GET /admin', () => {
  
  test('should return all of users', async () => {
    // Mock the findAll method of the User model to return a predetermined set of users
    Admin.findAll = await jest.fn(() => [{ id_admin: 1, id_user: 3 }, { id_admin: 2, id_user: 1 }]);

    const response = await request(app).get('/admin');

    expect(response.status).toBe(200);
    const {data:{admin}} = response.body;
    expect(admin).toEqual([
      { id_admin: 1, id_user: 3 },
      { id_admin: 2, id_user: 1 }
    ]);
  });
  
  test('should return a specific value when called', async () => {
    
    Admin.findByPk = await jest.fn(() => [{ id_admin: 34, id_user: 65 }])
    const result = await request(app).get('/admin/34');
    const {data:{admin}} = result.body;
    expect(admin).toEqual([{ id_admin: 34, id_user: 65 }]);
  });
});

