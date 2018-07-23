'use strict';

describe('Home', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should render home page when url contains no path', function () {
    expect(element.all(by.css('[ng-view] h1'))
      .first()
      .getText()).
      toMatch(/seans angularjs nodejs mongodb boilerplate/);
  });
});

describe('Cats', function () {

  beforeEach(function () {
    browser.get('#!/cats');
  });

  it('should render cats when user navigates to #!/cats', function () {
    expect(element.all(by.css('[ng-view] h1'))
      .first()
      .getText()).
      toMatch(/Cats/);
    //browser.driver.sleep(5000);
  });

  it('"add cats" button should be disabled by default', function () {
    expect(element(by.buttonText('Add Cat')).getAttribute('disabled')).toEqual('true');
    //browser.driver.sleep(5000);
  });

  it('"add cats" button should be enabled when text is added to "catName" input', function () {
    element(by.model('catName')).sendKeys('testcat');    
    expect(element(by.buttonText('Add Cat')).getAttribute('disabled')).toEqual(null);
    //browser.driver.sleep(5000);
  });
});

describe('Dogs', function () {

  beforeEach(function () {
    browser.get('#!/dogs');
  });

  it('should render Dogs when user navigates to #!/Dogs', function () {
    expect(element.all(by.css('[ng-view] h1'))
      .first()
      .getText()).
      toMatch(/Dogs/);
  });
});

describe('Birds', function () {

  beforeEach(function () {
    browser.get('#!/birds');
  });

  it('should render Birds when user navigates to #!/Birds', function () {
    expect(element.all(by.css('[ng-view] h1'))
      .first()
      .getText()).
      toMatch(/Birds/);
  });

});

