const request = require('supertest');
const app = require('../../app');
const sinon = require('sinon');
const nock = require('nock');
const Admin = require('../models/admin-model');

describe('Admin', () => {
  
  test('GET /admin', async () => {
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
  
  test('GET /admin/:id_admin', async () => {
    
    Admin.findByPk = await jest.fn(() => [{ id_admin: 34, id_user: 65 }])
    const result = await request(app).get('/admin/34');
    const {data:{admin}} = result.body;
    expect(admin).toEqual([{ id_admin: 34, id_user: 65 }]);
  });



  test('DELETE /admin', async () => {

    const sandbox = sinon.createSandbox()
    const deleteStub = sandbox.stub(Admin, 'destroy');

    const testAdmin = { id_admin: 33, id_user: 72 };
    deleteStub.resolves(testAdmin);

    const res = await request(app)
      .delete('/admin/'+testAdmin.id_admin)
      .expect(200);

    const {data:{admin}} = res.body;
    expect(admin).toEqual(testAdmin);

    sandbox.restore();
  });

  test('PUT /admin/:id_admin', async () => {

    const sandbox = sinon.createSandbox()
    const updateStub = sandbox.stub(Admin, 'update');

    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/admin/13')
      .send({id_user:123})
      .expect(200);

    const {success} = res.body;
    expect(success).toEqual(status);

    sandbox.restore();
    
  });

  /*test('POST /admin/', async () => {
    // Set up the fake response that will be returned by the mock API endpoint
    const response = {
      id_user: 452
    };
    nock('http://localhost:3000')
      .post('/user')
      .reply(201, response);

    // Send a POST request to the route being tested
    const res = await request(app).post('/user').send({
      id_user:452
    });

    // Verify that the response has the expected status code and body
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(response);
  });*/

});