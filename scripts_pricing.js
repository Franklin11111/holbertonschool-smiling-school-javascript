$(document).ready(function() {
    function queryQuotes() {
        const dataObj = {
            action: 'query',
            format: 'json',
        };
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/quotes',
            data: dataObj,
            type: 'GET',
            dataType: 'json'
        })
        .done((json) => {
            let html = "";
            const carouselEl = $('#carouselExampleControls .carousel-inner');
            for (let i = 0; i < json.length; i++) {
                html += `<div class="carousel-item ${i === 0 ? "active": ""}">
                        <div class="row mx-auto align-items-center">
                          <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                            <img
                              src=${json[i]['pic_url']}
                              class="d-block align-self-center"
                              alt="Carousel Pic 1"
                            />
                          </div>
                          <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                            <div class="quote-text">
                              <p class="text-white">
                                ${json[i]['text']}
                              </p>
                              <h4 class="text-white font-weight-bold">${json[i]['name']}</h4>
                              <span class="text-white">${json[i]['title']}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    `;
            }
            carouselEl.append(html);
        })
        .fail((xhr, status, errorThrown) => {
            console.log(`Error: ${errorThrown}`);
            console.log(`Status: ${status}`);
            console.dir(xhr);
        });
    };

    function queryCourses(search = 'Face', topics = 'ALL', sortBy = 'Most popular') {
        const dataObj = {
            action: 'query',
            format: 'json',
            q: search,
            topic: topics,
            sort: sortBy
        };
        displayLoading(true);
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            data: dataObj,
            type: 'GET',
            dataType: 'json'
        })
        .done((json) => {
            const courses = json.courses;
            const searchedCourses = searchCourses(json.courses, dataObj.q);
            if (searchedCourses) {
                console.log(searchedCourses);
                $(".section.results .video-count").text(`${searchedCourses.length} videos`)
                let html = '';                
                $.each(searchedCourses, (index, obj) => {
                    html += `
                        <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
              <div class="card">
                <img
                  src=${obj['thumb_url']}
                  class="card-img-top"
                  alt="Video thumbnail"
                />
                <div class="card-img-overlay text-center">
                  <img
                    src="images/play.png"
                    alt="Play"
                    width="64px"
                    class="align-self-center play-overlay"
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${obj['title']}</h5>
                  <p class="card-text text-muted">
                    ${obj['sub-title']}
                  </p>
                  <div class="creator d-flex align-items-center">
                    <img
                      src=${obj['author_pic_url']}
                      alt="Creator of
                      Video"
                      width="30px"
                      class="rounded-circle"
                    />
                    <h6 class="pl-3 m-0 main-color">${obj['author']}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                      Rating: ${obj.star} <img
                              src="images/star_on.png"
                              alt="star on"
                              width="15px"
                            />
                    </div>
                    <span class="main-color">${obj['duration']}</span>
                  </div>
                </div>
              </div>
            </div>
                    `         
                });
                $(".section.results .row").append(html); 
                displayLoading(false);
            }             
        })
        .fail((xhr, status, errorThrown) => {
            console.log(`Error: ${errorThrown}`);
            console.log(`Status: ${status}`);
            console.dir(xhr);
        });
    }

    function filterCourses(topics = 'ALL') {
        const dataObj = {
            action: 'query',
            format: 'json',
            topic: topics,
        };
        displayLoading(true);
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            data: dataObj,
            type: 'GET',
            dataType: 'json'
        })
        .done((json) => {
            const courses = json.courses;            
            console.log(courses);
            if (dataObj.topic != 'ALL') {
                console.log(dataObj.topic)
                let html = '';
               $.each(courses, (index, obj) => {
                if(obj.topic === dataObj.topic) {
                    console.log(dataObj.topic)
                    html += `
                        <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
              <div class="card">
                <img
                  src=${obj['thumb_url']}
                  class="card-img-top"
                  alt="Video thumbnail"
                />
                <div class="card-img-overlay text-center">
                  <img
                    src="images/play.png"
                    alt="Play"
                    width="64px"
                    class="align-self-center play-overlay"
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${obj['title']}</h5>
                  <p class="card-text text-muted">
                    ${obj['sub-title']}
                  </p>
                  <div class="creator d-flex align-items-center">
                    <img
                      src=${obj['author_pic_url']}
                      alt="Creator of
                      Video"
                      width="30px"
                      class="rounded-circle"
                    />
                    <h6 class="pl-3 m-0 main-color">${obj['author']}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                      Rating: ${obj.star} <img
                              src="images/star_on.png"
                              alt="star on"
                              width="15px"
                            />
                    </div>
                    <span class="main-color">${obj['duration']}</span>
                  </div>
                </div>
              </div>
            </div>
                    `
                } else {
                    console.log(dataObj.topic);
                    console.log(obj.topic);
                }

               });
               $(".section.results .row").append(html); 
               displayLoading(false);
            }              
        })
        .fail((xhr, status, errorThrown) => {
            console.log(`Error: ${errorThrown}`);
            console.log(`Status: ${status}`);
            console.dir(xhr);
        });
    }

    function sortCourses(sortBy) {
        const dataObj = {
            action: 'query',
            format: 'json',
            sort: sortBy,
        };
        displayLoading(true);
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            data: dataObj,
            type: 'GET',
            dataType: 'json'
        })
        .done((json) => {
            const courses = json.courses;            
            console.log(courses);            
            let html = '';
            $.each(courses, (index, obj) => {                
                 html += `
                        <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
              <div class="card" data-views="${obj.views}" data-published="${obj['published_at']}"
              data-star="${obj.star}">
                <img
                  src=${obj['thumb_url']}
                  class="card-img-top"
                  alt="Video thumbnail"
                />
                <div class="card-img-overlay text-center">
                  <img
                    src="images/play.png"
                    alt="Play"
                    width="64px"
                    class="align-self-center play-overlay"
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${obj['title']}</h5>
                  <p class="card-text text-muted">
                    ${obj['sub-title']}
                  </p>
                  <div class="creator d-flex align-items-center">
                    <img
                      src=${obj['author_pic_url']}
                      alt="Creator of
                      Video"
                      width="30px"
                      class="rounded-circle"
                    />
                    <h6 class="pl-3 m-0 main-color">${obj['author']}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                      Rating: ${obj.star} <img
                              src="images/star_on.png"
                              alt="star on"
                              width="15px"
                            />
                    </div>
                    <span class="main-color">${obj['duration']}</span>
                  </div>
                </div>
              </div>
            </div>
                 `
            });
            $(".section.results .row").append(html);           
            let sortedItems = [];
            if(sortBy === "Most Popular"){
                console.log(sortBy);
                const items = $(".section.results .row .card");
                sortedItems = items.toArray().sort(function(a, b){
                    let valA = parseInt($(a).data('views'));
                    let valB = parseInt($(b).data('views'));
                    return valB - valA;
                });
                $.each(sortedItems, (i, o) => {
                    console.log($(o));
                });
            } else if (sortBy === "Most Recent") {
                const items = $(".section.results .row .card");
                sortedItems = items.toArray().sort(function(a, b){
                    let valA = parseInt($(a).data('published'));
                    let valB = parseInt($(b).data('published'));
                    return valB - valA;
                });
                $.each(sortedItems, (i, o) => {
                    console.log(new Date(parseInt(o.dataset.published)));
                });
            } else if (sortBy === "Most Viewed") {
                const items = $(".section.results .row .card");
                sortedItems = items.toArray().sort(function(a, b){
                    let valA = parseInt($(a).data('star'));
                    let valB = parseInt($(b).data('star'));
                    return valB - valA;
                });
                $.each(sortedItems, (i, o) => {
                    console.log(parseInt(o.dataset.star));
                });
            }
            $(".section.results .row").empty();
            $(".section.results .row").append(sortedItems);
            displayLoading(false);
        })
        .fail((xhr, status, errorThrown) => {
            console.log(`Error: ${errorThrown}`);
            console.log(`Status: ${status}`);
            console.dir(xhr);
        });
    }

    function searchCourses(dataArr, searchTxt) {
        const newDataArr = [];
        $.each(dataArr, (index, obj) => {
            const text = searchTxt.toLowerCase();
            const keywords = obj['keywords'].map((entry) => entry.toLowerCase());
            //console.log(keywords);
            if(keywords.includes(text)){
                console.log(keywords);
                newDataArr.push(obj)
            }
        });
        if (newDataArr.length > 0) {
            return newDataArr;
        } else {
            return '';
        }
    }

    function displayLoading(loading) {
        const caruselItem = $(".carousel-inner");
        if (loading) {
            $(".section.results .row .card").css('visibility', 'hidden');
          $(".section.results .row").append('<div class="loader"></div>');
        } else {
          $(".loader").remove();
          $(".section.results .row .card").css('visibility', 'visible');
        }
      }

    queryQuotes();
    $(".section.search .search-text-area").on('keypress', (e) => {
        if(e.keyCode === 13 && $(".section.search .search-text-area").val()) {
            $(".section.results .row").empty();
            queryCourses($(".section.search .search-text-area").val());
        }
    } );

    $(".section.search .dropdown1 .dropdown-item").each(function () {
        $(this).on('click', () => {
            $(".section.results .row").empty();
            filterCourses($(this).text());            
        })
    });
    
    $(".section.search .dropdown2 .dropdown-item").each(function () {
        $(this).on('click', () => {
            $(".section.results .row").empty();
            sortCourses($(this).text());
        })
    });
})