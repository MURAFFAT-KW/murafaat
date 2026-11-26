/* أقنعني — ملف مشترك لكل الألعاب: الأصوات والحركات، كرت الشكر والملاحظات، وضع التلفزيون، ثبات الاتصال، الشرح التفاعلي، السجل والشارات، وتثبيت التطبيق. الإصدار 2026-11-24c */
(function(){if(document.getElementById("aq-pro-css"))return;var st=document.createElement("style");st.id="aq-pro-css";st.textContent=".podium.aq-reveal .pod{animation:aqRise .75s cubic-bezier(.2,.9,.25,1.15) both}\n.podium.aq-reveal .pod.p3,.podium.aq-reveal .pod.b{animation-delay:.2s}\n.podium.aq-reveal .pod.p2,.podium.aq-reveal .pod.s{animation-delay:.65s}\n.podium.aq-reveal .pod.p1,.podium.aq-reveal .pod.g{animation-delay:1.15s}\n.podium.aq-reveal .pod.p1 .md,.podium.aq-reveal .pod.g .md{animation:aqPop .7s cubic-bezier(.2,.9,.25,1.4) 1.75s both,aqFloat 2.6s ease-in-out 2.5s infinite}\n.podium.aq-reveal::before{animation-delay:1.6s}\n.podium.aq-reveal::after{animation:aqBeam 1.2s ease 1.3s both}\n@keyframes aqRise{from{opacity:0;transform:translateY(46px)}to{opacity:1;transform:none}}\n@keyframes aqPop{0%{opacity:0;transform:scale(.2) rotate(-25deg)}70%{opacity:1;transform:scale(1.18) rotate(6deg)}100%{transform:none}}\n@keyframes aqBeam{from{opacity:0}to{opacity:1}}\n[data-ring].low{animation:aqLow 1s ease-in-out infinite}\n@keyframes aqLow{50%{transform:scale(1.045)}}\nbody.aq-timeup [data-ring],body.aq-timeup #timerBox,body.aq-timeup [data-clock]{animation:aqShake .5s ease both}\n@keyframes aqShake{20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}\n@media (prefers-reduced-motion:reduce){.podium.aq-reveal .pod,.podium.aq-reveal .pod .md,[data-ring].low,body.aq-timeup *{animation:none!important}}\n.aq-end{margin:18px 0 8px;display:grid;gap:12px}\n.aq-thanks{position:relative;overflow:hidden;border-radius:22px;padding:22px 18px 20px;text-align:center;color:#12203A;background:linear-gradient(160deg,#FFF8E1,#FFFFFF 55%,#EEF4FF);border:1px solid #F3E3B0;box-shadow:0 12px 26px -16px rgba(18,32,58,.4)}\n.aq-thanks::before{content:\"\";position:absolute;inset:-40% -20% auto auto;width:180px;height:180px;border-radius:50%;background:rgba(251,198,17,.16)}\n.aq-heart{font-size:42px;line-height:1;margin-bottom:6px;animation:aqBeat 1.6s ease-in-out infinite}\n@keyframes aqBeat{15%{transform:scale(1.15)}30%{transform:scale(1)}45%{transform:scale(1.1)}60%{transform:scale(1)}}\n.aq-thanks h2{margin:0 0 8px;font-size:1.35rem;color:#0554A4}\n.aq-thanks p{margin:4px 0;line-height:1.75;color:#3B4659}\n.aq-thanks .aq-bye{margin-top:10px;font-weight:800;color:#DE0921}\n.aq-fb{border:1px solid #E3E8F0;border-radius:20px;padding:16px;background:#fff;display:grid;gap:10px;text-align:center}\n.aq-fb h3{margin:0;font-size:1.05rem}\n.aqfb-faces{display:flex;justify-content:center;gap:6px}\n.aqfb-faces button{font-size:28px;line-height:1;width:50px;height:50px;border-radius:14px;border:1.5px solid #E3E8F0;background:#F7F9FC;filter:grayscale(.6);opacity:.75}\n.aqfb-faces button.on{filter:none;opacity:1;border-color:#FBC611;background:#FFF6D6;transform:scale(1.08)}\n#aqfbt{width:100%;box-sizing:border-box;border:1.5px solid #D5DBE5;border-radius:14px;padding:10px 12px;font:inherit;resize:vertical;min-height:72px}\n.aqfb-send{border:0;border-radius:14px;padding:12px;font-weight:800;font-size:1rem;font-family:inherit;background:#12203A;color:#fff}\n.aqfb-err{font-size:.85rem;color:#DE0921;min-height:1em}\n.aqfb-ok{padding:10px;font-weight:800;color:#16A34A}\n@media (prefers-reduced-motion:reduce){.aq-heart{animation:none}}\nhtml.aq-tv body{background:#F4F6FA}\nhtml.aq-tv #app{max-width:720px;margin-left:auto;margin-right:auto}\nhtml.aq-tv .card,html.aq-tv section.card{box-shadow:0 10px 30px -18px rgba(18,32,58,.35)}\nhtml.aq-tv [data-clock]{letter-spacing:.5px}\n#aqnet{position:fixed;left:50%;top:max(8px,env(safe-area-inset-top));transform:translate(-50%,0);z-index:9999;border-radius:99px;padding:8px 16px;font:700 .88rem/1.4 \"Readex Pro\",\"Alexandria\",system-ui,sans-serif;box-shadow:0 8px 20px -8px rgba(0,0,0,.35);transition:transform .3s ease,opacity .3s ease;white-space:nowrap;display:flex;align-items:center;gap:8px}\n#aqnet.off{background:#12203A;color:#fff}\n#aqnet.on{background:#16A34A;color:#fff}\n#aqnet.hide{opacity:0;transform:translate(-50%,-140%);pointer-events:none}\n#aqnet .dot{width:9px;height:9px;border-radius:50%;background:#FBC611;animation:aqBlink 1s ease-in-out infinite}\n@keyframes aqBlink{50%{opacity:.25}}\n.aqt-open{display:block;width:100%;margin-top:10px;border:1.5px dashed #C9D2E0;background:#fff;border-radius:16px;padding:12px;font-weight:700;font-size:.98rem;font-family:inherit;color:#12203A}\n.aqt-ov{position:fixed;inset:0;z-index:10000;background:rgba(18,26,43,.55);display:flex;align-items:flex-end;justify-content:center;animation:aqtFade .2s ease both}\n@keyframes aqtFade{from{opacity:0}}\n.aqt-sheet{position:relative;width:100%;max-width:520px;max-height:92vh;overflow:auto;background:#fff;border-radius:26px 26px 0 0;padding:22px 20px calc(22px + env(safe-area-inset-bottom));text-align:center;animation:aqtUp .3s cubic-bezier(.2,.9,.25,1) both;font-family:\"Readex Pro\",\"Alexandria\",system-ui,sans-serif;color:#12203A}\n@keyframes aqtUp{from{transform:translateY(40px);opacity:.4}}\n.aqt-x{position:absolute;top:12px;inset-inline-end:12px;width:36px;height:36px;border-radius:50%;border:0;background:#F1F3F7;font-size:15px;color:#41506A}\n.aqt-step{display:inline-block;font-size:.78rem;font-weight:800;color:var(--c);background:color-mix(in srgb,var(--c) 12%,#fff);border-radius:99px;padding:3px 12px}\n.aqt-ic{width:110px;height:110px;margin:16px auto 10px;border-radius:32px;display:grid;place-items:center;font-size:58px;background:radial-gradient(circle at 35% 30%,#fff,color-mix(in srgb,var(--c) 18%,#fff));box-shadow:inset 0 -6px 0 color-mix(in srgb,var(--c) 22%,#fff),0 12px 24px -14px var(--c);animation:aqtPop .45s cubic-bezier(.2,.9,.25,1.4) both}\n@keyframes aqtPop{from{transform:scale(.6) rotate(-8deg);opacity:0}}\n.aqt-sheet h2{margin:4px 0 8px;font-size:1.45rem;color:var(--c)}\n.aqt-sheet p{margin:0 auto;max-width:34ch;line-height:1.85;color:#3B4659;font-size:1.02rem;min-height:5.5em}\n.aqt-dots{display:flex;justify-content:center;gap:6px;margin:14px 0}\n.aqt-dots i{width:8px;height:8px;border-radius:99px;background:#D9DEE7;transition:all .2s}\n.aqt-dots i.on{width:22px;background:var(--c)}\n.aqt-nav{display:grid;grid-template-columns:1fr 2fr;gap:10px}\n.aqt-nav button{border:0;border-radius:16px;padding:14px;font-weight:800;font-size:1rem;font-family:inherit}\n.aqt-nav .go{background:var(--c);color:#fff;box-shadow:inset 0 -3px 0 rgba(0,0,0,.15)}\n.aqt-nav .ghost{background:#F1F3F7;color:#41506A}\n.aqs-toast{position:fixed;left:50%;top:max(14px,env(safe-area-inset-top));transform:translateX(-50%);z-index:10001;display:flex;align-items:center;gap:12px;background:#12203A;color:#fff;border-radius:18px;padding:10px 18px 10px 12px;box-shadow:0 14px 30px -10px rgba(0,0,0,.45);animation:aqsIn .5s cubic-bezier(.2,.9,.25,1.3) both;font-family:\"Readex Pro\",\"Alexandria\",system-ui,sans-serif}\n.aqs-toast.out{opacity:0;transform:translate(-50%,-30px);transition:all .4s}\n@keyframes aqsIn{from{opacity:0;transform:translate(-50%,-40px) scale(.9)}}\n.aqs-toast .ic{font-size:30px;width:44px;height:44px;border-radius:14px;background:rgba(251,198,17,.18);display:grid;place-items:center}\n.aqs-toast small{display:block;color:#FBC611;font-size:.72rem;font-weight:800}\n.aqs-toast b{font-size:1rem}\n.aqs-sum{margin-top:12px;display:inline-block;background:#fff;border:1px solid #E7DDB8;border-radius:99px;padding:5px 14px;font-size:.85rem;font-weight:700;color:#41506A}\n.aqs h2{color:#0554A4;margin:0 0 12px}\n.aqs-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.aqs-kpi div{border-radius:16px;background:#F4F7FB;padding:10px;display:grid}\n.aqs-kpi b{font-size:1.6rem;color:#12203A}\n.aqs-kpi span{font-size:.8rem;color:#6B7489}\n.aqs-tbl{margin:14px 0;border:1px solid #E3E8F0;border-radius:16px;overflow:hidden}\n.aqs-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;padding:9px 12px;font-size:.9rem;text-align:center}\n.aqs-row span:first-child{text-align:start;font-weight:700}\n.aqs-row+.aqs-row{border-top:1px solid #EEF1F5}\n.aqs-row.h{background:#F7F9FC;color:#6B7489;font-size:.78rem}\n.aqs h3{text-align:start;margin:6px 0 10px;font-size:1rem}\n.aqs-badges{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.aqs-b{border:1px solid #E3E8F0;border-radius:16px;padding:10px 6px;display:grid;gap:2px;opacity:.55;filter:grayscale(1)}\n.aqs-b.on{opacity:1;filter:none;background:linear-gradient(180deg,#FFF8E1,#fff);border-color:#F3E3B0}\n.aqs-b .ic{font-size:28px}\n.aqs-b b{font-size:.8rem}\n.aqs-b small{font-size:.68rem;color:#6B7489;line-height:1.4}\n.aqs-note{font-size:.78rem;color:#8A94A8;margin:12px 0 0}\n#aqstat{position:fixed;top:max(10px,env(safe-area-inset-top));right:60px;z-index:60;width:40px;height:40px;border-radius:50%;background:#fff;border:1.5px solid #D5DBE5;display:grid;place-items:center;box-shadow:0 3px 10px rgba(18,32,58,.1);font-size:18px;line-height:1}\n.aqinv{display:grid;grid-template-columns:150px 1fr;gap:14px;align-items:center;margin-top:12px;padding:12px;border-radius:20px;background:linear-gradient(160deg,#fff,#F5F7FB);border:1.5px solid color-mix(in srgb,var(--gc) 30%,#E3E8F0)}\n.aqinv-qr{background:#fff;border-radius:14px;padding:6px;box-shadow:0 8px 18px -12px rgba(18,32,58,.4);border:3px solid var(--gc)}\n.aqinv-qr svg,.aqinv-bigqr svg{width:100%;height:auto;display:block}\n.aqinv-side{display:grid;gap:4px;min-width:0}\n.aqinv-side b{font-size:1.02rem;color:#12203A}\n.aqinv-side span{font-size:.82rem;color:#6B7489;line-height:1.5}\n.aqinv-side .aqinv-code{font:800 1.6rem/1.1 ui-monospace,Menlo,monospace;color:var(--gc);letter-spacing:2px;margin-top:4px}\n.aqinv-side small{font-size:.72rem;color:#8A94A8;margin-top:-2px}\n.aqinv-btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}\n.aqinv-btns button{border:0;border-radius:12px;padding:8px 12px;font-weight:800;font-size:.82rem;font-family:inherit;background:var(--gc);color:#fff}\n.aqinv-btns button+button{background:#EEF1F6;color:#12203A}\n.aqinv-ov{position:fixed;inset:0;z-index:10002;background:radial-gradient(120% 90% at 50% 0%,#22375F,#12203A 60%,#0A1426);display:grid;place-items:center;padding:20px;animation:aqtFade .2s ease both}\n.aqinv-full{width:min(92vw,560px);text-align:center;color:#fff;display:grid;gap:14px;justify-items:center;font-family:\"Readex Pro\",\"Alexandria\",system-ui,sans-serif}\n.aqinv-top{font-size:1rem;opacity:.85;display:flex;align-items:center;gap:8px}\n.aqinv-top .dot{width:10px;height:10px;border-radius:50%;background:var(--gc);box-shadow:0 0 0 4px color-mix(in srgb,var(--gc) 35%,transparent)}\n.aqinv-bigqr{width:min(78vw,62vh,460px);background:#fff;border-radius:28px;padding:16px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),0 0 0 6px var(--gc)}\n.aqinv-full h2{margin:4px 0 0;font-size:1.35rem;line-height:1.5}\n.aqinv-bigcode{font:800 2.6rem/1 ui-monospace,Menlo,monospace;letter-spacing:10px;background:rgba(255,255,255,.1);border-radius:16px;padding:10px 18px 10px 28px}\n.aqinv-close{border:0;border-radius:16px;padding:12px 22px;font-weight:800;font-size:1rem;font-family:inherit;background:#fff;color:#12203A}\n@media (max-width:480px){.aqinv{grid-template-columns:116px 1fr;gap:10px;padding:10px}.aqinv-side .aqinv-code{font-size:1.25rem;letter-spacing:1px;white-space:nowrap}.aqinv-side b{font-size:.95rem}.aqinv-btns button{padding:7px 10px;font-size:.78rem}}@media (max-width:360px){.aqinv{grid-template-columns:100px 1fr}}\n";(document.head||document.documentElement).appendChild(st);})();
/* QR code generator — QRCode for JavaScript, Copyright (c) 2009 Kazuhiko Arase, MIT license. "QR Code" is a registered trademark of DENSO WAVE INCORPORATED. Bundled for أقنعني. */
(function(){var M={};function req(n){n=n.replace("./","");var m=M[n];if(!m.l){m.l=1;m.f(m.m,m.m.exports,req);}return m.m.exports;}
M["QRMode"]={l:0,m:{exports:{}},f:function(module,exports,require){
module.exports = {
    MODE_NUMBER :       1 << 0,
    MODE_ALPHA_NUM :    1 << 1,
    MODE_8BIT_BYTE :    1 << 2,
    MODE_KANJI :        1 << 3
};

}};
M["QRErrorCorrectLevel"]={l:0,m:{exports:{}},f:function(module,exports,require){
module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};


}};
M["QRMaskPattern"]={l:0,m:{exports:{}},f:function(module,exports,require){
module.exports = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

}};
M["QRMath"]={l:0,m:{exports:{}},f:function(module,exports,require){
var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;

}};
M["QRPolynomial"]={l:0,m:{exports:{}},f:function(module,exports,require){
var QRMath = require('./QRMath');

function QRPolynomial(num, shift) {
	if (num.length === undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] === 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var x = 0; x < e.getLength(); x++) {
			num[x] ^= QRMath.gexp(QRMath.glog(e.get(x) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;

}};
M["QRUtil"]={l:0,m:{exports:{}},f:function(module,exports,require){
var QRMode = require('./QRMode');
var QRPolynomial = require('./QRPolynomial');
var QRMath = require('./QRMath');
var QRMaskPattern = require('./QRMaskPattern');

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],        
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );    
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );    
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data !== 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
        
        switch (maskPattern) {
            
        case QRMaskPattern.PATTERN000 : return (i + j) % 2 === 0;
        case QRMaskPattern.PATTERN001 : return i % 2 === 0;
        case QRMaskPattern.PATTERN010 : return j % 3 === 0;
        case QRMaskPattern.PATTERN011 : return (i + j) % 3 === 0;
        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 === 0;
        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 === 0;
        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 === 0;
        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 === 0;

        default :
            throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 10;
            case QRMode.MODE_ALPHA_NUM  : return 9;
            case QRMode.MODE_8BIT_BYTE  : return 8;
            case QRMode.MODE_KANJI      : return 8;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 27) {

            // 10 - 26

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 12;
            case QRMode.MODE_ALPHA_NUM  : return 11;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 10;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 41) {

            // 27 - 40

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 14;
            case QRMode.MODE_ALPHA_NUM  : return 13;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 12;
            default :
                throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {
        
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        var row = 0; 
        var col = 0;

        
        // LEVEL1
        
        for (row = 0; row < moduleCount; row++) {

            for (col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r === 0 && c === 0) {
                            continue;
                        }

                        if (dark === qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }

        // LEVEL2

        for (row = 0; row < moduleCount - 1; row++) {
            for (col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count === 0 || count === 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (row = 0; row < moduleCount; row++) {
            for (col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col) && 
                        !qrCode.isDark(row, col + 1) && 
                         qrCode.isDark(row, col + 2) && 
                         qrCode.isDark(row, col + 3) && 
                         qrCode.isDark(row, col + 4) && 
                        !qrCode.isDark(row, col + 5) && 
                         qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col) &&
                        !qrCode.isDark(row + 1, col) &&
                         qrCode.isDark(row + 2, col) &&
                         qrCode.isDark(row + 3, col) &&
                         qrCode.isDark(row + 4, col) &&
                        !qrCode.isDark(row + 5, col) &&
                         qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4
        
        var darkCount = 0;

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }
        
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;       
    }

};

module.exports = QRUtil;

}};
M["QR8bitByte"]={l:0,m:{exports:{}},f:function(module,exports,require){
var QRMode = require('./QRMode');

function QR8bitByte(data) {
	this.mode = QRMode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function() {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;

}};
M["QRBitBuffer"]={l:0,m:{exports:{}},f:function(module,exports,require){
function QRBitBuffer() {
	this.buffer = [];
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;

}};
M["QRRSBlock"]={l:0,m:{exports:{}},f:function(module,exports,require){
var QRErrorCorrectLevel = require('./QRErrorCorrectLevel');

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock === undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = [];
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
};

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case QRErrorCorrectLevel.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case QRErrorCorrectLevel.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case QRErrorCorrectLevel.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case QRErrorCorrectLevel.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
};

module.exports = QRRSBlock;

}};
M["index"]={l:0,m:{exports:{}},f:function(module,exports,require){
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of 
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
// Modified to work in node for this project (and some refactoring)
//---------------------------------------------------------------------

var QR8bitByte = require('./QR8bitByte');
var QRUtil = require('./QRUtil');
var QRPolynomial = require('./QRPolynomial');
var QRRSBlock = require('./QRRSBlock');
var QRBitBuffer = require('./QRBitBuffer');

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

QRCode.prototype = {
	
	addData : function(data) {
		var newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	},
	
	isDark : function(row, col) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	},

	getModuleCount : function() {
		return this.moduleCount;
	},
	
	make : function() {
		// Calculate automatically typeNumber if provided is < 1
		if (this.typeNumber < 1 ){
			var typeNumber = 1;
			for (typeNumber = 1; typeNumber < 40; typeNumber++) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

				var buffer = new QRBitBuffer();
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].dataCount;
				}

				for (var x = 0; x < this.dataList.length; x++) {
					var data = this.dataList[x];
					buffer.put(data.mode, 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
					data.write(buffer);
				}
				if (buffer.getLengthInBits() <= totalDataCount * 8)
					break;
			}
			this.typeNumber = typeNumber;
		}
		this.makeImpl(false, this.getBestMaskPattern() );
	},
	
	makeImpl : function(test, maskPattern) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (var row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (var col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
	
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache === null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
	
		this.mapData(this.dataCache, maskPattern);
	},

	setupPositionProbePattern : function(row, col)  {
		
		for (var r = -1; r <= 7; r++) {
			
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			
			for (var c = -1; c <= 7; c++) {
				
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				
				if ( (0 <= r && r <= 6 && (c === 0 || c === 6) ) || 
                     (0 <= c && c <= 6 && (r === 0 || r === 6) ) || 
                     (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}		
		}		
	},
	
	getBestMaskPattern : function() {
	
		var minLostPoint = 0;
		var pattern = 0;
	
		for (var i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			var lostPoint = QRUtil.getLostPoint(this);
	
			if (i === 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	},
	
	createMovieClip : function(target_mc, instance_name, depth) {
	
		var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		var cs = 1;
	
		this.make();

		for (var row = 0; row < this.modules.length; row++) {
			
			var y = row * cs;
			
			for (var col = 0; col < this.modules[row].length; col++) {
	
				var x = col * cs;
				var dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	},

	setupTimingPattern : function() {
		
		for (var r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] !== null) {
				continue;
			}
			this.modules[r][6] = (r % 2 === 0);
		}
	
		for (var c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] !== null) {
				continue;
			}
			this.modules[6][c] = (c % 2 === 0);
		}
	},
	
	setupPositionAdjustPattern : function() {
	
		var pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (var i = 0; i < pos.length; i++) {
		
			for (var j = 0; j < pos.length; j++) {
			
				var row = pos[i];
				var col = pos[j];
				
				if (this.modules[row][col] !== null) {
					continue;
				}
				
				for (var r = -2; r <= 2; r++) {
				
					for (var c = -2; c <= 2; c++) {
					
						if (Math.abs(r) === 2 || 
                            Math.abs(c) === 2 ||
                            (r === 0 && c === 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	},
	
	setupTypeNumber : function(test) {
	
		var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        var mod;
	
		for (var i = 0; i < 18; i++) {
			mod = (!test && ( (bits >> i) & 1) === 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (var x = 0; x < 18; x++) {
			mod = (!test && ( (bits >> x) & 1) === 1);
			this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;
		}
	},
	
	setupTypeInfo : function(test, maskPattern) {
	
		var data = (this.errorCorrectLevel << 3) | maskPattern;
		var bits = QRUtil.getBCHTypeInfo(data);
        var mod;
	
		// vertical		
		for (var v = 0; v < 15; v++) {
	
			mod = (!test && ( (bits >> v) & 1) === 1);
	
			if (v < 6) {
				this.modules[v][8] = mod;
			} else if (v < 8) {
				this.modules[v + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + v][8] = mod;
			}
		}
	
		// horizontal
		for (var h = 0; h < 15; h++) {
	
			mod = (!test && ( (bits >> h) & 1) === 1);
			
			if (h < 8) {
				this.modules[8][this.moduleCount - h - 1] = mod;
			} else if (h < 9) {
				this.modules[8][15 - h - 1 + 1] = mod;
			} else {
				this.modules[8][15 - h - 1] = mod;
			}
		}
	
		// fixed module
		this.modules[this.moduleCount - 8][8] = (!test);
	
	},
	
	mapData : function(data, maskPattern) {
		
		var inc = -1;
		var row = this.moduleCount - 1;
		var bitIndex = 7;
		var byteIndex = 0;
		
		for (var col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col === 6) col--;
	
			while (true) {
	
				for (var c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] === null) {
						
						var dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) === 1);
						}
	
						var mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex === -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new QRBitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var x = 0; x < rsBlocks.length; x++) {
		totalDataCount += rsBlocks[x].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. (" + 
            buffer.getLengthInBits() + 
            ">" +  
            totalDataCount * 8 + 
            ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 !== 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var x = 0; x < ecdata[r].length; x++) {
            var modIndex = x + modPoly.getLength() - ecdata[r].length;
			ecdata[r][x] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var y = 0; y < rsBlocks.length; y++) {
		totalCodeCount += rsBlocks[y].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var z = 0; z < maxDcCount; z++) {
		for (var s = 0; s < rsBlocks.length; s++) {
			if (z < dcdata[s].length) {
				data[index++] = dcdata[s][z];
			}
		}
	}

	for (var xx = 0; xx < maxEcCount; xx++) {
		for (var t = 0; t < rsBlocks.length; t++) {
			if (xx < ecdata[t].length) {
				data[index++] = ecdata[t][xx];
			}
		}
	}

	return data;

};

module.exports = QRCode;

}};
var QRCode=req("index"),EC=req("QRErrorCorrectLevel");
window.AQQR={svg:function(text,fg,bg){var q=new QRCode(-1,EC.M);q.addData(text);q.make();var n=q.getModuleCount(),p=4,d="";for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))d+="M"+(c+p)+" "+(r+p)+"h1v1h-1z";return '<svg class="aqqr-svg" viewBox="0 0 '+(n+2*p)+' '+(n+2*p)+'" shape-rendering="crispEdges" role="img" aria-label="QR"><rect width="100%" height="100%" fill="'+(bg||"#fff")+'"/><path d="'+d+'" fill="'+(fg||"#12203A")+'"/></svg>';}};
})();

/* أقنعني — أصوات وحركات اللحظات المهمة (مولّدة بالكود، بدون ملفات صوت) */
(function () {
  if (window.AQFX) return;
  var KEY = 'aqnieni.sound', ac = null, master = null;
  function on() { try { return localStorage.getItem(KEY) !== '0'; } catch (e) { return true; } }
  function ctx() {
    if (!on() || /[?&]bot(=|&|$)/.test(location.search)) return null;
    try {
      if (!ac) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ac = new A(); master = ac.createGain(); master.gain.value = 0.55; master.connect(ac.destination); }
      if (ac.state === 'suspended') ac.resume();
      return ac;
    } catch (e) { return null; }
  }
  function tone(f, t0, dur, o) {
    o = o || {}; var a = ctx(); if (!a) return;
    var osc = a.createOscillator(), g = a.createGain(), t = a.currentTime + (t0 || 0), v = o.v == null ? 0.25 : o.v;
    osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(f, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + Math.min(0.02, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(master); osc.start(t); osc.stop(t + dur + 0.05);
  }
  var FX = {
    tap: function () { tone(1400, 0, 0.035, { v: 0.05, type: 'triangle' }); },
    tick: function (s) { var hi = s <= 3; tone(hi ? 1175 : 880, 0, 0.09, { v: hi ? 0.22 : 0.14, type: 'triangle' }); if (hi) tone(hi ? 2350 : 1760, 0, 0.05, { v: 0.05 }); },
    start: function () { tone(660, 0, 0.12, { v: 0.16, type: 'triangle' }); tone(990, 0.1, 0.18, { v: 0.16, type: 'triangle' }); },
    timeup: function () {
      tone(784, 0, 0.16, { v: 0.26, type: 'square' }); tone(587, 0.17, 0.16, { v: 0.26, type: 'square' }); tone(392, 0.34, 0.42, { v: 0.28, type: 'square', to: 330 });
      try { if (navigator.vibrate) navigator.vibrate([120, 60, 220]); } catch (e) { }
    },
    fanfare: function () {
      for (var i = 0; i < 10; i++) tone(180 + i * 18, i * 0.11, 0.07, { v: 0.05 + i * 0.012, type: 'triangle' });
      var t = 1.25, n = [523.25, 659.25, 783.99, 1046.5];
      n.forEach(function (f, i) { tone(f, t + i * 0.12, 0.22, { v: 0.2, type: 'triangle' }); });
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach(function (f) { tone(f, t + 0.55, 1.4, { v: 0.09, type: 'sine' }); tone(f / 2, t + 0.55, 1.4, { v: 0.05, type: 'triangle' }); });
      for (var k = 0; k < 7; k++) tone(2000 + Math.random() * 2400, t + 0.6 + k * 0.13, 0.08, { v: 0.04 });
    }
  };
  window.AQFX = { fx: FX, on: on, set: function (v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) { } } };

  /* فتح الصوت بأول لمسة (شرط آيفون) + نقرة خفيفة على الأزرار */
  document.addEventListener('pointerdown', function (e) {
    ctx();
    var b = e.target.closest && e.target.closest('button,.btn,a.game,.chip,[data-act]');
    if (b && !b.disabled) FX.tap();
  }, true);

  /* المؤقت: عدّ تنازلي بآخر ٥ ثواني، صوت انتهاء الوقت، وصوت بداية مؤقت جديد */
  var last = null, fired = false;
  function readClock() {
    var els = document.querySelectorAll('[data-clock]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i]; if (!el.offsetParent) continue;
      var tx = el.textContent || '', ring = el.closest('[data-ring]');
      if (/⏸|متوقف|Paused/.test(tx) || (ring && ring.classList.contains('paused'))) return { paused: true };
      if (/انتهى|Time.s up/.test(tx)) return { s: 0 };
      var m = tx.match(/(\d+):(\d{2})/); if (m) return { s: +m[1] * 60 + +m[2] };
    }
    return null;
  }
  setInterval(function () {
    var c = readClock();
    if (!c) { last = null; fired = false; return; }
    if (c.paused) return;
    var s = c.s;
    if (last != null) {
      if (s > last + 3) { fired = false; if (s > 5) FX.start(); }
      else if (s < last) {
        if (s >= 1 && s <= 5) FX.tick(s);
        if (s === 0 && !fired) { fired = true; FX.timeup(); document.body.classList.add('aq-timeup'); setTimeout(function () { document.body.classList.remove('aq-timeup'); }, 900); }
      }
    }
    if (s > 0) fired = false;
    last = s;
  }, 200);

  /* منصة التتويج: حركة صعود + صوت احتفال مرة وحدة لكل نتيجة */
  var seen = {};
  function scan() {
    document.querySelectorAll('.podium').forEach(function (p) {
      if (p.classList.contains('aq-reveal') || p.classList.contains('aq-shown')) return;
      var k = (p.textContent || '').replace(/\s+/g, ' ').trim();
      if (seen[k]) { p.classList.add('aq-shown'); return; }
      seen[k] = 1; p.classList.add('aq-reveal'); FX.fanfare();
    });
  }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', scan);
})();

/* أقنعني — كرت الشكر وزر الملاحظات بنهاية كل لعبة */
(function () {
  if (window.AQEND) return; window.AQEND = 1;
  var EN = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = function (a, e) { return EN ? e : a; };
  var GAME = (location.pathname.split('/').pop() || 'index').replace('.html', '').replace(/-en$/, '');
  var draft = { r: 0, t: '' }, sentKey = 'aq.fb.' + GAME;
  function sent() { try { return sessionStorage.getItem(sentKey) === '1'; } catch (e) { return false; } }
  function card() {
    var faces = ['😕', '😐', '🙂', '😄', '🤩'];
    var fb = sent() ? '<div class="aqfb-ok">' + T('وصلت ملاحظتك، شكرًا لك 🙏', 'Got your feedback, thank you 🙏') + '</div>' :
      '<h3>' + T('شرايك باللعبة؟', 'How was the game?') + '</h3><div class="aqfb-faces">' + faces.map(function (f, i) { return '<button type="button" data-aqr="' + (i + 1) + '" class="' + (draft.r === i + 1 ? 'on' : '') + '" aria-label="' + (i + 1) + '">' + f + '</button>'; }).join('') + '</div>' +
      '<textarea id="aqfbt" rows="3" maxlength="600" placeholder="' + T('اكتب ملاحظتك أو أي مشكلة صارت معاك…', 'Write your feedback or any problem you hit…') + '">' + draft.t.replace(/</g, '&lt;') + '</textarea>' +
      '<button type="button" class="aqfb-send" data-aqsend="1">' + T('أرسل الملاحظة', 'Send feedback') + '</button><div class="aqfb-err" id="aqfbe"></div>';
    return '<section class="aq-end" data-aqend="1"><div class="aq-thanks"><div class="aq-heart">💛</div><h2>' + T('شكرًا إنكم لعبتوا أقنعني', 'Thanks for playing Aqnieni') + '</h2>' +
      '<p>' + T('لعبنا عشان نجتمع ونضحك ونستانس مع بعض.', 'We played to get together, laugh and have fun.') + '</p>' +
      '<p>' + T('وبدون ما تحسون، تدربتوا على الحوار، والكلام قدام الناس، والتفاوض، وحتى الإدارة.', 'And without noticing, you practised conversation, speaking in front of people, negotiation and even management.') + '</p>' +
      '<p class="aq-bye">' + T('ننطركم بالجولة الجاية 👋', 'See you next round 👋') + '</p></div><div class="aq-fb">' + fb + '</div></section>';
  }
  function place() {
    var app = document.getElementById('app'); if (!app) return;
    var has = app.querySelector('.podium'), ex = app.querySelector('[data-aqend]');
    if (has && !ex) app.insertAdjacentHTML('beforeend', card());
    if (!has && ex) ex.remove();
  }
  function rerender() { var ex = document.querySelector('[data-aqend]'); if (ex) ex.remove(); place(); }
  document.addEventListener('input', function (e) { if (e.target && e.target.id === 'aqfbt') draft.t = e.target.value; });
  document.addEventListener('click', function (e) {
    var r = e.target.closest && e.target.closest('[data-aqr]');
    if (r) { e.stopPropagation(); draft.r = +r.getAttribute('data-aqr'); rerender(); return; }
    var s = e.target.closest && e.target.closest('[data-aqsend]');
    if (!s) return; e.stopPropagation();
    var t = (draft.t || '').trim();
    if (!draft.r && !t) { var er = document.getElementById('aqfbe'); if (er) er.textContent = T('اختر وجه أو اكتب ملاحظة أول.', 'Pick a face or write something first.'); return; }
    var name = ''; try { var n = document.querySelector('[data-bind="name"],#name'); name = (n && n.value) || ''; } catch (x) { }
    var rec = { game: GAME, lang: EN ? 'en' : 'ar', rating: draft.r || null, text: t, name: name, at: Date.now(), ua: navigator.userAgent.slice(0, 120) };
    var done = function () { try { sessionStorage.setItem(sentKey, '1'); } catch (x) { } rerender(); };
    var share = function () {
      var msg = T('ملاحظة على أقنعني', 'AQNINI feedback') + ' (' + GAME + ')' + (draft.r ? ' — ' + draft.r + '/5' : '') + '\n' + t;
      if (navigator.share) navigator.share({ text: msg }).then(done, function () { });
      else { try { navigator.clipboard.writeText(msg); } catch (x) { } var er = document.getElementById('aqfbe'); if (er) er.textContent = T('ما قدرنا نرسلها، نسخناها لك عشان ترسلها لصاحب اللعبة.', 'Couldn’t send it; copied so you can send it to the game owner.'); }
    };
    try {
      if (window.firebase && firebase.apps && firebase.apps.length && !/[?&]dev/.test(location.search)) {
        firebase.database().ref('docs/feedback').push(JSON.stringify(rec)).then(done, share);
      } else share();
    } catch (x) { share(); }
  }, true);
  new MutationObserver(function () { place(); }).observe(document.documentElement, { childList: true, subtree: true });
})();

/* أقنعني — وضع التلفزيون: لما تنفتح اللعبة على شاشة عريضة (تلفزيون، لابتوب، آيباد بالعرض) تكبر تلقائيًا */
(function () {
  if (window.AQTV) return; window.AQTV = 1;
  var force = /[?&]tv=1/.test(location.search), off = /[?&]tv=0/.test(location.search);
  function apply() {
    var w = window.innerWidth, h = document.documentElement;
    var on = !off && (force || w >= 1000);
    h.classList.toggle('aq-tv', on);
    var z = on ? Math.max(1.2, Math.min(1.8, w / 1100)) : 1;
    document.body && (document.body.style.zoom = on ? String(z) : '');
  }
  window.addEventListener('resize', apply);
  document.addEventListener('DOMContentLoaded', apply);
  if (document.body) apply();
})();

/* أقنعني — ثبات الاتصال: تنبيه لو انقطع النت، رجوع تلقائي، والشاشة ما تطفي وقت اللعب */
(function () {
  if (window.AQNET) return; window.AQNET = 1;
  var EN = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = function (a, e) { return EN ? e : a; };
  var bar = null, wasOn = false, offT = null;
  function show(kind) {
    if (!bar) { bar = document.createElement('div'); bar.id = 'aqnet'; document.body.appendChild(bar); }
    if (kind === 'off') { bar.className = 'off'; bar.innerHTML = '<span class="dot"></span>' + T('انقطع الاتصال… نحاول نرجعك للغرفة', 'Connection lost… reconnecting you to the room'); }
    else { bar.className = 'on'; bar.innerHTML = '✓ ' + T('رجع الاتصال', 'Back online'); setTimeout(function () { if (bar && bar.className === 'on') bar.className = 'hide'; }, 2200); }
  }
  function watch() {
    try {
      if (/[?&]dev/.test(location.search) || !window.firebase || !firebase.apps || !firebase.apps.length) return false;
      firebase.database().ref('.info/connected').on('value', function (s) {
        var c = !!s.val();
        if (c) { clearTimeout(offT); if (wasOn && bar && bar.className === 'off') show('on'); wasOn = true; }
        else if (wasOn) { clearTimeout(offT); offT = setTimeout(function () { show('off'); }, 2500); }
      });
      return true;
    } catch (e) { return false; }
  }
  var tries = 0, iv = setInterval(function () { if (watch() || ++tries > 40) clearInterval(iv); }, 500);
  window.addEventListener('offline', function () { show('off'); });
  window.addEventListener('online', function () { if (bar && bar.className === 'off') show('on'); });

  /* الشاشة تبقى شغالة وقت اللعب (عشان التلفون ما ينام وينقطع) */
  var lock = null;
  function wake() {
    try {
      if (!('wakeLock' in navigator) || lock || document.visibilityState !== 'visible') return;
      navigator.wakeLock.request('screen').then(function (l) { lock = l; l.addEventListener('release', function () { lock = null; }); }, function () { });
    } catch (e) { }
  }
  document.addEventListener('pointerdown', wake, true);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') wake(); });
})();

/* أقنعني — شرح تفاعلي خطوة بخطوة لكل لعبة */
(function () {
  if (window.AQTUT) return;
  var EN = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = function (a, e) { return EN ? e : a; };
  var GAME = (location.pathname.split('/').pop() || '').replace('.html', '').replace(/-en$/, '');
  var COL = { murafaat: '#DE0921', mazad: '#0554A4', nadik: '#E0A800', azyaa: '#7B2FBE', aqar: '#1E8A4C' };
  var S = {
    murafaat: [
      ['📝', 'كل واحد يجاوب سرًّا', 'تطلع أسئلة رأي، مثل «أفضل وجبة للعشاء؟»، وكل لاعب يكتب جوابه بتلفونه بدون ما أحد يشوفه.', 'Everyone answers in secret', 'Opinion questions appear, like “Best dinner?”, and everyone types an answer on their phone where no one can see it.'],
      ['⚔️', 'اثنين بمواجهة', 'اللعبة تختار لاعبين جاوبوا إجابات مختلفة. والمفاجأة: كل واحد لازم يدافع عن رأي الثاني، مو رأيه!', 'Two face off', 'The game picks two players with different answers. The twist: each one must defend the other’s answer, not their own!'],
      ['🎤', 'وقت المرافعة', 'كل طرف عنده وقت محدد يقنع فيه المحلفين. المضيف يشغّل المؤقت ويوقفه.', 'Make your case', 'Each side gets a set time to convince the jury. The host starts and pauses the timer.'],
      ['🃏', 'المزايا تقلب اللعب', 'عندك مزايا تستخدمها مرة وحدة، مثل: استدعاء شاهد، والاعتراض، وحق الرد الإضافي، وتمديد الوقت، ومضاعفة النقاط، وتبديل السؤال، وتكوين فريق.', 'Perks change everything', 'Each perk is used once: call a witness, objection, extra reply, extra time, double points, swap question and team up.'],
      ['⚖️', 'المحلفين يحكمون', 'الباقين محلفين، يصوّتون سرًّا للأقوى إقناعًا، والفايز ياخذ النقاط.', 'The jury decides', 'Everyone else is the jury and votes in secret for the most convincing. The winner takes the points.'],
      ['🏆', 'منصة التتويج', 'بنهاية الأسئلة، أعلى مجموع نقاط يفوز ويطلع على المنصة.', 'The podium', 'After the last question, the highest total wins and takes the podium.']
    ],
    mazad: [
      ['🛒', 'غرض واحد، بايعين اثنين', 'بكل بيعة يطلع غرض، مثل «ريموت تلفزيون»، واثنين من اللاعبين يبيعونه بنفس الوقت.', 'One item, two sellers', 'Each sale shows one item, like “TV remote”, and two players sell it at the same time.'],
      ['🤫', 'السعر سرّي', 'كل بايع يحط سعره سرًّا من ١ لـ٢٠ د.ك. وتنكشف الأسعار بعدين.', 'Secret prices', 'Each seller secretly sets a price from 1 to 20 KD. Prices are revealed later.'],
      ['🎤', 'أقنعهم يشترون منك', 'كل بايع ياخذ وقته يقنع الباقين ليش يشترون منه هو مو من خصمه.', 'Win the buyers', 'Each seller gets time to convince everyone to buy from them, not the rival.'],
      ['💰', 'المشترين يقررون', 'كل مشتري عنده محفظة. يشتري من بايع، أو يرفض الاثنين، أو يمتنع.', 'Buyers decide', 'Each buyer has a wallet and can buy from one seller, reject both, or abstain.'],
      ['🃏', 'مزايا البايعين', 'تنزيلات ٥٠٪، ورفع أو تنزيل سعر الخصم، ومسؤول مبيعات، واعتراض على البيعة، وتغيير الخصم أو المنتج. كل لاعب يختار ٣ سرًّا.', 'Seller perks', '50% sale, raise or cut your rival’s price, a sales rep, objection to the sale, and swap the rival or the item. Each player picks 3 in secret.'],
      ['🏆', 'الحسبة بالنهاية', 'المجموع = (الأغراض × ٥) + المحفظة + الأرباح. والأعلى يفوز.', 'Final score', 'Total = (items × 5) + wallet + profits. Highest total wins.']
    ],
    nadik: [
      ['📋', 'اختر تشكيلتين', 'كل لاعب يختار فريقين من مواسم تاريخية أو يكتبهم بنفسه: واحد أقوى وواحد أضعف.', 'Pick two squads', 'Each player picks two squads from historic seasons, or types them in: one stronger, one weaker.'],
      ['🎲', 'اختر فئتك سرًّا', 'فريق قوي وفلوس أقل، أو فريق أضعف وفلوس أكثر. وتاخذ تشكيلة عشوائية من اختيارات غيرك.', 'Choose your tier', 'A strong squad with less cash, or a weaker one with more. You get a random squad from the others’ picks.'],
      ['💸', 'سوق الانتقالات', '٥ مواسم، وبكل موسم سوق صيفي وسوق شتوي. اعرض لاعبينك للبيع وزايد على لاعبين غيرك.', 'Transfer market', 'Five seasons, each with a summer and a winter window. List your players and bid on others.'],
      ['🗣️', 'فاوض وأقنع', 'الدائرة الملونة جنب اسم اللاعب تبين فريقه، فتعرف مع منو تتفاوض. واضغط على أي قميص تشوف كرت اللاعب.', 'Negotiate', 'The coloured circle by a name shows the club, so you know who to talk to. Tap any shirt to see the player card.'],
      ['⚽', 'ثبّت خماسيك', 'قبل الكأس تختار ٥: حارس، مدافع، مدافع أو وسط، وسط أو مهاجم، ومهاجم.', 'Lock your five', 'Before the cup pick five: keeper, defender, defender or midfielder, midfielder or forward, and a forward.'],
      ['🏆', 'كأس الأبطال', 'بكل مواجهة يصوّت الجمهور لأحسن خماسي بدون ما يعرف فريق منو. والنقاط ٥ بنود × ٢٠.', 'Champions cup', 'In each tie the crowd votes for the best five without knowing whose it is. Scoring is 5 categories × 20.']
    ],
    azyaa: [
      ['🛍️', 'اشترِ موادك', 'من رأس المال تشتري مزايا، وأنواع ملابس، ونوعين خامة، ولونين، وألوان متجرك.', 'Buy your materials', 'From your capital buy perks, clothing types, two fabrics, two colours and your store colours.'],
      ['✂️', 'صمّم تشكيلتك', 'جهّز ٥ تصاميم: قطعة أساسية وقطعة إضافية، واختر الخامة واللون والنقشة والسعر.', 'Design your collection', 'Make 5 designs: a main piece and an extra, with fabric, colour, pattern and price.'],
      ['🏬', 'ابنِ البراند', 'سمّ البراند، اكتب وصف قصير، واختر قطعتك المميزة.', 'Build your brand', 'Name your brand, write a short description and pick your signature piece.'],
      ['🎤', 'جولات الإقناع', 'متحدثين عشوائيين يعرضون قطعتهم المميزة ويقنعونكم تزورون متجرهم.', 'Pitch rounds', 'Random speakers show their signature piece and convince you to visit their store.'],
      ['🛒', 'وقت التسوق', 'زور المتاجر واشترِ من محفظة التسوق. كل زيارة وكل بيعة تنحسب.', 'Shopping time', 'Visit stores and buy from your shopping wallet. Every visit and sale counts.'],
      ['🏆', 'خمس بنود', 'رأس المال، ومحفظة التسوق، والإبداع بالتصويت، والمبيعات، والزيارات. كل بند ٢٠ نقطة.', 'Five categories', 'Capital, shopping wallet, creativity (by vote), sales and visits, 20 points each.']
    ],
    aqar: [
      ['🏢', 'جهّز مكتبك', 'كل لاعب مكتب عقاري بميزانية. اشترِ مزايا (لين ٣) وابنِ عقاراتك.', 'Set up your office', 'Each player is a real-estate office with a budget. Buy perks (up to 3) and build your properties.'],
      ['🏠', 'ابنِ العقار', 'اختر المنطقة، وحجم الأرض، والأدوار، والسرداب، والستايل، واللون، والتجهيزات.', 'Build a property', 'Choose area, plot size, floors, basement, style, colour and fittings.'],
      ['🎤', 'اعرض وأقنع', 'بكل جولة لاعبين عشوائيين يعرضون عقار ويقنعون الباقين يشترونه.', 'Pitch it', 'Each round random players pitch a property and convince the others to buy.'],
      ['🤝', 'الصفقات', 'تفاوضوا بالكلام. المشتري يسجّل السعر المتفق عليه، والبايع يقبل أو يرفض. وتابع كل شي على الخريطة.', 'Deals', 'Negotiate out loud. The buyer records the agreed price and the seller accepts or rejects. Follow it all on the map.'],
      ['🃏', 'المزايا', 'مثل: خطف الصفقة، والعربون، والإيجار، والمزايدة، والمفاوض، وأحمي نفسك. كل ميزة مرة وحدة.', 'Perks', 'Like deal hijack, deposit, rent, outbid, negotiator and protect yourself. Each perk once.'],
      ['🏆', 'خمس بنود', 'الثروة النهائية، وأرباح البيع، والعقارات المملوكة، والصفقات المكتملة، وأفضل إقناع بالتصويت. المراكز تاخذ ٥/٤/٣/٢/١.', 'Five categories', 'Final wealth, sales profit, properties, deals and best pitch by vote. Ranks score 5/4/3/2/1.']
    ]
  };
  var steps = S[GAME]; if (!steps) return;
  window.AQTUT = 1;
  var i = 0, ov = null, c = COL[GAME] || '#12203A';
  function draw() {
    var s = steps[i], last = i === steps.length - 1;
    ov.innerHTML = '<div class="aqt-sheet" role="dialog" aria-modal="true" style="--c:' + c + '">' +
      '<button class="aqt-x" data-aqt="x" aria-label="' + T('إغلاق', 'Close') + '">✕</button>' +
      '<div class="aqt-step">' + T('الخطوة', 'Step') + ' ' + (i + 1) + ' / ' + steps.length + '</div>' +
      '<div class="aqt-ic" key="' + i + '">' + s[0] + '</div>' +
      '<h2>' + (EN ? s[3] : s[1]) + '</h2><p>' + (EN ? s[4] : s[2]) + '</p>' +
      '<div class="aqt-dots">' + steps.map(function (_, k) { return '<i class="' + (k === i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
      '<div class="aqt-nav">' + (i ? '<button data-aqt="p" class="ghost">' + T('السابق', 'Back') + '</button>' : '<span></span>') +
      '<button data-aqt="' + (last ? 'x' : 'n') + '" class="go">' + (last ? T('يلا نلعب!', 'Let’s play!') : T('التالي', 'Next')) + '</button></div></div>';
  }
  function open() { i = 0; ov = document.createElement('div'); ov.className = 'aqt-ov'; document.body.appendChild(ov); draw(); }
  function close() { if (ov) ov.remove(); ov = null; }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-aqt]');
    if (!b) { if (ov && e.target === ov) close(); return; }
    e.stopPropagation(); var a = b.getAttribute('data-aqt');
    if (a === 'open') open(); else if (a === 'x') close(); else if (a === 'n') { i = Math.min(steps.length - 1, i + 1); draw(); } else if (a === 'p') { i = Math.max(0, i - 1); draw(); }
  }, true);
  var sx = null;
  document.addEventListener('touchstart', function (e) { if (ov) sx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (!ov || sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) < 50) return; var fwd = EN ? dx < 0 : dx > 0;
    if (fwd && i < steps.length - 1) i++; else if (!fwd && i > 0) i--; draw();
  });
  function place() {
    var go = document.querySelector('#app [data-act="enter"]');
    if (go && !document.querySelector('[data-aqt="open"]')) go.insertAdjacentHTML('afterend', '<button type="button" class="aqt-open" data-aqt="open">📖 ' + T('شلون نلعب؟ شرح خطوة بخطوة', 'How to play — step by step') + '</button>');
  }
  new MutationObserver(place).observe(document.documentElement, { childList: true, subtree: true });
})();

/* أقنعني — سجلي وشاراتي (محفوظة على نفس التلفون) */
(function () {
  if (window.AQSTATS) return;
  var EN = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = function (a, e) { return EN ? e : a; };
  var FILE = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  var GAME = FILE.replace(/-en$/, '');
  var GN = { murafaat: ['المنصة', 'MANASSA', '⚖️'], mazad: ['المزاد', 'MAZAD', '💰'], nadik: ['الرئيس', 'RAEES', '⚽'], azyaa: ['الأزياء', 'AZYAA', '🎀'], aqar: ['العقار', 'AQAR', '🏠'] };
  var B = [
    ['first', '🎉', 'أول لعبة', 'First game', 'لعبت أول لعبة أقنعني', 'Played your first Aqnieni game'],
    ['five', '🔥', 'متحمس', 'On fire', 'لعبت ٥ ألعاب', 'Played 5 games'],
    ['ten', '💎', 'مدمن أقنعني', 'Hooked', 'لعبت ١٠ ألعاب', 'Played 10 games'],
    ['win1', '🥇', 'أول فوز', 'First win', 'فزت بأول لعبة', 'Won your first game'],
    ['win3', '👑', 'الملك', 'The king', 'فزت ٣ مرات', 'Won 3 times'],
    ['pod3', '🏅', 'وجه المنصة', 'Podium regular', 'طلعت على المنصة ٣ مرات', 'Made the podium 3 times'],
    ['all5', '🌟', 'جربتها كلها', 'Tried them all', 'لعبت الألعاب الخمس', 'Played all five games'],
    ['big', '🎊', 'لمّة كبيرة', 'Big crowd', 'لعبت مع ٨ لاعبين أو أكثر', 'Played with 8 or more players'],
    ['w_murafaat', '⚖️', 'أقوى مقنع', 'Master persuader', 'فزت بالمنصة', 'Won MANASSA'],
    ['w_mazad', '💰', 'ملك المزاد', 'Auction king', 'فزت بالمزاد', 'Won MAZAD'],
    ['w_nadik', '⚽', 'رئيس الموسم', 'President of the season', 'فزت بالرئيس', 'Won RAEES'],
    ['w_azyaa', '🎀', 'أيقونة الموضة', 'Fashion icon', 'فزت بالأزياء', 'Won AZYAA'],
    ['w_aqar', '🏠', 'سمسار الموسم', 'Broker of the season', 'فزت بالعقار', 'Won AQAR']
  ];
  function load() { try { return JSON.parse(localStorage.getItem('aq.stats') || '') || null; } catch (e) { return null; } }
  function save(s) { try { localStorage.setItem('aq.stats', JSON.stringify(s)); } catch (e) { } }
  function st() { var s = load() || { total: 0, wins: 0, pods: 0, games: {}, badges: [], keys: [] }; s.games = s.games || {}; s.badges = s.badges || []; s.keys = s.keys || []; return s; }
  function myName() { try { return (localStorage.getItem('aq.myname') || '').trim(); } catch (e) { return ''; } }
  window.AQSTATS = { get: st, badges: B, names: GN };

  /* نحفظ اسم اللاعب أول ما يكتبه */
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t || t.tagName !== 'INPUT') return;
    var b = t.getAttribute('data-bind') || '', id = t.id || '';
    if (/^(name|dname_?player|pname)$/i.test(b) || /^(name|pname|nameIn)$/i.test(id)) { try { localStorage.setItem('aq.myname', t.value.trim()); } catch (x) { } }
  }, true);

  function toast(html) {
    var d = document.createElement('div'); d.className = 'aqs-toast'; d.innerHTML = html; document.body.appendChild(d);
    setTimeout(function () { d.classList.add('out'); }, 3600); setTimeout(function () { d.remove(); }, 4200);
  }
  function record(p) {
    if (!GN[GAME] || /[?&]bot(=|&|$)/.test(location.search)) return;
    var names = [], pods = p.querySelectorAll('.pod');
    pods.forEach(function (x) { var n = x.querySelector('b,.pn'); var blk = x.querySelector('.blk,.pb'); if (n) names.push({ n: n.textContent.trim(), r: blk ? +blk.textContent.trim() || 0 : 0 }); });
    var card = p.closest('section,.card') || p.parentNode, rest = card ? card.querySelectorAll('.rest li,.rest .row') : [];
    var count = names.length + rest.length;
    var me = myName(), rank = 0;
    names.forEach(function (x) { if (me && x.n === me) rank = x.r || 0; });
    if (!rank && me) rest.forEach(function (li) { var f = li.firstElementChild || li; var t = (f.textContent || '').replace(/\s+/g, ' ').trim(); var m = t.match(/^(\d+)\s*[.\-]?\s*(.+)$/); if (m && m[2].trim() === me) rank = +m[1]; });
    var key = GAME + '|' + (p.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 200);
    var s = st(); if (s.keys.indexOf(key) >= 0) return; s.keys.push(key); if (s.keys.length > 60) s.keys = s.keys.slice(-60);
    var g = s.games[GAME] = s.games[GAME] || { played: 0, wins: 0, pods: 0, best: 0 };
    s.total++; g.played++;
    if (rank === 1) { s.wins++; g.wins++; }
    if (rank >= 1 && rank <= 3) { s.pods++; g.pods++; }
    if (rank && (!g.best || rank < g.best)) g.best = rank;
    var got = [], has = function (id) { return s.badges.indexOf(id) >= 0; }, give = function (id) { if (!has(id)) { s.badges.push(id); got.push(id); } };
    give('first'); if (s.total >= 5) give('five'); if (s.total >= 10) give('ten');
    if (s.wins >= 1) give('win1'); if (s.wins >= 3) give('win3'); if (s.pods >= 3) give('pod3');
    if (Object.keys(GN).every(function (k) { return s.games[k] && s.games[k].played; })) give('all5');
    if (count >= 8) give('big'); if (rank === 1) give('w_' + GAME);
    save(s);
    got.forEach(function (id, k) { var b = B.find(function (x) { return x[0] === id; }); setTimeout(function () { if (window.AQFX && AQFX.fx.start) AQFX.fx.start(); toast('<span class="ic">' + b[1] + '</span><span><small>' + T('شارة جديدة!', 'New badge!') + '</small><b>' + (EN ? b[3] : b[2]) + '</b></span>'); }, 3600 + k * 4300); });
    var sum = document.querySelector('[data-aqend] .aq-thanks');
    if (sum && !sum.querySelector('.aqs-sum')) sum.insertAdjacentHTML('beforeend', summary(s));
  }
  function summary(s) { return '<div class="aqs-sum">' + T('سجلك: لعبت ', 'Your record: played ') + s.total + T(' · فزت ', ' · won ') + s.wins + T(' · الشارات ', ' · badges ') + s.badges.length + '/' + B.length + '</div>'; }
  var watched = {};
  new MutationObserver(function () {
    var nm = document.querySelector('input[data-bind="name"]'); if (nm && nm.value.trim()) { try { localStorage.setItem('aq.myname', nm.value.trim()); } catch (x) { } }
    document.querySelectorAll('.podium').forEach(function (p) {
      if (p.__aqs) return; p.__aqs = 1; setTimeout(function () { record(p); }, 600);
    });
    var t = document.querySelector('[data-aqend] .aq-thanks');
    if (t && !t.querySelector('.aqs-sum') && load()) t.insertAdjacentHTML('beforeend', summary(st()));
  }).observe(document.documentElement, { childList: true, subtree: true });

  /* صفحة «سجلي» (من الصفحة الرئيسية) */
  window.AQSTATS.open = function () {
    var s = st(), ov = document.createElement('div'); ov.className = 'aqt-ov';
    var rows = Object.keys(GN).map(function (k) { var g = s.games[k] || { played: 0, wins: 0, pods: 0 }; return '<div class="aqs-row"><span>' + GN[k][2] + ' ' + (EN ? GN[k][1] : GN[k][0]) + '</span><span>' + g.played + '</span><span>' + g.wins + '</span><span>' + g.pods + '</span></div>'; }).join('');
    ov.innerHTML = '<div class="aqt-sheet aqs" role="dialog" aria-modal="true" style="--c:#0554A4"><button class="aqt-x" data-aqsx="1" aria-label="' + T('إغلاق', 'Close') + '">✕</button>' +
      '<h2>🏅 ' + T('سجلي', 'My record') + '</h2>' +
      '<div class="aqs-kpi"><div><b>' + s.total + '</b><span>' + T('لعبة', 'games') + '</span></div><div><b>' + s.wins + '</b><span>' + T('فوز', 'wins') + '</span></div><div><b>' + s.pods + '</b><span>' + T('منصة', 'podiums') + '</span></div></div>' +
      '<div class="aqs-tbl"><div class="aqs-row h"><span></span><span>' + T('لعبت', 'Played') + '</span><span>' + T('فزت', 'Won') + '</span><span>' + T('منصة', 'Podium') + '</span></div>' + rows + '</div>' +
      '<h3>' + T('الشارات', 'Badges') + ' ' + s.badges.length + '/' + B.length + '</h3><div class="aqs-badges">' +
      B.map(function (b) { var on = s.badges.indexOf(b[0]) >= 0; return '<div class="aqs-b ' + (on ? 'on' : '') + '"><span class="ic">' + (on ? b[1] : '🔒') + '</span><b>' + (EN ? b[3] : b[2]) + '</b><small>' + (EN ? b[5] : b[4]) + '</small></div>'; }).join('') +
      '</div><p class="aqs-note">' + T('السجل محفوظ على هالتلفون بس.', 'Your record is saved on this phone only.') + '</p></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov || (e.target.closest && e.target.closest('[data-aqsx]'))) ov.remove(); });
  };
})();

/* أقنعني — دعوة اللاعبين بكود QR (يصوّرونه من تلفون المضيف أو من التلفزيون) */
(function () {
  if (window.AQINV || !window.AQQR) return; window.AQINV = 1;
  var EN = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = function (a, e) { return EN ? e : a; };
  var GAME = (location.pathname.split('/').pop() || '').replace('.html', '').replace(/-en$/, '');
  var GN = { murafaat: ['المنصة', 'MANASSA', '#DE0921'], mazad: ['المزاد', 'MAZAD', '#0554A4'], nadik: ['الرئيس', 'RAEES', '#E0A800'], azyaa: ['الأزياء', 'AZYAA', '#7B2FBE'], aqar: ['العقار', 'AQAR', '#1E8A4C'] };
  var g = GN[GAME] || ['أقنعني', 'AQNINI', '#0554A4'];
  var cache = {};
  function qr(link) { return cache[link] || (cache[link] = AQQR.svg(link, '#12203A', '#FFFFFF')); }
  function codeOf(link) { var m = String(link).match(/#room-([A-Za-z0-9]{4,6})/); return m ? m[1].toUpperCase() : ''; }
  function block(link) {
    var code = codeOf(link);
    return '<div class="aqinv" data-aqinv="1" style="--gc:' + g[2] + '">' +
      '<div class="aqinv-qr">' + qr(link) + '</div>' +
      '<div class="aqinv-side"><b>' + T('صوّروا الكود وادخلوا', 'Scan to join') + '</b>' +
      '<span>' + T('افتح كاميرا التلفون ووجّهها على الكود', 'Point your phone camera at the code') + '</span>' +
      (code ? '<span class="aqinv-code" dir="ltr">' + code.split('').join(' ') + '</span><small>' + T('رمز الغرفة', 'Room code') + '</small>' : '') +
      '<div class="aqinv-btns"><button type="button" data-aqinv-big="1">📺 ' + T('عرض الكود بكبير', 'Show big code') + '</button>' +
      (navigator.share ? '<button type="button" data-aqinv-share="1">↗ ' + T('مشاركة', 'Share') + '</button>' : '') + '</div></div></div>';
  }
  function big(link) {
    var code = codeOf(link), ov = document.createElement('div'); ov.className = 'aqinv-ov'; ov.style.setProperty('--gc', g[2]);
    ov.innerHTML = '<div class="aqinv-full"><div class="aqinv-top"><span class="dot"></span>' + T('أقنعني', 'AQNINI') + ' · <b>' + (EN ? g[1] : g[0]) + '</b></div>' +
      '<div class="aqinv-bigqr">' + qr(link) + '</div>' +
      '<h2>' + T('صوّر الكود بكاميرا تلفونك وادخل الغرفة', 'Scan with your phone camera to join') + '</h2>' +
      (code ? '<div class="aqinv-bigcode" dir="ltr">' + code + '</div>' : '') +
      '<button type="button" class="aqinv-close" data-aqinv-close="1">' + T('رجوع للغرفة', 'Back to the room') + '</button></div>';
    document.body.appendChild(ov);
  }
  function place() {
    var inp = document.getElementById('lnk'); if (!inp || !inp.value) return;
    var row = inp.closest('.linkrow') || inp.parentNode, nx = row.nextElementSibling;
    if (nx && nx.getAttribute && nx.getAttribute('data-aqinv') && nx.getAttribute('data-l') === inp.value) return;
    if (nx && nx.getAttribute && nx.getAttribute('data-aqinv')) nx.remove();
    row.insertAdjacentHTML('afterend', block(inp.value)); row.nextElementSibling.setAttribute('data-l', inp.value);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-aqinv-big],[data-aqinv-share],[data-aqinv-close],.aqinv-ov');
    if (!t) return;
    var inp = document.getElementById('lnk'), link = inp ? inp.value : location.href;
    if (t.hasAttribute('data-aqinv-big')) { e.stopPropagation(); big(link); }
    else if (t.hasAttribute('data-aqinv-share')) { e.stopPropagation(); try { navigator.share({ title: T('أقنعني', 'AQNINI'), text: T('تعال العب معنا ', 'Come play ') + (EN ? g[1] : g[0]), url: link }).catch(function () { }); } catch (x) { } }
    else if (t.hasAttribute('data-aqinv-close') || t.classList.contains('aqinv-ov')) { e.stopPropagation(); var o = document.querySelector('.aqinv-ov'); if (o) o.remove(); }
  }, true);
  new MutationObserver(place).observe(document.documentElement, { childList: true, subtree: true });
})();

/* تثبيت كتطبيق: يحفظ الملفات عشان تفتح أسرع */
(function(){try{if('serviceWorker' in navigator&&location.protocol==='https:')window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});}catch(e){}})();
