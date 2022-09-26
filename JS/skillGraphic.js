function randRangeInt(min, max) { //Inclusive, can return min or max
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randRangeDec(min, max, precision) { //Can return min up to but not including max
    return Math.floor((10**precision)*(Math.random()*(max-min)+min))/(10**precision);
}

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
        this.size = Math.ceil(80 - (61/23)*this.confidenceRank); // equally divides the range of 20-80 based on confidence, 
        this.el.style.height = this.size + "%";
    }
}

let skillsArr = []
skillsArr.push(new SkillImage("C++ logo", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"));
skillsArr.push(new SkillImage("Python", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png"));
skillsArr.push(new SkillImage("vsCode", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png"));
skillsArr.push(new SkillImage("Javascript", "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"));
skillsArr.push(new SkillImage("HTML", "https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png"));
skillsArr.push(new SkillImage("CSS", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png"));
skillsArr.push(new SkillImage("Visual-Studio", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Visual_Studio_Icon_2019.svg/1200px-Visual_Studio_Icon_2019.svg.png"));
skillsArr.push(new SkillImage("Git", "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"));
skillsArr.push(new SkillImage("Java", "http://assets.stickpng.com/images/58480979cef1014c0b5e4901.png"));
skillsArr.push(new SkillImage("Powershell", "https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png"));
skillsArr.push(new SkillImage("Burp-Suite", "../Resources/burp-suite-professional.svg"));
skillsArr.push(new SkillImage("Eclipse", "https://cdn.freebiesupply.com/logos/large/2x/eclipse-11-logo-png-transparent.png"));
skillsArr.push(new SkillImage("MATLAB", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/667px-Matlab_Logo.png"));
skillsArr.push(new SkillImage("Bootstrap", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png"));
skillsArr.push(new SkillImage("C#", "https://pluralsight.imgix.net/paths/path-icons/csharp-e7b8fcd4ce.png"));
skillsArr.push(new SkillImage("Microsoft-SQL-Server", "https://www.sqlservertutorial.net/wp-content/uploads/sql-server-tutorial.svg"));
skillsArr.push(new SkillImage("Sass", "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"));
skillsArr.push(new SkillImage("jQuery", "https://seeklogo.com/images/J/jquery-logo-CFE6ECE363-seeklogo.com.png"));
skillsArr.push(new SkillImage("React", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"));
skillsArr.push(new SkillImage("Postman", "https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8"));
skillsArr.push(new SkillImage("Swagger", "https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png"));
skillsArr.push(new SkillImage("Angular", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png"));
skillsArr.push(new SkillImage("MS-Azure", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png"));

// for (var i=0; i<skillsArr.length; i++) {
//     console.log(skillsArr[i].name + skillsArr[i].confidenceRank);
//     document.getElementById("skills-container").appendChild(skillsArr[i].el);
//     console.log(parseInt(getComputedStyle(skillsArr[i].el).height) + " " + parseInt(getComputedStyle(skillsArr[i].el).width))
// }

let totalSkills = skillsArr.length;
console.log(parseInt(getComputedStyle(document.getElementById("skills-container")).height))

let loadedGraphics = [];
let intersect = false;
let possibleCoordinate;
let possibleImage;
let curWindowHeight;

let renderSpeed = 30;
const skillGraphicLoader = setInterval(function() {
    if (loadedGraphics.length<totalSkills) {
        console.log(loadedGraphics)
        curWindowHeight = parseInt(getComputedStyle(document.getElementById("skills-container")).height); // For intersection checking
        intersect = false;
        do {possibleImage = skillsArr[Math.floor(totalSkills*Math.pow(Math.random(), 3))]} //randomly (weighted towards more confident skills) selects an image to add 
        while (loadedGraphics.indexOf(possibleImage)!=-1); //stops from trying to add images that are already on the graphic
        possibleCoordinate = [randRangeInt(1, parseInt(getComputedStyle(document.getElementById("skills-container")).width)-(0.01*possibleImage.size*curWindowHeight)), randRangeInt(1, parseInt(getComputedStyle(document.getElementById("skills-container")).height)-(0.01*possibleImage.size*curWindowHeight))]; //finding a coordinate to place the image that won't put it outside the boundaries
        console.log(possibleCoordinate, possibleImage.name, possibleImage.confidenceRank); 
        // imgSizePx = (loadedGraphics.length>0) ? (parseInt(getComputedStyle(loadedGraphics[0].el).height)) : 0; 
        for (let i=0; i<loadedGraphics.length; i++) { 
            console.log("COLLISION DETECTION", possibleCoordinate[0], loadedGraphics[i].position[0], possibleImage.size, loadedGraphics[i].size); 
            if ((possibleCoordinate[0]-loadedGraphics[i].position[0] > -(0.01*possibleImage.size*curWindowHeight) && possibleCoordinate[0]-loadedGraphics[i].position[0] < (0.01*loadedGraphics[i].size*curWindowHeight))
             && (possibleCoordinate[1]-loadedGraphics[i].position[1] > -(0.01*possibleImage.size*curWindowHeight) && possibleCoordinate[1]-loadedGraphics[i].position[1] < (0.01*loadedGraphics[i].size*curWindowHeight))) { //Checking for intersections of width or height
                intersect = true;
                console.log("INTERSECT");
                break;
            }
        }
        if (!intersect) {
            possibleImage.position = possibleCoordinate;
            document.getElementById("skills-container").appendChild(possibleImage.el);
            loadedGraphics.push(possibleImage);
            possibleImage.el.style.left = possibleCoordinate[0] + "px";
            possibleImage.el.style.bottom = possibleCoordinate[1] + "px";
        }
    }
}, renderSpeed)