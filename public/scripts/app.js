$(document).ready(function(){
    $('.ui.checkbox').checkbox();
});

$('.modal-pop[data-modal]').click(function() {
    $('.modal[data-modal=' + $(this).attr('data-modal') + ']').modal().modal('show');
});

$(document).on("click", "#signOut", function(event){
    alert( "GO" ); 
});