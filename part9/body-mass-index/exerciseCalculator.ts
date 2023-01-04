interface ExerciseResults { 
    periodLength: number, 
    trainingDays: number, 
    success: boolean, 
    rating: number,
    ratingDescription: string,
    target: number, 
    average: number 
}


const calculateExercises = (dailyHours: Array<number>, targetHours: number): ExerciseResults => {

    const results = {} as ExerciseResults;
    results.periodLength = dailyHours.length;
    results.trainingDays = dailyHours.filter((day) => day !== 0).length,
    results.average = dailyHours.reduce((acc, val) => acc + val)/dailyHours.length;
    results.target = targetHours;
    results.success = results.average >= results.target;
    
    const {rating, ratingDescription} = rateTraining(results.average, results.target);
    results.rating = rating;
    results.ratingDescription = ratingDescription;

    return results;
};

const rateTraining = (average: number, target: number) => {
    switch(true){
        case average >= target:
            return {rating: 1, ratingDescription: "You did great!"};
        case average >= target/2:
            return {rating: 2, ratingDescription: "Not too bad but could be better"};
        case average < target/2:
            return {rating: 3, ratingDescription: "Try harder next time!"}
    }
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] , 2));
// hours per day of week, target daily hours