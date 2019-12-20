(function (document, $) {
    "use strict";

    var ACCOUNT = "./account";
    var VIDEOPLAYERSEARCH = "./videoPlayerSearch";
    var VIDEOPLAYER = "./videoPlayer";

    $(document).on("dialog-ready", function() {
        init();
    });
    $(window).load(function () {
        init();
    });

    function init() {
        var videoPlayerSearch = $("[name='" + VIDEOPLAYERSEARCH +"']").closest(".coral3-Textfield")
        var videoPlayer = new CUI.Select({
             element: $("[name='" + VIDEOPLAYER +"']").closest(".coral-Select")
        });

        if(_.isEmpty(videoPlayer)){
            return;
        }

        function fillVideoPlayers(selectedAccount, selectedVideoPlayer){
            videoPlayer = new CUI.Select({
                element: $("[name='" + VIDEOPLAYER +"']").closest(".coral-Select")
            });
            $("[role='option']",videoPlayer._selectList).remove();
            var query = videoPlayerSearch.val();
            videoPlayer.disabled=true;
            $.getJSON("/bin/brightcove/api?a=search_videos&account_id="+selectedAccount+ "&query=" +query+"&start=0&limit=0&_charset_=utf-8&isID=false").done(function(data){
                _.each(data.items, function(value, id) {
                    var test2 = $("[name='./videoPlayer']")[0];
                    $("<option "+(selectedVideoPlayer === value.id ? "selected" : "")+" >").appendTo(test2).val(value.id).html(value.name);
                    $("<li class='coral-SelectList-item coral-SelectList-item--option' data-value='"+value.id+"' aria-selected='"+(selectedVideoPlayer === value.id)+"' role='option'>"+value.name+"</li>").appendTo(videoPlayer._selectList);
                });

                videoPlayer.disabled=false;

                if(!_.isEmpty(selectedVideoPlayer)){

                    videoPlayer.setValue(selectedVideoPlayer);

                }
            });
        }

        var brightcovevideotimer;
        videoPlayerSearch.on('keyup', function(event){
              console.log(event);
              var targetValue = event.currentTarget.value;
              if(targetValue !== undefined && targetValue.length > 3){
                  if (typeof brightcovevideotimer != 'undefined') clearTimeout(brightcovevideotimer);
                  brightcovevideotimer = setTimeout(function(){
                    fillVideoPlayers($("[name='" + ACCOUNT +"']").val());
                  },300);

              }
          });

        var $vform = videoPlayer.$element.closest("form");
        $.getJSON($vform.attr("action") + ".json").done(function(data){
            videoPlayer.disabled=false;
            if(_.isEmpty(data)){
                return;
            }
            fillVideoPlayers($("[name='" + ACCOUNT +"']").val(),data.videoPlayer);
        });

        //call once on init
        fillVideoPlayers($("[name='" + ACCOUNT +"']").val());
    }
})(document, Granite.$);
