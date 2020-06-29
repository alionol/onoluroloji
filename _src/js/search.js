try {
    SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: '/search.json'
    });
}
catch(err) {
    console.log("SimpleJekyllSearch does not work here.");
}
