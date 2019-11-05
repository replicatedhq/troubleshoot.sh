var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

var content = document.querySelector('.content.anchor-link-enabled')
if (content) {
    addHeaderAnchors(content);
}

function addHeaderAnchors(content) {
    var headers = content.querySelectorAll('h1, h2, h3, h4');
    // SVG data from https://iconmonstr.com/link-1-svg/
    var linkSvg = ' <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>';
    var anchorForId = function (id) {
        var anchor = document.createElement('a');
        anchor.classList.add('header-anchor');
        anchor.href = "#" + id;
        anchor.innerHTML = linkSvg;
        return anchor;
    };

    for (var h = 0; h < headers.length; h++) {
        var header = headers[h];

        if (typeof header.id !== "undefined" && header.id !== "") {
            header.appendChild(anchorForId(header.id));
        }
    }
}

// SEARCH.js
var client = algoliasearch("RKUCTRIG38", "1413550d394a754f742b8c18a770b5be");
var resultsEl = document.getElementById("search-results");
var index = client.initIndex("prod_kotsio");
var timeout = null;
var DEBOUNCE_TIME = 300;
function onSearchInput(event) {
    var value = event.currentTarget.value;
    clearTimeout(timeout);
    if (value) {
        timeout = setTimeout(function () {
            index.search({ query: value })
                .then(function (results) {
                    var resultsHTML = "";
                    var hits = results.hits;
                    if (results.hits.length === 0) {
                        resultsEl.innerHTML = `
                            <div class="searchbar-item text-center">
                                <p class="searchbar-content">No docs found for "${value}." Please try broadening your search</p>
                            </div>
                        `;
                        return;
                    }
                    for (var i = 0; i < hits.length; i++) {
                        var uri = hits[i]._highlightResult.uri.value;
                        var description = hits[i]._highlightResult.description && hits[i]._highlightResult.description.value;

                        resultsHTML += `
                          <a class="search-result" href="/${hits[i].uri}">
                            <div class="search-result-content">
                                ${uri && `<h3 class="searchresult-title"> ${uri}</h3>`}
                                ${(description && `<p class="searchresult-content">${description}</p>`) || ""}
                            </div>
                          </a>
                        `;
                    }
                    resultsEl.innerHTML = resultsHTML;
                }).catch(function (error) {
                    console.error(error);
                });
        }, DEBOUNCE_TIME);
    } else {
        resultsEl.innerHTML = "";
    }
}

function onSearchPageInput(event) {
    var value = event.currentTarget.value;
    var searchPageResults = document.getElementById("search-page-results");
    if (value) {
        timeout = setTimeout(function () {
            index.search({ query: value }).then(function (results) {
                var resultsHTML = "";
                var hits = results.hits;
                if (results.hits.length === 0) {
                    searchPageResults.innerHTML = `
                        <div class="searchbar-item text-center">
                            <p class="searchbar-content">No docs found for "${value}." Please try broadening your search</p>
                        </div>
                    `;
                    if (history.replaceState) {
                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + value;
                        window.history.replaceState({ path: newurl }, '', newurl);
                    }
                    return;
                }
                for (var i = 0; i < hits.length; i++) {
                    var uri = hits[i]._highlightResult.uri.value;
                    var description = hits[i]._highlightResult.description && hits[i]._highlightResult.description.value;

                    resultsHTML += `
                        <a class="search-result" href="/${hits[i].uri}">
                        <div class="search-result-content">
                            ${uri && `<h3 class="searchresult-title"> ${uri}</h3>`}
                            ${(description && `<p class="searchresult-content">${description}</p>`) || ""}
                        </div>
                        </a>
                    `;
                }
                searchPageResults.innerHTML = resultsHTML;
                if (history.replaceState) {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + value;
                    window.history.replaceState({ path: newurl }, '', newurl);
                }
            }).catch(function (error) {
                console.error(error);
            });
        }, DEBOUNCE_TIME);
    } else {
        searchPageResults.innerHTML = "";
    }

}

var searchBar = document.getElementById("search");
var searchIcon = document.getElementById("searchIcon");
var searchTooltip = document.getElementById("searchTooltip");
var searchInput = document.getElementById("searchInput");
var searchPageInput = document.getElementById("searchPageInput");

if (searchIcon && searchTooltip) {
    // Toggle the search tooltip to be shown or hidden
    searchIcon.addEventListener("click", function() {
       searchTooltip.classList.toggle("open");
       setTimeout(function() {
           if (searchTooltip.classList.contains("open")) {
               searchInput.focus();
           } else {
               searchInput.value = "";
           }
       },50);

    });
    searchInput.addEventListener("input", onSearchInput);

    window.addEventListener("keyup", function(event) {
        event.preventDefault();
        var KEY_ESCAPE = 27;
        var KEY_ARROW_UP = 38;
        var KEY_ARROW_DOWN = 40;
        var isSearchOpen = searchTooltip.classList.contains("open");
        if (event.keyCode === KEY_ESCAPE) {
            searchTooltip.classList.remove("open");
            document.body.focus();
            return;
        }

        var isSearchInputActive = document.activeElement.id === "searchInput";
        if (isSearchOpen && isSearchInputActive) {
            if (event.keyCode === KEY_ARROW_DOWN) {
                var firstResult = document.getElementsByClassName("search-result")[0];
                if (firstResult) {
                    firstResult.focus();
                }
                return;
            }
        }

        var isFocusedOnSearchResult = document.activeElement.classList.contains("search-result");
        if (isFocusedOnSearchResult) {
            if (event.keyCode === KEY_ARROW_DOWN) {
                document.activeElement.nextElementSibling.focus();
            }

            if (event.keyCode === KEY_ARROW_UP) {
                var previous = document.activeElement.previousElementSibling;
                if (previous) {
                    previous.focus();
                } else {
                    document.getElementById("searchInput").focus();
                }
            }
        }

    })
}

// Only run this JS for the search page
if (searchPageInput) {
    var urlQuery = new URLSearchParams(window.location.search);
    var q = urlQuery.get("q");

    if (q) {
        searchPageInput.value = q.trim();
        onSearchPageInput({ currentTarget: { value: q }});
    }
    searchPageInput.addEventListener("input", onSearchPageInput);
}





