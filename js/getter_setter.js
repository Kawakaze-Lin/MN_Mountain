let MN_Exp_Str_input = ''
let MN_split_chars = []
let MN_split_colors = []
function fillter_MN_Exp_Str_input(){
    MNExpStrIpt_New = MN_Exp_Str_input.replace(' = ','(|)').replace('\n','(|)').replace('(|)(|)','(|)')
    while(MNExpStrIpt_New!= MN_Exp_Str_input){
        MN_Exp_Str_input = MNExpStrIpt_New;
        MNExpStrIpt_New = MN_Exp_Str_input.replace(' = ','(|)').replace('\n','(|)').replace('(|)(|)','(|)')
    }
}
function get_MN_input(){
    MN_Exp_Str_input = document.getElementById('inputExp').value
    fillter_MN_Exp_Str_input()
    split_chars_info = document.getElementById('MN_splitter').value
    split_chars_list = split_chars_info.split('|')
    MN_split_chars = []
    MN_split_colors = []
    for (let i in split_chars_list){
        if (split_chars_list.length == 0){return}
        Sp_i = split_chars_list[i]
        Sp_i_Cr = Sp_i.split('#')[0]
        Sp_i_Cl = Sp_i.split('#')[1]
        if (Sp_i_Cr.length == 0){continue}
        MN_split_chars.push(Sp_i_Cr)
        MN_split_colors.push("#"+Sp_i_Cl)
    }

}

let background_color = ''
let ground_color = ''
let vAr_color = ''
let font_color = ''
let select_vAr_color = ''

function get_Colors(){
    background_color = document.getElementById("background_color").value
    ground_color = document.getElementById("ground_color").value
    vAr_color = document.getElementById("vAr_color").value
    select_vAr_color = document.getElementById("select_vAr_Color").value
    select_vAr_color_map = new Map(select_vAr_color.split('|').map(x =>x.split('#')))
    font_color = document.getElementById("font_color").value
}

let vArW = 0
let vArH = 0
let MNHLGap = 3
let BBoR = 5
let _B_ = 15
let BoW = 0
let BoL = 0
function get_draw_args(inputer_or_slideer){
    vArW    = inputer_or_slideer? parseInt(document.getElementById('vAr_W'   ).value):parseInt(document.getElementById('vArW_Value_slider'   ).value);
    vArH    = inputer_or_slideer? parseInt(document.getElementById('vAr_H'   ).value):parseInt(document.getElementById('vArH_Value_slider'   ).value);
    MNHLGap = inputer_or_slideer? parseInt(document.getElementById('MNHLGap_').value):parseInt(document.getElementById('MNHLGap_Value_slider').value);
    BBoR    = inputer_or_slideer? parseInt(document.getElementById('BBoR_'   ).value):parseInt(document.getElementById('BBoR_Value_slider'   ).value);
    _B_     = inputer_or_slideer? parseInt(document.getElementById('_B__'    ).value):parseInt(document.getElementById('_B__Value_slider'    ).value);
    BoW     = inputer_or_slideer? parseInt(document.getElementById('BoW_'    ).value):parseInt(document.getElementById('BoW_Value_slider'    ).value);
    BoL     = inputer_or_slideer? parseInt(document.getElementById('BoL_'    ).value):parseInt(document.getElementById('BoL_Value_slider'    ).value);
    lim_draw_args(inputer_or_slideer)
}
function lim_draw_args(inputer_or_slideer){
    vArW = vArW<15?15:vArW
    if(inputer_or_slideer)document.getElementById('vArW_Value_slider').max   = ''+(vArW*2)
    vArH = vArH<15?15:vArH
    if(inputer_or_slideer)document.getElementById('vArH_Value_slider').max   = ''+(vArH*2)
    MNHLGapLm = vArH/5
    MNHLGapLm = MNHLGapLm>10?10:(MNHLGapLm<3?3:MNHLGapLm)
    MNHLGapLm = Math.floor(MNHLGapLm)
    document.getElementById('MNHLGap_Value_slider').max   = ''+(MNHLGapLm)
    MNHLGap = MNHLGap<3?3:(MNHLGap>MNHLGapLm?MNHLGapLm:MNHLGap)
    BBoR = BBoR<4?4:(BBoR>50?50:BBoR)
    _B_Lm = vArW
    _B_Lm = _B_Lm>50?50:(_B_Lm<10?10:_B_Lm)
    _B_Lm = Math.floor(_B_Lm)
    document.getElementById('_B__Value_slider').max   = ''+(_B_Lm)
    _B_ = _B_<10?10:(_B_>_B_Lm?_B_Lm:_B_)
    BoW = BoW<0?0:(BoW>50?50:BoW)
    BoL = BoL<0?0:(BoL>50?50:BoL)
}
function set_draw_args(inputer_or_slideer){
    document.getElementById(inputer_or_slideer?'vAr_W'   :'vArW_Value_slider'   ).value = ''+vArW    ;
    document.getElementById(inputer_or_slideer?'vAr_H'   :'vArH_Value_slider'   ).value = ''+vArH    ;
    document.getElementById(inputer_or_slideer?'MNHLGap_':'MNHLGap_Value_slider').value = ''+MNHLGap ;
    document.getElementById(inputer_or_slideer?'BBoR_'   :'BBoR_Value_slider'   ).value = ''+BBoR    ;
    document.getElementById(inputer_or_slideer?'_B__'    :'_B__Value_slider'    ).value = ''+_B_     ;
    document.getElementById(inputer_or_slideer?'BoW_'    :'BoW_Value_slider'    ).value = ''+BoW     ;
    document.getElementById(inputer_or_slideer?'BoL_'    :'BoL_Value_slider'    ).value = ''+BoL     ;
}
