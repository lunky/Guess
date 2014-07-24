// The Jasmine Test Framework
/// <reference path="lib/jasmine.css"/>
/// <reference path="lib/jasmine.js"/>
/// <reference path="lib/jasmine-html.js"/>
// Classes to test
/// <reference path="../app/helloworld.js"/>


describe("Guess Controller Tests", function () {
    it("says hello for rea", function () {
        expect(helloWorld()).toEqual("Hello world!");
    });
});
