$(document).on('turbolinks:load', function(){

  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main3">
                  <div class="main2"></div>
                  <div class="main3__user">
                    ${message.user_name}
                  </div>
                  <div class="main3__date">
                    ${message.date}
                  </div>
                  <div class="main3__chat">
                    <p class="lower-message__content">
                    ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
    
      var html = buildHTML(data);
      
      $('.main4').append(html);
      $('.new_message')[0].reset();
      console.log(data)
      var target = $('.main3').last();
      var position = target.offset().top + $('.main5').scrollTop();

      $('.main5').animate({
        scrollTop: position
      }, 300, 'swing');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
})