const request = require('supertest');
const app = require("../../app");

describe("users", () => {
    /*test("add a user", async () => {
        
        const result = await request(app)
            .post("/user")
            .send({ firstname: "Vinicious", lastname: "jr", email: "vinijr@brazil.br", imgurl: "http://imgur-images.org.br/img09", lastlogin: "2022-03-22 01:30:08.000" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)

            expect(result.body.success).toEqual(true)
    })*/
    test('Get all users', async () => {
        const result = await request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("User not found")
            }
    });

    test('Get a user', async () => {
        const result = await request(app)
            .get('/user/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("User not found")
            }
            
    });

    test('Delete a user', async () => {
        const result = await request(app)
            .delete('/user/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("User not found")
            }
            
    });

       test('Update a user', async () => {
        const result = await request(app)
         .put('/user/89')
         .send({ firstname: "Maria", lastname: "Nevaves", email: "mariapascua@gmail.es", imgurl: "http://imgur-images.org.py/img01", lastlogin: "1998-03-22 01:30:00.000" })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/);

         if(result.status==200){
            expect(result.body.success).toEqual(true)
        }
        
        if(result.status==404){
            expect(result.body.data.title).toEqual("User not found")
        }

       });
});