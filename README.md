# cleaning-manual
sample

/*
Theme Name: Hotel Room Manual
Theme URI: https://example.com
Author: ChatGPT
Description: Hotel Manual Theme
Version:1.0
*/

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{

background:#edf2f7;

font-family:
"Yu Gothic",
"Hiragino Kaku Gothic ProN",
sans-serif;

color:#222;

}

a{

text-decoration:none;

color:inherit;

}

img{

max-width:100%;

display:block;

}

.wrapper{

max-width:1300px;

margin:auto;

display:flex;

min-height:100vh;

}

.content{

flex:1;

padding:30px;

}

.card{

background:white;

border-radius:15px;

padding:20px;

margin-bottom:25px;

box-shadow:
0 5px 15px rgba(0,0,0,.08);

}

.button{

display:inline-block;

background:#183153;

color:white;

padding:12px 20px;

border-radius:10px;

transition:.2s;

}

.button:hover{

background:#29548d;

}

@media(max-width:768px){

.wrapper{

display:block;

}

.content{

padding:15px;

}

}