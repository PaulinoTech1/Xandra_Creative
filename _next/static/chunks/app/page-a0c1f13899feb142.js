(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{193:function(e,s,t){Promise.resolve().then(t.bind(t,5636))},5636:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return Q}});var r=t(7437),a=t(2265),l=t(2869),i=t(6070),o=t(2437),n=t(535),c=t(2489),d=t(4508);let x=o.fC,h=o.xz;o.x8;let m=o.h_,u=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)(o.aV,{className:(0,d.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",t),...a,ref:s})});u.displayName=o.aV.displayName;let p=(0,n.j)("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),f=a.forwardRef((e,s)=>{let{side:t="right",className:a,children:l,...i}=e;return(0,r.jsxs)(m,{children:[(0,r.jsx)(u,{}),(0,r.jsxs)(o.VY,{ref:s,className:(0,d.cn)(p({side:t}),a),...i,children:[l,(0,r.jsxs)(o.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",children:[(0,r.jsx)(c.Z,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});f.displayName=o.VY.displayName,a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)(o.Dx,{ref:s,className:(0,d.cn)("text-lg font-semibold text-foreground",t),...a})}).displayName=o.Dx.displayName,a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)(o.dk,{ref:s,className:(0,d.cn)("text-sm text-muted-foreground",t),...a})}).displayName=o.dk.displayName;class g extends a.Component{static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,s){console.error("ErrorBoundary caught an error:",e,s)}render(){if(this.state.hasError){let e=this.props.fallback;return e?(0,r.jsx)(e,{error:this.state.error,reset:()=>this.setState({hasError:!1,error:void 0})}):(0,r.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold text-white mb-4",children:"Something went wrong!"}),(0,r.jsx)("button",{onClick:()=>this.setState({hasError:!1,error:void 0}),className:"px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700",children:"Try again"})]})})}return this.props.children}constructor(e){super(e),this.state={hasError:!1}}}var j=t(1047);function v(){let[e,s]=(0,a.useState)(!1),[t,i]=(0,a.useState)(!0);return t?(0,r.jsx)("div",{className:(0,d.cn)("fixed bottom-4 right-4 z-50 transition-all duration-300",e?"w-auto":"w-80 max-w-[calc(100vw-2rem)]"),children:(0,r.jsx)("div",{className:"bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px] rounded-lg shadow-2xl shadow-purple-500/50",children:(0,r.jsx)("div",{className:"bg-slate-900/95 backdrop-blur-md rounded-lg",children:e?(0,r.jsxs)("button",{onClick:()=>s(!1),className:"p-3 flex items-center gap-2 hover:bg-purple-800/30 rounded-lg transition-colors",children:[(0,r.jsx)("span",{className:"text-xl",children:"\uD83E\uDDDA"}),(0,r.jsx)("span",{className:"text-sm font-medium text-white",children:"Merch"})]}):(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-2xl",children:"\uD83E\uDDDA"}),(0,r.jsx)("h3",{className:"text-lg font-bold text-white",children:"Buy my merch!  "})]}),(0,r.jsxs)("div",{className:"flex gap-1",children:[(0,r.jsx)(l.z,{variant:"ghost",size:"icon",className:"h-6 w-6 text-purple-300 hover:text-white hover:bg-purple-800/50",onClick:()=>s(!0),children:(0,r.jsx)(j.Z,{className:"h-4 w-4"})}),(0,r.jsx)(l.z,{variant:"ghost",size:"icon",className:"h-6 w-6 text-purple-300 hover:text-white hover:bg-purple-800/50",onClick:()=>i(!1),children:(0,r.jsx)(c.Z,{className:"h-4 w-4"})})]})]}),(0,r.jsx)("a",{href:"https://www.etsy.com/shop/shopsmockstudio",target:"_blank",rel:"noopener noreferrer",className:"block",children:(0,r.jsx)(l.z,{className:"w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold",children:"Visit Etsy Shop"})})]})})})}):null}var b=t(166),w=t(3145),N=t(2023),y=t(2449),k=t(3581),C=t(2805),Z=t(4767),z=t(2718),D=t(4938),E=t(8997),S=t(464),T=t(4972),F=t(1422),A=t(6362),M=t(6840),L=t(7760),O=t(6215),R=t(525);let W=(0,b.default)(()=>t.e(786).then(t.bind(t,786)),{loadableGenerated:{webpack:()=>[786]},ssr:!1,loading:()=>(0,r.jsx)("div",{className:"flex items-center justify-center h-96 bg-slate-800/50 rounded-lg",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)(N.Z,{className:"w-8 h-8 text-purple-400 animate-spin mx-auto mb-2"}),(0,r.jsx)("p",{className:"text-purple-200 text-sm",children:"Loading Emotion Machine..."})]})})}),_=(0,b.default)(()=>t.e(276).then(t.bind(t,276)),{loadableGenerated:{webpack:()=>[276]},ssr:!1,loading:()=>(0,r.jsx)("div",{className:"flex items-center justify-center h-96 bg-slate-800/50 rounded-lg",children:(0,r.jsx)(N.Z,{className:"w-6 h-6 text-purple-400 animate-spin"})})}),B=(0,b.default)(()=>t.e(498).then(t.bind(t,1498)),{loadableGenerated:{webpack:()=>[1498]},ssr:!1,loading:()=>(0,r.jsx)("div",{className:"flex items-center justify-center h-96 bg-slate-800/50 rounded-lg",children:(0,r.jsx)(N.Z,{className:"w-6 h-6 text-purple-400 animate-spin"})})}),Y=[{name:"Etsy",icon:y.Z,color:"bg-gradient-to-r from-orange-500 to-red-500",followers:"Shop",url:"https://www.etsy.com/shop/shopsmockstudio"},{name:"TikTok",icon:k.Z,color:"bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",followers:"Live Count",isMain:!0,url:"https://www.tiktok.com/@xandrathecreative",showLiveCount:!1},{name:"Lemon 8",icon:C.Z,color:"bg-gradient-to-r from-yellow-400 to-yellow-600",followers:"Follow",url:"https://www.lemon8-app.com/@xandrathecreative?region=us"},{name:"YouTube",icon:Z.Z,color:"bg-gradient-to-r from-red-500 to-purple-600",followers:"246",url:"https://www.youtube.com/channel/UC8gFjswhNdlSGg1z-hLbejQ"},{name:"Discord",icon:z.Z,color:"bg-gradient-to-r from-indigo-500 to-blue-500",followers:"Community",url:"https://discord.gg/fMjmjFpC"},{name:"Barkley (Affiliate)",icon:y.Z,color:"bg-gradient-to-r from-amber-500 to-orange-600",followers:"Shop",url:"https://www.etsy.com/shop/barkleyandwagz"}];function V(){let[e,s]=(0,a.useState)(!1),t=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let e=new IntersectionObserver(t=>{let[r]=t;r.isIntersecting&&(s(!0),e.disconnect())},{rootMargin:"100px"});return t.current&&e.observe(t.current),()=>e.disconnect()},[]),{ref:t,isVisible:e}}let G=(0,a.memo)(()=>{let{ref:e,isVisible:s}=V();return(0,r.jsx)("div",{ref:e,className:"w-full h-full overflow-hidden rounded-lg",children:s?(0,r.jsx)("iframe",{title:"Countik TikTok Analytics – @xandrathecreative",src:"https://countik.com/tiktok-analytics/user/@xandrathecreative",className:"w-full h-full border-none",loading:"lazy",allowFullScreen:!0}):(0,r.jsx)("div",{className:"flex items-center justify-center h-full bg-slate-800/50",children:(0,r.jsx)(N.Z,{className:"w-8 h-8 text-purple-400 animate-spin"})})})});G.displayName="CountikEmbed",(0,a.memo)(()=>{let{ref:e,isVisible:s}=V();return(0,r.jsx)("div",{ref:e,className:"relative w-full",style:{paddingBottom:"56.25%"},children:s?(0,r.jsx)("iframe",{className:"absolute top-0 left-0 w-full h-full rounded-lg",src:"https://www.youtube.com/embed?listType=user_uploads&list=UC8gFjswhNdlSGg1z-hLbejQ",title:"YouTube Channel Videos",loading:"lazy",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,style:{border:"none",borderRadius:"12px"}}):(0,r.jsx)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-800/50 rounded-lg",children:(0,r.jsx)(N.Z,{className:"w-8 h-8 text-purple-400 animate-spin"})})})}).displayName="YouTubeChannelEmbed";let I=e=>{let{className:s=""}=e;return(0,r.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:s,xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)(r.Fragment,{children:["",(0,r.jsx)("title",{children:"Oscar's paw"}),(0,r.jsx)("ellipse",{cx:"12",cy:"15.8",rx:"4.4",ry:"3.8"}),(0,r.jsx)("ellipse",{cx:"5",cy:"9.8",rx:"2.1",ry:"2.7"}),(0,r.jsx)("ellipse",{cx:"9.2",cy:"6.3",rx:"2.1",ry:"2.7"}),(0,r.jsx)("ellipse",{cx:"14.8",cy:"6.3",rx:"2.1",ry:"2.7"}),(0,r.jsx)("ellipse",{cx:"19",cy:"9.8",rx:"2.1",ry:"2.7"})]})})},P=e=>{let{className:s=""}=e;return null},H=e=>{let{className:s=""}=e;return(0,r.jsx)("svg",{viewBox:"0 0 480 260",className:"w-72 h-auto max-w-full transition-all duration-500 hover:scale-105",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Dopamine molecule drawn as a constellation",dangerouslySetInnerHTML:{__html:"\n  <defs>\n    <radialGradient id=\"starGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"#ffd6f5\" stop-opacity=\"0.9\"/>\n      <stop offset=\"40%\" stop-color=\"#f9a8d4\" stop-opacity=\"0.35\"/>\n      <stop offset=\"100%\" stop-color=\"#f9a8d4\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <radialGradient id=\"oGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"#fda4af\" stop-opacity=\"0.9\"/>\n      <stop offset=\"40%\" stop-color=\"#fb7185\" stop-opacity=\"0.35\"/>\n      <stop offset=\"100%\" stop-color=\"#fb7185\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <radialGradient id=\"nGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"#ddd6fe\" stop-opacity=\"0.9\"/>\n      <stop offset=\"40%\" stop-color=\"#a78bfa\" stop-opacity=\"0.35\"/>\n      <stop offset=\"100%\" stop-color=\"#a78bfa\" stop-opacity=\"0\"/>\n    </radialGradient>\n  </defs>\n\n  <!-- background starfield -->\n  <g fill=\"#fbcfe8\">\n    <circle cx=\"18\" cy=\"30\" r=\"1.1\" opacity=\"0.5\"/><circle cx=\"52\" cy=\"88\" r=\"0.7\" opacity=\"0.35\"/>\n    <circle cx=\"30\" cy=\"150\" r=\"0.9\" opacity=\"0.4\"/><circle cx=\"66\" cy=\"205\" r=\"1.2\" opacity=\"0.55\"/>\n    <circle cx=\"12\" cy=\"228\" r=\"0.6\" opacity=\"0.3\"/><circle cx=\"98\" cy=\"22\" r=\"0.8\" opacity=\"0.4\"/>\n    <circle cx=\"210\" cy=\"18\" r=\"1\" opacity=\"0.45\"/><circle cx=\"258\" cy=\"42\" r=\"0.6\" opacity=\"0.3\"/>\n    <circle cx=\"300\" cy=\"22\" r=\"0.9\" opacity=\"0.4\"/><circle cx=\"348\" cy=\"48\" r=\"1.1\" opacity=\"0.5\"/>\n    <circle cx=\"392\" cy=\"28\" r=\"0.7\" opacity=\"0.35\"/><circle cx=\"430\" cy=\"60\" r=\"1\" opacity=\"0.45\"/>\n    <circle cx=\"462\" cy=\"30\" r=\"0.6\" opacity=\"0.3\"/><circle cx=\"418\" cy=\"110\" r=\"0.8\" opacity=\"0.35\"/>\n    <circle cx=\"452\" cy=\"150\" r=\"1.1\" opacity=\"0.5\"/><circle cx=\"428\" cy=\"200\" r=\"0.7\" opacity=\"0.35\"/>\n    <circle cx=\"462\" cy=\"232\" r=\"0.9\" opacity=\"0.4\"/><circle cx=\"380\" cy=\"222\" r=\"1.2\" opacity=\"0.5\"/>\n    <circle cx=\"340\" cy=\"200\" r=\"0.6\" opacity=\"0.3\"/><circle cx=\"300\" cy=\"228\" r=\"0.8\" opacity=\"0.4\"/>\n    <circle cx=\"252\" cy=\"205\" r=\"1\" opacity=\"0.45\"/><circle cx=\"208\" cy=\"228\" r=\"0.7\" opacity=\"0.3\"/>\n    <circle cx=\"160\" cy=\"210\" r=\"0.9\" opacity=\"0.4\"/><circle cx=\"112\" cy=\"228\" r=\"0.6\" opacity=\"0.3\"/>\n    <circle cx=\"40\" cy=\"112\" r=\"0.5\" opacity=\"0.25\"/><circle cx=\"240\" cy=\"70\" r=\"0.5\" opacity=\"0.25\"/>\n    <circle cx=\"370\" cy=\"140\" r=\"0.5\" opacity=\"0.25\"/><circle cx=\"200\" cy=\"170\" r=\"0.5\" opacity=\"0.2\"/>\n    <circle cx=\"320\" cy=\"90\" r=\"0.5\" opacity=\"0.2\"/><circle cx=\"140\" cy=\"40\" r=\"0.5\" opacity=\"0.25\"/>\n  </g>\n\n  <!-- constellation bonds (thin, delicate) -->\n  <g stroke=\"#f9a8d4\" stroke-width=\"1.3\" opacity=\"0.55\" stroke-linecap=\"round\">\n    <!-- benzene ring -->\n    <line x1=\"188\" y1=\"120\" x2=\"164\" y2=\"161.6\"/>\n    <line x1=\"164\" y1=\"161.6\" x2=\"116\" y2=\"161.6\"/>\n    <line x1=\"116\" y1=\"161.6\" x2=\"92\" y2=\"120\"/>\n    <line x1=\"92\" y1=\"120\" x2=\"116\" y2=\"78.4\"/>\n    <line x1=\"116\" y1=\"78.4\" x2=\"164\" y2=\"78.4\"/>\n    <line x1=\"164\" y1=\"78.4\" x2=\"188\" y2=\"120\"/>\n    <!-- aromatic inner hints -->\n    <line x1=\"176\" y1=\"126\" x2=\"158\" y2=\"152\" opacity=\"0.5\" stroke-width=\"1\"/>\n    <line x1=\"122\" y1=\"152\" x2=\"104\" y2=\"126\" opacity=\"0.5\" stroke-width=\"1\"/>\n    <line x1=\"122\" y1=\"88\" x2=\"158\" y2=\"88\" opacity=\"0.5\" stroke-width=\"1\"/>\n    <!-- hydroxyl bonds -->\n    <line x1=\"116\" y1=\"78.4\" x2=\"92\" y2=\"48\"/>\n    <line x1=\"164\" y1=\"78.4\" x2=\"188\" y2=\"48\"/>\n    <!-- ethylamine side chain -->\n    <line x1=\"188\" y1=\"120\" x2=\"232\" y2=\"120\"/>\n    <line x1=\"232\" y1=\"120\" x2=\"276\" y2=\"120\"/>\n    <line x1=\"276\" y1=\"120\" x2=\"320\" y2=\"120\"/>\n  </g>\n\n  <!-- carbon stars (benzene ring) -->\n  <g>\n    <circle cx=\"188\" cy=\"120\" r=\"11\" fill=\"url(#starGlow)\"/><circle cx=\"188\" cy=\"120\" r=\"3.6\" fill=\"#fff1f9\"/>\n    <circle cx=\"164\" cy=\"161.6\" r=\"11\" fill=\"url(#starGlow)\"/><circle cx=\"164\" cy=\"161.6\" r=\"3.6\" fill=\"#fff1f9\"/>\n    <circle cx=\"116\" cy=\"161.6\" r=\"11\" fill=\"url(#starGlow)\"/><circle cx=\"116\" cy=\"161.6\" r=\"3.6\" fill=\"#fff1f9\"/>\n    <circle cx=\"92\" cy=\"120\" r=\"11\" fill=\"url(#starGlow)\"/><circle cx=\"92\" cy=\"120\" r=\"3.6\" fill=\"#fff1f9\"/>\n    <circle cx=\"116\" cy=\"78.4\" r=\"11\" fill=\"url(#starGlow)\"/><circle cx=\"116\" cy=\"78.4\" r=\"3.6\" fill=\"#fff1f9\"/>\n    <circle cx=\"164\" cy=\"78.4\" r=\"11\" fill=\"url(#starGlow)\"/><circle cx=\"164\" cy=\"78.4\" r=\"3.6\" fill=\"#fff1f9\"/>\n    <!-- side chain carbons -->\n    <circle cx=\"232\" cy=\"120\" r=\"10\" fill=\"url(#starGlow)\"/><circle cx=\"232\" cy=\"120\" r=\"3.2\" fill=\"#fff1f9\"/>\n    <circle cx=\"276\" cy=\"120\" r=\"10\" fill=\"url(#starGlow)\"/><circle cx=\"276\" cy=\"120\" r=\"3.2\" fill=\"#fff1f9\"/>\n  </g>\n\n  <!-- oxygen stars (with sparkle) -->\n  <g>\n    <circle cx=\"92\" cy=\"48\" r=\"14\" fill=\"url(#oGlow)\"/><circle cx=\"92\" cy=\"48\" r=\"4.4\" fill=\"#fff1f2\"/>\n    <path d=\"M92,35 C93.5,44 94,44.5 103,48 C94,51.5 93.5,52 92,61 C90.5,52 90,51.5 81,48 C90,44.5 90.5,44 92,35 Z\" fill=\"#fda4af\" opacity=\"0.9\"/>\n    <circle cx=\"188\" cy=\"48\" r=\"14\" fill=\"url(#oGlow)\"/><circle cx=\"188\" cy=\"48\" r=\"4.4\" fill=\"#fff1f2\"/>\n    <path d=\"M188,35 C189.5,44 190,44.5 199,48 C190,51.5 189.5,52 188,61 C186.5,52 186,51.5 177,48 C186,44.5 186.5,44 188,35 Z\" fill=\"#fda4af\" opacity=\"0.9\"/>\n  </g>\n\n  <!-- nitrogen star (with sparkle) -->\n  <g>\n    <circle cx=\"320\" cy=\"120\" r=\"14\" fill=\"url(#nGlow)\"/><circle cx=\"320\" cy=\"120\" r=\"4.4\" fill=\"#f5f3ff\"/>\n    <path d=\"M320,107 C321.5,116 322,116.5 331,120 C322,123.5 321.5,124 320,133 C318.5,124 318,123.5 309,120 C318,116.5 318.5,116 320,107 Z\" fill=\"#c4b5fd\" opacity=\"0.9\"/>\n  </g>\n\n  <!-- constellation label -->\n  <text x=\"240\" y=\"242\" text-anchor=\"middle\" font-family=\"ui-monospace, monospace\" font-size=\"11\" letter-spacing=\"6\" fill=\"#f9a8d4\" opacity=\"0.75\">DOPAMINE</text>\n  <text x=\"240\" y=\"256\" text-anchor=\"middle\" font-family=\"ui-monospace, monospace\" font-size=\"8\" letter-spacing=\"3\" fill=\"#f9a8d4\" opacity=\"0.45\">C8H11NO2</text>\n"}})},U=e=>{let{className:s=""}=e;return(0,r.jsxs)("svg",{viewBox:"0 0 64 48",fill:"currentColor",className:s,xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("rect",{x:"8",y:"12",width:"48",height:"24",rx:"4",fill:"#FCD34D"}),(0,r.jsx)("rect",{x:"8",y:"12",width:"48",height:"6",rx:"2",fill:"#F59E0B"}),(0,r.jsx)("rect",{x:"12",y:"20",width:"8",height:"10",rx:"1",fill:"#60A5FA",opacity:"0.8"}),(0,r.jsx)("rect",{x:"24",y:"20",width:"8",height:"10",rx:"1",fill:"#60A5FA",opacity:"0.8"}),(0,r.jsx)("rect",{x:"36",y:"20",width:"8",height:"10",rx:"1",fill:"#60A5FA",opacity:"0.8"}),(0,r.jsx)("rect",{x:"48",y:"20",width:"4",height:"10",rx:"1",fill:"#60A5FA",opacity:"0.8"}),(0,r.jsx)("circle",{cx:"18",cy:"38",r:"4",fill:"#1F2937"}),(0,r.jsx)("circle",{cx:"18",cy:"38",r:"2",fill:"#6B7280"}),(0,r.jsx)("circle",{cx:"46",cy:"38",r:"4",fill:"#1F2937"}),(0,r.jsx)("circle",{cx:"46",cy:"38",r:"2",fill:"#6B7280"}),(0,r.jsx)("rect",{x:"4",y:"14",width:"4",height:"4",rx:"1",fill:"#EF4444"}),(0,r.jsx)("rect",{x:"56",y:"14",width:"4",height:"4",rx:"1",fill:"#EF4444"})]})};function X(){let[e,s]=(0,a.useState)("dashboard"),[t,o]=(0,a.useState)(!1),[n,c]=(0,a.useState)(!0);(0,a.useEffect)(()=>{let e=setTimeout(()=>{c(!1)},6e3);return()=>clearTimeout(e)},[]);let d=(0,a.useCallback)(e=>{s(e),o(!1)},[]),m=(0,a.useMemo)(()=>()=>(0,r.jsxs)("div",{className:"flex flex-col h-full",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center mb-6 px-4 pt-6 flex-shrink-0",children:[(0,r.jsx)("div",{className:"relative w-36 h-36 mb-4 ring-4 ring-cyan-400/70 cosmic-glow rounded-full overflow-hidden flex-shrink-0",children:(0,r.jsx)(w.default,{src:"/xandra-profile-photo.webp",alt:"Xandra the Creative",fill:!0,className:"object-cover",priority:!0})}),(0,r.jsxs)("div",{className:"flex items-center gap-2 shake-subtle",children:[(0,r.jsx)("div",{className:"w-8 h-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center cosmic-pulse",children:(0,r.jsx)(N.Z,{className:"w-4 h-4 text-white"})}),(0,r.jsx)("h1",{className:"text-lg font-bold text-white cosmic-text",children:"Xandra Creative"})]})]}),(0,r.jsxs)("div",{className:"flex-1 overflow-y-auto overflow-x-hidden px-4 space-y-6 cosmic-scroll",children:[(0,r.jsxs)("nav",{className:"space-y-2",children:[(0,r.jsxs)(l.z,{variant:"dashboard"===e?"default":"ghost",className:"w-full justify-start cosmic-button text-sm ".concat("dashboard"===e?"cosmic-active":"text-gray-300 hover:text-white"),onClick:()=>d("dashboard"),children:[(0,r.jsx)(D.Z,{className:"w-4 h-4 mr-2"}),"Command Center"]}),(0,r.jsx)("a",{href:"/about-me",className:"block",children:(0,r.jsxs)(l.z,{variant:"ghost",className:"w-full justify-start cosmic-button text-sm text-gray-300 hover:text-white",children:[(0,r.jsx)(E.Z,{className:"w-4 h-4 mr-2"}),"About Me"]})}),(0,r.jsxs)(l.z,{variant:"analytics"===e?"default":"ghost",className:"w-full justify-start cosmic-button text-sm ".concat("analytics"===e?"cosmic-active":"text-gray-300 hover:text-white"),onClick:()=>d("analytics"),children:[(0,r.jsx)(S.Z,{className:"w-4 h-4 mr-2"}),"Galaxy Analytics"]}),(0,r.jsx)("a",{href:"/adhd-is-what-again",className:"block",children:(0,r.jsxs)(l.z,{variant:"ghost",className:"w-full justify-start cosmic-button text-xs text-gray-300 hover:text-white whitespace-normal text-left h-auto py-2 leading-tight",children:[(0,r.jsx)(T.Z,{className:"w-4 h-4 mr-2 flex-shrink-0"}),(0,r.jsx)("span",{className:"break-words",children:"ADHD is... What again?"})]})}),(0,r.jsx)("a",{href:"/the-memes",className:"block",children:(0,r.jsxs)(l.z,{variant:"ghost",className:"w-full justify-start cosmic-button text-xs text-gray-300 hover:text-white whitespace-normal text-left h-auto py-2 leading-tight",children:[(0,r.jsx)(F.Z,{className:"w-4 h-4 mr-2 flex-shrink-0"}),(0,r.jsx)("span",{className:"break-words",children:"The Memes"})]})}),(0,r.jsx)("a",{href:"/unmasked",className:"block",children:(0,r.jsxs)(l.z,{variant:"ghost",className:"w-full justify-start cosmic-button text-xs text-gray-300 hover:text-white whitespace-normal text-left h-auto py-2 leading-tight",children:[(0,r.jsx)(E.Z,{className:"w-4 h-4 mr-2 flex-shrink-0"}),(0,r.jsx)("span",{className:"break-words",children:"Unmasked"})]})}),(0,r.jsx)("a",{href:"/one-of-us",className:"block",children:(0,r.jsxs)(l.z,{variant:"ghost",className:"w-full justify-start cosmic-button text-xs text-gray-300 hover:text-white whitespace-normal text-left h-auto py-2 leading-tight",children:[(0,r.jsx)(E.Z,{className:"w-4 h-4 mr-2 flex-shrink-0"}),(0,r.jsx)("span",{className:"break-words",children:"One of Us"})]})}),(0,r.jsx)("div",{className:"flex justify-center py-2",children:(0,r.jsx)(P,{className:"w-16 h-10 text-purple-400/60 hover:text-purple-300/80 transition-colors duration-300"})})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-sm font-medium text-purple-300 mb-3 shake-subtle",children:"Connected Dimensions"}),(0,r.jsx)("div",{className:"space-y-2",children:Y.map(e=>{let s=e.icon;return(0,r.jsx)("div",{className:"group",children:(0,r.jsxs)("div",{className:"flex items-center gap-2 p-2 rounded-lg hover:bg-purple-800/30 transition-all duration-300 cursor-pointer cosmic-hover ".concat(e.isMain?"bg-purple-800/50 border border-cyan-400/30 cosmic-glow":""," group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20"),children:[(0,r.jsx)("div",{className:"w-6 h-6 rounded ".concat(e.color," flex items-center justify-center cosmic-pulse group-hover:scale-110 transition-transform duration-300"),children:(0,r.jsx)(s,{className:"w-3 h-3 text-white"})}),(0,r.jsx)("div",{className:"flex-1",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("p",{className:"text-xs font-medium transition-colors duration-300 flex items-center gap-1 ".concat(e.isMain?"text-cyan-300 group-hover:text-cyan-200":"text-gray-300 group-hover:text-white"),children:[e.name," ",e.isMain?"⭐":"",(0,r.jsx)(I,{className:"w-3 h-3 text-purple-400/70 group-hover:text-purple-300 transition-colors duration-300"})]}),(0,r.jsx)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:"opacity-0 group-hover:opacity-100 transition-opacity duration-300",onClick:e=>e.stopPropagation(),children:(0,r.jsx)(A.Z,{className:"w-3 h-3 text-purple-400 hover:text-cyan-400 transition-colors duration-300"})})]})}),(0,r.jsx)("div",{className:"flex items-center gap-1",children:(0,r.jsx)("div",{className:"w-2 h-2 rounded-full transition-all duration-300 ".concat(e.isMain?"bg-cyan-400 cosmic-pulse":"bg-green-400"," group-hover:scale-125")})})]})},e.name)})})]})]}),(0,r.jsx)("div",{className:"px-4 pb-4 pt-4 flex-shrink-0 border-t border-purple-500/20",children:(0,r.jsx)("a",{href:"/the-other-side",className:"block",children:(0,r.jsxs)(l.z,{className:"w-full py-3 text-sm font-bold bg-gradient-to-r from-purple-900 via-black to-purple-900 hover:from-purple-800 hover:via-purple-900 hover:to-purple-800 text-purple-200 hover:text-white border border-purple-500/50 rounded-lg shadow-lg shadow-purple-900/50 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 cosmic-glow",children:[(0,r.jsx)(N.Z,{className:"w-4 h-4 mr-2 animate-pulse"}),"Enter The Other Side",(0,r.jsx)(N.Z,{className:"w-4 h-4 ml-2 animate-pulse"})]})})})]}),[e,d]);return(0,r.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden",children:[(0,r.jsx)("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:(0,r.jsx)("div",{className:"stars"})}),(0,r.jsx)("div",{className:"lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-purple-500/30 p-4",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("div",{className:"relative w-8 h-8 ring-1 ring-cyan-400/50 rounded-full overflow-hidden",children:(0,r.jsx)(w.default,{src:"/xandra-profile-photo.webp",alt:"Xandra",width:32,height:32,className:"object-cover",priority:!0})}),(0,r.jsx)("h1",{className:"text-lg font-bold text-white cosmic-text",children:"Xandra Creative"})]}),(0,r.jsxs)(x,{open:t,onOpenChange:o,children:[(0,r.jsx)(h,{asChild:!0,children:(0,r.jsx)(l.z,{variant:"ghost",size:"sm",className:"cosmic-button text-white",children:(0,r.jsx)(M.Z,{className:"w-5 h-5"})})}),(0,r.jsx)(f,{side:"right",className:"w-80 bg-slate-900/95 backdrop-blur-md border-l border-purple-500/30 p-0",children:(0,r.jsx)(m,{})})]})]})}),(0,r.jsx)("div",{className:"hidden lg:flex lg:flex-col fixed left-0 top-0 h-full w-64 bg-slate-900/90 backdrop-blur-md border-r border-purple-500/30 z-10 overflow-hidden",children:(0,r.jsx)(m,{})}),(0,r.jsxs)("div",{className:"pt-20 lg:pt-0 lg:ml-64 p-4 lg:p-6 relative z-10",children:["dashboard"===e&&(0,r.jsxs)("div",{className:"space-y-4 lg:space-y-6",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center gap-3 mb-6",children:[(0,r.jsx)("a",{href:"https://venmo.com/u/xandrathecreative",target:"_blank",rel:"noopener noreferrer",className:"block",children:(0,r.jsxs)(l.z,{className:"fund-delulu-button px-8 py-3 text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white border-0 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",children:[(0,r.jsx)("svg",{className:"w-5 h-5 mr-2",viewBox:"0 0 32 32",fill:"currentColor",children:(0,r.jsx)("path",{d:"M24.667 4c1.227 1.891 1.773 3.867 1.773 6.347 0 7.893-6.747 18.16-12.227 25.387H4.293L0 4.453l8.96-.827 2.267 18.133c2.107-3.413 4.72-8.8 4.72-12.48 0-2.373-.4-4-1.04-5.28L24.667 4z"})}),"Fund the Creator",(0,r.jsx)(N.Z,{className:"w-5 h-5 ml-2 animate-spin"})]})}),(0,r.jsx)("a",{href:"https://www.etsy.com/shop/shopsmockstudio",target:"_blank",rel:"noopener noreferrer",className:"block",children:(0,r.jsxs)(l.z,{className:"px-8 py-2 text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",children:[(0,r.jsx)(y.Z,{className:"w-4 h-4 mr-2"}),"Etsy check out the merch!"]})})]}),n&&(0,r.jsxs)("div",{className:"mb-6 bg-slate-900/95 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden",children:[(0,r.jsxs)("div",{className:"relative h-1 bg-slate-800/50 overflow-hidden",children:[(0,r.jsx)("div",{className:"galactic-loading-bar h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"}),(0,r.jsx)("div",{className:"absolute top-1/2 -translate-y-1/2 short-bus-animation",children:(0,r.jsx)(U,{className:"w-8 h-6 text-yellow-400 drop-shadow-lg"})})]}),(0,r.jsx)("div",{className:"px-4 py-2 text-center",children:(0,r.jsxs)("p",{className:"text-xs text-purple-200 cosmic-text flex items-center justify-center gap-2",children:[(0,r.jsx)(N.Z,{className:"w-3 h-3 animate-spin"}),"Importing Galactic data",(0,r.jsx)(N.Z,{className:"w-3 h-3 animate-spin"})]})})]}),(0,r.jsxs)("div",{className:"shake-subtle",children:[(0,r.jsx)("h2",{className:"text-2xl lg:text-3xl font-bold mb-2 text-white cosmic-text",children:"Command Center \uD83C\uDF0C"}),(0,r.jsx)("div",{className:"flex justify-center my-4",children:(0,r.jsx)(H,{className:"w-32 h-20 text-purple-400/70 hover:text-pink-400/90 transition-colors duration-500"})}),(0,r.jsx)("p",{className:"text-sm lg:text-base text-purple-200",children:"Track your otherworldly content performance across all dimensions."})]}),(0,r.jsxs)(i.Zb,{className:"cosmic-card shake-gentle",children:[(0,r.jsxs)(i.Ol,{className:"pb-4",children:[(0,r.jsxs)(i.ll,{className:"text-lg lg:text-xl text-white cosmic-text flex items-center gap-2",children:[(0,r.jsx)(k.Z,{className:"w-5 h-5 text-pink-400 cosmic-pulse"}),"Live TikTok Portal"]}),(0,r.jsx)(i.SZ,{className:"text-sm text-purple-200",children:"Direct feed from @xandrathecreative's cosmic dimension"})]}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("div",{className:"border border-purple-500/30 rounded-lg overflow-hidden cosmic-hover",children:(0,r.jsx)(B,{})})})]}),(0,r.jsxs)(i.Zb,{className:"cosmic-card shake-gentle",children:[(0,r.jsxs)(i.Ol,{className:"pb-4",children:[(0,r.jsxs)(i.ll,{className:"text-lg lg:text-xl text-white cosmic-text flex items-center gap-2",children:[(0,r.jsx)(L.Z,{className:"w-5 h-5 text-purple-400 cosmic-pulse"}),"Instagram Portal"]}),(0,r.jsx)(i.SZ,{className:"text-sm text-purple-200",children:"Visual feed from @xandrathecreative's Instagram dimension"})]}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("div",{className:"border border-purple-500/30 rounded-lg overflow-hidden cosmic-hover",children:(0,r.jsx)(_,{})})})]}),(0,r.jsxs)(i.Zb,{className:"cosmic-card shake-gentle",children:[(0,r.jsxs)(i.Ol,{className:"pb-4",children:[(0,r.jsxs)(i.ll,{className:"text-lg lg:text-xl text-white cosmic-text flex items-center gap-2",children:[(0,r.jsx)(C.Z,{className:"w-5 h-5 text-purple-400 cosmic-pulse"}),"Emotion Machine"]}),(0,r.jsx)(i.SZ,{className:"text-sm text-purple-200",children:"Create and share generative art with interactive controls"})]}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("div",{className:"border border-purple-500/30 rounded-lg overflow-hidden cosmic-hover p-4 bg-slate-800/30",children:(0,r.jsx)(W,{})})})]})]}),"analytics"===e&&(0,r.jsxs)("div",{className:"space-y-4 lg:space-y-6",children:[(0,r.jsxs)("div",{className:"shake-subtle",children:[(0,r.jsx)("h2",{className:"text-2xl lg:text-3xl font-bold mb-2 text-white cosmic-text",children:"Galaxy Analytics \uD83C\uDF0C"}),(0,r.jsx)("p",{className:"text-sm lg:text-base text-purple-200",children:"Deep dive into your cosmic TikTok performance metrics and interdimensional insights."})]}),(0,r.jsxs)(i.Zb,{className:"cosmic-card-special shake-gentle relative overflow-hidden",children:[(0,r.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"}),(0,r.jsxs)(i.Ol,{className:"relative z-10 pb-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2 shake-subtle",children:[(0,r.jsx)(O.Z,{className:"w-5 h-5 text-cyan-400 cosmic-pulse"}),(0,r.jsx)(i.ll,{className:"text-lg lg:text-xl text-cyan-300 cosmic-text",children:"TikTok Analytics Portal"})]}),(0,r.jsx)(i.SZ,{className:"text-sm text-purple-200",children:"Real-time analytics and insights from @xandrathecreative's cosmic TikTok dimension"})]}),(0,r.jsx)(i.aY,{className:"relative z-10 p-0",children:(0,r.jsx)("div",{className:"border border-purple-500/30 rounded-lg overflow-hidden cosmic-hover",style:{height:"70vh",minHeight:"500px"},children:(0,r.jsx)(G,{})})})]}),(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("a",{href:"/the-other-side",className:"block",children:(0,r.jsxs)(l.z,{className:"px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 text-white border-2 border-purple-400/50 rounded-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/70 transform hover:scale-110 transition-all duration-300 cosmic-glow animate-pulse",children:[(0,r.jsx)(N.Z,{className:"w-6 h-6 mr-2 animate-spin"}),"Enter The Other Side",(0,r.jsx)(N.Z,{className:"w-6 h-6 ml-2 animate-spin"})]})})}),(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4",children:[(0,r.jsxs)(i.Zb,{className:"cosmic-card shake-gentle",children:[(0,r.jsx)(i.Ol,{className:"pb-2",children:(0,r.jsxs)(i.ll,{className:"text-xs lg:text-sm font-medium text-purple-200 flex items-center gap-2",children:[(0,r.jsx)(R.Z,{className:"w-3 h-3 text-green-400"}),"Live Tracking"]})}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("p",{className:"text-xs text-purple-300",children:"Real-time follower count and engagement metrics"})})]}),(0,r.jsxs)(i.Zb,{className:"cosmic-card shake-gentle",children:[(0,r.jsx)(i.Ol,{className:"pb-2",children:(0,r.jsxs)(i.ll,{className:"text-xs lg:text-sm font-medium text-purple-200 flex items-center gap-2",children:[(0,r.jsx)(O.Z,{className:"w-3 h-3 text-cyan-400"}),"Deep Analytics"]})}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("p",{className:"text-xs text-purple-300",children:"Comprehensive performance insights and trends"})})]}),(0,r.jsxs)(i.Zb,{className:"cosmic-card shake-gentle",children:[(0,r.jsx)(i.Ol,{className:"pb-2",children:(0,r.jsxs)(i.ll,{className:"text-xs lg:text-sm font-medium text-purple-200 flex items-center gap-2",children:[(0,r.jsx)(N.Z,{className:"w-3 h-3 text-pink-400"}),"Cosmic Data"]})}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("p",{className:"text-xs text-purple-300",children:"Interdimensional content performance analysis"})})]})]})]})]})]})}function Q(){return(0,r.jsxs)(g,{children:[(0,r.jsx)(X,{}),(0,r.jsx)(v,{})]})}},2869:function(e,s,t){"use strict";t.d(s,{z:function(){return c}});var r=t(7437),a=t(2265),l=t(7495),i=t(535),o=t(4508);let n=(0,i.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef((e,s)=>{let{className:t,variant:a,size:i,asChild:c=!1,...d}=e,x=c?l.g7:"button";return(0,r.jsx)(x,{className:(0,o.cn)(n({variant:a,size:i,className:t})),ref:s,...d})});c.displayName="Button"},6070:function(e,s,t){"use strict";t.d(s,{Ol:function(){return o},SZ:function(){return c},Zb:function(){return i},aY:function(){return d},ll:function(){return n}});var r=t(7437),a=t(2265),l=t(4508);let i=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)("div",{ref:s,className:(0,l.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",t),...a})});i.displayName="Card";let o=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)("div",{ref:s,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",t),...a})});o.displayName="CardHeader";let n=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)("div",{ref:s,className:(0,l.cn)("text-2xl font-semibold leading-none tracking-tight",t),...a})});n.displayName="CardTitle";let c=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)("div",{ref:s,className:(0,l.cn)("text-sm text-muted-foreground",t),...a})});c.displayName="CardDescription";let d=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)("div",{ref:s,className:(0,l.cn)("p-6 pt-0",t),...a})});d.displayName="CardContent",a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,r.jsx)("div",{ref:s,className:(0,l.cn)("flex items-center p-6 pt-0",t),...a})}).displayName="CardFooter"},4508:function(e,s,t){"use strict";t.d(s,{cn:function(){return l}});var r=t(1994),a=t(3335);function l(){for(var e=arguments.length,s=Array(e),t=0;t<e;t++)s[t]=arguments[t];return(0,a.m6)((0,r.W)(s))}}},function(e){e.O(0,[569,529,141,253,971,117,744],function(){return e(e.s=193)}),_N_E=e.O()}]);


;
;
;
;
;
;
;
;
;/* Xandra bespoke layer: brand weave, micro-interactions, easter eggs, voice, Oscar, cosmos */
(function(){
"use strict";
if (window.__xandraBespoke) return;
window.__xandraBespoke = true;

/* ---------- 1. CSS: Aura washes, twinkle, semi-colon dividers, hovers ---------- */
var css = `
/* Aura gradient washes: subtle rainbow nebula glows */
.xa-aura{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.5;
background:
 radial-gradient(600px 400px at 15% 20%, rgba(255,105,180,.08), transparent 70%),
 radial-gradient(700px 500px at 85% 15%, rgba(147,112,219,.09), transparent 70%),
 radial-gradient(600px 600px at 50% 90%, rgba(64,224,208,.07), transparent 70%),
 radial-gradient(500px 400px at 70% 60%, rgba(255,215,0,.05), transparent 70%);}
/* Twinkling constellation stars */
@keyframes xa-twinkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.82)}}
.xa-twinkle{animation:xa-twinkle 3s ease-in-out infinite;transform-origin:center;transform-box:fill-box}
/* Semi-colon section divider */
.xa-semicolon{display:flex;align-items:center;gap:10px;margin:18px auto;max-width:420px;opacity:.4}
.xa-semicolon::before,.xa-semicolon::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.22),transparent)}
.xa-semicolon span{font-size:13px;color:#a78bfa;font-weight:400;letter-spacing:1px}
/* Connected Dimensions hover: each row gets a lift + glow */
.xa-dim-row{transition:transform .25s ease, background .25s ease !important}
.xa-dim-row:hover{transform:translateX(6px) scale(1.02);background:rgba(147,112,219,.12) !important;border-radius:8px}
/* Custom text selection: her brand purple */
::selection{background:rgba(192,132,252,.4);color:#fff}
/* Oscar supervisor badge */
#xa-oscar{position:fixed;bottom:16px;left:16px;z-index:50;display:flex;align-items:center;gap:8px;
 background:rgba(15,10,30,.85);backdrop-filter:blur(8px);border:1px solid rgba(168,85,247,.35);
 border-radius:999px;padding:6px 14px 6px 8px;font-size:11px;color:#d8b4fe;cursor:default;
 box-shadow:0 4px 20px rgba(147,112,219,.25);transition:transform .2s}
#xa-oscar:hover{transform:scale(1.05)}
#xa-oscar .xa-paw{width:22px;height:22px;background:rgba(168,85,247,.2);border-radius:50%;
 display:flex;align-items:center;justify-content:center;font-size:13px}
/* Acceptance signature */
.xa-accept{font-size:11px;color:rgba(216,180,254,.55);text-align:center;margin-top:14px;letter-spacing:.3px}
.xa-paw-approved{display:inline-block;margin:8px auto 0;padding:4px 14px;border:2px solid rgba(168,85,247,.55);border-radius:999px;color:#d8b4fe;font-size:13px;font-weight:600;letter-spacing:.04em;transform:rotate(-2deg);background:rgba(168,85,247,.08)}
.xa-paw-wrap{text-align:center}
/* Konami celebration */
#xa-konami{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;
 background:rgba(10,5,25,.9);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .4s}
#xa-konami.show{opacity:1;pointer-events:auto}
#xa-konami .xa-card{text-align:center;padding:40px;max-width:420px}
#xa-konami h2{font-size:28px;color:#f0abfc;margin-bottom:12px}
#xa-konami p{color:#d8b4fe;font-size:14px;line-height:1.6}
`;
var st = document.createElement("style");
st.textContent = css;
document.head.appendChild(st);

/* ---------- 2. Aura background wash ---------- */
if (!document.querySelector(".xa-aura")) {
  var aura = document.createElement("div");
  aura.className = "xa-aura";
  document.body.prepend(aura);
}

/* ---------- 3. Voice pass: text replacements ---------- */
var voice = [
  // [find, replace]
  ["Command Center", "The Studio"],
  ["Track your otherworldly content performance across all dimensions.",
   "Your all-access pass to every dimension. No gatekeeping, just magic."],
  ["Direct feed from @xandrathecreative\u2019s cosmic dimension",
   "Fresh drops from the TikTok dimension"],
  ["Direct feed from @xandrathecreative's cosmic dimension",
   "Fresh drops from the TikTok dimension"],
  ["Visual feed from @xandrathecreative\u2019s Instagram dimension",
   "Eye candy from the Instagram dimension"],
  ["Visual feed from @xandrathecreative's Instagram dimension",
   "Eye candy from the Instagram dimension"],
  ["Fund the Creator", "Fuel the Magic"],
  ["Buy my merch!", "Snag the goods!"],
];
function voicePass(){
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(function(n){
    var t = n.nodeValue;
    if (!t || t.length > 300) return;
    voice.forEach(function(pair){
      if (t.indexOf(pair[0]) !== -1) t = t.split(pair[0]).join(pair[1]);
    });
    if (t !== n.nodeValue) n.nodeValue = t;
  });
}

/* ---------- 4. Semi-colon dividers between major sections ---------- */
function addDividers(){
  // Place semi-colon dividers between major content sections.
  // Strategy: find the main content column, insert dividers between its
  // top-level section children.
  if (document.querySelector(".xa-semicolon")) return; // already done
  // Find candidate section containers: direct children of main content area
  // that contain an h2 or h3 heading
  var mains = document.querySelectorAll("main, [role='main']");
  var scope = mains.length ? mains[0] : document.body;
  // Collect block-level sections (cards/panels) in the main column
  var sections = [];
  var walker = document.createTreeWalker(scope, NodeFilter.SHOW_ELEMENT);
  var el;
  while (walker.nextNode()) {
    el = walker.currentNode;
    var tag = el.tagName.toLowerCase();
    if ((tag === "h2" || tag === "h3") && el.offsetParent !== null) {
      // Find the section container (walk up to a reasonable block)
      var container = el;
      // Go up at most 4 levels looking for a card-like container
      for (var k = 0; k < 4; k++) {
        var p = container.parentNode;
        if (!p || p === scope || p === document.body) break;
        container = p;
        // Stop at something that looks like a card/panel
        var cls = (container.className || "").toString();
        if (/rounded|card|panel|section|backdrop/i.test(cls)) break;
      }
      if (sections.indexOf(container) === -1) sections.push(container);
    }
  }
  // Insert dividers between sections (not before the first)
  sections.forEach(function(sec, i){
    if (i === 0) return;
    // Skip merch/popup areas: no divider near "Snag the goods" or merch triggers
    var txt = (sec.textContent || "").toLowerCase();
    if (/snag the goods|merch|etsy shop/.test(txt)) return;
    if (sec.previousElementSibling && sec.previousElementSibling.classList &&
        sec.previousElementSibling.classList.contains("xa-semicolon")) return;
    var d = document.createElement("div");
    d.className = "xa-semicolon";
    d.setAttribute("aria-hidden", "true");
    d.innerHTML = "<span>;</span>";
    sec.parentNode.insertBefore(d, sec);
  });
}

/* ---------- 5. "Acceptance is free" signature ---------- */
function addSignature(){
  if (document.querySelector(".xa-accept")) return;
  var dims = document.evaluate("//h3[contains(text(),'Connected Dimensions')]",
    document, null, 9, null).singleNodeValue;
  if (!dims) return;
  var sig = document.createElement("div");
  sig.className = "xa-accept";
  sig.innerHTML = "Acceptance is free \u{1F9DA} <span style='opacity:.6'>#audhd</span>";
  // Place after the Connected Dimensions card: stamp ABOVE the signature text
  var card = dims.closest("div[class*='rounded']") || dims.parentNode;
  if (card && card.parentNode) {
    // Oscar Paw Approved stamp (above the Acceptance text)
    if (!document.querySelector(".xa-paw-approved")) {
      var wrap = document.createElement("div");
      wrap.className = "xa-paw-wrap";
      var stamp = document.createElement("span");
      stamp.className = "xa-paw-approved";
      stamp.innerHTML = "\u{1F43E} Oscar Paw Approved";
      wrap.appendChild(stamp);
      card.parentNode.insertBefore(wrap, card.nextSibling);
      card.parentNode.insertBefore(sig, wrap.nextSibling);
    } else {
      card.parentNode.insertBefore(sig, card.nextSibling);
    }
  }
}

/* ---------- 6. Oscar: Studio Supervisor badge ---------- */
var xaQuips = [
  "Quality control. Nap schedule strictly enforced.",
  "Approved this section. Smelled it first.",
  "Supervising. Do not disturb.",
  "Treats accepted as payment for approval.",
  "I saw you scroll past. Rude."
];
var xaQuipIdx = 0;
function addOscar(){
  if (document.getElementById("xa-oscar")) return;
  var b = document.createElement("div");
  b.id = "xa-oscar";
  b.title = xaQuips[0];
  b.innerHTML = '<span class="xa-paw">\u{1F43E}</span><span>Oscar &middot; Studio Supervisor</span>';
  document.body.appendChild(b);
  // Rotate quips every 30 seconds
  setInterval(function(){
    xaQuipIdx = (xaQuipIdx + 1) % xaQuips.length;
    b.title = xaQuips[xaQuipIdx];
  }, 30000);
  // Cycle on click too
  b.style.cursor = "pointer";
  b.addEventListener("click", function(){
    xaQuipIdx = (xaQuipIdx + 1) % xaQuips.length;
    b.title = xaQuips[xaQuipIdx];
    // Brief bounce
    b.style.transform = "scale(1.15)";
    setTimeout(function(){ b.style.transform = ""; }, 200);
  });
}

/* ---------- 7. Twinkle the constellation stars ---------- */
function twinkle(){
  // Find the dopamine SVG and add twinkle to star/sparkle elements
  var svg = document.querySelector('svg[aria-label="Dopamine molecule drawn as a constellation"]');
  if (!svg || svg.dataset.twinkled) return;
  svg.dataset.twinkled = "1";
  // Add staggered twinkle to star polygons/paths
  var stars = svg.querySelectorAll("polygon, path");
  stars.forEach(function(s, i){
    // Only twinkle small star shapes (not connecting lines)
    var d = (s.getAttribute("d") || "");
    if (d.length < 60) {  // heuristic: stars have short paths
      s.classList.add("xa-twinkle");
      s.style.animationDelay = (i * 0.37) + "s";
      s.style.animationDuration = (2.2 + (i % 5) * 0.5) + "s";
    }
  });
}

/* ---------- 8. Dimension row hover enhancement ---------- */
function dimHovers(){
  var dims = document.evaluate("//h3[contains(text(),'Connected Dimensions')]",
    document, null, 9, null).singleNodeValue;
  if (!dims) return;
  var container = dims.nextElementSibling;
  if (!container) return;
  container.querySelectorAll("a").forEach(function(a){
    a.classList.add("xa-dim-row");
  });
}

/* ---------- 9. Easter egg: Konami code ---------- */
var konamiSeq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
var konamiIdx = 0;
function konami(e){
  var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  var expected = konamiSeq[konamiIdx].length === 1 ? konamiSeq[konamiIdx].toLowerCase() : konamiSeq[konamiIdx];
  if (key === expected) {
    konamiIdx++;
    if (konamiIdx === konamiSeq.length) {
      konamiIdx = 0;
      showKonami();
    }
  } else {
    konamiIdx = (key === konamiSeq[0].toLowerCase() || key === konamiSeq[0]) ? 1 : 0;
  }
}
function showKonami(){
  var el = document.getElementById("xa-konami");
  if (!el) {
    el = document.createElement("div");
    el.id = "xa-konami";
    el.innerHTML = '<div class="xa-card"><h2>\u2728 Secret Dimension Unlocked \u2728</h2>' +
      '<p>You found it. Most people just scroll.<br><br>' +
      'Xandra sees you. Keep being curious.<br>' +
      '<span style="font-size:11px;opacity:.6">; &mdash; the story continues</span></p>' +
      '<p style="margin-top:20px;font-size:12px;opacity:.5">click anywhere to return</p></div>';
    el.addEventListener("click", function(){ el.classList.remove("show"); });
    document.body.appendChild(el);
  }
  el.classList.add("show");
}
document.addEventListener("keydown", konami);

/* ---------- 10. Console easter egg for devs ---------- */
console.log("%c\u2728 Hey curious dev! \u2728", "font-size:20px;color:#c084fc");
console.log("%cThis site was hand-crafted with obsessive attention to detail. If you're reading this, you get it. ;",
  "color:#a78bfa;font-size:12px");

/* ---------- 11. Dopamine molecule click easter egg ---------- */
var molClicks = 0;
function molEgg(){
  var svg = document.querySelector('svg[aria-label="Dopamine molecule drawn as a constellation"]');
  if (!svg || svg.dataset.egg) return;
  svg.dataset.egg = "1";
  svg.style.cursor = "pointer";
  svg.addEventListener("click", function(){
    molClicks++;
    if (molClicks === 5) {
      molClicks = 0;
      // Burst: briefly scale up all stars
      svg.querySelectorAll(".xa-twinkle").forEach(function(s){
        s.style.transform = "scale(1.8)";
        setTimeout(function(){ s.style.transform = ""; }, 400);
      });
    }
  });
}


/* ---------- 12. Fix broken TikTok/Instagram portals ---------- */
function portalCard(url, emoji, title, desc, btn){
  return '<a href="' + url + '" target="_blank" rel="noopener" data-xa-card="1" ' +
    'style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px 20px;text-align:center;text-decoration:none">' +
    '<span style="font-size:48px">' + emoji + '</span>' +
    '<span style="color:#fff;font-weight:700;font-size:16px">' + title + '</span>' +
    '<span style="color:#a78bfa;font-size:13px">' + desc + '</span>' +
    '<span style="margin-top:8px;padding:10px 28px;border-radius:999px;font-size:14px;font-weight:600;color:#fff;' +
    'background:linear-gradient(90deg,#ec4899,#8b5cf6,#06b6d4)">' + btn + '</span></a>';
}
function fixPortals(){
  // Hide blocked countik iframes
  document.querySelectorAll('iframe[src*="countik.com"]').forEach(function(f){
    var w = f.closest("div") || f.parentNode;
    if (w) w.style.display = "none";
  });
  var portals = [
    {match: "tiktok", url: "https://www.tiktok.com/@xandrathecreative",
     emoji: "\uD83C\uDFB5", title: "Catch me on TikTok",
     desc: "Short-form chaos, fresh daily.<br>Tap in \u2192 @xandrathecreative", btn: "Visit TikTok"},
    {match: "instagram", url: "https://www.instagram.com/xandrathecreative",
     emoji: "\uD83D\uDCF8", title: "Visual magic on Instagram",
     desc: "Behind-the-scenes, process vids,<br>finished pieces \u2192 @xandrathecreative", btn: "Visit Instagram"}
  ];
  // Tag-agnostic: find text nodes containing the portal name
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  portals.forEach(function(p){
    textNodes.forEach(function(tn){
      var txt = (tn.nodeValue || "").toLowerCase();
      // Match "tiktok portal" or "instagram portal" but not nav links
      if (txt.indexOf(p.match + " portal") === -1) return;
      var el = tn.parentNode;
      // Skip if this is inside a nav/sidebar link
      var anc = el;
      for (var k = 0; k < 4; k++) {
        anc = anc.parentNode;
        if (!anc) break;
        var ac = (anc.className || "").toString().toLowerCase();
        if (/nav|sidebar|menu/.test(ac)) return;
      }
      if (el.dataset && el.dataset.xaFixed) return;
      // Walk up to find the section card
      var card = el;
      for (var j = 0; j < 8; j++) {
        card = card.parentNode;
        if (!card || card === document.body) return;
        var cc = (card.className || "").toString();
        if (/cosmic-card/.test(cc)) break;
      }
      if (!card || card === document.body) return;
      if (card.dataset.xaFixed) return;
      card.dataset.xaFixed = "1";
      // Create body div with the card
      var body = document.createElement("div");
      body.style.cssText = "border:1px solid rgba(168,85,247,.3);border-radius:8px;overflow:hidden;margin:12px 16px 16px";
      body.innerHTML = portalCard(p.url, p.emoji, p.title, p.desc, p.btn);
      card.appendChild(body);
    });
  });
}

/* ---------- Run everything (with retries for hydration) ---------- */
function run(){
  voicePass();
  addDividers();
  addSignature();
  addOscar();
  twinkle();
  dimHovers();
  molEgg();
  fixPortals();
}
var attempts = 0;
var timer = setInterval(function(){
  run();
  if (++attempts > 24) clearInterval(timer);
}, 500);
run();
})();
