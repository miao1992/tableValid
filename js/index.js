$(function(){
    value=window.devicePixelRatio;
     //三级联动实现
    threeLinked("#province","#city","#country");
    threeLinked("#province-home","#city-home","#country-home");
    // 表单验证初始化
    $("#form-user").Validform({
        tiptype:3,
        btnSubmit:"#btn-save",
        btnReset:"#btn-reset",
        datatype:{
            "idcard":function isCardNum(card){
                var pattern=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                return pattern.test(card)
            },
            "name":function isName(name){
                var pattern=/((\D){3,20})|([\u4e00-\u9fa5])/;
                return pattern.test(name)
            }  
        }
    })
    // 服用过的药品添加功能的实现
    var medicineContent="";
    $("#addhistory").on("click",function(){

        var medicineName=$("#medicine-name").val(),medicineJl=$("#medicine-jl").val(),medicineJlD=$("#medicine-jl-d").val();
        var medicineTime=$("#medicine-time").val(),medicineTimeD=$("#medicine-time-d").val();

        if($("#list td").hasClass(medicineName)){
            alert("该药品已经存在，不能重复添加！");
            $("#medicine-jl").val("");$("#medicine-time").val("")
        }
        else if(medicineJl==""){
            alert("请填写计量")
        }else if( medicineTime==""){
            alert("请填写服用时间")
        }else{
            medicineContent+="<tr><td><input type='checkbox'></td><td class='"+medicineName+"'>"+medicineName+"</td><td class=\"medicine-jl\">"+medicineJl+medicineJlD+"</td><td class=\"medicine-time\">"+medicineTime+medicineTimeD+"</td></tr>";
            $("#list").html(medicineContent);
        $("#medicine-jl").val("");$("#medicine-time").val("")
         }

          // 为添加药品的每个checkbox添加点击事件 
        singleCheck("#list input[type='checkbox']","#all-select");
    })
    // 删除功能调用
        delMedicine("#delhistory","#all-select","#list");
        delMedicine("#delnew","#all-new-select","#list-new");
        //全选按钮的调用
        checkAll("#all-select","#list input[type='checkbox']");
        checkAll("#all-new-select","#list-new input[type='checkbox']");


            //按医嘱服药部分添加功能的实现
    var medicineNewContent="";
    $("#addnew").on("click",function(){
        var medicineNewName=$("#medicine-new-name").val(),medicineNewJl=$("#medicine-new-jl").val(),medicineNewJlD=$("#medicine-new-jl-d").val();
        if($("#list-new td").hasClass(medicineNewName)){
            alert("该药品已经存在，不能重复添加！");
            $("#medicine-new-jl").val("")
        }else if(medicineNewJl==""){
            alert("请填写计量")
        }else{
            medicineNewContent+="<tr><td><input type='checkbox'></td><td class='"+medicineNewName+"'>"+medicineNewName+"</td><td class=\"medicine-jl\">"+medicineNewJl+medicineNewJlD+"</td></tr>";
            $("#list-new").html(medicineNewContent);
        $("#medicine-new-jl").val("");
         }

        //为添加药品的每个checkbox添加点击事件
        singleCheck("#list-new input[type='checkbox']","#all-new-select");

     })

    //发病次数，按月发病或者按年发病被选中时，显示提示信息
        $(".fbtimes").on("change",function(){
            if($("#times-1").get(0).checked){
                $(".attack-t-info").show();
            }else if($("#times-2").get(0).checked){
                $(".attack-t-info").show();
            }else{
                $(".attack-t-info").hide();
            }
        })
        //封装药品下面的checkbox单个添加点击功能
        function singleCheck(ele,allele){
            //ele为药品下面的所有checkbox的集合
            //allele为相对应的全选按钮
            $(ele).on("click",function(){
                var checkboxs=$(ele);
                var checkeds=ele+":checked";
                var checkboxsc=$(checkeds);
                if(checkboxsc.length==checkboxs.length){
                    $(allele).get(0).checked=true;
                }else{
                    $(allele).get(0).checked=false;
                }
            }) 
        }
        //封装全选按钮的功能
        function checkAll(ele,eles){
            //ele为全选按钮的id
            //eles为全部的checkbox的集合
           $(ele).on("click",function(){
                var _this=this;
                $(eles).each(function(index,value){
                    value.checked=_this.checked;
                })
            }) 
        }
})

// 封装删除药品功能
        function delMedicine(ele,allele,newlist){
            //ele为删除按钮，allele为全选按钮
            $(ele).on("click",function(){
                var flagall=$(allele).get(0).checked,flag;
                var str=newlist+" input[type='checkbox']";
                $(str).each(function(index,value){
                    if(value.checked==false){
                        flag=false;
                    }
                 }) 
               if(flagall){
                    var delall=confirm("确认要全部删除吗?");
                    if(delall){
                        var html="<tr id=\"noData\"><td colspan=\"5\">暂时没有数据</td></tr>";
                        $(newlist).html(html);
                        $(allele).get(0).checked=false;
                    }   
               }else if(!flag){
                    var dels=confirm("确认要删除吗?");
                    if(dels){
                        $(str).each(function(index,value){
                            if(value.checked){
                                $(this).parent().parent().remove();
                            }
                        })
                    }
               }else{
                alert("请先选择一项在进行删除")
               }
            })
        } 

 //封装三级联动的函数
    function threeLinked(Parentele,Childele,Grandsonele){
        var html = "<option value=\"请选择\">请选择</option>";
        for(var i = 0;i<provinceJson.length;i++){
            html += "<option value='"+provinceJson[i].id+"'>"+provinceJson[i].province+"</option>"
        }
        $(Parentele).html(html);
        $(Parentele).on("change",function(){
            var val=$(this).val();
            var html = "<option value=\"请选择\">请选择</option>";
            for(var i = 0;i<cityJson.length;i++){
                if(cityJson[i].parent == val || val == cityJson[i].id){
                    html+="<option value='"+cityJson[i].id+"'>"+cityJson[i].city+"</option>"
                }
            }
            $(Childele).html(html);
            $(Grandsonele).html("<option value=\"请选择\">请选择</option>");
        });
        $(Childele).on("change",function(){
            var val=$(this).val();
            var html = "<option value=\"请选择\">请选择</option>";
            for(var i = 0;i<countyJson.length;i++){
                if(countyJson[i].parent==val){
                    html+="<option value='"+countyJson[i].id+"'>"+countyJson[i].county+"</option>"
                }
            }
            $(Grandsonele).html(html)
        });
    }