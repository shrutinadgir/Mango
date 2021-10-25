(self.webpackChunkdemoGitPages=self.webpackChunkdemoGitPages||[]).push([[6272],{6272:(t,i,e)=>{"use strict";e.r(i),e.d(i,{ion_menu:()=>l,ion_menu_button:()=>v,ion_menu_toggle:()=>f});var n=e(3150),o=e(7585),a=e(7807),s=e(960),r=e(2377),d=e(5554),h=e(1269);const l=class{constructor(t){(0,n.r)(this,t),this.ionWillOpen=(0,n.e)(this,"ionWillOpen",7),this.ionWillClose=(0,n.e)(this,"ionWillClose",7),this.ionDidOpen=(0,n.e)(this,"ionDidOpen",7),this.ionDidClose=(0,n.e)(this,"ionDidClose",7),this.ionMenuChange=(0,n.e)(this,"ionMenuChange",7),this.lastOnEnd=0,this.blocker=s.G.createBlocker({disableScroll:!0}),this.isAnimating=!1,this._isOpen=!1,this.isPaneVisible=!1,this.isEndSide=!1,this.disabled=!1,this.side="start",this.swipeGesture=!0,this.maxEdgeStart=50}typeChanged(t,i){const e=this.contentEl;e&&(void 0!==i&&e.classList.remove(`menu-content-${i}`),e.classList.add(`menu-content-${t}`),e.removeAttribute("style")),this.menuInnerEl&&this.menuInnerEl.removeAttribute("style"),this.animation=void 0}disabledChanged(){this.updateState(),this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})}sideChanged(){this.isEndSide=(0,r.m)(this.side)}swipeGestureChanged(){this.updateState()}async connectedCallback(){void 0===this.type&&(this.type=o.c.get("menuType","overlay"));const t=this.el.parentNode;void 0===this.contentId&&console.warn('[DEPRECATED][ion-menu] Using the [main] attribute is deprecated, please use the "contentId" property instead:\nBEFORE:\n  <ion-menu>...</ion-menu>\n  <div main>...</div>\n\nAFTER:\n  <ion-menu contentId="main-content"></ion-menu>\n  <div id="main-content">...</div>\n');const i=void 0!==this.contentId?document.getElementById(this.contentId):t&&t.querySelector&&t.querySelector("[main]");i&&i.tagName?(this.contentEl=i,i.classList.add("menu-content"),this.typeChanged(this.type,void 0),this.sideChanged(),d.m._register(this),this.gesture=(await Promise.resolve().then(e.bind(e,9461))).createGesture({el:document,gestureName:"menu-swipe",gesturePriority:30,threshold:10,blurOnStart:!0,canStart:t=>this.canStart(t),onWillStart:()=>this.onWillStart(),onStart:()=>this.onStart(),onMove:t=>this.onMove(t),onEnd:t=>this.onEnd(t)}),this.updateState()):console.error('Menu: must have a "content" element to listen for drag events on.')}async componentDidLoad(){this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen}),this.updateState()}disconnectedCallback(){this.blocker.destroy(),d.m._unregister(this),this.animation&&this.animation.destroy(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.animation=void 0,this.contentEl=this.backdropEl=this.menuInnerEl=void 0}onSplitPaneChanged(t){this.isPaneVisible=t.detail.isPane(this.el),this.updateState()}onBackdropClick(t){this._isOpen&&this.lastOnEnd<t.timeStamp-100&&t.composedPath&&!t.composedPath().includes(this.menuInnerEl)&&(t.preventDefault(),t.stopPropagation(),this.close())}isOpen(){return Promise.resolve(this._isOpen)}isActive(){return Promise.resolve(this._isActive())}open(t=!0){return this.setOpen(!0,t)}close(t=!0){return this.setOpen(!1,t)}toggle(t=!0){return this.setOpen(!this._isOpen,t)}setOpen(t,i=!0){return d.m._setOpen(this,t,i)}async _setOpen(t,i=!0){return!(!this._isActive()||this.isAnimating||t===this._isOpen||(this.beforeAnimation(t),await this.loadAnimation(),await this.startAnimation(t,i),this.afterAnimation(t),0))}async loadAnimation(){const t=this.menuInnerEl.offsetWidth;t===this.width&&void 0!==this.animation||(this.width=t,this.animation&&(this.animation.destroy(),this.animation=void 0),this.animation=await d.m._createAnimation(this.type,this),o.c.getBoolean("animated",!0)||this.animation.duration(0),this.animation.fill("both"))}async startAnimation(t,i){const e=!t,n=(0,o.b)(this),a="ios"===n?"cubic-bezier(0.32,0.72,0,1)":"cubic-bezier(0.0,0.0,0.2,1)",s="ios"===n?"cubic-bezier(1, 0, 0.68, 0.28)":"cubic-bezier(0.4, 0, 0.6, 1)",r=this.animation.direction(e?"reverse":"normal").easing(e?s:a).onFinish(()=>{"reverse"===r.getDirection()&&r.direction("normal")});i?await r.play():r.play({sync:!0})}_isActive(){return!this.disabled&&!this.isPaneVisible}canSwipe(){return this.swipeGesture&&!this.isAnimating&&this._isActive()}canStart(t){return!(document.querySelector("ion-modal.show-modal")||!this.canSwipe())&&(!!this._isOpen||!d.m._getOpenSync()&&p(window,t.currentX,this.isEndSide,this.maxEdgeStart))}onWillStart(){return this.beforeAnimation(!this._isOpen),this.loadAnimation()}onStart(){this.isAnimating&&this.animation?this.animation.progressStart(!0,this._isOpen?1:0):(0,r.l)(!1,"isAnimating has to be true")}onMove(t){if(!this.isAnimating||!this.animation)return void(0,r.l)(!1,"isAnimating has to be true");const i=c(t.deltaX,this._isOpen,this.isEndSide)/this.width;this.animation.progressStep(this._isOpen?1-i:i)}onEnd(t){if(!this.isAnimating||!this.animation)return void(0,r.l)(!1,"isAnimating has to be true");const i=this._isOpen,e=this.isEndSide,n=c(t.deltaX,i,e),o=this.width,s=n/o,d=t.velocityX,h=o/2,l=d>=0&&(d>.2||t.deltaX>h),p=d<=0&&(d<-.2||t.deltaX<-h),m=i?e?l:p:e?p:l;let u=!i&&m;i&&!m&&(u=!0),this.lastOnEnd=t.currentTime;let g=m?.001:-.001;g+=(0,a.g)([0,0],[.4,0],[.6,1],[1,1],(0,r.j)(0,s<0?.01:s,.9999))[0]||0;const b=this._isOpen?!m:m;this.animation.easing("cubic-bezier(0.4, 0.0, 0.6, 1)").onFinish(()=>this.afterAnimation(u),{oneTimeCallback:!0}).progressEnd(b?1:0,this._isOpen?1-g:g,300)}beforeAnimation(t){(0,r.l)(!this.isAnimating,"_before() should not be called while animating"),this.el.classList.add(m),this.backdropEl&&this.backdropEl.classList.add(u),this.blocker.block(),this.isAnimating=!0,t?this.ionWillOpen.emit():this.ionWillClose.emit()}afterAnimation(t){(0,r.l)(this.isAnimating,"_before() should be called while animating"),this._isOpen=t,this.isAnimating=!1,this._isOpen||this.blocker.unblock(),t?(this.contentEl&&this.contentEl.classList.add(g),this.ionDidOpen.emit()):(this.el.classList.remove(m),this.contentEl&&this.contentEl.classList.remove(g),this.backdropEl&&this.backdropEl.classList.remove(u),this.animation&&this.animation.stop(),this.ionDidClose.emit())}updateState(){const t=this._isActive();this.gesture&&this.gesture.enable(t&&this.swipeGesture),!t&&this._isOpen&&this.forceClosing(),this.disabled||d.m._setActiveMenu(this),(0,r.l)(!this.isAnimating,"can not be animating")}forceClosing(){(0,r.l)(this._isOpen,"menu cannot be closed"),this.isAnimating=!0,this.animation.direction("reverse").play({sync:!0}),this.afterAnimation(!1)}render(){const{isEndSide:t,type:i,disabled:e,isPaneVisible:a}=this,s=(0,o.b)(this);return(0,n.h)(n.H,{role:"navigation",class:{[s]:!0,[`menu-type-${i}`]:!0,"menu-enabled":!e,"menu-side-end":t,"menu-side-start":!t,"menu-pane-visible":a}},(0,n.h)("div",{class:"menu-inner",part:"container",ref:t=>this.menuInnerEl=t},(0,n.h)("slot",null)),(0,n.h)("ion-backdrop",{ref:t=>this.backdropEl=t,class:"menu-backdrop",tappable:!1,stopPropagation:!1,part:"backdrop"}))}get el(){return(0,n.i)(this)}static get watchers(){return{type:["typeChanged"],disabled:["disabledChanged"],side:["sideChanged"],swipeGesture:["swipeGestureChanged"]}}},c=(t,i,e)=>Math.max(0,i!==e?-t:t),p=(t,i,e,n)=>e?i>=t.innerWidth-n:i<=n,m="show-menu",u="show-backdrop",g="menu-content-open";l.style={ios:":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color, #fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,  0,  0);transform:translate3d(-9999px,  0,  0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{left:unset;right:unset;left:auto;right:0}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{-webkit-transform:translate3d(calc(-1 * -9999px),  0,  0);transform:translate3d(calc(-1 * -9999px),  0,  0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto;}ion-backdrop{display:none;opacity:0.01;z-index:-1}@media (max-width: 340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible){width:var(--width);min-width:var(--min-width);max-width:var(--max-width)}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none !important;transform:none !important;-webkit-box-shadow:none !important;box-shadow:none !important}:host(.menu-pane-visible) ion-backdrop{display:hidden !important;}:host(.menu-type-push){z-index:1000}:host(.menu-type-push) .show-backdrop{display:block}",md:":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color, #fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,  0,  0);transform:translate3d(-9999px,  0,  0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{left:unset;right:unset;left:auto;right:0}[dir=rtl] .menu-inner,:host-context([dir=rtl]) .menu-inner{-webkit-transform:translate3d(calc(-1 * -9999px),  0,  0);transform:translate3d(calc(-1 * -9999px),  0,  0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto;}ion-backdrop{display:none;opacity:0.01;z-index:-1}@media (max-width: 340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible){width:var(--width);min-width:var(--min-width);max-width:var(--max-width)}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none !important;transform:none !important;-webkit-box-shadow:none !important;box-shadow:none !important}:host(.menu-pane-visible) ion-backdrop{display:hidden !important;}:host(.menu-type-overlay) .menu-inner{-webkit-box-shadow:4px 0px 16px rgba(0, 0, 0, 0.18);box-shadow:4px 0px 16px rgba(0, 0, 0, 0.18)}"};const b=async t=>{const i=await d.m.get(t);return!(!i||!(await i.isActive()))},v=class{constructor(t){(0,n.r)(this,t),this.inheritedAttributes={},this.visible=!1,this.disabled=!1,this.autoHide=!0,this.type="button",this.onClick=async()=>d.m.toggle(this.menu)}componentWillLoad(){this.inheritedAttributes=(0,r.i)(this.el,["aria-label"])}componentDidLoad(){this.visibilityChanged()}async visibilityChanged(){this.visible=await b(this.menu)}render(){const{color:t,disabled:i,inheritedAttributes:e}=this,a=(0,o.b)(this),s=o.c.get("menuIcon","ios"===a?"menu-outline":"menu-sharp"),r=this.autoHide&&!this.visible,d={type:this.type},l=e["aria-label"]||"menu";return(0,n.h)(n.H,{onClick:this.onClick,"aria-disabled":i?"true":null,"aria-hidden":r?"true":null,class:(0,h.c)(t,{[a]:!0,button:!0,"menu-button-hidden":r,"menu-button-disabled":i,"in-toolbar":(0,h.h)("ion-toolbar",this.el),"in-toolbar-color":(0,h.h)("ion-toolbar[color]",this.el),"ion-activatable":!0,"ion-focusable":!0})},(0,n.h)("button",Object.assign({},d,{disabled:i,class:"button-native",part:"native","aria-label":l}),(0,n.h)("span",{class:"button-inner"},(0,n.h)("slot",null,(0,n.h)("ion-icon",{part:"icon",icon:s,mode:a,lazy:!1,"aria-hidden":"true"}))),"md"===a&&(0,n.h)("ion-ripple-effect",{type:"unbounded"})))}get el(){return(0,n.i)(this)}};v.style={ios:':host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.1;--border-radius:4px;--color:var(--ion-color-primary, #3880ff);--padding-start:5px;--padding-end:5px;height:32px;font-size:31px}:host(.ion-activated){opacity:0.4}@media (any-hover: hover){:host(:hover){opacity:0.6}}',md:':host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.12;--background-hover:currentColor;--background-hover-opacity:.04;--border-radius:50%;--color:initial;--padding-start:8px;--padding-end:8px;width:48px;height:48px;font-size:24px}:host(.ion-color.ion-focused)::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}'};const f=class{constructor(t){(0,n.r)(this,t),this.visible=!1,this.autoHide=!0,this.onClick=()=>d.m.toggle(this.menu)}connectedCallback(){this.visibilityChanged()}async visibilityChanged(){this.visible=await b(this.menu)}render(){const t=(0,o.b)(this),i=this.autoHide&&!this.visible;return(0,n.h)(n.H,{onClick:this.onClick,"aria-hidden":i?"true":null,class:{[t]:!0,"menu-toggle-hidden":i}},(0,n.h)("slot",null))}};f.style=":host(.menu-toggle-hidden){display:none}"}}]);