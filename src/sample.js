const arr = [1,2,3];

// arr.map(({organization_url}) => {
//     fetch('https://tt.com')
// })


function a () {
    console.log(this.b)
}

const c = {
    b: 3
}

const d = {
    b: 5
}

// a.call(d)

const f = a.bind(c)

a()

f()