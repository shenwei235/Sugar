var V,ab,bb=["ampm","hour","minute","second","ampm","utc","offset_sign","offset_hours","offset_minutes","ampm"],cb="({t})?\\s*(\\d{1,2}(?:[,.]\\d+)?)(?:{h}([0-5]\\d(?:[,.]\\d+)?)?{m}(?::?([0-5]\\d(?:[,.]\\d+)?){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))",db={},eb,fb,gb,hb=[],ib=[{ba:"f{1,4}|ms|milliseconds",format:function(a){return W(a,"Milliseconds")}},{ba:"ss?|seconds",format:function(a){return W(a,"Seconds")}},{ba:"mm?|minutes",format:function(a){return W(a,"Minutes")}},
{ba:"hh?|hours|12hr",format:function(a){a=W(a,"Hours");return a===0?12:a-ra(a/13)*12}},{ba:"HH?|24hr",format:function(a){return W(a,"Hours")}},{ba:"dd?|date|day",format:function(a){return W(a,"Date")}},{ba:"dow|weekday",la:k,format:function(a,b,c){a=W(a,"Day");return b.weekdays[a+(c-1)*7]}},{ba:"MM?",format:function(a){return W(a,"Month")+1}},{ba:"mon|month",la:k,format:function(a,b,c){a=W(a,"Month");return b.months[a+(c-1)*12]}},{ba:"y{2,4}|year",format:function(a){return W(a,"FullYear")}},{ba:"[Tt]{1,2}",
format:function(a,b,c,d){if(b.ampm.length==0)return"";a=W(a,"Hours");b=b.ampm[ra(a/12)];if(d.length===1)b=b.slice(0,1);if(d.slice(0,1)==="T")b=b.toUpperCase();return b}},{ba:"z{1,4}|tz|timezone",text:k,format:function(a,b,c,d){a=a.getUTCOffset();if(d=="z"||d=="zz")a=a.replace(/(\d{2})(\d{2})/,function(e,f){return P(f,d.length)});return a}},{ba:"iso(tz|timezone)",format:function(a){return a.getUTCOffset(k)}},{ba:"ord",format:function(a){a=W(a,"Date");return a+ta(a)}}],jb=[{$:"year",method:"FullYear",
ja:k,da:function(a){return(365+(a?a.isLeapYear()?1:0:0.25))*24*60*60*1E3}},{$:"month",method:"Month",ja:k,da:function(a,b){var c=30.4375,d;if(a){d=a.daysInMonth();if(b<=d.days())c=d}return c*24*60*60*1E3},error:0.919},{$:"week",method:"ISOWeek",da:aa(6048E5)},{$:"day",method:"Date",ja:k,da:aa(864E5)},{$:"hour",method:"Hours",da:aa(36E5)},{$:"minute",method:"Minutes",da:aa(6E4)},{$:"second",method:"Seconds",da:aa(1E3)},{$:"millisecond",method:"Milliseconds",da:aa(1)}],kb={};
function lb(a){oa(this,a);this.ga=hb.concat()}
lb.prototype={getMonth:function(a){return B(a)?a-1:this.months.indexOf(a)%12},getWeekday:function(a){return this.weekdays.indexOf(a)%7},oa:function(a){var b;return B(a)?a:a&&(b=this.numbers.indexOf(a))!==-1?(b+1)%10:1},ua:function(a){var b=this;return a.replace(r(this.num,"g"),function(c){return b.oa(c)||""})},sa:function(a){return V.units[this.units.indexOf(a)%8]},va:function(a){return this.na(a,a[2]>0?"future":"past")},ra:function(a){return this.na(mb(a),"duration")},wa:function(a){a=a||this.code;
return a==="en"||a==="en-US"?k:this.variant},za:function(a){return a===this.ampm[0]},Aa:function(a){return a&&a===this.ampm[1]},na:function(a,b){var c,d,e=a[0],f=a[1],h=a[2],i=this[b]||this.relative;if(A(i))return i.call(this,e,f,h,b);d=this.units[(this.plural&&e>1?1:0)*8+f]||this.units[f];if(this.capitalizeUnit)d=nb(d);c=this.modifiers.filter(function(j){return j.name=="sign"&&j.value==(h>0?1:-1)})[0];return i.replace(/\{(.*?)\}/g,function(j,g){switch(g){case "num":return e;case "unit":return d;
case "sign":return c.src}})},ta:function(){return this.ma?[this.ma].concat(this.ga):this.ga},addFormat:function(a,b,c,d,e){var f=c||[],h=this,i;a=a.replace(/\s+/g,"[-,. ]*");a=a.replace(/\{([^,]+?)\}/g,function(j,g){var m,o,x,z=g.match(/\?$/);x=g.match(/^(\d+)\??$/);var J=g.match(/(\d)(?:-(\d))?/),M=g.replace(/[^a-z]+$/,"");if(x)m=h.tokens[x[1]];else if(h[M])m=h[M];else if(h[M+"s"]){m=h[M+"s"];if(J){o=[];m.forEach(function(Q,Da){var U=Da%(h.units?8:m.length);if(U>=J[1]&&U<=(J[2]||J[1]))o.push(Q)});
m=o}m=ob(m)}if(x)x="(?:"+m+")";else{c||f.push(M);x="("+m+")"}if(z)x+="?";return x});if(b){b=pb(cb,h,e);e=["t","[\\s\\u3000]"].concat(h.timeMarker);i=a.match(/\\d\{\d,\d\}\)+\??$/);qb(h,"(?:"+b+")[,\\s\\u3000]+?"+a,bb.concat(f),d);qb(h,a+"(?:[,\\s]*(?:"+e.join("|")+(i?"+":"*")+")"+b+")?",f.concat(bb),d)}else qb(h,a,f,d)}};function rb(a,b){var c;C(a)||(a="");c=kb[a]||kb[a.slice(0,2)];if(b===n&&!c)throw Error("Invalid locale.");return c||ab}
function sb(a,b){function c(g){var m=i[g];if(C(m))i[g]=m.split(",");else m||(i[g]=[])}function d(g,m){g=g.split("+").map(function(o){return o.replace(/(.+):(.+)$/,function(x,z,J){return J.split("|").map(function(M){return z+M}).join("|")})}).join("|");return g.split("|").forEach(m)}function e(g,m,o){var x=[];i[g].forEach(function(z,J){if(m)z+="+"+z.slice(0,3);d(z,function(M,Q){x[Q*o+J]=M.toLowerCase()})});i[g]=x}function f(g,m,o){g="\\d{"+g+","+m+"}";if(o)g+="|(?:"+ob(i.numbers)+")+";return g}function h(g,
m){i[g]=i[g]||m}var i,j;i=new lb(b);c("modifiers");"months,weekdays,units,numbers,articles,tokens,timeMarker,ampm,timeSuffixes,dateParse,timeParse".split(",").forEach(c);j=!i.monthSuffix;e("months",j,12);e("weekdays",j,7);e("units",n,8);e("numbers",n,10);h("code",a);h("date",f(1,2,i.digitDate));h("year","'\\d{2}|"+f(4,4));h("num",function(){var g=["\\d+"].concat(i.articles);if(i.numbers)g=g.concat(i.numbers);return ob(g)}());(function(){var g=[];i.ha={};i.modifiers.forEach(function(m){var o=m.name;
d(m.src,function(x){var z=i[o];i.ha[x]=m;g.push({name:o,src:x,value:m.value});i[o]=z?z+"|"+x:x})});i.day+="|"+ob(i.weekdays);i.modifiers=g})();if(i.monthSuffix){i.month=f(1,2);i.months=qa(1,12).map(function(g){return g+i.monthSuffix})}i.full_month=f(1,2)+"|"+ob(i.months);i.timeSuffixes.length>0&&i.addFormat(pb(cb,i),n,bb);i.addFormat("{day}",k);i.addFormat("{month}"+(i.monthSuffix||""));i.addFormat("{year}"+(i.yearSuffix||""));i.timeParse.forEach(function(g){i.addFormat(g,k)});i.dateParse.forEach(function(g){i.addFormat(g)});
return kb[a]=i}function qb(a,b,c,d){a.ga.unshift({Da:d,ya:a,Ca:r("^"+b+"$","i"),to:c})}function nb(a){return a.slice(0,1).toUpperCase()+a.slice(1)}function ob(a){return a.filter(function(b){return!!b}).join("|")}function tb(a,b){var c;if(na(a[0]))return a;else if(B(a[0])&&!B(a[1]))return[a[0]];else if(C(a[0])&&b)return[ub(a[0]),a[1]];c={};fb.forEach(function(d,e){c[d.$]=a[e]});return[c]}
function ub(a,b){var c={};if(match=a.match(/^(\d+)?\s?(\w+?)s?$/i)){if(N(b))b=parseInt(match[1])||1;c[match[2].toLowerCase()]=b}return c}function vb(a,b){var c={},d,e;b.forEach(function(f,h){d=a[h+1];if(!(N(d)||d==="")){if(f==="year")c.Ea=d.replace(/'/,"");e=parseFloat(d.replace(/'/,"").replace(/,/,"."));c[f]=!isNaN(e)?e:d.toLowerCase()}});return c}function wb(a){a=a.trim().replace(/^just (?=now)|\.+$/i,"");return xb(a)}
function xb(a){return a.replace(eb,function(b,c,d){var e=0,f=1,h,i;if(c)return b;d.split("").reverse().forEach(function(j){j=db[j];var g=j>9;if(g){if(h)e+=f;f*=j/(i||1);i=j}else{if(h===n)f*=10;e+=f*j}h=g});if(h)e+=f;return e})}
function yb(a,b,c,d){var e=new s,f=n,h,i,j,g,m,o,x,z,J;e.utc(d);if(ga(a))e.utc(a.isUTC()).setTime(a.getTime());else if(B(a))e.setTime(a);else if(na(a)){e.set(a,k);g=a}else if(C(a)){h=rb(b);a=wb(a);h&&G(h.ta(),function(M,Q){var Da=a.match(Q.Ca);if(Da){j=Q;i=j.ya;g=vb(Da,j.to,i);g.utc&&e.utc();i.ma=j;if(g.timestamp){g=g.timestamp;return n}if(j.Da&&!C(g.month)&&(C(g.date)||h.wa(b))){z=g.month;g.month=g.date;g.date=z}if(g.year&&g.Ea.length===2)g.year=O(W(new s,"FullYear")/100)*100-O(g.year/100)*100+g.year;
if(g.month){g.month=i.getMonth(g.month);if(g.shift&&!g.unit)g.unit=i.units[7]}if(g.weekday&&g.date)delete g.weekday;else if(g.weekday){g.weekday=i.getWeekday(g.weekday);if(g.shift&&!g.unit)g.unit=i.units[5]}if(g.day&&(z=i.ha[g.day])){g.day=z.value;e.reset();f=k}else if(g.day&&(o=i.getWeekday(g.day))>-1){delete g.day;if(g.num&&g.month){J=function(){var U=e.getWeekday();e.setWeekday(7*(g.num-1)+(U>o?o+7:o))};g.day=1}else g.weekday=o}if(g.date&&!B(g.date))g.date=i.ua(g.date);if(i.Aa(g.ampm)&&g.hour<
12)g.hour+=12;else if(i.za(g.ampm)&&g.hour===12)g.hour=0;if("offset_hours"in g||"offset_minutes"in g){e.utc();g.offset_minutes=g.offset_minutes||0;g.offset_minutes+=g.offset_hours*60;if(g.offset_sign==="-")g.offset_minutes*=-1;g.minute-=g.offset_minutes}if(g.unit){f=k;x=i.oa(g.num);m=i.sa(g.unit);if(g.shift||g.edge){x*=(z=i.ha[g.shift])?z.value:0;if(m==="month"&&L(g.date)){e.set({day:g.date},k);delete g.date}if(m==="year"&&L(g.month)){e.set({month:g.month,day:g.date},k);delete g.month;delete g.date}}if(g.sign&&
(z=i.ha[g.sign]))x*=z.value;if(L(g.weekday)){e.set({weekday:g.weekday},k);delete g.weekday}g[m]=(g[m]||0)+x}if(g.year_sign==="-")g.year*=-1;gb.slice(1,4).forEach(function(U,cc){var Gb=g[U.$],Hb=Gb%1;if(Hb){g[gb[cc].$]=O(Hb*(U.$==="second"?1E3:60));g[U.$]=ra(Gb)}});return n}});if(j)if(f)e.advance(g);else{e._utc&&e.reset();zb(e,g,k,n,c)}else{if(a!=="now")e=new s(a);d&&e.addMinutes(-e.getTimezoneOffset())}if(g&&g.edge){z=i.ha[g.edge];G(gb.slice(4),function(M,Q){if(L(g[Q.$])){m=Q.$;return n}});if(m===
"year")g.fa="month";else if(m==="month"||m==="week")g.fa="day";e[(z.value<0?"endOf":"beginningOf")+nb(m)]();z.value===-2&&e.reset()}J&&J();e.utc(n)}return{ea:e,set:g}}function mb(a){var b,c=v.abs(a),d=c,e=0;gb.slice(1).forEach(function(f,h){b=ra(O(c/f.da()*10)/10);if(b>=1){d=b;e=h+1}});return[d,e,a]}function Ab(a){var b=mb(a.millisecondsFromNow());if(b[1]===6)b[0]=v.abs(a.Ha());return b}
function Bb(a,b,c,d){var e,f=rb(d),h=r(/^[A-Z]/);if(a.isValid())if(Date[b])b=Date[b];else{if(A(b)){e=Ab(a);b=b.apply(a,e.concat(f))}}else return"Invalid Date";if(!b&&c){e=e||Ab(a);if(e[1]===0){e[1]=1;e[0]=1}return f.va(e)}b=b||"long";b=f[b]||b;ib.forEach(function(i){b=b.replace(r("\\{("+i.ba+")(\\d)?\\}",i.la?"i":""),function(j,g,m){j=i.format(a,f,m||1,g);m=g.length;var o=g.match(/^(.)\1+$/);if(i.la){if(m===3)j=j.slice(0,3);if(o||g.match(h))j=nb(j)}else if(o&&!i.text)j=(B(j)?P(j,m):j.toString()).slice(-m);
return j})});return b}function Cb(a,b,c,d){var e,f,h,i=0,j=0,g=0;e=yb(b,l,l,d);if(c>0){j=g=c;f=k}if(!e.ea.isValid())return n;if(e.set&&e.set.fa){jb.forEach(function(m){if(m.$===e.set.fa)i=m.da(e.ea,a-e.ea)-1});b=nb(e.set.fa);if(e.set.edge||e.set.shift)e.ea["beginningOf"+b]();if(e.set.fa==="month")h=e.ea.clone()["endOf"+b]().getTime();if(!f&&e.set.sign&&e.set.fa!="millisecond"){j=50;g=-50}}f=a.getTime();b=e.ea.getTime();h=h||b+i;h=Db(a,b,h);return f>=b-j&&f<=h+g}
function Db(a,b,c){b=new Date(b);a=(new Date(c)).utc(a.isUTC());if(W(a,"Hours")!==23){b=b.getTimezoneOffset();a=a.getTimezoneOffset();if(b!==a)c+=(a-b).minutes()}return c}
function zb(a,b,c,d,e){function f(g){return L(b[g])?b[g]:b[g+"s"]}function h(g){return L(f(g))}var i,j;if(B(b)&&d)b={milliseconds:b};else if(B(b)){a.setTime(b);return a}if(L(b.date))b.day=b.date;G(gb,function(g,m){var o=m.$==="day";if(h(m.$)||o&&h("weekday")){b.fa=m.$;j=+g;return n}else if(c&&m.$!=="week"&&(!o||!h("week")))Eb(a,m.method,o?1:0)});jb.forEach(function(g){var m=g.$;g=g.method;var o;o=f(m);if(!N(o)){if(d){if(m==="week"){o=(b.day||0)+o*7;g="Date"}o=o*d+W(a,g)}else m==="month"&&h("day")&&
Eb(a,"Date",15);Eb(a,g,o);if(d&&m==="month"){m=o;if(m<0)m=m%12+12;m%12!=W(a,"Month")&&Eb(a,"Date",0)}}});if(!d&&!h("day")&&h("weekday")){i=f("weekday");a.setWeekday(i)}(function(){var g=new s;return e===-1&&a>g||e===1&&a<g})()&&G(gb.slice(j+1),function(g,m){if((m.ja||m.$==="week"&&h("weekday"))&&!(h(m.$)||m.$==="day"&&h("weekday"))){a[m.ia](e);return n}});return a}function W(a,b){return a["get"+(a._utc?"UTC":"")+b]()}function Eb(a,b,c){return a["set"+(a._utc&&b!="ISOWeek"?"UTC":"")+b](c)}
function pb(a,b,c){var d={h:0,m:1,s:2},e;b=b||V;return a.replace(/{([a-z])}/g,function(f,h){var i=[],j=h==="h",g=j&&!c;if(h==="t")return b.ampm.join("|");else{j&&i.push(":");if(e=b.timeSuffixes[d[h]])i.push(e+"\\s*");return i.length===0?"":"(?:"+i.join("|")+")"+(g?"":"?")}})}function X(a,b,c){var d,e;if(B(a[1]))d=tb(a)[0];else{d=a[0];e=a[1]}return yb(d,e,b,c).ea}
s.extend({create:function(){return X(arguments)},past:function(){return X(arguments,-1)},future:function(){return X(arguments,1)},addLocale:function(a,b){return sb(a,b)},setLocale:function(a){var b=rb(a,n);ab=b;if(a&&a!=b.code)b.code=a;return b},getLocale:function(a){return!a?ab:rb(a,n)},addFormat:function(a,b,c){qb(rb(c),a,b)}},n,n);
s.extend({set:function(){var a=tb(arguments);return zb(this,a[0],a[1])},setWeekday:function(a){if(!N(a))return Eb(this,"Date",W(this,"Date")+a-W(this,"Day"))},setISOWeek:function(a){var b=W(this,"Day")||7;if(!N(a)){this.set({Ga:0,ea:4});this.set({Ja:1});a>1&&this.Fa(a-1);b!==1&&this.advance({days:b-1});return this.getTime()}},getISOWeek:function(){var a=this;a=a.clone();var b=W(a,"Day")||7;a.addDays(4-b).reset();return 1+ra(a.daysSince(a.clone().beginningOfYear())/7)},getUTCOffset:function(a){var b=
this._utc?0:this.getTimezoneOffset(),c=a===k?":":"";if(!b&&a)return"Z";return P(O(-b/60),2,k)+c+P(b%60,2)},utc:function(a){E(this,"_utc",a===k||arguments.length===0);return this},isUTC:function(){return!!this._utc||this.getTimezoneOffset()===0},advance:function(){var a=tb(arguments,k);return zb(this,a[0],a[1],1)},rewind:function(){var a=tb(arguments,k);return zb(this,a[0],a[1],-1)},isValid:function(){return!isNaN(this.getTime())},isAfter:function(a,b){return this.getTime()>s.create(a).getTime()-(b||
0)},isBefore:function(a,b){return this.getTime()<s.create(a).getTime()+(b||0)},isBetween:function(a,b,c){var d=this.getTime();a=s.create(a).getTime();var e=s.create(b).getTime();b=v.min(a,e);a=v.max(a,e);c=c||0;return b-c<d&&a+c>d},isLeapYear:function(){var a=W(this,"FullYear");return a%4===0&&a%100!==0||a%400===0},daysInMonth:function(){return 32-W(new s(W(this,"FullYear"),W(this,"Month"),32),"Date")},format:function(a,b){return Bb(this,a,n,b)},relative:function(a,b){if(C(a)){b=a;a=l}return Bb(this,
a,k,b)},is:function(a,b,c){var d,e;if(this.isValid()){if(C(a)){a=a.trim().toLowerCase();e=this.clone().utc(c);switch(k){case a==="future":return this.getTime()>(new s).getTime();case a==="past":return this.getTime()<(new s).getTime();case a==="weekday":return W(e,"Day")>0&&W(e,"Day")<6;case a==="weekend":return W(e,"Day")===0||W(e,"Day")===6;case (d=V.weekdays.indexOf(a)%7)>-1:return W(e,"Day")===d;case (d=V.months.indexOf(a)%12)>-1:return W(e,"Month")===d}}return Cb(this,a,b,c)}},reset:function(a){var b=
{},c;a=a||"hours";if(a==="date")a="days";c=jb.some(function(d){return a===d.$||a===d.$+"s"});b[a]=a.match(/^days?/)?1:0;return c?this.set(b,k):this},clone:function(){var a=new s(this.getTime());a.utc(!!this._utc);return a}});s.extend({iso:function(){return this.toISOString()},getWeekday:s.prototype.getDay,getUTCWeekday:s.prototype.getUTCDay});
function Fb(a,b){function c(){return O(this*b)}function d(){return X(arguments)[a.ia](this)}function e(){return X(arguments)[a.ia](-this)}var f=a.$,h={};h[f]=c;h[f+"s"]=c;h[f+"Before"]=e;h[f+"sBefore"]=e;h[f+"Ago"]=e;h[f+"sAgo"]=e;h[f+"After"]=d;h[f+"sAfter"]=d;h[f+"FromNow"]=d;h[f+"sFromNow"]=d;u.extend(h)}u.extend({duration:function(a){return rb(a).ra(this)}});
V=ab=s.addLocale("en",{plural:k,timeMarker:"at",ampm:"am,pm",months:"January,February,March,April,May,June,July,August,September,October,November,December",weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",units:"millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",numbers:"one,two,three,four,five,six,seven,eight,nine,ten",articles:"a,an,the",tokens:"the,st|nd|rd|th,of","short":"{Month} {d}, {yyyy}","long":"{Month} {d}, {yyyy} {h}:{mm}{tt}",full:"{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}",
past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",modifiers:[{name:"day",src:"yesterday",value:-1},{name:"day",src:"today",value:0},{name:"day",src:"tomorrow",value:1},{name:"sign",src:"ago|before",value:-1},{name:"sign",src:"from now|after|from|in|later",value:1},{name:"edge",src:"last day",value:-2},{name:"edge",src:"end",value:-1},{name:"edge",src:"first day|beginning",value:1},{name:"shift",src:"last",value:-1},{name:"shift",src:"the|this",value:0},{name:"shift",
src:"next",value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{month} {year}","{shift} {unit=5-7}","{0?} {date}{1}","{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}"],timeParse:["{0} {num}{1} {day} of {month} {year?}","{weekday?} {month} {date}{1?} {year?}","{date} {month} {year}","{date} {month}","{shift} {weekday}","{shift} week {weekday}","{weekday} {2?} {shift} week","{num} {unit=4-5} {sign} {day}","{0?} {date}{1} of {month}","{0?}{month?} {date?}{1?} of {shift} {unit=6-7}"]});
gb=jb.concat().reverse();fb=jb.concat();fb.splice(2,1);
I(s,k,n,jb,function(a,b,c){function d(g){g=g/h;var m=g%1,o=b.error||0.999;if(m&&v.abs(m%1)>o)g=O(g);return parseInt(g)}var e=b.$,f=nb(e),h=b.da(),i,j;b.ia="add"+f+"s";i=function(g,m){return d(this.getTime()-s.create(g,m).getTime())};j=function(g,m){return d(s.create(g,m).getTime()-this.getTime())};a[e+"sAgo"]=j;a[e+"sUntil"]=j;a[e+"sSince"]=i;a[e+"sFromNow"]=i;a[b.ia]=function(g,m){var o={};o[e]=g;return this.advance(o,m)};Fb(b,h);c<3&&["Last","This","Next"].forEach(function(g){a["is"+g+f]=function(){return this.is(g+
" "+e)}});if(c<4){a["beginningOf"+f]=function(){var g={};switch(e){case "year":g.year=W(this,"FullYear");break;case "month":g.month=W(this,"Month");break;case "day":g.day=W(this,"Date");break;case "week":g.weekday=0}return this.set(g,k)};a["endOf"+f]=function(){var g={hours:23,minutes:59,seconds:59,milliseconds:999};switch(e){case "year":g.month=11;g.day=31;break;case "month":g.day=this.daysInMonth();break;case "week":g.weekday=6}return this.set(g,k)}}});
V.addFormat("([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?",k,["year_sign","year","month","date"],n,k);V.addFormat("(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?",k,["date","month","year"],k);V.addFormat("{full_month}[-.](\\d{4,4})",n,["month","year"]);V.addFormat("\\/Date\\((\\d+(?:\\+\\d{4,4})?)\\)\\/",n,["timestamp"]);V.addFormat(pb(cb,V),n,bb);hb=V.ga.slice(0,7).reverse();V.ga=V.ga.slice(7).concat(hb);I(s,k,n,"short,long,full",function(a,b){a[b]=function(c){return Bb(this,b,n,c)}});
"\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07".split("").forEach(function(a,b){if(b>9)b=v.pow(10,b-9);db[a]=b});"\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19".split("").forEach(function(a,b){db[a]=b});eb=r("([\u671f\u9031\u5468])?([\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19]+)(?!\u6628)","g");
(function(){var a="today,yesterday,tomorrow,weekday,weekend,future,past".split(","),b=V.weekdays.slice(0,7),c=V.months.slice(0,12);I(s,k,n,a.concat(b).concat(c),function(d,e){d["is"+nb(e)]=function(f){return this.is(e,0,f)}})})();(function(){s.extend({utc:{create:function(){return X(arguments,0,k)},past:function(){return X(arguments,-1,k)},future:function(){return X(arguments,1,k)}}},n,n)})();
s.extend({RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}",RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}",ISO8601_DATE:"{yyyy}-{MM}-{dd}",ISO8601_DATETIME:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"},n,n);
