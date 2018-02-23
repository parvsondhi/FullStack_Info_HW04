$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        alert("new-item");
        // get input
        var user_input = $('#todo-item-input').val();

        // alert(user_input);
        $('#list_todo').prepend("<li> <button class='btn sm' id='do_switch'>-></button>" + user_input + "</li>");
        console.log($("#list_todo"));
        //clear input
        $('#todo-item-input').val('');
    })
);

$("#list_todo").on('click', "#do_switch", function() {
        // move from list_todo container to list_doing container
        $(this).html("<-");

        // get list item
        var doItem = $(this).parent()
        // add 'complete' button

        // add to top of doing container
        $("#list_doing").prepend(doItem);
});

$("#list_doing").on('click', "#do_switch", function() {
        // move back from list_doing container to list_todo container
        $(this).html("->")
        // get list item
        var redoItem = $(this).parent()
        // remove 'complete' button

        // place item at top of list_todo container
        $("#list_todo").prepend(redoItem);
        // console.log($(this).parent());
        // $("#list_todo").prepend("<li> <button> Move me! </button>" + redoItem + "</li>");
});

$("#list_doing").on('click', "#done_switch", function() {
        // move back from list_doing container to list_todo container
        $(this).html("complete!")
        // get list item
        var completedItem = $(this).parent()
        // remove "Add To To-Do" button

        // place item at top of done container
        $("#list_done").prepend(redoItem);
        // console.log($(this).parent());
        // $("#list_todo").prepend("<li> <button> Move me! </button>" + redoItem + "</li>");
});

$("#list_done").on('click', "#done_switch", function() {
        // move back from list_doing container to list_todo container
        $(this).html("do me again!")
        // place item at top of list_todo container
        var undoItem = $(this).parent()
        $("#list_doing").prepend(undoItem);
        // console.log($(this).parent());
        // $("#list_todo").prepend("<li> <button> Move me! </button>" + redoItem + "</li>");
});
