const axios = require("axios");
const app = require("express")();

const port = process.env.PORT || 3000;

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.get("/", (_, response) => response.render("index", { partial: "./partials/nav" }));

app.get("/:count/news/for/:category/:subcategory?", (request, response) => {
    const options = {
        method: "get",
        url: `https://api.rss2json.com/v1/api.json?rss_url=https://www.vedomosti.ru/rss/rubric/${request.params.category}/${request.params.subcategory || ""}`
    }

    axios(options)
        .then((res) => {
            let title = res.data.feed.title.split(". ")[1] + " :";
            let data = res.data.items.slice(0, request.params.count);
            response.render("index", { partial: "./partials/new", title, data })
        })
        .catch((error) => {
            console.log(error);
            response.send("<h1>Чет ошибка поймаль</h1>");
        })
});

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.get("/", (_, response) => response.render("index", { partial: "./partials/nav" }));

app.get("/:count/news/for/:category/:subcategory?", (request, response) => {
    const options = {
        method: "get",
        url: `https://api.rss2json.com/v1/api.json?rss_url=https://www.vedomosti.ru/rss/rubric/${request.params.category}/${request.params.subcategory || ""}`
    }

    axios(options)
        .then((res) => {
            let title = res.data.feed.title.split(". ")[1] + " :";
            let data = res.data.items.slice(0, request.params.count);
            response.render("index", { partial: "./partials/new", title, data })
        })
        .catch((error) => {
            console.log(error);
            response.send("<h1>Чет ошибка поймаль</h1>");
        })
});

app.listen(port);