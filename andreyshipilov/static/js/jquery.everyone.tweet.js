(function(){/*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier
Copyright (c) 2011 - 2012 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Google Maps API v3 must be included *before* this code
*/
var h=!0,i=null,m=!1,n,p={}.hasOwnProperty,q=[].slice;
if(((n=this.google)!=i?n.maps:void 0)!=i){var t=function(b,c){var a,e,d,f,g=this;this.map=b;c==i&&(c={});for(a in c)p.call(c,a)&&(e=c[a],this[a]=e);this.e=new this.constructor.g(this.map);this.n();this.b={};f=["click","zoom_changed","maptypeid_changed"];e=0;for(d=f.length;e<d;e++)a=f[e],r.addListener(this.map,a,function(){return g.unspiderfy()})},r,u,v,w,y,z,A;z=t.prototype;z.VERSION="0.2.9";u=google.maps;r=u.event;y=u.MapTypeId;A=2*Math.PI;z.keepSpiderfied=m;z.markersWontHide=m;z.markersWontMove=
m;z.nearbyDistance=20;z.circleSpiralSwitchover=9;z.circleFootSeparation=23;z.circleStartAngle=A/12;z.spiralFootSeparation=26;z.spiralLengthStart=11;z.spiralLengthFactor=4;z.spiderfiedZIndex=1E3;z.usualLegZIndex=10;z.highlightedLegZIndex=20;z.legWeight=1.5;z.legColors={usual:{},highlighted:{}};w=z.legColors.usual;v=z.legColors.highlighted;w[y.HYBRID]=w[y.SATELLITE]="#fff";v[y.HYBRID]=v[y.SATELLITE]="#f00";w[y.TERRAIN]=w[y.ROADMAP]="#444";v[y.TERRAIN]=v[y.ROADMAP]="#f00";z.n=function(){this.a=[];this.j=
[]};z.addMarker=function(b){var c,a=this;if(b._oms!=i)return this;b._oms=h;c=[r.addListener(b,"click",function(){return a.F(b)})];this.markersWontHide||c.push(r.addListener(b,"visible_changed",function(){return a.o(b,m)}));this.markersWontMove||c.push(r.addListener(b,"position_changed",function(){return a.o(b,h)}));this.j.push(c);this.a.push(b);return this};z.o=function(b,c){if(b._omsData!=i&&(c||!b.getVisible())&&!(this.s!=i||this.t!=i))return this.H(c?b:i)};z.getMarkers=function(){return this.a.slice(0)};
z.removeMarker=function(b){var c,a,e,d,f;b._omsData!=i&&this.unspiderfy();c=this.m(this.a,b);if(0>c)return this;e=this.j.splice(c,1)[0];d=0;for(f=e.length;d<f;d++)a=e[d],r.removeListener(a);delete b._oms;this.a.splice(c,1);return this};z.clearMarkers=function(){var b,c,a,e,d,f,g,j;this.unspiderfy();j=this.a;b=e=0;for(f=j.length;e<f;b=++e){a=j[b];c=this.j[b];d=0;for(g=c.length;d<g;d++)b=c[d],r.removeListener(b);delete a._oms}this.n();return this};z.addListener=function(b,c){var a,e;((e=(a=this.b)[b])!=
i?e:a[b]=[]).push(c);return this};z.removeListener=function(b,c){var a;a=this.m(this.b[b],c);0>a||this.b[b].splice(a,1);return this};z.clearListeners=function(b){this.b[b]=[];return this};z.trigger=function(){var b,c,a,e,d,f;c=arguments[0];b=2<=arguments.length?q.call(arguments,1):[];c=(a=this.b[c])!=i?a:[];f=[];e=0;for(d=c.length;e<d;e++)a=c[e],f.push(a.apply(i,b));return f};z.u=function(b,c){var a,e,d,f,g;d=this.circleFootSeparation*(2+b)/A;e=A/b;g=[];for(a=f=0;0<=b?f<b:f>b;a=0<=b?++f:--f)a=this.circleStartAngle+
a*e,g.push(new u.Point(c.x+d*Math.cos(a),c.y+d*Math.sin(a)));return g};z.v=function(b,c){var a,e,d,f,g;d=this.spiralLengthStart;a=0;g=[];for(e=f=0;0<=b?f<b:f>b;e=0<=b?++f:--f)a+=this.spiralFootSeparation/d+5E-4*e,e=new u.Point(c.x+d*Math.cos(a),c.y+d*Math.sin(a)),d+=A*this.spiralLengthFactor/a,g.push(e);return g};z.F=function(b){var c,a,e,d,f,g,j,l,k;d=b._omsData!=i;(!d||!this.keepSpiderfied)&&this.unspiderfy();if(d||this.map.getStreetView().getVisible())return this.trigger("click",b);d=[];f=[];c=
this.nearbyDistance;g=c*c;e=this.c(b.position);k=this.a;j=0;for(l=k.length;j<l;j++)c=k[j],c.map!=i&&c.getVisible()&&(a=this.c(c.position),this.f(a,e)<g?d.push({A:c,p:a}):f.push(c));return 1===d.length?this.trigger("click",b):this.G(d,f)};z.willSpiderfy=function(b){var c,a,e,d,f,g,j,l;if(this.e.getProjection()==i)throw"Must wait for 'idle' event on map before calling willSpiderfy";a=this.nearbyDistance;e=a*a;a=this.c(b.position);g=this.a;d=0;for(f=g.length;d<f;d++)if(c=g[d],!(c===b||c.map==i||!c.getVisible()))if(c=
this.c((j=(l=c._omsData)!=i?l.l:void 0)!=i?j:c.position),this.f(c,a)<e)return h;return m};z.markersThatWillAndWontSpiderfy=function(){var b,c,a,e,d,f,g,j,l,k,s,x;if(this.e.getProjection()==i)throw"Must wait for 'idle' event on map before calling markersThatWillAndWontSpiderfy";f=this.nearbyDistance;b=f*f;e=this.a;f=[];k=0;for(a=e.length;k<a;k++)c=e[k],f.push({q:this.c((g=(j=c._omsData)!=i?j.l:void 0)!=i?g:c.position),d:m});k=this.a;c=g=0;for(j=k.length;g<j;c=++g)if(a=k[c],a.map!=i&&a.getVisible()&&
(e=f[c],!e.d)){x=this.a;a=l=0;for(s=x.length;l<s;a=++l)if(d=x[a],a!==c&&(d.map!=i&&d.getVisible())&&(d=f[a],(!(a<c)||d.d)&&this.f(e.q,d.q)<b)){e.d=d.d=h;break}}g=[];j=[];e=this.a;b=k=0;for(a=e.length;k<a;b=++k)c=e[b],(f[b].d?g:j).push(c);return[g,j]};z.z=function(b){var c=this;return{h:function(){return b._omsData.i.setOptions({strokeColor:c.legColors.highlighted[c.map.mapTypeId],zIndex:c.highlightedLegZIndex})},k:function(){return b._omsData.i.setOptions({strokeColor:c.legColors.usual[c.map.mapTypeId],
zIndex:c.usualLegZIndex})}}};z.G=function(b,c){var a,e,d,f,g,j;this.s=h;d=b.length;a=this.C(function(){var a,c,d;d=[];a=0;for(c=b.length;a<c;a++)j=b[a],d.push(j.p);return d}());d=d>=this.circleSpiralSwitchover?this.v(d,a).reverse():this.u(d,a);var l,k,s,x=this;s=[];l=0;for(k=d.length;l<k;l++)e=d[l],a=this.D(e),g=this.B(b,function(a){return x.f(a.p,e)}),g=g.A,f=new u.Polyline({map:this.map,path:[g.position,a],strokeColor:this.legColors.usual[this.map.mapTypeId],strokeWeight:this.legWeight,zIndex:this.usualLegZIndex}),
g._omsData={l:g.position,i:f},this.legColors.highlighted[this.map.mapTypeId]!==this.legColors.usual[this.map.mapTypeId]&&(f=this.z(g),g._omsData.w={h:r.addListener(g,"mouseover",f.h),k:r.addListener(g,"mouseout",f.k)}),g.setPosition(a),g.setZIndex(Math.round(this.spiderfiedZIndex+e.y)),s.push(g);delete this.s;this.r=h;return this.trigger("spiderfy",s,c)};z.unspiderfy=function(b){var c,a,e,d,f,g,j;b==i&&(b=i);if(this.r==i)return this;this.t=h;d=[];e=[];j=this.a;f=0;for(g=j.length;f<g;f++)a=j[f],a._omsData!=
i?(a._omsData.i.setMap(i),a!==b&&a.setPosition(a._omsData.l),a.setZIndex(i),c=a._omsData.w,c!=i&&(r.removeListener(c.h),r.removeListener(c.k)),delete a._omsData,d.push(a)):e.push(a);delete this.t;delete this.r;this.trigger("unspiderfy",d,e);return this};z.f=function(b,c){var a,e;a=b.x-c.x;e=b.y-c.y;return a*a+e*e};z.C=function(b){var c,a,e,d,f;d=a=e=0;for(f=b.length;d<f;d++)c=b[d],a+=c.x,e+=c.y;b=b.length;return new u.Point(a/b,e/b)};z.c=function(b){return this.e.getProjection().fromLatLngToDivPixel(b)};
z.D=function(b){return this.e.getProjection().fromDivPixelToLatLng(b)};z.B=function(b,c){var a,e,d,f,g,j;d=g=0;for(j=b.length;g<j;d=++g)if(f=b[d],f=c(f),!("undefined"!==typeof a&&a!==i)||f<e)e=f,a=d;return b.splice(a,1)[0]};z.m=function(b,c){var a,e,d,f;if(b.indexOf!=i)return b.indexOf(c);a=d=0;for(f=b.length;d<f;a=++d)if(e=b[a],e===c)return a;return-1};t.g=function(b){return this.setMap(b)};t.g.prototype=new u.OverlayView;t.g.prototype.draw=function(){};this.OverlappingMarkerSpiderfier=t};}).call(this);
/* Thu 18 Oct 2012 15:26:03 BST */


