const request = require('supertest');
const app = require('../../app');
const sinon = require('sinon');
const User = require('../models/user-model');

describe('Users', () => {

  test('GET /user', async () => {
    User.findAll = await jest.fn(() => [{
      id_user: 18, firstname: "Goten", lastname: "Saya", email: "gotenks@gmail.com",
      imgurl: "http://imgurl.org.uy", lastlogin: "1998-06-13 02:54:00.000"
    }, {
      id_user: 24, firstname: "Milk", lastname: "China", email: "milkway@gmail.com",
      imgurl: "http://imgurl.org.ch", lastlogin: "1998-03-28 05:55:00.000"
    }]);

    const response = await request(app).get('/user');

    expect(response.status).toBe(200);
    const { data: { users } } = response.body;
    expect(users).toEqual([
      {
        id_user: 18, firstname: "Goten", lastname: "Saya", email: "gotenks@gmail.com",
        imgurl: "http://imgurl.org.uy", lastlogin: "1998-06-13 02:54:00.000"
      }, {
        id_user: 24, firstname: "Milk", lastname: "China", email: "milkway@gmail.com",
        imgurl: "http://imgurl.org.ch", lastlogin: "1998-03-28 05:55:00.000"
      }
    ]);
  });

  test('GET /user/:id_user/', async () => {

    User.findByPk = await jest.fn(() => [{
      id_user: 74, firstname: "Eugene", lastname: "Kitaeyoung", email: "eugeneses1998@gmail.com",
      imgurl: "http://imgurl.ses.kr/1998", lastlogin: "2002-12-24 09:15:00.000"
    }])
    const result = await request(app).get('/user/74');
    const { data: { user } } = result.body;
    expect(user).toEqual([{
      id_user: 74, firstname: "Eugene", lastname: "Kitaeyoung", email: "eugeneses1998@gmail.com",
      imgurl: "http://imgurl.ses.kr/1998", lastlogin: "2002-12-24 09:15:00.000"
    }]);
  });

  test('DELETE /user/:id_user/', async () => {
    const sandbox = sinon.createSandbox();
    const deleteStub = sandbox.stub(User, 'destroy');

    const testUser = { id_user:8, firstname:"Crilin", lastname:"Calvo", email:"calvito@gmail.com", imgurl:"http://imgurl.org.py", lastlogin: "2018-04-12 04:15:00.000"};
    deleteStub.resolves(testUser);

    const res = await request(app)
      .delete('/user/'+testUser.id_user)
      .expect(200);
    sandbox.restore();
  });

  test('PUT /user/:id_user', async () => {

    const sandbox = sinon.createSandbox();
    const updateStub = sandbox.stub(User, 'update');
    
    const status = true;
    updateStub.resolves(status);

    const res = await request(app)
      .put('/user/98')
      .send({firstname: "Bada", lastname: "Bias", email: "badases1998@gmail.com", imgurl: "http://imgurl.ses.kr/1998",
      lastlogin: "2002-12-24 09:15:00.000"})
      .expect(200);

    const {success} = res.body;
    expect(success).toEqual(status);

    sandbox.restore();
    
  });

});