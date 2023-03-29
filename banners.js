// input is JSON format 
function PageOutput(input) {

    // it will store each banner info
    let display_banner = [];

// -------- These below functions are only goin to work if they are true ----------------

    // banner 1 
    // Check if the applicant is eligible for the SCM's diversity campaign.
    if (isEligibleDC(input)) {
        // If so, add a banner object to the list with the link to the internal SCM page for the campaign.
        let diversityBanner = {
            link: "https://internal.scm/diversity-campaign",
            categories: getDiversityCategories(input)
        };
        display_banner.push(diversityBanner);
    }

    // banner 2 
    // Check if the applicant is eligible for the SCM's Development Program for Entry-Level Employees.
    // An applicant is eligible for this program if the total length of prior experiences with employmentType as Full-time is no longer than a year

    if (isEligibleDP(input)) {
        // If so, add a banner object to the list with the link to the internal SCM page for the program.
        let developmentBanner = {
            link: "https://internal.scm/prog",
        };
        display_banner.push(developmentBanner);
    }

    // banner 3
    // if handicap check for adjustments in marks 
    if (isEligibleScoreAdj(input)) {
        // If so, add a banner object to the list with the link to the internal SCM page for the score adjustment.
        let scoreAdjustmentBanner = {
            link: "https://internal.scm/program",
        };
        display_banner.push(scoreAdjustmentBanner);
    }

    // OUPUT 
    // if banner display is there output it with id and name including otherwise none
    if (display_banner.length > 0) {
        let pageOutput = {
            id: input.id,
            name: input.name,
            banners: display_banner
        };
        // Return the page output object.
        return pageOutput;
    }
    // no banner to show .
    else {
        return null;
        // or not eligible ouput banner can be shown 
    }
}

// -----------------CHECKING THE GIVEN CONDITIONs -------------------

// Scenario 1 - Eligibility criteria for Diversity Campaign
// then we jsut upadte the below func. by adding the condition using or 
// and upadte the file json configuration accordlingly for that we can store the file in database for easy maintanence
// This function checks if the applicant is eligible for the SCM's diversity campaign.
function isEligibleDC(input) {
    // Check if the applicant's gender is not Cisgender, or if their sex is Other/Intersex, or if their sexual orientation is not Heterosexual, or if they have any disability, or if their race contains any of American Indian or Alaska Native and Native Hawaiian or Other Pacific Islander.
    return (input.gender !== "Cisgender") || (input.sex === "Other/Intersex") || (input.sexualOrientation !== "Heterosexual") || (input.hasDisability === true) || (input.race.includes("American Indian")) || (input.race.includes("Alaska Native")) || (input.race.includes("Native Hawaiian")) || (input.race.includes("Other Pacific Islander"));
}

function isEligibleDP(input) {
    let totalexp = 0;
    if (input.experiences.employmentType == 'Full-time') {
        // Convert start and end dates to date objects
        startDateObj = PARSE_DATE(startDate)
        endDateObj = PARSE_DATE(endDate)

        // Calculate difference between dates in milliseconds
        dateDiff = endDateObj.getTime() - startDateObj.getTime()

        // Convert difference to days
        diffInDays = dateDiff / (1000 * 60 * 60 * 24)

        return (diffInDays>365)? false : true;

    }
}

function isEligibleScoreAdj(input){
    return (input.nativeLanguages!="EN")?true:false;
}

// This function 
// Check gender, sex, sexual orientation, disability, and race
function getDiversityCategories(input) {
    let categories = [];
    // here we also dobulbe checks cause in elegiblity any one condition is true so we need to take care of other conditions

    // If the applicant's gender is not Cisgender, add the "Gender" category to the list.
    if (input.gender !== "Cisgender") {
        categories.push("Gender");
    }
    // If the applicant's sex is Other/Intersex, add the "Sex" category to the list.
    if (input.sex === "Other/Intersex") {
        categories.push("Sex");
    }
    // If the applicant's sexual orientation is not Heterosexual, add the "Sexual Orientation" category to the list.
    if (input.sexualOrientation !== "Heterosexual") {
        categories.push("Sexual Orientation");
    }

    if (input.disability != null) {
        categories.push("Disability");
    }

}


// Scenarios 2 and 3:

// - New hiring campaign, program introduced: just add other function and check it and add it to the answer ouput /pageoutput.
// - Format of output page object changes: define separate functions for the ouput function taht we take the JSOn ouptut as normal then accordlingy change the input in the given format

//  Best part of our algo
// Our code is well optimised for any change cause we have divide it in functions so they are independent of each other 