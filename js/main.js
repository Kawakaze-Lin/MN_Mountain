function MwM(){alert(' ( = w = ) ')}
function main(inputer_or_slideer){
    //get
    get_MN_input()
    get_Colors()
    get_draw_args(inputer_or_slideer)
    //prase
    parse_MN();
    //setter
    set_draw_args(!inputer_or_slideer)
    setupButtons()
    setCSS()
    //draw
    init_svg()
    draw()
}