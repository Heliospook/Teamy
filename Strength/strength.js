var totalNoInp = document.getElementById("totalNo");
var nTeamsInp = document.getElementById("nTeams");
var whoswhoInp = document.getElementById("whoswho");
var storder = document.getElementById("storder");
var form=document.getElementById("data");

// to print the team using names given the formed teams
function printteam(teamlist,names){
    var text="";
    for(var team=0;team<teamlist.length;team++){
        text+="TEAM " + parseInt(team+1) + "\n";
        for(var i=0;i<teamlist[team].length;i++){
            text+= "       " + names[teamlist[team][i]-1] + "\n";
        }
        text+="\n";
    }
    return text;

}

//makes the teams
function maketeam(storder,tn,m){
    var allteamlist=[];
    for(var i=0;i<m;i++){
        allteamlist.push([]);
    }
    var ptr=1;
    var dir=1;
    var i=1;
    allteamlist[0].push(storder[0]);
    while(i<storder.length){
        allteamlist[ptr].push(storder[i]);
        if (ptr<m-1 && ptr>0){
            i+=1;
        }
        else if(i<storder.length-1)
        {
            allteamlist[ptr].push(storder[i+1]);
            i+=2;
            dir*=-1
        }
        else{
            i+=1;
        }
        ptr+=dir;
        
    }
    return allteamlist;
}

form.addEventListener("submit",function(event){
    if (!whoswhoInp.value){
        var names = ["Player 1"] ;
    }
    else{
        var names = whoswhoInp.value.split(",");
    }
    

    var i=names.length + 1;
    while(names.length<totalNoInp.value){
        names.push("Player "+ i);
        i++;
    }

    var stlist = storder.value.split(",");
    for(var i=0;i<stlist.length;i++){
        stlist[i] = parseInt(stlist[i].trim())
    }

//    console.log(swap([1,3],[2,4],prflist,totalNoInp.value));
    // swap([1,2,3],[4,5,6],prflist,totalNoInp.value);
    
    localStorage["strongans"]=printteam(maketeam(stlist,totalNoInp.value,nTeamsInp.value),names);
    console.log(localStorage.getItem("strongans"));
    event.preventDefault();

});
