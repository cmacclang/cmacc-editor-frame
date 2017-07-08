const cmacc = require('cmacc-compiler')
const assert = require('assert')
const path = require('path')
const util = require('util')

describe("how to interoperate with ast", function(){

    it("should take a file from the ast", function(done){

        var recFill = function(keys, ast) {
            // filter filter map
            var viewlist = [];
            if(keys.length !== 0) {
                var item = keys.pop()
                if (!(/\$\$[a-z]+\$\$/g).test(item)) {
                    if (ast[item].__proto__.constructor.name !== 'str') {
                        viewlist.push({key: item, value: ast[item]})
                    }
                }
                viewlist.concat(recFill(keys, ast))
                return viewlist;

            } else {
                return viewlist;
            }

        }



        var ast = cmacc.compile("file://" + path.join(__dirname,"../../cmacc/aggregator.cmacc"))

       // console.log(util.inspect(ast, false, null))
        var fileList = [];

        var keys = Object.keys(ast)
        // for(var i = 0; i <keys.length; i++){
        //    if(!(/\$\$[a-z]+\$\$/g).test(keys[i]))
        //        if(ast[keys[i]].__proto__.constructor.name !== 'str')
        //         fileList.push({key:keys[i], value:ast[keys[i]]})
        //
        // }

        filter1 = function(arg) {
            if(!(/\$\$[a-z]+\$\$/g).test(arg)) return arg
        }
        filter2 = function(arg) {
            if(ast[arg].__proto__.constructor.name !== 'str') return arg
        }
        mapper = function(arg){
            return {key:arg, value:ast[arg]}
        }

        var fileList = keys.filter(filter1).filter(filter2).map(mapper)
        console.log(fileList)
        done()

    })

})