$(function(){                              
    $("img#modeChangeButton").on('click', function(){
        var containerArea = $('#container');

        if(containerArea.hasClass('normal'))
        {
          containerArea.removeClass('normal');
          containerArea.addClass('detail');
        }
        else
        {
          containerArea.removeClass('detail');
          containerArea.addClass('normal');
        }
    });

    $("button#project-delete-btn").on('click', function(){
        console.log("ddd");
        $("#content").load("/myProject");
    });
});