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
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('contains non empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });

    /*Test suite that ensures the menu changes visibility when the menu icon is clicked.
      It tests whether the menu displays when clicked and hides when clicked again
    */

    describe('The menu', function() {

        it('ensures menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
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

        it('ensures .entry element exists on completion of loadFeed', function() {
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);
        })

    });

    /* Test suite to ensure that the content changes afer the loadFeed function runs
    */

    describe('New Feed Selection', function() {
       let prevUrl, newUrl;
       beforeEach(function(done) {
         loadFeed(0, function() {
            //feed 0 done loading
            prevUrl = $('.feed').html();

            loadFeed(1, function() {
               newUrl = $('.feed').html();
               done();
            });
         });
       });

       it('ensures the content changes when a new feed is loaded', function() {
           expect(prevUrl === newUrl).toBe(false);
       })

    });
 }());
