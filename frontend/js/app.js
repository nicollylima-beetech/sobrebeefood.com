/* Central SDR BeeFood — frontend
   O conteúdo vem do backend (GET /api/conteudo). Este arquivo só cuida da tela. */
let FLOWS,KB,FAQ,PLANOS,PLANO_MSGS,PRATICAS,BITRIX,REGRAS;
const API=window.BEEFOOD_API||"/api";
const toItem=x=>{const o={};if(x.mensagem)o.m=x.mensagem;if(x.orientacao)o.n=x.orientacao;return o};

async function carregar(){
  const r=await fetch(API+"/conteudo");
  if(!r.ok)throw new Error("HTTP "+r.status);
  const d=await r.json();
  FLOWS=d.roteiros;
  KB=d.funcionalidades.map(x=>[x.categoria,x.titulo,toItem(x)]);
  FAQ=d.duvidas.map(x=>[x.titulo,toItem(x)]);
  PLANOS=d.planos.planos;
  PLANO_MSGS=d.planos.mensagens.map(x=>[x.titulo,toItem(x)]);
  BITRIX=d["boas-praticas"].bitrix.map(b=>[b.etapa,b.descricao,b.tipo||undefined]);
  PRATICAS=d["boas-praticas"].grupos.map(g=>[g.grupo,g.itens.map(i=>[i.titulo,i.texto,i.destaque?1:0])]);
  REGRAS=d.regras.map(i=>[i.titulo,i.texto,i.destaque?1:0]);
}

carregar().then(iniciar).catch(e=>{
  document.querySelector("#view").innerHTML='<p class="empty">Não foi possível carregar o conteúdo ('+e.message+'). Verifique se o backend está rodando com <b>npm start</b> na pasta backend.</p>';
});

