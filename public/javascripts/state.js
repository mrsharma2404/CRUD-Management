$(document).ready(function(){

    $.getJSON("/statecity/fetchdata",function(data){

     $.each(data,function(index,item){
     $('#state').append($('<option>').text(item.statename).val(item.idstate))

     })

    })

   $('#state').change(function(){

    $.getJSON("/statecity/fetchcity",{idstate:$('#state').val()},function(data){
        $('#city').empty()
        $('#city').append($('<option>').text("-Select-")) 
        $.each(data,function(index,item){
        $('#city').append($('<option>').text(item.cityname).val(item.idcity))
   
        })
   
       })
   



   })


})