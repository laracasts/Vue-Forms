<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
         <div id="app">
            <ul>
                <li v-for="skill in skills" v-text="skill"></li>
            </ul>
             
         </div>

        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
         <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
         <script src="/js/app.js"></script>
     </body> 
</html>
