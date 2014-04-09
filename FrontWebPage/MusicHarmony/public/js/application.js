$(function(){                              
    $("button#modeChangeButton").on('click', function(){
        var scrollArea = $('#scrollArea');

        if(scrollArea.hasClass('normal'))
        {
          scrollArea.removeClass('normal');
          scrollArea.addClass('detail');
        }
        else
        {
          scrollArea.removeClass('detail');
          scrollArea.addClass('normal');
        }
    });
    $("button#project-delete-btn").on('click', function(){
        console.log("ddd");
        $("#content").load("/myProject");
    });
});