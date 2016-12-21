import app from './server';
import { expect } from 'chai';
import request from 'supertest';

expect();

describe('API Tests', () => {
  it('should return version number', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.body.version).to.be.ok;
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
describe('Registration Tests', () => {
    it('should return the user if the name is valid', (done) => {
      request(app)
      .post('/api/register')
      .send({name: 'JoshMatz'})
      .end((err, res) => {
        expect(res.body.name).to.be.equal('JoshMatz');
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });
  
  describe('Login Tests', () => {
    it('should return the user if valid', (done) => {
      request(app)
      .post('/api/login')
      .send({userID: 0})
      .end((err, res) => {
        expect(res.body.name).to.be.equal('JoshMatz');
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });