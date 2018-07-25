//define array
var line0
var line1
var line2
var line3
var line4
var line5
var line6
var line7
var line8
function p0(){
line0 = ['0','0','0','2','7','0','0','9','0']
line1 = ['0','0','3','0','1','0','0','0','0']
line2 = ['7','0','0','0','0','9','4','0','1']
line3 = ['0','0','4','7','0','0','0','0','6']
line4 = ['0','0','1','0','0','0','2','0','0']
line5 = ['8','0','0','0','0','4','5','0','0']
line6 = ['5','0','2','1','0','7','0','0','3']
line7 = ['0','0','0','0','4','0','7','0','0']
line8 = ['0','4','0','0','9','8','0','0','0']
}
function p1(){
line0 = ['0','0','0','0','0','0','2','9','0']
line1 = ['0','0','0','0','0','7','0','0','5']
line2 = ['0','5','0','9','8','0','0','0','3']
line3 = ['0','9','0','3','1','2','0','0','8']
line4 = ['1','0','0','0','0','0','0','0','6']
line5 = ['3','0','0','8','7','6','0','1','0']
line6 = ['9','0','0','0','3','1','0','2','0']
line7 = ['4','0','0','6','0','0','0','0','0']
line8 = ['0','1','3','0','0','0','0','0','0']
}
function p2(){
line0 = ['0','0','5','0','0','0','6','0','0']
line1 = ['0','1','7','9','0','8','5','4','0']
line2 = ['2','6','0','0','0','0','0','7','3']
line3 = ['0','0','0','1','0','5','0','0','0']
line4 = ['0','4','0','0','0','0','0','5','0']
line5 = ['0','0','0','4','0','6','0','0','0']
line6 = ['8','7','0','0','0','0','0','3','6']
line7 = ['0','9','2','6','0','3','7','8','0']
line8 = ['0','0','3','0','0','0','9','0','0']
}
function p3(){
line0 = ['0','0','0','0','0','2','7','0','0']
line1 = ['0','4','0','0','0','0','0','3','5']
line2 = ['0','1','7','3','0','6','0','0','0']
line3 = ['0','0','5','7','0','0','0','1','4']
line4 = ['9','8','0','0','0','0','0','7','6']
line5 = ['1','7','0','0','0','4','3','0','0']
line6 = ['0','0','0','6','0','7','8','2','0']
line7 = ['3','2','0','0','0','0','0','9','0']
line8 = ['0','0','8','2','0','0','0','0','0']
}
function p4(){
line0 = ['0','8','0','0','2','0','0','6','0']
line1 = ['0','5','0','6','8','0','0','9','0']
line2 = ['0','0','0','5','0','1','7','0','0']
line3 = ['0','0','4','0','0','0','1','0','9']
line4 = ['0','0','0','3','0','8','0','0','0']
line5 = ['8','0','2','0','0','0','4','0','0']
line6 = ['0','0','6','8','0','3','0','0','0']
line7 = ['0','3','0','0','9','5','0','7','0']
line8 = ['0','4','0','0','6','0','0','1','0']
}
p1()

var line_length = line0.length
var box_length = Math.sqrt(line0.length)
var cleanup = new Array()
print()

//find 0',' fill in
var unknown_count = 0
var unknown_count_old = 0
for(var i=0;i <line_length; i++){
	var lines = eval("line"+i)
	for(var j=0 ; j <line_length ; j++){
		if(lines[j]=='0'){
			lines[j] = getPossibles(i,j)
			if(lines[j].length>1) unknown_count++
			else keep_val(i,j,lines[j])
		}
	}
}
print()

function solve(){
var change = true
//find ones with more than 1
while(change){
	change = false
	for(var i=0; i<line_length; i++){ //go down
		var line = eval("line"+i)
		for(var j=0; j<line_length; j++){ //go across
			if(line[j].length > 1){ //more than one
				for(var c=0; c < line[j].length; c++){
					if(!checkH(i,j,line[j].charAt(c))){
						line[j] = line[j].charAt(c)
						unknown_count--
						//debug("save from H: "+i,j,line[j])
						keep_val(i,j,line[j])
						change = true
						break
					}
					//
					else if(!checkV(i,j,line[j].charAt(c))){
						line[j] = line[j].charAt(c)
						unknown_count--
						//debug("save from V: "+i,j,line[j])
						keep_val(i,j,line[j])
						change = true
						break
					}
//
					else if(!checkbox(i,j,line[j].charAt(c))){
						line[j] = line[j].charAt(c)
						unknown_count--
						//debug("save from B: "+i,j,line[j])
						keep_val(i,j,line[j])
						change = true
						break
					}//
				}
			}
		////debug(i,j,line)
		}
	}
}
}
solve()

//WScript.quit()

