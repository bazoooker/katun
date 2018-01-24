// sa script
$(document).ready(function(){  
    $('.section-tabs .section-tabs__tabs ul li').click(function(){
        $('.section-tabs .section-tabs__tabs ul li.active').removeClass('active');
        $(this).addClass('active');
        console.log($(this));
        var index= $(this).index();
        $('.section-tabs__content .slide').each(function(i,elem) {
         if (i==index) {
            elem.style.display = 'block';
    } else {
       elem.style.display = 'none';
       console.log(elem);
    }
    // if () {}
});
        // section-tabs__content
        // $( ".slide.slide_food" ).eq(index);
        console.log($(this).index());
    });
});
// sa end script

// $('.section-tabs .section-tabs__tabs li').click(function(){
//     $(this).parent().find('li.active').removeClass('active');
//     $(this).addClass('active');
//     //
//     $(this).parent().parent().parent().find('.section-tabs__content .slide').hide();
//     $(this).parent().parent().parent().find('.section-tabs__content .slide').eq($(this).parent().find('li').index('.active')).show();
        
// });




// табы
// function tabSwitch(tabName, slideNumber) {
//     console.log('function tabSwitch');
//     var slidesList = document.querySelectorAll('.slide_'+tabName);
//     console.log(slidesList); 
//     console.log('collection of slides done'); 

//     for (var i = 0; i < slidesList.length; i++) {          
//         $(slidesList[i]).fadeOut(0);            
//     }
//     console.log('all slides are removed');

//     var curSlide = document.getElementById('slide_'+tabName+'-'+slideNumber);
//     console.log('get the slide to show');  

//     curSlide.classList.remove('hidden');
//     console.log('remove its class .hidden'); 
               
//     $(curSlide).fadeIn(200);             
//     console.log('fade it in');            

//     var allTabs = document.querySelectorAll('.tab_'+tabName);
//     console.log('collection of tabs');  

//     for (var i = 0; i < allTabs.length; i++) {          
//         $(allTabs[i]).removeClass('active');            
//     }
//     console.log('remove .active from all tabs');  

//     var target = event.target;
//     target.classList.add('active');
//     console.log('нажатому табу добавлен класс .active');  
// };



/* МОДАЛЬНЫЕ ОКНА */
$(document).ready(function(){   
$('.tab.tab_food').click(function(e){
    // alert('asdsad');
    $(".tab.tab_food.active").removeClass('active');
    $(this).addClass('active');
})

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