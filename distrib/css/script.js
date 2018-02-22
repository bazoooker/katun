// sa script
$(document).ready(function(){ 
// переключалка табов 
    $('.section-tabs .section-tabs__tabs ul li').click(function(){
        $(this).parent().find('li.active').removeClass('active');
        $(this).addClass('active');
        var index= $(this).index();
        // перебор li
        $(this).parent().parent().parent().find('.slide').each(function(i,elem) {
             if (i==index) {
                elem.style.display = 'block';
            } else {
               elem.style.display = 'none';
            }
        });       
    });
    // мини табы
    // обьявление масив li
    var li_name=[];
    // сборка li
     $('.section-tabs .section-tabs__tabs').each(function(i,elem) {
        console.log(elem.getAttribute('class'));
    
    $(elem[i]).each(function(i,elem) {
        li_name[i]=elem.innerHTML;
    });  
    // обьявление контента
    var content=[];
    // сборка контента    
    $('.section-tabs__content .slide').each(function(i,elem) {
         content[i]=elem.innerHTML;
    });       
    var structur_dom='<ul class="cd-accordion-menu">';  
    for (var i = 0; i < li_name.length; i++) {
        // делаем пустышку пустышкой
        if (content[i]==undefined) {
            content[i]=' ';
        }
        structur_dom=structur_dom+'<li rel='+i+' class="has-children"><label class="group-1">'+li_name[i]+'</label><div style="display:none;" class="slide_children">'+content[i]+'</div></li>';
    }
    structur_dom=structur_dom+'</ul>';
    // вывод структуры mini_tab
     $('.section-tabs__tabs').append("<div id='mini_tab'>"+structur_dom+"</div>");
     });
     // логика мини табы
     $('#mini_tab ul.cd-accordion-menu .has-children').click(function(){
        if ($(this).attr('class')=='has-children active') {
            $(this).children('.slide_children').hide();
            $(this).removeClass('active');
        }else{
            $('.slide_children').hide();
            $('#mini_tab ul.cd-accordion-menu .has-children.active').removeClass('active');        
            $(this).addClass('active');
            $(this).children('.slide_children').show();
        }
       
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



// swiper

// листалка номеров
var names=['Стандарт','Комфорт','Престиж','Семейный','Студия','Джуниор сюит','Апартаменты'];

var swiper = new Swiper('.accommodation-swiper', {
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 0,
    // nextEl: '.swiper-button-next',
    // prevEl: '.swiper-button-prev',
    pagination: {
        el: '.accommodation-swiper__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return ' <li class="accommodation-pagination-link ' + className + ' "> ' + (names[index]) + '</li>';
        },
      },
});


// листалка с параллаксом
var swiper = new Swiper('.swiper-container-parallax', {
      speed: 600,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next_caret',
        prevEl: '.swiper-button-next_caret',
      },
    });

// дефолтная листалка
var swiper = new Swiper('.swiper-container', {
    // Default parameters
    slidesPerView: 5,
    spaceBetween: 40,
    loop: true,
    navigation: {
    nextEl: '.swiper-button-next_caret',
    prevEl: '.swiper-button-prev_caret',
    },

    breakpoints: {
        449: {
          slidesPerView: 1,
          spaceBetween: 0
        },                  

        600: {
          slidesPerView: 2,
          spaceBetween: 0
        },

        800: {
          slidesPerView: 3,
          spaceBetween: 0
        },

        1100: {
          slidesPerView: 4,
          spaceBetween: 0
        }
      }
    });    

var swiper = new Swiper('.swiper-container-multiple', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });