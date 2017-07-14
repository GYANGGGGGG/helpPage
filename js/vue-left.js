

    $.ajax({
        url:'/Api/PlatformHelp/help?type=student',
        data:'',
        type:'get',
        dataType:'json',
        async:false,
        success:function(result,status){
            console.log('请求成功..');  
            let mdExample ='';    
            mdExample = marked(result.data.content);
            $('.with-sidebar').html(mdExample);
        },
        error:function(status,error){
            console.log(status,error);
            console.log('请求失败..');
        }
    });


    //生成标题集合的方法
    var items = [];
    var interimObj = null;
    var fn = {
        'H2' : function (v) {
            if(interimObj){items.push(interimObj);}
            var obj = {
                headTitle : v,
                children : [],

            };
            interimObj = obj;
        },
        'H3' : function (v) {
            interimObj.children.push({
                headTitle : v,
                children : []
            });
        },
        // 'H3' : function (v) {
        //     interimObj.children[interimObj.children.length-1].children.push({
        //         headTitle : v
        //     });
        // }
    };
    //js动态生成左侧导航栏
    $('.content.with-sidebar').find('h2,h3').each(function () {
        // console.log(1);
        var name = $(this)[0].tagName;
        var v = $(this).html();
        fn[name](v);
    });
    items.push(interimObj);

    //该部分为更改后端图片路径
    $('.content.with-sidebar').find('img').each(function(){
       let path = '/Public/Teen/Classplatform/images/'+$(this).attr('src').substr(4);
       $(this).attr('src',path);
    })
        

    //vue模型渲染页面
    var menu_h = new Vue({
      el: '#all',
      data: {
        isOpen: false,
        items: items,
        mActiveName_h2 :'',
        mActiveName_h3 :''
      },
      methods:{
        menu_toggle:function(){
            this.isOpen = this.isOpen?false:true;
            // console.log(this.isOpen);
        },
        d_toggle:function(index){
            let $hIndex = $('.menu-root>li').eq(index);
            $hIndex.find('img').toggleClass('open');
            $hIndex.next().toggleClass('close')
        },
        selected: function(mActiveName_h2,mActiveName_h3) {
          this.mActiveName_h3 = mActiveName_h3;
          this.mActiveName_h2 = mActiveName_h2;
          (this.menu_toggle)();
        }
      }
    })

    //锚点定位测试用
    $('h2,h3').each(function(){
        $(this).attr('id',$(this).text())
    });
    //平滑定位锚位置

    $(".list li a").click(function() {
      $("body").animate({
        scrollTop: $($(this).attr("href")).offset().top + "px"
      },'slow');
      // return false;
    });

