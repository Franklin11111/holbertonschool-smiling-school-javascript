document.addEventListener("DOMContentLoaded", () => {
    function queryQuotes() {
      const dataObj = {
        action: 'query',
        format: 'json',
      };        
      displayLoading(true, '#carouselExampleControls');
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/quotes',
            data: dataObj,
            type: 'GET',
            dataType: 'json'
        })
        .done((json) => {
          const carouselInner = $('#carouselExampleControls .carousel-inner');
            const quotes = getQuotesHtml(json);
            carouselInner.append(quotes);
                       
            displayLoading(false, '#carouselExampleControls');
        })
        .fail((xhr, status, errorThrown) => {
            console.log(`Error: ${errorThrown}`);
            console.log(`Status: ${status}`);
            console.dir(xhr);
        });
    }

    // get Quotes HTML    
    function getQuotesHtml(data) {
      let html = '';
      $.each(data, (index, object) => {
        html += `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
                      <div class="row mx-auto align-items-center quote1">
                        <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                          <img
                            src="${object["pic_url"]}"
                            class="d-block align-self-center"
                            alt="Carousel Pic 1"
                          />
                        </div>
                        <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                          <div class="quote-text">
                            <p class="text-white">
                              ${object.text}
                            </p>
                            <h4 class="text-white font-weight-bold">${object.name}</h4>
                            <span class="text-white">${object.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
          `
      });
      return html;
    }
    // 

    queryQuotes();
    function displayLoading(loading, container_id) {
        const caruselItem = $(`${container_id} .carousel-inner`);
        if (loading) {
            //$(".carousel-item").css('visibility', 'hidden');
            caruselItem.removeClass('d-flex');
          caruselItem.append('<div class="loader"></div>');
        } else {
          caruselItem.addClass('d-flex');
          $(".loader").remove();
          //$(".carousel-item").css('visibility', 'visible');
        }
      }

const multipleItemCarousel = document.querySelector("#carouselExampleControls2");
const multipleItemCarousel3 = document.querySelector("#carouselExampleControls3");

if(window.matchMedia("(min-width: 576px)").matches) {  
    // -----------------------
    const carousel3 = new bootstrap.Carousel(multipleItemCarousel3, {
        interval: false
    });
  let carouselWidth3 = $("#carouselExampleControls3 .carousel-inner")[0].scrollWidth;
  let cardWidth3 = $("#carouselExampleControls3 .carousel-item").width();
  let scrollPosition3 = 0;
  const nextBtn3 = document.querySelector('#carouselExampleControls3 .carousel-control-next.arrow-right')

  nextBtn3.addEventListener('click', () => {
        if(scrollPosition3 < (carouselWidth3 - (cardWidth3 * 4))) {
        scrollPosition3 = scrollPosition3 + cardWidth3;
        $("#carouselExampleControls3 .carousel-inner").animate({scrollLeft: scrollPosition3}, 600);
        } else {
          scrollPosition3 = scrollPosition3 + cardWidth3;
        $("#carouselExampleControls3 .carousel-inner").animate({scrollLeft: scrollPosition3}, 600);
        }
    });
    $('#carouselExampleControls3 .carousel-control-prev.arrow-left').on('click', function() {
        if(scrollPosition3 > 0) {
        scrollPosition3 = scrollPosition3 - cardWidth3;
        $("#carouselExampleControls3 .carousel-inner").animate({scrollLeft: scrollPosition3}, 600);
        } else {
          scrollPosition3 = scrollPosition3 - cardWidth3;
        $("#carouselExampleControls3 .carousel-inner").animate({scrollLeft: scrollPosition3}, 600);
        }
    });
}else if (window.matchMedia("(max-width: 576px)").matches){
    //$(multipleItemCarousel3).addClass('slide');
}


