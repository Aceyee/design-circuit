/**
 *  Name: database.js
 *  Author: Zihan Ye
 *  Description: Connect to MySQL database using AJAX
 *
 */

var message = {
    onCreate: function () {
        message.loadMessage();
        message.setStayOnPage();
    },

    loadMessage:function(){
        $.ajax({
            type: 'POST',
            url: '/php/load.php',
            dataType: 'json',
            success: function (data) {
                $.each(data.Message, function (index, user) {
                    $('#message').append('<div class="messageCard card mb-3 card-message" style="max-width: 18rem;">'
                        + '<div class="card-header">'
                        +   '<div class="float-left">' + user.username + '</div>'
                        +   '<div class="float-right">' + user.date + '</div>'
                        +'</div>'
                        +'<div class="card-body text-white">'
                        +   '<p class="card-text">'+user.message+'</p>'
                        +'</div>'
                    +'</div>');
                });
            }
        });
    },

    setStayOnPage: function () {
        $("form").submit(function(e) {
            e.preventDefault();
            $.ajax({
                url: $('form').attr('action'),
                type: 'POST',
                data : $('form').serialize(),
                success: function(){
                    $('.messageCard').remove();
                    $('#collapseExample').removeClass('show');
                    message.loadMessage();
                }
            });
        });
    }
}
message.onCreate();