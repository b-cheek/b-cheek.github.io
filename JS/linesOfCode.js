const token = "";
const url = "https://api.github.com/users/b-cheek/repos";
const headers = new Headers({
  "Authorization": `Bearer ${token}`
});
let langMap = new Map();
langMap.set("JavaScript", 406533);
langMap.set("CSS", 37456);
langMap.set("HTML", 23629);
langMap.set("Python", 276572);
langMap.set("Vue", 23234);
langMap.set("TypeScript", 4750);
langMap.set("C++", 2984);
langMap.set("C#", 84163);
langMap.set("Java", 302519);

const request = new Request(url, {
  method: "GET",
  // headers: headers
});

fetch(request)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    // console.debug(response);
    langMap = new Map(); // Reset map if request is successful
    for (let repo of response) {
      if (repo.owner.login === "b-cheek" &&
          repo.fork === false) {
        // console.log(repo.name);
        const langRequest = new Request(repo.languages_url);
        fetch(langRequest)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong on API server!");
                }
            })
            .then((response) => {
                // console.debug(response);
                for (let lang in response) {
                    // console.log(lang + ": " + response[lang]);
                    langMap.set(lang, (langMap.get(lang) || 0) + response[lang]);
                }
            })
      }
    }
    console.log(langMap);
  })
  .catch((error) => {
    console.error(error);
  });

console.log(langMap);
const keysArray = Array.from(langMap.keys());
let randIndex = Math.floor(Math.random() * keysArray.length);
let bytes = langMap.get(keysArray[randIndex]);
for (let num=0; num<bytes-2; num++) {
  if (num%(Math.round(bytes/100)) == 0 || num == bytes-1) {
    setTimeout(function() {
      document.getElementById("bytesOfCode").innerHTML = num.toLocaleString();
      console.log(2*Math.pow((num/bytes), 2)*1000);
    // }, 0);
    // }, (4*(1/(1+Math.exp(-5*((num-0.0054)/bytes))))-1.973)*1000); sigmoid function, start slow go fast
    }, 2*Math.pow((num/bytes), 3)*1000); // quadratic function, start fast go slow
  }
}

document.getElementById("codeLang").innerHTML = keysArray[randIndex];

