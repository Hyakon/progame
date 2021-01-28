const icon = (platform) => {
  const platforms = {
    pc: "windows",
    "nintendo-switch": "switch",
    linux: "linux",
    playstation4: "ps4",
    "xbox-one": "xbox",
    android: "mobile",
  };
  if (platforms[platform])
    return `<img class="icon" src="./src/images/logos/${platforms[platform]}.svg" alt=""/>`;
};
const fc = () => console.log("hello");
const PageList = (argument = "", option = 0) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument && !option) {
        finalURL = url + "?search=" + argument;
      } else if (argument && option === 1) {
        finalURL = url + "platforms=" + argument;
        console.log(finalURL);
      }

      const platforms = {
        pc: "windows",
        "nintendo-switch": "switch",
        linux: "linux",
        playstation4: "ps4",
        "xbox-one": "xbox",
        android: "mobile",
      };

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
                      <div class="cardGame">
                        <div class="cover">
                          <img src="${article.background_image}" alt="">
                        </div>
                        <h2>
                        <a href = "#pagedetail/${article.slug}">
                        ${article.name}
                        </a>
                        
                        </h2>
                        <logo>`;

            article.platforms.map((platform) => {
              console.log();
              if (platforms[platform.platform.slug]) {
                articles += `<img class="icon" src="./src/images/logos/${
                  platforms[platform.platform.slug]
                }.svg" alt=""/>`;
              }
            });

            articles += `
                        </logo>
                        <div class="info">
                        <h3>${article.released}</h3>
                        </div>
                      </div>
                    `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
          document.querySelector(
            ".page-list"
          ).innerHTML += `<button> Hello </button>`;
          document
            .querySelector(".page-list button")
            .addEventListener("click", fc);
        });
    };
    //ordering=released&
    fetchList("https://api.rawg.io/api/games?&page_size=9&", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
          <section class="page-list">
            <div class="articles">...loading</div>
          </section>
        `;

    preparePage();
  };

  render();
};
export default PageList;
