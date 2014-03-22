// $(function(){
//   $('button#change').on('click', function(){
//     console.log("!");

//     var wrapper = $('#wrapper');

//     if(wrapper.hasClass('normal'))
//     {
//       wrapper.removeClass('normal');
//       wrapper.addClass('editor');
//     }
//     else
//     {
//       wrapper.removeClass('editor');
//       wrapper.addClass('normal');
//     }
//   });
// });

$(function(){                              
    // $("button#change").on('click', function(){ 
    //     var oneDiv = $("#one").text().replace("First", "This is the first");
    //     $("#one").text(oneDiv);
         
    //     var oldText = "Save Earth and smile!";
    //     var newText = oldText.replace("smile", "be happy");
    //     $("#two").text(newText);
    // });
     
    // $("#refresh").click(function(){
    //     location.reload();
    // });

    $("button#newUploadButton").on('click', function(){
        $("#contents").load("/newUploaded")
    });
    $("button#harmonyChartButton").on('click', function(){
        $("#contents").load("/harmonyChart")
    });
    $("button#artistRankingButton").on('click', function(){
        $("#contents").load("/artistRanking")
    });
    $("button#modeChangeButton").on('click', function(){
    var scrollArea = $('#scrollArea');

    if(scrollArea.hasClass('normal'))
    {
      scrollArea.removeClass('normal');
      scrollArea.addClass('editor');
    }
    else
    {
      scrollArea.removeClass('editor');
      scrollArea.addClass('normal');
    }
    });
    $("button#recommendButton").on('click', function(){
        $("#contents").load("/recommend")
    });
    $("button#favoriteButton").on('click', function(){
        $("#contents").load("/myFavoriteList")
    });
    $("button#userInfoButton").on('click', function(){
        $("#contents").load("/userInfo")
    });

    $("button#createProjectButton").on('click', function(){
        $("#contents").load("/index2")
    });
    $("button#editProjectButton").on('click', function(){
    $("#contents").load("/Audiee")
    });
});