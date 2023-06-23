function randRangeInt(min, max) { //Inclusive, can return min or max
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randRangeDec(min, max, precision) { //Can return min up to but not including max
    return Math.floor((10**precision)*(Math.random()*(max-min)+min))/(10**precision);
}

// function generateAnimation(frames, size) {
//     let res = [];
//     for (let i=0; i<frames; i++) res.push(size*(3*(1-(i/frames))*Math.pow(i/frames, 2)+Math.pow(i/frames, 3)) + "%"); //Generates size multiplier for ease function
//     return [...res, ...new Array(Math.floor(frames/10)).fill(size + "%"), ...res.reverse()]; //Leaves a little time at max size
// }

const skillsNum = 33; // Hard code the number of skills here

class SkillImage {
    constructor(name, src) {
        SkillImage.skillConfidenceRank = (SkillImage.skillConfidenceRank || 0) + 1; //Can't do 0 indexing because then the or statement will always put out -1
        this.el = document.createElement("img");
        this.el.id = name;
        this.el.classList.add("skill-img");
        this.el.alt = name + " logo";
        this.el.src = src;
        this.name = name;
        this.confidenceRank = SkillImage.skillConfidenceRank - 1;
        this.position;
        this.size = Math.ceil(80 - (60/skillsNum)*this.confidenceRank); // equally divides the range of 20-80 based on confidence, 
        this.el.style.height = "0%";
    }

    animate(animationSpeed, animationSmoothness) { //Smoothness is the number of sample points in the cubic
        let easeArray = generateAnimation(animationSmoothness, this.size);
        let animationIndex = 0;
        let animation = setInterval(function(obj) {
            obj.el.style.height = easeArray[animationIndex];
            animationIndex++;
            if (animationIndex>2*animationSmoothness+3) clearInterval(animation)
        }, animationSpeed, this) //Using this inside of setInterval is referring to the window not the parent object
    }
}

let skillsArr = []
skillsArr.push(new SkillImage("C++ logo", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"));
skillsArr.push(new SkillImage("Python", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png"));
skillsArr.push(new SkillImage("vsCode", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png"));
skillsArr.push(new SkillImage("Git", "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"));
skillsArr.push(new SkillImage("Javascript", "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"));
skillsArr.push(new SkillImage("Go", "https://cdn.worldvectorlogo.com/logos/gopher.svg"));
skillsArr.push(new SkillImage("HTML", "https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png"));
skillsArr.push(new SkillImage("CSS", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png"));
skillsArr.push(new SkillImage("Typescript", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"))
skillsArr.push(new SkillImage("Bootstrap", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png"));
skillsArr.push(new SkillImage("Visual-Studio", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Visual_Studio_Icon_2019.svg/1200px-Visual_Studio_Icon_2019.svg.png"));
skillsArr.push(new SkillImage("Java", "http://assets.stickpng.com/images/58480979cef1014c0b5e4901.png"));
skillsArr.push(new SkillImage("React", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"));
skillsArr.push(new SkillImage("Eclipse", "https://cdn.freebiesupply.com/logos/large/2x/eclipse-11-logo-png-transparent.png"));
skillsArr.push(new SkillImage("Node.js", "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"));
skillsArr.push(new SkillImage("Vite", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png"));
skillsArr.push(new SkillImage("Linux", "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"));
skillsArr.push(new SkillImage("Vue", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"));
skillsArr.push(new SkillImage("Gin", "https://raw.githubusercontent.com/gin-gonic/logo/master/color.png"))
skillsArr.push(new SkillImage("Angular", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png"));
skillsArr.push(new SkillImage("Postman", "https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8"));
skillsArr.push(new SkillImage("Powershell", "https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png"));
skillsArr.push(new SkillImage("Swagger", "https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png"));
skillsArr.push(new SkillImage("ActiveMQ", "https://activemq.apache.org/assets/img/activemq_logo_icon.png"));
skillsArr.push(new SkillImage("Burp-Suite", "../Resources/burp-suite-professional.svg"));
skillsArr.push(new SkillImage(".NET", "https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg"))
skillsArr.push(new SkillImage("MATLAB", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/667px-Matlab_Logo.png"));
skillsArr.push(new SkillImage("C#", "https://pluralsight.imgix.net/paths/path-icons/csharp-e7b8fcd4ce.png"));
skillsArr.push(new SkillImage("Docker", "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"));
skillsArr.push(new SkillImage("Microsoft-SQL-Server", "https://www.sqlservertutorial.net/wp-content/uploads/sql-server-tutorial.svg"));
skillsArr.push(new SkillImage("Sass", "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"));
skillsArr.push(new SkillImage("jQuery", "https://seeklogo.com/images/J/jquery-logo-CFE6ECE363-seeklogo.com.png"));
skillsArr.push(new SkillImage("MS-Azure", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png"));

// for (var i=0; i<skillsArr.length; i++) {
//     console.log(skillsArr[i].name + skillsArr[i].confidenceRank);
//     document.getElementById("skills-container").appendChild(skillsArr[i].el);
//     console.log(parseInt(getComputedStyle(skillsArr[i].el).height) + " " + parseInt(getComputedStyle(skillsArr[i].el).width))
// }

let totalSkills = skillsArr.length;
// console.log(parseInt(getComputedStyle(document.getElementById("skills-container")).height))

let loadedGraphics = [];
let intersect = false;
let possibleCoordinate;
let possibleImage;
let curWindowHeight;

let renderSpeed = 10;
const skillGraphicLoader = setInterval(function() {
    if (loadedGraphics.length<totalSkills) {
        // console.log(loadedGraphics);
        curWindowHeight = parseInt(getComputedStyle(document.getElementById("skills-container")).height); // For intersection checking
        intersect = false;
        do {possibleImage = skillsArr[Math.floor(totalSkills*Math.pow(Math.random(), 3))]} //randomly (weighted towards more confident skills) selects an image to add 
        while (loadedGraphics.indexOf(possibleImage)!=-1); //stops from trying to add images that are already on the graphic
        possibleCoordinate = [randRangeInt(1, parseInt(getComputedStyle(document.getElementById("skills-container")).width)-(0.01*possibleImage.size*curWindowHeight)), randRangeInt(1, parseInt(getComputedStyle(document.getElementById("skills-container")).height)-(0.01*possibleImage.size*curWindowHeight))]; //finding a coordinate to place the image that won't put it outside the boundaries
        // imgSizePx = (loadedGraphics.length>0) ? (parseInt(getComputedStyle(loadedGraphics[0].el).height)) : 0; 
        for (let i=0; i<loadedGraphics.length; i++) { 
            if ((possibleCoordinate[0]-loadedGraphics[i].position[0] > -(0.01*possibleImage.size*curWindowHeight+20) && possibleCoordinate[0]-loadedGraphics[i].position[0] < (0.01*loadedGraphics[i].size*curWindowHeight+20)) //adding 20px margin of error for intersection
             && (possibleCoordinate[1]-loadedGraphics[i].position[1] > -(0.01*possibleImage.size*curWindowHeight+20) && possibleCoordinate[1]-loadedGraphics[i].position[1] < (0.01*loadedGraphics[i].size*curWindowHeight+20))) { //Checking for intersections of width or height
                intersect = true;
                // console.log("INTERSECT");
                break;
            }
        }
        if (!intersect) {
            possibleImage.position = possibleCoordinate;
            document.getElementById("skills-container").appendChild(possibleImage.el);
            loadedGraphics.push(possibleImage);
            // possibleImage.el.style.left = possibleCoordinate[0] + "px" + (possibleImage.size*0.01*curWindowHeight); //Adjusting for centered scaling 
            // possibleImage.el.style.bottom = possibleCoordinate[1] + "px" + (possibleImage.size*0.01*curWindowHeight);
            randSpeed = 10000 + (totalSkills-possibleImage.confidenceRank)*(10000/totalSkills) + randRangeInt(-2000, 2000);
            // console.log(possibleImage.name, randSpeed);
            // possibleImage.animate(randSpeed, 100);
            possibleImage.el.animate(
                [ { easing: 'ease-out', height: "0%", left: possibleCoordinate[0] + (possibleImage.size*0.01*curWindowHeight)/2 + "px", bottom: possibleCoordinate[1] + (possibleImage.size*0.01*curWindowHeight)/2 + "px", opacity:0 },
                  { easing: 'ease-out', height: possibleImage.size + "%", left: possibleCoordinate[0] + "px", bottom: possibleCoordinate[1] + "px", opacity: 1 },
                  { easing: 'ease-in', height: possibleImage.size + "%", left: possibleCoordinate[0] + "px", bottom: possibleCoordinate[1] + "px", opacity: 1 },
                  { easing: 'ease-in', height: "0%", left: possibleCoordinate[0] + (possibleImage.size*0.01*curWindowHeight)/2 + "px", bottom: possibleCoordinate[1] + (possibleImage.size*0.01*curWindowHeight)/2 + "px", opacity: 0 } ],
                randSpeed);
            const removeFromArr = setTimeout(function(image) {
                // console.log(loadedGraphics.map(i => i.name))
                loadedGraphics.splice(loadedGraphics.indexOf(image), 1);
            }, randSpeed + 1000, possibleImage)
        }
    }
}, renderSpeed)