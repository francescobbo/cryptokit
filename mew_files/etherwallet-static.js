!function(){function t(t){for(var e=0;e<a.length;e++)a[e]=0;for(var e=0;e<t.length;e++)a[e%4]=(a[e%4]<<5)-a[e%4]+t.charCodeAt(e)}function e(){var t=a[0]^a[0]<<11;return a[0]=a[1],a[1]=a[2],a[2]=a[3],a[3]=a[3]^a[3]>>19^t^t>>8,(a[3]>>>0)/(1<<31>>>0)}function o(){return"hsl("+Math.floor(360*e())+","+(60*e()+40)+"%,"+25*(e()+e()+e()+e())+"%)"}function r(t){for(var o=t,r=t,i=Math.ceil(o/2),n=o-i,a=[],s=0;s<r;s++){for(var l=[],h=0;h<i;h++)l[h]=Math.floor(2.3*e());var u=l.slice(0,n);u.reverse(),l=l.concat(u);for(var d=0;d<l.length;d++)a.push(l[d])}return a}function i(t,e,o,r,i){var n=document.createElement("canvas"),a=Math.sqrt(t.length);n.width=n.height=a*o;var s=n.getContext("2d");s.fillStyle=r,s.fillRect(0,0,n.width,n.height),s.fillStyle=e;for(var l=0;l<t.length;l++){var h=Math.floor(l/a),u=l%a;s.fillStyle=1==t[l]?e:i,t[l]&&s.fillRect(u*o,h*o,o,o)}return n}function n(e){e=e||{};var n=e.size||8,a=e.scale||4;t(e.seed||Math.floor(Math.random()*Math.pow(10,16)).toString(16));var s=e.color||o(),l=e.bgcolor||o(),h=e.spotcolor||o();return i(r(n),s,a,l,h)}var a=new Array(4);window.blockies={create:n}}(),function(t){"undefined"!=typeof module&&"object"==typeof exports?"undefined"!=typeof window?module.exports=t():module.exports=t:window.Modal=t()}(function(){var t=function(t,e){e=e||{},this.isIE=null!=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent)&&parseFloat(RegExp.$1),this.modal="object"==typeof t?t:document.querySelector(t),this.options={},this.options.backdrop="false"!==e.backdrop,this.options.keyboard="false"!==e.keyboard,this.options.content=e.content,this.duration=e.duration||300,this.options.duration=this.isIE&&this.isIE<10?0:this.duration,this.scrollbarWidth=0,this.dialog=this.modal.querySelector(".modal-dialog"),this.timer=0,this.init()},e=function(){var t=document.documentElement.getBoundingClientRect();return window.innerWidth||t.right-Math.abs(t.left)};t.prototype={init:function(){this.actions(),this.trigger(),this.options.content&&void 0!==this.options.content&&this.content(this.options.content)},actions:function(){var t=this;this.open=function(){this._open()},this.close=function(){this._close()},this._open=function(){var e=document.querySelector(".modal.in");e&&(clearTimeout(e.getAttribute("data-timer")),this.removeClass(e,"in"),setTimeout(function(){e.setAttribute("aria-hidden",!0),e.style.display=""},t.options.duration/2)),this.options.backdrop?this.createOverlay():this.overlay=null,this.overlay&&setTimeout(function(){t.addClass(t.overlay,"in")},0),clearTimeout(t.modal.getAttribute("data-timer")),this.timer=setTimeout(function(){t.modal.style.display="block",t.checkScrollbar(),t.adjustDialog(),t.setScrollbar(),t.resize(),t.dismiss(),t.keydown(),t.addClass(document.body,"modal-open"),t.addClass(t.modal,"in"),t.modal.setAttribute("aria-hidden",!1)},t.options.duration/2),this.modal.setAttribute("data-timer",t.timer)},this._close=function(){this.overlay&&this.removeClass(this.overlay,"in"),this.removeClass(this.modal,"in"),this.modal.setAttribute("aria-hidden",!0),clearTimeout(t.modal.getAttribute("data-timer")),this.timer=setTimeout(function(){t.removeClass(document.body,"modal-open"),t.resize(),t.resetAdjustments(),t.resetScrollbar(),t.dismiss(),t.keydown(),t.modal.style.display=""},t.options.duration/2),this.modal.setAttribute("data-timer",t.timer),setTimeout(function(){document.querySelector(".modal.in")||t.removeOverlay()},t.options.duration)},this.content=function(t){return this.modal.querySelector(".modal-content").innerHTML=t},this.createOverlay=function(){var t=document.createElement("div"),e=document.querySelector(".modal-backdrop");t.setAttribute("class","modal-backdrop fade"),e?this.overlay=e:(this.overlay=t,document.body.appendChild(t))},this.removeOverlay=function(){var t=document.querySelector(".modal-backdrop");null!==t&&void 0!==t&&document.body.removeChild(t)},this.keydown=function(){function e(e){t.options.keyboard&&27==e.which&&t.close()}/in/.test(this.modal.className)?document.removeEventListener("keydown",e,!1):document.addEventListener("keydown",e,!1)},this.trigger=function(){var e=document.querySelectorAll('[data-toggle="modal"]'),o=e.length,r=0;for(r;r<o;r++)e[r].addEventListener("click",function(e){var o=e.target,r=o.getAttribute("data-target")&&o.getAttribute("data-target").replace("#","")||o.getAttribute("href")&&o.getAttribute("href").replace("#","");document.getElementById(r)===t.modal&&t.open()})},this._resize=function(){var t=this.overlay||document.querySelector(".modal-backdrop"),e={w:document.documentElement.clientWidth+"px",h:document.documentElement.clientHeight+"px"};null!==t&&/in/.test(t.className)&&(t.style.height=e.h,t.style.width=e.w)},this.oneResize=function(){function e(){t._resize(),t.handleUpdate(),window.removeEventListener("resize",e,!1)}window.addEventListener("resize",e,!1)},this.resize=function(){/in/.test(this.modal.className)?window.removeEventListener("resize",this.oneResize,!1):window.addEventListener("resize",this.oneResize,!1)},this.dismiss=function(){function e(e){"modal"!==e.target.parentNode.getAttribute("data-dismiss")&&"modal"!==e.target.getAttribute("data-dismiss")&&e.target!==t.modal||(e.preventDefault(),t.close())}/in/.test(this.modal.className)?this.modal.removeEventListener("click",e,!1):this.modal.addEventListener("click",e,!1)},this.handleUpdate=function(){this.adjustDialog()},this.adjustDialog=function(){this.modal.style.paddingLeft=!this.bodyIsOverflowing&&this.modalIsOverflowing?this.scrollbarWidth+"px":"",this.modal.style.paddingRight=this.bodyIsOverflowing&&!this.modalIsOverflowing?this.scrollbarWidth+"px":""},this.resetAdjustments=function(){this.modal.style.paddingLeft="",this.modal.style.paddingRight=""},this.checkScrollbar=function(){this.bodyIsOverflowing=document.body.clientWidth<e(),this.modalIsOverflowing=this.modal.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},this.setScrollbar=function(){var t=window.getComputedStyle(document.body),e=parseInt(t.paddingRight,10);this.bodyIsOverflowing&&(document.body.style.paddingRight=e+this.scrollbarWidth+"px")},this.resetScrollbar=function(){document.body.style.paddingRight=""},this.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e},this.addClass=function(t,e){t.classList?t.classList.add(e):t.className+=" "+e},this.removeClass=function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(e,"").replace(/^\s+|\s+$/g,"")}}};var o=document.querySelectorAll(".modal"),r=o.length,i=0;for(i;i<r;i++){var n=o[i],a={};a.keyboard=n.getAttribute("data-keyboard"),a.backdrop=n.getAttribute("data-backdrop"),a.duration=n.getAttribute("data-duration"),new t(n,a)}return t});var QRCode;!function(){function t(t){this.mode=l.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=[],o=0,r=this.data.length;r>o;o++){var i=this.data.charCodeAt(o);i>65536?(e[0]=240|(1835008&i)>>>18,e[1]=128|(258048&i)>>>12,e[2]=128|(4032&i)>>>6,e[3]=128|63&i):i>2048?(e[0]=224|(61440&i)>>>12,e[1]=128|(4032&i)>>>6,e[2]=128|63&i):i>128?(e[0]=192|(1984&i)>>>6,e[1]=128|63&i):e[0]=i,this.parsedData=this.parsedData.concat(e)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function o(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var o=0;o<t.length&&0==t[o];)o++;this.num=new Array(t.length-o+e);for(var r=0;r<t.length-o;r++)this.num[r]=t[r+o]}function r(t,e){this.totalCount=t,this.dataCount=e}function i(){this.buffer=[],this.length=0}function n(){var t=!1,e=navigator.userAgent;return/android/i.test(e)&&(t=!0,aMat=e.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(t=parseFloat(aMat[1]))),t}function a(t,e){for(var o=1,r=s(t),i=0,n=g.length;n>=i;i++){var a=0;switch(e){case h.L:a=g[i][0];break;case h.M:a=g[i][1];break;case h.Q:a=g[i][2];break;case h.H:a=g[i][3]}if(a>=r)break;o++}if(o>g.length)throw new Error("Too long data");return o}function s(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}t.prototype={getLength:function(){return this.parsedData.length},write:function(t){for(var e=0,o=this.parsedData.length;o>e;e++)t.put(this.parsedData[e],8)}},e.prototype={addData:function(e){var o=new t(e);this.dataList.push(o),this.dataCache=null},isDark:function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,o){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++)this.modules[r][i]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,o),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,o)},setupPositionProbePattern:function(t,e){for(var o=-1;7>=o;o++)if(!(-1>=t+o||this.moduleCount<=t+o))for(var r=-1;7>=r;r++)-1>=e+r||this.moduleCount<=e+r||(this.modules[t+o][e+r]=o>=0&&6>=o&&(0==r||6==r)||r>=0&&6>=r&&(0==o||6==o)||o>=2&&4>=o&&r>=2&&4>=r)},getBestMaskPattern:function(){for(var t=0,e=0,o=0;8>o;o++){this.makeImpl(!0,o);var r=d.getLostPoint(this);(0==o||t>r)&&(t=r,e=o)}return e},createMovieClip:function(t,e,o){var r=t.createEmptyMovieClip(e,o);this.make();for(var i=0;i<this.modules.length;i++)for(var n=1*i,a=0;a<this.modules[i].length;a++){var s=1*a,l=this.modules[i][a];l&&(r.beginFill(0,100),r.moveTo(s,n),r.lineTo(s+1,n),r.lineTo(s+1,n+1),r.lineTo(s,n+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=0==e%2)},setupPositionAdjustPattern:function(){for(var t=d.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var o=0;o<t.length;o++){var r=t[e],i=t[o];if(null==this.modules[r][i])for(var n=-2;2>=n;n++)for(var a=-2;2>=a;a++)this.modules[r+n][i+a]=-2==n||2==n||-2==a||2==a||0==n&&0==a}},setupTypeNumber:function(t){for(var e=d.getBCHTypeNumber(this.typeNumber),o=0;18>o;o++){var r=!t&&1==(1&e>>o);this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=r}for(var o=0;18>o;o++){var r=!t&&1==(1&e>>o);this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=r}},setupTypeInfo:function(t,e){for(var o=this.errorCorrectLevel<<3|e,r=d.getBCHTypeInfo(o),i=0;15>i;i++){var n=!t&&1==(1&r>>i);6>i?this.modules[i][8]=n:8>i?this.modules[i+1][8]=n:this.modules[this.moduleCount-15+i][8]=n}for(var i=0;15>i;i++){var n=!t&&1==(1&r>>i);8>i?this.modules[8][this.moduleCount-i-1]=n:9>i?this.modules[8][15-i-1+1]=n:this.modules[8][15-i-1]=n}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var o=-1,r=this.moduleCount-1,i=7,n=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var s=0;2>s;s++)if(null==this.modules[r][a-s]){var l=!1;n<t.length&&(l=1==(1&t[n]>>>i));var h=d.getMask(e,r,a-s);h&&(l=!l),this.modules[r][a-s]=l,-1==--i&&(n++,i=7)}if(0>(r+=o)||this.moduleCount<=r){r-=o,o=-o;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,o,n){for(var a=r.getRSBlocks(t,o),s=new i,l=0;l<n.length;l++){var h=n[l];s.put(h.mode,4),s.put(h.getLength(),d.getLengthInBits(h.mode,t)),h.write(s)}for(var u=0,l=0;l<a.length;l++)u+=a[l].dataCount;if(s.getLengthInBits()>8*u)throw new Error("code length overflow. ("+s.getLengthInBits()+">"+8*u+")");for(s.getLengthInBits()+4<=8*u&&s.put(0,4);0!=s.getLengthInBits()%8;)s.putBit(!1);for(;!(s.getLengthInBits()>=8*u)&&(s.put(e.PAD0,8),!(s.getLengthInBits()>=8*u));)s.put(e.PAD1,8);return e.createBytes(s,a)},e.createBytes=function(t,e){for(var r=0,i=0,n=0,a=new Array(e.length),s=new Array(e.length),l=0;l<e.length;l++){var h=e[l].dataCount,u=e[l].totalCount-h;i=Math.max(i,h),n=Math.max(n,u),a[l]=new Array(h);for(var c=0;c<a[l].length;c++)a[l][c]=255&t.buffer[c+r];r+=h;var f=d.getErrorCorrectPolynomial(u),g=new o(a[l],f.getLength()-1),m=g.mod(f);s[l]=new Array(f.getLength()-1);for(var c=0;c<s[l].length;c++){var p=c+m.getLength()-s[l].length;s[l][c]=p>=0?m.get(p):0}}for(var v=0,c=0;c<e.length;c++)v+=e[c].totalCount;for(var y=new Array(v),_=0,c=0;i>c;c++)for(var l=0;l<e.length;l++)c<a[l].length&&(y[_++]=a[l][c]);for(var c=0;n>c;c++)for(var l=0;l<e.length;l++)c<s[l].length&&(y[_++]=s[l][c]);return y};for(var l={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},h={L:1,M:0,Q:3,H:2},u={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},d={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;d.getBCHDigit(e)-d.getBCHDigit(d.G15)>=0;)e^=d.G15<<d.getBCHDigit(e)-d.getBCHDigit(d.G15);return(t<<10|e)^d.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;d.getBCHDigit(e)-d.getBCHDigit(d.G18)>=0;)e^=d.G18<<d.getBCHDigit(e)-d.getBCHDigit(d.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return d.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,o){switch(t){case u.PATTERN000:return 0==(e+o)%2;case u.PATTERN001:return 0==e%2;case u.PATTERN010:return 0==o%3;case u.PATTERN011:return 0==(e+o)%3;case u.PATTERN100:return 0==(Math.floor(e/2)+Math.floor(o/3))%2;case u.PATTERN101:return 0==e*o%2+e*o%3;case u.PATTERN110:return 0==(e*o%2+e*o%3)%2;case u.PATTERN111:return 0==(e*o%3+(e+o)%2)%2;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new o([1],0),r=0;t>r;r++)e=e.multiply(new o([1,c.gexp(r)],0));return e},getLengthInBits:function(t,e){if(e>=1&&10>e)switch(t){case l.MODE_NUMBER:return 10;case l.MODE_ALPHA_NUM:return 9;case l.MODE_8BIT_BYTE:case l.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(27>e)switch(t){case l.MODE_NUMBER:return 12;case l.MODE_ALPHA_NUM:return 11;case l.MODE_8BIT_BYTE:return 16;case l.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(41>e))throw new Error("type:"+e);switch(t){case l.MODE_NUMBER:return 14;case l.MODE_ALPHA_NUM:return 13;case l.MODE_8BIT_BYTE:return 16;case l.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),o=0,r=0;e>r;r++)for(var i=0;e>i;i++){for(var n=0,a=t.isDark(r,i),s=-1;1>=s;s++)if(!(0>r+s||r+s>=e))for(var l=-1;1>=l;l++)0>i+l||i+l>=e||(0!=s||0!=l)&&a==t.isDark(r+s,i+l)&&n++;n>5&&(o+=3+n-5)}for(var r=0;e-1>r;r++)for(var i=0;e-1>i;i++){var h=0;t.isDark(r,i)&&h++,t.isDark(r+1,i)&&h++,t.isDark(r,i+1)&&h++,t.isDark(r+1,i+1)&&h++,(0==h||4==h)&&(o+=3)}for(var r=0;e>r;r++)for(var i=0;e-6>i;i++)t.isDark(r,i)&&!t.isDark(r,i+1)&&t.isDark(r,i+2)&&t.isDark(r,i+3)&&t.isDark(r,i+4)&&!t.isDark(r,i+5)&&t.isDark(r,i+6)&&(o+=40);for(var i=0;e>i;i++)for(var r=0;e-6>r;r++)t.isDark(r,i)&&!t.isDark(r+1,i)&&t.isDark(r+2,i)&&t.isDark(r+3,i)&&t.isDark(r+4,i)&&!t.isDark(r+5,i)&&t.isDark(r+6,i)&&(o+=40);for(var u=0,i=0;e>i;i++)for(var r=0;e>r;r++)t.isDark(r,i)&&u++;return o+=Math.abs(100*u/e/e-50)/5*10}},c={glog:function(t){if(1>t)throw new Error("glog("+t+")");return c.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return c.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},f=0;8>f;f++)c.EXP_TABLE[f]=1<<f;for(var f=8;256>f;f++)c.EXP_TABLE[f]=c.EXP_TABLE[f-4]^c.EXP_TABLE[f-5]^c.EXP_TABLE[f-6]^c.EXP_TABLE[f-8];for(var f=0;255>f;f++)c.LOG_TABLE[c.EXP_TABLE[f]]=f;o.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<t.getLength();i++)e[r+i]^=c.gexp(c.glog(this.get(r))+c.glog(t.get(i)));return new o(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=c.glog(this.get(0))-c.glog(t.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(var i=0;i<t.getLength();i++)r[i]^=c.gexp(c.glog(t.get(i))+e);return new o(r,0).mod(t)}},r.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r.getRSBlocks=function(t,e){var o=r.getRsBlockTable(t,e);if(void 0==o)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var i=o.length/3,n=[],a=0;i>a;a++)for(var s=o[3*a+0],l=o[3*a+1],h=o[3*a+2],u=0;s>u;u++)n.push(new r(l,h));return n},r.getRsBlockTable=function(t,e){switch(e){case h.L:return r.RS_BLOCK_TABLE[4*(t-1)+0];case h.M:return r.RS_BLOCK_TABLE[4*(t-1)+1];case h.Q:return r.RS_BLOCK_TABLE[4*(t-1)+2];case h.H:return r.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},i.prototype={get:function(t){var e=Math.floor(t/8);return 1==(1&this.buffer[e]>>>7-t%8)},put:function(t,e){for(var o=0;e>o;o++)this.putBit(1==(1&t>>>e-o-1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var g=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],m=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){function e(t,e){var o=document.createElementNS("http://www.w3.org/2000/svg",t);for(var r in e)e.hasOwnProperty(r)&&o.setAttribute(r,e[r]);return o}var o=this._htOption,r=this._el,i=t.getModuleCount();Math.floor(o.width/i),Math.floor(o.height/i),this.clear();var n=e("svg",{viewBox:"0 0 "+String(i)+" "+String(i),width:"100%",height:"100%",fill:o.colorLight});n.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),r.appendChild(n),n.appendChild(e("rect",{fill:o.colorDark,width:"1",height:"1",id:"template"}));for(var a=0;i>a;a++)for(var s=0;i>s;s++)if(t.isDark(a,s)){var l=e("use",{x:String(a),y:String(s)});l.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),n.appendChild(l)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),p="svg"===document.documentElement.tagName.toLowerCase(),v=p?m:function(){return"undefined"!=typeof CanvasRenderingContext2D}()?function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function e(t,e){var o=this;if(o._fFail=e,o._fSuccess=t,null===o._bSupportDataURI){var r=document.createElement("img"),i=function(){o._bSupportDataURI=!1,o._fFail&&_fFail.call(o)},n=function(){o._bSupportDataURI=!0,o._fSuccess&&o._fSuccess.call(o)};return r.onabort=i,r.onerror=i,r.onload=n,void(r.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===o._bSupportDataURI&&o._fSuccess?o._fSuccess.call(o):!1===o._bSupportDataURI&&o._fFail&&o._fFail.call(o)}if(this._android&&this._android<=2.1){var o=1/window.devicePixelRatio,r=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,e,i,n,a,s,l,h){if("nodeName"in t&&/img/i.test(t.nodeName))for(var u=arguments.length-1;u>=1;u--)arguments[u]=arguments[u]*o;else void 0===h&&(arguments[1]*=o,arguments[2]*=o,arguments[3]*=o,arguments[4]*=o);r.apply(this,arguments)}}var i=function(t,e){this._bIsPainted=!1,this._android=n(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return i.prototype.draw=function(t){var e=this._elImage,o=this._oContext,r=this._htOption,i=t.getModuleCount(),n=r.width/i,a=r.height/i,s=Math.round(n),l=Math.round(a);e.style.display="none",this.clear();for(var h=0;i>h;h++)for(var u=0;i>u;u++){var d=t.isDark(h,u),c=u*n,f=h*a;o.strokeStyle=d?r.colorDark:r.colorLight,o.lineWidth=1,o.fillStyle=d?r.colorDark:r.colorLight,o.fillRect(c,f,n,a),o.strokeRect(Math.floor(c)+.5,Math.floor(f)+.5,s,l),o.strokeRect(Math.ceil(c)-.5,Math.ceil(f)-.5,s,l)}this._bIsPainted=!0},i.prototype.makeImage=function(){this._bIsPainted&&e.call(this,t)},i.prototype.isPainted=function(){return this._bIsPainted},i.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},i.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},i}():function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,o=this._el,r=t.getModuleCount(),i=Math.floor(e.width/r),n=Math.floor(e.height/r),a=['<table style="border:0;border-collapse:collapse;">'],s=0;r>s;s++){a.push("<tr>");for(var l=0;r>l;l++)a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+i+"px;height:"+n+"px;background-color:"+(t.isDark(s,l)?e.colorDark:e.colorLight)+';"></td>');a.push("</tr>")}a.push("</table>"),o.innerHTML=a.join("");var h=o.childNodes[0],u=(e.width-h.offsetWidth)/2,d=(e.height-h.offsetHeight)/2;u>0&&d>0&&(h.style.margin=d+"px "+u+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}();QRCode=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:h.H},"string"==typeof e&&(e={text:e}),e)for(var o in e)this._htOption[o]=e[o];"string"==typeof t&&(t=document.getElementById(t)),this._android=n(),this._el=t,this._oQRCode=null,this._oDrawing=new v(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(t){this._oQRCode=new e(a(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=h}();