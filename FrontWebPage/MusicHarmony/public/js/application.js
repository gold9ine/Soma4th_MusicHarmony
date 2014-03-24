$(function(){                              
    $("button#newUploadButton").on('click', function(){
        $("#contents").load("/newUploaded");
    });
    $("button#harmonyChartButton").on('click', function(){
        $("#contents").load("/harmonyChart");
    });
    $("button#artistRankingButton").on('click', function(){
        $("#contents").load("/artistRanking");
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
    $("button#myProjectListButton").on('click', function(){
        $("#contents").load("/myProjectList");
    });
    $("button#editProjectButton").on('click', function(){
        $("#contents").load("/edit-page");
    });
    $("button#userInfoButton").on('click', function(){
        $("#contents").load("/userInfo");
    });

    $("button#project-delete-btn").on('click', function(){
        console.log("ddd");
        $("#contents").load("/myProjectList");
    });


    
});