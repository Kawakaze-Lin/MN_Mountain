let HighLighted_1_Col = -1
let HighLighted_2_Col = 0
let HighLighted_Row = 0
let max_Tag_Len0=0
let max_Tag_Len1=0

function setupButtons(){
    colButtons1 = ''
    colButtons2 = ''
    rowButton = '<button class = "_MNBtn_Side_ReSet_Row_" onclick = "{HighLighted_Row =  0;main( true);}">'+(_B_>18?('reset '+(floor_or_ceil == 'floor'?'↑':'↓')):'')+'</button>\n'
    for (let i in MN_Col_info_List){
        colButtons1+= '<button class = "_MNBtn_Bttm_" onclick = "{HighLighted_1_Col =  '+i+';main( true);}"></button>\n'
        colButtons2+= '<button class = "_MNBtn_Bttm_" onclick = "{HighLighted_2_Col =  '+i+';main( true);}"></button>\n'
    }
    max_Tag_Len0=0
    max_Tag_Len1=0
    for(let i in MN_Space_List){row = MN_Space_List[i];
        _h_ = BBoR+MNHLGap*(row[1]-1>0?row[1]-1:0)+((row[0]<0||row[2] == 0)?0:vArH);
        tmp0=0;tmp1=0
        sROWs = row[2] == 0?'':
          (() =>{tmpsp = '';for(let j in row[3]){ spspsp = row[3][j];  tmpsp+= MN_split_chars[spspsp[0]].repeat(spspsp[1])+'_'; tmp0+=spspsp[1];tmp1+=1;} return tmpsp;})();
        max_Tag_Len0=tmp0>max_Tag_Len0?tmp0:max_Tag_Len0;
        max_Tag_Len1=tmp1>max_Tag_Len1?tmp1:max_Tag_Len1;
        rowButton+= '<button class = "_MNBtn_Side_"'+'style = "height: '+_h_+'px;"'+' onclick = "{HighLighted_Row =  '+i+';main( true);}">'+sROWs+'</button>\n'
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