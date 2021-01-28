import { Tooltip, Toast, Popover } from "bootstrap";
import "../sass/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./routes";
import PageList from "./PageList";

let pageArgument;
const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  console.log("===PageArg===", pageArgument);
  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

//My code
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  let query = form[0].value.split(" ").join("-");
  form.action = "#pagedetail/" + query;
});

const select = document.querySelector("select");

const getOption = () => {
  const url = "https://api.rawg.io/api/platforms";
  console.log("hello");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((platform) => {
        console.log(platform.name);
        const option = document.createElement("option");
        option.text = platform.name;
        option.value = platform.id;
        select.add(option);
      });
    });
};

getOption();
select.addEventListener("change", (event) => {
  //https://api.rawg.io/api/games?platforms=4
  let query = event.target.value;
  query = "#pagelist/" + query;
  console.log(query);
  // let a = window.location.toString().split("#");
  // window.location = a[0] + query;
  PageList(event.target.value, 1);
});
