import supertest from "supertest";
import app from "../src/index";

const api = supertest(app);

//createFruit (/post /fruits)
// describe("POST /fruits", () => {
//     it("should create a fruit", async () => {
//         const body = {
//             name: "banana",
//             price: 1.2
//         }
//         const create = await api.post('/fruits');
//         console.log(create.body)
//         //toBe -> "matcher"
//         expect(create.status).toBe(200);
//     })
// })


//getFruits (GET fruits)
describe("GET /fruits", () => {
    it("should get all fruits", async () => {
        const body = {
            name: "banana",
            price: 1.2
        }
        await supertest(app).post('/fruits').send(body)

        const result = await api.get('/fruits');
        expect(result.status).toBe(200)
        expect(result.body).toEqual([
            {
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number), 
            }
        ])
    })
})
//getSpecificFruit (GET fruits/:id)



