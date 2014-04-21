$(function(){                              
  // $("img#modeChangeButton").on('click', function(event){
  //     event.preventDefault();

  //     var containerArea = $('#container');
  //     if(containerArea.hasClass('normal'))
  //     { console.log("to detail");
  //       containerArea.removeClass('normal');
  //       containerArea.addClass('detail');
        
  //       session_Mode = 1;
  //     }
  //     else
  //     {console.log("to normal");
  //       containerArea.removeClass('detail');
  //       containerArea.addClass('normal');
  //       session_Mode = 0;
  //     }
  // });

  // if(session_Mode==0){
  //   console.log("normal_Mode");
  //   var containerArea = $('#container');
  //   containerArea.removeClass('detail');
  //   containerArea.addClass('normal');
  // }
  // else if(session_Mode==1){
  //   console.log("detail_Mode");
  //   var containerArea = $('#container');
  //   containerArea.removeClass('normal');
  //   containerArea.addClass('detail');
  // }

  if(session_Menu_hc==1){
    // session_Menu_hc=1;
    // session_Menu_ar=0;
    // session_Menu_mp=0;
    // session_Menu_tl=0;
    $('#harmonyChartButton').css('background-image', 'url(/img/button/btn-hc3.png)');
  }
  else if(session_Menu_ar==1){
    // session_Menu_hc=0;
    // session_Menu_ar=1;
    // session_Menu_mp=0;
    // session_Menu_tl=0;
    $('#artistRankingButton').css('background-image', 'url(/img/button/btn-ar3.png)');
  }
  else if(session_Menu_mp==1){
    // session_Menu_hc=0;
    // session_Menu_ar=0;
    // session_Menu_mp=1;
    // session_Menu_tl=0;
    $('#myProjectButton').css('background-image', 'url(/img/button/btn-mp3.png)');
  }
  else if(session_Menu_tl==1){
    // session_Menu_hc=0;
    // session_Menu_ar=0;
    // session_Menu_mp=0;
    // session_Menu_tl=1;
    $('#timelineButton').css('background-image', 'url(/img/button/btn-tl3.png)');
  }

  // var buttonHc = document.getElementById("harmonyChartButton");
  // buttonHc.style.background=url('/img/button/btn-hc3.png');
  // document.getElementById("harmonyChartButton").src="http://pagead2.googlesyndication.com/simgad/6031463256617138225";
  
  // document.harmonyChartButton.url = '/img/button/btn-hc3.png';
  // document.getElementById("harmonyChartButton").src="/img/button/btn-hc3.png";
  // $("img#harmonyChartButton").on('click', function(event){
  //     event.preventDefault();

  //     var btn_hc = $('#harmonyChartButton');
  //     var btn_ar = $('#artistRankingButton');
  //     var btn_mp = $('#myProjectButton');
  //     var btn_tl = $('#timelineButton');

  //     document.getElemetById("#harmonyChartButton").src="/button/btn-hc3.png";
  // });

  // if(session.getValue("menu_hc")==1){
  //   console.log(menu_hc);
  // }

  // $("button#project-delete-btn").on('click', function(){
  //     console.log("ddd");
  //     $("#content").load("/myProject");
  // });


  // $(document).on("submit", "#search-form", function(event){
  //   event.preventDefault();

  //   var url = $(this).attr("action");
  //   var form = $(this);

  //   $.ajax({
  //     type: "POST",
  //     url: url,
  //     data: $(this).serialize(),
  //     success: function(data, status){
  //       var result = $.parseJSON(data);

  //       if(result.status == "success")
  //       {
  //         window.location.href = result.redirect_to;
  //       }
  //       else
  //       {
  //         var newForm = $(result.form).find("#content");
  //         $('#content').replaceWith(newForm);
  //       }
  //     },
  //     error: function(data, status){
  //       // error
  //     }
  //   });
  // });
});