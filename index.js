$(document).ready(function() {
    $(window).scroll( function(){
        $('.fadein').each( function(i){

            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1'},1000);
            }

        });
    });
});

// $(document).ready(function(){
//   $(".skills").fadeout("fast")
//   $(window).scroll(function(){
//     if($(this).scrollTop()>700){
//       $(".intro").css({"opacity":"0"})
//     }
//     else{
//       $(".intro").css({"opacity":"1"})
//
//
//     }
//   })
// });
//
// $(document).ready(function(){
//   $(window).scroll(function(){
//     if($(this).scrollTop()>700 && $(this).scrollTop()<1200 ){
//       $(".skills").fadeIn();
//     }
//     else{
//       $(".skills").fadeOut();
//     }
//   })
// });
//
// $(document).ready(function(){
//   $(window).scroll(function(){
//     if($(this).scrollTop()>700 && $(this).scrollTop()<1200 ){
//       $(".work-exp-1").css({"opacity":"1"});
//     }
//     else{
//       $(".work-exp-1").css({"opacity":"0"});
//     }
//   })
// });
