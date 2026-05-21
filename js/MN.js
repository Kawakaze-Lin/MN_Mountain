
let floor_or_ceil = "floor"
function toFloorForm(){floor_or_ceil = "floor";main( true);}
function  toCeilForm(){floor_or_ceil =  "ceil";main( true);}
let MN_Col_info_List = []
let MN_Space_List = []
function parse_MN(){
    MN_Col_info_List = []
    MN_Space_List = []
    fillter_MN_Exp_Str_input()
    split_Exp_To_Str_Cols()
    for (let i in cols_Str){
        SpCl_coli = parse_Col(i);     MN_Col_info_List.push(SpCl_coli)
        MN_Space_List = merge_Col_To_MN_Space(MN_Space_List,SpCl_coli)
    }
    get_MN_Col_tags();
    get_MN_Row_Ind_in_Totol_Row()
    // MN = [MN_Space_List,MN_Col_info_List,Multi_MN_spliter_inds]
    //
}
function tolegal_MN_Exp_StrLine_input(s){
    state = 'inited' ; ret=''
    for (let i in s){               c = s[i]
        //
        if(false){
        continue}if (state == 'inited'  ){
            if (            '('.includes(c)){ret+=c;state='lc'; continue}
        continue}if (state == 'lc'      ){
            if (            ')'.includes(c)){ret+=c;state='rc'; continue}
            if ( MN_split_chars.includes(c)){ret+=c;state='SpC';continue}
            if (!MN_split_chars.includes(c)){continue}
        continue}if (state == 'Num'     ){
            if (            ')'.includes(c)){ret+=c;state='rc'; continue}
            if ( MN_split_chars.includes(c)){ret+=c;state='SpC';continue}
            if (!MN_split_chars.includes(c)){if('0123456789'.includes(c)){ret+=c            };continue}
        continue}if (state == 'SpC'     ){
            if (            ')'.includes(c)){state='rc'; while(MN_split_chars.includes(ret[-1])                                                           ){ret=ret.slice(0,-1)};ret+=c;continue}
            if ( MN_split_chars.includes(c)){            while(MN_split_chars.includes(ret[-1])&&MN_split_chars.indexOf(c)>MN_split_chars.indexOf(ret[-1])){ret=ret.slice(0,-1)};ret+=c;continue}
            if (!MN_split_chars.includes(c)){if('0123456789'.includes(c)){ret+=c;state='Num'};continue}
        continue}if (state == 'rc'      ){
            if (            '('.includes(c)){ret+=c;state='lc'; continue}
        continue}
    }
    if (state == 'inited'){ret=''}
    if (state == 'lc'    ){ret=ret+")"}
    if (state == 'Num'   ){ret=ret+")"}
    if (state == 'SpC'   ){while(MN_split_chars.includes(ret[-1])){ret=ret.slice(0,-1)};ret=ret+")"}
    return ret
}
function fillter_MN_Exp_Str_input(){
    MNExpStrIpt_Tmp = MN_Exp_Str_input.replace('=','\n').replace('(|)','\n')
    while(MNExpStrIpt_Tmp!= MN_Exp_Str_input){
        MN_Exp_Str_input = MNExpStrIpt_Tmp;
        MNExpStrIpt_Tmp = MN_Exp_Str_input.replace('=','\n').replace('(|)','\n')
    }
    MNExpStrIpt_Tmp = MNExpStrIpt_Tmp.split('\n').map(s => tolegal_MN_Exp_StrLine_input(s)).join('\n')
    while(MNExpStrIpt_Tmp!= MN_Exp_Str_input){
        MN_Exp_Str_input = MNExpStrIpt_Tmp;
        MNExpStrIpt_Tmp = MN_Exp_Str_input.replace('\n\n','\n')
    }
        MN_Exp_Str_input=MN_Exp_Str_input.split('\n').join('(|)')
}
let cols_Str = []
let Multi_MN_spliter_inds = []
function split_Exp_To_Str_Cols(){
    cols_Str = []  ;  Multi_MN_spliter_inds = []
    tmps = '',state = 0;
    for (let i in MN_Exp_Str_input){
        c = MN_Exp_Str_input[i]
        if ((!('0123456789()|').includes(c))&&(!MN_split_chars.includes(c))){      continue}
        if (state == 0 &&   '('.includes(c)){state = 1;                 tmps = ''; continue}
        if (state == 1 &&   '|'    ==    c ){Multi_MN_spliter_inds.push(cols_Str.length)   }
        if (state == 1 && !'()'.includes(c)){                           tmps += c; continue}
        if (state == 1 &&   ')'.includes(c)){state = 0;   cols_Str.push(tmps)    ; continue}
    } //
}
function parse_Col(Cind){
    s = cols_Str[Cind];    aft_MulMNspltr_I = 0;
    for (let i in Multi_MN_spliter_inds){aft_MulMNspltr_I = (Cind>Multi_MN_spliter_inds[i])?Multi_MN_spliter_inds[i]+1:aft_MulMNspltr_I}
    //[SpC_i,count,fa_i]
    tmp = [-1,0,0];      ret = [[-1,0,0]]
    tmpnS = '';        state = 'inited'
    for (let i in s){      c = s[i]
         if (state ==  'inited' ){  if (  !MN_split_chars.includes(c)  ){   /*if('0123456789'.includes(c)  ){  tmpnS+=c;  state='Num'  };*/continue}
            SpC_i = MN_split_chars.indexOf(c);tmp = [SpC_i,1,0]; state = 'SpC';
            continue
        }if (state ==  'Num'    ){  if (  !MN_split_chars.includes(c)  ){     if('0123456789'.includes(c)  ){  tmpnS+=c;/*state='Num'*/};  continue}
            tmp[2] = parseInt(tmpnS)+aft_MulMNspltr_I; ret.push(tmp); tmpnS = '';
            SpC_i = MN_split_chars.indexOf(c);tmp = [SpC_i,1,0]; state = 'SpC'
            continue
        }if (state ==  'SpC'    ){  if (  !MN_split_chars.includes(c)  ){     if('0123456789'.includes(c)  ){  tmpnS+=c;  state='Num'  };  continue}
            SpC_i = MN_split_chars.indexOf(c);
                if (SpC_i == tmp[0]){tmp[1]+= 1;                                   continue}
                if (SpC_i <  tmp[0]){tmp[2] = 0; ret.push(tmp); tmp = [SpC_i,1,0]; continue}
            continue
        }
    }
    if (state == 'Num'){tmp[2] = parseInt(tmpnS)+aft_MulMNspltr_I; ret.push(tmp);tmpnS = ''; tmp = [-1,0,0]}
    return ret
}
function _cpr_Split_Char_(SCa,SCb){return(SCa[0]!= SCb[0])?(SCa[0]>SCb[0]?1:-1):(SCa[1] == SCb[1]?(0):(SCa[1]>SCb[1]?1:-1));}
function merge_Col_To_MN_Space(la,lb){
    len_a = la.length; ia = 0;
    len_b = lb.length; ib = 0;
    ret = []
    while(ia <=  len_a && ib <=  len_b){
        if (ia == len_a && ib  ==  len_b){break}
        if (ia == len_a){x = lb[ib].slice(0,2);x.push(lb[ib][2] == 0?0:1);ret.push(x);ib+= 1;continue}
        if (ib == len_b){x = la[ia].slice(0,2);x.push(la[ia][2] == 0?0:1);ret.push(x);ia+= 1;continue}
        if ( 0 == _cpr_Split_Char_(la[ia],lb[ib])){x = la[ia].slice(0,2);x.push(lb[ib][2]+la[ia][2] == 0?0:1);ret.push(x);ia+= 1;ib+= 1;continue}
        if ( 1 == _cpr_Split_Char_(la[ia],lb[ib])){x = lb[ib].slice(0,2);x.push(lb[ib][2]           == 0?0:1);ret.push(x);       ib+= 1;continue}
        if (-1 == _cpr_Split_Char_(la[ia],lb[ib])){x = la[ia].slice(0,2);x.push(          la[ia][2] == 0?0:1);ret.push(x);ia+= 1;       continue}
    }
    return ret
}
function get_MN_Col_tags(){
    // return
    atRowL = [];
    for(let i in MN_Space_List){
        rowSpl = MN_Space_List[i].slice(0,2);
        while(atRowL.length>0 && _cpr_Split_Char_(atRowL[atRowL.length-1],rowSpl)<0){
            atRowL = atRowL.slice(0,atRowL.length-1); }
        atRowL.push(rowSpl.slice())
        MN_Space_List[i].push(atRowL.slice())
    }
}
function get_MN_Row_Ind_in_Totol_Row(){
    ttlCol = MN_Space_List;
    for (let i in MN_Col_info_List){//[ [SpC_i,count,fa_i]...  ]
        curCol = MN_Col_info_List[i]
        len_MNttlR = ttlCol.length; ittlR = 0
        len_MNcurR = curCol.length; icurR = 0
        while(icurR < len_MNcurR){ curCol[icurR].push()
            if ( 0 == _cpr_Split_Char_(ttlCol[ittlR],curCol[icurR])){curCol[icurR][3] = ittlR;ittlR+= 1;icurR+= 1;continue}
            if ( 1 == _cpr_Split_Char_(ttlCol[ittlR],curCol[icurR])){curCol[icurR][3] = ittlR;          icurR+= 1;continue}
            if (-1 == _cpr_Split_Char_(ttlCol[ittlR],curCol[icurR])){curCol[icurR][3] = ittlR;ittlR+= 1;          continue}
        }
    }
}
