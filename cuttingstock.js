// Tip #1: it would be better if firstScreen and secondScreen were not arrays but were json objects instead.
// Tip #2: The firstScreen and secondScreen array parameters would be better to be objects. You convert them to objects within the method but why not just send them as objects in the first place??

//length of the aluminum bar
const alumbarLength = 72;

//some test objects. maybe i can make a seperate constructor that makes you an object and asks what
//lenght and width you want. 
const screenA = {"lengthbar":44, "widthbar":33};
const screenB = {"lengthbar":55, "widthbar":33.5};
const screenC = {"lengthbar":22, "widthbar":15};

//find the combination of material with the least amount of waste
function findMinimumWaste(firstScreen, secondScreen, stockRequired){
    //this is the final array where I'm going to store the results of getting the best combination of bars, subtracting them from the 72 inch bar, and finding out
    // which use the most material, are kept 
    const resultArray = [];


    //how much material is left after cutting it down
    let remainingMaterial = 0;
    //which array is the best combo
    let optimalArray = [];

    //takes the arrays inside optimalArray, adds them up against each other (eg[15, 20] should output 35), and stores them in here
    const sumArray = [];


    console.log("-------------------------------------------------------------")
    const sumOfScreens = Object.keys(firstScreen).reduce(function(a, b){
        a[b] = firstScreen[b] + secondScreen[b];

        return a
    }, {})
    console.log("Sum of the screen values")
    console.log(sumOfScreens)


    //checks which combination of bars uses the most amount of an aluminum bar
    // I set i to 2 because there are two bars
    for(let i = 0; i < 2; i++){
        //creates a random ID so I can track it in the sumArray when I do calculations... hmm maybe I don't need this
        let id = Math.random().toString(36).substring(2);
        if(firstScreen['lengthbar'] + firstScreen['widthbar'] < alumbarLength){
            //if it uses up 72 inches or less, aka a full bar, then push that to optimalArray, which holds the best combination of bars
            optimalArray.push([firstScreen['lengthbar'], firstScreen['widthbar']]);
            //add the two bars together, and then subtract that from the 72 inch bar. then push it to this array so I can check which combination of bars
            //has the smallest number left, so that I can determine which combination gets you the most of your single 72 inch bar. 
            sumArray.push(alumbarLength - (firstScreen['lengthbar'] + firstScreen['widthbar']));
        } else if(firstScreen['lengthbar'] + secondScreen['lengthbar'] < alumbarLength){
            optimalArray.push([firstScreen['lengthbar'], secondScreen['lengthbar']]);
            sumArray.push(alumbarLength - (firstScreen['lengthbar'] + secondScreen['lengthbar']));
        } else if(secondScreenObj['lengthbar'] + secondScreenObj['widthbar'] < alumbarLength){
            optimalArray.push([secondScreen['lengthbar'], secondScreen['widthbar']]);
            sumArray.push(alumbarLength - (secondScreen['lengthbar'] + secondScreen['widthbar']));
        } else {
            //if neither combination of bars is less than 72 inches, then it doesn't matter which order you do, because in the end,
            // you're still gonna have to use another bar. 
            console.log("No matches found.")
        }
    }


    //also used for debugging, i want to see that there is something in the 4th nested array
    console.log("Here are the items in optimal array");
    console.log(optimalArray);


    console.log("Here is sum array: ");
    console.log(sumArray);

    //now check if it uses the maximum amount of the aluminum bar
    for(let i = 0; i < sumArray.length; i++){
        //push it to the final array if it uses the most amount
        //finds out which array in sumArray has the lowest number
        let min = Math.min.apply(Math, sumArray);
        //takes the items in the array, subtracts them from the 72 inch alumbar, and compares them against the lowest number
        if((alumbarLength - sumArray[i]) > min){
            //removes minimum until there is only one
            if(sumArray.length > 0){
                sumArray.splice(i, 1)
            }
            //move to final array so that I can see which ones have the greatest number after being subtracted from the 72 inch aluminum bar, 
            resultArray.push(sumArray[i]); 

    }

    console.log(remainingMaterial);
    //this isn't ready yet but im using it for debugging anyway. in an ideal scenario, I would be able to find out which where the combos from optimalArray 
    //that made it to resultArray, and then I would be able to tell you which combos are the best
    console.log("and the winner is...");
    console.log(resultArray);
    return resultArray;
}
}



findMinimumWaste(screenA, screenC, 2);

// old code 
//     //goes through both of the arrays and looks for the best combo
//     for(let i = 0; i< firstScreen.length; i++){
//         for(let j=0; j<secondScreen.length; j++){
//                 // if this is the best combo, push it into another array that will later check for which combo uses the most out of a 72 inch alum bar
//                 if(firstScreen[i] + firstScreen [j] < alumbarLength){
//                     optimalArray.push([firstScreen[i], firstScreen[j]]);
//                 } else if (firstScreen[i] + secondScreen[i] < alumbarLength){
//                     optimalArray.push([firstScreen[i], secondScreen[i]]);
//                 } else if (firstScreen[i] + secondScreen[j] < alumbarLength){
//                     optimalArray.push([firstScreen[i], secondScreen[j]]);
//                 } else if (secondScreen[i] + secondScreen[j] < alumbarLength){
//                     optimalArray.push([secondScreen[i], secondScreen[j]]);

//                 } else {
//                     //basically, you can use any bar you'd like in any arrangement, as they will still require using another bar to complete the job
//                     console.log("No matches found");
//                     return [];
//                 }
//                 // used as debugging for me, to check what's inside the arrays and make sure there arent any errors from this point
//                 console.log("Combo #: ")
//                 console.log(optimalArray[j]);
        
            
//         }
//     }


//the old sum array function
    // //checks which array combo has the least remaining material
    // for(let k = 0; k < optimalArray.length; k++){
    //     //reset the sum each time so that i can go through all of the arrays in optimalArray and see the best results
    //     let sum = 0;
    //     for(let l = 0; l < optimalArray[k].length; l++){
    //         //gets the sum of the items in each nested array in optimalArray
    //         sum += optimalArray[k][l];
    //     }
    //     //takes this final product and pushes it to the sumArray, and thats done for each of the nested arrays
    //     sumArray.push(sum);
    // }