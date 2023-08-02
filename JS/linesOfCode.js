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

class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}

const keysArray = Array.from(langMap.keys());

const loadLang = () => {
  console.log("loadLang");
  let randIndex = Math.floor(Math.random() * keysArray.length);
  while (keysArray[randIndex] == document.getElementById("codeLang").innerHTML) {
    randIndex = Math.floor(Math.random() * keysArray.length);
  }
  let bytes = langMap.get(keysArray[randIndex]);
  let updateVals = [0, 1, 2, 3, 4, 5, 7, 9]
  // For ease out, start fast end slow
  // let fullBytes = bytes;
  // let decrement = 1;
  // while (fullBytes >= 10) {
  //   updateVals.push(fullBytes);
  //   fullBytes -= decrement;
  //   decrement += 1 //(Math.round(bytes/5000));
  // }
  // For ease in out, start slow end slow
  updateValsRight = [bytes-8, bytes-6, bytes-4, bytes-3, bytes-2, bytes-1, bytes];
  let fullBytesLeft = 11;
  let fullBytesRight = bytes-10;
  let delta = 1;
  while (fullBytesLeft < fullBytesRight) {
    updateVals.push(fullBytesLeft);
    updateValsRight.unshift(fullBytesRight);
    fullBytesLeft += delta;
    fullBytesRight -= delta;
    delta += 1;
  }
  updateVals = updateVals.concat(updateValsRight).reverse();
  console.log(updateVals)
  let time = 1.5;
  let exp = 3;
  let extraWait = 0;
  for (let num=0; num<bytes+1; num++) {
    if (num==updateVals[updateVals.length-1]) {
      updateVals.pop();
      if (updateVals.length < 20) extraWait += (20 - (updateVals.length))*7;
      setTimeout(function() {
        document.getElementById("bytesOfCode").innerHTML = num.toLocaleString();
        console.log((Math.pow(2, exp-1)*time*(Math.pow((num/bytes)-0.5, exp)) + time/2)*1000 + extraWait, num);
      // }, 0);
      // }, (4*(1/(1+Math.exp(-5*((num-0.0054)/bytes))))-1.973)*1000); sigmoid function, start slow go fast
      // }, 2*Math.pow((num/bytes), 3)*1000); quadratic function, start fast go slow
      // }, (-time*Math.pow(1-(Math.pow((num/bytes), 2)), 0.5)+time)*1000); curve of oval, start fast end slow
      }, (Math.pow(2, exp-1)*time*(Math.pow((num/bytes)-0.5, exp)) + time/2)*1000 + extraWait); // cubic function, ease in out
    }
  }
  // setTimeout(() => {
  //   console.log("STARTING SECOND LOOP")
  //   for (let num=bytes-99; num<bytes+1; num++) {
  //     setTimeout(function() {
  //       document.getElementById("bytesOfCode").innerHTML = num.toLocaleString();
  //       console.log(2*Math.pow((num/bytes), 2)*1000);
  //     }, 2*Math.pow((num/bytes), 3)*1000);
  //   }
  // }, 2)
  document.getElementById("codeLang").innerHTML = keysArray[randIndex];
}

let classWatcher = new ClassWatcher(document.getElementById("personal-proj"), "full-bar", () => {
  loadLang();
})

if (document.getElementById("personal-proj").classList.contains("full-bar")) {
  loadLang();
}

document.getElementById("die-btn0").addEventListener("click", function(event) {
    let dieElement = event.currentTarget.firstChild;
    if (dieElement.classList.contains("animate")) return;
    dieElement.classList.add("animate");
    loadLang();
    setTimeout(function() {
        dieElement.classList.remove("animate");
    }
    , 2000);
});