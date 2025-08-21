document.addEventListener("DOMContentLoaded", () => {
    function queryQuotes() {
        displayLoading(true);
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
            $(".quote1 img").attr('src', json[0].pic_url)
            $(".quote1 p").text(json[0].text);
            $(".quote1 h4").text(json[0].name);
            $(".quote1 span").text(json[0].title);

            $(".quote2 img").attr('src', json[1].pic_url)
            $(".quote2 p").text(json[1].text);
            $(".quote2 h4").text(json[1].name);
            $(".quote2 span").text(json[1].title);
            
            displayLoading(false);
        })
        .fail((xhr, status, errorThrown) => {
            console.log(`Error: ${errorThrown}`);
            console.log(`Status: ${status}`);
            console.dir(xhr);
        });
    }
    queryQuotes();
    function displayLoading(loading) {
        const caruselItem = $(".carousel-inner");
        if (loading) {
            $(".carousel-item").css('visibility', 'hidden');
          caruselItem.before('<div class="loader"></div>');
        } else {
          $(".loader").remove();
          $(".carousel-item").css('visibility', 'visible');
        }
      }

const multipleItemCarousel = document.querySelector("#carouselExampleControls2");
const multipleItemCarousel3 = document.querySelector("#carouselExampleControls3");
if(window.matchMedia("(min-width: 576px)").matches) {
  const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
    });
  let carouselWidth = $("#carouselExampleControls2 .carousel-inner")[0].scrollWidth;
  let cardWidth = $("#carouselExampleControls2 .carousel-item").width();
  let scrollPosition = 0;
  const nextBtn = document.querySelector('#carouselExampleControls2 .carousel-control-next.arrow-right')

  nextBtn.addEventListener('click', () => {
        if(scrollPosition < (carouselWidth - (cardWidth * 4))) {
        scrollPosition = scrollPosition + cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        } else {
          scrollPosition = scrollPosition + cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        }
    });
    $('#carouselExampleControls2 .carousel-control-prev.arrow-left').on('click', function() {
        if(scrollPosition > 0) {
        scrollPosition = scrollPosition - cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        } else {
          scrollPosition = scrollPosition - cardWidth;
        $("#carouselExampleControls2 .carousel-inner").animate({scrollLeft: scrollPosition}, 600);
        }
    });

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
    // $(multipleItemCarousel).addClass('slide');
    // $(multipleItemCarousel3).addClass('slide');
}


// Query tutorials
function queryTutorials() {
  displayLoading(true);
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
    
    console.log($($('#carouselExampleControls2 .card').get(0)).find('.card-img-top'))
    for(let i = 0; i < json.length; i++) {
      $($('#carouselExampleControls2 .card').get(i)).find('._card-img-top')
        .attr("src", json[i].thumb_url);
      $($('#carouselExampleControls2 .card').get(i)).find('.card-title')
        .text(json[i].title);
      $($('#carouselExampleControls2 .card').get(i)).find('.card-text')
        .text(json[i]['sub-title']);
      $($('#carouselExampleControls2 .card').get(i)).find('.creator img')
        .attr("src", json[i]['author_pic_url']);
      $($('#carouselExampleControls2 .card').get(i)).find('.creator h6')
        .text(json[i]['author']);
      $($('#carouselExampleControls2 .card').get(i)).find('.info span')
        .text(json[i]['duration']);
        
      for(let k = 0; k < json[i].star; k++) {
        const startImg = $(`
          <img
                              src="images/star_on.png"
                              alt="star on"
                              width="15px"
                            />
          `)
        $($('#carouselExampleControls2 .card').get(i)).find('.rating').append(startImg)
      }
     }
     displayLoading(false);
  })
  .fail((xhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Status: ${status}`);
      console.dir(xhr);
  });
}

// Query videos
function queryVideos() {
  displayLoading(true);
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
     displayLoading(false);
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