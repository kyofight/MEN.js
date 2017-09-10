import Yadda from 'yadda';
import _ from 'lodash';
import path from 'path';
import glob from 'glob';
require('./server');
Yadda.plugins.mocha.StepLevelPlugin.init();

const stepsMapping = {};
_.each(glob.sync('app/modules/*/tests/steps/*.steps.js'), (stepFile) => {
  let step = stepFile.split('/');
  step = step[step.length - 1];
  step = step.split('.');
  step = step[0];
  stepsMapping[step] = stepFile;
});

function requireFeatureLibraries(feature) {
  // console.log(feature);
  return feature.annotations.libraries.split(', ').reduce((libraries, library) => {
    try {
      if (stepsMapping[library]) {
        libraries = libraries.concat(require(path.resolve(stepsMapping[library])));
      }
    } catch(e) {
      console.error('module not found', e);
    }

    return libraries;
  }, []);
}

_.each(glob.sync('app/modules/*/tests/features'), (file) => {
  new Yadda.FeatureFileSearch(path.resolve(file)).each(function(file) {
    featureFile(file, function(feature) {
      var libraries = requireFeatureLibraries(feature);
      var yadda = Yadda.createInstance(libraries);

      scenarios(feature.scenarios, function(scenario) {
        const ctx = {};
        steps(scenario.steps, function(step, done) {
          yadda.run(step, { ctx }, done);
        });
      });
    });
  });
});
