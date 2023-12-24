// I send a request to the company. This is synchronous
// company replies with a promise
const angelMowersPromise = new Promise<string>((resolve, reject) => {
    // a resolved promise after certain hours
    setTimeout(() => {
        resolve("We finished mowing the lawn");
    }, 100000); // resolves after 100,000ms
    reject("We couldn't mow the lawn");
});

const myPaymentPromise = new Promise<Record<string, number | string>>(
    (resolve, reject) => {
        // a resolved promise with  an object of 1000 Euro payment
        // and a thank you message
        setTimeout(() => {
            resolve({
                amount: 1000,
                note: "Thank You",
            });
        }, 100000);
        // reject with 0 Euro and an unstatisfatory note
        reject({
            amount: 0,
            note: "Sorry Lawn was not properly Mowed",
        });
    },
);

// angelMowersPromise
//     .then(() => myPaymentPromise.then(res => console.log(res)))
//     .catch(error => console.log(error))

const myAsync = async (): Promise<Record<string, number | string>> => {
    await angelMowersPromise
    const response = await myPaymentPromise
    return response
}

const baseApi = 'https://reqres.in/api/users?page=1'
const userApi = 'https://reqres.in/api/user'

interface Employee {
    id: number
    employee_name: string
    employee_salary: number
    employee_age: number
    profile_image: string
}

const fetchAllEmployees = async (url: string): Promise<Employee[]> => {
    const response = await fetch(url)
    const { data } = await response.json()
    return data
}

const fetchEmployee = async (url: string, id: number): Promise<Record<string, string>> => {
    const response = await fetch(`${url}/${id}`)
    const { data } = await response.json()
    return data
}
const generateEmail = (name: string): string => {
    return `${name.split(' ').join('.')}@company.com`
}

const runAsyncFunctions = async () => {
    try {
        const employees = await fetchAllEmployees(baseApi)
        Promise.all(
            employees.map(async user => {
                const userName = await fetchEmployee(userApi, user.id)
                const emails = generateEmail(userName.name)
                return emails
            })
        )
    } catch (error) {
        console.log(error)
    }
}

runAsyncFunctions()
