const request = require('supertest');
const app = require("../../app");

describe("Teachers", () => {

    test("Add a user", async () => {
        const result = await request(app)
            .post("/teacher")
            .send({ id_user: 40 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)

            expect(result.body.success).toEqual(true)
    })

    test('Get all teachers', async () => {
        const result = await request(app)
            .get('/teacher')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Teachers not found")
            }
    });

    test('Get a teacher', async () => {
        const result = await request(app)
            .get('/teacher/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Teacher not found")
            }
            
    });

    test('Delete a teacher', async () => {
        const result = await request(app)
            .delete('/teacher/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Teacher not found")
            }
            
    });

       test('Update a teacher', async () => {
        const result = await request(app)
         .put('/teacher/89')
         .send({ id_user: 51 })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/);

         if(result.status==200){
            expect(result.body.success).toEqual(true)
        }
        
        if(result.status==404){
            expect(result.body.data.title).toEqual("Teacher not found")
        }

       });
});