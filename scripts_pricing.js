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
            console.log(json);
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
    queryQuotes();
})