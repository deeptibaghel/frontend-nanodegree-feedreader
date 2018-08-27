/* feedreader.js
 * This is the spec file that Jasmine will read and contains
 */

$(function() {

    /*Test suite to check feeds. allFeeds element must exist.
     Each feed should have a non empty url and name.
   */
      describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('contains non empty URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });

        it('contains non empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });
    });

    /*Test suite that ensures the menu changes visibility when the menu icon is clicked.
      It tests whether the menu displays when clicked and hides when clicked again
    */

    describe('The menu', function() {

        it('ensures menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('changes visibility on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /*Test suite that ensures when the loadFeed function is called and completes its work,
     there is at least a single .entry element within the .feed container
    */

    describe('Initial Entries', function() {

        beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
        });

        it('ensures .entry element exists on completion of loadFeed', function(done) {
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);
            done();
        })
    });

    /* Test suite to ensure that the content changes afer the loadFeed function runs
      The test checks the href property of links , if it doesn't match the initial
      template value the test is successful.
    */

    describe('New Feed Selection', function() {
       beforeEach(function(done) {
         loadFeed(0, function() {
           done();
         });
       });

       it('ensures the content changes when a new feed is loaded', function(done) {
           $('a.entry-link').each(function() {
            expect($(this).attr('href') === "{{link}}").toBeFalsy();
           })
           done();
       })

    });
 }());
