var totalNoInp = document.getElementById("totalNo");
var nTeamsInp = document.getElementById("nTeams");
var whoswhoInp = document.getElementById("whoswho");
var likesInp = document.getElementById("likes");
var form=document.getElementById("data");

function compatibility(a,b,prfl,tn){
    var score= 0;
    a=parseInt(a);
    b=parseInt(b);
    if(prfl[a-1].indexOf(b) != -1){
        score += parseInt(tn - prfl[a-1].indexOf(b));
    }
    if(prfl[b-1].indexOf(a) != -1){
        score += parseInt(tn - prfl[b-1].indexOf(a));
    
    }
    return score;
}

function calcomptb(teams,prfl,tn){
    var score=0;
    for(var i =0 ; i<teams.length;i++){
        var teami = teams[i];
        for(var j=0;j<teami.length;j++){
            for(var k=j+1;k<teami.length;k++){
                score+=parseInt(compatibility(teami[j],teami[k],prfl,tn));
            }}}
    return score;
}

function swap(ta,tb,prfl,tn){
    var wholelist = ta.concat(tb);
    var best=0;
    var na =[];

    function combo(arr,n,r,index,data,i){
        if (index==r){
            ans=[]
            for(var i = 0;i<data.length ; i++){
                ans.push(data[i]);
            }
            na.push(ans);
            return;
        }
        if (i>=n){
            return;
        }
        data[index]=arr[i];
        combo(arr,n,r,index+1,data,i+1);

        combo(arr,n,r,index,data,i+1);
    }
    
    l=wholelist.length;
    r= parseInt(l/2);
    let data = new Array(r);
    data.fill(0);
    combo(wholelist,l,r,0,data,0);
    var maxteam=[];
    var maxscore=0;
    for(var i = 0; i<na.length;i++){
        team1=na[i];
        team2=[];
        for(var j=0;j<wholelist.length;j++){
            if (!team1.includes(wholelist[j])){
                team2.push(wholelist[j]);
            }
        }
        bothteam=[team1,team2];
        var x = calcomptb(bothteam,prfl,tn);
        if (x>maxscore){
            maxscore=x;
            maxteam=[team1,team2];
        }

    }
    return(maxteam);

}

function maketeam(prfl,tn,m){
    var prototeams=[];
    var tmpteam=[];
    for(var i =1; i<=tn;i++){
        tmpteam.push(i);
        if (i%m==0||i==tn){
            prototeams.push(tmpteam);
            tmpteam=[];
        }
    }
    
    for(var i=0;i<prototeams.length;i++){
        for(var j=0;j<prototeams.length;j++){
            if(i!=j){
            var tmparr=swap(prototeams[i],prototeams[j],prfl,tn);
            prototeams[i]=tmparr[0];
            prototeams[j]=tmparr[1];}
        }
    }
    return prototeams;

}
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


form.addEventListener("submit",function(event){
    if (!whoswhoInp.value){
        var names = ["Player 1"] 
    }
    else{
        var names = whoswhoInp.value.split(",");
    }
    

    var i=names.length + 1;
    while(names.length<totalNoInp.value){
        names.push("Player "+ i);
        i++;
    }

    namedisplay="";
    for(var i =0; i< names.length ; i++){
        names[i] = names[i].trim();
        namedisplay+=names[i] + "\n";
    }

    var prflist= likesInp.value.split(",");
    for(var i=0;i<prflist.length;i++){
        prflist[i] = prflist[i].trim().split(" ");
        for( var j=0;j<prflist[i].length;j++){
            prflist[i][j]=parseInt(prflist[i][j]);
        }
    }
//    console.log(swap([1,3],[2,4],prflist,totalNoInp.value));
    // swap([1,2,3],[4,5,6],prflist,totalNoInp.value);
    
    localStorage["bloodyans"]=printteam(maketeam(prflist,totalNoInp.value,nTeamsInp.value),names);
    console.log(localStorage.getItem("bloodyans"));
    event.preventDefault();

});

