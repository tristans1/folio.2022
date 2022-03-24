/**
 * WIP
 * */

export default {
    onMouseMove(targetX, targetY) {
        console.log(targetY);
        window.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY + window.pageYOffset;
        });
    },
    onScrollMove() {
        window.addEventListener('scroll', () => {
            this.targetY += window.pageYOffset - this.lastScrollOffset;
            this.lastScrollOffset = window.pageYOffset;
        });
    },

}



