const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

inquirer.prompt([
    {
        message: "What is the name of the application?",
        name: "title"
    },
    {
        message: "Describe your application.",
        name: "description"
    },
    {
        name: "tableOfContents",
        message: "Write a table of contents (separate sections with commas.)"
    },
    {
        name: "installation",
        message: "Describe your applications installation process."
    },
    {
        message: "Brief application instructions.",
        name: "instructions"
    },
    {
        name: "license",
        message: "Your projects license."
    },
    {
        name: "contributors",
        message: "Add any contributors."
    },
    {
        name: "tests",
        message: "Tests of the application."
    },
    {
        type: "checkbox",
        message: "Programming languages used.",
        name: "languages",
        choices: [
            "HTML",
            "Javascript",
            "C/C++",
            "PHP",
            "Python",
            "CSS",
            "Go",
            "Swift",
            "Ruby",
            "Perl"
        ]
    },
    {
        message: "Questions (FAQ)",
        name: "questions"
    },
    {
        message: "Name of the author or group.",
        name: "author"
    },
    {
        message: "Enter your Github username",
        name: "username"
    }
]).then(function(response) {
    // Axios call
    const queryUrl = `https://api.github.com/users/${response.username}`;
    let userEmail;
    let gitPicUrl;
    const axiosCall = getData(queryUrl).then(function(response){
        userEmail = response.email;
        gitPicUrl = response.avatar_url;
    }).then( function() {
        let template = `
        # ${response.title}

        ${response.description}.

        ## Table of Contents
        
        ${genContent}

        ## Installation
        * ${response.installation}.

        ## Instructions
        * ${response.instructions}.

        ## License
        * ${response.license}.

        ## Contributors
        * ${response.contributors}.

        ## Tests
        * ${response.tests}.

        ## Written In

        ${stringArr}

        ## Questions

        ${response.questions}   @@@some questions

        ## Written By
        * ${response.author}.
        * ${gitPicUrl}.
        * email: ${userEmail}.
        `;
        fs.writeFile("README.md", template, (err) => {
        if (err) {
            throw err;
        }
        console.log("Succeded making README.md");
        })
    });

    // Table of contents
    let contArr = response.tableOfContents.split(", ");
    let genContent = new Array;
    let i = 1;
    for (content of contArr) {
        genContent += `${i} - ${content}.\n\t`;
        i++;
    }

    // Languages
    let langArr = response.languages;
    let stringArr = new Array;
    for (language of langArr){
        stringArr += `* ${language}.\n\t`;
    }

    // Readme template
    

    // write readme
    /*
    fs.writeFile("README.md", template, (err) => {
        if (err) {
            throw err;
        }
        console.log("Succeded making README.md")
    })
    */
});

function getData (queryUrl) {
    return new Promise( function(resolve, reject) {
        if (queryUrl === null) {
            return reject(Error("queryUrl must be defined."));
        }
        setTimeout(function() {
            resolve(axios.get(queryUrl).then(function({data}) {
                return data;
            }));
        }, 2000);
    });
}
