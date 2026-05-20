let drwW = 0
let drwH = 0
let canvas = undefined
let ctx = undefined

function drawline2D(x1,y1,x2,y2,color){ctx.strokeStyle = color;ctx.beginPath();ctx.moveTo(x1,floor_or_ceil == 'ceil'?y1:drwH-y1);ctx.lineTo(x2,floor_or_ceil == 'ceil'?y2:drwH-y2);ctx.stroke()}
function init_Canvas(){
    get_MN_DrawWH();
    canvas = document.getElementById("myCanvas")
    canvas.width  = drwW+BoW*2+BoL*2;
    canvas.height = drwH;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = background_color;
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
function get_MN_DrawWH(){
    drwW = vArW*(MN_Col_info_List.length-0); drwH = 0;
    for(let i in MN_Space_List){//[SpC_i,count,fa_i] -> [SpC_i,count,fa_i,drw_Start_H]
        row = MN_Space_List[i]
        drwH += (row[0] < 0 )?_B_:BBoR
                MN_Space_List[i].push(drwH);
        drwH += (row[0] < 0 )?0:MNHLGap*(row[1]-1>0?row[1]-1:0)+((row[2] == 0 )?0:vArH)
    }
    drwH+= BBoR;
}

function get_MN_vAr_Style(vArInfo,vAr_ind){
    if (vArInfo[0] == -1){return [1,vAr_color]};
    if (vArInfo[2] ==  0){return [0,vAr_color]};
    flg =    (vArInfo[3] ==   HighLighted_Row  ?'L':'l')
            +(vArInfo[2] == 1+HighLighted_1_Col?'U':'u')
            +(vAr_ind    ==   HighLighted_2_Col?'D':'d')
    retColor = select_vAr_color_map.get(flg)
    retColor = ((retColor == undefined)?vAr_color:'#'+retColor)
    return [vArInfo[1],retColor]}

function get_MN_SpL_Style(RowInfo){
    if (RowInfo[0]  ==  -1){
        return [1,ground_color]
    }else{
        return [RowInfo[1],MN_split_colors[RowInfo[0]]]
    }
}

function draw_MN_Ground(){
    for (let i  = -Math.ceil(_B_/5); i< (drwW+BoL*2)/5; i++)
        {drawline2D(i*5+BoW,0,i*5+_B_+BoW,_B_-1,ground_color)}
    ctx.font = ""+parseInt(_B_)+"px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = font_color;

    aft_which_MulMNspltr  = 0;
    aft_which_MulMNspltr_ = aft_which_MulMNspltr+1>= Multi_MN_spliter_inds.length?Multi_MN_spliter_inds.length-1:aft_which_MulMNspltr+1
    latest_MulMNspltr_i   = Multi_MN_spliter_inds[aft_which_MulMNspltr ]
    next_MulMNspltr_i     = Multi_MN_spliter_inds[aft_which_MulMNspltr_]
    for (let ind in MN_Col_info_List){
        x = -1+vArW*0.5+vArW*ind+BoW+BoL
        y = -2+(floor_or_ceil == 'ceil'?_B_:drwH)
        index = parseInt(ind)+1
        if (parseInt(ind)>= next_MulMNspltr_i ){
            aft_which_MulMNspltr  = aft_which_MulMNspltr+1>= Multi_MN_spliter_inds.length?Multi_MN_spliter_inds.length-1:aft_which_MulMNspltr+1
            aft_which_MulMNspltr_ = aft_which_MulMNspltr+1>= Multi_MN_spliter_inds.length?Multi_MN_spliter_inds.length-1:aft_which_MulMNspltr+1
            latest_MulMNspltr_i   = Multi_MN_spliter_inds[aft_which_MulMNspltr ]
            next_MulMNspltr_i     = Multi_MN_spliter_inds[aft_which_MulMNspltr_]
        }
        if (parseInt(ind)>= latest_MulMNspltr_i){
            index-= latest_MulMNspltr_i+1;
        }
        if (index == 0)drawline2D(BoW+BoL+ind*vArW+0.5*vArW,0,BoW+BoL+ind*vArW+0.5*vArW,drwH,ground_color)
        if (index != 0)ctx.fillText(""+(index),x,y);
    }
    ctx.fillStyle = background_color;
    ctx.fillRect(0,0,BoW,canvas.height)
    ctx.fillRect(drwW+BoW+BoL*2,0,drwW+BoL*2,canvas.height)
}
function draw_MN_Split_Lines(){
    for(let x in MN_Space_List){//[SpC_i,count,fa_i]
        rowinfo = MN_Space_List[x].slice(0,3);
        styles = get_MN_SpL_Style(rowinfo);
        i = styles[0];color = styles[1];
        while(i>0){
            rowH = MN_Space_List[x][4]+MNHLGap*(i-1);
            drawline2D(0+BoW,rowH,drwW+BoW+BoL*2,rowH,color);
            i-= 1
        }
    }
}
function draw_MN_vArs(){
    for(let i in MN_Col_info_List){
        col = MN_Col_info_List[i];
        for(let j in col){          if(j == 0){continue};
            row = col[j]
            SpLH = (row[1]-1)*MNHLGap;wi = row[2]-1;hi = row[3]//[SpC_i,count,fa_i,ind_in_total_row]
            if (get_MN_vAr_Style(row,i)[0]>0){
                cur_vAr_color = get_MN_vAr_Style(row,i)[1];
                drawline2D(vArW*0.5+vArW*i+BoW+BoL,MN_Space_List[hi][4]+SpLH+vArH,vArW*0.5+vArW*wi+BoW+BoL,MN_Space_List[hi][4]+SpLH,cur_vAr_color)
                drawline2D(vArW*0.5+vArW*i+BoW+BoL,MN_Space_List[hi][4]+SpLH+vArH,vArW*0.5+vArW* i+BoW+BoL,MN_Space_List[hi][4]+SpLH,cur_vAr_color)
            }
        }
    }
}
function draw(){
    draw_MN_Ground();
    draw_MN_Split_Lines();
    draw_MN_vArs();
    if(document.getElementById('myCanvasImg'))document.getElementById('myCanvasImg').src = canvas.toDataURL();
}