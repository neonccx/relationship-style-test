(() => {
  const $ = id => document.getElementById(id);
  const intro = $('intro'), quiz = $('quiz'), result = $('result');
  const signs = [
    ['白羊座','♈','火','喜欢时通常更愿意主动制造见面和互动，行为会比暗示更明显。'],
    ['金牛座','♉','土','喜欢时常通过稳定出现、记住需求和实际照顾表达，不一定说得很快。'],
    ['双子座','♊','风','喜欢时会主动分享新鲜事、延长话题，也愿意不断了解你的想法。'],
    ['巨蟹座','♋','水','喜欢时会关注你的情绪和生活细节，并逐渐把你放进自己的安全圈。'],
    ['狮子座','♌','火','喜欢时通常愿意让你感受到重视，也更希望得到明确、积极的回应。'],
    ['处女座','♍','土','喜欢可能藏在具体帮助、细节记忆和持续调整里，表达往往克制但可验证。'],
    ['天秤座','♎','风','喜欢时会维持互动氛围、照顾感受，但是否落实到行动比暧昧感更重要。'],
    ['天蝎座','♏','水','喜欢时会逐渐增加真实分享和信任投入，但健康的喜欢依然应尊重边界。'],
    ['射手座','♐','火','喜欢时愿意邀请你进入自己的体验和计划，自由感不等于长期失联。'],
    ['摩羯座','♑','土','喜欢时更容易用可靠、负责和长期安排表达，承诺通常需要行动支撑。'],
    ['水瓶座','♒','风','喜欢时会分享独特想法并为你保留专属连接，同时仍需要个人空间。'],
    ['双鱼座','♓','水','喜欢时共情和浪漫感可能很强，但要看温柔是否同时伴随稳定行动。']
  ];
  const signProfiles=[
    {need:'直接的回应和一起行动',conflict:'情绪来得快，容易先说后想',mode:'开创'},
    {need:'稳定、确定和能落地的陪伴',conflict:'不舒服时容易沉默，也不轻易让步',mode:'固定'},
    {need:'聊得来、保持好奇和新鲜感',conflict:'压力太重时会转移话题或抽离',mode:'变动'},
    {need:'被在意、被照顾的安全感',conflict:'受伤后容易缩回去，等对方来哄',mode:'开创'},
    {need:'被肯定、被明确选择',conflict:'自尊受伤时容易强撑或变得强势',mode:'固定'},
    {need:'可靠、细致和愿意一起变好',conflict:'着急时容易挑细节，让关心听起来像批评',mode:'变动'},
    {need:'和谐、回应与关系里的平衡',conflict:'怕把气氛弄坏，可能拖着不说真实答案',mode:'开创'},
    {need:'深度、忠诚和不敷衍的信任',conflict:'没安全感时容易试探、冷下来或记很久',mode:'固定'},
    {need:'坦诚、空间和共同体验',conflict:'被束缚时会躲开，讲话也可能太直接',mode:'变动'},
    {need:'长期、靠谱和看得到未来',conflict:'压力大时先解决问题，却忘了回应情绪',mode:'开创'},
    {need:'精神同频，也保留各自空间',conflict:'情绪太浓时会理性化，看起来像突然变冷',mode:'固定'},
    {need:'共情、浪漫和被温柔接住',conflict:'害怕冲突时容易委屈自己或逃进想象',mode:'变动'}
  ];
  const stages = ['暗恋观察中','暧昧接触中','正在恋爱','关系冷淡/复联'];
  const questions = [
    ['最近一个月，TA会主动发起聊天，而不只是回复你。','i'],
    ['TA会提出见面、通话或一起做具体事情。','i'],
    ['一段对话停下来后，TA也会主动重新开启联系。','i'],
    ['TA只在无聊、深夜或需要帮助时才想起你。','i',true],
    ['TA会把你放进近期计划，例如周末或下次安排。','i'],
    ['TA看到有趣或与你有关的内容时，会自然想到并分享给你。','i'],
    ['TA的回应节奏总体可预期，即使忙也不会长期无解释消失。','c'],
    ['TA答应的事情通常会做到，临时变化也会说明。','c'],
    ['TA说的话和实际行动大体一致。','c'],
    ['TA经常突然很热情，随后又毫无解释地冷淡。','c',true],
    ['你不需要反复猜测，基本知道TA会不会出现。','c'],
    ['忙碌或情绪不好时，TA愿意简单说明，而不是让你承担所有不确定。','c'],
    ['TA记得你提过的小事、偏好或重要安排。','v'],
    ['TA愿意为你腾出时间，而不只是接受你的配合。','v'],
    ['TA会追问你的感受和想法，而不是只聊自己。','v'],
    ['当你需要支持时，TA愿意提供与关系阶段相称的关心。','v'],
    ['TA愿意让你逐渐了解其真实生活，而不只停留在表面暧昧。','v'],
    ['你表达过一个合理需要后，TA会尝试调整，而不是敷衍过去。','v'],
    ['TA尊重你的拒绝、节奏和私人空间。','r'],
    ['当你询问关系方向时，TA愿意认真回应，而不是嘲讽或转移。','r'],
    ['TA不会用失联、吃醋或暧昧他人来故意刺激你。','r'],
    ['出现分歧时，TA能听你说完，不用羞辱或威胁控制你。','r'],
    ['这段相处总体让你感到被尊重，而不是长期自我怀疑。','r'],
    ['TA不会要求你用金钱、隐私或越界行为证明喜欢。','r']
  ];
  const answerLabels = ['几乎没有','比较少','一半一半','比较符合','非常符合'];
  const verdicts = {
    strong:{name:'可以往前走一步',tag:'说直白一点：TA大概率不只是把你当普通朋友。TA给你的不只是暧昧感，还有持续的行动。',why:'TA没有只把话说得好听，而是在联系、时间和照顾上都留出了你的位置。这种“嘴上和行动对得上”的状态，才是判断好感最有分量的部分。',risk:'别因为感觉不错，就把确认关系的全部工作都揽过来。你可以向前一步，但下一步要看TA会不会也向你走。',decision:'建议继续，而且可以主动一点。你现在需要的不是再猜一个月，而是给这段关系一次自然升级的机会。',steps:['这周内提出一次具体邀约：明确时间、地点和事情，不发“有空约”这种模糊消息。','见面后表达一点真实好感，不用直接逼问“你喜不喜欢我”。','接下来两周观察TA是否主动安排下一次；如果有，这段关系就在真正往前走。'],script:'我跟你相处的时候挺开心的，也确实想更认真地了解你。这个周末要不要一起吃个饭？'},
    warm:{name:'可以继续，但别急着全押',tag:'TA对你应该是有好感的，只是这份好感还没有完全变成稳定的投入。现在适合推进一次，不适合一个人用力到底。',why:'TA会靠近你，也会给出一些在意，但关键时刻还不够确定。可能是慢热，也可能只是暂时享受这份亲近；区别要靠下一次行动来验证。',risk:'最容易踩的坑，是把几次热情当成“TA只是还没准备好”。准备没准备好不重要，愿不愿意持续为你腾出时间才重要。',decision:'可以继续接触，但只推进一次，然后把球交给TA。TA如果接得住，就继续；如果又含糊过去，就别再替TA找理由。',steps:['发出一次有时间范围的邀约，例如“周六下午一起喝咖啡吗”。','如果TA有事，观察TA会不会主动换时间；只说“下次吧”不算推进。','给这段关系两到四周。期间仍然只有聊天、没有行动，就把投入降下来。'],script:'最近和你聊天我挺开心的。周六下午要不要一起喝杯咖啡？如果你没空，也可以告诉我你方便的时间。'},
    mixed:{name:'先停一下，看看TA会不会走过来',tag:'TA不是完全没感觉，但现在的信号太矛盾：有时靠近，有时又让你一个人收拾不确定。先别继续加码。',why:'你会心动，不是因为你想太多，而是TA确实给过一些积极回应；可问题在于，这些回应没有稳定到能支撑一段关系。',risk:'你现在最容易做的，是盯着某次秒回、某句暧昧或某个眼神，忽略大部分时候仍然是你在推进。偶尔心动，不等于愿意负责。',decision:'暂时不要表白，也不要突然消失试探。把主动频率降到和TA差不多，只给一次明确沟通机会。',steps:['未来一周不额外制造话题，看看TA会不会主动找你。','如果TA联系你，就直接问清楚TA想把关系往哪里放，不绕弯子。','如果TA继续享受暧昧却回避行动，就把答案理解为“现在不够喜欢”，而不是“再等等”。'],script:'我很珍惜我们现在的相处，但不太想一直靠猜。你是想继续认真了解彼此，还是更适合做朋友？'},
    low:{name:'不建议继续追着这段关系跑',tag:'可能有点难听，但目前看不到TA愿意认真发展这段关系的行动。你再努力，改变的更可能是你的消耗，不是TA的心意。',why:'如果一个人长期不主动、不落实、也不关心你的感受，那问题通常不是“不会表达”，而是这段关系没有排在足够靠前的位置。',risk:'别再拿星座、慢热、工作忙替TA补完解释。一个人可以忙，也可以内向，但仍然能够做到不让你长期靠猜。',decision:'建议停止追加投入。你可以做一次最后确认，但不要把“等TA改变”当成下一阶段计划。',steps:['先停止追问、秒回和随叫随到，把联系恢复到不消耗你的程度。','如果你需要一个明确收尾，就发下面这句话，只问一次。','对方若继续含糊或不回应，就按“不愿意发展”处理，把注意力收回来。'],script:'我想要的是比较明确、双向的关系。如果你没有继续发展的想法，可以直接告诉我，我会尊重，也不会再打扰。'},
    unsafe:{name:'先别谈发展，先保护自己',tag:'现在最重要的已经不是TA喜不喜欢你，而是这段相处有没有伤害你。喜欢不能抵消控制、羞辱、威胁或越界。',why:'能不能继续之前，先看你能不能安全地说“不”。如果拒绝会换来惩罚、失联威胁或隐私压力，这就不是正常的关系磨合。',risk:'不要一个人去见面摊牌，也不要试图用更多温柔换取TA停止越界。出现威胁、跟踪、强迫、金钱控制或隐私勒索时，要优先求助。',decision:'不建议继续推进。先拉开距离、保存必要记录，并让可信任的人知道你的处境。',steps:['减少单独接触，不在对方情绪激动时争论关系。','把相关聊天、转账或威胁信息妥善保存，并告诉可信任的人。','如果你感到现实危险，联系当地警方或专业支持机构，不要独自处理。'],script:'这种相处方式已经让我不舒服。我不会继续接受，也请你尊重我的边界，不要再用这种方式联系我。'}
  };
  let selfSign=null, partnerSign=null, stage=null, index=0, answers=[], lastScores=null;

  function makeSignButtons(containerId, onSelect){
    const container=$(containerId);
    signs.forEach((sign,i)=>{const b=document.createElement('button');b.type='button';b.className='zodiac';b.innerHTML=`<span class="zodiac-symbol">${sign[1]}</span><span>${sign[0]}</span><small>${sign[2]}象</small>`;b.addEventListener('click',()=>{container.querySelectorAll('.zodiac').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');onSelect(i);updateStart()});container.appendChild(b)});
  }
  makeSignButtons('zodiacGrid',i=>selfSign=i);
  makeSignButtons('partnerZodiacGrid',i=>partnerSign=i);
  stages.forEach((label,i)=>{const b=document.createElement('button');b.type='button';b.className='stage';b.textContent=label;b.addEventListener('click',()=>{$('stageGrid').querySelectorAll('.stage').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');stage=i;updateStart()});$('stageGrid').appendChild(b)});
  function updateStart(){const ready=selfSign!==null&&partnerSign!==null&&stage!==null;$('start').disabled=!ready;$('start').textContent=ready?'开始分析你们的关系':'完成上面选择后开始'}
  function show(el){[intro,quiz,result].forEach(x=>x.classList.add('hidden'));el.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})}
  function render(){const q=questions[index];$('qnum').textContent=`QUESTION ${String(index+1).padStart(2,'0')}`;$('qtext').textContent=q[0];$('progressText').textContent=`第 ${index+1} / ${questions.length} 题`;$('fill').style.width=`${(index+1)/questions.length*100}%`;$('back').style.visibility=index?'visible':'hidden';$('scale').innerHTML='';answerLabels.forEach((label,i)=>{const b=document.createElement('button');b.className='option';b.innerHTML=`<span>${label}</span><span>${i+1}</span>`;b.addEventListener('click',()=>choose(i+1));$('scale').appendChild(b)})}
  function choose(value){answers[index]=value;if(index<questions.length-1){index++;render()}else finish()}
  function drawRadar(scores){const canvas=$('radar'),rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(rect.width,280),h=320;canvas.width=w*dpr;canvas.height=h*dpr;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);const cx=w/2,cy=h/2+4,r=Math.min(w*.31,108),keys=['i','c','v','r'],names=['主动','稳定','投入','尊重'];const point=(n,ratio=1)=>{const a=-Math.PI/2+n*Math.PI/2;return[cx+Math.cos(a)*r*ratio,cy+Math.sin(a)*r*ratio]};for(let ring=1;ring<=4;ring++){ctx.beginPath();keys.forEach((_,n)=>{const p=point(n,ring/4);n?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.closePath();ctx.strokeStyle='rgba(230,225,255,.14)';ctx.stroke()}keys.forEach((_,n)=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(...point(n));ctx.strokeStyle='rgba(230,225,255,.12)';ctx.stroke()});ctx.beginPath();keys.forEach((k,n)=>{const p=point(n,scores[k]/100);n?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.closePath();const g=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r);g.addColorStop(0,'rgba(143,108,255,.55)');g.addColorStop(1,'rgba(230,187,115,.42)');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#d9c6ff';ctx.lineWidth=2;ctx.stroke();keys.forEach((k,n)=>{const p=point(n,scores[k]/100);ctx.beginPath();ctx.arc(p[0],p[1],4,0,Math.PI*2);ctx.fillStyle='#f0cc87';ctx.fill();const lp=point(n,1.24);ctx.fillStyle='#eee9fb';ctx.font='600 13px system-ui';ctx.textAlign=n===1?'left':n===3?'right':'center';ctx.textBaseline=n===0?'bottom':n===2?'top':'middle';ctx.fillText(`${names[n]} ${scores[k]}`,lp[0],lp[1])});canvas.setAttribute('aria-label',names.map((n,j)=>`${n}${scores[keys[j]]}分`).join('，'))}
  const dimensionMeta={i:{name:'主动程度',high:'TA愿意主动创造联系和见面的机会',low:'关系主要靠你推动'},c:{name:'稳定回应',high:'TA的出现和承诺具有连续性',low:'热情起伏较大，难以形成稳定预期'},v:{name:'实际投入',high:'TA愿意投入时间、注意力并根据你的需要调整',low:'目前更多停留在聊天或情绪氛围'},r:{name:'边界尊重',high:'TA能尊重你的节奏，也愿意认真回应关系问题',low:'你的边界和安全感没有得到足够照顾'}};
  const evidenceCopy=[
    'TA会主动开启聊天，而不是只等你找TA','TA愿意提出见面、通话或共同安排','聊天中断后，TA也会主动恢复联系','TA并非只在无聊或需要帮助时联系你','TA会把你放进近期计划','TA会主动分享与你有关的内容',
    'TA的回应节奏总体可预期','TA答应的事情大多能够落实','TA说的话与实际行动基本一致','TA没有反复用忽冷忽热制造不确定','你基本知道TA是否会出现','TA忙碌时愿意简单说明状态',
    'TA记得你的偏好和重要细节','TA愿意为你腾出真实时间','TA会追问你的感受，而不是只聊自己','你需要支持时，TA愿意提供关心','TA愿意让你了解真实生活','你表达需要后，TA愿意尝试调整',
    'TA尊重你的拒绝、节奏与私人空间','你询问关系方向时，TA愿意认真回应','TA不会故意用失联或暧昧他人刺激你','发生分歧时，TA仍能保持基本尊重','这段相处总体让你感到被尊重','TA不会要求你用金钱、隐私或越界行为证明喜欢'
  ];
  const stageActions=[
    '你们还在暗恋期，先别突然表白。创造一次自然的单独相处，比在聊天框里反复试探更容易看清答案。',
    '暧昧到这里，需要的不是更多暗示，而是一次具体邀约或一句说清关系方向的话。',
    '你们已经在一起了，不用再证明“喜不喜欢”。直接挑最影响你的那件事，谈一个双方都做得到的改变。',
    '冷淡或复联时，别被一次深夜长聊打动。真正的变化至少要连续出现两到四周。'
  ];
  function relationshipNarrative(scores,key){const order=Object.keys(scores).sort((a,b)=>scores[b]-scores[a]),top=order[0],low=order[3],gap=scores[top]-scores[low],v=verdicts[key];let logic=`先说最明显的：${dimensionMeta[top].high}，这是你会觉得“TA应该是在意我”的主要原因。`;logic+=` 可你一直拿不准，也不是没有原因——${dimensionMeta[low].low}。`;logic+=gap>=28?' 所以TA给你的感觉才会忽近忽远：不是一点感觉都没有，而是靠近的速度赶不上退缩和犹豫。':' 好在TA在几个方面的表现比较一致，不太像只靠偶尔热情吊着你。';return `${logic} ${v.why}`}
  function compatibility(a,b,behaviorKey){
    const mine=signs[a],theirs=signs[b],mp=signProfiles[a],tp=signProfiles[b],pair=[mine[2],theirs[2]].sort().join('');
    const complementary=['火风','土水'];
    let score=mine[2]===theirs[2]?74:complementary.includes(pair)?82:pair==='水火'?57:pair==='土火'?61:pair==='水风'?59:64;
    if(mp.mode===tp.mode)score+=mp.mode==='固定'?-8:mp.mode==='开创'?-5:-2;else score+=3;
    if(a===b)score+=2;
    score=Math.max(45,Math.min(90,score));
    const verdict=score>=78?'整体挺合拍':score>=65?'有吸引力，也要磨合':'节奏差别比较大';
    const same=a===b;
    const title=same?`同为${mine[0]}：很懂彼此，也容易一起较劲`:`${mine[0]}和${theirs[0]}：${verdict}`;
    const sameSpark={火:'你们都不喜欢把喜欢藏太久，关系容易快速升温，也愿意一起行动。',土:'你们都看重可靠和兑现，关系不一定轰轰烈烈，但容易越处越稳。',风:'你们很容易从聊天开始建立连接，彼此的新鲜感和思想交流都比较强。',水:'你们对情绪和潜台词都很敏感，容易产生“终于有人懂我”的亲密感。'};
    const pairSpark={'火风':'一个带来行动，一个带来想法，彼此很容易被点燃，也不太容易无聊。','土水':'一个给稳定，一个给情绪温度，照顾方式不同，却有机会刚好互补。','水火':'吸引力通常不弱：一个热烈直接，一个细腻深刻，靠近时很容易上头。','土火':'一个想快点行动，一个想确认再走；配合好时，一个推动、一个把关系落稳。','水风':'一个重感受，一个重交流，聊得深时会很有连接感，也能打开彼此的新视角。','土风':'一个负责落地，一个带来变化，适合一起做事，也能互相补足生活节奏。'};
    const spark=mine[2]===theirs[2]?sameSpark[mine[2]]:pairSpark[pair];
    const friction=`你不安时可能会${mp.conflict}；TA则可能${tp.conflict}。如果两个人都只按自己的本能反应，很容易把“我需要你”表达成“我在拒绝你”。`;
    const advice=`你更需要${mp.need}，TA更需要${tp.need}。别要求对方用和你一模一样的方式证明喜欢；把需要说具体，比让对方猜更有效。`;
    let text=`从星座相处逻辑看，你们的匹配重点不在“天生配不配”，而在彼此最需要的东西能不能被对方听懂。`;
    text+=behaviorKey==='low'||behaviorKey==='unsafe'?' 但要说清楚：星座再合，也抵不过现实里长期不主动、不尊重。你们当前的行为结果比星座匹配更值得相信。':behaviorKey==='mixed'?' 你们可能确实有吸引力，但现实信号还不稳定，先验证行动，不要只靠“星座很配”继续投入。':' 目前行为信号也支持继续了解，所以这份星座默契有机会在现实中真正发挥作用。';
    return{verdict,title,text,spark,friction,advice};
  }
  function finish(){
    const sums={i:0,c:0,v:0,r:0},counts={i:0,c:0,v:0,r:0},normalized=[];
    questions.forEach((q,n)=>{const value=q[2]?6-answers[n]:answers[n];normalized[n]=value;sums[q[1]]+=value;counts[q[1]]++});
    const scores={};Object.keys(sums).forEach(k=>scores[k]=Math.round((sums[k]-counts[k])/(counts[k]*4)*100));
    const avg=Object.values(scores).reduce((a,b)=>a+b,0)/4;
    const decisive=normalized.filter(v=>v!==3).length;
    let key=scores.r<38?'unsafe':avg>=75?'strong':avg>=60?'warm':avg>=45?'mixed':'low';
    const v=verdicts[key],mine=signs[selfSign],theirs=signs[partnerSign];
    const clarity=decisive>=19?'高':decisive>=13?'中等':'偏低';
    const clarityCopy=decisive>=19?'你的答案很明确，TA的表现不是偶然一两次，这个判断比较站得住。':decisive>=13?'有些信号已经很明显，但仍有几处对不上，先把它当成阶段性判断。':'很多题你都选了“一半一半”。这可能不是你不会判断，而是TA本身就没有给出清楚态度。';
    const strongest=normalized.map((value,n)=>({value,n})).filter(x=>x.value>=4).sort((a,b)=>b.value-a.value).slice(0,3);
    const warnings=normalized.map((value,n)=>({value,n})).filter(x=>x.value<=2).sort((a,b)=>a.value-b.value).slice(0,2);
    const evidence=[...strongest.map(x=>({text:`支持信号：${evidenceCopy[x.n]}`,caution:false})),...warnings.map(x=>({text:`矛盾信号：${evidenceCopy[x.n]}这一点目前并不成立`,caution:true}))];
    if(!evidence.length)evidence.push({text:'你的回答大多处于中间值，目前最真实的结论是：证据还不够，而不是TA一定喜欢或不喜欢。',caution:true});
    const sameElement=mine[2]===theirs[2];
    const starText=`TA是${theirs[0]}。按常见的星座表达，${theirs[3]} 你是${mine[2]}象，TA是${theirs[2]}象，${sameElement?'你们容易懂彼此的节奏，但也可能一起把同一种问题拖下去。':'你们对“怎样才算喜欢”可能不是一个标准：你觉得该说出来，TA可能觉得做到就够；也可能刚好相反。'} 所以星座可以解释差异，但不能替没有行动的人找理由。`;
    const warningText=warnings.length?`有${warnings.length===1?'一件事':'两件事'}别轻轻带过：${warnings.map(x=>evidenceCopy[x.n]).join('；')}。如果这种情况反复发生，就不要再用“TA只是慢热”安慰自己。 ${v.risk}`:`目前没看到特别突出的危险信号，但也别急着把一次好的表现当成长期承诺。 ${v.risk}`;
    const tailoredSteps=[stageActions[stage],...v.steps.slice(0,2)];
    const compat=compatibility(selfSign,partnerSign,key);
    $('resultKicker').textContent=`${mine[0]} × ${theirs[0]} · ${stages[stage]}`;
    $('typeName').textContent=v.name;
    $('tagline').textContent=v.tag;
    $('clarity').textContent=clarity;
    $('clarityText').textContent=clarityCopy;
    $('evidenceList').innerHTML=evidence.map(e=>`<li class="${e.caution?'caution':''}">${e.text}</li>`).join('');
    $('compatVerdict').textContent=compat.verdict;
    $('compatTitle').textContent=compat.title;
    $('compatText').textContent=compat.text;
    $('compatSpark').textContent=compat.spark;
    $('compatFriction').textContent=compat.friction;
    $('compatAdvice').textContent=compat.advice;
    $('starLayer').textContent=starText;
    $('strength').textContent=relationshipNarrative(scores,key);
    $('blindspot').textContent=warningText;
    $('decisionLead').textContent=v.decision;
    $('steps').innerHTML=tailoredSteps.map(x=>`<li>${x}</li>`).join('');
    $('script').textContent=v.script;
    const names={i:'主动程度',c:'稳定回应',v:'实际投入',r:'边界尊重'};
    $('scores').innerHTML=Object.keys(scores).map(k=>`<div class="score"><b>${names[k]} · ${scores[k]}</b><div class="bar"><i style="width:${scores[k]}%"></i></div></div>`).join('');
    lastScores=scores;show(result);requestAnimationFrame(()=>drawRadar(scores));
  }
  $('start').addEventListener('click',()=>{if(selfSign===null||partnerSign===null||stage===null)return;index=0;answers=[];render();show(quiz)});
  $('back').addEventListener('click',()=>{if(index){index--;render()}});
  $('restart').addEventListener('click',()=>{index=0;answers=[];show(intro)});
  $('save').addEventListener('click',()=>{$('toast').classList.add('show');setTimeout(()=>{$('toast').classList.remove('show');window.print()},500)});
  $('copyMessage').addEventListener('click',async()=>{const text=$('script').textContent;try{await navigator.clipboard.writeText(text);$('copyMessage').textContent='已复制，可以直接发';setTimeout(()=>$('copyMessage').textContent='复制这段话',1800)}catch{$('copyMessage').textContent='请长按上方文字复制';setTimeout(()=>$('copyMessage').textContent='复制这段话',1800)}});
  window.addEventListener('resize',()=>{if(lastScores&&!result.classList.contains('hidden'))drawRadar(lastScores)});
})();
