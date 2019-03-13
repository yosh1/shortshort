'use strict';

const request = require('supertest');
const app = require('../app');
const passportStub = require('passport-stub');

describe('/login', () => {
  before(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser', password: 'testuser' });
  });
  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });
  it('ログイン時はユーザ名、パスワードが表示される', (done) => {
    request(app)
      .get('/')
      .expect(/testuser/)
      .expect(200, done);
  });
});