if(unknown_count>0){
	//save
	for(var i=0;i<line_length; i++){
		eval("var tmp" +i+" = new Array('" +eval("line"+i+".join(\"','\")") + "')")
	}

//find alternative
	for(var i=0;i<line_length; i++){
		line = eval("line"+i)
		for(var j=0;j<line_length; j++){
			if(line[j].length==2){
				possibleX = i
				possibleY = j
				possible = line[j]
			}
		}
	}
	
//attempt to solve
	unknown_count = unknown_count-1
	unknown_count_save = unknown_count
	for(var z=0;z<possible.length; z++){
		WScript.echo("== Attempt to solve "+z+"==" + possibleX +":"+possibleY +":"+possible)
		line = eval("line"+possibleX)
		line[possibleY] = possible.charAt(z)
		keep_val(possibleX,possibleY,possible.charAt(z))
		solve()
		//print()
		
		WScript.echo("==RESET==")
		if(checkdup()) unknown_count = unknown_count_save
		if(unknown_count>0){ //reset
			for(var j=0;j<line_length; j++){
				eval("var line" +j+" = new Array('" +eval("tmp"+j+".join(\"','\")") + "')")
			}
			unknown_count = unknown_count_save
		}
//		print()
	}
	if(checkdup()) { WScript.echo("Unable to solve"); WScript.quit() }
}
print()

	//zero()

function zero(){
	for(var i=0;i <line_length; i++){
		line = eval("line"+i)
		for(var j=0 ; j <line_length ; j++){
			if(line[j].length>1)
				line[j]='0'
		}
	}
	print()
}

function checkH(row, col, val){
//check horizontal
	var lineR = eval("line"+row)
	////debug(line[col])
	for(var x=0 ; x <line_length ; x++){
		if(x!=col){ //skip col
			if(lineR[x].indexOf(val) > -1){ //char found
					////debug(line[col])
				return(true)
			}
		}
	}
	return(false)
}

function checkV(row, col, val){
	////debug(row, col, val)
	for(var y=0; y<line_length; y++){
		if(y!=row){ //skip row
			var lineR = eval("line"+y)
			if(lineR[col].indexOf(val) > -1){ //char found
				return(true)
			}
		}
	}
	return(false)
}
function checkbox(row, col, val){
	if(row<box_length) rowstart=0
	else if(row>=box_length && row<box_length*2) rowstart=box_length
	else rowstart=box_length * 2

	if(col<box_length) colstart=0
	else if(col>=box_length && col<box_length*2) colstart=box_length
	else colstart=box_length * 2
	
	////debug(rowstart,colstart,val)
	for(var i=rowstart; i<rowstart+box_length; i++){
		lineR = eval("line"+i)
		for(var j=colstart; j<colstart+box_length; j++){
			if((i != row) || (j != col)){//skip self
				////debug(i,j,lineR[j])
				if(lineR[j].length > 1){ 
					if(lineR[j].indexOf(val) > -1) return(true) //char found
				}
			}
		}
	}
	return(false)
}

function keep_val(row, col, val){ //removes value from horizontal, vertical, box except self
	//debug("== keep_val:"+row,col,val)
	lineR = eval("line"+row)
	//horizontal
	for(var i=0;i<line_length;i++){
		if(i != col){ //skip self
			//debug(row,i,lineR[i])
			if(lineR[i].length>1){
				if(lineR[i].indexOf(val) > -1){ //check if char found
					couldbe = lineR[i].slice(0,lineR[i].indexOf(val))
					couldbe += lineR[i].slice(lineR[i].indexOf(val)+1,lineR[i].length)
					lineR[i] = couldbe
					//debug("removed val H:"+row,i,val)
					if(lineR[i].length == 1){						
						unknown_count--; 
						//keep_val(row,i,lineR[i])						
						cleanup.push(eval("["+row+","+i+","+lineR[i]+"]")) 
						//debug("push H:"+row,i,lineR[i])
					}
				}
			}
		}
	}
//vertical
	for(var i=0;i<line_length;i++){
		if(i != row){ //skip self
			lineR = eval("line"+i)
			////debug(i,col,lineR[col])
			if(lineR[col].length>1){
				if(lineR[col].indexOf(val) > -1){ //check if char found
					couldbe = lineR[col].slice(0,lineR[col].indexOf(val))					
					couldbe += lineR[col].slice(lineR[col].indexOf(val)+1,lineR[col].length)
					lineR[col] = couldbe					
					//debug("removed val V:"+i,col,val+"-"+couldbe)
					if(lineR[col].length == 1){						
						unknown_count--;
						//keep_val(i,col,lineR[col])
						cleanup.push(eval("["+i+","+col+","+lineR[col]+"]")) 
						//debug("push V:"+i,col,lineR[col])
					}
				}
			}
		}
	}
	
//remove val from box
	if(row<box_length) rowstart=0
	else if(row>=box_length && row<box_length*2) rowstart=box_length
	else rowstart=box_length * 2

	if(col<box_length) colstart=0
	else if(col>=box_length && col<box_length*2) colstart=box_length
	else colstart=box_length * 2
	
	for(var i=rowstart; i<rowstart+box_length; i++){
		lineR = eval("line"+i)
		for(var j=colstart; j<colstart+box_length; j++){
			if((i!=row) || (j!=col)){//skip row & col
				////debug(row + ":"+ col + " length:",line[j].length)
				if(lineR[j].length > 1){
					if(lineR[j].indexOf(val) > -1){ //check if char found
						couldbe = lineR[j].slice(0,lineR[j].indexOf(val))
						couldbe += lineR[j].slice(lineR[j].indexOf(val)+1,lineR[j].length)
						lineR[j] = couldbe
						//debug("removed val B:"+i,j,val)
						if(lineR[j].length == 1){
							unknown_count--; 
							//keep_val(i,j,lineR[j])
							cleanup.push(eval("["+i+","+j+","+lineR[j]+"]"))
							//debug("push B:"+i,j,lineR[j])
						}
					}
				}
			}
		}
	}//

	if(cleanup.length > 0) remove_val()
	//if(unknown_count <= 0){ print(); WScript.quit()}
	//print()
	return(false)
	//
}

