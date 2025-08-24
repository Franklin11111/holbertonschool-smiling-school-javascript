document.addEventListener("DOMContentLoaded", () => {

  const multipleItemCarousel = document.querySelector("#carouselExampleControls2");
  const multipleItemCarousel3 = document.querySelector("#carouselExampleControls3");
  const qoutesCarousel = '#carouselExampleControls';
  const tutorialsCarousel = '#carouselExampleControls2';
  const videosCarousel = "#carouselExampleControls3";
  const quotesUrl = 'https://smileschool-api.hbtn.info/quotes';
  const tutorialsUrl = 'https://smileschool-api.hbtn.info/popular-tutorials';
  const videosUrl = "https://smileschool-api.hbtn.info/latest-videos";

  queryData(qoutesCarousel, quotesUrl, getQuotesHtml);
  queryData(tutorialsCarousel, tutorialsUrl, getPopularHtml);
  queryData(videosCarousel, videosUrl, getPopularHtml);
  scrollItemHorizontally(multipleItemCarousel, tutorialsCarousel);
  scrollItemHorizontally(multipleItemCarousel3, videosCarousel);

  // Query data from API
  function queryData(carouselId, api_url, callback) {
    displayLoading(true, carouselId);
    const dataObj = {
        action: 'query',
        format: 'json',
    };
    $.ajax({
        url: api_url,
        data: dataObj,
        type: 'GET',
        dataType: 'json'
    })
    .done((json) => {
      const carouselInner = $(`${carouselId} .carousel-inner`);
      const html = callback(json);
      carouselInner.append(html);
      displayLoading(false, carouselId);
    })
    .fail((xhr, status, errorThrown) => {
        console.log(`Error: ${errorThrown}`);
        console.log(`Status: ${status}`);
        console.dir(xhr);
    });
  }

  function displayLoading(loading, container_id) {
    const caruselItem = $(`${container_id} .carousel-inner`);
    if (loading) {
      caruselItem.append('<div class="loader"></div>');
    } else {
      $(".loader").remove();
    }
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
    // Scroll item horizontally
  function scrollItemHorizontally(carouselObject, carouselId) {
    if(window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carouselObject, {
          interval: false
      });
    let scrollPosition = 0;
    const nextBtn = document.querySelector(`${carouselId} .carousel-control-next.arrow-right`);
    nextBtn.addEventListener('click', () => {
      let carouselWidth = $(`${carouselId} .carousel-inner`)[0].scrollWidth;
      let cardWidth = $(`#carouselExampleControls2 .carousel-item`).width();
          if(scrollPosition < (carouselWidth - (cardWidth * 4))) {
          scrollPosition = scrollPosition + cardWidth;
          $(`${carouselId} .carousel-inner`).animate({scrollLeft: scrollPosition}, 600);
          } else {
            scrollPosition = scrollPosition + cardWidth;
          $(`${carouselId} .carousel-inner`).animate({scrollLeft: scrollPosition}, 600);
          }
      });
      $(`${carouselId} .carousel-control-prev.arrow-left`).on('click', function() {
        let cardWidth = $(`${carouselId} .carousel-item`).width();
          if(scrollPosition > 0) {
          scrollPosition = scrollPosition - cardWidth;
          $(`${carouselId} .carousel-inner`).animate({scrollLeft: scrollPosition}, 600);
          } else {
            scrollPosition = scrollPosition - cardWidth;
          $(`${carouselId} .carousel-inner`).animate({scrollLeft: scrollPosition}, 600);
          }
      });
   }
  }    
});