var Status = (function(){
	var bar, text;

	return {
		init: function(){
			bar = $('#status').css({'opacity': 0}).show();
			text = $('div', bar);
			return false;
		},
		show: function(t, c){
			c = typeof(c) == 'undefined' ? 'notice' : c;
			bar.addClass(c);
			text.html(t);
			bar.dequeue().animate({'opacity': 0.8}, 'fast').delay(1000).animate({'opacity': 0}, 'fast', function(){
				text.html('');
				bar.removeClass(c);
			});
		}
	};
})();

var counter = function(){
	var length = $('#text').val().length;
	length == 280 ? $('#counter').html('Please stop') : $('#counter').html(280 - length);
	length > 280 ? $('#counter').addClass('counter-error') : $('#counter').removeClass('counter-error') ;
	setTimeout(counter, 50);
};

$(function(){
	Status.init();
	var text = $('#text').focus(), submit = $('#submit');
	setTimeout(counter, 50);
	if ($.browser.msie) $('body').append($('<div id="fuck-that"></div>'));

	$('#form').bind('submit', function(){
		submit.val('Thinking');
		text.prop('disabled', true);

		$.getJSON("http://www.telize.com/geoip", function(json) {
		$.post('.', {'text': text.val(), 'country': json.country, 'lat': json.latitude, 'lng': json.longitude}, function(data){
			text.prop('disabled', false);
			submit.val('Tweet');

			if (data.status){
				text.val('');
				Status.show(data.text);
			} else {
				Status.show(data.text, 'error');
			}

			text.focus();
		}, 'json');
		});
		return false;
	});
});
