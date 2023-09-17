let targetObj
let moveAround
let MoveX
let MoveY
let ScrollY
$(document).ready(function () {
    const MoveDiv = $(".moveObj")

    //блок для функкций блоков
    let functions =$('<div>')
    functions.addClass('functions');
    const topHR = $('<hr>').addClass('topHR');
    const leftHR = $('<hr>').addClass('leftHR');
    const rightHR = $('<hr>').addClass('rightHR');
    const downHR = $('<hr>').addClass('downHR');
    const Btns = $('<div>').addClass('btns');
    const BtnDelete = $('<img>').addClass('delete')
    $(BtnDelete).attr("src", "imgs/other/IconDelete.png");
    const BtnEdit = $('<img>').addClass('edit')
    $(BtnEdit).attr("src", "imgs/other/IconEdit.png");
    $(Btns).append(BtnDelete, BtnEdit)
    $(functions).append(topHR, leftHR, rightHR, downHR, Btns);
    //блок для функкций блоков

    //присвоение блока каждому ребёнку тега main
    $('main').children().each( (index, element) => {
        let functionsBlock = $(functions).clone()
        if ($(element).attr("class").split(" ")[0] == "section"){
            $($(functionsBlock).find(".edit")).remove();
        }
        $(element).append(functionsBlock);
    });

    //убрать дефолтную работу кнопки для скачивания файла
    $(".downloadBtn a").click(function (e) { 
        e.preventDefault();
    });

    //слушатель для клонирования нужного обьекта в див для передвижения
    $(".previewsObjs > *").click(function (e) {
        e.preventDefault();
        let item = $(this).clone()
        $(MoveDiv).empty();
        $(MoveDiv).append(item);
    });

    //слушатель для передвижения обьекта в обьекта в див moveObj
    $("body").mousemove(function (e) { 
        // values: e.clientX, e.clientY, e.pageX, e.pageY
        if($(MoveDiv).children()[0]){
            let item = $(MoveDiv).children()[0];
            let width = $(item).width();
            let height = $(item).height();
            MoveX = e.clientX-width/2-$($(MoveDiv).children()[0]).css("padding-left").replace("px","");
            MoveY = e.clientY-height/2-$($(MoveDiv).children()[0]).css("padding-top").replace("px","");
            $(item).css("left", MoveX+"px");
            if(ScrollY){
                $(item).css("top", MoveY+ScrollY+"px");
            }else{
                $(item).css("top", MoveY+"px");
            }
            
        }
        
    });

    //слушатель для вставки элемента в нужный блок
    $("body").click(function () {
        if(targetObj && $(MoveDiv).children().length != 0){
            let item = $($(MoveDiv).children()[0]).clone();
            let PrimeClass = item.attr("class").split(" ")[0].charAt(0).toUpperCase() + item.attr("class").split(" ")[0].slice(1)
            item.removeClass("View"+PrimeClass)
            item.addClass("Changeable"+PrimeClass)
            $(item).css("left", 0);
            $(item).css("top", 0);
            $(item).css("position", "relative");

            let func = $(functions).clone()
            if($(item).attr("class").split(" ")[0] == "section"){
                $($(func).find(".edit")).remove();
            }
            addFunc(func, 10)
            $(item).append(func);
            if(moveAround){
                if(moveAround == "left" || moveAround == "top"){
                    $(item).insertBefore(targetObj);
                    targetObj = undefined
                    moveAround = undefined
                }else{
                    $(item).insertAfter(targetObj);
                    targetObj = undefined
                    moveAround = undefined
                }
            }else{
                $(targetObj).append(item);
            }
            if($(targetObj).children().length == 3){
                $(targetObj).find(">.placeholder").hide(0);
            }
            $(MoveDiv).empty();
        }
    });

    //слушатель для коректировки положения передвижаемого обьекта относительно скрола
    $(document).scroll(function (e) {
        ScrollY = $(document).scrollTop()
        if($(MoveDiv).children()[0]){
            let item = $(MoveDiv).children()[0];
            $(item).css("top", MoveY+ScrollY);
        }
    });
    addFunc(".functions", 10)
})

function addFunc (FuncBlock, width) {
    //прятоть детей функционального блока при его создании
    $(FuncBlock).children().each( (index, element) => {
        $(element).hide();
    });
    //проверка на див для вставки с последующим показом и скрытием всего функционалом
    $(FuncBlock).on('mouseenter', function(event) {
        if($($(this).parent()).attr("in") == "true") {
            targetObj = $(this).parent();
        }
        $(this).find('.leftHR, .rightHR').show(0).css('width', 0).animate({
            width: width+'px'
        }, {
            duration: 100, // Длительность анимации в миллисекундах
            easing: 'swing', // Функция анимации
            complete: function() {
                // Функция обратного вызова по завершении анимации
            }
        });
        $(this).find('.topHR, .downHR').show(0).css('height', 0).animate({
            height: width+'px'
        }, {
            duration: 100, // Длительность анимации в миллисекундах
            easing: 'swing', // Функция анимации
            complete: function() {
                // Функция обратного вызова по завершении анимации
            }
        });
        $(this).find('.btns').slideDown(200)
    });
    $(FuncBlock).on('mouseleave', function(event) {
        targetObj = undefined
        $(this).find('.leftHR, .rightHR').animate({
            width: 0
          },{
            duration: 100, // Длительность анимации в миллисекундах
            easing: 'swing', // Функция анимации
            complete: function() {
                $(this).hide(0)
            }
        });
        $(this).find('.topHR, .downHR').animate({
            height: 0
          },{
            duration: 100, // Длительность анимации в миллисекундах
            easing: 'swing', // Функция анимации
            complete: function() {
                $(this).hide(0)
            }
        });
        $(this).find('.btns').slideUp(200)
    });

    $(FuncBlock).find('.topHR, .downHR, .leftHR, .rightHR').on('click', function(event) {
        targetObj = $( $(this).parent()).parent();;
        moveAround = $(this).attr("class").replace("HR","")
    });
}