// Query tutorials
function queryTutorials() {
  displayLoading(true, "#carouselExampleControls2");
  const dataObj = {
      action: 'query',
      format: 'json',
  };
  $.ajax({
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
      data: dataObj,
      type: 'GET',
      dataType: 'json'
  })
  .done((json) => {
    const html = getPopularHtml(json);
    const carouselInner = $('#carouselExampleControls2 .carousel-inner');
    carouselInner.append(html);
    displayLoading(false, "#carouselExampleControls2");
  })
  .fail((xhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Status: ${status}`);
      console.dir(xhr);
  });
}

if(window.matchMedia("(min-width: 576px)").matches) {
  const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
    });
  let scrollPosition = 0;
  const nextBtn = document.querySelector('#carouselExampleControls2 .carousel-control-next.arrow-right');

  nextBtn.addEventListener('click', () => {
    let carouselWidth = $("#carouselExampleControls2 .carousel-inner")[0].scrollWidth;
    let cardWidth = $("#carouselExampleControls2 .carousel-item").width();
        if(scrollPosition < (carouselWidth - (cardWidth * 4))) {
        scrollPosition = scrollPosition + cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        } else {
          scrollPosition = scrollPosition + cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        }
    });
    $('#carouselExampleControls2 .carousel-control-prev.arrow-left').on('click', function() {
      let cardWidth = $("#carouselExampleControls2 .carousel-item").width();
        if(scrollPosition > 0) {
        scrollPosition = scrollPosition - cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        } else {
          scrollPosition = scrollPosition - cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        }
    });

}else if (window.matchMedia("(max-width: 576px)").matches){
   // $(multipleItemCarousel).addClass('slide');
}

  // get Popular Tutorials HTML    
    function getPopularHtml(data) {
      let html = '';
      $.each(data, (index, object) => {
        let ratingStar = '';
        for(let i = 0; i < object.star; i++) {
          ratingStar += `
            <img
              src="images/star_on.png"
              alt="star on"
              width="15px"
            />
          `
        }
        html += `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="card card-1">
                  <div class="img-wrapper">
                    <img
                      src="${object['thumb_url']}"
                      class="_card-img-top"
                      alt="Video thumbnail"
                    />
                  </div>
                  <div class="card-img-overlay text-center">
                    <img
                      src="images/play.png"
                      alt="Play"
                      width="64px"
                      class="align-self-center play-overlay"
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${object.title}</h5>
                    <p class="card-text text-muted">
                      ${object['sub-title']}
                    </p>
                    <div class="creator d-flex align-items-center">
                      <img
                        src="${object['author_pic_url']}"
                        alt="Creator of
                            Video"
                        width="30px"
                        class="rounded-circle"
                      />
                      <h6 class="pl-3 m-0 main-color">${object.author}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${ratingStar}
                      </div>
                      <span class="main-color">${object['duration']}</span>
                    </div>
                  </div>
                </div>
              </div>
          `
      });
      return html;
    }
    //

// Query videos
function queryVideos() {
  //displayLoading(true);
  const dataObj = {
      action: 'query',
      format: 'json',
  };
  $.ajax({
      url: 'https://smileschool-api.hbtn.info/latest-videos',
      data: dataObj,
      type: 'GET',
      dataType: 'json'
  })
  .done((json) => {
    console.log(json);
    console.log($($('#carouselExampleControls3 .card').get(2)).find('._card-img-top'))
    for(let i = 0; i < json.length; i++) {
      $($('#carouselExampleControls3 .card').get(i)).find('._card-img-top')
        .attr("src", json[i].thumb_url);
      $($('#carouselExampleControls3 .card').get(i)).find('.card-title')
        .text(json[i].title);
      $($('#carouselExampleControls3 .card').get(i)).find('.card-text')
        .text(json[i]['sub-title']);
      $($('#carouselExampleControls3 .card').get(i)).find('.creator img')
        .attr("src", json[i]['author_pic_url']);
      $($('#carouselExampleControls3 .card').get(i)).find('.creator h6')
        .text(json[i]['author']);
      $($('#carouselExampleControls3 .card').get(i)).find('.info span')
        .text(json[i]['duration']);
      console.log(json[i].title);
        
      for(let k = 0; k < json[i].star; k++) {
        const startImg = $(`
          <img
                              src="images/star_on.png"
                              alt="star on"
                              width="15px"
                            />
          `)
        $($('#carouselExampleControls3 .card').get(i)).find('.rating').append(startImg)
      }
     }
     //displayLoading(false);
  })
  .fail((xhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Status: ${status}`);
      console.dir(xhr);
  });
}
queryTutorials();
queryVideos();
});