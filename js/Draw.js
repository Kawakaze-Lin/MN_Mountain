/* ============================================================
   Draw.js  —— SVG 版（原 svg 版改写）
   原来的 svg / ctx 换成了 svg 元素
   ============================================================ */

const SVG_NS = "http://www.w3.org/2000/svg";

let drwW = 0;
let drwH = 0;
let svg  = undefined;   // 原来的 svg，现在是一个 <svg> 元素

/* ---------------------- SVG 小工具 ---------------------- */

function svg_mk(tag, attrs, text){
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs){
        for (let k in attrs){
            const v = attrs[k];
            if (v === undefined || v === null) continue;
            el.setAttribute(k, v);
        }
    }
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
}

function svg_add(tag, attrs, text){
    const el = svg_mk(tag, attrs, text);
    svg.appendChild(el);
    return el;
}

function svg_clear(){
    while (svg && svg.firstChild) svg.removeChild(svg.firstChild);
}

/* 画线：y 轴是否需要翻转仍由全局 floor_or_ceil 决定 */
function drawline2D(x1, y1, x2, y2, color, width = 1){
    const fy = (y) => (floor_or_ceil == 'ceil' ? y : drwH - y);
    svg_add('line', {
        x1: x1, y1: fy(y1),
        x2: x2, y2: fy(y2),
        stroke: color,
        'stroke-width': width
    });
}

/* ---------------------- 初始化 ---------------------- */

