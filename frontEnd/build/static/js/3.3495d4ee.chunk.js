"use strict";(self.webpackChunkadminpanel=self.webpackChunkadminpanel||[]).push([[3],{2941:function(e,t,n){n(2791);t.Z=n.p+"static/media/question.39cb8d4200d3f01587b41e9360f3b287.svg"},8003:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var i=n(4942),a=n(1413),r=n(5861),o=n(885),s=n(4687),l=n.n(s),d=n(2791),c=n(68),m=n(3400),p=n(4554),u=n(890),h=n(1889),v=n(7391),f=n(3466),x=n(6151),g=n(7247),Z=n(2419),j=n(9210),b=(n(2764),n(7477)),C=n(9434),w=n(2881),I=n(2941),y=n(184);function P(){var e=(0,d.useState)({email:void 0,CID:void 0,date:""}),t=(0,o.Z)(e,2),n=t[0],s=t[1],P=(0,C.I0)(),D=(0,d.useState)([]),N=(0,o.Z)(D,2),S=N[0],E=N[1],z=(0,d.useState)(50),_=(0,o.Z)(z,2),k=_[0],A=_[1];(0,d.useEffect)((function(){(0,j.Y6)().then((function(e){var t=[];e.data.map((function(e){void 0!==n.CID?e.CID==="CID-".concat(n.CID)&&t.push(e):void 0!==n.email?e.email===n.email&&t.push(e):t.push(e)})),E(t.map((function(e,t){return{id:t+1,CID:e.CID,register_time:e.register_time,profile_image:e.profile_image,username:e.username,mobile:e.mobile,email:e.email,password:e.password,city:e.city,state:e.state,shipping:e.shipping,action:e}})))})).catch((function(e){}))}),[n]);var L=[{field:"id",headerName:"ID",width:50},{field:"profile_image",align:"center",headerName:"Image",width:200,renderCell:function(e){return(0,y.jsx)("div",{className:"categoryImage",children:(0,y.jsx)("img",{src:e.formattedValue||I.Z,alt:"profile_image"})})}},{field:"CID",headerName:"Customer ID",width:350},{field:"username",headerName:"Customer Name",width:150,align:"center"},{field:"email",headerName:"Customer Email",width:250,align:"center"},{field:"register_time",headerName:"Registration Date",width:200,align:"center"},{field:"action",headerName:"Actions",width:200,renderCell:function(e){return(0,y.jsx)("div",{className:"categoryImage",children:(0,y.jsx)(c.Z,{title:"delete",children:(0,y.jsx)(m.Z,{onClick:(0,r.Z)(l().mark((function t(){var n;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,j.uN)({DID:"",AID:e.formattedValue.CID,type:"Customer",operation:"deleteCustomer",_id:e.formattedValue});case 2:(n=t.sent)&&P((0,w.br)({open:!0,variant:"success",message:n.data.message}));case 4:case"end":return t.stop()}}),t)}))),"aria-label":"delete",children:(0,y.jsx)(g.Z,{})})})})}}],M=function(e){s((0,a.Z)((0,a.Z)({},n),{},(0,i.Z)({},e.target.name,e.target.value||void 0)))};return(0,y.jsxs)(p.Z,{sx:{pl:4,pr:4},children:[(0,y.jsx)(u.Z,{component:"span",sx:{display:"block"},variant:"h5",children:"Customer"}),(0,y.jsx)("br",{}),(0,y.jsxs)(h.ZP,{container:!0,p:2,sx:{boxShadow:1,borderRadius:2,justifyContent:" space-evenly !important",alignItems:"center !important",gap:"15px"},children:[(0,y.jsx)(h.ZP,{xs:12,md:3.3,children:(0,y.jsx)(v.Z,{fullWidth:!0,size:"small",id:"demo-helper-text-aligned-no-helper",type:"text",InputProps:{startAdornment:(0,y.jsx)(f.Z,{position:"start",children:"CID"})},value:n.CID,name:"CID",onChange:M})}),(0,y.jsx)(h.ZP,{xs:12,md:4,children:(0,y.jsx)(v.Z,{fullWidth:!0,size:"small",id:"demo-helper-text-aligned-no-helper",InputProps:{startAdornment:(0,y.jsx)(f.Z,{position:"start",children:"Email"})},value:n.email,name:"email",type:"email",onChange:M})}),(0,y.jsx)(h.ZP,{xs:12,md:4,children:(0,y.jsx)(v.Z,{fullWidth:!0,size:"small",id:"demo-helper-text-aligned-no-helper",type:"date",name:"date",onChange:M})})]}),(0,y.jsx)("br",{}),(0,y.jsx)(h.ZP,{container:!0,scaping:2,className:"overviewContainer",children:(0,y.jsxs)(h.ZP,{item:!0,p:2,xs:12,sx:{boxShadow:2,borderRadius:5},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsxs)(u.Z,{component:"span",variant:"h6",children:[" ","Customer List"," "]}),(0,y.jsx)(x.Z,{onClick:function(){P((0,w.iO)({state:!0,formType:"add_customer",row:S,setRow:E}))},color:"primary",variant:"contained",children:(0,y.jsx)(Z.Z,{})})]}),(0,y.jsx)("div",{style:{marginTop:"2%",height:400,width:"100%"},children:(0,y.jsx)(b._,{filterModel:{items:[{columnField:"order_time",operatorValue:"contains",value:"".concat(n.date)}]},rows:S,columns:L,disableSelectionOnClick:!0,pagination:!0,pageSize:k,onPageSizeChange:function(e){return A(e)},rowsPerPageOptions:[25,50,100]})})]})})]})}},2419:function(e,t,n){var i=n(4836);t.Z=void 0;var a=i(n(5649)),r=n(184),o=(0,a.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=o},7247:function(e,t,n){var i=n(4836);t.Z=void 0;var a=i(n(5649)),r=n(184),o=(0,a.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=o},3466:function(e,t,n){n.d(t,{Z:function(){return w}});var i=n(4942),a=n(3366),r=n(7462),o=n(2791),s=n(8182),l=n(4419),d=n(4036),c=n(890),m=n(3840),p=n(2930),u=n(6934),h=n(5878),v=n(1217);function f(e){return(0,v.Z)("MuiInputAdornment",e)}var x,g=(0,h.Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=n(1402),j=n(184),b=["children","className","component","disablePointerEvents","disableTypography","position","variant"],C=(0,u.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["position".concat((0,d.Z)(n.position))],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]}})((function(e){var t=e.theme,n=e.ownerState;return(0,r.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active},"filled"===n.variant&&(0,i.Z)({},"&.".concat(g.positionStart,"&:not(.").concat(g.hiddenLabel,")"),{marginTop:16}),"start"===n.position&&{marginRight:8},"end"===n.position&&{marginLeft:8},!0===n.disablePointerEvents&&{pointerEvents:"none"})})),w=o.forwardRef((function(e,t){var n=(0,Z.Z)({props:e,name:"MuiInputAdornment"}),i=n.children,u=n.className,h=n.component,v=void 0===h?"div":h,g=n.disablePointerEvents,w=void 0!==g&&g,I=n.disableTypography,y=void 0!==I&&I,P=n.position,D=n.variant,N=(0,a.Z)(n,b),S=(0,p.Z)()||{},E=D;D&&S.variant,S&&!E&&(E=S.variant);var z=(0,r.Z)({},n,{hiddenLabel:S.hiddenLabel,size:S.size,disablePointerEvents:w,position:P,variant:E}),_=function(e){var t=e.classes,n=e.disablePointerEvents,i=e.hiddenLabel,a=e.position,r=e.size,o=e.variant,s={root:["root",n&&"disablePointerEvents",a&&"position".concat((0,d.Z)(a)),o,i&&"hiddenLabel",r&&"size".concat((0,d.Z)(r))]};return(0,l.Z)(s,f,t)}(z);return(0,j.jsx)(m.Z.Provider,{value:null,children:(0,j.jsx)(C,(0,r.Z)({as:v,ownerState:z,className:(0,s.Z)(_.root,u),ref:t},N,{children:"string"!==typeof i||y?(0,j.jsxs)(o.Fragment,{children:["start"===P?x||(x=(0,j.jsx)("span",{className:"notranslate",children:"\u200b"})):null,i]}):(0,j.jsx)(c.Z,{color:"text.secondary",children:i})}))})}))},2764:function(){}}]);
//# sourceMappingURL=3.3495d4ee.chunk.js.map