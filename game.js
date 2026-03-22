function createGame(a,b){
            this.a=a;
            this.aPalo="x";
            this.b=b;
            this.bPalo="0";
            let table=[["&","&","&"],["&","&","&"],["&","&","&"]];
            let stackRows=[[],[],[]];
            let stackColumns=[[],[],[]];
            let diagonal=[[],[]];

            aPt=0;
            bPt=0;

            function reset(){
                
                table=[["&","&","&"],["&","&","&"],["&","&","&"]];
                stackRows=[[],[],[]];
                stackColumns=[[],[],[]];
                diagonal=[[],[]];
            }

            function Play(palo, x, y){
                x=Math.max(1,x);
                y=Math.max(1,y);
                if(table[y-1][x-1]==="&"){
                    table[y-1][x-1]=palo;
                    stackRows[y-1].push(palo);
                    stackColumns[x-1].push(palo);
                    if(y-1===x-1) diagonal[0].push(palo);
                    if(y+x-2=== 3-1 ) diagonal[1].push(palo);

                }

            }

            function aWins(){
                aPt++;
            }

            function bWins(){
                bPt++;
            }

            function getResult(){
                console.log(a, aPt," : ",b,bPt);
                return {"ra":aPt, "rb":bPt};
            }

            function DrawTable(){
                console.table(table);
            }

            function isOver(){
                
                let rows=[...stackRows,...stackColumns,...diagonal];
                rows=rows.filter((x)=>x.length===3);
                
                for(const x of rows){
                    if(x[0]===x[1] && x[1]===x[2]){
                        //three in line

                        if(x[0]===aPalo){
                            aWins();
                        }else{
                            bWins();
                        }
                        return true;
                    }
                } 
                if(rows.length===7){
                    //the board is completed
                    return true;
                }

                return false;
            }

            return {aWins, bWins,getResult, DrawTable, Play, isOver, reset}
        }

        let game = createGame("arturo","roberto");

        //2 de 3
        
        let {ra,rb}=game.getResult();
        while(ra<2 && rb<2){
            let player=0;
            let count=5000;
            while(count && !game.isOver()){
    
                console.log({count});
                let palo=player==0?"x":"0";
                let x=Math.trunc(Math.random()*4);
                let y= Math.trunc(Math.random()*4);
    
                game.Play(palo,x,y);
                game.DrawTable();
    
                player += 1;
                player%=2;
                count--;
            }

            ({ra,rb} = game.getResult());
            game.reset();
        }




        console.log("salimos del while");
        console.log(game.getResult());