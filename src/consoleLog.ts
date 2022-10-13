// Challenge 1:
//
// Use 2 different techniques to output the value of this variable with
// a label, so we can easily identify it in the script output.

const surprisingFact = "The bumblebee bat is the world's smallest mammal";

console.log({ surprisingFact });
console.log("surprising fact: %s", surprisingFact);

// Challenge 2:
//
// Use 2 different techniques to output a formatted version
// of this complete object.

const familyTree = [
    {
        name: "Person 1",
        children: [
            {
                name: "Person 2",
                children: [
                    {
                        name: "Person 3",
                        children: [
                            {
                                name: "Person 4",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

console.table(familyTree);
console.dir(familyTree[0], { depth: null });

// Challenge 3:
//
// Output a count value every time the importantTask function is called.
// Reset the count value after 4 function calls.

function importantTask() {
    console.count("MyCounter");
}

importantTask();
importantTask();
importantTask();
importantTask();
console.countReset("MyCounter");
importantTask();
importantTask();
