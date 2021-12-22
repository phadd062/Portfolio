function fr(e, t) {
	const n = Object.create(null),
		r = e.split(",");
	for (let i = 0; i < r.length; i++) n[r[i]] = !0;
	return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const zs =
		"itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	js = fr(zs);
function ji(e) {
	return !!e || e === "";
}
function cr(e) {
	if (H(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const r = e[n],
				i = de(r) ? Hs(r) : cr(r);
			if (i) for (const a in i) t[a] = i[a];
		}
		return t;
	} else {
		if (de(e)) return e;
		if (fe(e)) return e;
	}
}
const Ds = /;(?![^(]*\))/g,
	$s = /:(.+)/;
function Hs(e) {
	const t = {};
	return (
		e.split(Ds).forEach((n) => {
			if (n) {
				const r = n.split($s);
				r.length > 1 && (t[r[0].trim()] = r[1].trim());
			}
		}),
		t
	);
}
function ur(e) {
	let t = "";
	if (de(e)) t = e;
	else if (H(e))
		for (let n = 0; n < e.length; n++) {
			const r = ur(e[n]);
			r && (t += r + " ");
		}
	else if (fe(e)) for (const n in e) e[n] && (t += n + " ");
	return t.trim();
}
const Zd = (e) =>
		e == null
			? ""
			: H(e) || (fe(e) && (e.toString === Ui || !B(e.toString)))
			? JSON.stringify(e, Di, 2)
			: String(e),
	Di = (e, t) =>
		t && t.__v_isRef
			? Di(e, t.value)
			: Et(t)
			? {
					[`Map(${t.size})`]: [...t.entries()].reduce(
						(n, [r, i]) => ((n[`${r} =>`] = i), n),
						{}
					),
			  }
			: $i(t)
			? { [`Set(${t.size})`]: [...t.values()] }
			: fe(t) && !H(t) && !Bi(t)
			? String(t)
			: t,
	te = {},
	At = [],
	Ce = () => {},
	Us = () => !1,
	Bs = /^on[^a-z]/,
	yn = (e) => Bs.test(e),
	dr = (e) => e.startsWith("onUpdate:"),
	me = Object.assign,
	mr = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	},
	Ws = Object.prototype.hasOwnProperty,
	Y = (e, t) => Ws.call(e, t),
	H = Array.isArray,
	Et = (e) => xn(e) === "[object Map]",
	$i = (e) => xn(e) === "[object Set]",
	B = (e) => typeof e == "function",
	de = (e) => typeof e == "string",
	hr = (e) => typeof e == "symbol",
	fe = (e) => e !== null && typeof e == "object",
	Hi = (e) => fe(e) && B(e.then) && B(e.catch),
	Ui = Object.prototype.toString,
	xn = (e) => Ui.call(e),
	Ks = (e) => xn(e).slice(8, -1),
	Bi = (e) => xn(e) === "[object Object]",
	pr = (e) =>
		de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	wn = fr(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
	),
	_n = (e) => {
		const t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	qs = /-(\w)/g,
	Ne = _n((e) => e.replace(qs, (t, n) => (n ? n.toUpperCase() : ""))),
	Ys = /\B([A-Z])/g,
	kt = _n((e) => e.replace(Ys, "-$1").toLowerCase()),
	An = _n((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	gr = _n((e) => (e ? `on${An(e)}` : "")),
	Kt = (e, t) => !Object.is(e, t),
	vr = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t);
	},
	En = (e, t, n) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
	},
	Vs = (e) => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let Wi;
const Xs = () =>
	Wi ||
	(Wi =
		typeof globalThis != "undefined"
			? globalThis
			: typeof self != "undefined"
			? self
			: typeof window != "undefined"
			? window
			: typeof global != "undefined"
			? global
			: {});
let at;
const kn = [];
class Gs {
	constructor(t = !1) {
		(this.active = !0),
			(this.effects = []),
			(this.cleanups = []),
			!t &&
				at &&
				((this.parent = at),
				(this.index = (at.scopes || (at.scopes = [])).push(this) - 1));
	}
	run(t) {
		if (this.active)
			try {
				return this.on(), t();
			} finally {
				this.off();
			}
	}
	on() {
		this.active && (kn.push(this), (at = this));
	}
	off() {
		this.active && (kn.pop(), (at = kn[kn.length - 1]));
	}
	stop(t) {
		if (this.active) {
			if (
				(this.effects.forEach((n) => n.stop()),
				this.cleanups.forEach((n) => n()),
				this.scopes && this.scopes.forEach((n) => n.stop(!0)),
				this.parent && !t)
			) {
				const n = this.parent.scopes.pop();
				n &&
					n !== this &&
					((this.parent.scopes[this.index] = n), (n.index = this.index));
			}
			this.active = !1;
		}
	}
}
function Qs(e, t) {
	(t = t || at), t && t.active && t.effects.push(e);
}
const br = (e) => {
		const t = new Set(e);
		return (t.w = 0), (t.n = 0), t;
	},
	Ki = (e) => (e.w & Ve) > 0,
	qi = (e) => (e.n & Ve) > 0,
	Js = ({ deps: e }) => {
		if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ve;
	},
	Zs = (e) => {
		const { deps: t } = e;
		if (t.length) {
			let n = 0;
			for (let r = 0; r < t.length; r++) {
				const i = t[r];
				Ki(i) && !qi(i) ? i.delete(e) : (t[n++] = i),
					(i.w &= ~Ve),
					(i.n &= ~Ve);
			}
			t.length = n;
		}
	},
	yr = new WeakMap();
let qt = 0,
	Ve = 1;
const xr = 30,
	Yt = [];
let ot;
const st = Symbol(""),
	wr = Symbol("");
class _r {
	constructor(t, n = null, r) {
		(this.fn = t),
			(this.scheduler = n),
			(this.active = !0),
			(this.deps = []),
			Qs(this, r);
	}
	run() {
		if (!this.active) return this.fn();
		if (!Yt.includes(this))
			try {
				return (
					Yt.push((ot = this)),
					el(),
					(Ve = 1 << ++qt),
					qt <= xr ? Js(this) : Yi(this),
					this.fn()
				);
			} finally {
				qt <= xr && Zs(this), (Ve = 1 << --qt), lt(), Yt.pop();
				const t = Yt.length;
				ot = t > 0 ? Yt[t - 1] : void 0;
			}
	}
	stop() {
		this.active && (Yi(this), this.onStop && this.onStop(), (this.active = !1));
	}
}
function Yi(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
let Ct = !0;
const Ar = [];
function Ot() {
	Ar.push(Ct), (Ct = !1);
}
function el() {
	Ar.push(Ct), (Ct = !0);
}
function lt() {
	const e = Ar.pop();
	Ct = e === void 0 ? !0 : e;
}
function ye(e, t, n) {
	if (!Vi()) return;
	let r = yr.get(e);
	r || yr.set(e, (r = new Map()));
	let i = r.get(n);
	i || r.set(n, (i = br())), Xi(i);
}
function Vi() {
	return Ct && ot !== void 0;
}
function Xi(e, t) {
	let n = !1;
	qt <= xr ? qi(e) || ((e.n |= Ve), (n = !Ki(e))) : (n = !e.has(ot)),
		n && (e.add(ot), ot.deps.push(e));
}
function $e(e, t, n, r, i, a) {
	const o = yr.get(e);
	if (!o) return;
	let s = [];
	if (t === "clear") s = [...o.values()];
	else if (n === "length" && H(e))
		o.forEach((l, c) => {
			(c === "length" || c >= r) && s.push(l);
		});
	else
		switch ((n !== void 0 && s.push(o.get(n)), t)) {
			case "add":
				H(e)
					? pr(n) && s.push(o.get("length"))
					: (s.push(o.get(st)), Et(e) && s.push(o.get(wr)));
				break;
			case "delete":
				H(e) || (s.push(o.get(st)), Et(e) && s.push(o.get(wr)));
				break;
			case "set":
				Et(e) && s.push(o.get(st));
				break;
		}
	if (s.length === 1) s[0] && Er(s[0]);
	else {
		const l = [];
		for (const c of s) c && l.push(...c);
		Er(br(l));
	}
}
function Er(e, t) {
	for (const n of H(e) ? e : [...e])
		(n !== ot || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const tl = fr("__proto__,__v_isRef,__isVue"),
	Gi = new Set(
		Object.getOwnPropertyNames(Symbol)
			.map((e) => Symbol[e])
			.filter(hr)
	),
	nl = kr(),
	rl = kr(!1, !0),
	il = kr(!0),
	Qi = al();
function al() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...n) {
				const r = V(this);
				for (let a = 0, o = this.length; a < o; a++) ye(r, "get", a + "");
				const i = r[t](...n);
				return i === -1 || i === !1 ? r[t](...n.map(V)) : i;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...n) {
				Ot();
				const r = V(this)[t].apply(this, n);
				return lt(), r;
			};
		}),
		e
	);
}
function kr(e = !1, t = !1) {
	return function (r, i, a) {
		if (i === "__v_isReactive") return !e;
		if (i === "__v_isReadonly") return e;
		if (i === "__v_raw" && a === (e ? (t ? wl : oa) : t ? aa : ia).get(r))
			return r;
		const o = H(r);
		if (!e && o && Y(Qi, i)) return Reflect.get(Qi, i, a);
		const s = Reflect.get(r, i, a);
		return (hr(i) ? Gi.has(i) : tl(i)) || (e || ye(r, "get", i), t)
			? s
			: he(s)
			? !o || !pr(i)
				? s.value
				: s
			: fe(s)
			? e
				? sa(s)
				: Vt(s)
			: s;
	};
}
const ol = Ji(),
	sl = Ji(!0);
function Ji(e = !1) {
	return function (n, r, i, a) {
		let o = n[r];
		if (!e && !Sr(i) && ((i = V(i)), (o = V(o)), !H(n) && he(o) && !he(i)))
			return (o.value = i), !0;
		const s = H(n) && pr(r) ? Number(r) < n.length : Y(n, r),
			l = Reflect.set(n, r, i, a);
		return (
			n === V(a) && (s ? Kt(i, o) && $e(n, "set", r, i) : $e(n, "add", r, i)), l
		);
	};
}
function ll(e, t) {
	const n = Y(e, t);
	e[t];
	const r = Reflect.deleteProperty(e, t);
	return r && n && $e(e, "delete", t, void 0), r;
}
function fl(e, t) {
	const n = Reflect.has(e, t);
	return (!hr(t) || !Gi.has(t)) && ye(e, "has", t), n;
}
function cl(e) {
	return ye(e, "iterate", H(e) ? "length" : st), Reflect.ownKeys(e);
}
const Zi = { get: nl, set: ol, deleteProperty: ll, has: fl, ownKeys: cl },
	ul = {
		get: il,
		set(e, t) {
			return !0;
		},
		deleteProperty(e, t) {
			return !0;
		},
	},
	dl = me({}, Zi, { get: rl, set: sl }),
	Cr = (e) => e,
	Cn = (e) => Reflect.getPrototypeOf(e);
