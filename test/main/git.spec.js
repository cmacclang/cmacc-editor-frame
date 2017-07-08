var assert = require('assert')
var git = require('simple-git')


describe('git flow', function(){


    var remoteName = 'origin'

    before(function(done){
        git.init(function(){
            git.addRemote(remoteName,'https://example.git', function() {
                done();
            })
        })
    })
    it('should change the remote', function(done){


            git.removeRemote(remoteName, function(){
                git.addRemote(remoteName,'git:example.git', function(){

                    done()


                })
            })



    })

    it('should keep my changes, commit and push', function(){
        git().add('./*')
            .commit("first commit!")
            .addRemote('origin', 'https://github.com/user/repo.git')
            .push('origin', 'master');


    })

    it('should ignore my changes', function(){


    })

    it('should show the commit history for the current file', function(){


    })


})