function remove_val(){
	while(cleanup.length > 0){
		//ary = cleanup[cleanup.length-1]
		ary = cleanup.shift()
		row = ary[0]; col = ary[1]; val = ary[2]
		//debug("start cleanup "+ row,col,val)
		//debug("cleanup count " + cleanup.length)		
		//cleanup.pop()
		keep_val(row,col,val)
	}	
}

function getPossibles(row,col){
	couldbe0 = '123456789';

//check line	
	line = eval("line"+row)
	for(var i=0; i<line_length; i++){
		if((line[i] != '0') && (line[i].length==1)){
			if(couldbe0.indexOf(line[i]) > -1){ //found
				couldbe = couldbe0.slice(0,couldbe0.indexOf(line[i]))
				couldbe += couldbe0.slice(couldbe0.indexOf(line[i])+1,couldbe0.length)
				couldbe0 = couldbe
			}
		}
	}
	//return(couldbe0)
//check cols
	for(var i=0; i<line_length; i++){
		line = eval("line"+i)
		if((line[col] != '0') && (line[col].length==1)){
			if(couldbe0.indexOf(line[col]) > -1){ //found
				couldbe = couldbe0.slice(0,couldbe0.indexOf(line[col]))
				couldbe += couldbe0.slice(couldbe0.indexOf(line[col])+1,couldbe0.length)
			}
			couldbe0 = couldbe
		}
	}
	//return(couldbe0)
//check box area
	if(row<box_length) rowstart=0
	else if(row>=box_length&&row<box_length*2) rowstart=box_length
	else rowstart=box_length * 2
	
	if(col<box_length) colstart=0
	else if(col>=box_length&&col<box_length*2) colstart=box_length
	else colstart=box_length*2

	for(var i=rowstart;i<rowstart+box_length;i++){
		line = eval("line"+i)
		for(var j=colstart;j<colstart+box_length;j++){
			if((line[j] != '0') && (line[j].length==1)){
				if(couldbe0.indexOf(line[j]) > -1){ //found
					couldbe = couldbe0.slice(0,couldbe0.indexOf(line[j]))
					couldbe += couldbe0.slice(couldbe0.indexOf(line[j])+1,couldbe0.length)
				}
				couldbe0 = couldbe
				if(couldbe0.length == 1)return(couldbe0)
			}
		}
	}
	//
	return(couldbe0)
}

function print(){
	for(var i=0;i<line_length;i++){
		WScript.echo(eval("line"+i)); 
	}
	WScript.echo("Unknown count: " + unknown_count);
	WScript.echo()
}

function debug(a,b,val){
	if(b==undefined) b=''
	if(val==undefined) val=''
	WScript.echo(a + ":" + b + ":" + val)
}

function checkdup(){
//check H
	for(var i=0;i<line_length;i++){
		line = eval("line"+i)
		for(var j=0;j<line_length;j++){
			for(var k=j;k<line_length;k++){
				//skip self
				if(j != k){
					if(line[j] == line[k]) return(true)
				}
			}
		}
	}
//check V
	for(var i=0;i<line_length;i++){		
		for(var j=0;j<line_length;j++){
			lineA = eval("line"+j)
			for(var k=j;k<line_length;k++){
				lineB = eval("line"+k)
				//skip self
				if(j != k){
					if(lineA[i] == lineB[i]) return(true)
				}
			}
		}
	}
}
/*
5,9,3,4,1,2,7,6,8
2,4,6,9,7,8,1,3,5
8,1,7,3,5,6,9,4,2
6,3,5,7,8,9,2,1,4
9,8,4,1,2,3,5,7,6
1,7,2,5,6,4,3,8,9
4,5,9,6,3,7,8,2,1
3,2,1,8,4,5,6,9,7
7,6,8,2,9,1,4,5,3
*/