function On(e, t, n = !1, r = !1) {
	e = e.__v_raw;
	const i = V(e),
		a = V(t);
	t !== a && !n && ye(i, "get", t), !n && ye(i, "get", a);
	const { has: o } = Cn(i),
		s = r ? Cr : n ? Rr : Xt;
	if (o.call(i, t)) return s(e.get(t));
	if (o.call(i, a)) return s(e.get(a));
	e !== i && e.get(t);
}
function Pn(e, t = !1) {
	const n = this.__v_raw,
		r = V(n),
		i = V(e);
	return (
		e !== i && !t && ye(r, "has", e),
		!t && ye(r, "has", i),
		e === i ? n.has(e) : n.has(e) || n.has(i)
	);
}
function Sn(e, t = !1) {
	return (
		(e = e.__v_raw), !t && ye(V(e), "iterate", st), Reflect.get(e, "size", e)
	);
}
function ea(e) {
	e = V(e);
	const t = V(this);
	return Cn(t).has.call(t, e) || (t.add(e), $e(t, "add", e, e)), this;
}
function ta(e, t) {
	t = V(t);
	const n = V(this),
		{ has: r, get: i } = Cn(n);
	let a = r.call(n, e);
	a || ((e = V(e)), (a = r.call(n, e)));
	const o = i.call(n, e);
	return (
		n.set(e, t), a ? Kt(t, o) && $e(n, "set", e, t) : $e(n, "add", e, t), this
	);
}
function na(e) {
	const t = V(this),
		{ has: n, get: r } = Cn(t);
	let i = n.call(t, e);
	i || ((e = V(e)), (i = n.call(t, e))), r && r.call(t, e);
	const a = t.delete(e);
	return i && $e(t, "delete", e, void 0), a;
}
function ra() {
	const e = V(this),
		t = e.size !== 0,
		n = e.clear();
	return t && $e(e, "clear", void 0, void 0), n;
}
function Rn(e, t) {
	return function (r, i) {
		const a = this,
			o = a.__v_raw,
			s = V(o),
			l = t ? Cr : e ? Rr : Xt;
		return (
			!e && ye(s, "iterate", st), o.forEach((c, f) => r.call(i, l(c), l(f), a))
		);
	};
}
function In(e, t, n) {
	return function (...r) {
		const i = this.__v_raw,
			a = V(i),
			o = Et(a),
			s = e === "entries" || (e === Symbol.iterator && o),
			l = e === "keys" && o,
			c = i[e](...r),
			f = n ? Cr : t ? Rr : Xt;
		return (
			!t && ye(a, "iterate", l ? wr : st),
			{
				next() {
					const { value: d, done: h } = c.next();
					return h
						? { value: d, done: h }
						: { value: s ? [f(d[0]), f(d[1])] : f(d), done: h };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function Xe(e) {
	return function (...t) {
		return e === "delete" ? !1 : this;
	};
}
function ml() {
	const e = {
			get(a) {
				return On(this, a);
			},
			get size() {
				return Sn(this);
			},
			has: Pn,
			add: ea,
			set: ta,
			delete: na,
			clear: ra,
			forEach: Rn(!1, !1),
		},
		t = {
			get(a) {
				return On(this, a, !1, !0);
			},
			get size() {
				return Sn(this);
			},
			has: Pn,
			add: ea,
			set: ta,
			delete: na,
			clear: ra,
			forEach: Rn(!1, !0),
		},
		n = {
			get(a) {
				return On(this, a, !0);
			},
			get size() {
				return Sn(this, !0);
			},
			has(a) {
				return Pn.call(this, a, !0);
			},
			add: Xe("add"),
			set: Xe("set"),
			delete: Xe("delete"),
			clear: Xe("clear"),
			forEach: Rn(!0, !1),
		},
		r = {
			get(a) {
				return On(this, a, !0, !0);
			},
			get size() {
				return Sn(this, !0);
			},
			has(a) {
				return Pn.call(this, a, !0);
			},
			add: Xe("add"),
			set: Xe("set"),
			delete: Xe("delete"),
			clear: Xe("clear"),
			forEach: Rn(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((a) => {
			(e[a] = In(a, !1, !1)),
				(n[a] = In(a, !0, !1)),
				(t[a] = In(a, !1, !0)),
				(r[a] = In(a, !0, !0));
		}),
		[e, n, t, r]
	);
}
const [hl, pl, gl, vl] = ml();
function Or(e, t) {
	const n = t ? (e ? vl : gl) : e ? pl : hl;
	return (r, i, a) =>
		i === "__v_isReactive"
			? !e
			: i === "__v_isReadonly"
			? e
			: i === "__v_raw"
			? r
			: Reflect.get(Y(n, i) && i in r ? n : r, i, a);
}
const bl = { get: Or(!1, !1) },
	yl = { get: Or(!1, !0) },
	xl = { get: Or(!0, !1) },
	ia = new WeakMap(),
	aa = new WeakMap(),
	oa = new WeakMap(),
	wl = new WeakMap();
function _l(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function Al(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : _l(Ks(e));
}
function Vt(e) {
	return e && e.__v_isReadonly ? e : Pr(e, !1, Zi, bl, ia);
}
function El(e) {
	return Pr(e, !1, dl, yl, aa);
}
function sa(e) {
	return Pr(e, !0, ul, xl, oa);
}
function Pr(e, t, n, r, i) {
	if (!fe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const a = i.get(e);
	if (a) return a;
	const o = Al(e);
	if (o === 0) return e;
	const s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
function Pt(e) {
	return Sr(e) ? Pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Sr(e) {
	return !!(e && e.__v_isReadonly);
}
function la(e) {
	return Pt(e) || Sr(e);
}
function V(e) {
	const t = e && e.__v_raw;
	return t ? V(t) : e;
}
function fa(e) {
	return En(e, "__v_skip", !0), e;
}
const Xt = (e) => (fe(e) ? Vt(e) : e),
	Rr = (e) => (fe(e) ? sa(e) : e);
function ca(e) {
	Vi() && ((e = V(e)), e.dep || (e.dep = br()), Xi(e.dep));
}
function ua(e, t) {
	(e = V(e)), e.dep && Er(e.dep);
}
function he(e) {
	return Boolean(e && e.__v_isRef === !0);
}
function kl(e) {
	return da(e, !1);
}
function Cl(e) {
	return da(e, !0);
}
function da(e, t) {
	return he(e) ? e : new Ol(e, t);
}
class Ol {
	constructor(t, n) {
		(this._shallow = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = n ? t : V(t)),
			(this._value = n ? t : Xt(t));
	}
	get value() {
		return ca(this), this._value;
	}
	set value(t) {
		(t = this._shallow ? t : V(t)),
			Kt(t, this._rawValue) &&
				((this._rawValue = t),
				(this._value = this._shallow ? t : Xt(t)),
				ua(this));
	}
}
function Gt(e) {
	return he(e) ? e.value : e;
}
const Pl = {
	get: (e, t, n) => Gt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		const i = e[t];
		return he(i) && !he(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r);
	},
};
function ma(e) {
	return Pt(e) ? e : new Proxy(e, Pl);
}
class Sl {
	constructor(t, n, r) {
		(this._setter = n),
			(this.dep = void 0),
			(this._dirty = !0),
			(this.__v_isRef = !0),
			(this.effect = new _r(t, () => {
				this._dirty || ((this._dirty = !0), ua(this));
			})),
			(this.__v_isReadonly = r);
	}
	get value() {
		const t = V(this);
		return (
			ca(t),
			t._dirty && ((t._dirty = !1), (t._value = t.effect.run())),
			t._value
		);
	}
	set value(t) {
		this._setter(t);
	}
}
function oe(e, t) {
	let n, r;
	const i = B(e);
	return (
		i ? ((n = e), (r = Ce)) : ((n = e.get), (r = e.set)), new Sl(n, r, i || !r)
	);
}
Promise.resolve();
function Rl(e, t, ...n) {
	const r = e.vnode.props || te;
	let i = n;
	const a = t.startsWith("update:"),
		o = a && t.slice(7);
	if (o && o in r) {
		const f = `${o === "modelValue" ? "model" : o}Modifiers`,
			{ number: d, trim: h } = r[f] || te;
		h ? (i = n.map((v) => v.trim())) : d && (i = n.map(Vs));
	}
	let s,
		l = r[(s = gr(t))] || r[(s = gr(Ne(t)))];
	!l && a && (l = r[(s = gr(kt(t)))]), l && Se(l, e, 6, i);
	const c = r[s + "Once"];
	if (c) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		(e.emitted[s] = !0), Se(c, e, 6, i);
	}
}
function ha(e, t, n = !1) {
	const r = t.emitsCache,
		i = r.get(e);
	if (i !== void 0) return i;
	const a = e.emits;
	let o = {},
		s = !1;
	if (!B(e)) {
		const l = (c) => {
			const f = ha(c, t, !0);
			f && ((s = !0), me(o, f));
		};
		!n && t.mixins.length && t.mixins.forEach(l),
			e.extends && l(e.extends),
			e.mixins && e.mixins.forEach(l);
	}
	return !a && !s
		? (r.set(e, null), null)
		: (H(a) ? a.forEach((l) => (o[l] = null)) : me(o, a), r.set(e, o), o);
}
function Ir(e, t) {
	return !e || !yn(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, "")),
		  Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, kt(t)) || Y(e, t));
}
let Oe = null,
	pa = null;
function Tn(e) {
	const t = Oe;
	return (Oe = e), (pa = (e && e.type.__scopeId) || null), t;
}
function Il(e, t = Oe, n) {
	if (!t || e._n) return e;
	const r = (...i) => {
		r._d && za(-1);
		const a = Tn(t),
			o = e(...i);
		return Tn(a), r._d && za(1), o;
	};
	return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Tr(e) {
	const {
		type: t,
		vnode: n,
		proxy: r,
		withProxy: i,
		props: a,
		propsOptions: [o],
		slots: s,
		attrs: l,
		emit: c,
		render: f,
		renderCache: d,
		data: h,
		setupState: v,
		ctx: k,
		inheritAttrs: M,
	} = e;
	let P, g;
	const _ = Tn(e);
	try {
		if (n.shapeFlag & 4) {
			const D = i || r;
			(P = Me(f.call(D, D, d, a, v, h, k))), (g = l);
		} else {
			const D = t;
			(P = Me(
				D.length > 1 ? D(a, { attrs: l, slots: s, emit: c }) : D(a, null)
			)),
				(g = t.props ? l : Tl(l));
		}
	} catch (D) {
		(Jt.length = 0), Bn(D, e, 1), (P = ve(St));
	}
	let N = P;
	if (g && M !== !1) {
		const D = Object.keys(g),
			{ shapeFlag: K } = N;
		D.length &&
			K & (1 | 6) &&
			(o && D.some(dr) && (g = Nl(g, o)), (N = en(N, g)));
	}
	return (
		n.dirs && (N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs),
		n.transition && (N.transition = n.transition),
		(P = N),
		Tn(_),
		P
	);
}
const Tl = (e) => {
		let t;
		for (const n in e)
			(n === "class" || n === "style" || yn(n)) && ((t || (t = {}))[n] = e[n]);
		return t;
	},
	Nl = (e, t) => {
		const n = {};
		for (const r in e) (!dr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
		return n;
	};
function Ml(e, t, n) {
	const { props: r, children: i, component: a } = e,
		{ props: o, children: s, patchFlag: l } = t,
		c = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && l >= 0) {
		if (l & 1024) return !0;
		if (l & 16) return r ? ga(r, o, c) : !!o;
		if (l & 8) {
			const f = t.dynamicProps;
			for (let d = 0; d < f.length; d++) {
				const h = f[d];
				if (o[h] !== r[h] && !Ir(c, h)) return !0;
			}
		}
	} else
		return (i || s) && (!s || !s.$stable)
			? !0
			: r === o
			? !1
			: r
			? o
				? ga(r, o, c)
				: !0
			: !!o;
	return !1;
}
function ga(e, t, n) {
	const r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		const a = r[i];
		if (t[a] !== e[a] && !Ir(n, a)) return !0;
	}
	return !1;
}
function Fl({ vnode: e, parent: t }, n) {
	for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ll = (e) => e.__isSuspense;
function zl(e, t) {
	t && t.pendingBranch
		? H(e)
			? t.effects.push(...e)
			: t.effects.push(e)
		: Lf(e);
}
function Nn(e, t) {
	if (ue) {
		let n = ue.provides;
		const r = ue.parent && ue.parent.provides;
		r === n && (n = ue.provides = Object.create(r)), (n[e] = t);
	}
}
function Ge(e, t, n = !1) {
	const r = ue || Oe;
	if (r) {
		const i =
			r.parent == null
				? r.vnode.appContext && r.vnode.appContext.provides
				: r.parent.provides;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && B(t) ? t.call(r.proxy) : t;
	}
}
function Qt(e) {
	return B(e) ? { setup: e, name: e.name } : e;
}
const Nr = (e) => !!e.type.__asyncLoader,
	va = (e) => e.type.__isKeepAlive;
function jl(e, t) {
	ba(e, "a", t);
}
function Dl(e, t) {
	ba(e, "da", t);
}
function ba(e, t, n = ue) {
	const r =
		e.__wdc ||
		(e.__wdc = () => {
			let i = n;
			for (; i; ) {
				if (i.isDeactivated) return;
				i = i.parent;
			}
			return e();
		});
	if ((Mn(t, r, n), n)) {
		let i = n.parent;
		for (; i && i.parent; )
			va(i.parent.vnode) && $l(r, t, n, i), (i = i.parent);
	}
}
function $l(e, t, n, r) {
	const i = Mn(t, e, r, !0);
	ya(() => {
		mr(r[t], i);
	}, n);
}
function Mn(e, t, n = ue, r = !1) {
	if (n) {
		const i = n[e] || (n[e] = []),
			a =
				t.__weh ||
				(t.__weh = (...o) => {
					if (n.isUnmounted) return;
					Ot(), Rt(n);
					const s = Se(t, n, e, o);
					return mt(), lt(), s;
				});
		return r ? i.unshift(a) : i.push(a), a;
	}
}
const He =
		(e) =>
		(t, n = ue) =>
			(!Un || e === "sp") && Mn(e, t, n),
	Hl = He("bm"),
	Ul = He("m"),
	Bl = He("bu"),
	Wl = He("u"),
	Kl = He("bum"),
	ya = He("um"),
	ql = He("sp"),
	Yl = He("rtg"),
	Vl = He("rtc");
function Xl(e, t = ue) {
	Mn("ec", e, t);
}
let Mr = !0;
function Gl(e) {
	const t = _a(e),
		n = e.proxy,
		r = e.ctx;
	(Mr = !1), t.beforeCreate && xa(t.beforeCreate, e, "bc");
	const {
		data: i,
		computed: a,
		methods: o,
		watch: s,
		provide: l,
		inject: c,
		created: f,
		beforeMount: d,
		mounted: h,
		beforeUpdate: v,
		updated: k,
		activated: M,
		deactivated: P,
		beforeDestroy: g,
		beforeUnmount: _,
		destroyed: N,
		unmounted: D,
		render: K,
		renderTracked: ne,
		renderTriggered: se,
		errorCaptured: _e,
		serverPrefetch: ce,
		expose: Ye,
		inheritAttrs: ze,
		components: je,
		directives: bt,
		filters: yt,
	} = t;
	if ((c && Ql(c, r, null, e.appContext.config.unwrapInjectedRef), o))
		for (const Z in o) {
			const X = o[Z];
			B(X) && (r[Z] = X.bind(n));
		}
	if (i) {
		const Z = i.call(n, n);
		fe(Z) && (e.data = Vt(Z));
	}
	if (((Mr = !0), a))
		for (const Z in a) {
			const X = a[Z],
				Ae = B(X) ? X.bind(n, n) : B(X.get) ? X.get.bind(n, n) : Ce,
				wt = !B(X) && B(X.set) ? X.set.bind(n) : Ce,
				De = oe({ get: Ae, set: wt });
			Object.defineProperty(r, Z, {
				enumerable: !0,
				configurable: !0,
				get: () => De.value,
				set: (Ie) => (De.value = Ie),
			});
		}
	if (s) for (const Z in s) wa(s[Z], r, n, Z);
	if (l) {
		const Z = B(l) ? l.call(n) : l;
		Reflect.ownKeys(Z).forEach((X) => {
			Nn(X, Z[X]);
		});
	}
	f && xa(f, e, "c");
	function le(Z, X) {
		H(X) ? X.forEach((Ae) => Z(Ae.bind(n))) : X && Z(X.bind(n));
	}
	if (
		(le(Hl, d),
		le(Ul, h),
		le(Bl, v),
		le(Wl, k),
		le(jl, M),
		le(Dl, P),
		le(Xl, _e),
		le(Vl, ne),
		le(Yl, se),
		le(Kl, _),
		le(ya, D),
		le(ql, ce),
		H(Ye))
	)
		if (Ye.length) {
			const Z = e.exposed || (e.exposed = {});
			Ye.forEach((X) => {
				Object.defineProperty(Z, X, {
					get: () => n[X],
					set: (Ae) => (n[X] = Ae),
				});
			});
		} else e.exposed || (e.exposed = {});
	K && e.render === Ce && (e.render = K),
		ze != null && (e.inheritAttrs = ze),
		je && (e.components = je),
		bt && (e.directives = bt);
}
function Ql(e, t, n = Ce, r = !1) {
	H(e) && (e = Fr(e));
	for (const i in e) {
		const a = e[i];
		let o;
		fe(a)
			? "default" in a
				? (o = Ge(a.from || i, a.default, !0))
				: (o = Ge(a.from || i))
			: (o = Ge(a)),
			he(o) && r
				? Object.defineProperty(t, i, {
						enumerable: !0,
						configurable: !0,
						get: () => o.value,
						set: (s) => (o.value = s),
				  })
				: (t[i] = o);
	}
}
function xa(e, t, n) {
	Se(H(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function wa(e, t, n, r) {
	const i = r.includes(".") ? to(n, r) : () => n[r];
	if (de(e)) {
		const a = t[e];
		B(a) && on(i, a);
	} else if (B(e)) on(i, e.bind(n));
	else if (fe(e))
		if (H(e)) e.forEach((a) => wa(a, t, n, r));
		else {
			const a = B(e.handler) ? e.handler.bind(n) : t[e.handler];
			B(a) && on(i, a, e);
		}
}
function _a(e) {
	const t = e.type,
		{ mixins: n, extends: r } = t,
		{
			mixins: i,
			optionsCache: a,
			config: { optionMergeStrategies: o },
		} = e.appContext,
		s = a.get(t);
	let l;
	return (
		s
			? (l = s)
			: !i.length && !n && !r
			? (l = t)
			: ((l = {}), i.length && i.forEach((c) => Fn(l, c, o, !0)), Fn(l, t, o)),
		a.set(t, l),
		l
	);
}
function Fn(e, t, n, r = !1) {
	const { mixins: i, extends: a } = t;
	a && Fn(e, a, n, !0), i && i.forEach((o) => Fn(e, o, n, !0));
	for (const o in t)
		if (!(r && o === "expose")) {
			const s = Jl[o] || (n && n[o]);
			e[o] = s ? s(e[o], t[o]) : t[o];
		}
	return e;
}
const Jl = {
	data: Aa,
	props: ft,
	emits: ft,
	methods: ft,
	computed: ft,
	beforeCreate: pe,
	created: pe,
	beforeMount: pe,
	mounted: pe,
	beforeUpdate: pe,
	updated: pe,
	beforeDestroy: pe,
	beforeUnmount: pe,
	destroyed: pe,
	unmounted: pe,
	activated: pe,
	deactivated: pe,
	errorCaptured: pe,
	serverPrefetch: pe,
	components: ft,
	directives: ft,
	watch: ef,
	provide: Aa,
	inject: Zl,
};
function Aa(e, t) {
	return t
		? e
			? function () {
					return me(
						B(e) ? e.call(this, this) : e,
						B(t) ? t.call(this, this) : t
					);
			  }
			: t
		: e;
}
function Zl(e, t) {
	return ft(Fr(e), Fr(t));
}
function Fr(e) {
	if (H(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function pe(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function ft(e, t) {
	return e ? me(me(Object.create(null), e), t) : t;
}
function ef(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = me(Object.create(null), e);
	for (const r in t) n[r] = pe(e[r], t[r]);
	return n;
}
function tf(e, t, n, r = !1) {
	const i = {},
		a = {};
	En(a, Dn, 1), (e.propsDefaults = Object.create(null)), Ea(e, t, i, a);
	for (const o in e.propsOptions[0]) o in i || (i[o] = void 0);
	n ? (e.props = r ? i : El(i)) : e.type.props ? (e.props = i) : (e.props = a),
		(e.attrs = a);
}
function nf(e, t, n, r) {
	const {
			props: i,
			attrs: a,
			vnode: { patchFlag: o },
		} = e,
		s = V(i),
		[l] = e.propsOptions;
	let c = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			const f = e.vnode.dynamicProps;
			for (let d = 0; d < f.length; d++) {
				let h = f[d];
				const v = t[h];
				if (l)
					if (Y(a, h)) v !== a[h] && ((a[h] = v), (c = !0));
					else {
						const k = Ne(h);
						i[k] = Lr(l, s, k, v, e, !1);
					}
				else v !== a[h] && ((a[h] = v), (c = !0));
			}
		}
	} else {
		Ea(e, t, i, a) && (c = !0);
		let f;
		for (const d in s)
			(!t || (!Y(t, d) && ((f = kt(d)) === d || !Y(t, f)))) &&
				(l
					? n &&
					  (n[d] !== void 0 || n[f] !== void 0) &&
					  (i[d] = Lr(l, s, d, void 0, e, !0))
					: delete i[d]);
		if (a !== s) for (const d in a) (!t || !Y(t, d)) && (delete a[d], (c = !0));
	}
	c && $e(e, "set", "$attrs");
}
function Ea(e, t, n, r) {
	const [i, a] = e.propsOptions;
	let o = !1,
		s;
	if (t)
		for (let l in t) {
			if (wn(l)) continue;
			const c = t[l];
			let f;
			i && Y(i, (f = Ne(l)))
				? !a || !a.includes(f)
					? (n[f] = c)
					: ((s || (s = {}))[f] = c)
				: Ir(e.emitsOptions, l) ||
				  ((!(l in r) || c !== r[l]) && ((r[l] = c), (o = !0)));
		}
	if (a) {
		const l = V(n),
			c = s || te;
		for (let f = 0; f < a.length; f++) {
			const d = a[f];
			n[d] = Lr(i, l, d, c[d], e, !Y(c, d));
		}
	}
	return o;
}
function Lr(e, t, n, r, i, a) {
	const o = e[n];
	if (o != null) {
		const s = Y(o, "default");
		if (s && r === void 0) {
			const l = o.default;
			if (o.type !== Function && B(l)) {
				const { propsDefaults: c } = i;
				n in c ? (r = c[n]) : (Rt(i), (r = c[n] = l.call(null, t)), mt());
			} else r = l;
		}
		o[0] &&
			(a && !s ? (r = !1) : o[1] && (r === "" || r === kt(n)) && (r = !0));
	}
	return r;
}
function ka(e, t, n = !1) {
	const r = t.propsCache,
		i = r.get(e);
	if (i) return i;
	const a = e.props,
		o = {},
		s = [];
	let l = !1;
	if (!B(e)) {
		const f = (d) => {
			l = !0;
			const [h, v] = ka(d, t, !0);
			me(o, h), v && s.push(...v);
		};
		!n && t.mixins.length && t.mixins.forEach(f),
			e.extends && f(e.extends),
			e.mixins && e.mixins.forEach(f);
	}
	if (!a && !l) return r.set(e, At), At;
	if (H(a))
		for (let f = 0; f < a.length; f++) {
			const d = Ne(a[f]);
			Ca(d) && (o[d] = te);
		}
	else if (a)
		for (const f in a) {
			const d = Ne(f);
			if (Ca(d)) {
				const h = a[f],
					v = (o[d] = H(h) || B(h) ? { type: h } : h);
				if (v) {
					const k = Sa(Boolean, v.type),
						M = Sa(String, v.type);
					(v[0] = k > -1),
						(v[1] = M < 0 || k < M),
						(k > -1 || Y(v, "default")) && s.push(d);
				}
			}
		}
	const c = [o, s];
	return r.set(e, c), c;
}
function Ca(e) {
	return e[0] !== "$";
}
function Oa(e) {
	const t = e && e.toString().match(/^\s*function (\w+)/);
	return t ? t[1] : e === null ? "null" : "";
}
function Pa(e, t) {
	return Oa(e) === Oa(t);
}
function Sa(e, t) {
	return H(t) ? t.findIndex((n) => Pa(n, e)) : B(t) && Pa(t, e) ? 0 : -1;
}
const Ra = (e) => e[0] === "_" || e === "$stable",
	zr = (e) => (H(e) ? e.map(Me) : [Me(e)]),
	rf = (e, t, n) => {
		const r = Il((...i) => zr(t(...i)), n);
		return (r._c = !1), r;
	},
	Ia = (e, t, n) => {
		const r = e._ctx;
		for (const i in e) {
			if (Ra(i)) continue;
			const a = e[i];
			if (B(a)) t[i] = rf(i, a, r);
			else if (a != null) {
				const o = zr(a);
				t[i] = () => o;
			}
		}
	},
	Ta = (e, t) => {
		const n = zr(t);
		e.slots.default = () => n;
	},
	af = (e, t) => {
		if (e.vnode.shapeFlag & 32) {
			const n = t._;
			n ? ((e.slots = V(t)), En(t, "_", n)) : Ia(t, (e.slots = {}));
		} else (e.slots = {}), t && Ta(e, t);
		En(e.slots, Dn, 1);
	},
	of = (e, t, n) => {
		const { vnode: r, slots: i } = e;
		let a = !0,
			o = te;
		if (r.shapeFlag & 32) {
			const s = t._;
			s
				? n && s === 1
					? (a = !1)
					: (me(i, t), !n && s === 1 && delete i._)
				: ((a = !t.$stable), Ia(t, i)),
				(o = t);
		} else t && (Ta(e, t), (o = { default: 1 }));
		if (a) for (const s in i) !Ra(s) && !(s in o) && delete i[s];
	};
function ct(e, t, n, r) {
	const i = e.dirs,
		a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		const s = i[o];
		a && (s.oldValue = a[o].value);
		let l = s.dir[r];
		l && (Ot(), Se(l, n, 8, [e.el, s, e, t]), lt());
	}
}
function Na() {
	return {
		app: null,
		config: {
			isNativeTag: Us,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let sf = 0;
function lf(e, t) {
	return function (r, i = null) {
		i != null && !fe(i) && (i = null);
		const a = Na(),
			o = new Set();
		let s = !1;
		const l = (a.app = {
			_uid: sf++,
			_component: r,
			_props: i,
			_container: null,
			_context: a,
			_instance: null,
			version: jf,
			get config() {
				return a.config;
			},
			set config(c) {},
			use(c, ...f) {
				return (
					o.has(c) ||
						(c && B(c.install)
							? (o.add(c), c.install(l, ...f))
							: B(c) && (o.add(c), c(l, ...f))),
					l
				);
			},
			mixin(c) {
				return a.mixins.includes(c) || a.mixins.push(c), l;
			},
			component(c, f) {
				return f ? ((a.components[c] = f), l) : a.components[c];
			},
			directive(c, f) {
				return f ? ((a.directives[c] = f), l) : a.directives[c];
			},
			mount(c, f, d) {
				if (!s) {
					const h = ve(r, i);
					return (
						(h.appContext = a),
						f && t ? t(h, c) : e(h, c, d),
						(s = !0),
						(l._container = c),
						(c.__vue_app__ = l),
						Ur(h.component) || h.component.proxy
					);
				}
			},
			unmount() {
				s && (e(null, l._container), delete l._container.__vue_app__);
			},
			provide(c, f) {
				return (a.provides[c] = f), l;
			},
		});
		return l;
	};
}
function jr(e, t, n, r, i = !1) {
	if (H(e)) {
		e.forEach((h, v) => jr(h, t && (H(t) ? t[v] : t), n, r, i));
		return;
	}
	if (Nr(r) && !i) return;
	const a = r.shapeFlag & 4 ? Ur(r.component) || r.component.proxy : r.el,
		o = i ? null : a,
		{ i: s, r: l } = e,
		c = t && t.r,
		f = s.refs === te ? (s.refs = {}) : s.refs,
		d = s.setupState;
	if (
		(c != null &&
			c !== l &&
			(de(c)
				? ((f[c] = null), Y(d, c) && (d[c] = null))
				: he(c) && (c.value = null)),
		B(l))
	)
		Je(l, s, 12, [o, f]);
	else {
		const h = de(l),
			v = he(l);
		if (h || v) {
			const k = () => {
				if (e.f) {
					const M = h ? f[l] : l.value;
					i
						? H(M) && mr(M, a)
						: H(M)
						? M.includes(a) || M.push(a)
						: h
						? (f[l] = [a])
						: ((l.value = [a]), e.k && (f[e.k] = l.value));
				} else
					h
						? ((f[l] = o), Y(d, l) && (d[l] = o))
						: he(l) && ((l.value = o), e.k && (f[e.k] = o));
			};
			o ? ((k.id = -1), ge(k, n)) : k();
		}
	}
}
const ge = zl;
function ff(e) {
	return cf(e);
}
function cf(e, t) {
	const n = Xs();
	n.__VUE__ = !0;
	const {
			insert: r,
			remove: i,
			patchProp: a,
			createElement: o,
			createText: s,
			createComment: l,
			setText: c,
			setElementText: f,
			parentNode: d,
			nextSibling: h,
			setScopeId: v = Ce,
			cloneNode: k,
			insertStaticContent: M,
		} = e,
		P = (
			u,
			m,
			p,
			x = null,
			y = null,
			E = null,
			S = !1,
			A = null,
			C = !!m.dynamicChildren
		) => {
			if (u === m) return;
			u && !Zt(u, m) && ((x = F(u)), Ee(u, y, E, !0), (u = null)),
				m.patchFlag === -2 && ((C = !1), (m.dynamicChildren = null));
			const { type: w, ref: L, shapeFlag: I } = m;
			switch (w) {
				case Dr:
					g(u, m, p, x);
					break;
				case St:
					_(u, m, p, x);
					break;
				case Ln:
					u == null && N(m, p, x, S);
					break;
				case Pe:
					bt(u, m, p, x, y, E, S, A, C);
					break;
				default:
					I & 1
						? ne(u, m, p, x, y, E, S, A, C)
						: I & 6
						? yt(u, m, p, x, y, E, S, A, C)
						: (I & 64 || I & 128) && w.process(u, m, p, x, y, E, S, A, C, ee);
			}
			L != null && y && jr(L, u && u.ref, E, m || u, !m);
		},
		g = (u, m, p, x) => {
			if (u == null) r((m.el = s(m.children)), p, x);
			else {
				const y = (m.el = u.el);
				m.children !== u.children && c(y, m.children);
			}
		},
		_ = (u, m, p, x) => {
			u == null ? r((m.el = l(m.children || "")), p, x) : (m.el = u.el);
		},
		N = (u, m, p, x) => {
			[u.el, u.anchor] = M(u.children, m, p, x);
		},
		D = ({ el: u, anchor: m }, p, x) => {
			let y;
			for (; u && u !== m; ) (y = h(u)), r(u, p, x), (u = y);
			r(m, p, x);
		},
		K = ({ el: u, anchor: m }) => {
			let p;
			for (; u && u !== m; ) (p = h(u)), i(u), (u = p);
			i(m);
		},
		ne = (u, m, p, x, y, E, S, A, C) => {
			(S = S || m.type === "svg"),
				u == null ? se(m, p, x, y, E, S, A, C) : Ye(u, m, y, E, S, A, C);
		},
		se = (u, m, p, x, y, E, S, A) => {
			let C, w;
			const {
				type: L,
				props: I,
				shapeFlag: z,
				transition: $,
				patchFlag: q,
				dirs: ae,
			} = u;
			if (u.el && k !== void 0 && q === -1) C = u.el = k(u.el);
			else {
				if (
					((C = u.el = o(u.type, E, I && I.is, I)),
					z & 8
						? f(C, u.children)
						: z & 16 &&
						  ce(u.children, C, null, x, y, E && L !== "foreignObject", S, A),
					ae && ct(u, null, x, "created"),
					I)
				) {
					for (const re in I)
						re !== "value" &&
							!wn(re) &&
							a(C, re, null, I[re], E, u.children, x, y, O);
					"value" in I && a(C, "value", null, I.value),
						(w = I.onVnodeBeforeMount) && Fe(w, x, u);
				}
				_e(C, u, u.scopeId, S, x);
			}
			ae && ct(u, null, x, "beforeMount");
			const Q = (!y || (y && !y.pendingBranch)) && $ && !$.persisted;
			Q && $.beforeEnter(C),
				r(C, m, p),
				((w = I && I.onVnodeMounted) || Q || ae) &&
					ge(() => {
						w && Fe(w, x, u), Q && $.enter(C), ae && ct(u, null, x, "mounted");
					}, y);
		},
		_e = (u, m, p, x, y) => {
			if ((p && v(u, p), x)) for (let E = 0; E < x.length; E++) v(u, x[E]);
			if (y) {
				let E = y.subTree;
				if (m === E) {
					const S = y.vnode;
					_e(u, S, S.scopeId, S.slotScopeIds, y.parent);
				}
			}
		},
		ce = (u, m, p, x, y, E, S, A, C = 0) => {
			for (let w = C; w < u.length; w++) {
				const L = (u[w] = A ? Qe(u[w]) : Me(u[w]));
				P(null, L, m, p, x, y, E, S, A);
			}
		},
		Ye = (u, m, p, x, y, E, S) => {
			const A = (m.el = u.el);
			let { patchFlag: C, dynamicChildren: w, dirs: L } = m;
			C |= u.patchFlag & 16;
			const I = u.props || te,
				z = m.props || te;
			let $;
			p && ut(p, !1),
				($ = z.onVnodeBeforeUpdate) && Fe($, p, m, u),
				L && ct(m, u, p, "beforeUpdate"),
				p && ut(p, !0);
			const q = y && m.type !== "foreignObject";
			if (
				(w
					? ze(u.dynamicChildren, w, A, p, x, q, E)
					: S || Ae(u, m, A, null, p, x, q, E, !1),
				C > 0)
			) {
				if (C & 16) je(A, m, I, z, p, x, y);
				else if (
					(C & 2 && I.class !== z.class && a(A, "class", null, z.class, y),
					C & 4 && a(A, "style", I.style, z.style, y),
					C & 8)
				) {
					const ae = m.dynamicProps;
					for (let Q = 0; Q < ae.length; Q++) {
						const re = ae[Q],
							ke = I[re],
							_t = z[re];
						(_t !== ke || re === "value") &&
							a(A, re, ke, _t, y, u.children, p, x, O);
					}
				}
				C & 1 && u.children !== m.children && f(A, m.children);
			} else !S && w == null && je(A, m, I, z, p, x, y);
			(($ = z.onVnodeUpdated) || L) &&
				ge(() => {
					$ && Fe($, p, m, u), L && ct(m, u, p, "updated");
				}, x);
		},
		ze = (u, m, p, x, y, E, S) => {
			for (let A = 0; A < m.length; A++) {
				const C = u[A],
					w = m[A],
					L =
						C.el && (C.type === Pe || !Zt(C, w) || C.shapeFlag & (6 | 64))
							? d(C.el)
							: p;
				P(C, w, L, null, x, y, E, S, !0);
			}
		},
		je = (u, m, p, x, y, E, S) => {
			if (p !== x) {
				for (const A in x) {
					if (wn(A)) continue;
					const C = x[A],
						w = p[A];
					C !== w && A !== "value" && a(u, A, w, C, S, m.children, y, E, O);
				}
				if (p !== te)
					for (const A in p)
						!wn(A) && !(A in x) && a(u, A, p[A], null, S, m.children, y, E, O);
				"value" in x && a(u, "value", p.value, x.value);
			}
		},
		bt = (u, m, p, x, y, E, S, A, C) => {
			const w = (m.el = u ? u.el : s("")),
				L = (m.anchor = u ? u.anchor : s(""));
			let { patchFlag: I, dynamicChildren: z, slotScopeIds: $ } = m;
			$ && (A = A ? A.concat($) : $),
				u == null
					? (r(w, p, x), r(L, p, x), ce(m.children, p, L, y, E, S, A, C))
					: I > 0 && I & 64 && z && u.dynamicChildren
					? (ze(u.dynamicChildren, z, p, y, E, S, A),
					  (m.key != null || (y && m === y.subTree)) && Ma(u, m, !0))
					: Ae(u, m, p, L, y, E, S, A, C);
		},
		yt = (u, m, p, x, y, E, S, A, C) => {
			(m.slotScopeIds = A),
				u == null
					? m.shapeFlag & 512
						? y.ctx.activate(m, p, x, S, C)
						: xt(m, p, x, y, E, S, C)
					: le(u, m, C);
		},
		xt = (u, m, p, x, y, E, S) => {
			const A = (u.component = kf(u, x, y));
			if ((va(u) && (A.ctx.renderer = ee), Cf(A), A.asyncDep)) {
				if ((y && y.registerDep(A, Z), !u.el)) {
					const C = (A.subTree = ve(St));
					_(null, C, m, p);
				}
				return;
			}
			Z(A, u, m, p, y, E, S);
		},
		le = (u, m, p) => {
			const x = (m.component = u.component);
			if (Ml(u, m, p))
				if (x.asyncDep && !x.asyncResolved) {
					X(x, m, p);
					return;
				} else (x.next = m), Mf(x.update), x.update();
			else (m.component = u.component), (m.el = u.el), (x.vnode = m);
		},
		Z = (u, m, p, x, y, E, S) => {
			const A = () => {
					if (u.isMounted) {
						let { next: L, bu: I, u: z, parent: $, vnode: q } = u,
							ae = L,
							Q;
						ut(u, !1),
							L ? ((L.el = q.el), X(u, L, S)) : (L = q),
							I && vr(I),
							(Q = L.props && L.props.onVnodeBeforeUpdate) && Fe(Q, $, L, q),
							ut(u, !0);
						const re = Tr(u),
							ke = u.subTree;
						(u.subTree = re),
							P(ke, re, d(ke.el), F(ke), u, y, E),
							(L.el = re.el),
							ae === null && Fl(u, re.el),
							z && ge(z, y),
							(Q = L.props && L.props.onVnodeUpdated) &&
								ge(() => Fe(Q, $, L, q), y);
					} else {
						let L;
						const { el: I, props: z } = m,
							{ bm: $, m: q, parent: ae } = u,
							Q = Nr(m);
						if (
							(ut(u, !1),
							$ && vr($),
							!Q && (L = z && z.onVnodeBeforeMount) && Fe(L, ae, m),
							ut(u, !0),
							I && U)
						) {
							const re = () => {
								(u.subTree = Tr(u)), U(I, u.subTree, u, y, null);
							};
							Q
								? m.type.__asyncLoader().then(() => !u.isUnmounted && re())
								: re();
						} else {
							const re = (u.subTree = Tr(u));
							P(null, re, p, x, u, y, E), (m.el = re.el);
						}
						if ((q && ge(q, y), !Q && (L = z && z.onVnodeMounted))) {
							const re = m;
							ge(() => Fe(L, ae, re), y);
						}
						m.shapeFlag & 256 && u.a && ge(u.a, y),
							(u.isMounted = !0),
							(m = p = x = null);
					}
				},
				C = (u.effect = new _r(A, () => Va(u.update), u.scope)),
				w = (u.update = C.run.bind(C));
			(w.id = u.uid), ut(u, !0), w();
		},
		X = (u, m, p) => {
			m.component = u;
			const x = u.vnode.props;
			(u.vnode = m),
				(u.next = null),
				nf(u, m.props, x, p),
				of(u, m.children, p),
				Ot(),
				qr(void 0, u.update),
				lt();
		},
		Ae = (u, m, p, x, y, E, S, A, C = !1) => {
			const w = u && u.children,
				L = u ? u.shapeFlag : 0,
				I = m.children,
				{ patchFlag: z, shapeFlag: $ } = m;
			if (z > 0) {
				if (z & 128) {
					De(w, I, p, x, y, E, S, A, C);
					return;
				} else if (z & 256) {
					wt(w, I, p, x, y, E, S, A, C);
					return;
				}
			}
			$ & 8
				? (L & 16 && O(w, y, E), I !== w && f(p, I))
				: L & 16
				? $ & 16
					? De(w, I, p, x, y, E, S, A, C)
					: O(w, y, E, !0)
				: (L & 8 && f(p, ""), $ & 16 && ce(I, p, x, y, E, S, A, C));
		},
		wt = (u, m, p, x, y, E, S, A, C) => {
			(u = u || At), (m = m || At);
			const w = u.length,
				L = m.length,
				I = Math.min(w, L);
			let z;
			for (z = 0; z < I; z++) {
				const $ = (m[z] = C ? Qe(m[z]) : Me(m[z]));
				P(u[z], $, p, null, y, E, S, A, C);
			}
			w > L ? O(u, y, E, !0, !1, I) : ce(m, p, x, y, E, S, A, C, I);
		},
		De = (u, m, p, x, y, E, S, A, C) => {
			let w = 0;
			const L = m.length;
			let I = u.length - 1,
				z = L - 1;
			for (; w <= I && w <= z; ) {
				const $ = u[w],
					q = (m[w] = C ? Qe(m[w]) : Me(m[w]));
				if (Zt($, q)) P($, q, p, null, y, E, S, A, C);
				else break;
				w++;
			}
			for (; w <= I && w <= z; ) {
				const $ = u[I],
					q = (m[z] = C ? Qe(m[z]) : Me(m[z]));
				if (Zt($, q)) P($, q, p, null, y, E, S, A, C);
				else break;
				I--, z--;
			}
			if (w > I) {
				if (w <= z) {
					const $ = z + 1,
						q = $ < L ? m[$].el : x;
					for (; w <= z; )
						P(null, (m[w] = C ? Qe(m[w]) : Me(m[w])), p, q, y, E, S, A, C), w++;
				}
			} else if (w > z) for (; w <= I; ) Ee(u[w], y, E, !0), w++;
			else {
				const $ = w,
					q = w,
					ae = new Map();
				for (w = q; w <= z; w++) {
					const be = (m[w] = C ? Qe(m[w]) : Me(m[w]));
					be.key != null && ae.set(be.key, w);
				}
				let Q,
					re = 0;
				const ke = z - q + 1;
				let _t = !1,
					Fi = 0;
				const Wt = new Array(ke);
				for (w = 0; w < ke; w++) Wt[w] = 0;
				for (w = $; w <= I; w++) {
					const be = u[w];
					if (re >= ke) {
						Ee(be, y, E, !0);
						continue;
					}
					let Te;
					if (be.key != null) Te = ae.get(be.key);
					else
						for (Q = q; Q <= z; Q++)
							if (Wt[Q - q] === 0 && Zt(be, m[Q])) {
								Te = Q;
								break;
							}
					Te === void 0
						? Ee(be, y, E, !0)
						: ((Wt[Te - q] = w + 1),
						  Te >= Fi ? (Fi = Te) : (_t = !0),
						  P(be, m[Te], p, null, y, E, S, A, C),
						  re++);
				}
				const Li = _t ? uf(Wt) : At;
				for (Q = Li.length - 1, w = ke - 1; w >= 0; w--) {
					const be = q + w,
						Te = m[be],
						zi = be + 1 < L ? m[be + 1].el : x;
					Wt[w] === 0
						? P(null, Te, p, zi, y, E, S, A, C)
						: _t && (Q < 0 || w !== Li[Q] ? Ie(Te, p, zi, 2) : Q--);
				}
			}
		},
		Ie = (u, m, p, x, y = null) => {
			const { el: E, type: S, transition: A, children: C, shapeFlag: w } = u;
			if (w & 6) {
				Ie(u.component.subTree, m, p, x);
				return;
			}
			if (w & 128) {
				u.suspense.move(m, p, x);
				return;
			}
			if (w & 64) {
				S.move(u, m, p, ee);
				return;
			}
			if (S === Pe) {
				r(E, m, p);
				for (let I = 0; I < C.length; I++) Ie(C[I], m, p, x);
				r(u.anchor, m, p);
				return;
			}
			if (S === Ln) {
				D(u, m, p);
				return;
			}
			if (x !== 2 && w & 1 && A)
				if (x === 0) A.beforeEnter(E), r(E, m, p), ge(() => A.enter(E), y);
				else {
					const { leave: I, delayLeave: z, afterLeave: $ } = A,
						q = () => r(E, m, p),
						ae = () => {
							I(E, () => {
								q(), $ && $();
							});
						};
					z ? z(E, q, ae) : ae();
				}
			else r(E, m, p);
		},
		Ee = (u, m, p, x = !1, y = !1) => {
			const {
				type: E,
				props: S,
				ref: A,
				children: C,
				dynamicChildren: w,
				shapeFlag: L,
				patchFlag: I,
				dirs: z,
			} = u;
			if ((A != null && jr(A, null, p, u, !0), L & 256)) {
				m.ctx.deactivate(u);
				return;
			}
			const $ = L & 1 && z,
				q = !Nr(u);
			let ae;
			if ((q && (ae = S && S.onVnodeBeforeUnmount) && Fe(ae, m, u), L & 6))
				T(u.component, p, x);
			else {
				if (L & 128) {
					u.suspense.unmount(p, x);
					return;
				}
				$ && ct(u, null, m, "beforeUnmount"),
					L & 64
						? u.type.remove(u, m, p, y, ee, x)
						: w && (E !== Pe || (I > 0 && I & 64))
						? O(w, m, p, !1, !0)
						: ((E === Pe && I & (128 | 256)) || (!y && L & 16)) && O(C, m, p),
					x && lr(u);
			}
			((q && (ae = S && S.onVnodeUnmounted)) || $) &&
				ge(() => {
					ae && Fe(ae, m, u), $ && ct(u, null, m, "unmounted");
				}, p);
		},
		lr = (u) => {
			const { type: m, el: p, anchor: x, transition: y } = u;
			if (m === Pe) {
				b(p, x);
				return;
			}
			if (m === Ln) {
				K(u);
				return;
			}
			const E = () => {
				i(p), y && !y.persisted && y.afterLeave && y.afterLeave();
			};
			if (u.shapeFlag & 1 && y && !y.persisted) {
				const { leave: S, delayLeave: A } = y,
					C = () => S(p, E);
				A ? A(u.el, E, C) : C();
			} else E();
		},
		b = (u, m) => {
			let p;
			for (; u !== m; ) (p = h(u)), i(u), (u = p);
			i(m);
		},
		T = (u, m, p) => {
			const { bum: x, scope: y, update: E, subTree: S, um: A } = u;
			x && vr(x),
				y.stop(),
				E && ((E.active = !1), Ee(S, u, m, p)),
				A && ge(A, m),
				ge(() => {
					u.isUnmounted = !0;
				}, m),
				m &&
					m.pendingBranch &&
					!m.isUnmounted &&
					u.asyncDep &&
					!u.asyncResolved &&
					u.suspenseId === m.pendingId &&
					(m.deps--, m.deps === 0 && m.resolve());
		},
		O = (u, m, p, x = !1, y = !1, E = 0) => {
			for (let S = E; S < u.length; S++) Ee(u[S], m, p, x, y);
		},
		F = (u) =>
			u.shapeFlag & 6
				? F(u.component.subTree)
				: u.shapeFlag & 128
				? u.suspense.next()
				: h(u.anchor || u.el),
		G = (u, m, p) => {
			u == null
				? m._vnode && Ee(m._vnode, null, null, !0)
				: P(m._vnode || null, u, m, null, null, null, p),
				Qa(),
				(m._vnode = u);
		},
		ee = {
			p: P,
			um: Ee,
			m: Ie,
			r: lr,
			mt: xt,
			mc: ce,
			pc: Ae,
			pbc: ze,
			n: F,
			o: e,
		};
	let W, U;
	return t && ([W, U] = t(ee)), { render: G, hydrate: W, createApp: lf(G, W) };
}
function ut({ effect: e, update: t }, n) {
	e.allowRecurse = t.allowRecurse = n;
}
function Ma(e, t, n = !1) {
	const r = e.children,
		i = t.children;
	if (H(r) && H(i))
		for (let a = 0; a < r.length; a++) {
			const o = r[a];
			let s = i[a];
			s.shapeFlag & 1 &&
				!s.dynamicChildren &&
				((s.patchFlag <= 0 || s.patchFlag === 32) &&
					((s = i[a] = Qe(i[a])), (s.el = o.el)),
				n || Ma(o, s));
		}
}
function uf(e) {
	const t = e.slice(),
		n = [0];
	let r, i, a, o, s;
	const l = e.length;
	for (r = 0; r < l; r++) {
		const c = e[r];
		if (c !== 0) {
			if (((i = n[n.length - 1]), e[i] < c)) {
				(t[r] = i), n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o; )
				(s = (a + o) >> 1), e[n[s]] < c ? (a = s + 1) : (o = s);
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), (n[a] = r));
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0; ) (n[a] = o), (o = t[o]);
	return n;
}
const df = (e) => e.__isTeleport,
	Fa = "components";
function em(e, t) {
	return hf(Fa, e, !0, t) || e;
}
const mf = Symbol();
function hf(e, t, n = !0, r = !1) {
	const i = Oe || ue;
	if (i) {
		const a = i.type;
		if (e === Fa) {
			const s = Rf(a);
			if (s && (s === t || s === Ne(t) || s === An(Ne(t)))) return a;
		}
		const o = La(i[e] || a[e], t) || La(i.appContext[e], t);
		return !o && r ? a : o;
	}
}
function La(e, t) {
	return e && (e[t] || e[Ne(t)] || e[An(Ne(t))]);
}
const Pe = Symbol(void 0),
	Dr = Symbol(void 0),
	St = Symbol(void 0),
	Ln = Symbol(void 0),
	Jt = [];
let dt = null;
function pf(e = !1) {
	Jt.push((dt = e ? null : []));
}
function gf() {
	Jt.pop(), (dt = Jt[Jt.length - 1] || null);
}
let zn = 1;
function za(e) {
	zn += e;
}
function ja(e) {
	return (
		(e.dynamicChildren = zn > 0 ? dt || At : null),
		gf(),
		zn > 0 && dt && dt.push(e),
		e
	);
}
function tm(e, t, n, r, i, a) {
	return ja($a(e, t, n, r, i, a, !0));
}
function vf(e, t, n, r, i) {
	return ja(ve(e, t, n, r, i, !0));
}
function jn(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Zt(e, t) {
	return e.type === t.type && e.key === t.key;
}
const Dn = "__vInternal",
	Da = ({ key: e }) => (e != null ? e : null),
	$n = ({ ref: e, ref_key: t, ref_for: n }) =>
		e != null
			? de(e) || he(e) || B(e)
				? { i: Oe, r: e, k: t, f: !!n }
				: e
			: null;
function $a(
	e,
	t = null,
	n = null,
	r = 0,
	i = null,
	a = e === Pe ? 0 : 1,
	o = !1,
	s = !1
) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Da(t),
		ref: t && $n(t),
		scopeId: pa,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
	};
	return (
		s
			? ($r(l, n), a & 128 && e.normalize(l))
			: n && (l.shapeFlag |= de(n) ? 8 : 16),
		zn > 0 &&
			!o &&
			dt &&
			(l.patchFlag > 0 || a & 6) &&
			l.patchFlag !== 32 &&
			dt.push(l),
		l
	);
}
const ve = bf;
function bf(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (((!e || e === mf) && (e = St), jn(e))) {
		const s = en(e, t, !0);
		return n && $r(s, n), s;
	}
	if ((If(e) && (e = e.__vccOpts), t)) {
		t = yf(t);
		let { class: s, style: l } = t;
		s && !de(s) && (t.class = ur(s)),
			fe(l) && (la(l) && !H(l) && (l = me({}, l)), (t.style = cr(l)));
	}
	const o = de(e) ? 1 : Ll(e) ? 128 : df(e) ? 64 : fe(e) ? 4 : B(e) ? 2 : 0;
	return $a(e, t, n, r, i, o, a, !0);
}
function yf(e) {
	return e ? (la(e) || Dn in e ? me({}, e) : e) : null;
}
function en(e, t, n = !1) {
	const { props: r, ref: i, patchFlag: a, children: o } = e,
		s = t ? wf(r || {}, t) : r;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: s,
		key: s && Da(s),
		ref:
			t && t.ref ? (n && i ? (H(i) ? i.concat($n(t)) : [i, $n(t)]) : $n(t)) : i,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: o,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Pe ? (a === -1 ? 16 : a | 16) : a,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && en(e.ssContent),
		ssFallback: e.ssFallback && en(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
	};
}
function xf(e = " ", t = 0) {
	return ve(Dr, null, e, t);
}
function nm(e, t) {
	const n = ve(Ln, null, e);
	return (n.staticCount = t), n;
}
function Me(e) {
	return e == null || typeof e == "boolean"
		? ve(St)
		: H(e)
		? ve(Pe, null, e.slice())
		: typeof e == "object"
		? Qe(e)
		: ve(Dr, null, String(e));
}
function Qe(e) {
	return e.el === null || e.memo ? e : en(e);
}
function $r(e, t) {
	let n = 0;
	const { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (H(t)) n = 16;
	else if (typeof t == "object")
		if (r & (1 | 64)) {
			const i = t.default;
			i && (i._c && (i._d = !1), $r(e, i()), i._c && (i._d = !0));
			return;
		} else {
			n = 32;
			const i = t._;
			!i && !(Dn in t)
				? (t._ctx = Oe)
				: i === 3 &&
				  Oe &&
				  (Oe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		B(t)
			? ((t = { default: t, _ctx: Oe }), (n = 32))
			: ((t = String(t)), r & 64 ? ((n = 16), (t = [xf(t)])) : (n = 8));
	(e.children = t), (e.shapeFlag |= n);
}
function wf(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const r = e[n];
		for (const i in r)
			if (i === "class")
				t.class !== r.class && (t.class = ur([t.class, r.class]));
			else if (i === "style") t.style = cr([t.style, r.style]);
			else if (yn(i)) {
				const a = t[i],
					o = r[i];
				a !== o && !(H(a) && a.includes(o)) && (t[i] = a ? [].concat(a, o) : o);
			} else i !== "" && (t[i] = r[i]);
	}
	return t;
}
function Fe(e, t, n, r = null) {
	Se(e, t, 7, [n, r]);
}
function rm(e, t, n = {}, r, i) {
	if (Oe.isCE)
		return ve("slot", t === "default" ? null : { name: t }, r && r());
	let a = e[t];
	a && a._c && (a._d = !1), pf();
	const o = a && Ha(a(n)),
		s = vf(
			Pe,
			{ key: n.key || `_${t}` },
			o || (r ? r() : []),
			o && e._ === 1 ? 64 : -2
		);
	return (
		!i && s.scopeId && (s.slotScopeIds = [s.scopeId + "-s"]),
		a && a._c && (a._d = !0),
		s
	);
}
function Ha(e) {
	return e.some((t) =>
		jn(t) ? !(t.type === St || (t.type === Pe && !Ha(t.children))) : !0
	)
		? e
		: null;
}
const Hr = (e) => (e ? (Ua(e) ? Ur(e) || e.proxy : Hr(e.parent)) : null),
	Hn = me(Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => Hr(e.parent),
		$root: (e) => Hr(e.root),
		$emit: (e) => e.emit,
		$options: (e) => _a(e),
		$forceUpdate: (e) => () => Va(e.update),
		$nextTick: (e) => Ya.bind(e.proxy),
		$watch: (e) => zf.bind(e),
	}),
	_f = {
		get({ _: e }, t) {
			const {
				ctx: n,
				setupState: r,
				data: i,
				props: a,
				accessCache: o,
				type: s,
				appContext: l,
			} = e;
			let c;
			if (t[0] !== "$") {
				const v = o[t];
				if (v !== void 0)
					switch (v) {
						case 1:
							return r[t];
						case 2:
							return i[t];
						case 4:
							return n[t];
						case 3:
							return a[t];
					}
				else {
					if (r !== te && Y(r, t)) return (o[t] = 1), r[t];
					if (i !== te && Y(i, t)) return (o[t] = 2), i[t];
					if ((c = e.propsOptions[0]) && Y(c, t)) return (o[t] = 3), a[t];
					if (n !== te && Y(n, t)) return (o[t] = 4), n[t];
					Mr && (o[t] = 0);
				}
			}
			const f = Hn[t];
			let d, h;
			if (f) return t === "$attrs" && ye(e, "get", t), f(e);
			if ((d = s.__cssModules) && (d = d[t])) return d;
			if (n !== te && Y(n, t)) return (o[t] = 4), n[t];
			if (((h = l.config.globalProperties), Y(h, t))) return h[t];
		},
		set({ _: e }, t, n) {
			const { data: r, setupState: i, ctx: a } = e;
			if (i !== te && Y(i, t)) i[t] = n;
			else if (r !== te && Y(r, t)) r[t] = n;
			else if (Y(e.props, t)) return !1;
			return t[0] === "$" && t.slice(1) in e ? !1 : ((a[t] = n), !0);
		},
		has(
			{
				_: {
					data: e,
					setupState: t,
					accessCache: n,
					ctx: r,
					appContext: i,
					propsOptions: a,
				},
			},
			o
		) {
			let s;
			return (
				!!n[o] ||
				(e !== te && Y(e, o)) ||
				(t !== te && Y(t, o)) ||
				((s = a[0]) && Y(s, o)) ||
				Y(r, o) ||
				Y(Hn, o) ||
				Y(i.config.globalProperties, o)
			);
		},
	},
	Af = Na();
let Ef = 0;
function kf(e, t, n) {
	const r = e.type,
		i = (t ? t.appContext : e.appContext) || Af,
		a = {
			uid: Ef++,
			vnode: e,
			type: r,
			parent: t,
			appContext: i,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new Gs(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(i.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: ka(r, i),
			emitsOptions: ha(r, i),
			emit: null,
			emitted: null,
			propsDefaults: te,
			inheritAttrs: r.inheritAttrs,
			ctx: te,
			data: te,
			props: te,
			attrs: te,
			slots: te,
			refs: te,
			setupState: te,
			setupContext: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(a.ctx = { _: a }),
		(a.root = t ? t.root : a),
		(a.emit = Rl.bind(null, a)),
		e.ce && e.ce(a),
		a
	);
}
let ue = null;
const Rt = (e) => {
		(ue = e), e.scope.on();
	},
	mt = () => {
		ue && ue.scope.off(), (ue = null);
	};
function Ua(e) {
	return e.vnode.shapeFlag & 4;
}
let Un = !1;
function Cf(e, t = !1) {
	Un = t;
	const { props: n, children: r } = e.vnode,
		i = Ua(e);
	tf(e, n, i, t), af(e, r);
	const a = i ? Of(e, t) : void 0;
	return (Un = !1), a;
}
function Of(e, t) {
	const n = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = fa(new Proxy(e.ctx, _f)));
	const { setup: r } = n;
	if (r) {
		const i = (e.setupContext = r.length > 1 ? Sf(e) : null);
		Rt(e), Ot();
		const a = Je(r, e, 0, [e.props, i]);
		if ((lt(), mt(), Hi(a))) {
			if ((a.then(mt, mt), t))
				return a
					.then((o) => {
						Ba(e, o, t);
					})
					.catch((o) => {
						Bn(o, e, 0);
					});
			e.asyncDep = a;
		} else Ba(e, a, t);
	} else Ka(e, t);
}
function Ba(e, t, n) {
	B(t)
		? e.type.__ssrInlineRender
			? (e.ssrRender = t)
			: (e.render = t)
		: fe(t) && (e.setupState = ma(t)),
		Ka(e, n);
}
let Wa;
function Ka(e, t, n) {
	const r = e.type;
	if (!e.render) {
		if (!t && Wa && !r.render) {
			const i = r.template;
			if (i) {
				const { isCustomElement: a, compilerOptions: o } = e.appContext.config,
					{ delimiters: s, compilerOptions: l } = r,
					c = me(me({ isCustomElement: a, delimiters: s }, o), l);
				r.render = Wa(i, c);
			}
		}
		e.render = r.render || Ce;
	}
	Rt(e), Ot(), Gl(e), lt(), mt();
}
function Pf(e) {
	return new Proxy(e.attrs, {
		get(t, n) {
			return ye(e, "get", "$attrs"), t[n];
		},
	});
}
function Sf(e) {
	const t = (r) => {
		e.exposed = r || {};
	};
	let n;
	return {
		get attrs() {
			return n || (n = Pf(e));
		},
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function Ur(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(ma(fa(e.exposed)), {
				get(t, n) {
					if (n in t) return t[n];
					if (n in Hn) return Hn[n](e);
				},
			}))
		);
}
function Rf(e) {
	return (B(e) && e.displayName) || e.name;
}
function If(e) {
	return B(e) && "__vccOpts" in e;
}
function Je(e, t, n, r) {
	let i;
	try {
		i = r ? e(...r) : e();
	} catch (a) {
		Bn(a, t, n);
	}
	return i;
}
function Se(e, t, n, r) {
	if (B(e)) {
		const a = Je(e, t, n, r);
		return (
			a &&
				Hi(a) &&
				a.catch((o) => {
					Bn(o, t, n);
				}),
			a
		);
	}
	const i = [];
	for (let a = 0; a < e.length; a++) i.push(Se(e[a], t, n, r));
	return i;
}
function Bn(e, t, n, r = !0) {
	const i = t ? t.vnode : null;
	if (t) {
		let a = t.parent;
		const o = t.proxy,
			s = n;
		for (; a; ) {
			const c = a.ec;
			if (c) {
				for (let f = 0; f < c.length; f++) if (c[f](e, o, s) === !1) return;
			}
			a = a.parent;
		}
		const l = t.appContext.config.errorHandler;
		if (l) {
			Je(l, null, 10, [e, o, s]);
			return;
		}
	}
	Tf(e, n, i, r);
}
function Tf(e, t, n, r = !0) {
	console.error(e);
}
let Wn = !1,
	Br = !1;
const xe = [];
let Ue = 0;
const tn = [];
let nn = null,
	It = 0;
const rn = [];
let Ze = null,
	Tt = 0;
const qa = Promise.resolve();
let Wr = null,
	Kr = null;
function Ya(e) {
	const t = Wr || qa;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Nf(e) {
	let t = Ue + 1,
		n = xe.length;
	for (; t < n; ) {
		const r = (t + n) >>> 1;
		an(xe[r]) < e ? (t = r + 1) : (n = r);
	}
	return t;
}
function Va(e) {
	(!xe.length || !xe.includes(e, Wn && e.allowRecurse ? Ue + 1 : Ue)) &&
		e !== Kr &&
		(e.id == null ? xe.push(e) : xe.splice(Nf(e.id), 0, e), Xa());
}
function Xa() {
	!Wn && !Br && ((Br = !0), (Wr = qa.then(Ja)));
}
function Mf(e) {
	const t = xe.indexOf(e);
	t > Ue && xe.splice(t, 1);
}
function Ga(e, t, n, r) {
	H(e)
		? n.push(...e)
		: (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
		Xa();
}
function Ff(e) {
	Ga(e, nn, tn, It);
}
function Lf(e) {
	Ga(e, Ze, rn, Tt);
}
function qr(e, t = null) {
	if (tn.length) {
		for (
			Kr = t, nn = [...new Set(tn)], tn.length = 0, It = 0;
			It < nn.length;
			It++
		)
			nn[It]();
		(nn = null), (It = 0), (Kr = null), qr(e, t);
	}
}
function Qa(e) {
	if (rn.length) {
		const t = [...new Set(rn)];
		if (((rn.length = 0), Ze)) {
			Ze.push(...t);
			return;
		}
		for (Ze = t, Ze.sort((n, r) => an(n) - an(r)), Tt = 0; Tt < Ze.length; Tt++)
			Ze[Tt]();
		(Ze = null), (Tt = 0);
	}
}
const an = (e) => (e.id == null ? 1 / 0 : e.id);
function Ja(e) {
	(Br = !1), (Wn = !0), qr(e), xe.sort((n, r) => an(n) - an(r));
	const t = Ce;
	try {
		for (Ue = 0; Ue < xe.length; Ue++) {
			const n = xe[Ue];
			n && n.active !== !1 && Je(n, null, 14);
		}
	} finally {
		(Ue = 0),
			(xe.length = 0),
			Qa(),
			(Wn = !1),
			(Wr = null),
			(xe.length || tn.length || rn.length) && Ja(e);
	}
}
const Za = {};
function on(e, t, n) {
	return eo(e, t, n);
}
function eo(
	e,
	t,
	{ immediate: n, deep: r, flush: i, onTrack: a, onTrigger: o } = te
) {
	const s = ue;
	let l,
		c = !1,
		f = !1;
	if (
		(he(e)
			? ((l = () => e.value), (c = !!e._shallow))
			: Pt(e)
			? ((l = () => e), (r = !0))
			: H(e)
			? ((f = !0),
			  (c = e.some(Pt)),
			  (l = () =>
					e.map((g) => {
						if (he(g)) return g.value;
						if (Pt(g)) return Nt(g);
						if (B(g)) return Je(g, s, 2);
					})))
			: B(e)
			? t
				? (l = () => Je(e, s, 2))
				: (l = () => {
						if (!(s && s.isUnmounted)) return d && d(), Se(e, s, 3, [h]);
				  })
			: (l = Ce),
		t && r)
	) {
		const g = l;
		l = () => Nt(g());
	}
	let d,
		h = (g) => {
			d = P.onStop = () => {
				Je(g, s, 4);
			};
		};
	if (Un)
		return (h = Ce), t ? n && Se(t, s, 3, [l(), f ? [] : void 0, h]) : l(), Ce;
	let v = f ? [] : Za;
	const k = () => {
		if (!!P.active)
			if (t) {
				const g = P.run();
				(r || c || (f ? g.some((_, N) => Kt(_, v[N])) : Kt(g, v))) &&
					(d && d(), Se(t, s, 3, [g, v === Za ? void 0 : v, h]), (v = g));
			} else P.run();
	};
	k.allowRecurse = !!t;
	let M;
	i === "sync"
		? (M = k)
		: i === "post"
		? (M = () => ge(k, s && s.suspense))
		: (M = () => {
				!s || s.isMounted ? Ff(k) : k();
		  });
	const P = new _r(l, M);
	return (
		t
			? n
				? k()
				: (v = P.run())
			: i === "post"
			? ge(P.run.bind(P), s && s.suspense)
			: P.run(),
		() => {
			P.stop(), s && s.scope && mr(s.scope.effects, P);
		}
	);
}
function zf(e, t, n) {
	const r = this.proxy,
		i = de(e) ? (e.includes(".") ? to(r, e) : () => r[e]) : e.bind(r, r);
	let a;
	B(t) ? (a = t) : ((a = t.handler), (n = t));
	const o = ue;
	Rt(this);
	const s = eo(i, a.bind(r), n);
	return o ? Rt(o) : mt(), s;
}
function to(e, t) {
	const n = t.split(".");
	return () => {
		let r = e;
		for (let i = 0; i < n.length && r; i++) r = r[n[i]];
		return r;
	};
}
function Nt(e, t) {
	if (!fe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
	if ((t.add(e), he(e))) Nt(e.value, t);
	else if (H(e)) for (let n = 0; n < e.length; n++) Nt(e[n], t);
	else if ($i(e) || Et(e))
		e.forEach((n) => {
			Nt(n, t);
		});
	else if (Bi(e)) for (const n in e) Nt(e[n], t);
	return e;
}
function Kn(e, t, n) {
	const r = arguments.length;
	return r === 2
		? fe(t) && !H(t)
			? jn(t)
				? ve(e, null, [t])
				: ve(e, t)
			: ve(e, null, t)
		: (r > 3
				? (n = Array.prototype.slice.call(arguments, 2))
				: r === 3 && jn(n) && (n = [n]),
		  ve(e, t, n));
}
const jf = "3.2.26",
	Df = "http://www.w3.org/2000/svg",
	Mt = typeof document != "undefined" ? document : null,
	no = new Map(),
	$f = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: (e) => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, r) => {
			const i = t
				? Mt.createElementNS(Df, e)
				: Mt.createElement(e, n ? { is: n } : void 0);
			return (
				e === "select" &&
					r &&
					r.multiple != null &&
					i.setAttribute("multiple", r.multiple),
				i
			);
		},
		createText: (e) => Mt.createTextNode(e),
		createComment: (e) => Mt.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => Mt.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		cloneNode(e) {
			const t = e.cloneNode(!0);
			return "_value" in e && (t._value = e._value), t;
		},
		insertStaticContent(e, t, n, r) {
			const i = n ? n.previousSibling : t.lastChild;
			let a = no.get(e);
			if (!a) {
				const o = Mt.createElement("template");
				if (((o.innerHTML = r ? `<svg>${e}</svg>` : e), (a = o.content), r)) {
					const s = a.firstChild;
					for (; s.firstChild; ) a.appendChild(s.firstChild);
					a.removeChild(s);
				}
				no.set(e, a);
			}
			return (
				t.insertBefore(a.cloneNode(!0), n),
				[i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
			);
		},
	};
function Hf(e, t, n) {
	const r = e._vtc;
	r && (t = (t ? [t, ...r] : [...r]).join(" ")),
		t == null
			? e.removeAttribute("class")
			: n
			? e.setAttribute("class", t)
			: (e.className = t);
}
function Uf(e, t, n) {
	const r = e.style,
		i = de(n);
	if (n && !i) {
		for (const a in n) Yr(r, a, n[a]);
		if (t && !de(t)) for (const a in t) n[a] == null && Yr(r, a, "");
	} else {
		const a = r.display;
		i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
			"_vod" in e && (r.display = a);
	}
}
const ro = /\s*!important$/;
function Yr(e, t, n) {
	if (H(n)) n.forEach((r) => Yr(e, t, r));
	else if (t.startsWith("--")) e.setProperty(t, n);
	else {
		const r = Bf(e, t);
		ro.test(n)
			? e.setProperty(kt(r), n.replace(ro, ""), "important")
			: (e[r] = n);
	}
}
const io = ["Webkit", "Moz", "ms"],
	Vr = {};
function Bf(e, t) {
	const n = Vr[t];
	if (n) return n;
	let r = Ne(t);
	if (r !== "filter" && r in e) return (Vr[t] = r);
	r = An(r);
	for (let i = 0; i < io.length; i++) {
		const a = io[i] + r;
		if (a in e) return (Vr[t] = a);
	}
	return t;
}
const ao = "http://www.w3.org/1999/xlink";
function Wf(e, t, n, r, i) {
	if (r && t.startsWith("xlink:"))
		n == null
			? e.removeAttributeNS(ao, t.slice(6, t.length))
			: e.setAttributeNS(ao, t, n);
	else {
		const a = js(t);
		n == null || (a && !ji(n))
			? e.removeAttribute(t)
			: e.setAttribute(t, a ? "" : n);
	}
}
function Kf(e, t, n, r, i, a, o) {
	if (t === "innerHTML" || t === "textContent") {
		r && o(r, i, a), (e[t] = n == null ? "" : n);
		return;
	}
	if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
		e._value = n;
		const s = n == null ? "" : n;
		(e.value !== s || e.tagName === "OPTION") && (e.value = s),
			n == null && e.removeAttribute(t);
		return;
	}
	if (n === "" || n == null) {
		const s = typeof e[t];
		if (s === "boolean") {
			e[t] = ji(n);
			return;
		} else if (n == null && s === "string") {
			(e[t] = ""), e.removeAttribute(t);
			return;
		} else if (s === "number") {
			try {
				e[t] = 0;
			} catch {}
			e.removeAttribute(t);
			return;
		}
	}
	try {
		e[t] = n;
	} catch {}
}
let qn = Date.now,
	oo = !1;
if (typeof window != "undefined") {
	qn() > document.createEvent("Event").timeStamp &&
		(qn = () => performance.now());
	const e = navigator.userAgent.match(/firefox\/(\d+)/i);
	oo = !!(e && Number(e[1]) <= 53);
}
let Xr = 0;
const qf = Promise.resolve(),
	Yf = () => {
		Xr = 0;
	},
	Vf = () => Xr || (qf.then(Yf), (Xr = qn()));
function Xf(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Gf(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function Qf(e, t, n, r, i = null) {
	const a = e._vei || (e._vei = {}),
		o = a[t];
	if (r && o) o.value = r;
	else {
		const [s, l] = Jf(t);
		if (r) {
			const c = (a[t] = Zf(r, i));
			Xf(e, s, c, l);
		} else o && (Gf(e, s, o, l), (a[t] = void 0));
	}
}
const so = /(?:Once|Passive|Capture)$/;
function Jf(e) {
	let t;
	if (so.test(e)) {
		t = {};
		let n;
		for (; (n = e.match(so)); )
			(e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
	}
	return [kt(e.slice(2)), t];
}
function Zf(e, t) {
	const n = (r) => {
		const i = r.timeStamp || qn();
		(oo || i >= n.attached - 1) && Se(ec(r, n.value), t, 5, [r]);
	};
	return (n.value = e), (n.attached = Vf()), n;
}
function ec(e, t) {
	if (H(t)) {
		const n = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				n.call(e), (e._stopped = !0);
			}),
			t.map((r) => (i) => !i._stopped && r(i))
		);
	} else return t;
}
const lo = /^on[a-z]/,
	tc = (e, t, n, r, i = !1, a, o, s, l) => {
		t === "class"
			? Hf(e, r, i)
			: t === "style"
			? Uf(e, n, r)
			: yn(t)
			? dr(t) || Qf(e, t, n, r, o)
			: (
					t[0] === "."
						? ((t = t.slice(1)), !0)
						: t[0] === "^"
						? ((t = t.slice(1)), !1)
						: nc(e, t, r, i)
			  )
			? Kf(e, t, r, a, o, s, l)
			: (t === "true-value"
					? (e._trueValue = r)
					: t === "false-value" && (e._falseValue = r),
			  Wf(e, t, r, i));
	};
function nc(e, t, n, r) {
	return r
		? !!(
				t === "innerHTML" ||
				t === "textContent" ||
				(t in e && lo.test(t) && B(n))
		  )
		: t === "spellcheck" ||
		  t === "draggable" ||
		  t === "form" ||
		  (t === "list" && e.tagName === "INPUT") ||
		  (t === "type" && e.tagName === "TEXTAREA") ||
		  (lo.test(t) && de(n))
		? !1
		: t in e;
}
const rc = me({ patchProp: tc }, $f);
let fo;
function ic() {
	return fo || (fo = ff(rc));
}
const im = (...e) => {
	const t = ic().createApp(...e),
		{ mount: n } = t;
	return (
		(t.mount = (r) => {
			const i = ac(r);
			if (!i) return;
			const a = t._component;
			!B(a) && !a.render && !a.template && (a.template = i.innerHTML),
				(i.innerHTML = "");
			const o = n(i, !1, i instanceof SVGElement);
			return (
				i instanceof Element &&
					(i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
				o
			);
		}),
		t
	);
};
function ac(e) {
	return de(e) ? document.querySelector(e) : e;
}
/*!
 * vue-router v4.0.12
 * (c) 2021 Eduardo San Martin Morote
 * @license MIT
 */ const co =
		typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
	Ft = (e) => (co ? Symbol(e) : "_vr_" + e),
	oc = Ft("rvlm"),
	uo = Ft("rvd"),
	Gr = Ft("r"),
	mo = Ft("rl"),
	Qr = Ft("rvl"),
	Lt = typeof window != "undefined";
function sc(e) {
	return e.__esModule || (co && e[Symbol.toStringTag] === "Module");
}
const J = Object.assign;
function Jr(e, t) {
	const n = {};
	for (const r in t) {
		const i = t[r];
		n[r] = Array.isArray(i) ? i.map(e) : e(i);
	}
	return n;
}
const sn = () => {},
	lc = /\/$/,
	fc = (e) => e.replace(lc, "");
function Zr(e, t, n = "/") {
	let r,
		i = {},
		a = "",
		o = "";
	const s = t.indexOf("?"),
		l = t.indexOf("#", s > -1 ? s : 0);
	return (
		s > -1 &&
			((r = t.slice(0, s)),
			(a = t.slice(s + 1, l > -1 ? l : t.length)),
			(i = e(a))),
		l > -1 && ((r = r || t.slice(0, l)), (o = t.slice(l, t.length))),
		(r = mc(r != null ? r : t, n)),
		{ fullPath: r + (a && "?") + a + o, path: r, query: i, hash: o }
	);
}
function cc(e, t) {
	const n = t.query ? e(t.query) : "";
	return t.path + (n && "?") + n + (t.hash || "");
}
function ho(e, t) {
	return !t || !e.toLowerCase().startsWith(t.toLowerCase())
		? e
		: e.slice(t.length) || "/";
}
function uc(e, t, n) {
	const r = t.matched.length - 1,
		i = n.matched.length - 1;
	return (
		r > -1 &&
		r === i &&
		zt(t.matched[r], n.matched[i]) &&
		po(t.params, n.params) &&
		e(t.query) === e(n.query) &&
		t.hash === n.hash
	);
}
function zt(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function po(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const n in e) if (!dc(e[n], t[n])) return !1;
	return !0;
}
function dc(e, t) {
	return Array.isArray(e) ? go(e, t) : Array.isArray(t) ? go(t, e) : e === t;
}
function go(e, t) {
	return Array.isArray(t)
		? e.length === t.length && e.every((n, r) => n === t[r])
		: e.length === 1 && e[0] === t;
}
function mc(e, t) {
	if (e.startsWith("/")) return e;
	if (!e) return t;
	const n = t.split("/"),
		r = e.split("/");
	let i = n.length - 1,
		a,
		o;
	for (a = 0; a < r.length; a++)
		if (((o = r[a]), !(i === 1 || o === ".")))
			if (o === "..") i--;
			else break;
	return (
		n.slice(0, i).join("/") +
		"/" +
		r.slice(a - (a === r.length ? 1 : 0)).join("/")
	);
}
var ln;
(function (e) {
	(e.pop = "pop"), (e.push = "push");
})(ln || (ln = {}));
var fn;
(function (e) {
	(e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(fn || (fn = {}));
function hc(e) {
	if (!e)
		if (Lt) {
			const t = document.querySelector("base");
			(e = (t && t.getAttribute("href")) || "/"),
				(e = e.replace(/^\w+:\/\/[^\/]+/, ""));
		} else e = "/";
	return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), fc(e);
}
const pc = /^[^#]+#/;
function gc(e, t) {
	return e.replace(pc, "#") + t;
}
function vc(e, t) {
	const n = document.documentElement.getBoundingClientRect(),
		r = e.getBoundingClientRect();
	return {
		behavior: t.behavior,
		left: r.left - n.left - (t.left || 0),
		top: r.top - n.top - (t.top || 0),
	};
}
const Yn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function bc(e) {
	let t;
	if ("el" in e) {
		const n = e.el,
			r = typeof n == "string" && n.startsWith("#"),
			i =
				typeof n == "string"
					? r
						? document.getElementById(n.slice(1))
						: document.querySelector(n)
					: n;
		if (!i) return;
		t = vc(i, e);
	} else t = e;
	"scrollBehavior" in document.documentElement.style
		? window.scrollTo(t)
		: window.scrollTo(
				t.left != null ? t.left : window.pageXOffset,
				t.top != null ? t.top : window.pageYOffset
		  );
}
function vo(e, t) {
	return (history.state ? history.state.position - t : -1) + e;
}
const ei = new Map();
function yc(e, t) {
	ei.set(e, t);
}
function xc(e) {
	const t = ei.get(e);
	return ei.delete(e), t;
}
let wc = () => location.protocol + "//" + location.host;
function bo(e, t) {
	const { pathname: n, search: r, hash: i } = t,
		a = e.indexOf("#");
	if (a > -1) {
		let s = i.includes(e.slice(a)) ? e.slice(a).length : 1,
			l = i.slice(s);
		return l[0] !== "/" && (l = "/" + l), ho(l, "");
	}
	return ho(n, e) + r + i;
}
function _c(e, t, n, r) {
	let i = [],
		a = [],
		o = null;
	const s = ({ state: h }) => {
		const v = bo(e, location),
			k = n.value,
			M = t.value;
		let P = 0;
		if (h) {
			if (((n.value = v), (t.value = h), o && o === k)) {
				o = null;
				return;
			}
			P = M ? h.position - M.position : 0;
		} else r(v);
		i.forEach((g) => {
			g(n.value, k, {
				delta: P,
				type: ln.pop,
				direction: P ? (P > 0 ? fn.forward : fn.back) : fn.unknown,
			});
		});
	};
	function l() {
		o = n.value;
	}
	function c(h) {
		i.push(h);
		const v = () => {
			const k = i.indexOf(h);
			k > -1 && i.splice(k, 1);
		};
		return a.push(v), v;
	}
	function f() {
		const { history: h } = window;
		!h.state || h.replaceState(J({}, h.state, { scroll: Yn() }), "");
	}
	function d() {
		for (const h of a) h();
		(a = []),
			window.removeEventListener("popstate", s),
			window.removeEventListener("beforeunload", f);
	}
	return (
		window.addEventListener("popstate", s),
		window.addEventListener("beforeunload", f),
		{ pauseListeners: l, listen: c, destroy: d }
	);
}
function yo(e, t, n, r = !1, i = !1) {
	return {
		back: e,
		current: t,
		forward: n,
		replaced: r,
		position: window.history.length,
		scroll: i ? Yn() : null,
	};
}
function Ac(e) {
	const { history: t, location: n } = window,
		r = { value: bo(e, n) },
		i = { value: t.state };
	i.value ||
		a(
			r.value,
			{
				back: null,
				current: r.value,
				forward: null,
				position: t.length - 1,
				replaced: !0,
				scroll: null,
			},
			!0
		);
	function a(l, c, f) {
		const d = e.indexOf("#"),
			h =
				d > -1
					? (n.host && document.querySelector("base") ? e : e.slice(d)) + l
					: wc() + e + l;
		try {
			t[f ? "replaceState" : "pushState"](c, "", h), (i.value = c);
		} catch (v) {
			console.error(v), n[f ? "replace" : "assign"](h);
		}
	}
	function o(l, c) {
		const f = J({}, t.state, yo(i.value.back, l, i.value.forward, !0), c, {
			position: i.value.position,
		});
		a(l, f, !0), (r.value = l);
	}
	function s(l, c) {
		const f = J({}, i.value, t.state, { forward: l, scroll: Yn() });
		a(f.current, f, !0);
		const d = J({}, yo(r.value, l, null), { position: f.position + 1 }, c);
		a(l, d, !1), (r.value = l);
	}
	return { location: r, state: i, push: s, replace: o };
}
function am(e) {
	e = hc(e);
	const t = Ac(e),
		n = _c(e, t.state, t.location, t.replace);
	function r(a, o = !0) {
		o || n.pauseListeners(), history.go(a);
	}
	const i = J(
		{ location: "", base: e, go: r, createHref: gc.bind(null, e) },
		t,
		n
	);
	return (
		Object.defineProperty(i, "location", {
			enumerable: !0,
			get: () => t.location.value,
		}),
		Object.defineProperty(i, "state", {
			enumerable: !0,
			get: () => t.state.value,
		}),
		i
	);
}
function Ec(e) {
	return typeof e == "string" || (e && typeof e == "object");
}
function xo(e) {
	return typeof e == "string" || typeof e == "symbol";
}
const et = {
		path: "/",
		name: void 0,
		params: {},
		query: {},
		hash: "",
		fullPath: "/",
		matched: [],
		meta: {},
		redirectedFrom: void 0,
	},
	wo = Ft("nf");
var _o;
(function (e) {
	(e[(e.aborted = 4)] = "aborted"),
		(e[(e.cancelled = 8)] = "cancelled"),
		(e[(e.duplicated = 16)] = "duplicated");
})(_o || (_o = {}));
function jt(e, t) {
	return J(new Error(), { type: e, [wo]: !0 }, t);
}
function ht(e, t) {
	return e instanceof Error && wo in e && (t == null || !!(e.type & t));
}
const Ao = "[^/]+?",
	kc = { sensitive: !1, strict: !1, start: !0, end: !0 },
	Cc = /[.+*?^${}()[\]/\\]/g;
function Oc(e, t) {
	const n = J({}, kc, t),
		r = [];
	let i = n.start ? "^" : "";
	const a = [];
	for (const c of e) {
		const f = c.length ? [] : [90];
		n.strict && !c.length && (i += "/");
		for (let d = 0; d < c.length; d++) {
			const h = c[d];
			let v = 40 + (n.sensitive ? 0.25 : 0);
			if (h.type === 0)
				d || (i += "/"), (i += h.value.replace(Cc, "\\$&")), (v += 40);
			else if (h.type === 1) {
				const { value: k, repeatable: M, optional: P, regexp: g } = h;
				a.push({ name: k, repeatable: M, optional: P });
				const _ = g || Ao;
				if (_ !== Ao) {
					v += 10;
					try {
						new RegExp(`(${_})`);
					} catch (D) {
						throw new Error(
							`Invalid custom RegExp for param "${k}" (${_}): ` + D.message
						);
					}
				}
				let N = M ? `((?:${_})(?:/(?:${_}))*)` : `(${_})`;
				d || (N = P && c.length < 2 ? `(?:/${N})` : "/" + N),
					P && (N += "?"),
					(i += N),
					(v += 20),
					P && (v += -8),
					M && (v += -20),
					_ === ".*" && (v += -50);
			}
			f.push(v);
		}
		r.push(f);
	}
	if (n.strict && n.end) {
		const c = r.length - 1;
		r[c][r[c].length - 1] += 0.7000000000000001;
	}
	n.strict || (i += "/?"), n.end ? (i += "$") : n.strict && (i += "(?:/|$)");
	const o = new RegExp(i, n.sensitive ? "" : "i");
	function s(c) {
		const f = c.match(o),
			d = {};
		if (!f) return null;
		for (let h = 1; h < f.length; h++) {
			const v = f[h] || "",
				k = a[h - 1];
			d[k.name] = v && k.repeatable ? v.split("/") : v;
		}
		return d;
	}
	function l(c) {
		let f = "",
			d = !1;
		for (const h of e) {
			(!d || !f.endsWith("/")) && (f += "/"), (d = !1);
			for (const v of h)
				if (v.type === 0) f += v.value;
				else if (v.type === 1) {
					const { value: k, repeatable: M, optional: P } = v,
						g = k in c ? c[k] : "";
					if (Array.isArray(g) && !M)
						throw new Error(
							`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`
						);
					const _ = Array.isArray(g) ? g.join("/") : g;
					if (!_)
						if (P)
							h.length < 2 &&
								(f.endsWith("/") ? (f = f.slice(0, -1)) : (d = !0));
						else throw new Error(`Missing required param "${k}"`);
					f += _;
				}
		}
		return f;
	}
	return { re: o, score: r, keys: a, parse: s, stringify: l };
}
function Pc(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length; ) {
		const r = t[n] - e[n];
		if (r) return r;
		n++;
	}
	return e.length < t.length
		? e.length === 1 && e[0] === 40 + 40
			? -1
			: 1
		: e.length > t.length
		? t.length === 1 && t[0] === 40 + 40
			? 1
			: -1
		: 0;
}
function Sc(e, t) {
	let n = 0;
	const r = e.score,
		i = t.score;
	for (; n < r.length && n < i.length; ) {
		const a = Pc(r[n], i[n]);
		if (a) return a;
		n++;
	}
	return i.length - r.length;
}
const Rc = { type: 0, value: "" },
	Ic = /[a-zA-Z0-9_]/;
function Tc(e) {
	if (!e) return [[]];
	if (e === "/") return [[Rc]];
	if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
	function t(v) {
		throw new Error(`ERR (${n})/"${c}": ${v}`);
	}
	let n = 0,
		r = n;
	const i = [];
	let a;
	function o() {
		a && i.push(a), (a = []);
	}
	let s = 0,
		l,
		c = "",
		f = "";
	function d() {
		!c ||
			(n === 0
				? a.push({ type: 0, value: c })
				: n === 1 || n === 2 || n === 3
				? (a.length > 1 &&
						(l === "*" || l === "+") &&
						t(
							`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
						),
				  a.push({
						type: 1,
						value: c,
						regexp: f,
						repeatable: l === "*" || l === "+",
						optional: l === "*" || l === "?",
				  }))
				: t("Invalid state to consume buffer"),
			(c = ""));
	}
	function h() {
		c += l;
	}
	for (; s < e.length; ) {
		if (((l = e[s++]), l === "\\" && n !== 2)) {
			(r = n), (n = 4);
			continue;
		}
		switch (n) {
			case 0:
				l === "/" ? (c && d(), o()) : l === ":" ? (d(), (n = 1)) : h();
				break;
			case 4:
				h(), (n = r);
				break;
			case 1:
				l === "("
					? (n = 2)
					: Ic.test(l)
					? h()
					: (d(), (n = 0), l !== "*" && l !== "?" && l !== "+" && s--);
				break;
			case 2:
				l === ")"
					? f[f.length - 1] == "\\"
						? (f = f.slice(0, -1) + l)
						: (n = 3)
					: (f += l);
				break;
			case 3:
				d(), (n = 0), l !== "*" && l !== "?" && l !== "+" && s--, (f = "");
				break;
			default:
				t("Unknown state");
				break;
		}
	}
	return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), o(), i;
}
function Nc(e, t, n) {
	const r = Oc(Tc(e.path), n),
		i = J(r, { record: e, parent: t, children: [], alias: [] });
	return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function Mc(e, t) {
	const n = [],
		r = new Map();
	t = ko({ strict: !1, end: !0, sensitive: !1 }, t);
	function i(f) {
		return r.get(f);
	}
	function a(f, d, h) {
		const v = !h,
			k = Lc(f);
		k.aliasOf = h && h.record;
		const M = ko(t, f),
			P = [k];
		if ("alias" in f) {
			const N = typeof f.alias == "string" ? [f.alias] : f.alias;
			for (const D of N)
				P.push(
					J({}, k, {
						components: h ? h.record.components : k.components,
						path: D,
						aliasOf: h ? h.record : k,
					})
				);
		}
		let g, _;
		for (const N of P) {
			const { path: D } = N;
			if (d && D[0] !== "/") {
				const K = d.record.path,
					ne = K[K.length - 1] === "/" ? "" : "/";
				N.path = d.record.path + (D && ne + D);
			}
			if (
				((g = Nc(N, d, M)),
				h
					? h.alias.push(g)
					: ((_ = _ || g),
					  _ !== g && _.alias.push(g),
					  v && f.name && !Eo(g) && o(f.name)),
				"children" in k)
			) {
				const K = k.children;
				for (let ne = 0; ne < K.length; ne++) a(K[ne], g, h && h.children[ne]);
			}
			(h = h || g), l(g);
		}
		return _
			? () => {
					o(_);
			  }
			: sn;
	}
	function o(f) {
		if (xo(f)) {
			const d = r.get(f);
			d &&
				(r.delete(f),
				n.splice(n.indexOf(d), 1),
				d.children.forEach(o),
				d.alias.forEach(o));
		} else {
			const d = n.indexOf(f);
			d > -1 &&
				(n.splice(d, 1),
				f.record.name && r.delete(f.record.name),
				f.children.forEach(o),
				f.alias.forEach(o));
		}
	}
	function s() {
		return n;
	}
	function l(f) {
		let d = 0;
		for (; d < n.length && Sc(f, n[d]) >= 0; ) d++;
		n.splice(d, 0, f), f.record.name && !Eo(f) && r.set(f.record.name, f);
	}
	function c(f, d) {
		let h,
			v = {},
			k,
			M;
		if ("name" in f && f.name) {
			if (((h = r.get(f.name)), !h)) throw jt(1, { location: f });
			(M = h.record.name),
				(v = J(
					Fc(
						d.params,
						h.keys.filter((_) => !_.optional).map((_) => _.name)
					),
					f.params
				)),
				(k = h.stringify(v));
		} else if ("path" in f)
			(k = f.path),
				(h = n.find((_) => _.re.test(k))),
				h && ((v = h.parse(k)), (M = h.record.name));
		else {
			if (((h = d.name ? r.get(d.name) : n.find((_) => _.re.test(d.path))), !h))
				throw jt(1, { location: f, currentLocation: d });
			(M = h.record.name),
				(v = J({}, d.params, f.params)),
				(k = h.stringify(v));
		}
		const P = [];
		let g = h;
		for (; g; ) P.unshift(g.record), (g = g.parent);
		return { name: M, path: k, params: v, matched: P, meta: jc(P) };
	}
	return (
		e.forEach((f) => a(f)),
		{
			addRoute: a,
			resolve: c,
			removeRoute: o,
			getRoutes: s,
			getRecordMatcher: i,
		}
	);
}
function Fc(e, t) {
	const n = {};
	for (const r of t) r in e && (n[r] = e[r]);
	return n;
}
function Lc(e) {
	return {
		path: e.path,
		redirect: e.redirect,
		name: e.name,
		meta: e.meta || {},
		aliasOf: void 0,
		beforeEnter: e.beforeEnter,
		props: zc(e),
		children: e.children || [],
		instances: {},
		leaveGuards: new Set(),
		updateGuards: new Set(),
		enterCallbacks: {},
		components:
			"components" in e ? e.components || {} : { default: e.component },
	};
}
function zc(e) {
	const t = {},
		n = e.props || !1;
	if ("component" in e) t.default = n;
	else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
	return t;
}
function Eo(e) {
	for (; e; ) {
		if (e.record.aliasOf) return !0;
		e = e.parent;
	}
	return !1;
}
function jc(e) {
	return e.reduce((t, n) => J(t, n.meta), {});
}
function ko(e, t) {
	const n = {};
	for (const r in e) n[r] = r in t ? t[r] : e[r];
	return n;
}
const Co = /#/g,
	Dc = /&/g,
	$c = /\//g,
	Hc = /=/g,
	Uc = /\?/g,
	Oo = /\+/g,
	Bc = /%5B/g,
	Wc = /%5D/g,
	Po = /%5E/g,
	Kc = /%60/g,
	So = /%7B/g,
	qc = /%7C/g,
	Ro = /%7D/g,
	Yc = /%20/g;
function ti(e) {
	return encodeURI("" + e)
		.replace(qc, "|")
		.replace(Bc, "[")
		.replace(Wc, "]");
}
function Vc(e) {
	return ti(e).replace(So, "{").replace(Ro, "}").replace(Po, "^");
}
function ni(e) {
	return ti(e)
		.replace(Oo, "%2B")
		.replace(Yc, "+")
		.replace(Co, "%23")
		.replace(Dc, "%26")
		.replace(Kc, "`")
		.replace(So, "{")
		.replace(Ro, "}")
		.replace(Po, "^");
}
function Xc(e) {
	return ni(e).replace(Hc, "%3D");
}
function Gc(e) {
	return ti(e).replace(Co, "%23").replace(Uc, "%3F");
}
function Qc(e) {
	return e == null ? "" : Gc(e).replace($c, "%2F");
}
function Vn(e) {
	try {
		return decodeURIComponent("" + e);
	} catch {}
	return "" + e;
}
function Jc(e) {
	const t = {};
	if (e === "" || e === "?") return t;
	const r = (e[0] === "?" ? e.slice(1) : e).split("&");
	for (let i = 0; i < r.length; ++i) {
		const a = r[i].replace(Oo, " "),
			o = a.indexOf("="),
			s = Vn(o < 0 ? a : a.slice(0, o)),
			l = o < 0 ? null : Vn(a.slice(o + 1));
		if (s in t) {
			let c = t[s];
			Array.isArray(c) || (c = t[s] = [c]), c.push(l);
		} else t[s] = l;
	}
	return t;
}
function Io(e) {
	let t = "";
	for (let n in e) {
		const r = e[n];
		if (((n = Xc(n)), r == null)) {
			r !== void 0 && (t += (t.length ? "&" : "") + n);
			continue;
		}
		(Array.isArray(r) ? r.map((a) => a && ni(a)) : [r && ni(r)]).forEach(
			(a) => {
				a !== void 0 &&
					((t += (t.length ? "&" : "") + n), a != null && (t += "=" + a));
			}
		);
	}
	return t;
}
function Zc(e) {
	const t = {};
	for (const n in e) {
		const r = e[n];
		r !== void 0 &&
			(t[n] = Array.isArray(r)
				? r.map((i) => (i == null ? null : "" + i))
				: r == null
				? r
				: "" + r);
	}
	return t;
}
function cn() {
	let e = [];
	function t(r) {
		return (
			e.push(r),
			() => {
				const i = e.indexOf(r);
				i > -1 && e.splice(i, 1);
			}
		);
	}
	function n() {
		e = [];
	}
	return { add: t, list: () => e, reset: n };
}
function tt(e, t, n, r, i) {
	const a = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
	return () =>
		new Promise((o, s) => {
			const l = (d) => {
					d === !1
						? s(jt(4, { from: n, to: t }))
						: d instanceof Error
						? s(d)
						: Ec(d)
						? s(jt(2, { from: t, to: d }))
						: (a &&
								r.enterCallbacks[i] === a &&
								typeof d == "function" &&
								a.push(d),
						  o());
				},
				c = e.call(r && r.instances[i], t, n, l);
			let f = Promise.resolve(c);
			e.length < 3 && (f = f.then(l)), f.catch((d) => s(d));
		});
}
function ri(e, t, n, r) {
	const i = [];
	for (const a of e)
		for (const o in a.components) {
			let s = a.components[o];
			if (!(t !== "beforeRouteEnter" && !a.instances[o]))
				if (eu(s)) {
					const c = (s.__vccOpts || s)[t];
					c && i.push(tt(c, n, r, a, o));
				} else {
					let l = s();
					i.push(() =>
						l.then((c) => {
							if (!c)
								return Promise.reject(
									new Error(`Couldn't resolve component "${o}" at "${a.path}"`)
								);
							const f = sc(c) ? c.default : c;
							a.components[o] = f;
							const h = (f.__vccOpts || f)[t];
							return h && tt(h, n, r, a, o)();
						})
					);
				}
		}
	return i;
}
function eu(e) {
	return (
		typeof e == "object" ||
		"displayName" in e ||
		"props" in e ||
		"__vccOpts" in e
	);
}
function To(e) {
	const t = Ge(Gr),
		n = Ge(mo),
		r = oe(() => t.resolve(Gt(e.to))),
		i = oe(() => {
			const { matched: l } = r.value,
				{ length: c } = l,
				f = l[c - 1],
				d = n.matched;
			if (!f || !d.length) return -1;
			const h = d.findIndex(zt.bind(null, f));
			if (h > -1) return h;
			const v = No(l[c - 2]);
			return c > 1 && No(f) === v && d[d.length - 1].path !== v
				? d.findIndex(zt.bind(null, l[c - 2]))
				: h;
		}),
		a = oe(() => i.value > -1 && iu(n.params, r.value.params)),
		o = oe(
			() =>
				i.value > -1 &&
				i.value === n.matched.length - 1 &&
				po(n.params, r.value.params)
		);
	function s(l = {}) {
		return ru(l)
			? t[Gt(e.replace) ? "replace" : "push"](Gt(e.to)).catch(sn)
			: Promise.resolve();
	}
	return {
		route: r,
		href: oe(() => r.value.href),
		isActive: a,
		isExactActive: o,
		navigate: s,
	};
}
const tu = Qt({
		name: "RouterLink",
		props: {
			to: { type: [String, Object], required: !0 },
			replace: Boolean,
			activeClass: String,
			exactActiveClass: String,
			custom: Boolean,
			ariaCurrentValue: { type: String, default: "page" },
		},
		useLink: To,
		setup(e, { slots: t }) {
			const n = Vt(To(e)),
				{ options: r } = Ge(Gr),
				i = oe(() => ({
					[Mo(e.activeClass, r.linkActiveClass, "router-link-active")]:
						n.isActive,
					[Mo(
						e.exactActiveClass,
						r.linkExactActiveClass,
						"router-link-exact-active"
					)]: n.isExactActive,
				}));
			return () => {
				const a = t.default && t.default(n);
				return e.custom
					? a
					: Kn(
							"a",
							{
								"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
								href: n.href,
								onClick: n.navigate,
								class: i.value,
							},
							a
					  );
			};
		},
	}),
	nu = tu;
function ru(e) {
	if (
		!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
		!e.defaultPrevented &&
		!(e.button !== void 0 && e.button !== 0)
	) {
		if (e.currentTarget && e.currentTarget.getAttribute) {
			const t = e.currentTarget.getAttribute("target");
			if (/\b_blank\b/i.test(t)) return;
		}
		return e.preventDefault && e.preventDefault(), !0;
	}
}
function iu(e, t) {
	for (const n in t) {
		const r = t[n],
			i = e[n];
		if (typeof r == "string") {
			if (r !== i) return !1;
		} else if (
			!Array.isArray(i) ||
			i.length !== r.length ||
			r.some((a, o) => a !== i[o])
		)
			return !1;
	}
	return !0;
}
function No(e) {
	return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Mo = (e, t, n) => (e != null ? e : t != null ? t : n),
	au = Qt({
		name: "RouterView",
		inheritAttrs: !1,
		props: { name: { type: String, default: "default" }, route: Object },
		setup(e, { attrs: t, slots: n }) {
			const r = Ge(Qr),
				i = oe(() => e.route || r.value),
				a = Ge(uo, 0),
				o = oe(() => i.value.matched[a]);
			Nn(uo, a + 1), Nn(oc, o), Nn(Qr, i);
			const s = kl();
			return (
				on(
					() => [s.value, o.value, e.name],
					([l, c, f], [d, h, v]) => {
						c &&
							((c.instances[f] = l),
							h &&
								h !== c &&
								l &&
								l === d &&
								(c.leaveGuards.size || (c.leaveGuards = h.leaveGuards),
								c.updateGuards.size || (c.updateGuards = h.updateGuards))),
							l &&
								c &&
								(!h || !zt(c, h) || !d) &&
								(c.enterCallbacks[f] || []).forEach((k) => k(l));
					},
					{ flush: "post" }
				),
				() => {
					const l = i.value,
						c = o.value,
						f = c && c.components[e.name],
						d = e.name;
					if (!f) return Fo(n.default, { Component: f, route: l });
					const h = c.props[e.name],
						v = h
							? h === !0
								? l.params
								: typeof h == "function"
								? h(l)
								: h
							: null,
						M = Kn(
							f,
							J({}, v, t, {
								onVnodeUnmounted: (P) => {
									P.component.isUnmounted && (c.instances[d] = null);
								},
								ref: s,
							})
						);
					return Fo(n.default, { Component: M, route: l }) || M;
				}
			);
		},
	});
function Fo(e, t) {
	if (!e) return null;
	const n = e(t);
	return n.length === 1 ? n[0] : n;
}
const ou = au;
function om(e) {
	const t = Mc(e.routes, e),
		n = e.parseQuery || Jc,
		r = e.stringifyQuery || Io,
		i = e.history,
		a = cn(),
		o = cn(),
		s = cn(),
		l = Cl(et);
	let c = et;
	Lt &&
		e.scrollBehavior &&
		"scrollRestoration" in history &&
		(history.scrollRestoration = "manual");
	const f = Jr.bind(null, (b) => "" + b),
		d = Jr.bind(null, Qc),
		h = Jr.bind(null, Vn);
	function v(b, T) {
		let O, F;
		return (
			xo(b) ? ((O = t.getRecordMatcher(b)), (F = T)) : (F = b), t.addRoute(F, O)
		);
	}
	function k(b) {
		const T = t.getRecordMatcher(b);
		T && t.removeRoute(T);
	}
	function M() {
		return t.getRoutes().map((b) => b.record);
	}
	function P(b) {
		return !!t.getRecordMatcher(b);
	}
	function g(b, T) {
		if (((T = J({}, T || l.value)), typeof b == "string")) {
			const U = Zr(n, b, T.path),
				u = t.resolve({ path: U.path }, T),
				m = i.createHref(U.fullPath);
			return J(U, u, {
				params: h(u.params),
				hash: Vn(U.hash),
				redirectedFrom: void 0,
				href: m,
			});
		}
		let O;
		if ("path" in b) O = J({}, b, { path: Zr(n, b.path, T.path).path });
		else {
			const U = J({}, b.params);
			for (const u in U) U[u] == null && delete U[u];
			(O = J({}, b, { params: d(b.params) })), (T.params = d(T.params));
		}
		const F = t.resolve(O, T),
			G = b.hash || "";
		F.params = f(h(F.params));
		const ee = cc(r, J({}, b, { hash: Vc(G), path: F.path })),
			W = i.createHref(ee);
		return J(
			{ fullPath: ee, hash: G, query: r === Io ? Zc(b.query) : b.query || {} },
			F,
			{ redirectedFrom: void 0, href: W }
		);
	}
	function _(b) {
		return typeof b == "string" ? Zr(n, b, l.value.path) : J({}, b);
	}
	function N(b, T) {
		if (c !== b) return jt(8, { from: T, to: b });
	}
	function D(b) {
		return se(b);
	}
	function K(b) {
		return D(J(_(b), { replace: !0 }));
	}
	function ne(b) {
		const T = b.matched[b.matched.length - 1];
		if (T && T.redirect) {
			const { redirect: O } = T;
			let F = typeof O == "function" ? O(b) : O;
			return (
				typeof F == "string" &&
					((F = F.includes("?") || F.includes("#") ? (F = _(F)) : { path: F }),
					(F.params = {})),
				J({ query: b.query, hash: b.hash, params: b.params }, F)
			);
		}
	}
	function se(b, T) {
		const O = (c = g(b)),
			F = l.value,
			G = b.state,
			ee = b.force,
			W = b.replace === !0,
			U = ne(O);
		if (U) return se(J(_(U), { state: G, force: ee, replace: W }), T || O);
		const u = O;
		u.redirectedFrom = T;
		let m;
		return (
			!ee &&
				uc(r, F, O) &&
				((m = jt(16, { to: u, from: F })), wt(F, F, !0, !1)),
			(m ? Promise.resolve(m) : ce(u, F))
				.catch((p) => (ht(p) ? p : Z(p, u, F)))
				.then((p) => {
					if (p) {
						if (ht(p, 2))
							return se(
								J(_(p.to), { state: G, force: ee, replace: W }),
								T || u
							);
					} else p = ze(u, F, !0, W, G);
					return Ye(u, F, p), p;
				})
		);
	}
	function _e(b, T) {
		const O = N(b, T);
		return O ? Promise.reject(O) : Promise.resolve();
	}
	function ce(b, T) {
		let O;
		const [F, G, ee] = su(b, T);
		O = ri(F.reverse(), "beforeRouteLeave", b, T);
		for (const U of F)
			U.leaveGuards.forEach((u) => {
				O.push(tt(u, b, T));
			});
		const W = _e.bind(null, b, T);
		return (
			O.push(W),
			Dt(O)
				.then(() => {
					O = [];
					for (const U of a.list()) O.push(tt(U, b, T));
					return O.push(W), Dt(O);
				})
				.then(() => {
					O = ri(G, "beforeRouteUpdate", b, T);
					for (const U of G)
						U.updateGuards.forEach((u) => {
							O.push(tt(u, b, T));
						});
					return O.push(W), Dt(O);
				})
				.then(() => {
					O = [];
					for (const U of b.matched)
						if (U.beforeEnter && !T.matched.includes(U))
							if (Array.isArray(U.beforeEnter))
								for (const u of U.beforeEnter) O.push(tt(u, b, T));
							else O.push(tt(U.beforeEnter, b, T));
					return O.push(W), Dt(O);
				})
				.then(
					() => (
						b.matched.forEach((U) => (U.enterCallbacks = {})),
						(O = ri(ee, "beforeRouteEnter", b, T)),
						O.push(W),
						Dt(O)
					)
				)
				.then(() => {
					O = [];
					for (const U of o.list()) O.push(tt(U, b, T));
					return O.push(W), Dt(O);
				})
				.catch((U) => (ht(U, 8) ? U : Promise.reject(U)))
		);
	}
	function Ye(b, T, O) {
		for (const F of s.list()) F(b, T, O);
	}
	function ze(b, T, O, F, G) {
		const ee = N(b, T);
		if (ee) return ee;
		const W = T === et,
			U = Lt ? history.state : {};
		O &&
			(F || W
				? i.replace(b.fullPath, J({ scroll: W && U && U.scroll }, G))
				: i.push(b.fullPath, G)),
			(l.value = b),
			wt(b, T, O, W),
			Ae();
	}
	let je;
	function bt() {
		je = i.listen((b, T, O) => {
			const F = g(b),
				G = ne(F);
			if (G) {
				se(J(G, { replace: !0 }), F).catch(sn);
				return;
			}
			c = F;
			const ee = l.value;
			Lt && yc(vo(ee.fullPath, O.delta), Yn()),
				ce(F, ee)
					.catch((W) =>
						ht(W, 4 | 8)
							? W
							: ht(W, 2)
							? (se(W.to, F)
									.then((U) => {
										ht(U, 4 | 16) &&
											!O.delta &&
											O.type === ln.pop &&
											i.go(-1, !1);
									})
									.catch(sn),
							  Promise.reject())
							: (O.delta && i.go(-O.delta, !1), Z(W, F, ee))
					)
					.then((W) => {
						(W = W || ze(F, ee, !1)),
							W &&
								(O.delta
									? i.go(-O.delta, !1)
									: O.type === ln.pop && ht(W, 4 | 16) && i.go(-1, !1)),
							Ye(F, ee, W);
					})
					.catch(sn);
		});
	}
	let yt = cn(),
		xt = cn(),
		le;
	function Z(b, T, O) {
		Ae(b);
		const F = xt.list();
		return (
			F.length ? F.forEach((G) => G(b, T, O)) : console.error(b),
			Promise.reject(b)
		);
	}
	function X() {
		return le && l.value !== et
			? Promise.resolve()
			: new Promise((b, T) => {
					yt.add([b, T]);
			  });
	}
	function Ae(b) {
		le ||
			((le = !0),
			bt(),
			yt.list().forEach(([T, O]) => (b ? O(b) : T())),
			yt.reset());
	}
	function wt(b, T, O, F) {
		const { scrollBehavior: G } = e;
		if (!Lt || !G) return Promise.resolve();
		const ee =
			(!O && xc(vo(b.fullPath, 0))) ||
			((F || !O) && history.state && history.state.scroll) ||
			null;
		return Ya()
			.then(() => G(b, T, ee))
			.then((W) => W && bc(W))
			.catch((W) => Z(W, b, T));
	}
	const De = (b) => i.go(b);
	let Ie;
	const Ee = new Set();
	return {
		currentRoute: l,
		addRoute: v,
		removeRoute: k,
		hasRoute: P,
		getRoutes: M,
		resolve: g,
		options: e,
		push: D,
		replace: K,
		go: De,
		back: () => De(-1),
		forward: () => De(1),
		beforeEach: a.add,
		beforeResolve: o.add,
		afterEach: s.add,
		onError: xt.add,
		isReady: X,
		install(b) {
			const T = this;
			b.component("RouterLink", nu),
				b.component("RouterView", ou),
				(b.config.globalProperties.$router = T),
				Object.defineProperty(b.config.globalProperties, "$route", {
					enumerable: !0,
					get: () => Gt(l),
				}),
				Lt &&
					!Ie &&
					l.value === et &&
					((Ie = !0), D(i.location).catch((G) => {}));
			const O = {};
			for (const G in et) O[G] = oe(() => l.value[G]);
			b.provide(Gr, T), b.provide(mo, Vt(O)), b.provide(Qr, l);
			const F = b.unmount;
			Ee.add(b),
				(b.unmount = function () {
					Ee.delete(b),
						Ee.size < 1 &&
							((c = et), je && je(), (l.value = et), (Ie = !1), (le = !1)),
						F();
				});
		},
	};
}
function Dt(e) {
	return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function su(e, t) {
	const n = [],
		r = [],
		i = [],
		a = Math.max(t.matched.length, e.matched.length);
	for (let o = 0; o < a; o++) {
		const s = t.matched[o];
		s && (e.matched.find((c) => zt(c, s)) ? r.push(s) : n.push(s));
		const l = e.matched[o];
		l && (t.matched.find((c) => zt(c, l)) || i.push(l));
	}
	return [n, r, i];
}
/*!
 * Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2021 Fonticons, Inc.
 */ var sm = {
		prefix: "fab",
		iconName: "github",
		icon: [
			496,
			512,
			[],
			"f09b",
			"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
		],
	},
	lm = {
		prefix: "fab",
		iconName: "linkedin",
		icon: [
			448,
			512,
			[],
			"f08c",
			"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
		],
	};
/*!
 * Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2021 Fonticons, Inc.
 */ function Lo(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t &&
			(r = r.filter(function (i) {
				return Object.getOwnPropertyDescriptor(e, i).enumerable;
			})),
			n.push.apply(n, r);
	}
	return n;
}
function R(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Lo(Object(n), !0).forEach(function (r) {
					cu(e, r, n[r]);
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: Lo(Object(n)).forEach(function (r) {
					Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
			  });
	}
	return e;
}
function un(e) {
	return (
		typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
			? (un = function (t) {
					return typeof t;
			  })
			: (un = function (t) {
					return t &&
						typeof Symbol == "function" &&
						t.constructor === Symbol &&
						t !== Symbol.prototype
						? "symbol"
						: typeof t;
			  }),
		un(e)
	);
}
function lu(e, t) {
	if (!(e instanceof t))
		throw new TypeError("Cannot call a class as a function");
}
function zo(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		(r.enumerable = r.enumerable || !1),
			(r.configurable = !0),
			"value" in r && (r.writable = !0),
			Object.defineProperty(e, r.key, r);
	}
}
function fu(e, t, n) {
	return t && zo(e.prototype, t), n && zo(e, n), e;
}
function cu(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	);
}
function ii(e, t) {
	return du(e) || hu(e, t) || jo(e, t) || gu();
}
function Xn(e) {
	return uu(e) || mu(e) || jo(e) || pu();
}
function uu(e) {
	if (Array.isArray(e)) return ai(e);
}
function du(e) {
	if (Array.isArray(e)) return e;
}
function mu(e) {
	if (
		(typeof Symbol != "undefined" && e[Symbol.iterator] != null) ||
		e["@@iterator"] != null
	)
		return Array.from(e);
}
function hu(e, t) {
	var n =
		e &&
		((typeof Symbol != "undefined" && e[Symbol.iterator]) || e["@@iterator"]);
	if (n != null) {
		var r = [],
			i = !0,
			a = !1,
			o,
			s;
		try {
			for (
				n = n.call(e);
				!(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t));
				i = !0
			);
		} catch (l) {
			(a = !0), (s = l);
		} finally {
			try {
				!i && n.return != null && n.return();
			} finally {
				if (a) throw s;
			}
		}
		return r;
	}
}
function jo(e, t) {
	if (!!e) {
		if (typeof e == "string") return ai(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(n === "Object" && e.constructor && (n = e.constructor.name),
			n === "Map" || n === "Set")
		)
			return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
			return ai(e, t);
	}
}
function ai(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function pu() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gu() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Do = function () {},
	oi = {},
	$o = {},
	Ho = null,
	Uo = { mark: Do, measure: Do };
try {
	typeof window != "undefined" && (oi = window),
		typeof document != "undefined" && ($o = document),
		typeof MutationObserver != "undefined" && (Ho = MutationObserver),
		typeof performance != "undefined" && (Uo = performance);
} catch {}
var vu = oi.navigator || {},
	Bo = vu.userAgent,
	Wo = Bo === void 0 ? "" : Bo,
	nt = oi,
	ie = $o,
	Ko = Ho,
	Gn = Uo;
nt.document;
var Be =
		!!ie.documentElement &&
		!!ie.head &&
		typeof ie.addEventListener == "function" &&
		typeof ie.createElement == "function",
	qo = ~Wo.indexOf("MSIE") || ~Wo.indexOf("Trident/"),
	We = "___FONT_AWESOME___",
	si = 16,
	Yo = "fa",
	Vo = "svg-inline--fa",
	pt = "data-fa-i2svg",
	li = "data-fa-pseudo-element",
	bu = "data-fa-pseudo-element-pending",
	fi = "data-prefix",
	ci = "data-icon",
	Xo = "fontawesome-i2svg",
	yu = "async",
	xu = ["HTML", "HEAD", "STYLE", "SCRIPT"],
	Go = (function () {
		try {
			return !0;
		} catch {
			return !1;
		}
	})(),
	ui = {
		fas: "solid",
		"fa-solid": "solid",
		far: "regular",
		"fa-regular": "regular",
		fal: "light",
		"fa-light": "light",
		fat: "thin",
		"fa-thin": "thin",
		fad: "duotone",
		"fa-duotone": "duotone",
		fab: "brands",
		"fa-brands": "brands",
		fak: "kit",
		"fa-kit": "kit",
		fa: "solid",
	},
	Qn = {
		solid: "fas",
		regular: "far",
		light: "fal",
		thin: "fat",
		duotone: "fad",
		brands: "fab",
		kit: "fak",
	},
	di = {
		fab: "fa-brands",
		fad: "fa-duotone",
		fak: "fa-kit",
		fal: "fa-light",
		far: "fa-regular",
		fas: "fa-solid",
		fat: "fa-thin",
	},
	wu = Object.fromEntries(
		Object.entries(di).map(function (e) {
			return [e[1], e[0]];
		})
	),
	_u = /fa[srltdbk\-\ ]/,
	Qo = "fa-layers-text",
	Au =
		/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i,
	Eu = { 900: "fas", 400: "far", normal: "far", 300: "fal", 100: "fat" },
	Jo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	ku = Jo.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
	Cu = [
		"class",
		"data-prefix",
		"data-icon",
		"data-fa-transform",
		"data-fa-mask",
	],
	gt = {
		GROUP: "duotone-group",
		SWAP_OPACITY: "swap-opacity",
		PRIMARY: "primary",
		SECONDARY: "secondary",
	},
	Ou = []
		.concat(Xn(Object.keys(Qn)), [
			"2xs",
			"xs",
			"sm",
			"lg",
			"xl",
			"2xl",
			"beat",
			"border",
			"fade",
			"beat-fade",
			"flip-both",
			"flip-horizontal",
			"flip-vertical",
			"flip",
			"fw",
			"inverse",
			"layers-counter",
			"layers-text",
			"layers",
			"li",
			"pull-left",
			"pull-right",
			"pulse",
			"rotate-180",
			"rotate-270",
			"rotate-90",
			"rotate-by",
			"spin-pulse",
			"spin-reverse",
			"spin",
			"stack-1x",
			"stack-2x",
			"stack",
			"ul",
			gt.GROUP,
			gt.SWAP_OPACITY,
			gt.PRIMARY,
			gt.SECONDARY,
		])
		.concat(
			Jo.map(function (e) {
				return "".concat(e, "x");
			})
		)
		.concat(
			ku.map(function (e) {
				return "w-".concat(e);
			})
		),
	Zo = nt.FontAwesomeConfig || {};
function Pu(e) {
	var t = ie.querySelector("script[" + e + "]");
	if (t) return t.getAttribute(e);
}
function Su(e) {
	return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (ie && typeof ie.querySelector == "function") {
	var Ru = [
		["data-family-prefix", "familyPrefix"],
		["data-style-default", "styleDefault"],
		["data-replacement-class", "replacementClass"],
		["data-auto-replace-svg", "autoReplaceSvg"],
		["data-auto-add-css", "autoAddCss"],
		["data-auto-a11y", "autoA11y"],
		["data-search-pseudo-elements", "searchPseudoElements"],
		["data-observe-mutations", "observeMutations"],
		["data-mutate-approach", "mutateApproach"],
		["data-keep-original-source", "keepOriginalSource"],
		["data-measure-performance", "measurePerformance"],
		["data-show-missing-icons", "showMissingIcons"],
	];
	Ru.forEach(function (e) {
		var t = ii(e, 2),
			n = t[0],
			r = t[1],
			i = Su(Pu(n));
		i != null && (Zo[r] = i);
	});
}
var Iu = {
		familyPrefix: Yo,
		styleDefault: "solid",
		replacementClass: Vo,
		autoReplaceSvg: !0,
		autoAddCss: !0,
		autoA11y: !0,
		searchPseudoElements: !1,
		observeMutations: !0,
		mutateApproach: "async",
		keepOriginalSource: !0,
		measurePerformance: !1,
		showMissingIcons: !0,
	},
	dn = R(R({}, Iu), Zo);
dn.autoReplaceSvg || (dn.observeMutations = !1);
var j = {};
Object.keys(dn).forEach(function (e) {
	Object.defineProperty(j, e, {
		enumerable: !0,
		set: function (n) {
			(dn[e] = n),
				Jn.forEach(function (r) {
					return r(j);
				});
		},
		get: function () {
			return dn[e];
		},
	});
});
nt.FontAwesomeConfig = j;
var Jn = [];
function Tu(e) {
	return (
		Jn.push(e),
		function () {
			Jn.splice(Jn.indexOf(e), 1);
		}
	);
}
var rt = si,
	Le = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
function Nu(e) {
	if (!(!e || !Be)) {
		var t = ie.createElement("style");
		t.setAttribute("type", "text/css"), (t.innerHTML = e);
		for (var n = ie.head.childNodes, r = null, i = n.length - 1; i > -1; i--) {
			var a = n[i],
				o = (a.tagName || "").toUpperCase();
			["STYLE", "LINK"].indexOf(o) > -1 && (r = a);
		}
		return ie.head.insertBefore(t, r), e;
	}
}
var Mu = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function mn() {
	for (var e = 12, t = ""; e-- > 0; ) t += Mu[(Math.random() * 62) | 0];
	return t;
}
function $t(e) {
	for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
	return t;
}
function mi(e) {
	return e.classList
		? $t(e.classList)
		: (e.getAttribute("class") || "").split(" ").filter(function (t) {
				return t;
		  });
}
function es(e) {
	return ""
		.concat(e)
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}
function Fu(e) {
	return Object.keys(e || {})
		.reduce(function (t, n) {
			return t + "".concat(n, '="').concat(es(e[n]), '" ');
		}, "")
		.trim();
}
function Zn(e) {
	return Object.keys(e || {}).reduce(function (t, n) {
		return t + "".concat(n, ": ").concat(e[n].trim(), ";");
	}, "");
}
function hi(e) {
	return (
		e.size !== Le.size ||
		e.x !== Le.x ||
		e.y !== Le.y ||
		e.rotate !== Le.rotate ||
		e.flipX ||
		e.flipY
	);
}
function Lu(e) {
	var t = e.transform,
		n = e.containerWidth,
		r = e.iconWidth,
		i = { transform: "translate(".concat(n / 2, " 256)") },
		a = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "),
		o = "scale("
			.concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
			.concat((t.size / 16) * (t.flipY ? -1 : 1), ") "),
		s = "rotate(".concat(t.rotate, " 0 0)"),
		l = { transform: "".concat(a, " ").concat(o, " ").concat(s) },
		c = { transform: "translate(".concat((r / 2) * -1, " -256)") };
	return { outer: i, inner: l, path: c };
}
function zu(e) {
	var t = e.transform,
		n = e.width,
		r = n === void 0 ? si : n,
		i = e.height,
		a = i === void 0 ? si : i,
		o = e.startCentered,
		s = o === void 0 ? !1 : o,
		l = "";
	return (
		s && qo
			? (l += "translate("
					.concat(t.x / rt - r / 2, "em, ")
					.concat(t.y / rt - a / 2, "em) "))
			: s
			? (l += "translate(calc(-50% + "
					.concat(t.x / rt, "em), calc(-50% + ")
					.concat(t.y / rt, "em)) "))
			: (l += "translate(".concat(t.x / rt, "em, ").concat(t.y / rt, "em) ")),
		(l += "scale("
			.concat((t.size / rt) * (t.flipX ? -1 : 1), ", ")
			.concat((t.size / rt) * (t.flipY ? -1 : 1), ") ")),
		(l += "rotate(".concat(t.rotate, "deg) ")),
		l
	);
}
var ju = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  -webkit-box-sizing: content-box;
          box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function ts() {
	var e = Yo,
		t = Vo,
		n = j.familyPrefix,
		r = j.replacementClass,
		i = ju;
	if (n !== e || r !== t) {
		var a = new RegExp("\\.".concat(e, "\\-"), "g"),
			o = new RegExp("\\--".concat(e, "\\-"), "g"),
			s = new RegExp("\\.".concat(t), "g");
		i = i
			.replace(a, ".".concat(n, "-"))
			.replace(o, "--".concat(n, "-"))
			.replace(s, ".".concat(r));
	}
	return i;
}
var ns = !1;
function pi() {
	j.autoAddCss && !ns && (Nu(ts()), (ns = !0));
}
var Du = {
		mixout: function () {
			return { dom: { css: ts, insertCss: pi } };
		},
		hooks: function () {
			return {
				beforeDOMElementCreation: function () {
					pi();
				},
				beforeI2svg: function () {
					pi();
				},
			};
		},
	},
	Ke = nt || {};
Ke[We] || (Ke[We] = {});
Ke[We].styles || (Ke[We].styles = {});
Ke[We].hooks || (Ke[We].hooks = {});
Ke[We].shims || (Ke[We].shims = []);
var Re = Ke[We],
	rs = [],
	$u = function e() {
		ie.removeEventListener("DOMContentLoaded", e),
			(er = 1),
			rs.map(function (t) {
				return t();
			});
	},
	er = !1;
Be &&
	((er = (ie.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
		ie.readyState
	)),
	er || ie.addEventListener("DOMContentLoaded", $u));
function Hu(e) {
	!Be || (er ? setTimeout(e, 0) : rs.push(e));
}
function hn(e) {
	var t = e.tag,
		n = e.attributes,
		r = n === void 0 ? {} : n,
		i = e.children,
		a = i === void 0 ? [] : i;
	return typeof e == "string"
		? es(e)
		: "<"
				.concat(t, " ")
				.concat(Fu(r), ">")
				.concat(a.map(hn).join(""), "</")
				.concat(t, ">");
}
function is(e, t, n) {
	if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] };
}
var Uu = function (t, n) {
		return function (r, i, a, o) {
			return t.call(n, r, i, a, o);
		};
	},
	gi = function (t, n, r, i) {
		var a = Object.keys(t),
			o = a.length,
			s = i !== void 0 ? Uu(n, i) : n,
			l,
			c,
			f;
		for (
			r === void 0 ? ((l = 1), (f = t[a[0]])) : ((l = 0), (f = r));
			l < o;
			l++
		)
			(c = a[l]), (f = s(f, t[c], c, t));
		return f;
	};
function Bu(e) {
	for (var t = [], n = 0, r = e.length; n < r; ) {
		var i = e.charCodeAt(n++);
		if (i >= 55296 && i <= 56319 && n < r) {
			var a = e.charCodeAt(n++);
			(a & 64512) == 56320
				? t.push(((i & 1023) << 10) + (a & 1023) + 65536)
				: (t.push(i), n--);
		} else t.push(i);
	}
	return t;
}
function vi(e) {
	var t = Bu(e);
	return t.length === 1 ? t[0].toString(16) : null;
}
function Wu(e, t) {
	var n = e.length,
		r = e.charCodeAt(t),
		i;
	return r >= 55296 &&
		r <= 56319 &&
		n > t + 1 &&
		((i = e.charCodeAt(t + 1)), i >= 56320 && i <= 57343)
		? (r - 55296) * 1024 + i - 56320 + 65536
		: r;
}
function as(e) {
	return Object.keys(e).reduce(function (t, n) {
		var r = e[n],
			i = !!r.icon;
		return i ? (t[r.iconName] = r.icon) : (t[n] = r), t;
	}, {});
}
function bi(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
		r = n.skipHooks,
		i = r === void 0 ? !1 : r,
		a = as(t);
	typeof Re.hooks.addPack == "function" && !i
		? Re.hooks.addPack(e, as(t))
		: (Re.styles[e] = R(R({}, Re.styles[e] || {}), a)),
		e === "fas" && bi("fa", t);
}
var pn = Re.styles,
	Ku = Re.shims,
	qu = Object.values(di),
	yi = null,
	os = {},
	ss = {},
	ls = {},
	fs = {},
	cs = {},
	Yu = Object.keys(ui);
function Vu(e) {
	return ~Ou.indexOf(e);
}
function Xu(e, t) {
	var n = t.split("-"),
		r = n[0],
		i = n.slice(1).join("-");
	return r === e && i !== "" && !Vu(i) ? i : null;
}
var us = function () {
	var t = function (a) {
		return gi(
			pn,
			function (o, s, l) {
				return (o[l] = gi(s, a, {})), o;
			},
			{}
		);
	};
	(os = t(function (i, a, o) {
		if ((a[3] && (i[a[3]] = o), a[2])) {
			var s = a[2].filter(function (l) {
				return typeof l == "number";
			});
			s.forEach(function (l) {
				i[l.toString(16)] = o;
			});
		}
		return i;
	})),
		(ss = t(function (i, a, o) {
			if (((i[o] = o), a[2])) {
				var s = a[2].filter(function (l) {
					return typeof l == "string";
				});
				s.forEach(function (l) {
					i[l] = o;
				});
			}
			return i;
		})),
		(cs = t(function (i, a, o) {
			var s = a[2];
			return (
				(i[o] = o),
				s.forEach(function (l) {
					i[l] = o;
				}),
				i
			);
		}));
	var n = "far" in pn || j.autoFetchSvg,
		r = gi(
			Ku,
			function (i, a) {
				var o = a[0],
					s = a[1],
					l = a[2];
				return (
					s === "far" && !n && (s = "fas"),
					typeof o == "string" && (i.names[o] = { prefix: s, iconName: l }),
					typeof o == "number" &&
						(i.unicodes[o.toString(16)] = { prefix: s, iconName: l }),
					i
				);
			},
			{ names: {}, unicodes: {} }
		);
	(ls = r.names), (fs = r.unicodes), (yi = tr(j.styleDefault));
};
Tu(function (e) {
	yi = tr(e.styleDefault);
});
us();
function xi(e, t) {
	return (os[e] || {})[t];
}
function Gu(e, t) {
	return (ss[e] || {})[t];
}
function Ht(e, t) {
	return (cs[e] || {})[t];
}
function ds(e) {
	return ls[e] || { prefix: null, iconName: null };
}
function Qu(e) {
	var t = fs[e],
		n = xi("fas", e);
	return (
		t ||
		(n ? { prefix: "fas", iconName: n } : null) || {
			prefix: null,
			iconName: null,
		}
	);
}
function it() {
	return yi;
}
var wi = function () {
	return { prefix: null, iconName: null, rest: [] };
};
function tr(e) {
	var t = ui[e],
		n = Qn[e] || Qn[t],
		r = e in Re.styles ? e : null;
	return n || r || null;
}
function nr(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
		n = t.skipLookups,
		r = n === void 0 ? !1 : n,
		i = null,
		a = e.reduce(function (o, s) {
			var l = Xu(j.familyPrefix, s);
			if (
				(pn[s]
					? ((s = qu.includes(s) ? wu[s] : s), (i = s), (o.prefix = s))
					: Yu.indexOf(s) > -1
					? ((i = s), (o.prefix = tr(s)))
					: l
					? (o.iconName = l)
					: s !== j.replacementClass && o.rest.push(s),
				!r && o.prefix && o.iconName)
			) {
				var c = i === "fa" ? ds(o.iconName) : {},
					f = Ht(o.prefix, o.iconName);
				c.prefix && (i = null),
					(o.iconName = c.iconName || f || o.iconName),
					(o.prefix = c.prefix || o.prefix),
					o.prefix === "far" &&
						!pn.far &&
						pn.fas &&
						!j.autoFetchSvg &&
						(o.prefix = "fas");
			}
			return o;
		}, wi());
	return (a.prefix === "fa" || i === "fa") && (a.prefix = it() || "fas"), a;
}
var Ju = (function () {
		function e() {
			lu(this, e), (this.definitions = {});
		}
		return (
			fu(e, [
				{
					key: "add",
					value: function () {
						for (
							var n = this, r = arguments.length, i = new Array(r), a = 0;
							a < r;
							a++
						)
							i[a] = arguments[a];
						var o = i.reduce(this._pullDefinitions, {});
						Object.keys(o).forEach(function (s) {
							(n.definitions[s] = R(R({}, n.definitions[s] || {}), o[s])),
								bi(s, o[s]);
							var l = di[s];
							l && bi(l, o[s]), us();
						});
					},
				},
				{
					key: "reset",
					value: function () {
						this.definitions = {};
					},
				},
				{
					key: "_pullDefinitions",
					value: function (n, r) {
						var i = r.prefix && r.iconName && r.icon ? { 0: r } : r;
						return (
							Object.keys(i).map(function (a) {
								var o = i[a],
									s = o.prefix,
									l = o.iconName,
									c = o.icon,
									f = c[2];
								n[s] || (n[s] = {}),
									f.length > 0 &&
										f.forEach(function (d) {
											typeof d == "string" && (n[s][d] = c);
										}),
									(n[s][l] = c);
							}),
							n
						);
					},
				},
			]),
			e
		);
	})(),
	ms = [],
	Ut = {},
	Bt = {},
	Zu = Object.keys(Bt);
function ed(e, t) {
	var n = t.mixoutsTo;
	return (
		(ms = e),
		(Ut = {}),
		Object.keys(Bt).forEach(function (r) {
			Zu.indexOf(r) === -1 && delete Bt[r];
		}),
		ms.forEach(function (r) {
			var i = r.mixout ? r.mixout() : {};
			if (
				(Object.keys(i).forEach(function (o) {
					typeof i[o] == "function" && (n[o] = i[o]),
						un(i[o]) === "object" &&
							Object.keys(i[o]).forEach(function (s) {
								n[o] || (n[o] = {}), (n[o][s] = i[o][s]);
							});
				}),
				r.hooks)
			) {
				var a = r.hooks();
				Object.keys(a).forEach(function (o) {
					Ut[o] || (Ut[o] = []), Ut[o].push(a[o]);
				});
			}
			r.provides && r.provides(Bt);
		}),
		n
	);
}
function _i(e, t) {
	for (
		var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2;
		i < n;
		i++
	)
		r[i - 2] = arguments[i];
	var a = Ut[e] || [];
	return (
		a.forEach(function (o) {
			t = o.apply(null, [t].concat(r));
		}),
		t
	);
}
function vt(e) {
	for (
		var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
		r < t;
		r++
	)
		n[r - 1] = arguments[r];
	var i = Ut[e] || [];
	i.forEach(function (a) {
		a.apply(null, n);
	});
}
function qe() {
	var e = arguments[0],
		t = Array.prototype.slice.call(arguments, 1);
	return Bt[e] ? Bt[e].apply(null, t) : void 0;
}
function Ai(e) {
	e.prefix === "fa" && (e.prefix = "fas");
	var t = e.iconName,
		n = e.prefix || it();
	if (!!t)
		return (t = Ht(n, t) || t), is(hs.definitions, n, t) || is(Re.styles, n, t);
}
var hs = new Ju(),
	td = function () {
		(j.autoReplaceSvg = !1), (j.observeMutations = !1), vt("noAuto");
	},
	nd = {
		i2svg: function () {
			var t =
				arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			return Be
				? (vt("beforeI2svg", t), qe("pseudoElements2svg", t), qe("i2svg", t))
				: Promise.reject("Operation requires a DOM of some kind.");
		},
		watch: function () {
			var t =
					arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
				n = t.autoReplaceSvgRoot;
			j.autoReplaceSvg === !1 && (j.autoReplaceSvg = !0),
				(j.observeMutations = !0),
				Hu(function () {
					id({ autoReplaceSvgRoot: n }), vt("watch", t);
				});
		},
	},
	rd = {
		icon: function (t) {
			if (t === null) return null;
			if (un(t) === "object" && t.prefix && t.iconName)
				return {
					prefix: t.prefix,
					iconName: Ht(t.prefix, t.iconName) || t.iconName,
				};
			if (Array.isArray(t) && t.length === 2) {
				var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1],
					r = tr(t[0]);
				return { prefix: r, iconName: Ht(r, n) || n };
			}
			if (
				typeof t == "string" &&
				(t.indexOf("".concat(j.familyPrefix, "-")) > -1 || t.match(_u))
			) {
				var i = nr(t.split(" "), { skipLookups: !0 });
				return {
					prefix: i.prefix || it(),
					iconName: Ht(i.prefix, i.iconName) || i.iconName,
				};
			}
			if (typeof t == "string") {
				var a = it();
				return { prefix: a, iconName: Ht(a, t) || t };
			}
		},
	},
	we = {
		noAuto: td,
		config: j,
		dom: nd,
		parse: rd,
		library: hs,
		findIconDefinition: Ai,
		toHtml: hn,
	},
	id = function () {
		var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
			n = t.autoReplaceSvgRoot,
			r = n === void 0 ? ie : n;
		(Object.keys(Re.styles).length > 0 || j.autoFetchSvg) &&
			Be &&
			j.autoReplaceSvg &&
			we.dom.i2svg({ node: r });
	};
function rr(e, t) {
	return (
		Object.defineProperty(e, "abstract", { get: t }),
		Object.defineProperty(e, "html", {
			get: function () {
				return e.abstract.map(function (r) {
					return hn(r);
				});
			},
		}),
		Object.defineProperty(e, "node", {
			get: function () {
				if (!!Be) {
					var r = ie.createElement("div");
					return (r.innerHTML = e.html), r.children;
				}
			},
		}),
		e
	);
}
function ad(e) {
	var t = e.children,
		n = e.main,
		r = e.mask,
		i = e.attributes,
		a = e.styles,
		o = e.transform;
	if (hi(o) && n.found && !r.found) {
		var s = n.width,
			l = n.height,
			c = { x: s / l / 2, y: 0.5 };
		i.style = Zn(
			R(
				R({}, a),
				{},
				{
					"transform-origin": ""
						.concat(c.x + o.x / 16, "em ")
						.concat(c.y + o.y / 16, "em"),
				}
			)
		);
	}
	return [{ tag: "svg", attributes: i, children: t }];
}
function od(e) {
	var t = e.prefix,
		n = e.iconName,
		r = e.children,
		i = e.attributes,
		a = e.symbol,
		o = a === !0 ? "".concat(t, "-").concat(j.familyPrefix, "-").concat(n) : a;
	return [
		{
			tag: "svg",
			attributes: { style: "display: none;" },
			children: [
				{ tag: "symbol", attributes: R(R({}, i), {}, { id: o }), children: r },
			],
		},
	];
}
function Ei(e) {
	var t = e.icons,
		n = t.main,
		r = t.mask,
		i = e.prefix,
		a = e.iconName,
		o = e.transform,
		s = e.symbol,
		l = e.title,
		c = e.maskId,
		f = e.titleId,
		d = e.extra,
		h = e.watchable,
		v = h === void 0 ? !1 : h,
		k = r.found ? r : n,
		M = k.width,
		P = k.height,
		g = i === "fak",
		_ = [j.replacementClass, a ? "".concat(j.familyPrefix, "-").concat(a) : ""]
			.filter(function (ce) {
				return d.classes.indexOf(ce) === -1;
			})
			.filter(function (ce) {
				return ce !== "" || !!ce;
			})
			.concat(d.classes)
			.join(" "),
		N = {
			children: [],
			attributes: R(
				R({}, d.attributes),
				{},
				{
					"data-prefix": i,
					"data-icon": a,
					class: _,
					role: d.attributes.role || "img",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 ".concat(M, " ").concat(P),
				}
			),
		},
		D =
			g && !~d.classes.indexOf("fa-fw")
				? { width: "".concat((M / P) * 16 * 0.0625, "em") }
				: {};
	v && (N.attributes[pt] = ""),
		l &&
			(N.children.push({
				tag: "title",
				attributes: {
					id: N.attributes["aria-labelledby"] || "title-".concat(f || mn()),
				},
				children: [l],
			}),
			delete N.attributes.title);
	var K = R(
			R({}, N),
			{},
			{
				prefix: i,
				iconName: a,
				main: n,
				mask: r,
				maskId: c,
				transform: o,
				symbol: s,
				styles: R(R({}, D), d.styles),
			}
		),
		ne =
			r.found && n.found
				? qe("generateAbstractMask", K) || { children: [], attributes: {} }
				: qe("generateAbstractIcon", K) || { children: [], attributes: {} },
		se = ne.children,
		_e = ne.attributes;
	return (K.children = se), (K.attributes = _e), s ? od(K) : ad(K);
}
function ps(e) {
	var t = e.content,
		n = e.width,
		r = e.height,
		i = e.transform,
		a = e.title,
		o = e.extra,
		s = e.watchable,
		l = s === void 0 ? !1 : s,
		c = R(
			R(R({}, o.attributes), a ? { title: a } : {}),
			{},
			{ class: o.classes.join(" ") }
		);
	l && (c[pt] = "");
	var f = R({}, o.styles);
	hi(i) &&
		((f.transform = zu({
			transform: i,
			startCentered: !0,
			width: n,
			height: r,
		})),
		(f["-webkit-transform"] = f.transform));
	var d = Zn(f);
	d.length > 0 && (c.style = d);
	var h = [];
	return (
		h.push({ tag: "span", attributes: c, children: [t] }),
		a &&
			h.push({ tag: "span", attributes: { class: "sr-only" }, children: [a] }),
		h
	);
}
function sd(e) {
	var t = e.content,
		n = e.title,
		r = e.extra,
		i = R(
			R(R({}, r.attributes), n ? { title: n } : {}),
			{},
			{ class: r.classes.join(" ") }
		),
		a = Zn(r.styles);
	a.length > 0 && (i.style = a);
	var o = [];
	return (
		o.push({ tag: "span", attributes: i, children: [t] }),
		n &&
			o.push({ tag: "span", attributes: { class: "sr-only" }, children: [n] }),
		o
	);
}
var ki = Re.styles;
function Ci(e) {
	var t = e[0],
		n = e[1],
		r = e.slice(4),
		i = ii(r, 1),
		a = i[0],
		o = null;
	return (
		Array.isArray(a)
			? (o = {
					tag: "g",
					attributes: {
						class: "".concat(j.familyPrefix, "-").concat(gt.GROUP),
					},
					children: [
						{
							tag: "path",
							attributes: {
								class: "".concat(j.familyPrefix, "-").concat(gt.SECONDARY),
								fill: "currentColor",
								d: a[0],
							},
						},
						{
							tag: "path",
							attributes: {
								class: "".concat(j.familyPrefix, "-").concat(gt.PRIMARY),
								fill: "currentColor",
								d: a[1],
							},
						},
					],
			  })
			: (o = { tag: "path", attributes: { fill: "currentColor", d: a } }),
		{ found: !0, width: t, height: n, icon: o }
	);
}
var ld = { found: !1, width: 512, height: 512 };
function fd(e, t) {
	!Go &&
		!j.showMissingIcons &&
		e &&
		console.error(
			'Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.')
		);
}
function Oi(e, t) {
	var n = t;
	return (
		t === "fa" && j.styleDefault !== null && (t = it()),
		new Promise(function (r, i) {
			if ((qe("missingIconAbstract"), n === "fa")) {
				var a = ds(e) || {};
				(e = a.iconName || e), (t = a.prefix || t);
			}
			if (e && t && ki[t] && ki[t][e]) {
				var o = ki[t][e];
				return r(Ci(o));
			}
			fd(e, t),
				r(
					R(
						R({}, ld),
						{},
						{
							icon:
								j.showMissingIcons && e ? qe("missingIconAbstract") || {} : {},
						}
					)
				);
		})
	);
}
var gs = function () {},
	Pi =
		j.measurePerformance && Gn && Gn.mark && Gn.measure
			? Gn
			: { mark: gs, measure: gs },
	gn = 'FA "6.0.0-beta3"',
	cd = function (t) {
		return (
			Pi.mark("".concat(gn, " ").concat(t, " begins")),
			function () {
				return vs(t);
			}
		);
	},
	vs = function (t) {
		Pi.mark("".concat(gn, " ").concat(t, " ends")),
			Pi.measure(
				"".concat(gn, " ").concat(t),
				"".concat(gn, " ").concat(t, " begins"),
				"".concat(gn, " ").concat(t, " ends")
			);
	},
	Si = { begin: cd, end: vs },
	ir = function () {};
function bs(e) {
	var t = e.getAttribute ? e.getAttribute(pt) : null;
	return typeof t == "string";
}
function ud(e) {
	var t = e.getAttribute ? e.getAttribute(fi) : null,
		n = e.getAttribute ? e.getAttribute(ci) : null;
	return t && n;
}
function dd(e) {
	return (
		e &&
		e.classList &&
		e.classList.contains &&
		e.classList.contains(j.replacementClass)
	);
}
function md() {
	if (j.autoReplaceSvg === !0) return ar.replace;
	var e = ar[j.autoReplaceSvg];
	return e || ar.replace;
}
function hd(e) {
	return ie.createElementNS("http://www.w3.org/2000/svg", e);
}
function pd(e) {
	return ie.createElement(e);
}
function ys(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
		n = t.ceFn,
		r = n === void 0 ? (e.tag === "svg" ? hd : pd) : n;
	if (typeof e == "string") return ie.createTextNode(e);
	var i = r(e.tag);
	Object.keys(e.attributes || []).forEach(function (o) {
		i.setAttribute(o, e.attributes[o]);
	});
	var a = e.children || [];
	return (
		a.forEach(function (o) {
			i.appendChild(ys(o, { ceFn: r }));
		}),
		i
	);
}
function gd(e) {
	var t = " ".concat(e.outerHTML, " ");
	return (t = "".concat(t, "Font Awesome fontawesome.com ")), t;
}
var ar = {
	replace: function (t) {
		var n = t[0];
		if (n.parentNode)
			if (
				(t[1].forEach(function (i) {
					n.parentNode.insertBefore(ys(i), n);
				}),
				n.getAttribute(pt) === null && j.keepOriginalSource)
			) {
				var r = ie.createComment(gd(n));
				n.parentNode.replaceChild(r, n);
			} else n.remove();
	},
	nest: function (t) {
		var n = t[0],
			r = t[1];
		if (~mi(n).indexOf(j.replacementClass)) return ar.replace(t);
		var i = new RegExp("".concat(j.familyPrefix, "-.*"));
		if ((delete r[0].attributes.id, r[0].attributes.class)) {
			var a = r[0].attributes.class.split(" ").reduce(
				function (s, l) {
					return (
						l === j.replacementClass || l.match(i)
							? s.toSvg.push(l)
							: s.toNode.push(l),
						s
					);
				},
				{ toNode: [], toSvg: [] }
			);
			(r[0].attributes.class = a.toSvg.join(" ")),
				a.toNode.length === 0
					? n.removeAttribute("class")
					: n.setAttribute("class", a.toNode.join(" "));
		}
		var o = r.map(function (s) {
			return hn(s);
		}).join(`
`);
		n.setAttribute(pt, ""), (n.innerHTML = o);
	},
};
function xs(e) {
	e();
}
function ws(e, t) {
	var n = typeof t == "function" ? t : ir;
	if (e.length === 0) n();
	else {
		var r = xs;
		j.mutateApproach === yu && (r = nt.requestAnimationFrame || xs),
			r(function () {
				var i = md(),
					a = Si.begin("mutate");
				e.map(i), a(), n();
			});
	}
}
var Ri = !1;
function _s() {
	Ri = !0;
}
function Ii() {
	Ri = !1;
}
var or = null;
function As(e) {
	if (!!Ko && !!j.observeMutations) {
		var t = e.treeCallback,
			n = t === void 0 ? ir : t,
			r = e.nodeCallback,
			i = r === void 0 ? ir : r,
			a = e.pseudoElementsCallback,
			o = a === void 0 ? ir : a,
			s = e.observeMutationsRoot,
			l = s === void 0 ? ie : s;
		(or = new Ko(function (c) {
			if (!Ri) {
				var f = it();
				$t(c).forEach(function (d) {
					if (
						(d.type === "childList" &&
							d.addedNodes.length > 0 &&
							!bs(d.addedNodes[0]) &&
							(j.searchPseudoElements && o(d.target), n(d.target)),
						d.type === "attributes" &&
							d.target.parentNode &&
							j.searchPseudoElements &&
							o(d.target.parentNode),
						d.type === "attributes" &&
							bs(d.target) &&
							~Cu.indexOf(d.attributeName))
					)
						if (d.attributeName === "class" && ud(d.target)) {
							var h = nr(mi(d.target)),
								v = h.prefix,
								k = h.iconName;
							d.target.setAttribute(fi, v || f),
								k && d.target.setAttribute(ci, k);
						} else dd(d.target) && i(d.target);
				});
			}
		})),
			!!Be &&
				or.observe(l, {
					childList: !0,
					attributes: !0,
					characterData: !0,
					subtree: !0,
				});
	}
}
function vd() {
	!or || or.disconnect();
}
function bd(e) {
	var t = e.getAttribute("style"),
		n = [];
	return (
		t &&
			(n = t.split(";").reduce(function (r, i) {
				var a = i.split(":"),
					o = a[0],
					s = a.slice(1);
				return o && s.length > 0 && (r[o] = s.join(":").trim()), r;
			}, {})),
		n
	);
}
function yd(e) {
	var t = e.getAttribute("data-prefix"),
		n = e.getAttribute("data-icon"),
		r = e.innerText !== void 0 ? e.innerText.trim() : "",
		i = nr(mi(e));
	return (
		i.prefix || (i.prefix = it()),
		t && n && ((i.prefix = t), (i.iconName = n)),
		(i.iconName && i.prefix) ||
			(i.prefix &&
				r.length > 0 &&
				(i.iconName =
					Gu(i.prefix, e.innerText) || xi(i.prefix, vi(e.innerText)))),
		i
	);
}
function xd(e) {
	var t = $t(e.attributes).reduce(function (i, a) {
			return (
				i.name !== "class" && i.name !== "style" && (i[a.name] = a.value), i
			);
		}, {}),
		n = e.getAttribute("title"),
		r = e.getAttribute("data-fa-title-id");
	return (
		j.autoA11y &&
			(n
				? (t["aria-labelledby"] = ""
						.concat(j.replacementClass, "-title-")
						.concat(r || mn()))
				: ((t["aria-hidden"] = "true"), (t.focusable = "false"))),
		t
	);
}
function wd() {
	return {
		iconName: null,
		title: null,
		titleId: null,
		prefix: null,
		transform: Le,
		symbol: !1,
		mask: { iconName: null, prefix: null, rest: [] },
		maskId: null,
		extra: { classes: [], styles: {}, attributes: {} },
	};
}
function Es(e) {
	var t =
			arguments.length > 1 && arguments[1] !== void 0
				? arguments[1]
				: { styleParser: !0 },
		n = yd(e),
		r = n.iconName,
		i = n.prefix,
		a = n.rest,
		o = xd(e),
		s = _i("parseNodeAttributes", {}, e),
		l = t.styleParser ? bd(e) : [];
	return R(
		{
			iconName: r,
			title: e.getAttribute("title"),
			titleId: e.getAttribute("data-fa-title-id"),
			prefix: i,
			transform: Le,
			mask: { iconName: null, prefix: null, rest: [] },
			maskId: null,
			symbol: !1,
			extra: { classes: a, styles: l, attributes: o },
		},
		s
	);
}
var _d = Re.styles;
function ks(e) {
	var t = j.autoReplaceSvg === "nest" ? Es(e, { styleParser: !1 }) : Es(e);
	return ~t.extra.classes.indexOf(Qo)
		? qe("generateLayersText", e, t)
		: qe("generateSvgReplacementMutation", e, t);
}
function Cs(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
	if (!Be) return Promise.resolve();
	var n = ie.documentElement.classList,
		r = function (d) {
			return n.add("".concat(Xo, "-").concat(d));
		},
		i = function (d) {
			return n.remove("".concat(Xo, "-").concat(d));
		},
		a = j.autoFetchSvg ? Object.keys(ui) : Object.keys(_d),
		o = [".".concat(Qo, ":not([").concat(pt, "])")]
			.concat(
				a.map(function (f) {
					return ".".concat(f, ":not([").concat(pt, "])");
				})
			)
			.join(", ");
	if (o.length === 0) return Promise.resolve();
	var s = [];
	try {
		s = $t(e.querySelectorAll(o));
	} catch {}
	if (s.length > 0) r("pending"), i("complete");
	else return Promise.resolve();
	var l = Si.begin("onTree"),
		c = s.reduce(function (f, d) {
			try {
				var h = ks(d);
				h && f.push(h);
			} catch (v) {
				Go || (v.name === "MissingIcon" && console.error(v));
			}
			return f;
		}, []);
	return new Promise(function (f, d) {
		Promise.all(c)
			.then(function (h) {
				ws(h, function () {
					r("active"),
						r("complete"),
						i("pending"),
						typeof t == "function" && t(),
						l(),
						f();
				});
			})
			.catch(function (h) {
				l(), d(h);
			});
	});
}
function Ad(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
	ks(e).then(function (n) {
		n && ws([n], t);
	});
}
function Ed(e) {
	return function (t) {
		var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
			r = (t || {}).icon ? t : Ai(t || {}),
			i = n.mask;
		return (
			i && (i = (i || {}).icon ? i : Ai(i || {})),
			e(r, R(R({}, n), {}, { mask: i }))
		);
	};
}
var kd = function (t) {
		var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
			r = n.transform,
			i = r === void 0 ? Le : r,
			a = n.symbol,
			o = a === void 0 ? !1 : a,
			s = n.mask,
			l = s === void 0 ? null : s,
			c = n.maskId,
			f = c === void 0 ? null : c,
			d = n.title,
			h = d === void 0 ? null : d,
			v = n.titleId,
			k = v === void 0 ? null : v,
			M = n.classes,
			P = M === void 0 ? [] : M,
			g = n.attributes,
			_ = g === void 0 ? {} : g,
			N = n.styles,
			D = N === void 0 ? {} : N;
		if (!!t) {
			var K = t.prefix,
				ne = t.iconName,
				se = t.icon;
			return rr(R({ type: "icon" }, t), function () {
				return (
					vt("beforeDOMElementCreation", { iconDefinition: t, params: n }),
					j.autoA11y &&
						(h
							? (_["aria-labelledby"] = ""
									.concat(j.replacementClass, "-title-")
									.concat(k || mn()))
							: ((_["aria-hidden"] = "true"), (_.focusable = "false"))),
					Ei({
						icons: {
							main: Ci(se),
							mask: l
								? Ci(l.icon)
								: { found: !1, width: null, height: null, icon: {} },
						},
						prefix: K,
						iconName: ne,
						transform: R(R({}, Le), i),
						symbol: o,
						title: h,
						maskId: f,
						titleId: k,
						extra: { attributes: _, styles: D, classes: P },
					})
				);
			});
		}
	},
	Cd = {
		mixout: function () {
			return { icon: Ed(kd) };
		},
		hooks: function () {
			return {
				mutationObserverCallbacks: function (n) {
					return (n.treeCallback = Cs), (n.nodeCallback = Ad), n;
				},
			};
		},
		provides: function (t) {
			(t.i2svg = function (n) {
				var r = n.node,
					i = r === void 0 ? ie : r,
					a = n.callback,
					o = a === void 0 ? function () {} : a;
				return Cs(i, o);
			}),
				(t.generateSvgReplacementMutation = function (n, r) {
					var i = r.iconName,
						a = r.title,
						o = r.titleId,
						s = r.prefix,
						l = r.transform,
						c = r.symbol,
						f = r.mask,
						d = r.maskId,
						h = r.extra;
					return new Promise(function (v, k) {
						Promise.all([
							Oi(i, s),
							f.iconName
								? Oi(f.iconName, f.prefix)
								: Promise.resolve({
										found: !1,
										width: 512,
										height: 512,
										icon: {},
								  }),
						])
							.then(function (M) {
								var P = ii(M, 2),
									g = P[0],
									_ = P[1];
								v([
									n,
									Ei({
										icons: { main: g, mask: _ },
										prefix: s,
										iconName: i,
										transform: l,
										symbol: c,
										maskId: d,
										title: a,
										titleId: o,
										extra: h,
										watchable: !0,
									}),
								]);
							})
							.catch(k);
					});
				}),
				(t.generateAbstractIcon = function (n) {
					var r = n.children,
						i = n.attributes,
						a = n.main,
						o = n.transform,
						s = n.styles,
						l = Zn(s);
					l.length > 0 && (i.style = l);
					var c;
					return (
						hi(o) &&
							(c = qe("generateAbstractTransformGrouping", {
								main: a,
								transform: o,
								containerWidth: a.width,
								iconWidth: a.width,
							})),
						r.push(c || a.icon),
						{ children: r, attributes: i }
					);
				});
		},
	},
	Od = {
		mixout: function () {
			return {
				layer: function (n) {
					var r =
							arguments.length > 1 && arguments[1] !== void 0
								? arguments[1]
								: {},
						i = r.classes,
						a = i === void 0 ? [] : i;
					return rr({ type: "layer" }, function () {
						vt("beforeDOMElementCreation", { assembler: n, params: r });
						var o = [];
						return (
							n(function (s) {
								Array.isArray(s)
									? s.map(function (l) {
											o = o.concat(l.abstract);
									  })
									: (o = o.concat(s.abstract));
							}),
							[
								{
									tag: "span",
									attributes: {
										class: ["".concat(j.familyPrefix, "-layers")]
											.concat(Xn(a))
											.join(" "),
									},
									children: o,
								},
							]
						);
					});
				},
			};
		},
	},
	Pd = {
		mixout: function () {
			return {
				counter: function (n) {
					var r =
							arguments.length > 1 && arguments[1] !== void 0
								? arguments[1]
								: {},
						i = r.title,
						a = i === void 0 ? null : i,
						o = r.classes,
						s = o === void 0 ? [] : o,
						l = r.attributes,
						c = l === void 0 ? {} : l,
						f = r.styles,
						d = f === void 0 ? {} : f;
					return rr({ type: "counter", content: n }, function () {
						return (
							vt("beforeDOMElementCreation", { content: n, params: r }),
							sd({
								content: n.toString(),
								title: a,
								extra: {
									attributes: c,
									styles: d,
									classes: [
										"".concat(j.familyPrefix, "-layers-counter"),
									].concat(Xn(s)),
								},
							})
						);
					});
				},
			};
		},
	},
	Sd = {
		mixout: function () {
			return {
				text: function (n) {
					var r =
							arguments.length > 1 && arguments[1] !== void 0
								? arguments[1]
								: {},
						i = r.transform,
						a = i === void 0 ? Le : i,
						o = r.title,
						s = o === void 0 ? null : o,
						l = r.classes,
						c = l === void 0 ? [] : l,
						f = r.attributes,
						d = f === void 0 ? {} : f,
						h = r.styles,
						v = h === void 0 ? {} : h;
					return rr({ type: "text", content: n }, function () {
						return (
							vt("beforeDOMElementCreation", { content: n, params: r }),
							ps({
								content: n,
								transform: R(R({}, Le), a),
								title: s,
								extra: {
									attributes: d,
									styles: v,
									classes: ["".concat(j.familyPrefix, "-layers-text")].concat(
										Xn(c)
									),
								},
							})
						);
					});
				},
			};
		},
		provides: function (t) {
			t.generateLayersText = function (n, r) {
				var i = r.title,
					a = r.transform,
					o = r.extra,
					s = null,
					l = null;
				if (qo) {
					var c = parseInt(getComputedStyle(n).fontSize, 10),
						f = n.getBoundingClientRect();
					(s = f.width / c), (l = f.height / c);
				}
				return (
					j.autoA11y && !i && (o.attributes["aria-hidden"] = "true"),
					Promise.resolve([
						n,
						ps({
							content: n.innerHTML,
							width: s,
							height: l,
							transform: a,
							title: i,
							extra: o,
							watchable: !0,
						}),
					])
				);
			};
		},
	},
	Rd = new RegExp('"', "ug"),
	Os = [1105920, 1112319];
function Id(e) {
	var t = e.replace(Rd, ""),
		n = Wu(t, 0),
		r = n >= Os[0] && n <= Os[1],
		i = t.length === 2 ? t[0] === t[1] : !1;
	return { value: vi(i ? t[0] : t), isSecondary: r || i };
}
function Ps(e, t) {
	var n = "".concat(bu).concat(t.replace(":", "-"));
	return new Promise(function (r, i) {
		if (e.getAttribute(n) !== null) return r();
		var a = $t(e.children),
			o = a.filter(function (ne) {
				return ne.getAttribute(li) === t;
			})[0],
			s = nt.getComputedStyle(e, t),
			l = s.getPropertyValue("font-family").match(Au),
			c = s.getPropertyValue("font-weight"),
			f = s.getPropertyValue("content");
		if (o && !l) return e.removeChild(o), r();
		if (l && f !== "none" && f !== "") {
			var d = s.getPropertyValue("content"),
				h = ~[
					"Solid",
					"Regular",
					"Light",
					"Thin",
					"Duotone",
					"Brands",
					"Kit",
				].indexOf(l[2])
					? Qn[l[2].toLowerCase()]
					: Eu[c],
				v = Id(d),
				k = v.value,
				M = v.isSecondary,
				P = l[0].startsWith("FontAwesome"),
				g = xi(h, k),
				_ = g;
			if (P) {
				var N = Qu(k);
				N.iconName && N.prefix && ((g = N.iconName), (h = N.prefix));
			}
			if (
				g &&
				!M &&
				(!o || o.getAttribute(fi) !== h || o.getAttribute(ci) !== _)
			) {
				e.setAttribute(n, _), o && e.removeChild(o);
				var D = wd(),
					K = D.extra;
				(K.attributes[li] = t),
					Oi(g, h)
						.then(function (ne) {
							var se = Ei(
									R(
										R({}, D),
										{},
										{
											icons: { main: ne, mask: wi() },
											prefix: h,
											iconName: _,
											extra: K,
											watchable: !0,
										}
									)
								),
								_e = ie.createElement("svg");
							t === "::before"
								? e.insertBefore(_e, e.firstChild)
								: e.appendChild(_e),
								(_e.outerHTML = se.map(function (ce) {
									return hn(ce);
								}).join(`
`)),
								e.removeAttribute(n),
								r();
						})
						.catch(i);
			} else r();
		} else r();
	});
}
function Td(e) {
	return Promise.all([Ps(e, "::before"), Ps(e, "::after")]);
}
function Nd(e) {
	return (
		e.parentNode !== document.head &&
		!~xu.indexOf(e.tagName.toUpperCase()) &&
		!e.getAttribute(li) &&
		(!e.parentNode || e.parentNode.tagName !== "svg")
	);
}
function Ss(e) {
	if (!!Be)
		return new Promise(function (t, n) {
			var r = $t(e.querySelectorAll("*")).filter(Nd).map(Td),
				i = Si.begin("searchPseudoElements");
			_s(),
				Promise.all(r)
					.then(function () {
						i(), Ii(), t();
					})
					.catch(function () {
						i(), Ii(), n();
					});
		});
}
var Md = {
		hooks: function () {
			return {
				mutationObserverCallbacks: function (n) {
					return (n.pseudoElementsCallback = Ss), n;
				},
			};
		},
		provides: function (t) {
			t.pseudoElements2svg = function (n) {
				var r = n.node,
					i = r === void 0 ? ie : r;
				j.searchPseudoElements && Ss(i);
			};
		},
	},
	Rs = !1,
	Fd = {
		mixout: function () {
			return {
				dom: {
					unwatch: function () {
						_s(), (Rs = !0);
					},
				},
			};
		},
		hooks: function () {
			return {
				bootstrap: function () {
					As(_i("mutationObserverCallbacks", {}));
				},
				noAuto: function () {
					vd();
				},
				watch: function (n) {
					var r = n.observeMutationsRoot;
					Rs
						? Ii()
						: As(_i("mutationObserverCallbacks", { observeMutationsRoot: r }));
				},
			};
		},
	},
	Is = function (t) {
		var n = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
		return t
			.toLowerCase()
			.split(" ")
			.reduce(function (r, i) {
				var a = i.toLowerCase().split("-"),
					o = a[0],
					s = a.slice(1).join("-");
				if (o && s === "h") return (r.flipX = !0), r;
				if (o && s === "v") return (r.flipY = !0), r;
				if (((s = parseFloat(s)), isNaN(s))) return r;
				switch (o) {
					case "grow":
						r.size = r.size + s;
						break;
					case "shrink":
						r.size = r.size - s;
						break;
					case "left":
						r.x = r.x - s;
						break;
					case "right":
						r.x = r.x + s;
						break;
					case "up":
						r.y = r.y - s;
						break;
					case "down":
						r.y = r.y + s;
						break;
					case "rotate":
						r.rotate = r.rotate + s;
						break;
				}
				return r;
			}, n);
	},
	Ld = {
		mixout: function () {
			return {
				parse: {
					transform: function (n) {
						return Is(n);
					},
				},
			};
		},
		hooks: function () {
			return {
				parseNodeAttributes: function (n, r) {
					var i = r.getAttribute("data-fa-transform");
					return i && (n.transform = Is(i)), n;
				},
			};
		},
		provides: function (t) {
			t.generateAbstractTransformGrouping = function (n) {
				var r = n.main,
					i = n.transform,
					a = n.containerWidth,
					o = n.iconWidth,
					s = { transform: "translate(".concat(a / 2, " 256)") },
					l = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "),
					c = "scale("
						.concat((i.size / 16) * (i.flipX ? -1 : 1), ", ")
						.concat((i.size / 16) * (i.flipY ? -1 : 1), ") "),
					f = "rotate(".concat(i.rotate, " 0 0)"),
					d = { transform: "".concat(l, " ").concat(c, " ").concat(f) },
					h = { transform: "translate(".concat((o / 2) * -1, " -256)") },
					v = { outer: s, inner: d, path: h };
				return {
					tag: "g",
					attributes: R({}, v.outer),
					children: [
						{
							tag: "g",
							attributes: R({}, v.inner),
							children: [
								{
									tag: r.icon.tag,
									children: r.icon.children,
									attributes: R(R({}, r.icon.attributes), v.path),
								},
							],
						},
					],
				};
			};
		},
	},
	Ti = { x: 0, y: 0, width: "100%", height: "100%" };
function Ts(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
	return (
		e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e
	);
}
function zd(e) {
	return e.tag === "g" ? e.children : [e];
}
var jd = {
		hooks: function () {
			return {
				parseNodeAttributes: function (n, r) {
					var i = r.getAttribute("data-fa-mask"),
						a = i
							? nr(
									i.split(" ").map(function (o) {
										return o.trim();
									})
							  )
							: wi();
					return (
						a.prefix || (a.prefix = it()),
						(n.mask = a),
						(n.maskId = r.getAttribute("data-fa-mask-id")),
						n
					);
				},
			};
		},
		provides: function (t) {
			t.generateAbstractMask = function (n) {
				var r = n.children,
					i = n.attributes,
					a = n.main,
					o = n.mask,
					s = n.maskId,
					l = n.transform,
					c = a.width,
					f = a.icon,
					d = o.width,
					h = o.icon,
					v = Lu({ transform: l, containerWidth: d, iconWidth: c }),
					k = { tag: "rect", attributes: R(R({}, Ti), {}, { fill: "white" }) },
					M = f.children ? { children: f.children.map(Ts) } : {},
					P = {
						tag: "g",
						attributes: R({}, v.inner),
						children: [
							Ts(
								R({ tag: f.tag, attributes: R(R({}, f.attributes), v.path) }, M)
							),
						],
					},
					g = { tag: "g", attributes: R({}, v.outer), children: [P] },
					_ = "mask-".concat(s || mn()),
					N = "clip-".concat(s || mn()),
					D = {
						tag: "mask",
						attributes: R(
							R({}, Ti),
							{},
							{
								id: _,
								maskUnits: "userSpaceOnUse",
								maskContentUnits: "userSpaceOnUse",
							}
						),
						children: [k, g],
					},
					K = {
						tag: "defs",
						children: [
							{ tag: "clipPath", attributes: { id: N }, children: zd(h) },
							D,
						],
					};
				return (
					r.push(K, {
						tag: "rect",
						attributes: R(
							{
								fill: "currentColor",
								"clip-path": "url(#".concat(N, ")"),
								mask: "url(#".concat(_, ")"),
							},
							Ti
						),
					}),
					{ children: r, attributes: i }
				);
			};
		},
	},
	Dd = {
		provides: function (t) {
			var n = !1;
			nt.matchMedia &&
				(n = nt.matchMedia("(prefers-reduced-motion: reduce)").matches),
				(t.missingIconAbstract = function () {
					var r = [],
						i = { fill: "currentColor" },
						a = { attributeType: "XML", repeatCount: "indefinite", dur: "2s" };
					r.push({
						tag: "path",
						attributes: R(
							R({}, i),
							{},
							{
								d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
							}
						),
					});
					var o = R(R({}, a), {}, { attributeName: "opacity" }),
						s = {
							tag: "circle",
							attributes: R(R({}, i), {}, { cx: "256", cy: "364", r: "28" }),
							children: [],
						};
					return (
						n ||
							s.children.push(
								{
									tag: "animate",
									attributes: R(
										R({}, a),
										{},
										{ attributeName: "r", values: "28;14;28;28;14;28;" }
									),
								},
								{
									tag: "animate",
									attributes: R(R({}, o), {}, { values: "1;0;1;1;0;1;" }),
								}
							),
						r.push(s),
						r.push({
							tag: "path",
							attributes: R(
								R({}, i),
								{},
								{
									opacity: "1",
									d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
								}
							),
							children: n
								? []
								: [
										{
											tag: "animate",
											attributes: R(R({}, o), {}, { values: "1;0;0;0;0;1;" }),
										},
								  ],
						}),
						n ||
							r.push({
								tag: "path",
								attributes: R(
									R({}, i),
									{},
									{
										opacity: "0",
										d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
									}
								),
								children: [
									{
										tag: "animate",
										attributes: R(R({}, o), {}, { values: "0;0;1;1;0;0;" }),
									},
								],
							}),
						{ tag: "g", attributes: { class: "missing" }, children: r }
					);
				});
		},
	},
	$d = {
		hooks: function () {
			return {
				parseNodeAttributes: function (n, r) {
					var i = r.getAttribute("data-fa-symbol"),
						a = i === null ? !1 : i === "" ? !0 : i;
					return (n.symbol = a), n;
				},
			};
		},
	},
	Hd = [Du, Cd, Od, Pd, Sd, Md, Fd, Ld, jd, Dd, $d];
ed(Hd, { mixoutsTo: we });
we.noAuto;
var Ns = we.config;
we.library;
we.dom;
var Ms = we.parse;
we.findIconDefinition;
we.toHtml;
var Ud = we.icon;
we.layer;
var Bd = we.text;
we.counter;
var Wd =
	typeof window != "undefined"
		? window
		: typeof global != "undefined"
		? global
		: typeof self != "undefined"
		? self
		: {};
function Kd(e, t) {
	return (t = { exports: {} }), e(t, t.exports), t.exports;
}
var qd = Kd(function (e) {
		(function (t) {
			var n = function (g, _, N) {
					if (!c(_) || d(_) || h(_) || v(_) || l(_)) return _;
					var D,
						K = 0,
						ne = 0;
					if (f(_))
						for (D = [], ne = _.length; K < ne; K++) D.push(n(g, _[K], N));
					else {
						D = {};
						for (var se in _)
							Object.prototype.hasOwnProperty.call(_, se) &&
								(D[g(se, N)] = n(g, _[se], N));
					}
					return D;
				},
				r = function (g, _) {
					_ = _ || {};
					var N = _.separator || "_",
						D = _.split || /(?=[A-Z])/;
					return g.split(D).join(N);
				},
				i = function (g) {
					return k(g)
						? g
						: ((g = g.replace(/[\-_\s]+(.)?/g, function (_, N) {
								return N ? N.toUpperCase() : "";
						  })),
						  g.substr(0, 1).toLowerCase() + g.substr(1));
				},
				a = function (g) {
					var _ = i(g);
					return _.substr(0, 1).toUpperCase() + _.substr(1);
				},
				o = function (g, _) {
					return r(g, _).toLowerCase();
				},
				s = Object.prototype.toString,
				l = function (g) {
					return typeof g == "function";
				},
				c = function (g) {
					return g === Object(g);
				},
				f = function (g) {
					return s.call(g) == "[object Array]";
				},
				d = function (g) {
					return s.call(g) == "[object Date]";
				},
				h = function (g) {
					return s.call(g) == "[object RegExp]";
				},
				v = function (g) {
					return s.call(g) == "[object Boolean]";
				},
				k = function (g) {
					return (g = g - 0), g === g;
				},
				M = function (g, _) {
					var N = _ && "process" in _ ? _.process : _;
					return typeof N != "function"
						? g
						: function (D, K) {
								return N(D, g, K);
						  };
				},
				P = {
					camelize: i,
					decamelize: o,
					pascalize: a,
					depascalize: o,
					camelizeKeys: function (g, _) {
						return n(M(i, _), g);
					},
					decamelizeKeys: function (g, _) {
						return n(M(o, _), g, _);
					},
					pascalizeKeys: function (g, _) {
						return n(M(a, _), g);
					},
					depascalizeKeys: function () {
						return this.decamelizeKeys.apply(this, arguments);
					},
				};
			e.exports ? (e.exports = P) : (t.humps = P);
		})(Wd);
	}),
	Yd =
		typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
			? function (e) {
					return typeof e;
			  }
			: function (e) {
					return e &&
						typeof Symbol == "function" &&
						e.constructor === Symbol &&
						e !== Symbol.prototype
						? "symbol"
						: typeof e;
			  },
	vn = function (e, t, n) {
		return (
			t in e
				? Object.defineProperty(e, t, {
						value: n,
						enumerable: !0,
						configurable: !0,
						writable: !0,
				  })
				: (e[t] = n),
			e
		);
	},
	sr =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var r in n)
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
			}
			return e;
		},
	Vd = function (e, t) {
		var n = {};
		for (var r in e)
			t.indexOf(r) >= 0 ||
				!Object.prototype.hasOwnProperty.call(e, r) ||
				(n[r] = e[r]);
		return n;
	},
	Ni = function (e) {
		if (Array.isArray(e)) {
			for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
			return n;
		} else return Array.from(e);
	};
function Xd(e) {
	return e
		.split(";")
		.map(function (t) {
			return t.trim();
		})
		.filter(function (t) {
			return t;
		})
		.reduce(function (t, n) {
			var r = n.indexOf(":"),
				i = qd.camelize(n.slice(0, r)),
				a = n.slice(r + 1).trim();
			return (t[i] = a), t;
		}, {});
}
function Gd(e) {
	return e.split(/\s+/).reduce(function (t, n) {
		return (t[n] = !0), t;
	}, {});
}
function Mi(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
		n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
	if (typeof e == "string") return e;
	var r = (e.children || []).map(function (l) {
			return Mi(l);
		}),
		i = Object.keys(e.attributes || {}).reduce(
			function (l, c) {
				var f = e.attributes[c];
				switch (c) {
					case "class":
						l.class = Gd(f);
						break;
					case "style":
						l.style = Xd(f);
						break;
					default:
						l.attrs[c] = f;
				}
				return l;
			},
			{ attrs: {}, class: {}, style: {} }
		);
	n.class;
	var a = n.style,
		o = a === void 0 ? {} : a,
		s = Vd(n, ["class", "style"]);
	return Kn(
		e.tag,
		sr({}, t, { class: i.class, style: sr({}, i.style, o) }, i.attrs, s),
		r
	);
}
var Fs = !1;
try {
	Fs = !0;
} catch {}
function Qd() {
	if (!Fs && console && typeof console.error == "function") {
		var e;
		(e = console).error.apply(e, arguments);
	}
}
function bn(e, t) {
	return (Array.isArray(t) && t.length > 0) || (!Array.isArray(t) && t)
		? vn({}, e, t)
		: {};
}
function Jd(e) {
	var t,
		n =
			((t = {
				"fa-spin": e.spin,
				"fa-pulse": e.pulse,
				"fa-fw": e.fixedWidth,
				"fa-border": e.border,
				"fa-li": e.listItem,
				"fa-inverse": e.inverse,
				"fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
				"fa-flip-vertical": e.flip === "vertical" || e.flip === "both",
			}),
			vn(t, "fa-" + e.size, e.size !== null),
			vn(t, "fa-rotate-" + e.rotation, e.rotation !== null),
			vn(t, "fa-pull-" + e.pull, e.pull !== null),
			vn(t, "fa-swap-opacity", e.swapOpacity),
			t);
	return Object.keys(n)
		.map(function (r) {
			return n[r] ? r : null;
		})
		.filter(function (r) {
			return r;
		});
}
function Ls(e) {
	if (e === null) return null;
	if (
		(typeof e == "undefined" ? "undefined" : Yd(e)) === "object" &&
		e.prefix &&
		e.iconName
	)
		return e;
	if (Array.isArray(e) && e.length === 2)
		return { prefix: e[0], iconName: e[1] };
	if (typeof e == "string") return { prefix: "fas", iconName: e };
}
var fm = Qt({
	name: "FontAwesomeIcon",
	props: {
		border: { type: Boolean, default: !1 },
		fixedWidth: { type: Boolean, default: !1 },
		flip: {
			type: String,
			default: null,
			validator: function (t) {
				return ["horizontal", "vertical", "both"].indexOf(t) > -1;
			},
		},
		icon: { type: [Object, Array, String], required: !0 },
		mask: { type: [Object, Array, String], default: null },
		listItem: { type: Boolean, default: !1 },
		pull: {
			type: String,
			default: null,
			validator: function (t) {
				return ["right", "left"].indexOf(t) > -1;
			},
		},
		pulse: { type: Boolean, default: !1 },
		rotation: {
			type: [String, Number],
			default: null,
			validator: function (t) {
				return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
			},
		},
		swapOpacity: { type: Boolean, default: !1 },
		size: {
			type: String,
			default: null,
			validator: function (t) {
				return (
					[
						"lg",
						"xs",
						"sm",
						"1x",
						"2x",
						"3x",
						"4x",
						"5x",
						"6x",
						"7x",
						"8x",
						"9x",
						"10x",
					].indexOf(t) > -1
				);
			},
		},
		spin: { type: Boolean, default: !1 },
		transform: { type: [String, Object], default: null },
		symbol: { type: [Boolean, String], default: !1 },
		title: { type: String, default: null },
		inverse: { type: Boolean, default: !1 },
	},
	setup: function (t, n) {
		var r = n.attrs,
			i = oe(function () {
				return Ls(t.icon);
			}),
			a = oe(function () {
				return bn("classes", Jd(t));
			}),
			o = oe(function () {
				return bn(
					"transform",
					typeof t.transform == "string"
						? Ms.transform(t.transform)
						: t.transform
				);
			}),
			s = oe(function () {
				return bn("mask", Ls(t.mask));
			}),
			l = oe(function () {
				return Ud(
					i.value,
					sr({}, a.value, o.value, s.value, {
						symbol: t.symbol,
						title: t.title,
					})
				);
			});
		on(
			l,
			function (f) {
				if (!f)
					return Qd("Could not find one or more icon(s)", i.value, s.value);
			},
			{ immediate: !0 }
		);
		var c = oe(function () {
			return l.value ? Mi(l.value.abstract[0], {}, r) : null;
		});
		return function () {
			return c.value;
		};
	},
});
Qt({
	name: "FontAwesomeLayers",
	props: { fixedWidth: { type: Boolean, default: !1 } },
	setup: function (t, n) {
		var r = n.slots,
			i = Ns.familyPrefix,
			a = oe(function () {
				return [i + "-layers"].concat(Ni(t.fixedWidth ? [i + "-fw"] : []));
			});
		return function () {
			return Kn("div", { class: a.value }, r.default ? r.default() : []);
		};
	},
});
Qt({
	name: "FontAwesomeLayersText",
	props: {
		value: { type: [String, Number], default: "" },
		transform: { type: [String, Object], default: null },
		counter: { type: Boolean, default: !1 },
		position: {
			type: String,
			default: null,
			validator: function (t) {
				return (
					["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) >
					-1
				);
			},
		},
	},
	setup: function (t, n) {
		var r = n.attrs,
			i = Ns.familyPrefix,
			a = oe(function () {
				return bn(
					"classes",
					[].concat(
						Ni(t.counter ? [i + "-layers-counter"] : []),
						Ni(t.position ? [i + "-layers-" + t.position] : [])
					)
				);
			}),
			o = oe(function () {
				return bn(
					"transform",
					typeof t.transform == "string"
						? Ms.transform(t.transform)
						: t.transform
				);
			}),
			s = oe(function () {
				var c = Bd(t.value.toString(), sr({}, o.value, a.value)),
					f = c.abstract;
				return (
					t.counter &&
						(f[0].attributes.class = f[0].attributes.class.replace(
							"fa-layers-text",
							""
						)),
					f[0]
				);
			}),
			l = oe(function () {
				return Mi(s.value, {}, r);
			});
		return function () {
			return l.value;
		};
	},
});
export {
	fm as F,
	vf as a,
	$a as b,
	tm as c,
	Qt as d,
	em as e,
	xf as f,
	ve as g,
	lm as h,
	Ge as i,
	sm as j,
	kl as k,
	oe as l,
	nm as m,
	ur as n,
	pf as o,
	Nn as p,
	im as q,
	rm as r,
	om as s,
	Zd as t,
	Gt as u,
	am as v,
	Il as w,
};
