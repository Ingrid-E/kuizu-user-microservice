const request = require('supertest');
const app = require("../../app");

describe("Teachers", () => {

    test("Add an admin", async () => {
        const result = await request(app)
            .post("/admin")
            .send({ id_user: 48 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)

            expect(result.body.success).toEqual(true)
    })

    test('Get all admins', async () => {
        const result = await request(app)
            .get('/admin')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Admins not found")
            }
    });

    test('Get an admin', async () => {
        const result = await request(app)
            .get('/admin/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            
            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Admin not found")
            }
            
    });

    test('Delete an admin', async () => {
        const result = await request(app)
            .delete('/admin/89')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

            if(result.status==200){
                expect(result.body.success).toEqual(true)
            }
            
            if(result.status==404){
                expect(result.body.data.title).toEqual("Admin not found")
            }
            
    });

       test('Update an admin', async () => {
        const result = await request(app)
         .put('/admin/89')
         .send({ id_user: 56 })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/);

         if(result.status==200){
            expect(result.body.success).toEqual(true)
        }
        
        if(result.status==404){
            expect(result.body.data.title).toEqual("Admin not found")
        }

       });
});