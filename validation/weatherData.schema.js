const weatherDataSchema = {
    city: {
        notEmpty: true, 
        errorMessage: "City field cannot be empty"
    },
    date: { 
        notEmpty: true, 
        errorMessage: "Date field cannot be empty",
        custom : {
            options: async function(date) {
                if(new Date(date) == 'Invalid Date') {
                    throw ("Invalid date");
                }
                const now = new Date();
                const someDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
                const numberOfDaysToAdd = 5;
                const maxDate = someDate.getDate() + numberOfDaysToAdd;
                const max = new Date(`${someDate.getFullYear()}-${someDate.getMonth() + 1}-${maxDate}`);
                if(new Date(date) > max || new Date(date) < someDate) {
                    throw (`Please, enter the date before ${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}
                    and after ${someDate.getFullYear()}-${someDate.getMonth() + 1}-${someDate.getDate()}`);
                }
            }
        }
    }
}

module.exports = weatherDataSchema;