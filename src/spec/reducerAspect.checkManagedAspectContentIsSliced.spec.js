import {createFeature,
        managedExpansion,
        launchApp}      from 'feature-u';
import {reducerAspect}  from '..'; // modules under test

// NOTE: This test is broken out into a separate module to clear
//       any residual reducerAspect state as a result of invoking
//       launchApp() on it!
describe('checkManagedAspectContentIsSliced', () => {

  const nonSlicedReducer = (state=null, action) => 'nonSlicedReducer';

  const bad_launchApp = () => launchApp({
    aspects: [
      reducerAspect
    ],

    features: [
      createFeature({
        name:    'feature1',
        reducer: managedExpansion( (app) => nonSlicedReducer ),
      }),
    ],
    registerRootAppElm(rootAppElm) {
      // don't care
    }
  });

  test('validate function', () => {
    expect(bad_launchApp)
      .toThrow(/reducer .* must be embellished with slicedReducer/);
    // THROW: createFeature() parameter violation: reducer (when supplied) must be embellished with slicedReducer(). SideBar: slicedReducer() should always wrap the the outer function passed to createFunction() (even when managedExpansion() is used).
  });

});
