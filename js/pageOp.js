let HighLighted__Row__list = []//0
let HighLighted_1_Col_list = []//1
let HighLighted_2_Col_list = []//2
let max_Tag_Len0=0
let max_Tag_Len1=0
function init_HighLighted_Col_Row(colLen,rowLen){
    HighLighted__Row__list = new Array(rowLen).fill(false)//0
    HighLighted_1_Col_list = new Array(colLen).fill(false)//1
    HighLighted_2_Col_list = new Array(colLen).fill(false)//2
}
function set_HighLighted_Col_Row(data_tomerge){
    //data_tomerge = (mode,ind)
    if(data_tomerge[0]==0){HighLighted__Row__list[data_tomerge[1]] = HighLighted__Row__list[data_tomerge[1]]==true?false:true}
    if(data_tomerge[0]==1){HighLighted_1_Col_list[data_tomerge[1]] = HighLighted_1_Col_list[data_tomerge[1]]==true?false:true}
    if(data_tomerge[0]==2){HighLighted_2_Col_list[data_tomerge[1]] = HighLighted_2_Col_list[data_tomerge[1]]==true?false:true}
}
function reset_HighLighted_Col_Row(mode){
    if(mode==0){HighLighted__Row__list = new Array(HighLighted__Row__list.length).fill(false)}
    if(mode==1){HighLighted_1_Col_list = new Array(HighLighted_1_Col_list.length).fill(false)}
    if(mode==2){HighLighted_2_Col_list = new Array(HighLighted_2_Col_list.length).fill(false)}
}
function setupButtons(){
    colButtons1 = ''
    colButtons2 = ''
    rowButton = '<button class = "_MNBtn_Side_ReSet_Row_" onclick = "{reset_HighLighted_Col_Row(0);setCSS();draw();}">'+(_B_>18?'reset ':'')+'</button>\n'
    for (let i in MN_Col_info_List){
        colButtons1+= '<button class = "_MNBtn_Bttm_" onclick = "{set_HighLighted_Col_Row([1, '+i+']);setCSS();draw();}"></button>\n'
        colButtons2+= '<button class = "_MNBtn_Bttm_" onclick = "{set_HighLighted_Col_Row([2, '+i+']);setCSS();draw();}"></button>\n'
    }
    max_Tag_Len0=0
    max_Tag_Len1=0
    for(let i in MN_Space_List){row = MN_Space_List[i];
        _h_ = BBoR+MNHLGap*(row[1]-1>0?row[1]-1:0)+((row[0]<0)?0:vArH);
        tmp0=0;tmp1=0;
        sROWs = (() =>{tmpsp = '';for(let j in row[2]){ spspsp = row[2][j];if(spspsp[0]<0){continue};  
                                    tmpsp+= MN_split_chars[spspsp[0]].repeat(spspsp[1])+'_'; tmp0+=spspsp[1];tmp1+=1;} return tmpsp;})();
        max_Tag_Len0=tmp0>max_Tag_Len0?tmp0:max_Tag_Len0;
        max_Tag_Len1=tmp1>max_Tag_Len1?tmp1:max_Tag_Len1;
        rowButton+= '<button class = "_MNBtn_Side_"'+'style = "height: '+_h_+'px;"'+' onclick = "{set_HighLighted_Col_Row([0, '+i+']);setCSS();draw();}">'+sROWs+'</button>\n'
    }
    document.getElementById('rowButtons' ).innerHTML = rowButton
    document.getElementById('colButtons1').innerHTML = colButtons1
    document.getElementById('colButtons2').innerHTML = colButtons2
}
function setCSS(){   const styleSheets = document.styleSheets;
    for (let sheet of styleSheets) {   try {
        const rules = sheet.cssRules || sheet.rules;
        for (let rule of rules) { 
            if (rule.selectorText  ===  '._MNBtn_Side_Bar_'      ) {                                      rule.style.flexDirection = floor_or_ceil == "floor"?'column-reverse':'column';}
            if (rule.selectorText  ===  '._MNBtn_Side_'          ) { wb = 1*(parseInt(30+4*max_Tag_Len0+7*max_Tag_Len1))   ;rule.style.width = ''+wb+'px';}
            if (rule.selectorText  ===  '._MNBtn_Side_ReSet_Col_') { wb = 1*(parseInt(30+4*max_Tag_Len0+7*max_Tag_Len1))   ;rule.style.width = ''+wb+'px';}
            if (rule.selectorText  ===  '._MNBtn_Side_ReSet_Row_') { wb = 1*(parseInt(30+4*max_Tag_Len0+7*max_Tag_Len1))   ;rule.style.width = ''+wb+'px'; h = 1*(parseInt(_B_));rule.style.height = ''+h+'px';}
            if (rule.selectorText  ===  '._MNBtn_Bttm_'          ) { w1 = 1*(parseInt(vArW))             ;rule.style.width = ''+w1+'px';}
            if (rule.selectorText  ===  '._MNBtn_Bttm_GapFiller_') { w2 = 1*(parseInt(BoL)+parseInt(BoW));rule.style.width = ''+w2+'px';}
        }   }  catch(e) {console.log('跨域样式表无法修改');}
    }
}