const request = require('supertest');
const app = require('../../../app');

const User = require('../../models/user-model');

describe('GET /user', () => {

  test('should return all of users', async () => {
    // Mock the findAll method of the User model to return a predetermined set of users
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

  test('should return a specific value when called', async () => {

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
});

