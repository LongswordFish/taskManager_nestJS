function addNumbers(a, b){
    return a+b;
}

// describe('Exacmple test', () => {
//    it('equals true',()=>{
//         expect(true).toEqual(true);
//    });
// });

describe('addNumbers', () => {
    it('adds two numbers',()=>{
         expect(addNumbers(1,3)).toEqual(4);
    });
 });