function iniciar(){
const $=s=>document.querySelector(s);
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const linkify=s=>esc(s).replace(/https?:\/\/[^\s<]+/g,u=>{let h=u;try{const x=new URL(u.replace(/&amp;/g,'&'));h=x.hostname.replace(/^www\./,'')+(x.pathname.length>1?x.pathname.slice(0,28)+(x.pathname.length>28?'…':''):'')}catch(e){}return `<a href="${u}" target="_blank" rel="noopener">${h}</a>`});
const clean=t=>t.replace(/^(\d\uFE0F?\u20E3|\d-)\s*/,'');
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const hl=(html,q)=>{if(!q)return html;const re=new RegExp("("+q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","gi");return (">"+html).replace(/(>[^<]*)/g,m=>m.replace(re,"<mark>$1</mark>")).slice(1)};

const ROUTES=[
 {id:"inicio",label:"Início",grp:null},
 {id:"delivery",label:"Roteiro Delivery",grp:"Prospecção"},
 {id:"presencial",label:"Roteiro Presencial",grp:"Prospecção"},
 {id:"planos",label:"Planos e preços",grp:"Consulta"},
 {id:"funcionalidades",label:"Funcionalidades",grp:"Consulta",n:KB.length},
 {id:"duvidas",label:"Dúvidas gerais",grp:"Consulta",n:FAQ.length},
 {id:"praticas",label:"Boas práticas SDR",grp:"Time"},
 {id:"regras",label:"Regras BeeFood",grp:"Time"}
];
const state={route:"inicio",q:"",cat:"Todas",flow:{delivery:{cur:"s01",ans:{}},presencial:{cur:"p01",ans:{}}}};

function nav(){let g=null,h="";ROUTES.forEach(r=>{if(r.grp&&r.grp!==g){g=r.grp;h+=`<div class="grp">${g}</div>`}h+=`<a href="#${r.id}" class="${state.route===r.id&&!state.q?'on':''}">${r.label}${r.n?`<span class="n">${r.n}</span>`:''}</a>`});$("#nav").innerHTML=h}

function copyBtn(id){return `<button class="btn" type="button" data-copy="${id}">Copiar</button>`}
const COPY={};let cid=0;
function kItem(title,o,tag,q,open){
  let body="";
  if(o.n)body+=`<div class="note"><b>Para o SDR:</b> ${hl(linkify(o.n),q)}</div>`;
  if(o.m){const id="c"+(cid++);COPY[id]=o.m;body+=`<div class="chat"><div class="bubble">${hl(linkify(o.m),q)}</div>${copyBtn(id)}</div>`}
  return `<details class="k"${open?' open':''}><summary>${tag?`<span class="tag">${tag}</span>`:''}${hl(esc(title),q)}</summary><div class="kbody">${body}</div></details>`;
}
function head(eb,t,lede,extra=""){return `<div class="ph"><div><div class="eyebrow">${eb}</div><h1>${t}</h1>${lede?`<p class="lede">${lede}</p>`:''}</div>${extra}</div>`}

/* views */
function vInicio(){
 return `<section class="hero"><div>
   <div class="eyebrow" style="color:var(--honey)">Olá! Seja muito bem-vindo(a)! 💛🐝</div>
   <h1 style="margin-top:8px">Tudo o que o SDR precisa para <em>responder bem</em> cada lead.</h1>
   <p>Este site foi criado para te ajudar a entender como responder aos leads de forma eficaz e como aplicar esse conhecimento na prática. Aqui você aprende as melhores abordagens e tira suas dúvidas sobre o processo. Fique à vontade para consultar!</p></div>
   <div class="facts">
    <div class="fact"><b>30+</b><span>calls por dia, de quarta a sexta</span></div>
    <div class="fact"><b>10 dias</b><span>de teste grátis para o lead</span></div>
    <div class="fact"><b>10h–22h</b><span>suporte de segunda a sábado</span></div>
    <div class="fact"><b>5 GDC</b><span>tentativas antes da Geladeira</span></div>
   </div></section>
  <div class="cards">
   <a class="card" href="#delivery"><b>Roteiro Delivery</b><span>Qualificação passo a passo, com resumo automático.</span></a>
   <a class="card" href="#presencial"><b>Roteiro Presencial</b><span>Mesas (garçons) e Balcão (PDV).</span></a>
   <a class="card" href="#planos"><b>Planos e preços</b><span>Zangão, Rainha e BeeFood lado a lado.</span></a>
   <a class="card" href="#funcionalidades"><b>Funcionalidades</b><span>${KB.length} explicações prontas para enviar.</span></a>
   <a class="card" href="#duvidas"><b>Dúvidas gerais</b><span>${FAQ.length} respostas para perguntas frequentes.</span></a>
   <a class="card" href="#praticas"><b>Boas práticas e Bitrix</b><span>Como falar com o lead e mover os cards.</span></a>
  </div>
  <div class="two">
   <div class="box"><h2>Sobre a BeeFood</h2><div class="prose">
    <p>A BeeFood possui mais de 5 anos de atuação no mercado, iniciando sua trajetória sob o nome BeeTech. Ao longo do tempo, a empresa passou por uma evolução estratégica, direcionando seu foco exclusivamente para o setor alimentício.</p>
    <p>Com essa especialização, a BeeFood passou a desenvolver soluções cada vez mais alinhadas às necessidades de restaurantes e operações de delivery, consolidando sua expertise no segmento e oferecendo uma plataforma eficiente e orientada a resultados.</p>
    <p>Tudo começou com a visão de criar um sistema que realmente resolvesse os problemas reais dos restaurantes. Com foco em praticidade e resultados, a plataforma centraliza pedidos de balcão e marketplaces como iFood, 99Food e Keeta, proporcionando mais controle, agilidade e redução de erros no dia a dia.</p></div></div>
   <div class="box"><h2>Para que serve este site</h2><div class="prose">
    <p>Serve principalmente para você entender o que cada funcionalidade faz. Além disso, ele ajuda diretamente no processo de prospecção, tornando o trabalho mais eficiente e informativo.</p>
    <p>Use a busca no topo para achar qualquer assunto: ela procura em funcionalidades, dúvidas, boas práticas e regras ao mesmo tempo.</p>
    <p>Site sempre em atualização. Se procurou alguma informação e não achou, solicite contato com a Nicolly.</p></div></div>
  </div>`}

function vFlow(key){
 const F=FLOWS[key],S=state.flow[key],other=key==="delivery"?"presencial":"delivery";
 const label={"@delivery":"Roteiro Delivery","@presencial":"Roteiro Presencial"};F.steps.forEach(s=>label[s.id]=`${s.code} · ${s.title}`);
 const steps=F.steps.map(s=>{const id="c"+(cid++);COPY[id]=s.msg;return `
  <section class="step${s.id===S.cur?' active':''}" id="${s.id}">
   <div class="step-head"><span class="code mono">${s.code}</span><h2>${s.title}</h2><span class="when">${s.when}</span></div>
   <div class="chat"><div class="bubble">${esc(s.msg)}</div>${copyBtn(id)}</div>
   ${s.note?`<div class="note">${s.note}</div>`:""}
   ${s.extra?(()=>{const x="c"+(cid++);COPY[x]=s.extra[1];return `<div class="opts"><div class="lbl">${s.extra[0]}</div><div class="chat"><div class="bubble">${esc(s.extra[1])}</div>${copyBtn(x)}</div></div>`})():""}
   ${s.opts?`<div class="opts"><div class="lbl">Resposta do lead</div><div class="opt-list">${s.opts.map((o,i)=>`
     <button class="opt${S.ans[s.key]===clean(o[0])?' sel':''}" type="button" data-flow="${key}" data-step="${s.id}" data-i="${i}">
     <span class="a">${o[0]}</span><span class="go">→ ${label[o[1]]}</span></button>`).join("")}</div></div>`:""}
   ${s.free?`<div class="opts"><div class="lbl">Anotar resposta</div><div class="chat">
     <input class="field" id="f-${s.id}" value="${esc(S.ans[s.key]||'')}" placeholder="Ex.: ${s.free}">
     <button class="btn primary" type="button" data-flow="${key}" data-next="${s.id}">Seguir → ${label[s.next]}</button></div></div>`:""}
  </section>`}).join("");
 const map=F.steps.map(s=>`<li><a href="#${s.id}" data-flow="${key}" data-jump="${s.id}" class="${s.id===S.cur?'cur':''}"><span class="code mono">${s.code}</span><span class="${s.key&&S.ans[s.key]?'done':''}">${s.title}</span></a></li>`).join("");
 const sum=F.keys.filter(k=>k!=="Previsão de PC"||S.ans[k]).map(k=>`<dt>${k}</dt><dd class="${S.ans[k]?'':'empty'}">${S.ans[k]?esc(S.ans[k]):'—'}</dd>`).join("");
 return head("Prospecção",F.title,F.lede,`<a class="btn" href="#${other}">Ir para ${FLOWS[other].title} →</a>`)+
  `<div class="fgrid"><aside class="fside"><div class="sticky">
    <div class="panel"><h3>Mapa da conversa</h3><ol class="map">${map}</ol></div>
    <div class="panel sum"><h3>Resumo para o vendedor</h3><dl>${sum}</dl>
     <div class="actions"><button class="btn primary" type="button" data-sum="${key}">Copiar resumo</button><button class="btn" type="button" data-reset="${key}">Novo lead</button></div></div>
   </div></aside><div class="steps">${steps}</div></div>`}

function vPlanos(){
 const cards=PLANOS.map(p=>`<article class="plan${p.top?' top':''}"><div><h2>${p.i} ${p.n}</h2><div class="tagline">${p.t}</div></div>
  <div class="price">
   <div class="row"><span class="k">Anual</span><span><span class="v">${p.anual}</span></span></div>
   <div class="row"><span class="k">Anual no Pix (−5%)</span><span class="v">${p.pix}</span></div>
   <div class="row"><span class="k">Cartão</span><span class="s">até ${p.x}<br>sem juros</span></div>
   <div class="row"><span class="k">Mensal</span><span><span class="v">${p.mensal}</span><div class="s">+ R$ 150,00 de implantação no 1º mês</div></span></div>
  </div>
  <ul class="feat">${p.inh?`<li class="inh">${p.inh}</li>`:''}${p.f.map(x=>`<li>${x}</li>`).join("")}</ul></article>`).join("");
 return head("Consulta","Planos e preços","Valores e o que cada plano inclui. Abaixo, as mensagens prontas para enviar ao lead.")+
  `<div class="plans">${cards}</div><h2 class="sec-h">Mensagens sobre planos</h2><div class="klist">${PLANO_MSGS.map(([t,o])=>kItem(t,o)).join("")}</div>`}

function vFunc(){
 const cats=["Todas",...new Set(KB.map(k=>k[0]))];
 const chips=`<div class="chips">${cats.map(c=>`<button class="chip${state.cat===c?' on':''}" type="button" data-cat="${c}">${c}</button>`).join("")}</div>`;
 const groups=cats.slice(1).filter(c=>state.cat==="Todas"||state.cat===c).map(c=>{const it=KB.filter(k=>k[0]===c);
  return `<div class="kgroup"><h2>${c} <span class="c">${it.length}</span></h2><div class="klist">${it.map(k=>kItem(k[1],k[2])).join("")}</div></div>`}).join("");
 return head("Consulta","Funcionalidades","O que cada funcionalidade faz, com a mensagem pronta para copiar. Orientações internas aparecem em amarelo e não vão para o lead.")+chips+groups}

function vDuvidas(){return head("Consulta","Dúvidas gerais","Respostas para as perguntas que os leads mais fazem.")+`<div class="klist">${FAQ.map(([t,o])=>kItem(t,o)).join("")}</div>`}

function vPraticas(){
 return head("Time","Boas práticas SDR","Como nos comunicamos com o lead e organizamos o trabalho.")+
 `<div class="box" style="margin-bottom:26px"><h2>Como funciona o Bitrix</h2><p class="lede" style="margin:0 0 14px">GDC = dia de tentativa de contato. O lead avança uma etapa por dia sem resposta.</p>
   <div class="pipe">${BITRIX.map(b=>`<div class="pst ${b[2]||''}"><b>${b[0]}</b><span>${b[1]}</span></div>`).join("")}</div>
   <div class="note" style="margin-top:14px"><b>AQUECIMENTO:</b> leads especiais que já tiveram conversa anterior, mas ainda têm dúvidas. Acompanhe de perto.</div></div>`+
 PRATICAS.map(([g,it])=>`<h2 class="sec-h">${g}</h2><div class="rules">${it.map(r=>`<div class="rule${r[2]?' alert':''}"><h3>${r[0]}</h3><p>${esc(r[1])}</p></div>`).join("")}</div>`).join("")}

function vRegras(){return head("Time","Regras BeeFood","Regras internas de convivência, horários e processos.")+`<div class="rules">${REGRAS.map(r=>`<div class="rule${r[2]?' alert':''}"><h3>${r[0]}</h3><p>${esc(r[1])}</p></div>`).join("")}</div>`}

function vBusca(q){
 const nq=norm(q),m=o=>norm(o.join(" ")).includes(nq);
 const res=[];
 KB.forEach(k=>{if(m([k[1],k[2].m||"",k[2].n||""]))res.push(kItem(k[1],k[2],k[0],q,true))});
 PLANO_MSGS.forEach(k=>{if(m([k[0],k[1].m||""]))res.push(kItem(k[0],k[1],"Planos",q,true))});
 FAQ.forEach(k=>{if(m([k[0],k[1].m||"",k[1].n||""]))res.push(kItem(k[0],k[1],"Dúvida",q,true))});
 PRATICAS.forEach(([g,it])=>it.forEach(r=>{if(m([r[0],r[1]]))res.push(kItem(r[0],{n:r[1]},"Boa prática",q,true))}));
 REGRAS.forEach(r=>{if(m([r[0],r[1]]))res.push(kItem(r[0],{n:r[1]},"Regra",q,true))});
 return head("Busca",`Resultados para “${esc(q)}”`,`${res.length} ${res.length===1?'resultado':'resultados'} em funcionalidades, planos, dúvidas, boas práticas e regras.`)+
  (res.length?`<div class="klist">${res.join("")}</div>`:`<p class="empty">Nada encontrado. Tente outra palavra ou solicite contato com a Nicolly.</p>`)}

function render(scrollTo){
 for(const k in COPY)delete COPY[k];cid=0;
 const q=state.q.trim();
 const V={inicio:vInicio,delivery:()=>vFlow("delivery"),presencial:()=>vFlow("presencial"),planos:vPlanos,funcionalidades:vFunc,duvidas:vDuvidas,praticas:vPraticas,regras:vRegras};
 $("#view").innerHTML=q.length>=2?vBusca(q):V[state.route]();
 const r=ROUTES.find(x=>x.id===state.route);$("#crumb").textContent=q.length>=2?"":(r.grp?r.grp+" · ":"")+r.label;
 nav();
 const on=document.querySelector("#nav a.on");on&&on.scrollIntoView({block:"nearest",inline:"nearest"});
 if(scrollTo){const el=document.getElementById(scrollTo);el&&el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
}
function route(){const h=location.hash.slice(1);const r=ROUTES.find(x=>x.id===h);if(r){state.route=r.id;state.q="";$("#q").value="";render();window.scrollTo(0,0)}}
window.addEventListener("hashchange",route);

function toast(t){const e=$("#toast");e.textContent=t;e.hidden=false;clearTimeout(e._t);e._t=setTimeout(()=>e.hidden=true,1600)}
async function copy(text,btn){
 try{await navigator.clipboard.writeText(text);toast("Copiado");if(btn){const o=btn.textContent;btn.classList.add("ok");btn.textContent="Copiado";setTimeout(()=>{btn.classList.remove("ok");btn.textContent=o},1400)}}
 catch(e){toast("Selecione o texto e copie com Ctrl+C")}
}
function goStep(key,id){state.flow[key].cur=id;render(id)}
function switchFlow(to,from){state.route=to;const a=state.flow[from].ans["Operação"];if(a)state.flow[to].ans["Operação"]=a;history.replaceState(null,"","#"+to);render();window.scrollTo(0,0);toast("Continue no "+FLOWS[to].title)}

document.addEventListener("click",e=>{
 const na=e.target.closest("#nav a, .card");if(na&&na.getAttribute("href")==="#"+state.route&&state.q){e.preventDefault();state.q="";$("#q").value="";render();return}
 const c=e.target.closest("[data-copy]");if(c){copy(COPY[c.dataset.copy],c);return}
 const cat=e.target.closest("[data-cat]");if(cat){state.cat=cat.dataset.cat;render();return}
 const o=e.target.closest(".opt[data-flow]");if(o){const key=o.dataset.flow,S=state.flow[key],s=FLOWS[key].steps.find(x=>x.id===o.dataset.step),[txt,nx]=s.opts[+o.dataset.i];
   S.ans[s.key]=clean(txt);
   if(s.key==="Dispositivo"&&!/nopc/.test(nx))delete S.ans["Previsão de PC"];
   if(nx[0]==="@"){switchFlow(nx.slice(1),key);return}
   goStep(key,nx);return}
 const n=e.target.closest("[data-next]");if(n){const key=n.dataset.flow,S=state.flow[key],s=FLOWS[key].steps.find(x=>x.id===n.dataset.next),v=$("#f-"+s.id).value.trim();if(v)S.ans[s.key]=v;else delete S.ans[s.key];goStep(key,s.next);return}
 const j=e.target.closest("[data-jump]");if(j){e.preventDefault();goStep(j.dataset.flow,j.dataset.jump);return}
 const sm=e.target.closest("[data-sum]");if(sm){const key=sm.dataset.sum,S=state.flow[key];const t=`🐝 Resumo do lead (${FLOWS[key].title})\n`+FLOWS[key].keys.filter(k=>S.ans[k]).map(k=>`• ${k}: ${S.ans[k]}`).join("\n");copy(t,sm);return}
 const rs=e.target.closest("[data-reset]");if(rs){const key=rs.dataset.reset;state.flow[key]={cur:FLOWS[key].steps[0].id,ans:{}};render(state.flow[key].cur);toast("Pronto para o próximo lead");return}
});
let qt;$("#q").addEventListener("input",e=>{clearTimeout(qt);qt=setTimeout(()=>{state.q=e.target.value;render()},150)});

const h0=location.hash.slice(1);if(ROUTES.some(r=>r.id===h0))state.route=h0;
render();
}
