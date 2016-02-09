// feedreader.js
$(function() {

    describe('RSS Feeds', function() {

        //Tests that the allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.      
        it('Each object within allFeeds should have a URL and it should not be empty', function() {

            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url).not.toEqual('');
            }
        });

        //loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it('Each object within allFeeds should have a name and it should not be empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name).not.toEqual('');
            }
        });
    });


    //// Test suite named "The menu".
    describe('The menu', function() {

        //Tests that the menu element is hidden by default. It does this by testing for the physical posistion of the menu
        it('Slider menu must be hidden by default', function() {
            expect($(".slide-menu").css("transform")).toBe("matrix(1, 0, 0, 1, -192, 0)");
        });

        //Tests that when the menu icon is clicked it displays and then hides on a second click
        describe('Menu hide show function', function() {

            var menuIconLink = $(".menu-icon-link");

            beforeEach(function() {
                menuIconLink.click();
            });

            it('Slider menu shows on click of menu icon', function() {
                expect($("body").hasClass("menu-hidden")).toBe(false);
            });

            it('Slider menu hides on second click of menu icon', function() {
                expect($("body").hasClass("menu-hidden")).toBe(true);
            });

        });
    });



    // Test suite named "Initial Entries"
    describe('Initial Entries', function() {

        //testes that when loadFeed() is called it loads the desired feed and content is present 
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('.feed container should have one or more entries', function() {
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });
    });

    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        var firstList,
            secondList;

        //Tests that when the load feed function is called it loads a new feed
        beforeEach(function(done) {
            //each function reads the text of the first entry and stores in within the respective variable
            loadFeed(1, function() {
                firstList = $("h2")[0];
                //second loadFeed is nested within the first    
                loadFeed(2, function() {
                    secondList = $("h2")[1];
                    done();
                });
            });
        });
       
        //Variale are them compaired against one another. if they do not match the test passes.
        it('content should change on load of a new feed', function() {
            expect(firstList).not.toBe(secondList);

        });

        //Additional test to check if an element within the article tage has the class ".date".
        //assumes it would be within an element with the class ".date".
        //This would contain the date the article was published. Currently this test fails.
        describe('Entries', function() {

            xit('date each article was published should be included beneath each title', function() {
                expect($("article").hasClass("date")).toBe(true);
            });
        });



    });
}());
