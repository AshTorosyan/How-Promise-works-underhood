

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
   constructor(executor) {
    this.state = PENDING;
    this.result = undefined;
    this.onFulfilledfn = [];
    this.onRejectedfn = [];

    const resolve = (value) => {
        if(this.state === PENDING) {
            this.state = FULFILLED;
            this.result = value;
            this.onFulfilledfn.forEach(fn => fn(value));
        }
    }

    const reject = (error) => {
        if(this.state === PENDING) {
            this.state = REJECTED;
            this.result = error;
            this.onRejectedfn.forEach(fn => fn(error));
        }
    }

    try {
        executor(resolve, reject)
    } catch(error) {
        reject(error)
    }
   }

   then(onFulfilled, onRejected) {

    if(this.state === PENDING) {
        if(onFulfilled) {
            this.onFulfilledfn.push(onFulfilled)
        }
        else if(onRejected) {
            this.onRejectedfn.push(onRejected)
        }
    }
    if(onFulfilled && this.state === FULFILLED) {
        onFulfilled(this.result);
        return;
    }
    else if(onRejected && this.state === REJECTED) {
        onRejected(this.result);
        return;
    }
   }

   catch(onRejected) {
       return this.then(null, onRejected);
   }
}

//1. to intercept the value, the then method is used,  resolve-then

// const promise = new MyPromise(resolve => {
//      resolve(10);
// }).then(result => console.log(result));

//2. to catch the error, you can use the catch method,  reject-catch

// const promise2 = new MyPromise((resolve, reject) => {
//     reject(new Error("Ooops"));
// }).catch(error => console.log(error));

//3. you can also use the then method to catch the error, then(null, error)

// const promise3 = new MyPromise((resolve, reject) => {
//     reject(new Error("Oooops"));
// }).then(null, error => console.log(error));


//4. used for deferred code - resolve

// const promise4 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(50);
//     }, 3000)
// }).then(result => console.log(result));

// 5. used for deferred code - reject

// const promise5 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject(new Error("Ooooops"));
//     }, 4000);
// }).catch(error => console.log(error));


//6. Resolve, Reject can only be called once

// const promise6 = new MyPromise((resolve, reject) => {
//     reject(new Error("Ooooooops"));
//     resolve("success");
//     setTimeout(() => {
//      resolve("beautiful");
//     }, 1000)
// }).then(result => console.log(result), error => console.log(error));


//7. You can call then as many times as you like on the same promise and get the same result

// const promise7 = new MyPromise((resolve, reject) => {
//    setTimeout(() => {
//     resolve("success");
//    }, 1000);
// });

// promise7.then(result => console.log(result));
// promise7.then(result => console.log(result));
// promise7.then(result => console.log(result));
// promise7.then(result => console.log(result));
// promise7.then(result => console.log(result));

// 8. if you call then when the state has already been set, we still get the value

// const promise8 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("success");
//     }, 1000);
// });

// setTimeout(() => {
//    promise8.then(result => console.log(result));
//    promise8.then(result => console.log(result));
//    promise8.then(result => console.log(result));
//    promise8.then(result => console.log(result));
//    promise8.then(result => console.log(result));
// }, 2000);


