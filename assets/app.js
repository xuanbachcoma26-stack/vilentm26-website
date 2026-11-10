(function(){
var D=window.I18N,M=window.MEDIA||{items:[],cats:{}},C=D.company;
var lang=(function(){try{var s=localStorage.getItem("vl");if(s&&D.langs[s])return s}catch(e){}
return (navigator.language||"vi").toLowerCase().indexOf("vi")===0?"vi":(navigator.language||"").toLowerCase().indexOf("en")===0?"en":"vi"})();
var $=function(i){return document.getElementById(i)};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var cat="all",view=[],idx=0;
function T(it){return (it.title&&(it.title[lang]||it.title.vi))||""}
function render(){
 var t=D.langs[lang];document.documentElement.lang=lang;document.title=t.meta.title;
 var md=document.querySelector('meta[name=description]');if(md)md.content=t.meta.desc;
 var n=t.nav;$("nav").innerHTML=[["about",n.about],["equip",n.equip],["services",n.services],["process",n.process],["gallery",n.gallery],["contact",n.contact]].map(function(x){return '<a href="#'+x[0]+'">'+esc(x[1])+'</a>'}).join("");
 $("lang").innerHTML=Object.keys(D.langs).map(function(k){return '<button data-l="'+k+'" class="'+(k===lang?"on":"")+'">'+D.langs[k].label+'</button>'}).join("");
 var h=t.hero;$("h-kicker").textContent=h.kicker;$("h-title").textContent=h.title;$("h-sub").textContent=h.sub;$("h-cta1").textContent=h.cta1;$("h-cta2").textContent=h.cta2;
 $("stats").innerHTML=t.stats.map(function(s){return '<div><b>'+esc(s.v)+'</b><span>'+esc(s.l)+'</span></div>'}).join("");
 var a=t.about;$("about-b").innerHTML='<div class="two"><div class="about-p"><h2>'+esc(a.title)+'</h2><p>'+esc(a.p1)+'</p><p>'+esc(a.p2)+'</p></div><div class="about-img"><img src="assets/img/laser.jpg" alt="VILENTM26" loading="lazy"></div></div><div class="facts">'+a.facts.map(function(f){return '<div class="fact"><small>'+esc(f.k)+'</small><b>'+esc(f.v)+'</b></div>'}).join("")+'</div>';
 var v=t.vmv;$("vmv-b").innerHTML='<h2>'+esc(v.title)+'</h2><div class="vm"><div class="card"><h3>'+esc(v.vision_t)+'</h3><p>'+esc(v.vision)+'</p></div><div class="card"><h3>'+esc(v.mission_t)+'</h3><p>'+esc(v.mission)+'</p></div></div><h3 class="mini">'+esc(v.values_t)+'</h3><div class="vals">'+v.values.map(function(x){return '<div class="val"><b>'+esc(x.t)+'</b><span>'+esc(x.d)+'</span></div>'}).join("")+'</div>';
 var e=t.equip;$("equip-b").innerHTML='<h2>'+esc(e.title)+'</h2><p class="sub">'+esc(e.sub)+'</p><div class="mach">'+e.items.map(function(x,i){return '<div class="m"><img src="assets/img/'+x.img+'.jpg" alt="'+esc(x.t)+'" loading="lazy"><div><i>0'+(i+1)+'</i><b>'+esc(x.t)+'</b><span>'+esc(x.d)+'</span></div></div>'}).join("")+'</div><h3 class="mini" style="margin-top:34px">'+esc(e.soft_t)+'</h3><div class="soft">'+e.soft.map(function(s){return '<span>'+esc(s)+'</span>'}).join("")+'</div>';
 var s=t.services;$("services-b").innerHTML='<h2>'+esc(s.title)+'</h2><p class="sub">'+esc(s.sub)+'</p><div class="svc">'+s.items.map(function(x,i){return '<div class="s"><i>0'+(i+1)+'</i><b>'+esc(x.t)+'</b><p>'+esc(x.d)+'</p></div>'}).join("")+'</div><div class="pills">'+s.pills.map(function(p){return '<span>'+esc(p)+'</span>'}).join("")+'</div>';
 var p=t.process;$("process-b").innerHTML='<h2>'+esc(p.title)+'</h2><ol class="steps">'+p.steps.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ol><div class="qa"><div><h3 class="mini">'+esc(p.qa_t)+'</h3><ul>'+p.qa.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul></div><img src="assets/img/inspect.jpg" alt="" loading="lazy"></div>';
 var w=t.why,r=t.roadmap;$("why-b").innerHTML='<h2>'+esc(w.title)+'</h2><div class="why">'+w.items.map(function(x){return '<div class="card"><b>'+esc(x.t)+'</b><p>'+esc(x.d)+'</p></div>'}).join("")+'</div><div class="commit">'+esc(w.commit)+'</div><h3 class="mini" style="margin-top:40px">'+esc(r.title)+'</h3><div class="road">'+r.items.map(function(x){return '<div><b>'+esc(x.y)+'</b>'+esc(x.d)+'</div>'}).join("")+'</div>';
 gallery();
 var c=t.contact,mp="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.maps_q);
 $("contact-b").innerHTML='<div class="ct"><div><h2>'+esc(c.title)+'</h2><p class="sub">'+esc(c.sub)+'</p><div class="rows"><div class="row"><small>'+esc(c.tax)+'</small><span>'+esc(C.tax)+'</span></div><div class="row"><small>'+esc(c.address)+'</small><span>'+esc(c.addr_v)+'</span></div><div class="row"><small>'+esc(c.phone)+'</small><a href="tel:'+C.phone_href+'">'+esc(C.phone)+'</a></div><div class="row"><small>'+esc(c.email)+'</small><a href="mailto:'+C.email+'">'+esc(C.email)+'</a></div><div class="row"><small>'+esc(c.web)+'</small><a href="https://'+C.web+'">'+esc(C.web)+'</a></div></div><div class="cta"><a class="btn pri" href="mailto:'+C.email+'">'+esc(c.mail_cta)+'</a><a class="btn ghost" href="tel:'+C.phone_href+'">'+esc(c.call_cta)+'</a><a class="btn ghost" target="_blank" rel="noopener" href="'+mp+'">'+esc(c.map)+'</a></div></div><img src="assets/img/office.jpg" alt="" loading="lazy"></div>';
 $("ftr-t").textContent="© "+new Date().getFullYear()+" "+C.name+". "+t.footer.rights;
}
function gallery(){
 var g=D.langs[lang].gallery,items=M.items,cats=Object.keys(M.cats);
 var f=cats.length>1?'<div class="filters"><button data-c="all" class="'+(cat==="all"?"on":"")+'">'+esc(g.all)+'</button>'+cats.map(function(k){var l=M.cats[k][lang]||M.cats[k].vi;return '<button data-c="'+k+'" class="'+(cat===k?"on":"")+'">'+esc(l)+'</button>'}).join("")+'</div>':"";
 view=items.filter(function(i){return cat==="all"||i.cat===cat});
 var body=view.length?'<div class="gal">'+view.map(function(i,k){var tt=T(i);return '<button class="g" data-k="'+k+'" aria-label="'+esc(tt||"media")+'"><img src="'+i.thumb+'" alt="'+esc(tt)+'" loading="lazy">'+(i.type==="video"?'<span class="play"></span>':"")+(tt?'<cite>'+esc(tt)+'</cite>':"")+'</button>'}).join("")+'</div>':'<div class="empty">'+esc(g.empty)+'</div>';
 $("gallery-b").innerHTML='<h2>'+esc(g.title)+'</h2><p class="sub">'+esc(g.sub)+'</p>'+f+body;
}
function open(k){idx=k;var i=view[k],tt=T(i);
 $("lb-c").innerHTML=(i.type==="video"?'<video src="'+i.src+'" poster="'+i.thumb+'" controls autoplay playsinline></video>':'<img src="'+i.src+'" alt="'+esc(tt)+'">')+(tt?'<p>'+esc(tt)+'</p>':"");
 $("lb").hidden=false;document.body.style.overflow="hidden"}
function close(){$("lb").hidden=true;$("lb-c").innerHTML="";document.body.style.overflow=""}
function step(d){if(!view.length)return;open((idx+d+view.length)%view.length)}
document.addEventListener("click",function(ev){var t=ev.target;
 var b=t.closest("[data-l]");if(b){lang=b.dataset.l;try{localStorage.setItem("vl",lang)}catch(e){}render();return}
 b=t.closest("[data-c]");if(b){cat=b.dataset.c;gallery();return}
 b=t.closest(".g");if(b){open(+b.dataset.k);return}
 if(t.closest("#nav a"))$("nav").classList.remove("open");
 if(t.closest("#burger"))$("nav").classList.toggle("open");
 if(t.id==="lb"||t.id==="lb-x")close();
 if(t.id==="lb-p")step(-1);if(t.id==="lb-nx")step(1)});
document.addEventListener("keydown",function(e){if($("lb").hidden)return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1)});
render();
})();
