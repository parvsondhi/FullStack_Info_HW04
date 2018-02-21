// Credits to adrian_gheorghe
// https://code.sololearn.com/Wj7ZWBg5m2OG/#html


// Initial timeout function for load effect, only worked nice on my screen.
// setTimeout(function(){
//     $('.main_sect').css({ "display": "inline-block"});
//     $('#SearchSect').css({ "display": "block"});
//     $('header').css({ "display": "block"});
//     //do what you need here
// }, 2500);

// geting canvas by id c
var c = document.getElementById("c");
var ctx = c.getContext("2d");
//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;
//chinese characters - taken from the unicode charset
// English matrix
// var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
// Greek matrix
var matrix = "ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσΤτΥυΦφΧχΨψΩω123456789#$%^&*()*&^%";
// Russian matrix
// var matrix = "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя123456789#$%^&*()*&^%";

//converting the string into an array of single characters
matrix = matrix.split("");
var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 
//drawing the characters
function draw()
{
    
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#55c181"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for( var i = 0; i < drops.length; i++ )
    {
        //a random chinese character to print
        var text = matrix[ Math.floor( Math.random() * matrix.length ) ];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if( drops[i] * font_size > c.height && Math.random() > 0.975 ){
            drops[i] = 0;

            // If the drops have reached the bottom, change the CSS for load effect
            var check = 0;
            if( check == 0){
                $('.main_sect').css({ "display": "inline-block"});
                $('#SearchSect').css({ "display": "block"});
                $('header').css({ "display": "block"});
                check++
            }
        }
        //incrementing Y coordinate
        drops[i]++;
    }
}
setInterval( draw, 45 );
// document.body.style.background = 'url(' + c.toDataURL() + ')';