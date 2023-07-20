const request = new Request("https://api.github.com/users/b-cheek/repos");

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
    langMap = new Map();
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
