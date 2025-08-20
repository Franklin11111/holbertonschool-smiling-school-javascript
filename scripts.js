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
        const caruselItem = $(".carousel-item:first");
        if (loading) {
            $(".carousel-item").css('visibility', 'hidden');
          caruselItem.before('<div class="loader"></div>');
        } else {
          $(".loader").remove();
          $(".carousel-item").css('visibility', 'visible');
        }
      }


$('#carouselExampleControls2').carousel({
  interval: 10000
})

$('#carouselExampleControls2 .carousel-item').each(function(){
    var minPerSlide = 3;
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<minPerSlide;i++) {
        next=next.next();
        if (!next.length) {
        	next = $(this).siblings(':first');
      	}
        
        next.children(':first-child').clone().appendTo($(this));
      }
});

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
    console.log(json);
    // $($('#carouselExampleControls2 .card').get(0)).find('.card-img-top')
    // .attr("src", json[0].thumb_url);
    //$('.card-1 .card-title').text(json[0].title);
    console.log($($('#carouselExampleControls2 .card').get(0)).find('.card-img-top'))
    for(let i = 0; i < json.length; i++) {
      $($('#carouselExampleControls2 .card').get(i)).find('.card-img-top')
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
  })
  .fail((xhr, status, errorThrown) => {
      console.log(`Error: ${errorThrown}`);
      console.log(`Status: ${status}`);
      console.dir(xhr);
  });
}
queryTutorials();
});