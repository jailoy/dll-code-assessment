const request = require('supertest');
import app from '../app';

describe('Get Users', () => {
  it('Should return 1st 10 users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("paging");
    expect(res.body.paging).toHaveProperty("totalResults");
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('id');
    expect(res.body.data[0]).toHaveProperty('name');    

    expect(res.body.paging).toEqual(
        expect.objectContaining({
          totalResults: expect.any(Number),
          next: expect.stringContaining('/api/users?page=2'),
        })
    );    
  });

  it('Paging should not have next', async () => {
    const res = await request(app).get('/api/users?page=1&size=100');
    expect(res.statusCode).toBe(200);
    expect(res.body.paging).not.toHaveProperty("next");   
  });

  it('Paging should not have previous', async () => {
    const res = await request(app).get('/api/users?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.paging).not.toHaveProperty("previous");   
  });  

  it('Page must be an integer', async () => {
    const res = await request(app).get('/api/users?page=qwrtr');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual('Invalid page number');   
  }); 

  it('Page must be greater than zero', async () => {
    const res = await request(app).get('/api/users?page=0');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual('Invalid page number');   
  }); 

  it('Size must be an integer', async () => {
    const res = await request(app).get('/api/users?size=qwrtr');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual('Invalid size');   
  }); 

  it('Size must be greater than zero', async () => {
    const res = await request(app).get('/api/users?size=0');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual('Invalid size');   
  }); 
})