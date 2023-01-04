interface BmiValues {
    height: number;
    weight: number;
}

const calculateBmi = (height: number, weight: number) => {
    //height cm , weight kg
    const bmi = weight / Math.pow(height/100, 2);
    switch (true) {
        case bmi < 16:
            return "Underweight (Severe thinness)";
        case bmi >= 16 && bmi <= 16.9:
            return "Underweight (Moderate thinness)";
        case bmi >= 17 && bmi <= 18.4:
            return "Underweight (Mild thinness)";
        case bmi >= 18.5 && bmi <= 24.9:
            return "Normal range";
        case bmi >= 25 && bmi <= 29.9:
            return "Overweight (Pre-obese)";
        case bmi >= 30 && bmi <= 34.9:
            return "Obese (Class I)";
        case bmi >= 35 && bmi <= 39.9:
            return "Obese (Class II)";
        case bmi >= 40:
            return "Obese (Class III)";
    }
};

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};


try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}