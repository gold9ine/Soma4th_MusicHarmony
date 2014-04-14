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


  $(document).on("submit", "#register-form", function(event){
    event.preventDefault();

    var url = $(this).attr("action");
    var form = $(this);

    $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      success: function(data, status){
        var result = $.parseJSON(data);

        if(result.status == "success")
        {
          window.location.href = result.redirect_to;
        }
        else
        {
          var newForm = $(result.form).find("#register-form");
          $('#register-form').replaceWith(newForm);
        }
      },
      error: function(data, status){
        // error
      }
    });
  });
});