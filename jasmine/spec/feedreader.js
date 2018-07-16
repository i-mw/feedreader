/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(ele){
                expect(ele.url).toBeDefined();
                expect(ele.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(ele) {
                expect(ele.name).toBeDefined();
                expect(ele.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        let menu = $('.slide-menu'),
            menuLeft;

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            menuLeft = Number(menu.css('transform').split(',')[4]);  
            expect(menuLeft).toBeLessThan(0);
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle visibility on click',function(done) {
            $('body').toggleClass('menu-hidden');
            menu.one('transitionend', function() {
                menuLeft = Number(menu.css('transform').split(',')[4]);
                expect(menuLeft).toBe(0);

                $('body').toggleClass('menu-hidden');
                menu.one('transitionend', function() {
                    menuLeft = Number(menu.css('transform').split(',')[4]);
                    expect(menuLeft).toBeLessThan(0);
                    done();
                });
            });
 
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should be at least one', function(done) {
            expect($('.feed')[0].childElementCount).toBeGreaterThan(0);
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let prevTitle,
            prevFirstEntry,
            nextTitle,
            nextFirstEntry;

        /* make a new request to default feed, wait fot it to finish
         * and then capture its header title and first element content.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* capture header title & first element content
         * then make another request to the second feed
         */
        beforeEach(function(done) {
            prevTitle = $('.header-title')[0].innerText;
            prevFirstEntry = $('.entry-link:first-child h2')[0].innerText;

            loadFeed(1, function() {
                done();
            });
        });

        /* capture second feed header title & first entry content
         * then compare
         */
        it('should change content', function(done) {
            nextTitle = $('.header-title')[0].innerText;
            nextFirstEntry = $('.entry-link:first-child h2')[0].innerText;

            expect(nextTitle).not.toBe(prevTitle);
            expect(nextFirstEntry).not.toBe(prevFirstEntry);
            done();
        });
    });
}());