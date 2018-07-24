import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //ignores localhost dev server ssl error

describe('/GET cats', () => {
    it('it should return status 200', (done) => {
        chai.request('https://localhost:8443/api/')
            .get('cats')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    })
    it('response should ba an array', (done) => {
        chai.request('https://localhost:8443/api/')
            .get('cats')
            .end((err, res) => {
                chai.expect(res.body instanceof Array).to.equal(true);
                done();
            });
    })
});

