import supertest from "supertest";
import app from "../src/index";

const api = supertest(app);

//createFruit (/post /fruits)
describe("POST /fruits", () => {
    it("should create a fruit", async () => {
        const body = {
            name: "morango",
            price: 1.2
        }
        const create = await api.post('/fruits').send(body);
        //toBe -> "matcher"
        expect(create.status).toBe(201);
    })

    it("should respond with 422(unprocessable entity) if the sent body is invalid", async () => {
        const body = {
            name: "uva",
        }
        const result = await api.post('/fruits').send(body);
        expect (result.status).toBe(422)
    })

    it("should respond with 409(conflict) if there's already an equal name on the database", async () => {
        const body = {
            name: "morango",
            price: 1.2
        }

        const result = await api.post('/fruits').send(body);
        expect (result.status).toBe(409);
    })
    
})


//getFruits (GET fruits)
describe("GET /fruits", () => {
    it("should get all fruits", async () => {
        const body = {
            name: "morango",
            price: 1.2
        }
        await api.post('/fruits').send(body)

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

describe("GET /fruits/:id", () => {
    //200
    it("should get a fruit by an specific id", async () => {
    

        const result = await api.get('/fruits/1');
        expect(result.status).toBe(200);
        expect(result.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number), 
            })    
        )
        
    })

    //404
    it("should respond with 404 when a fruit is not found", async() => {
        const result = await api.get('/fruits/2');
        expect (result.status).toBe(404);
    } )
})

