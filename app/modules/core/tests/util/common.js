import Yadda from 'yadda';
import chai from 'chai';
import chaiPromise from 'chai-as-promised';
import http from 'supertest-as-promised';
import config from '../../../../config/test';

// request initialization
const request = http(`http://${config.server.host}:${config.server.port}/api`);

// yadda definition
const English = Yadda.localisation.English;
const Dictionary = Yadda.Dictionary;
const YaddaEnglish = function getYadda() {
	return English.library(new Dictionary()
		.define('list', /([^\u0000]*)/, Yadda.converters.list)
		.define('table', /([^\u0000]*)/, Yadda.converters.table));
};


// Extend Chai with assertions about promises
chai.use(chaiPromise);
const expect = chai.expect;
const should = chai.should();

export { expect, should, YaddaEnglish, request };
