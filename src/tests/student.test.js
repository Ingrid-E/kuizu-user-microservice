const request = require('supertest');
const app = require("../../app");

describe("Students", () => {

    test("Add a student", async () => {
        const result = await request(app)
            .post("/student")
            .send({ id_user: 44 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)

            expect(result.body.success).toEqual(true)
    })

    test('Get all students', async () => {
        const result = await request(app)
            .get('/student')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Students not found")
            }
    });

    test('Get a student', async () => {
        const result = await request(app)
            .get('/student/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Student not found")
            }
            
    });

    test('Delete a student', async () => {
        const result = await request(app)
            .delete('/student/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Student not found")
            }
            
    });

       test('Update a student', async () => {
        const result = await request(app)
         .put('/student/89')
         .send({ id_user: 49 })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/);

         if(result.status==200){
            expect(result.body.success).toEqual(true)
        }
        
        if(result.status==404){
            expect(result.body.data.title).toEqual("Student not found")
        }

       });
});