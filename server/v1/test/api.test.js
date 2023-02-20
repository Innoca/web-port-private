const chai = require('chai');
const chaiHttp = require('chai-http');
const { response, resource } = require('../app');
const server = require('../app');

// Assertion style

chai.should();

chai.use(chaiHttp)

describe('Blogs API', () => {
    // Get all blogs
    describe("GET /blogs", () => {
        it("It should get all the blogs", (done) => {
            chai.request(server)
            .get('/blogs')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(12);
            done();
            })
        })
    })
    // Get a blog by id

    // Edit a blog

    // Patch 

    // Delete
});


