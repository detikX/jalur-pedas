$(document).ready(function(){
// arrow animations

let arrow = document.querySelector('.arrow');
let arrowRight = document.querySelector('.arrow-right');

if(arrow){
  gsap.to(arrow, {y: 12, ease: "power1.inOut", repeat: -1, yoyo: true});
}

if(arrowRight){
  gsap.to(arrowRight, {x: -12, ease: "power1.inOut", repeat: -1, yoyo: true});
}
})

$('.makanan').slick({
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".containerx",
    pin: true,
    scrub: 1,
    //snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".containerx").offsetWidth
  }
});



//timeline

$.ajax({
    url: 'js/data.json',
    type: 'GET',
    success: (response) => {
      // console.log(response.events.length);
      var i;
      var nul = [];
      //kalo ada iframe
      // <iframe id="id${id_}" src="${url_media}" frameborder="0"  scrolling="no" allowfullscreen="true" class="tambah"></iframe>
      for (var i = 0; i < response.events.length; i++) {
        if (response.events[i].id % 2 !== 0) {
          // response.events[i].id.push(response.events[i].id.splice(i, 1)[0]);
          // console.log(i + ': ' + response.events[i].id.join(' '));
          // nul.push(response.events)
          var id_ = response.events[i].id;
          var caption = response.events[i].text.caption;
          var headline = response.events[i].text.headline;
          var desc = response.events[i].text.text;
          var url_media = response.events[i].text.url_media;
          $('iframe').hide()
  
          $(".ag-timeline_list").append(`
          <div class="js-timeline_item ag-timeline_item">
              <div class="ag-timeline-card_box">
                <div class="js-timeline-card_point-box
                  ag-timeline-card_point-box">
                  <div class="ag-timeline-card_point">
                    <div class="tembakan">
                      <img src="img/Tembakan2.png" />
                    </div>
                  </div>
                </div>
                <div class="ag-timeline-card_meta-box">
                  <div class="ag-timeline-card_meta">${headline}</div>
                </div>
              </div>
              <div class="ag-timeline-card_item">
                <div class="ag-timeline-card_inner">
                  <div class="ag-timeline-card_img-box">
                    <img
                      class="id${id_}"
                      src="${url_media}"
                      class="ag-timeline-card_img" />
                     
                  </div>
                  <div class="ag-timeline-card_info">
                    <div class="ag-timeline-card_title">${headline}</div>
                    <h3>${caption}</h3>
                    <div class="ag-timeline-card_desc">
                      ${desc}
                    </div>
                  </div>
                </div>
                <div class="ag-timeline-card_arrow"></div>
              </div>
            </div>
          `)
        }
        // $('iframe').hide()
        
        if (response.events[i].id % 2 === 0) {
          // response.events[i].id.push(response.events[i].id.splice(i, 1)[0]);
          // console.log(i + ': ' + response.events[i].id.join(' '));
          // nul.push(response.events)
          var id_ = response.events[i].id;
          var headline = response.events[i].text.headline;
          var desc = response.events[i].text.text;
          var url_media = response.events[i].text.url_media;
          $(".ag-timeline_list").append(`
          <div class="js-timeline_item ag-timeline_item">
          <div class="ag-timeline-card_box">
            <div class="ag-timeline-card_meta-box">
              <div class="ag-timeline-card_meta">${headline}</div>
            </div>
            <div class="js-timeline-card_point-box
              ag-timeline-card_point-box">
              <div class="ag-timeline-card_point">
              <div class="tembakan">
                      <img src="img/Tembakan2.png" />
                    </div>
              </div>
            </div>
          </div>
          <div class="ag-timeline-card_item">
            <div class="ag-timeline-card_inner">
              <div class="ag-timeline-card_img-box">
                <img
                  src="${url_media}"
                  class="ag-timeline-card_img id${id_}" alt=""/>
                 
              </div>
              <div class="ag-timeline-card_info">
                <div class="ag-timeline-card_title">${headline}</div>
                <h3>${caption}</h3>
                <div class="ag-timeline-card_desc">
                  ${desc}
                </div>
              </div>
            </div>
            <div class="ag-timeline-card_arrow"></div>
          </div>
        </div>
          `)
        }
      }
  
      $(window).on('scroll', function () {
        fnOnScroll();
      });
      
      $(window).on('resize', function () {
        fnOnResize();
      });
      
      
      var agTimeline = $('.js-timeline'),
        agTimelineLine = $('.js-timeline_line'),
        agTimelineLineProgress = $('.js-timeline_line-progress'),
        agTimelinePoint = $('.js-timeline-card_point-box'),
        agTimelineItem = $('.js-timeline_item'),
        agOuterHeight = $(window).outerHeight(),
        agHeight = $(window).height(),
        f = -1,
        agFlag = false;
      
      function fnOnScroll() {
        agPosY = $(window).scrollTop();
      
        fnUpdateFrame();
      }
      
      function fnOnResize() {
        agPosY = $(window).scrollTop();
        agHeight = $(window).height();
      
        fnUpdateFrame();
      }
      
      function fnUpdateWindow() {
        agFlag = false;
      
        agTimelineLine.css({
          top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
          bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
        });
      
        f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
      }
      
      function fnUpdateProgress() {
        var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;
      
        i = agTop + agPosY - $(window).scrollTop();
        a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
        n = agPosY - a + agOuterHeight / 2;
        i <= agPosY + agOuterHeight / 2 && (n = i - a);
        agTimelineLineProgress.css({ height: n + "px" });
      
        agTimelineItem.each(function () {
          var agTop = $(this).find(agTimelinePoint).offset().top;
      
          (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
        })
      }
      
      function fnUpdateFrame() {
        agFlag || requestAnimationFrame(fnUpdateWindow);
        agFlag = true;
      }
      
  
    }
  });


