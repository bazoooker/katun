
// табы из чего состоит лечение

function openTab(tabNumber){ 
    $(".treatment-content-tab").removeClass("treatment-content-tab_active");
    $(".treatment-content-text__tab-contents").addClass("hidden");
   
    if (tabNumber == 1) {
        $("#tab-contents-1").removeClass("hidden");
        $("#treatment-tab-1").addClass("treatment-content-tab_active");
    }
    else if (tabNumber == 2) {
        $("#tab-contents-2").removeClass("hidden");
        $("#treatment-tab-2").addClass("treatment-content-tab_active");
    }
    else if (tabNumber == 3) {
        $("#tab-contents-3").removeClass("hidden");
        $("#treatment-tab-3").addClass("treatment-content-tab_active");
    }    
};

// табы лечение по направлениям

function openTab2(tabNumber){

    // уберем у всех табов класс "активная" 
    $(".tab").removeClass("tab_active");

    // скроем все блоки содежримого табов
    $(".treatment-course__tab-contents").addClass("hidden");
   
   // если нажат таб-1
        // покажем соответствующий блок контента
        $("#treatment-course__tab-contents-"+tabNumber).removeClass("hidden");

        // выделим соответствующий таб
        $("#course-tab-"+tabNumber).addClass("tab_active");

};




/* МОДАЛЬНЫЕ ОКНА */
$(document).ready(function(){        
    $(".callback-link").on('click', function(){
        var btn = $(this);                        
        $("#overlay").fadeIn(100, function(){
            $($(btn).data('window')).show();                        
        }); 
       $('#callback-window').show();
        return false;
    });
    
    $("#overlay, .modal .modal-close").on('click', function(){
        $("#overlay, .modal").fadeOut();
    $('.modal').find('input, textarea').val('');
        return false;
    });    
    $('.modal').each(function(){
        var f=$(this).find('.modal-content');
        var t=$(this).find('.modal-content-copy');
        t.html(f.html());
        t.hide();

    });
});
/* МОДАЛЬНЫЕ ОКНА END */

// отправка колбека
$(".modal form").on('submit', function(e){
        e.preventDefault();
        var modal = $(this).parents('.modal');
        var form = $(this);         
        $(this).ajaxSubmit({  
            url: "/ajax.php?file="+$(form).data('file'),
            data: $(form).serialize(),
            dataType: "JSON",
            type: "POST",
            success: function(data){
                if(data.done) {
      $(modal).find('.modal-result').html(data.message);
      $(modal).find('.modal-result').show('fast')
      setTimeout("$('.modal-result').hide('fast')",1500);

      setTimeout("$('.modal').hide()",2000);
                  setTimeout("$('#overlay').hide()",2000);
      var f=$(modal).find('.modal-content-copy');
      var t=$(modal).find('.modal-content');
                  setTimeout("$('.modal').find('input, textarea').val('')",3000);
      
                } else {
                    $(modal).find('.modal-errors').html(data.message);
    $(modal).find('.modal-errors').show('fast')
    setTimeout("$('.modal-errors').hide('fast')",1000);
                    $(modal).children(".spinner").hide();
                }
            },
            complete: function(){
                $(modal).children(".spinner").hide();                     
            }
        });
        return false;
    });