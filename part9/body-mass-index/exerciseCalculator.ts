interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseInputs {
    dailyHours: Array<number>;
    targetHours: number;
}

const calculateExercises = (
    dailyHours: Array<number>,
    targetHours: number
): ExerciseResults => {
    const results = {} as ExerciseResults;
    results.periodLength = dailyHours.length;
    (results.trainingDays = dailyHours.filter((day) => day !== 0).length),
        (results.average =
            dailyHours.reduce((acc, val) => acc + val) / dailyHours.length);
    results.target = targetHours;
    results.success = results.average >= results.target;

    const { rating, ratingDescription } = rateTraining(
        results.average,
        results.target
    );
    results.rating = rating;
    results.ratingDescription = ratingDescription;

    return results;
};

const rateTraining = (average: number, target: number) => {
    switch (true) {
        case average >= target:
            return { rating: 1, ratingDescription: "You did great!" };
        case average >= target / 2:
            return {
                rating: 2,
                ratingDescription: "Not too bad but could be better",
            };
        case average < target / 2:
            return { rating: 3, ratingDescription: "Try harder next time!" };
        default:
            throw new Error("Something bad happened");
    }
};

const parseBmiArguments = (args: Array<string>): ExerciseInputs => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const inputs = {} as ExerciseInputs;
    inputs.dailyHours = [];

    for (let n = 2; n < args.length; n++) {
        if (!isNaN(Number(args[n]))) {
            if (n == 2) {
                inputs.targetHours = Number(args[n]);
            } else {
                inputs.dailyHours.push(Number(args[n]));
            }
        } else {
            throw new Error("Provided values were not numbers!");
        }
    }
    return inputs;
};

try {
    const { dailyHours, targetHours } = parseBmiArguments(process.argv);
    console.log(calculateExercises(dailyHours, targetHours));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
