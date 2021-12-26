
jQuery(function() { 
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9lc3BvcnQubG9jYWxcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MjA0NDI1MjgsImV4cCI6MTYyMDQ0NjEyOCwibmJmIjoxNjIwNDQyNTI4LCJqdGkiOiJyNG1qTVNnQk50b1hsQjViIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JXFkELGW7qammuPHTAcTQATep3CFoN1FeoArFvc1pjc';
    $('body').on("keyup",'#serach-bar', function(){
        val = $(this).val();

        if(val != ''){
            $('.chat-history-item').hide();

            $.ajax({
                type: "GET",
                url: "/api/users?q=" + val,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.success){
                        html = '';
                        $(data.results).each(function(index, conversation) {
                            html += '<div class="chat-history-item" user="'+ conversation.id +'">' +
                                '<div class="avatar">' +
                                '<img src="'+ conversation.avatar_path +'" alt="avatar" />' + 
                                '</div>' +
                                '<div class="chat-content">' +
                                '<p class="title">'+ conversation.username +'</p>' +
                                '</div>' +
                                '</div>';
                        });

                        $('.search-result').html(html);

                    }else{
                        $('.search-result').html('<h4>نتیجه ای یافت نشد.</h4>')
                    }
                    // alert(data.success);
                    // $(data.results).each(function(index, element) {
                    //     alert('id: ' + element.id + ', name: ' + element.name);
                    // });
                }
              });

        }else{
            $('.chat-history-item').show();

        }
    });

    $('.back-icon').on('click', function(){
        
    });

    $('body').on("click",'.chat-history-item', function(){
        userId = $(this).attr('user');
        $(this).children('.unread_count').remove();
        $.ajax({
            type: "GET",
            url: "/api/profile/conversation/" + userId,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            dataType: "json",
            success: function(data){
                $('#send-button').attr('conversation', data.result.conversation_id);
                if(data.success){
                    html = '';
                    $(data.result.messages).each(function(index, message) {
                        if(message.is_sender){
                            html += '<div class="rce-container-mbox" message="' + message.message_id +'">' + 
                            '<div class="rce-mbox rce-mbox-right">' + 
                            '<div class="rce-mbox-body">' + 
                            '<div class="rce-mbox-text">'+ message.body +'</div>' + 
                            '<div class="rce-mbox-time non-copiable" data-text="'+ message.datetime +'"></div>' + 
                            '</div><svg class="rce-mbox-right-notch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' + 
                            '<path d="M0 0v20L20 0"></path>' + 
                            '</svg>' + 
                            '</div>' + 
                            '</div>'   
                        }else{
                            html += '<div class="rce-container-mbox" message="' + message.message_id +'">'+
                                '<div class="rce-mbox">' +
                                '<div class="rce-mbox-body">' +
                                '<div class="rce-mbox-text">'+ message.body +'</div>' +
                                '<div class="rce-mbox-time non-copiable" data-text="'+ message.datetime +'"></div>' +
                                '</div>' +
                                '<div><svg class="rce-mbox-left-notch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
                                '<defs>' +
                                '<filter id="filter1" x="0" y="0">' +
                                '<feOffset result="offOut" in="SourceAlpha" dx="-2" dy="-5"></feOffset>' +
                                '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="3"></feGaussianBlur>' +
                                '<feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>' +
                                '</filter>' +
                                '</defs>' +
                                '<path d="M20 0v20L0 0" filter="url(#filter1)"></path>' +
                                '</svg></div>' +
                                '</div>' +
                                '</div>'   
                            
                        }
                    });

                    $('.message-list-container').html(html);
                    $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight);

                }else{
                    $('.message-list-container').html('');
                }
                
            }
          });
    });

    $('#message-input').on('keyup', function(e){
        if(e.keyCode == 13)
        {
            $("#send-button")[0].click();

        }
    });

    $('#send-button').on('click', function(e){
        conversation = $(this).attr('conversation');
        message = $('#message-input').val();
        $.ajax({
            type: "GET",
            url: "/api/profile/conversation/" + conversation + '/send',
            cache: false,
            data:{
                message : message
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            dataType: "json",
            success: function(data){
                html = '<div class="rce-container-mbox" message="' + data.message.message_id +'">' + 
                            '<div class="rce-mbox rce-mbox-right">' + 
                            '<div class="rce-mbox-body">' + 
                            '<div class="rce-mbox-text">'+ data.message.body +'</div>' + 
                            '<div class="rce-mbox-time non-copiable" data-text="'+ data.message.datetime +'"></div>' + 
                            '</div><svg class="rce-mbox-right-notch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' + 
                            '<path d="M0 0v20L20 0"></path>' + 
                            '</svg>' + 
                            '</div>' + 
                            '</div>'
                $('.message-list-container').append(html);
                $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight); 
                message = $('#message-input').val('');
                $('.chat-history-item[conversation='+conversation+'] .last-message').html(data.message.body);
            }
        });
    });
})
    

