    /**
 * Created by why on 2015/11/27.
 */
    function slide(){
        this.c=0;
        this.id;
        this.lineHeight=1;
        this.interval="100";
        this.speed="100";
    }
    slide.prototype.listScroll = function(options) {
            var self = this;
            //self.c= options.c;
            self.interval = options.interval||self.interval;
            self.speed = options.speed||self.speed;
            self.lineHeight = options.lineHeight||self.lineHeight;
            self.id=options.id;
            var o =document.getElementById(self.id);

            var _ = Function;
            with(o) {
                if(o.offsetHeight < o.scrollHeight)
                    innerHTML+=innerHTML;
                // onmouseover=function(){self.c=1;};
                // onmouseout=function(){self.c=0;};
            }
           self.fun();
        }
    slide.prototype.fun=function(){

        var self = this;
        var o =document.getElementById(self.id);
        if(!o){
            return;
        }
        if(o.scrollTop%self.lineHeight || !self.c){
            o.scrollTop ++;
            o.scrollTop%=o.scrollHeight>>1;
        }
        setTimeout(function(){
            self.fun();
        },o.scrollTop%self.lineHeight?self.speed:self.interval);
    }