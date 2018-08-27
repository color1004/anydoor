<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{{title}}</title>
        <style>
            body {
                margin: 30px;
            }
            a {
                display: block;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        {{#each files}}
            <a href="{{../dir}}/{{file}}">【{{icon}}】 {{file}}</a>
        {{/each}}
    </body>
</html>