function init_svg(){
    get_MN_DrawWH();

    const W = drwW + BoW * 2 + BoL * 2;
    const H = drwH;

    const el = document.getElementById("mysvg");

    if (el && el.tagName && el.tagName.toLowerCase() === 'svg'){
        /* HTML 里已经写的是 <svg id="mysvg">，直接复用 */
        svg = el;
    }else{
        /* HTML 里原来写的是 <svg id="mysvg">，就地替换成 <svg> */
        svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('id', 'mysvg');
        if (el && el.parentNode){
            el.parentNode.replaceChild(svg, el);
        }else{
            document.body.appendChild(svg);
        }
    }

    svg.setAttribute('xmlns', SVG_NS);
    svg.setAttribute('width',  W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.background = background_color;
    svg.style.display    = 'block';

    svg_clear();
    // svg_add('rect', {x: 0, y: 0, width: W, height: H, fill: background_color});
}

/* ---------------------- 尺寸计算 ---------------------- */

function get_MN_DrawWH(){
    drwW = vArW * (MN_Col_info_List.length - 0);
    drwH = 0;
    for (let i in MN_Space_List){  
        const row = MN_Space_List[i]; // [SpC_i,count,[tags]] -> [SpC_i,count,[tags],drw_Start_H]
        drwH += (row[0] < 0) ? _B_ : BBoR;
        MN_Space_List[i]=MN_Space_List[i].slice(0,3);
        MN_Space_List[i].push(drwH);
        drwH += (row[0] < 0) ? 0
                             : MNHLGap * (row[1] - 1 > 0 ? row[1] - 1 : 0)
                               + ((row[2] == 0) ? 0 : vArH);
    }
    drwH += BBoR;
}

/* ---------------------- 样式 ---------------------- */

function get_MN_vAr_Style(vArInfo, vAr_ind){
    // vArInfo = [SpC_i,count,fa_i,haStar,ind_in_total_row]
    if (vArInfo[0] == -1) return [1, vAr_color];
    if (vArInfo[2] ==  0) return [0, vAr_color];
    const flg = (HighLighted__Row__list[vArInfo[4]]     == true ? 'L' : 'l')
              + (HighLighted_1_Col_list[vArInfo[2] - 1] == true ? 'U' : 'u')
              + (HighLighted_2_Col_list[vAr_ind]        == true ? 'D' : 'd');
    let retColor = select_vAr_color_map.get(flg);
    retColor = (retColor == undefined) ? vAr_color : '#' + retColor;
    return [vArInfo[1], retColor];
}

function get_MN_SpL_Style(RowInfo){
    if (RowInfo[0] == -1){
        return [1, ground_color];
    }else{
        return [RowInfo[1], MN_split_colors[RowInfo[0]]];
    }
}

/* ---------------------- 绘制各部分 ---------------------- */

function draw_MN_Ground(){
    /* 地面网格线 */
    for (let i = -Math.ceil(_B_ / 5); i < (drwW + BoL * 2) / 5; i++){
        drawline2D(i * 5 + BoW, 0, i * 5 + _B_ + BoW, _B_ - 1, ground_color);
    }

    /* 列号文字 */
    const fontSize = parseInt(_B_);

    let aft_which_MulMNspltr  = 0;
    let aft_which_MulMNspltr_ = (aft_which_MulMNspltr + 1 >= Multi_MN_spliter_inds.length)
                                ? Multi_MN_spliter_inds.length - 1
                                : aft_which_MulMNspltr + 1;
    let latest_MulMNspltr_i   = Multi_MN_spliter_inds[aft_which_MulMNspltr];
    let next_MulMNspltr_i     = Multi_MN_spliter_inds[aft_which_MulMNspltr_];

    for (let ind in MN_Col_info_List){
        const x = -1 + vArW * 0.5 + vArW * ind + BoW + BoL;
        const y = -2 + (floor_or_ceil == 'ceil' ? _B_ : drwH);
        let   index = parseInt(ind) + 1;

        if (parseInt(ind) >= next_MulMNspltr_i){
            aft_which_MulMNspltr  = (aft_which_MulMNspltr + 1 >= Multi_MN_spliter_inds.length)
                                    ? Multi_MN_spliter_inds.length - 1
                                    : aft_which_MulMNspltr + 1;
            aft_which_MulMNspltr_ = (aft_which_MulMNspltr + 1 >= Multi_MN_spliter_inds.length)
                                    ? Multi_MN_spliter_inds.length - 1
                                    : aft_which_MulMNspltr + 1;
            latest_MulMNspltr_i   = Multi_MN_spliter_inds[aft_which_MulMNspltr];
            next_MulMNspltr_i     = Multi_MN_spliter_inds[aft_which_MulMNspltr_];
        }
        if (parseInt(ind) >= latest_MulMNspltr_i){
            index -= latest_MulMNspltr_i + 1;
        }

        if (index == 0){
            drawline2D(BoW + BoL + ind * vArW + 0.5 * vArW, 0,
                       BoW + BoL + ind * vArW + 0.5 * vArW, drwH, ground_color);
        }else{
            svg_add('text', {
                x: x,
                y: y,
                'text-anchor': 'middle',        // 对应 ctx.textAlign = "center"
                'font-family': 'Arial, Helvetica, sans-serif',
                'font-size':   fontSize,        // 对应 ctx.font = Npx Arial
                fill:          font_color       // 对应 ctx.fillStyle
            }, '' + index);
        }
    }

    /* 左右两侧留白（盖住越界的网格线），对应 ctx.fillRect */
    svg_add('rect', {x: 0,                        y: 0, width: BoW,             height: drwH, fill: background_color});
    svg_add('rect', {x: drwW + BoW + BoL * 2,     y: 0, width: drwW + BoL * 2,  height: drwH, fill: background_color});
}

function draw_MN_Split_Lines(){
    for (let x in MN_Space_List){   // [SpC_i,count,[tags],drw_Start_H]
        const rowinfo = MN_Space_List[x].slice(0, 2);
        const styles  = get_MN_SpL_Style(rowinfo);
        let   i       = styles[0];
        const color   = styles[1];
        while (i > 0){
            const rowH = MN_Space_List[x][3] + MNHLGap * (i - 1);
            drawline2D(0 + BoW, rowH, drwW + BoW + BoL * 2, rowH, color);
            i -= 1;
        }
    }
}

function draw_MN_vArs(){
    for (let i in MN_Col_info_List){
        const col = MN_Col_info_List[i];
        for (let j in col){
            if (j == 0) continue;
            const row    = col[j];    // [SpC_i,count,fa_i,haStar,ind_in_total_row]
            const SpLH   = (row[1] - 1) * MNHLGap;
            const wi     = row[2] - 1;
            const haStar = row[3];
            const hi     = row[4];
            const style = get_MN_vAr_Style(row, i);
            if (style[0] > 0){
                const cur_vAr_color = style[1];
                const yTop = MN_Space_List[hi][3] + SpLH + vArH;
                const yBot = MN_Space_List[hi][3] + SpLH;
                const x1   = vArW * 0.5 + vArW * i  + BoW + BoL;
                const x2   = vArW * 0.5 + vArW * wi + BoW + BoL;

                drawline2D(x1, yTop, x2, yBot, cur_vAr_color, vArLW+haStar*(1+vArLW/2));
                drawline2D(x1, yTop, x1, yBot, cur_vAr_color, vArLW+haStar*(1+vArLW/2));
            }
        }
    }
}

/* ---------------------- 总入口 ---------------------- */

function draw(){
    init_svg();
    draw_MN_Ground();
    draw_MN_Split_Lines();
    draw_MN_vArs();
}
// 把 svg 序列化成带 XML 声明的字符串
function getSvgString() {
  if (!svg) return '';
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);

  // 确保有 xmlns
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // 加上 XML 声明
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
}

/* 把 <svg> 序列化成 dataURL，供 mysvgImg 使用 */
function svg_to_dataURL(){
    const src = new XMLSerializer().serializeToString(svg);
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src);
}

function downloadMNsvg(){
    const btnDownloadSvg_ = document.getElementById('btnDownloadSvg_a');
    btnDownloadSvg_.href = svg_to_dataURL();
    btnDownloadSvg_.download = "MN"+MN_Exp_Str_input+'.svg'; 
}
function downloadMNpic(){
    const btnDownloadPng_ = document.getElementById('btnDownloadPng_a');
    const svgDataUrl = getSvgString();
    btnDownloadPng_.href = svgDataUrl;
    btnDownloadPng_.download ="MN"+MN_Exp_Str_input+".png";
}