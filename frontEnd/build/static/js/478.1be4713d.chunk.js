"use strict";(self.webpackChunkadminpanel=self.webpackChunkadminpanel||[]).push([[478],{1478:function(i,n,a){a.r(n),a.d(n,{default:function(){return w}});var e=a(1413),t=a(5987),r=a(885),s=a(2791),c=a(6871),l=a(4554),o=a(890),d=a(3400),h=a(3239),x=a(1889),p=a(4721),g=a(7414),j=a(9124),Z=a(3896),m=a(9760),u=a(5111),_=a(6711),v=a(9210),f=a(9434),b=a(2881),y=a(184),P=["children","value","index"];function w(i){var n=(0,f.I0)(),a=(0,s.useState)(0),w=(0,r.Z)(a,2),k=w[0],I=w[1],S=(0,s.useState)(0),T=(0,r.Z)(S,2),C=T[0],D=T[1],N=(0,c.UO)().SKU,F=(0,s.useState)(void 0),M=(0,r.Z)(F,2),O=M[0],W=M[1];(0,s.useMemo)((function(){(0,v.KL)(N).then((function(a){a.data?W(a.data):(i.history("productDetails/P-0"+(parseInt(N.split("-")[1])-1)),n((0,b.br)({open:!0,variant:"warning",message:"No more product left !!!"})))})).catch((function(i){console.log(i)}))}),[N]);function E(i){var n=i.children,a=i.value,r=i.index,s=(0,t.Z)(i,P);return(0,y.jsx)("div",(0,e.Z)((0,e.Z)({role:"tabpanel",hidden:a!==r,id:"simple-tabpanel-".concat(r),"aria-labelledby":"simple-tab-".concat(r)},s),{},{children:a===r&&(0,y.jsx)(l.Z,{sx:{p:3},children:(0,y.jsx)(o.Z,{children:n})})}))}function z(i){return{id:"simple-tab-".concat(i),"aria-controls":"simple-tabpanel-".concat(i)}}return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(l.Z,{className:"navigation",p:1,children:[(0,y.jsx)(d.Z,{disabled:parseInt(N.split("-")[1])<1002&&!0,onClick:function(){return i.history("productDetails/P-0"+(parseInt(N.split("-")[1])-1))},variant:"contained",color:"primary",children:(0,y.jsx)(m.Z,{})}),(0,y.jsx)(d.Z,{onClick:function(){return i.history("productDetails/P-0"+(parseInt(N.split("-")[1])+1))},variant:"contained",color:"primary",children:(0,y.jsx)(u.Z,{})})]}),void 0===O?(0,y.jsxs)("center",{style:{marginTop:"20%"},children:[(0,y.jsx)(o.Z,{variant:"h4",children:"Product Loading...."}),(0,y.jsx)(h.Z,{color:"primary"})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(x.ZP,{container:!0,className:"mainSec",children:[(0,y.jsxs)(x.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsx)(o.Z,{component:"span",sx:{display:"block",mb:3},variant:"h5",children:"Product Details"}),(0,y.jsx)(d.Z,{color:"primary",onClick:function(){i.history("/products")},children:(0,y.jsx)(_.Z,{})})]}),(0,y.jsx)(x.ZP,{item:!0,className:"imageSec",xs:12,md:6,children:(0,y.jsxs)(x.ZP,{container:!0,children:[(0,y.jsx)(x.ZP,{item:!0,xs:8,sx:{margin:"auto"},children:(0,y.jsx)("img",{className:"showImage",src:O.product_image[k],alt:"image2"})}),(0,y.jsx)(x.ZP,{item:!0,xs:12,children:(0,y.jsx)(x.ZP,{container:!0,className:"preview",spacing:2,children:O.product_image.map((function(i,n){return(0,y.jsx)(x.ZP,{item:!0,xs:3,onClick:function(){I(n)},children:(0,y.jsx)("img",{src:i,className:"showImage",alt:"images"})},n)}))})})]})}),(0,y.jsxs)(x.ZP,{item:!0,xs:12,className:"contentSec",md:6,children:[(0,y.jsx)(x.ZP,{container:!0,children:(0,y.jsx)(x.ZP,{item:!0,xs:12,children:(0,y.jsx)(o.Z,{sx:{fontWeight:350},variant:"h4",children:O.product_title})})}),(0,y.jsxs)(x.ZP,{className:"pd",item:!0,xs:12,children:[(0,y.jsx)(o.Z,{sx:{fontWeight:400},variant:"body2",children:"Product Details"}),(0,y.jsx)(p.Z,{}),(0,y.jsxs)(g.Z,{sx:{paddingTop:"2%"},children:[(0,y.jsxs)(o.Z,{variant:"caption",children:["SKU",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.SKU})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Category",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.category_name})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Sub Category",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.sub_category_name})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["SEO Title",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.seo_title})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["SEO Keyword",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.seo_keyword})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Matrial",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.primary_material})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Weight Capacity",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.weight_capacity})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Manufacturing Time",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.manufacturing_time})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Polish Time",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.polish_time})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Range",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.range})]})]}),(0,y.jsx)(o.Z,{sx:{fontWeight:400,mt:1},variant:"body2",children:"Price Details"}),(0,y.jsx)(p.Z,{}),(0,y.jsxs)(g.Z,{sx:{paddingTop:"2%"},children:[(0,y.jsxs)(o.Z,{variant:"caption",children:["Selling Price",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.selling_price})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Showroom Price",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.showroom_price})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Discount ",(0,y.jsxs)(o.Z,{sx:{float:"right"},variant:"caption",children:[O.discount_limit,"%"]})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Tax ",(0,y.jsxs)(o.Z,{sx:{float:"right"},variant:"caption",children:[O.tax_rate,"%"]})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["MRP ",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.selling_price-O.selling_price/100*O.discount_limit})]})]}),(0,y.jsx)(o.Z,{sx:{fontWeight:400,mt:1},variant:"body2",children:"Dimesion Details"}),(0,y.jsx)(p.Z,{}),(0,y.jsxs)(g.Z,{sx:{paddingTop:"2%"},children:[(0,y.jsxs)(o.Z,{variant:"caption",children:["Dimensions (Inch)",(0,y.jsxs)(o.Z,{sx:{float:"right"},variant:"caption",children:[O.length_main," L x ",O.height," H x ",O.breadth," B"]})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Package Length (Inch)",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.package_length})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Package Height (Inch)",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.package_height})]}),(0,y.jsxs)(o.Z,{variant:"caption",children:["Package Breadth (Inch)",(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"caption",children:O.package_breadth})]})]})]})]})]}),(0,y.jsxs)(x.ZP,{container:!0,className:"moreInfo",children:[(0,y.jsx)(x.ZP,{item:!0,xs:12,children:(0,y.jsx)(o.Z,{sx:{fontWeight:500},variant:"h5",children:"MORE INFORMATION"})}),(0,y.jsx)(x.ZP,{item:!0,xs:12,children:(0,y.jsx)(o.Z,{sx:{fontWeight:100,padding:"1% 0%"},component:"span",variant:"caption",children:"Explore full product details here !!!"})}),(0,y.jsx)(x.ZP,{item:!0,xs:12,children:(0,y.jsxs)(l.Z,{sx:{width:"100%"},children:[(0,y.jsx)(l.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,y.jsxs)(j.Z,{value:C,onChange:function(i,n){D(n)},"aria-label":"basic tabs example",children:[(0,y.jsx)(Z.Z,(0,e.Z)({label:"Specification"},z(0))),(0,y.jsx)(Z.Z,(0,e.Z)({label:"Image"},z(1))),(0,y.jsx)(Z.Z,(0,e.Z)({label:"Features"},z(2))),(0,y.jsx)(Z.Z,(0,e.Z)({label:"Miscellaneous"},z(3))),(0,y.jsx)(Z.Z,(0,e.Z)({label:"Inventory & Shipping"},z(4))),(0,y.jsx)(Z.Z,(0,e.Z)({label:"SEO"},z(5))),(0,y.jsx)(Z.Z,(0,e.Z)({label:"Extra Details"},z(6)))]})}),(0,y.jsx)(E,{value:C,index:0,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["product_title","category_name","sub_category_name","primary_material","length_main","breadth","height","weight","polish_name","assembly_required","assembly_part","selling_price","showroom_price","discount_limit","show_on_mobile","range"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"button",children:[i,(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"button",children:O[i]})]}),(0,y.jsx)(p.Z,{})]})}))})}),(0,y.jsx)(E,{value:C,index:1,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["featured_image","mannequin_image","specification_image"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"h6",children:[i.toUpperCase(),(0,y.jsx)("img",{alt:"images",src:O[i],sx:{float:"right"}})]}),(0,y.jsx)(p.Z,{sx:{mb:2}})]})}))})}),(0,y.jsx)(E,{value:C,index:2,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["rotating_seats","eatable_oil_polish","no_chemical","weaving","knife","not_suitable_for_Micro_Dish","tilt_top","inside_compartments","stackable","ceramic_drawers","ceramic_tiles"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"button",children:[i,(0,y.jsx)(o.Z,{sx:{float:"right",color:O[i]?"green":"red"},variant:"button",children:O[i]?"true":"false"})]}),(0,y.jsx)(p.Z,{})]})}))})}),(0,y.jsx)(E,{value:C,index:3,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["weight_capacity","joints","drawer","drawer_count","back_style"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"button",children:[i,(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"button",children:O[i]})]}),(0,y.jsx)(p.Z,{})]})}))})}),(0,y.jsx)(E,{value:C,index:4,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["warehouse","bangalore_stock","jodhpur_stock","selling_points","polish_time","manufacturing_time","returnDays","COD","returnable","package_length","package_height","package_breadth","quantity","unit"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"button",children:[i,(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"button",children:O[i]})]}),(0,y.jsx)(p.Z,{})]})}))})}),(0,y.jsx)(E,{value:C,index:5,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["product_description","seo_title","seo_description","seo_keyword"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"button",children:[i,(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"button",children:O[i]})]}),(0,y.jsx)(p.Z,{})]})}))})}),(0,y.jsx)(E,{value:C,index:6,children:(0,y.jsx)(g.Z,{sx:{padding:"5%",paddingTop:"1%"},children:["hinge_name","knob_name","textile_name","textile_type","door_name","fitting_name","top_size","dial_size","seating_size_width","seating_size_depth","seating_size_height","fabric","fabric_name","mirror","mirror_length","mirror_width","silver","silver_weight","wheel","trolley","trolley_material","tax_rate","legs"].map((function(i){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Z,{variant:"button",children:[i,(0,y.jsx)(o.Z,{sx:{float:"right"},variant:"button",children:O[i]})]}),(0,y.jsx)(p.Z,{})]})}))})})]})})]})]})]})}}}]);
//# sourceMappingURL=478.1be4713d.chunk.js.map