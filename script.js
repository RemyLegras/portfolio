var br = Object.defineProperty;
var Ni = Object.getOwnPropertySymbols;
var Tr = Object.prototype.hasOwnProperty,
  Sr = Object.prototype.propertyIsEnumerable;
var Xt = (a, e, t) =>
    e in a
      ? br(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (a[e] = t),
  Vt = (a, e) => {
    for (var t in e || (e = {})) Tr.call(e, t) && Xt(a, t, e[t]);
    if (Ni) for (var t of Ni(e)) Sr.call(e, t) && Xt(a, t, e[t]);
    return a;
  };
var St = (a, e, t) => (Xt(a, typeof e != "symbol" ? e + "" : e, t), t);
import {
  G as Pr,
  S as Gi,
  D as Ui,
  a as kr,
  F as Cr,
  R as Mr,
  E as Dr,
  T as Mt,
  O as Er,
  P as Lr,
  A as qi,
  b as Fr,
  c as Or,
  U as Ar,
  V as cs,
  d as Rr,
  W as Ir,
  L as Te,
  e as Br,
  f as zr,
  N as Nr,
  g as Gr,
  h as Ur,
  C as qr,
  i as Wr,
  j as ds,
  k as Yr,
  l as Xr,
  m as He,
  M as E,
  n as Vr,
  o as Ze,
  p as je,
  q as fs,
  r as Wi,
  s as Hr,
  B as ms,
  t as ps,
  u as jr,
  v as $r,
  w as Ot,
  x as Kr,
  y as gs,
  z as Zr,
  H as Qr,
  I as Jr,
  J as en,
  K as tn,
  Q as sn,
  X as rn,
  Y as Yi,
  Z as nn,
  _ as on,
} from "./vendor.js";
const an = function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const n of r.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && i(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerpolicy && (r.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = t(s);
    fetch(s.href, r);
  }
};
an();
class ln {
  constructor() {
    this.instance = new Pr({ width: 320, title: "debug" });
    const e = window.document.styleSheets[0];
    e.insertRule(
      `
            .lil-gui .lil-gui > .children
            {
                border: none;
                margin-left: var(--folder-indent);
                border-left: 2px solid var(--widget-color);
            }
        `,
      e.cssRules.length
    ),
      e.insertRule(
        `
            .lil-gui.root > .children > .lil-gui > .title
            {
                border-width: 1px 0 0 0;
            }
        `,
        e.cssRules.length
      ),
      (this.tree = {}),
      (this.tree.folder = this.instance),
      (this.tree.children = {});
  }
  getFolder(e) {
    const t = e.split("/");
    let i = this.tree;
    for (const s of t) {
      let r = i.children[s];
      r ||
        ((r = {}),
        (r.folder = i.folder.addFolder(s)),
        r.folder.close(),
        (r.children = {})),
        (i.children[s] = r),
        (i = r);
    }
    return i.folder;
  }
}
class hn {
  constructor() {
    (this.instance = new Gi()),
      this.instance.showPanel(3),
      (this.active = !1),
      (this.max = 120),
      (this.ignoreMaxed = !0),
      this.activate();
  }
  activate() {
    (this.active = !0), document.body.appendChild(this.instance.dom);
  }
  deactivate() {
    (this.active = !1), document.body.removeChild(this.instance.dom);
  }
  setRenderPanel(e) {
    (this.render = {}),
      (this.render.context = e),
      (this.render.extension = this.render.context.getExtension(
        "EXT_disjoint_timer_query_webgl2"
      )),
      (this.render.panel = this.instance.addPanel(
        new Gi.Panel("Render (ms)", "#f8f", "#212")
      )),
      (!(
        typeof WebGL2RenderingContext != "undefined" &&
        e instanceof WebGL2RenderingContext
      ) ||
        !this.render.extension) &&
        this.deactivate();
  }
  beforeRender() {
    if (!this.active) return;
    this.queryCreated = !1;
    let e = !1;
    if (this.render.query) {
      e = this.render.context.getQueryParameter(
        this.render.query,
        this.render.context.QUERY_RESULT_AVAILABLE
      );
      const t = this.render.context.getParameter(
        this.render.extension.GPU_DISJOINT_EXT
      );
      if (e && !t) {
        const i = this.render.context.getQueryParameter(
            this.render.query,
            this.render.context.QUERY_RESULT
          ),
          s = Math.min(i / 1e3 / 1e3, this.max);
        (s === this.max && this.ignoreMaxed) ||
          this.render.panel.update(s, this.max);
      }
    }
    (e || !this.render.query) &&
      ((this.queryCreated = !0),
      (this.render.query = this.render.context.createQuery()),
      this.render.context.beginQuery(
        this.render.extension.TIME_ELAPSED_EXT,
        this.render.query
      ));
  }
  afterRender() {
    !this.active ||
      (this.queryCreated &&
        this.render.context.endQuery(this.render.extension.TIME_ELAPSED_EXT));
  }
  update() {
    !this.active || this.instance.update();
  }
  destroy() {
    this.deactivate();
  }
}
class un {
  constructor() {
    (this.active = window.location.hash === "#debug"),
      this.active && ((this.ui = new ln()), (this.stats = new hn()));
  }
  update() {
    !this.active || this.stats.update();
  }
}
class bt {
  constructor() {
    (this.callbacks = {}), (this.callbacks.base = {});
  }
  on(e, t) {
    const i = this;
    return typeof e == "undefined" || e === ""
      ? (console.warn("wrong names"), !1)
      : typeof t == "undefined"
      ? (console.warn("wrong callback"), !1)
      : (this.resolveNames(e).forEach(function (r) {
          const n = i.resolveName(r);
          i.callbacks[n.namespace] instanceof Object ||
            (i.callbacks[n.namespace] = {}),
            i.callbacks[n.namespace][n.value] instanceof Array ||
              (i.callbacks[n.namespace][n.value] = []),
            i.callbacks[n.namespace][n.value].push(t);
        }),
        this);
  }
  off(e) {
    const t = this;
    return typeof e == "undefined" || e === ""
      ? (console.warn("wrong name"), !1)
      : (this.resolveNames(e).forEach(function (s) {
          const r = t.resolveName(s);
          if (r.namespace !== "base" && r.value === "")
            delete t.callbacks[r.namespace];
          else if (r.namespace === "base")
            for (const n in t.callbacks)
              t.callbacks[n] instanceof Object &&
                t.callbacks[n][r.value] instanceof Array &&
                (delete t.callbacks[n][r.value],
                Object.keys(t.callbacks[n]).length === 0 &&
                  delete t.callbacks[n]);
          else
            t.callbacks[r.namespace] instanceof Object &&
              t.callbacks[r.namespace][r.value] instanceof Array &&
              (delete t.callbacks[r.namespace][r.value],
              Object.keys(t.callbacks[r.namespace]).length === 0 &&
                delete t.callbacks[r.namespace]);
        }),
        this);
  }
  trigger(e, t) {
    if (typeof e == "undefined" || e === "")
      return console.warn("wrong name"), !1;
    const i = this;
    let s = null;
    const r = t instanceof Array ? t : [];
    let n = this.resolveNames(e);
    if (((n = this.resolveName(n[0])), n.namespace === "base"))
      for (const o in i.callbacks)
        i.callbacks[o] instanceof Object &&
          i.callbacks[o][n.value] instanceof Array &&
          i.callbacks[o][n.value].forEach(function (l) {
            l.apply(i, r);
          });
    else if (this.callbacks[n.namespace] instanceof Object) {
      if (n.value === "") return console.warn("wrong name"), this;
      i.callbacks[n.namespace][n.value].forEach(function (o) {
        o.apply(i, r);
      });
    }
    return s;
  }
  resolveNames(e) {
    let t = e;
    return (
      (t = t.replace(/[^a-zA-Z0-9 ,/.]/g, "")),
      (t = t.replace(/[,/]+/g, " ")),
      (t = t.split(" ")),
      t
    );
  }
  resolveName(e) {
    const t = {},
      i = e.split(".");
    return (
      (t.original = e),
      (t.value = i[0]),
      (t.namespace = "base"),
      i.length > 1 && i[1] !== "" && (t.namespace = i[1]),
      t
    );
  }
}
class cn extends bt {
  constructor(e) {
    super();
    (this.rendererInstance = e),
      this.setLoaders(),
      (this.toLoad = 0),
      (this.loaded = 0),
      (this.items = {});
  }
  setLoaders() {
    (this.loaders = []),
      this.loaders.push({
        extensions: ["jpg", "png"],
        action: (n) => {
          const o = new Image();
          o.addEventListener("load", () => {
            this.fileLoadEnd(n, o);
          }),
            o.addEventListener("error", () => {
              this.fileLoadEnd(n, o);
            }),
            (o.src = n.source);
        },
      });
    const e = new Ui();
    e.setDecoderPath("draco/"),
      e.setDecoderConfig({ type: "js" }),
      this.loaders.push({
        extensions: ["drc"],
        action: (n) => {
          e.load(n.source, (o) => {
            this.fileLoadEnd(n, o), Ui.releaseDecoderModule();
          });
        },
      });
    const t = new kr();
    t.setDRACOLoader(e),
      this.loaders.push({
        extensions: ["glb", "gltf"],
        action: (n) => {
          t.load(n.source, (o) => {
            this.fileLoadEnd(n, o);
          });
        },
      });
    const i = new Cr();
    this.loaders.push({
      extensions: ["fbx"],
      action: (n) => {
        i.load(n.source, (o) => {
          this.fileLoadEnd(n, o);
        });
      },
    });
    const s = new Mr();
    this.loaders.push({
      extensions: ["hdr"],
      action: (n) => {
        s.load(n.source, (o) => {
          this.fileLoadEnd(n, o);
        });
      },
    });
    const r = new Dr();
    this.loaders.push({
      extensions: ["exr"],
      action: (n) => {
        r.load(n.source, (o) => {
          this.fileLoadEnd(n, o);
        });
      },
    });
  }
  load(e = []) {
    for (const t of e) {
      this.toLoad++;
      const i = t.source.match(/\.([a-z0-9]+)$/);
      if (typeof i[1] != "undefined") {
        const s = i[1],
          r = this.loaders.find((n) => n.extensions.find((o) => o === s));
        r ? r.action(t) : console.warn(`Cannot found loader for ${t}`);
      } else console.warn(`Cannot found extension of ${t}`);
    }
  }
  fileLoadEnd(e, t) {
    this.loaded++,
      (this.items[e.name] = t),
      this.trigger("fileEnd", [e, t]),
      this.loaded === this.toLoad && this.trigger("end");
  }
}
class dn extends bt {
  constructor(e, t) {
    super();
    (this.items = {}),
      (this.loader = new cn(e)),
      (this.groups = {}),
      (this.groups.assets = [...t]),
      (this.groups.loaded = []),
      (this.groups.current = null),
      this.loadNextGroup(),
      this.loader.on("fileEnd", (i, s) => {
        let r = s;
        i.type === "texture" &&
          (r instanceof Mt || (r = new Mt(s)), (r.needsUpdate = !0)),
          (this.items[i.name] = r),
          (this.groups.current.items[i.name] = r),
          this.groups.current.loaded++,
          this.trigger("progress", [this.groups.current, i, r]);
      }),
      this.loader.on("end", () => {
        this.groups.loaded.push(this.groups.current),
          this.trigger("groupEnd", [this.groups.current]),
          this.groups.assets.length > 0
            ? this.loadNextGroup()
            : this.trigger("end");
      });
  }
  loadNextGroup() {
    (this.groups.current = this.groups.assets.shift()),
      (this.groups.current.toLoad = this.groups.current.itemsToLoad.length),
      (this.groups.current.loaded = 0),
      (this.groups.current.items = {}),
      this.loader.load(this.groups.current.itemsToLoad);
  }
  createInstancedMeshes(e, t) {
    const i = [];
    for (const r of t)
      i.push({
        name: r.name,
        regex: r.regex,
        meshesGroups: [],
        instancedMeshes: [],
      });
    const s = {};
    for (const r of i) s[r.name] = r.instancedMeshes;
    return s;
  }
  destroy() {
    for (const e in this.items) {
      const t = this.items[e];
      t instanceof Mt && t.dispose();
    }
  }
}
var fn = [
  {
    name: "base",
    data: {},
    itemsToLoad: [
      { name: "environmentModel", source: "environmentModel.gltf" },
      {
        name: "blueNoise32x32Texture",
        source: "/blueNoises/HDR_L_2.png",
        type: "texture",
      },
      {
        name: "stickerOnscoutTexture",
        source: "/models/textures/stickerOnscout.png",
        type: "texture",
      },
      {
        name: "stickerScoutTexture",
        source: "/models/textures/stickerScout.png",
        type: "texture",
      },
      {
        name: "stickerSideTexture",
        source: "/models/textures/stickerSide.png",
        type: "texture",
      },
      {
        name: "stickerSmileyTexture",
        source: "/models/textures/stickerSmiley.png",
        type: "texture",
      },
    ],
  },
  {
    name: "crew",
    data: { isModel: !0 },
    itemsToLoad: [
      { name: "model", source: "models/Model-1/model.gltf" },
    ],
  },
  {
    name: "privatekey",
    data: { isModel: !0 },
    itemsToLoad: [
      { name: "model", source: "models/Model-2/model.gltf" },
    ],
  },
  {
    name: "onscout",
    data: { isModel: !0 },
    itemsToLoad: [
      { name: "model", source: "models/Model-3/model.gltf" },
    ],
  },
  {
    name: "isonline",
    data: { isModel: !0 },
    itemsToLoad: [
      { name: "model", source: "models/Model-4/model.gltf" },
    ],
  },
  {
    name: "ideasby",
    data: { isModel: !0 },
    itemsToLoad: [
      { name: "model", source: "models/Model-5/model.gltf" },
    ],
  },
  {
    name: "takemeto",
    data: { isModel: !0 },
    itemsToLoad: [
      { name: "model", source: "models/Model-6/model.gltf" },
    ],
  },
];
class mn {
  constructor(e) {
    (this.time = e.time),
      (this.baseInstance = e.baseInstance),
      (this.active = !1),
      (this.instance = this.baseInstance.clone()),
      this.instance.position.set(0, 0, 21),
      this.instance.rotation.reorder("YXZ");
  }
  activate() {
    this.active = !0;
  }
  deactivate() {
    this.active = !1;
  }
  destroy() {}
}
class pn {
  constructor(e) {
    (this.time = e.time),
      (this.baseInstance = e.baseInstance),
      (this.domElement = e.domElement),
      (this.active = !1),
      (this.instance = this.baseInstance.clone()),
      this.instance.position.set(0, 0, 16),
      this.instance.position.multiplyScalar(1.35),
      (this.orbitControls = new Er(this.instance, this.domElement)),
      (this.orbitControls.enabled = this.active),
      (this.orbitControls.screenSpacePanning = !0),
      (this.orbitControls.enableKeys = !1),
      (this.orbitControls.zoomSpeed = 0.25),
      (this.orbitControls.enableDamping = !0),
      this.orbitControls.update();
  }
  update() {
    !this.active || this.orbitControls.update();
  }
  activate() {
    (this.active = !0), (this.orbitControls.enabled = !0);
  }
  deactivate() {
    (this.active = !1), (this.orbitControls.enabled = !1);
  }
  destroy() {
    this.orbitControls.dispose();
  }
}
class gn {
  constructor(e) {
    (this.experience = le.instance),
      (this.render = new he()),
      (this.debug = this.experience.debug),
      (this.time = this.experience.time),
      (this.viewport = this.experience.viewport),
      (this.domElement = this.experience.domElement),
      (this.scene = this.render.scene),
      (this.mode = "defaultCamera"),
      this.setInstance(),
      this.setDefaultCamera(),
      this.setDebugCamera(),
      this.setDebug(),
      this[this.mode].activate();
  }
  setInstance() {
    (this.instance = new Lr(
      12,
      this.viewport.elementWidth / this.viewport.elementHeight,
      0.1,
      150
    )),
      this.instance.rotation.reorder("YXZ"),
      this.scene.add(this.instance);
  }
  setDefaultCamera() {
    this.defaultCamera = new mn({
      time: this.time,
      baseInstance: this.instance,
      domElement: this.domElement,
    });
  }
  setDebugCamera() {
    (this.debugCamera = new pn({
      time: this.time,
      baseInstance: this.instance,
      domElement: this.domElement,
    })),
      this.mode === "debugCamera" && this.debugCamera.activate();
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    e.ui
      .getFolder("camera")
      .add(this, "mode", { default: "defaultCamera", debug: "debugCamera" })
      .name("mode")
      .onChange(() => {
        this.mode === "defaultCamera"
          ? (this.debugCamera.deactivate(), this.defaultCamera.activate())
          : (this.defaultCamera.deactivate(), this.debugCamera.activate());
      });
  }
  resize() {
    (this.instance.aspect =
      this.viewport.elementWidth / this.viewport.elementHeight),
      this.instance.updateProjectionMatrix();
  }
  update() {
    this.debugCamera.update(),
      this.instance.position.copy(this[this.mode].instance.position),
      this.instance.quaternion.copy(this[this.mode].instance.quaternion),
      this.instance.updateMatrixWorld();
  }
  destroy() {
    this.defaultCamera.destroy(), this.debugCamera.destroy();
  }
}
class _n {
  constructor(e = {}) {
    (this.experience = le.instance),
      (this.render = new he()),
      (this.scene = this.render.scene),
      (this.rendererInstance = this.experience.rendererInstance),
      (this.domElement = this.experience.domElement),
      (this.viewport = this.experience.viewport),
      (this.debug = this.experience.debug),
      (this.time = this.experience.time),
      (this.camera = this.render.camera),
      (this.usePostprocess = !1),
      this.setInstance(),
      this.setPostProcess(),
      this.setDebug();
  }
  setInstance() {
    (this.clearColor = "#0c0c0e"),
      (this.instance = this.rendererInstance),
      (this.instance.sortObjects = !1),
      (this.instance.domElement.style.position = "absolute"),
      (this.instance.domElement.style.top = 0),
      (this.instance.domElement.style.left = 0),
      (this.instance.domElement.style.width = "100%"),
      (this.instance.domElement.style.height = "100%"),
      this.instance.setClearColor(this.clearColor, 1),
      this.instance.setSize(
        this.viewport.elementWidth,
        this.viewport.elementHeight
      ),
      this.instance.setPixelRatio(this.viewport.clampedPixelRatio),
      (this.instance.physicallyCorrectLights = !0),
      (this.instance.shadowMap.enabled = this.experience.quality === "high"),
      (this.instance.toneMapping = qi),
      (this.instance.toneMappingExposure = 2.1),
      (this.context = this.instance.getContext()),
      this.domElement.appendChild(this.instance.domElement),
      this.debug.stats && this.debug.stats.setRenderPanel(this.context);
  }
  setPostProcess() {
    (this.postProcess = {}),
      (this.postProcess.renderPass = new Fr(this.scene, this.camera.instance)),
      (this.postProcess.taaRenderPass = new Or(
        this.scene,
        this.camera.instance
      )),
      (this.postProcess.taaRenderPass.enabled = !1),
      (this.postProcess.taaRenderPass.unbiased = !1),
      (this.postProcess.unrealBloomPass = new Ar(
        new cs(this.viewport.elementWidth, this.viewport.elementHeight),
        0.23,
        0.315,
        0
      )),
      (this.postProcess.unrealBloomPass.enabled = !0),
      (this.postProcess.unrealBloomPass.compositeMaterial.fragmentShader = `
varying vec2 vUv;
uniform sampler2D blurTexture1;
uniform sampler2D blurTexture2;
uniform sampler2D blurTexture3;
uniform sampler2D blurTexture4;
uniform sampler2D blurTexture5;
uniform sampler2D dirtTexture;
uniform float bloomStrength;
uniform float bloomRadius;
uniform float bloomFactors[NUM_MIPS];
uniform vec3 bloomTintColors[NUM_MIPS];
// uniform vec3 uTintColor;
// uniform float uTintStrength;

float lerpBloomFactor(const in float factor) {
    float mirrorFactor = 1.2 - factor;
    return mix(factor, mirrorFactor, bloomRadius);
}

void main() {
    vec4 color = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
        lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
        lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
        lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
        lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );

    // color.rgb = mix(color.rgb, uTintColor, uTintStrength);
    gl_FragColor = color;
    gl_FragColor = LinearTosRGB( color );
}
        `),
      (this.postProcess.finalPass = new Rr({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: `
                varying vec2 vUv;

                void main()
                {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
        fragmentShader: `
                #include <common>

                uniform sampler2D tDiffuse;

                varying vec2 vUv;

                void main()
                {
                    vec4 color = texture2D(tDiffuse, vUv);
                    gl_FragColor = color;
                }
            `,
      })),
      (this.renderTarget = new Ir(
        this.viewport.elementWidth,
        this.viewport.elementHeight,
        { generateMipmaps: !1, minFilter: Te, magFilter: Te, format: Br }
      )),
      (this.postProcess.composer = new zr(this.instance, this.renderTarget)),
      this.postProcess.composer.setSize(
        this.viewport.elementWidth,
        this.viewport.elementHeight
      ),
      this.postProcess.composer.setPixelRatio(this.viewport.clampedPixelRatio),
      this.postProcess.composer.addPass(this.postProcess.renderPass),
      this.postProcess.composer.addPass(this.postProcess.finalPass);
  }
  resize() {
    const e = this.domElement.getBoundingClientRect();
    (this.viewport.elementWidth = e.width),
      (this.viewport.elementHeight = e.height),
      this.instance.setSize(
        this.viewport.elementWidth,
        this.viewport.elementHeight
      ),
      this.instance.setPixelRatio(this.viewport.clampedPixelRatio),
      this.postProcess.composer.setSize(
        this.viewport.elementWidth,
        this.viewport.elementHeight
      ),
      this.postProcess.composer.setPixelRatio(this.viewport.clampedPixelRatio);
  }
  update() {
    this.debug.stats && this.debug.stats.beforeRender(),
      this.usePostprocess
        ? this.postProcess.composer.render()
        : this.instance.render(this.scene, this.camera.instance),
      this.debug.stats && this.debug.stats.afterRender();
  }
  destroy() {
    this.instance.renderLists.dispose(),
      this.instance.dispose(),
      this.renderTarget.dispose(),
      this.postProcess.composer.renderTarget1.dispose(),
      this.postProcess.composer.renderTarget2.dispose();
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    const t = e.ui.getFolder("renderer");
    t
      .addColor(this, "clearColor")
      .name("clearColor")
      .onChange(() => {
        this.instance.setClearColor(this.clearColor);
      }),
      t.add(this, "usePostprocess").name("usePostprocess");
    const i = e.ui.getFolder("renderer/toneMapping");
    i
      .add(this.instance, "toneMapping", {
        NoToneMapping: Nr,
        LinearToneMapping: Gr,
        ReinhardToneMapping: Ur,
        CineonToneMapping: qr,
        ACESFilmicToneMapping: qi,
      })
      .name("toneMapping"),
      i
        .add(this.instance, "toneMappingExposure")
        .min(0)
        .max(5)
        .step(0.001)
        .name("exposure");
    const s = e.ui.getFolder("renderer/taaPass");
    s.add(this.postProcess.taaRenderPass, "enabled").name("enabled"),
      s
        .add(this.postProcess.taaRenderPass, "sampleLevel", {
          "Level 0: 1 Sample": 0,
          "Level 1: 2 Samples": 1,
          "Level 2: 4 Samples": 2,
          "Level 3: 8 Samples": 3,
          "Level 4: 16 Samples": 4,
          "Level 5: 32 Samples": 5,
        })
        .name("sampleLevel");
    const r = e.ui.getFolder("renderer/unrealBloomPass");
    r.add(this.postProcess.unrealBloomPass, "enabled").name("enabled"),
      r
        .add(this.postProcess.unrealBloomPass, "strength")
        .min(0)
        .max(3)
        .name("strength"),
      r
        .add(this.postProcess.unrealBloomPass, "radius")
        .min(0)
        .max(3)
        .name("radius"),
      r
        .add(this.postProcess.unrealBloomPass, "threshold")
        .min(0)
        .max(3)
        .name("threshold");
  }
}
function me(a) {
  if (a === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return a;
}
function _s(a, e) {
  (a.prototype = Object.create(e.prototype)),
    (a.prototype.constructor = a),
    (a.__proto__ = e);
}
/*!
 * GSAP 3.9.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var ee = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: { lineHeight: "" },
  },
  et = { duration: 0.5, overwrite: !1, delay: 0 },
  Pi,
  re = 1e8,
  D = 1 / re,
  oi = Math.PI * 2,
  xn = oi / 4,
  wn = 0,
  xs = Math.sqrt,
  yn = Math.cos,
  vn = Math.sin,
  q = function (e) {
    return typeof e == "string";
  },
  U = function (e) {
    return typeof e == "function";
  },
  _e = function (e) {
    return typeof e == "number";
  },
  ki = function (e) {
    return typeof e == "undefined";
  },
  xe = function (e) {
    return typeof e == "object";
  },
  K = function (e) {
    return e !== !1;
  },
  ws = function () {
    return typeof window != "undefined";
  },
  Pt = function (e) {
    return U(e) || q(e);
  },
  ys =
    (typeof ArrayBuffer == "function" && ArrayBuffer.isView) || function () {},
  X = Array.isArray,
  ai = /(?:-?\.?\d|\.)+/gi,
  vs = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  $e = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  Ht = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  bs = /[+-]=-?[.\d]+/,
  Ts = /[^,'"\[\]\s]+/gi,
  bn = /[\d.+\-=]+(?:e[-+]\d*)*/i,
  A,
  ue,
  li,
  Ci,
  te = {},
  At = {},
  Ss,
  Ps = function (e) {
    return (At = tt(e, te)) && de;
  },
  Mi = function (e, t) {
    return console.warn(
      "Invalid property",
      e,
      "set to",
      t,
      "Missing plugin? gsap.registerPlugin()"
    );
  },
  Rt = function (e, t) {
    return !t && console.warn(e);
  },
  ks = function (e, t) {
    return (e && (te[e] = t) && At && (At[e] = t)) || te;
  },
  gt = function () {
    return 0;
  },
  Di = {},
  Se = [],
  hi = {},
  Cs,
  J = {},
  jt = {},
  Xi = 30,
  Dt = [],
  Ei = "",
  Li = function (e) {
    var t = e[0],
      i,
      s;
    if ((xe(t) || U(t) || (e = [e]), !(i = (t._gsap || {}).harness))) {
      for (s = Dt.length; s-- && !Dt[s].targetTest(t); );
      i = Dt[s];
    }
    for (s = e.length; s--; )
      (e[s] && (e[s]._gsap || (e[s]._gsap = new $s(e[s], i)))) ||
        e.splice(s, 1);
    return e;
  },
  Ge = function (e) {
    return e._gsap || Li(ne(e))[0]._gsap;
  },
  Ms = function (e, t, i) {
    return (i = e[t]) && U(i)
      ? e[t]()
      : (ki(i) && e.getAttribute && e.getAttribute(t)) || i;
  },
  Z = function (e, t) {
    return (e = e.split(",")).forEach(t) || e;
  },
  z = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Y = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0;
  },
  Tn = function (e, t) {
    for (var i = t.length, s = 0; e.indexOf(t[s]) < 0 && ++s < i; );
    return s < i;
  },
  It = function () {
    var e = Se.length,
      t = Se.slice(0),
      i,
      s;
    for (hi = {}, Se.length = 0, i = 0; i < e; i++)
      (s = t[i]),
        s && s._lazy && (s.render(s._lazy[0], s._lazy[1], !0)._lazy = 0);
  },
  Ds = function (e, t, i, s) {
    Se.length && It(), e.render(t, i, s), Se.length && It();
  },
  Es = function (e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + "").match(Ts).length < 2
      ? t
      : q(e)
      ? e.trim()
      : e;
  },
  Ls = function (e) {
    return e;
  },
  ae = function (e, t) {
    for (var i in t) i in e || (e[i] = t[i]);
    return e;
  },
  Sn = function (e) {
    return function (t, i) {
      for (var s in i)
        s in t || (s === "duration" && e) || s === "ease" || (t[s] = i[s]);
    };
  },
  tt = function (e, t) {
    for (var i in t) e[i] = t[i];
    return e;
  },
  Vi = function a(e, t) {
    for (var i in t)
      i !== "__proto__" &&
        i !== "constructor" &&
        i !== "prototype" &&
        (e[i] = xe(t[i]) ? a(e[i] || (e[i] = {}), t[i]) : t[i]);
    return e;
  },
  Bt = function (e, t) {
    var i = {},
      s;
    for (s in e) s in t || (i[s] = e[s]);
    return i;
  },
  ut = function (e) {
    var t = e.parent || A,
      i = e.keyframes ? Sn(X(e.keyframes)) : ae;
    if (K(e.inherit))
      for (; t; ) i(e, t.vars.defaults), (t = t.parent || t._dp);
    return e;
  },
  Pn = function (e, t) {
    for (var i = e.length, s = i === t.length; s && i-- && e[i] === t[i]; );
    return i < 0;
  },
  kn = function (e, t, i, s, r) {
    i === void 0 && (i = "_first"), s === void 0 && (s = "_last");
    var n = e[s],
      o;
    if (r) for (o = t[r]; n && n[r] > o; ) n = n._prev;
    return (
      n ? ((t._next = n._next), (n._next = t)) : ((t._next = e[i]), (e[i] = t)),
      t._next ? (t._next._prev = t) : (e[s] = t),
      (t._prev = n),
      (t.parent = t._dp = e),
      t
    );
  },
  Wt = function (e, t, i, s) {
    i === void 0 && (i = "_first"), s === void 0 && (s = "_last");
    var r = t._prev,
      n = t._next;
    r ? (r._next = n) : e[i] === t && (e[i] = n),
      n ? (n._prev = r) : e[s] === t && (e[s] = r),
      (t._next = t._prev = t.parent = null);
  },
  pe = function (e, t) {
    e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e),
      (e._act = 0);
  },
  Ue = function (e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
      for (var i = e; i; ) (i._dirty = 1), (i = i.parent);
    return e;
  },
  Cn = function (e) {
    for (var t = e.parent; t && t.parent; )
      (t._dirty = 1), t.totalDuration(), (t = t.parent);
    return e;
  },
  Mn = function a(e) {
    return !e || (e._ts && a(e.parent));
  },
  Hi = function (e) {
    return e._repeat ? it(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
  },
  it = function (e, t) {
    var i = Math.floor((e /= t));
    return e && i === e ? i - 1 : i;
  },
  zt = function (e, t) {
    return (
      (e - t._start) * t._ts +
      (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    );
  },
  Yt = function (e) {
    return (e._end = Y(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || D) || 0)
    ));
  },
  Fs = function (e, t) {
    var i = e._dp;
    return (
      i &&
        i.smoothChildTiming &&
        e._ts &&
        ((e._start = Y(
          i._time -
            (e._ts > 0
              ? t / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
        )),
        Yt(e),
        i._dirty || Ue(i, e)),
      e
    );
  },
  Os = function (e, t) {
    var i;
    if (
      ((t._time || (t._initted && !t._dur)) &&
        ((i = zt(e.rawTime(), t)),
        (!t._dur || Tt(0, t.totalDuration(), i) - t._tTime > D) &&
          t.render(i, !0)),
      Ue(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (i = e; i._dp; )
          i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
      e._zTime = -D;
    }
  },
  ce = function (e, t, i, s) {
    return (
      t.parent && pe(t),
      (t._start = Y(
        (_e(i) ? i : i || e !== A ? ie(e, i, t) : e._time) + t._delay
      )),
      (t._end = Y(
        t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
      )),
      kn(e, t, "_first", "_last", e._sort ? "_start" : 0),
      ui(t) || (e._recent = t),
      s || Os(e, t),
      e
    );
  },
  As = function (e, t) {
    return (
      (te.ScrollTrigger || Mi("scrollTrigger", t)) &&
      te.ScrollTrigger.create(t, e)
    );
  },
  Rs = function (e, t, i, s) {
    if ((Zn(e, t), !e._initted)) return 1;
    if (
      !i &&
      e._pt &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      Cs !== se.frame
    )
      return Se.push(e), (e._lazy = [t, s]), 1;
  },
  Dn = function a(e) {
    var t = e.parent;
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || a(t));
  },
  ui = function (e) {
    var t = e.data;
    return t === "isFromStart" || t === "isStart";
  },
  En = function (e, t, i, s) {
    var r = e.ratio,
      n =
        t < 0 ||
        (!t &&
          ((!e._start && Dn(e) && !(!e._initted && ui(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !ui(e))))
          ? 0
          : 1,
      o = e._rDelay,
      l = 0,
      h,
      u,
      d;
    if (
      (o &&
        e._repeat &&
        ((l = Tt(0, e._tDur, t)),
        (u = it(l, o)),
        e._yoyo && u & 1 && (n = 1 - n),
        u !== it(e._tTime, o) &&
          ((r = 1 - n), e.vars.repeatRefresh && e._initted && e.invalidate())),
      n !== r || s || e._zTime === D || (!t && e._zTime))
    ) {
      if (!e._initted && Rs(e, t, s, i)) return;
      for (
        d = e._zTime,
          e._zTime = t || (i ? D : 0),
          i || (i = t && !d),
          e.ratio = n,
          e._from && (n = 1 - n),
          e._time = 0,
          e._tTime = l,
          h = e._pt;
        h;

      )
        h.r(n, h.d), (h = h._next);
      e._startAt && t < 0 && e._startAt.render(t, !0, !0),
        e._onUpdate && !i && oe(e, "onUpdate"),
        l && e._repeat && !i && e.parent && oe(e, "onRepeat"),
        (t >= e._tDur || t < 0) &&
          e.ratio === n &&
          (n && pe(e, 1),
          i ||
            (oe(e, n ? "onComplete" : "onReverseComplete", !0),
            e._prom && e._prom()));
    } else e._zTime || (e._zTime = t);
  },
  Ln = function (e, t, i) {
    var s;
    if (i > t)
      for (s = e._first; s && s._start <= i; ) {
        if (s.data === "isPause" && s._start > t) return s;
        s = s._next;
      }
    else
      for (s = e._last; s && s._start >= i; ) {
        if (s.data === "isPause" && s._start < t) return s;
        s = s._prev;
      }
  },
  st = function (e, t, i, s) {
    var r = e._repeat,
      n = Y(t) || 0,
      o = e._tTime / e._tDur;
    return (
      o && !s && (e._time *= n / e._dur),
      (e._dur = n),
      (e._tDur = r ? (r < 0 ? 1e10 : Y(n * (r + 1) + e._rDelay * r)) : n),
      o > 0 && !s ? Fs(e, (e._tTime = e._tDur * o)) : e.parent && Yt(e),
      i || Ue(e.parent, e),
      e
    );
  },
  ji = function (e) {
    return e instanceof $ ? Ue(e) : st(e, e._dur);
  },
  Fn = { _start: 0, endTime: gt, totalDuration: gt },
  ie = function a(e, t, i) {
    var s = e.labels,
      r = e._recent || Fn,
      n = e.duration() >= re ? r.endTime(!1) : e._dur,
      o,
      l,
      h;
    return q(t) && (isNaN(t) || t in s)
      ? ((l = t.charAt(0)),
        (h = t.substr(-1) === "%"),
        (o = t.indexOf("=")),
        l === "<" || l === ">"
          ? (o >= 0 && (t = t.replace(/=/, "")),
            (l === "<" ? r._start : r.endTime(r._repeat >= 0)) +
              (parseFloat(t.substr(1)) || 0) *
                (h ? (o < 0 ? r : i).totalDuration() / 100 : 1))
          : o < 0
          ? (t in s || (s[t] = n), s[t])
          : ((l = parseFloat(t.charAt(o - 1) + t.substr(o + 1))),
            h && i && (l = (l / 100) * (X(i) ? i[0] : i).totalDuration()),
            o > 1 ? a(e, t.substr(0, o - 1), i) + l : n + l))
      : t == null
      ? n
      : +t;
  },
  ct = function (e, t, i) {
    var s = _e(t[1]),
      r = (s ? 2 : 1) + (e < 2 ? 0 : 1),
      n = t[r],
      o,
      l;
    if ((s && (n.duration = t[1]), (n.parent = i), e)) {
      for (o = n, l = i; l && !("immediateRender" in o); )
        (o = l.vars.defaults || {}), (l = K(l.vars.inherit) && l.parent);
      (n.immediateRender = K(o.immediateRender)),
        e < 2 ? (n.runBackwards = 1) : (n.startAt = t[r - 1]);
    }
    return new G(t[0], n, t[r + 1]);
  },
  De = function (e, t) {
    return e || e === 0 ? t(e) : t;
  },
  Tt = function (e, t, i) {
    return i < e ? e : i > t ? t : i;
  },
  j = function (e, t) {
    return !q(e) || !(t = bn.exec(e)) ? "" : e.substr(t.index + t[0].length);
  },
  On = function (e, t, i) {
    return De(i, function (s) {
      return Tt(e, t, s);
    });
  },
  ci = [].slice,
  Is = function (e, t) {
    return (
      e &&
      xe(e) &&
      "length" in e &&
      ((!t && !e.length) || (e.length - 1 in e && xe(e[0]))) &&
      !e.nodeType &&
      e !== ue
    );
  },
  An = function (e, t, i) {
    return (
      i === void 0 && (i = []),
      e.forEach(function (s) {
        var r;
        return (q(s) && !t) || Is(s, 1)
          ? (r = i).push.apply(r, ne(s))
          : i.push(s);
      }) || i
    );
  },
  ne = function (e, t, i) {
    return q(e) && !i && (li || !rt())
      ? ci.call((t || Ci).querySelectorAll(e), 0)
      : X(e)
      ? An(e, i)
      : Is(e)
      ? ci.call(e, 0)
      : e
      ? [e]
      : [];
  },
  Rn = function (e) {
    return (
      (e = ne(e)[0] || Rt("Invalid scope") || {}),
      function (t) {
        var i = e.current || e.nativeElement || e;
        return ne(
          t,
          i.querySelectorAll
            ? i
            : i === e
            ? Rt("Invalid scope") || Ci.createElement("div")
            : e
        );
      }
    );
  },
  Bs = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  zs = function (e) {
    if (U(e)) return e;
    var t = xe(e) ? e : { each: e },
      i = qe(t.ease),
      s = t.from || 0,
      r = parseFloat(t.base) || 0,
      n = {},
      o = s > 0 && s < 1,
      l = isNaN(s) || o,
      h = t.axis,
      u = s,
      d = s;
    return (
      q(s)
        ? (u = d = { center: 0.5, edges: 0.5, end: 1 }[s] || 0)
        : !o && l && ((u = s[0]), (d = s[1])),
      function (m, f, p) {
        var c = (p || t).length,
          g = n[c],
          _,
          T,
          y,
          b,
          x,
          w,
          S,
          P,
          v;
        if (!g) {
          if (((v = t.grid === "auto" ? 0 : (t.grid || [1, re])[1]), !v)) {
            for (
              S = -re;
              S < (S = p[v++].getBoundingClientRect().left) && v < c;

            );
            v--;
          }
          for (
            g = n[c] = [],
              _ = l ? Math.min(v, c) * u - 0.5 : s % v,
              T = v === re ? 0 : l ? (c * d) / v - 0.5 : (s / v) | 0,
              S = 0,
              P = re,
              w = 0;
            w < c;
            w++
          )
            (y = (w % v) - _),
              (b = T - ((w / v) | 0)),
              (g[w] = x = h ? Math.abs(h === "y" ? b : y) : xs(y * y + b * b)),
              x > S && (S = x),
              x < P && (P = x);
          s === "random" && Bs(g),
            (g.max = S - P),
            (g.min = P),
            (g.v = c =
              (parseFloat(t.amount) ||
                parseFloat(t.each) *
                  (v > c
                    ? c - 1
                    : h
                    ? h === "y"
                      ? c / v
                      : v
                    : Math.max(v, c / v)) ||
                0) * (s === "edges" ? -1 : 1)),
            (g.b = c < 0 ? r - c : r),
            (g.u = j(t.amount || t.each) || 0),
            (i = i && c < 0 ? Vs(i) : i);
        }
        return (
          (c = (g[m] - g.min) / g.max || 0), Y(g.b + (i ? i(c) : c) * g.v) + g.u
        );
      }
    );
  },
  di = function (e) {
    var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function (i) {
      var s = Math.round(parseFloat(i) / e) * e * t;
      return (s - (s % 1)) / t + (_e(i) ? 0 : j(i));
    };
  },
  Ns = function (e, t) {
    var i = X(e),
      s,
      r;
    return (
      !i &&
        xe(e) &&
        ((s = i = e.radius || re),
        e.values
          ? ((e = ne(e.values)), (r = !_e(e[0])) && (s *= s))
          : (e = di(e.increment))),
      De(
        t,
        i
          ? U(e)
            ? function (n) {
                return (r = e(n)), Math.abs(r - n) <= s ? r : n;
              }
            : function (n) {
                for (
                  var o = parseFloat(r ? n.x : n),
                    l = parseFloat(r ? n.y : 0),
                    h = re,
                    u = 0,
                    d = e.length,
                    m,
                    f;
                  d--;

                )
                  r
                    ? ((m = e[d].x - o), (f = e[d].y - l), (m = m * m + f * f))
                    : (m = Math.abs(e[d] - o)),
                    m < h && ((h = m), (u = d));
                return (
                  (u = !s || h <= s ? e[u] : n),
                  r || u === n || _e(n) ? u : u + j(n)
                );
              }
          : di(e)
      )
    );
  },
  Gs = function (e, t, i, s) {
    return De(X(e) ? !t : i === !0 ? !!(i = 0) : !s, function () {
      return X(e)
        ? e[~~(Math.random() * e.length)]
        : (i = i || 1e-5) &&
            (s = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
            Math.floor(
              Math.round((e - i / 2 + Math.random() * (t - e + i * 0.99)) / i) *
                i *
                s
            ) / s;
    });
  },
  In = function () {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return function (s) {
      return t.reduce(function (r, n) {
        return n(r);
      }, s);
    };
  },
  Bn = function (e, t) {
    return function (i) {
      return e(parseFloat(i)) + (t || j(i));
    };
  },
  zn = function (e, t, i) {
    return qs(e, t, 0, 1, i);
  },
  Us = function (e, t, i) {
    return De(i, function (s) {
      return e[~~t(s)];
    });
  },
  Nn = function a(e, t, i) {
    var s = t - e;
    return X(e)
      ? Us(e, a(0, e.length), t)
      : De(i, function (r) {
          return ((s + ((r - e) % s)) % s) + e;
        });
  },
  Gn = function a(e, t, i) {
    var s = t - e,
      r = s * 2;
    return X(e)
      ? Us(e, a(0, e.length - 1), t)
      : De(i, function (n) {
          return (n = (r + ((n - e) % r)) % r || 0), e + (n > s ? r - n : n);
        });
  },
  _t = function (e) {
    for (var t = 0, i = "", s, r, n, o; ~(s = e.indexOf("random(", t)); )
      (n = e.indexOf(")", s)),
        (o = e.charAt(s + 7) === "["),
        (r = e.substr(s + 7, n - s - 7).match(o ? Ts : ai)),
        (i +=
          e.substr(t, s - t) + Gs(o ? r : +r[0], o ? 0 : +r[1], +r[2] || 1e-5)),
        (t = n + 1);
    return i + e.substr(t, e.length - t);
  },
  qs = function (e, t, i, s, r) {
    var n = t - e,
      o = s - i;
    return De(r, function (l) {
      return i + (((l - e) / n) * o || 0);
    });
  },
  Un = function a(e, t, i, s) {
    var r = isNaN(e + t)
      ? 0
      : function (f) {
          return (1 - f) * e + f * t;
        };
    if (!r) {
      var n = q(e),
        o = {},
        l,
        h,
        u,
        d,
        m;
      if ((i === !0 && (s = 1) && (i = null), n))
        (e = { p: e }), (t = { p: t });
      else if (X(e) && !X(t)) {
        for (u = [], d = e.length, m = d - 2, h = 1; h < d; h++)
          u.push(a(e[h - 1], e[h]));
        d--,
          (r = function (p) {
            p *= d;
            var c = Math.min(m, ~~p);
            return u[c](p - c);
          }),
          (i = t);
      } else s || (e = tt(X(e) ? [] : {}, e));
      if (!u) {
        for (l in t) Fi.call(o, e, l, "get", t[l]);
        r = function (p) {
          return Ri(p, o) || (n ? e.p : e);
        };
      }
    }
    return De(i, r);
  },
  $i = function (e, t, i) {
    var s = e.labels,
      r = re,
      n,
      o,
      l;
    for (n in s)
      (o = s[n] - t),
        o < 0 == !!i && o && r > (o = Math.abs(o)) && ((l = n), (r = o));
    return l;
  },
  oe = function (e, t, i) {
    var s = e.vars,
      r = s[t],
      n,
      o;
    if (!!r)
      return (
        (n = s[t + "Params"]),
        (o = s.callbackScope || e),
        i && Se.length && It(),
        n ? r.apply(o, n) : r.call(o)
      );
  },
  lt = function (e) {
    return (
      pe(e),
      e.scrollTrigger && e.scrollTrigger.kill(!1),
      e.progress() < 1 && oe(e, "onInterrupt"),
      e
    );
  },
  Ke,
  qn = function (e) {
    e = (!e.name && e.default) || e;
    var t = e.name,
      i = U(e),
      s =
        t && !i && e.init
          ? function () {
              this._props = [];
            }
          : e,
      r = { init: gt, render: Ri, add: Fi, kill: ro, modifier: so, rawVars: 0 },
      n = { targetTest: 0, get: 0, getSetter: Ai, aliases: {}, register: 0 };
    if ((rt(), e !== s)) {
      if (J[t]) return;
      ae(s, ae(Bt(e, r), n)),
        tt(s.prototype, tt(r, Bt(e, n))),
        (J[(s.prop = t)] = s),
        e.targetTest && (Dt.push(s), (Di[t] = 1)),
        (t =
          (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) +
          "Plugin");
    }
    ks(t, s), e.register && e.register(de, s, Q);
  },
  M = 255,
  ht = {
    aqua: [0, M, M],
    lime: [0, M, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, M],
    navy: [0, 0, 128],
    white: [M, M, M],
    olive: [128, 128, 0],
    yellow: [M, M, 0],
    orange: [M, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [M, 0, 0],
    pink: [M, 192, 203],
    cyan: [0, M, M],
    transparent: [M, M, M, 0],
  },
  $t = function (e, t, i) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? t + (i - t) * e * 6
        : e < 0.5
        ? i
        : e * 3 < 2
        ? t + (i - t) * (2 / 3 - e) * 6
        : t) *
        M +
        0.5) |
        0
    );
  },
  Ws = function (e, t, i) {
    var s = e ? (_e(e) ? [e >> 16, (e >> 8) & M, e & M] : 0) : ht.black,
      r,
      n,
      o,
      l,
      h,
      u,
      d,
      m,
      f,
      p;
    if (!s) {
      if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), ht[e]))
        s = ht[e];
      else if (e.charAt(0) === "#") {
        if (
          (e.length < 6 &&
            ((r = e.charAt(1)),
            (n = e.charAt(2)),
            (o = e.charAt(3)),
            (e =
              "#" +
              r +
              r +
              n +
              n +
              o +
              o +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ""))),
          e.length === 9)
        )
          return (
            (s = parseInt(e.substr(1, 6), 16)),
            [s >> 16, (s >> 8) & M, s & M, parseInt(e.substr(7), 16) / 255]
          );
        (e = parseInt(e.substr(1), 16)), (s = [e >> 16, (e >> 8) & M, e & M]);
      } else if (e.substr(0, 3) === "hsl") {
        if (((s = p = e.match(ai)), !t))
          (l = (+s[0] % 360) / 360),
            (h = +s[1] / 100),
            (u = +s[2] / 100),
            (n = u <= 0.5 ? u * (h + 1) : u + h - u * h),
            (r = u * 2 - n),
            s.length > 3 && (s[3] *= 1),
            (s[0] = $t(l + 1 / 3, r, n)),
            (s[1] = $t(l, r, n)),
            (s[2] = $t(l - 1 / 3, r, n));
        else if (~e.indexOf("="))
          return (s = e.match(vs)), i && s.length < 4 && (s[3] = 1), s;
      } else s = e.match(ai) || ht.transparent;
      s = s.map(Number);
    }
    return (
      t &&
        !p &&
        ((r = s[0] / M),
        (n = s[1] / M),
        (o = s[2] / M),
        (d = Math.max(r, n, o)),
        (m = Math.min(r, n, o)),
        (u = (d + m) / 2),
        d === m
          ? (l = h = 0)
          : ((f = d - m),
            (h = u > 0.5 ? f / (2 - d - m) : f / (d + m)),
            (l =
              d === r
                ? (n - o) / f + (n < o ? 6 : 0)
                : d === n
                ? (o - r) / f + 2
                : (r - n) / f + 4),
            (l *= 60)),
        (s[0] = ~~(l + 0.5)),
        (s[1] = ~~(h * 100 + 0.5)),
        (s[2] = ~~(u * 100 + 0.5))),
      i && s.length < 4 && (s[3] = 1),
      s
    );
  },
  Ys = function (e) {
    var t = [],
      i = [],
      s = -1;
    return (
      e.split(Pe).forEach(function (r) {
        var n = r.match($e) || [];
        t.push.apply(t, n), i.push((s += n.length + 1));
      }),
      (t.c = i),
      t
    );
  },
  Ki = function (e, t, i) {
    var s = "",
      r = (e + s).match(Pe),
      n = t ? "hsla(" : "rgba(",
      o = 0,
      l,
      h,
      u,
      d;
    if (!r) return e;
    if (
      ((r = r.map(function (m) {
        return (
          (m = Ws(m, t, 1)) &&
          n +
            (t ? m[0] + "," + m[1] + "%," + m[2] + "%," + m[3] : m.join(",")) +
            ")"
        );
      })),
      i && ((u = Ys(e)), (l = i.c), l.join(s) !== u.c.join(s)))
    )
      for (h = e.replace(Pe, "1").split($e), d = h.length - 1; o < d; o++)
        s +=
          h[o] +
          (~l.indexOf(o)
            ? r.shift() || n + "0,0,0,0)"
            : (u.length ? u : r.length ? r : i).shift());
    if (!h)
      for (h = e.split(Pe), d = h.length - 1; o < d; o++) s += h[o] + r[o];
    return s + h[d];
  },
  Pe = (function () {
    var a =
        "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      e;
    for (e in ht) a += "|" + e + "\\b";
    return new RegExp(a + ")", "gi");
  })(),
  Wn = /hsl[a]?\(/,
  Xs = function (e) {
    var t = e.join(" "),
      i;
    if (((Pe.lastIndex = 0), Pe.test(t)))
      return (
        (i = Wn.test(t)),
        (e[1] = Ki(e[1], i)),
        (e[0] = Ki(e[0], i, Ys(e[1]))),
        !0
      );
  },
  Nt,
  se = (function () {
    var a = Date.now,
      e = 500,
      t = 33,
      i = a(),
      s = i,
      r = 1e3 / 240,
      n = r,
      o = [],
      l,
      h,
      u,
      d,
      m,
      f,
      p = function c(g) {
        var _ = a() - s,
          T = g === !0,
          y,
          b,
          x,
          w;
        if (
          (_ > e && (i += _ - t),
          (s += _),
          (x = s - i),
          (y = x - n),
          (y > 0 || T) &&
            ((w = ++d.frame),
            (m = x - d.time * 1e3),
            (d.time = x = x / 1e3),
            (n += y + (y >= r ? 4 : r - y)),
            (b = 1)),
          T || (l = h(c)),
          b)
        )
          for (f = 0; f < o.length; f++) o[f](x, m, w, g);
      };
    return (
      (d = {
        time: 0,
        frame: 0,
        tick: function () {
          p(!0);
        },
        deltaRatio: function (g) {
          return m / (1e3 / (g || 60));
        },
        wake: function () {
          Ss &&
            (!li &&
              ws() &&
              ((ue = li = window),
              (Ci = ue.document || {}),
              (te.gsap = de),
              (ue.gsapVersions || (ue.gsapVersions = [])).push(de.version),
              Ps(At || ue.GreenSockGlobals || (!ue.gsap && ue) || {}),
              (u = ue.requestAnimationFrame)),
            l && d.sleep(),
            (h =
              u ||
              function (g) {
                return setTimeout(g, (n - d.time * 1e3 + 1) | 0);
              }),
            (Nt = 1),
            p(2));
        },
        sleep: function () {
          (u ? ue.cancelAnimationFrame : clearTimeout)(l), (Nt = 0), (h = gt);
        },
        lagSmoothing: function (g, _) {
          (e = g || 1 / D), (t = Math.min(_, e, 0));
        },
        fps: function (g) {
          (r = 1e3 / (g || 240)), (n = d.time * 1e3 + r);
        },
        add: function (g) {
          o.indexOf(g) < 0 && o.push(g), rt();
        },
        remove: function (g, _) {
          ~(_ = o.indexOf(g)) && o.splice(_, 1) && f >= _ && f--;
        },
        _listeners: o,
      }),
      d
    );
  })(),
  rt = function () {
    return !Nt && se.wake();
  },
  k = {},
  Yn = /^[\d.\-M][\d.\-,\s]/,
  Xn = /["']/g,
  Vn = function (e) {
    for (
      var t = {},
        i = e.substr(1, e.length - 3).split(":"),
        s = i[0],
        r = 1,
        n = i.length,
        o,
        l,
        h;
      r < n;
      r++
    )
      (l = i[r]),
        (o = r !== n - 1 ? l.lastIndexOf(",") : l.length),
        (h = l.substr(0, o)),
        (t[s] = isNaN(h) ? h.replace(Xn, "").trim() : +h),
        (s = l.substr(o + 1).trim());
    return t;
  },
  Hn = function (e) {
    var t = e.indexOf("(") + 1,
      i = e.indexOf(")"),
      s = e.indexOf("(", t);
    return e.substring(t, ~s && s < i ? e.indexOf(")", i + 1) : i);
  },
  jn = function (e) {
    var t = (e + "").split("("),
      i = k[t[0]];
    return i && t.length > 1 && i.config
      ? i.config.apply(
          null,
          ~e.indexOf("{") ? [Vn(t[1])] : Hn(e).split(",").map(Es)
        )
      : k._CE && Yn.test(e)
      ? k._CE("", e)
      : i;
  },
  Vs = function (e) {
    return function (t) {
      return 1 - e(1 - t);
    };
  },
  Hs = function a(e, t) {
    for (var i = e._first, s; i; )
      i instanceof $
        ? a(i, t)
        : i.vars.yoyoEase &&
          (!i._yoyo || !i._repeat) &&
          i._yoyo !== t &&
          (i.timeline
            ? a(i.timeline, t)
            : ((s = i._ease),
              (i._ease = i._yEase),
              (i._yEase = s),
              (i._yoyo = t))),
        (i = i._next);
  },
  qe = function (e, t) {
    return (e && (U(e) ? e : k[e] || jn(e))) || t;
  },
  Ye = function (e, t, i, s) {
    i === void 0 &&
      (i = function (l) {
        return 1 - t(1 - l);
      }),
      s === void 0 &&
        (s = function (l) {
          return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
        });
    var r = { easeIn: t, easeOut: i, easeInOut: s },
      n;
    return (
      Z(e, function (o) {
        (k[o] = te[o] = r), (k[(n = o.toLowerCase())] = i);
        for (var l in r)
          k[
            n + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")
          ] = k[o + "." + l] = r[l];
      }),
      r
    );
  },
  js = function (e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
    };
  },
  Kt = function a(e, t, i) {
    var s = t >= 1 ? t : 1,
      r = (i || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      n = (r / oi) * (Math.asin(1 / s) || 0),
      o = function (u) {
        return u === 1 ? 1 : s * Math.pow(2, -10 * u) * vn((u - n) * r) + 1;
      },
      l =
        e === "out"
          ? o
          : e === "in"
          ? function (h) {
              return 1 - o(1 - h);
            }
          : js(o);
    return (
      (r = oi / r),
      (l.config = function (h, u) {
        return a(e, h, u);
      }),
      l
    );
  },
  Zt = function a(e, t) {
    t === void 0 && (t = 1.70158);
    var i = function (n) {
        return n ? --n * n * ((t + 1) * n + t) + 1 : 0;
      },
      s =
        e === "out"
          ? i
          : e === "in"
          ? function (r) {
              return 1 - i(1 - r);
            }
          : js(i);
    return (
      (s.config = function (r) {
        return a(e, r);
      }),
      s
    );
  };
Z("Linear,Quad,Cubic,Quart,Quint,Strong", function (a, e) {
  var t = e < 5 ? e + 1 : e;
  Ye(
    a + ",Power" + (t - 1),
    e
      ? function (i) {
          return Math.pow(i, t);
        }
      : function (i) {
          return i;
        },
    function (i) {
      return 1 - Math.pow(1 - i, t);
    },
    function (i) {
      return i < 0.5
        ? Math.pow(i * 2, t) / 2
        : 1 - Math.pow((1 - i) * 2, t) / 2;
    }
  );
});
k.Linear.easeNone = k.none = k.Linear.easeIn;
Ye("Elastic", Kt("in"), Kt("out"), Kt());
(function (a, e) {
  var t = 1 / e,
    i = 2 * t,
    s = 2.5 * t,
    r = function (o) {
      return o < t
        ? a * o * o
        : o < i
        ? a * Math.pow(o - 1.5 / e, 2) + 0.75
        : o < s
        ? a * (o -= 2.25 / e) * o + 0.9375
        : a * Math.pow(o - 2.625 / e, 2) + 0.984375;
    };
  Ye(
    "Bounce",
    function (n) {
      return 1 - r(1 - n);
    },
    r
  );
})(7.5625, 2.75);
Ye("Expo", function (a) {
  return a ? Math.pow(2, 10 * (a - 1)) : 0;
});
Ye("Circ", function (a) {
  return -(xs(1 - a * a) - 1);
});
Ye("Sine", function (a) {
  return a === 1 ? 1 : -yn(a * xn) + 1;
});
Ye("Back", Zt("in"), Zt("out"), Zt());
k.SteppedEase =
  k.steps =
  te.SteppedEase =
    {
      config: function (e, t) {
        e === void 0 && (e = 1);
        var i = 1 / e,
          s = e + (t ? 0 : 1),
          r = t ? 1 : 0,
          n = 1 - D;
        return function (o) {
          return (((s * Tt(0, n, o)) | 0) + r) * i;
        };
      },
    };
et.ease = k["quad.out"];
Z(
  "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
  function (a) {
    return (Ei += a + "," + a + "Params,");
  }
);
var $s = function (e, t) {
    (this.id = wn++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = t),
      (this.get = t ? t.get : Ms),
      (this.set = t ? t.getSetter : Ai);
  },
  xt = (function () {
    function a(t) {
      (this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        st(this, +t.duration, 1, 1),
        (this.data = t.data),
        Nt || se.wake();
    }
    var e = a.prototype;
    return (
      (e.delay = function (i) {
        return i || i === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + i - this._delay),
            (this._delay = i),
            this)
          : this._delay;
      }),
      (e.duration = function (i) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i
            )
          : this.totalDuration() && this._dur;
      }),
      (e.totalDuration = function (i) {
        return arguments.length
          ? ((this._dirty = 0),
            st(
              this,
              this._repeat < 0
                ? i
                : (i - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (e.totalTime = function (i, s) {
        if ((rt(), !arguments.length)) return this._tTime;
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (Fs(this, i), !r._dp || r.parent || Os(r, this); r && r.parent; )
            r.parent._time !==
              r._start +
                (r._ts >= 0
                  ? r._tTime / r._ts
                  : (r.totalDuration() - r._tTime) / -r._ts) &&
              r.totalTime(r._tTime, !0),
              (r = r.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && i < this._tDur) ||
              (this._ts < 0 && i > 0) ||
              (!this._tDur && !i)) &&
            ce(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== i ||
            (!this._dur && !s) ||
            (this._initted && Math.abs(this._zTime) === D) ||
            (!i && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = i), Ds(this, i, s)),
          this
        );
      }),
      (e.time = function (i, s) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), i + Hi(this)) %
                (this._dur + this._rDelay) || (i ? this._dur : 0),
              s
            )
          : this._time;
      }),
      (e.totalProgress = function (i, s) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * i, s)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.ratio;
      }),
      (e.progress = function (i, s) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) +
                Hi(this),
              s
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.ratio;
      }),
      (e.iteration = function (i, s) {
        var r = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (i - 1) * r, s)
          : this._repeat
          ? it(this._tTime, r) + 1
          : 1;
      }),
      (e.timeScale = function (i) {
        if (!arguments.length) return this._rts === -D ? 0 : this._rts;
        if (this._rts === i) return this;
        var s =
          this.parent && this._ts ? zt(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +i || 0),
          (this._ts = this._ps || i === -D ? 0 : this._rts),
          Cn(this.totalTime(Tt(-this._delay, this._tDur, s), !0)),
          Yt(this),
          this
        );
      }),
      (e.paused = function (i) {
        return arguments.length
          ? (this._ps !== i &&
              ((this._ps = i),
              i
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (rt(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== D &&
                      (this._tTime -= D)
                  ))),
            this)
          : this._ps;
      }),
      (e.startTime = function (i) {
        if (arguments.length) {
          this._start = i;
          var s = this.parent || this._dp;
          return (
            s && (s._sort || !this.parent) && ce(s, this, i - this._delay), this
          );
        }
        return this._start;
      }),
      (e.endTime = function (i) {
        return (
          this._start +
          (K(i) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (e.rawTime = function (i) {
        var s = this.parent || this._dp;
        return s
          ? i &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? zt(s.rawTime(i), this)
            : this._tTime
          : this._tTime;
      }),
      (e.globalTime = function (i) {
        for (var s = this, r = arguments.length ? i : s.rawTime(); s; )
          (r = s._start + r / (s._ts || 1)), (s = s._dp);
        return r;
      }),
      (e.repeat = function (i) {
        return arguments.length
          ? ((this._repeat = i === 1 / 0 ? -2 : i), ji(this))
          : this._repeat === -2
          ? 1 / 0
          : this._repeat;
      }),
      (e.repeatDelay = function (i) {
        if (arguments.length) {
          var s = this._time;
          return (this._rDelay = i), ji(this), s ? this.time(s) : this;
        }
        return this._rDelay;
      }),
      (e.yoyo = function (i) {
        return arguments.length ? ((this._yoyo = i), this) : this._yoyo;
      }),
      (e.seek = function (i, s) {
        return this.totalTime(ie(this, i), K(s));
      }),
      (e.restart = function (i, s) {
        return this.play().totalTime(i ? -this._delay : 0, K(s));
      }),
      (e.play = function (i, s) {
        return i != null && this.seek(i, s), this.reversed(!1).paused(!1);
      }),
      (e.reverse = function (i, s) {
        return (
          i != null && this.seek(i || this.totalDuration(), s),
          this.reversed(!0).paused(!1)
        );
      }),
      (e.pause = function (i, s) {
        return i != null && this.seek(i, s), this.paused(!0);
      }),
      (e.resume = function () {
        return this.paused(!1);
      }),
      (e.reversed = function (i) {
        return arguments.length
          ? (!!i !== this.reversed() &&
              this.timeScale(-this._rts || (i ? -D : 0)),
            this)
          : this._rts < 0;
      }),
      (e.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -D), this;
      }),
      (e.isActive = function () {
        var i = this.parent || this._dp,
          s = this._start,
          r;
        return !!(
          !i ||
          (this._ts &&
            this._initted &&
            i.isActive() &&
            (r = i.rawTime(!0)) >= s &&
            r < this.endTime(!0) - D)
        );
      }),
      (e.eventCallback = function (i, s, r) {
        var n = this.vars;
        return arguments.length > 1
          ? (s
              ? ((n[i] = s),
                r && (n[i + "Params"] = r),
                i === "onUpdate" && (this._onUpdate = s))
              : delete n[i],
            this)
          : n[i];
      }),
      (e.then = function (i) {
        var s = this;
        return new Promise(function (r) {
          var n = U(i) ? i : Ls,
            o = function () {
              var h = s.then;
              (s.then = null),
                U(n) && (n = n(s)) && (n.then || n === s) && (s.then = h),
                r(n),
                (s.then = h);
            };
          (s._initted && s.totalProgress() === 1 && s._ts >= 0) ||
          (!s._tTime && s._ts < 0)
            ? o()
            : (s._prom = o);
        });
      }),
      (e.kill = function () {
        lt(this);
      }),
      a
    );
  })();
ae(xt.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -D,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var $ = (function (a) {
  _s(e, a);
  function e(i, s) {
    var r;
    return (
      i === void 0 && (i = {}),
      (r = a.call(this, i) || this),
      (r.labels = {}),
      (r.smoothChildTiming = !!i.smoothChildTiming),
      (r.autoRemoveChildren = !!i.autoRemoveChildren),
      (r._sort = K(i.sortChildren)),
      A && ce(i.parent || A, me(r), s),
      i.reversed && r.reverse(),
      i.paused && r.paused(!0),
      i.scrollTrigger && As(me(r), i.scrollTrigger),
      r
    );
  }
  var t = e.prototype;
  return (
    (t.to = function (s, r, n) {
      return ct(0, arguments, this), this;
    }),
    (t.from = function (s, r, n) {
      return ct(1, arguments, this), this;
    }),
    (t.fromTo = function (s, r, n, o) {
      return ct(2, arguments, this), this;
    }),
    (t.set = function (s, r, n) {
      return (
        (r.duration = 0),
        (r.parent = this),
        ut(r).repeatDelay || (r.repeat = 0),
        (r.immediateRender = !!r.immediateRender),
        new G(s, r, ie(this, n), 1),
        this
      );
    }),
    (t.call = function (s, r, n) {
      return ce(this, G.delayedCall(0, s, r), n);
    }),
    (t.staggerTo = function (s, r, n, o, l, h, u) {
      return (
        (n.duration = r),
        (n.stagger = n.stagger || o),
        (n.onComplete = h),
        (n.onCompleteParams = u),
        (n.parent = this),
        new G(s, n, ie(this, l)),
        this
      );
    }),
    (t.staggerFrom = function (s, r, n, o, l, h, u) {
      return (
        (n.runBackwards = 1),
        (ut(n).immediateRender = K(n.immediateRender)),
        this.staggerTo(s, r, n, o, l, h, u)
      );
    }),
    (t.staggerFromTo = function (s, r, n, o, l, h, u, d) {
      return (
        (o.startAt = n),
        (ut(o).immediateRender = K(o.immediateRender)),
        this.staggerTo(s, r, o, l, h, u, d)
      );
    }),
    (t.render = function (s, r, n) {
      var o = this._time,
        l = this._dirty ? this.totalDuration() : this._tDur,
        h = this._dur,
        u = s <= 0 ? 0 : Y(s),
        d = this._zTime < 0 != s < 0 && (this._initted || !h),
        m,
        f,
        p,
        c,
        g,
        _,
        T,
        y,
        b,
        x,
        w,
        S;
      if (
        (this !== A && u > l && s >= 0 && (u = l), u !== this._tTime || n || d)
      ) {
        if (
          (o !== this._time &&
            h &&
            ((u += this._time - o), (s += this._time - o)),
          (m = u),
          (b = this._start),
          (y = this._ts),
          (_ = !y),
          d && (h || (o = this._zTime), (s || !r) && (this._zTime = s)),
          this._repeat)
        ) {
          if (
            ((w = this._yoyo),
            (g = h + this._rDelay),
            this._repeat < -1 && s < 0)
          )
            return this.totalTime(g * 100 + s, r, n);
          if (
            ((m = Y(u % g)),
            u === l
              ? ((c = this._repeat), (m = h))
              : ((c = ~~(u / g)),
                c && c === u / g && ((m = h), c--),
                m > h && (m = h)),
            (x = it(this._tTime, g)),
            !o && this._tTime && x !== c && (x = c),
            w && c & 1 && ((m = h - m), (S = 1)),
            c !== x && !this._lock)
          ) {
            var P = w && x & 1,
              v = P === (w && c & 1);
            if (
              (c < x && (P = !P),
              (o = P ? 0 : h),
              (this._lock = 1),
              (this.render(o || (S ? 0 : Y(c * g)), r, !h)._lock = 0),
              (this._tTime = u),
              !r && this.parent && oe(this, "onRepeat"),
              this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1),
              (o && o !== this._time) ||
                _ !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this;
            if (
              ((h = this._dur),
              (l = this._tDur),
              v &&
                ((this._lock = 2),
                (o = P ? h : -1e-4),
                this.render(o, !0),
                this.vars.repeatRefresh && !S && this.invalidate()),
              (this._lock = 0),
              !this._ts && !_)
            )
              return this;
            Hs(this, S);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((T = Ln(this, Y(o), Y(m))), T && (u -= m - (m = T._start))),
          (this._tTime = u),
          (this._time = m),
          (this._act = !y),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = s),
            (o = 0)),
          !o && m && !r && (oe(this, "onStart"), this._tTime !== u))
        )
          return this;
        if (m >= o && s >= 0)
          for (f = this._first; f; ) {
            if (
              ((p = f._next), (f._act || m >= f._start) && f._ts && T !== f)
            ) {
              if (f.parent !== this) return this.render(s, r, n);
              if (
                (f.render(
                  f._ts > 0
                    ? (m - f._start) * f._ts
                    : (f._dirty ? f.totalDuration() : f._tDur) +
                        (m - f._start) * f._ts,
                  r,
                  n
                ),
                m !== this._time || (!this._ts && !_))
              ) {
                (T = 0), p && (u += this._zTime = -D);
                break;
              }
            }
            f = p;
          }
        else {
          f = this._last;
          for (var C = s < 0 ? s : m; f; ) {
            if (((p = f._prev), (f._act || C <= f._end) && f._ts && T !== f)) {
              if (f.parent !== this) return this.render(s, r, n);
              if (
                (f.render(
                  f._ts > 0
                    ? (C - f._start) * f._ts
                    : (f._dirty ? f.totalDuration() : f._tDur) +
                        (C - f._start) * f._ts,
                  r,
                  n
                ),
                m !== this._time || (!this._ts && !_))
              ) {
                (T = 0), p && (u += this._zTime = C ? -D : D);
                break;
              }
            }
            f = p;
          }
        }
        if (
          T &&
          !r &&
          (this.pause(),
          (T.render(m >= o ? 0 : -D)._zTime = m >= o ? 1 : -1),
          this._ts)
        )
          return (this._start = b), Yt(this), this.render(s, r, n);
        this._onUpdate && !r && oe(this, "onUpdate", !0),
          ((u === l && l >= this.totalDuration()) || (!u && o)) &&
            (b === this._start || Math.abs(y) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((s || !h) &&
                ((u === l && this._ts > 0) || (!u && this._ts < 0)) &&
                pe(this, 1),
              !r &&
                !(s < 0 && !o) &&
                (u || o || !l) &&
                (oe(
                  this,
                  u === l && s >= 0 ? "onComplete" : "onReverseComplete",
                  !0
                ),
                this._prom &&
                  !(u < l && this.timeScale() > 0) &&
                  this._prom())));
      }
      return this;
    }),
    (t.add = function (s, r) {
      var n = this;
      if ((_e(r) || (r = ie(this, r, s)), !(s instanceof xt))) {
        if (X(s))
          return (
            s.forEach(function (o) {
              return n.add(o, r);
            }),
            this
          );
        if (q(s)) return this.addLabel(s, r);
        if (U(s)) s = G.delayedCall(0, s);
        else return this;
      }
      return this !== s ? ce(this, s, r) : this;
    }),
    (t.getChildren = function (s, r, n, o) {
      s === void 0 && (s = !0),
        r === void 0 && (r = !0),
        n === void 0 && (n = !0),
        o === void 0 && (o = -re);
      for (var l = [], h = this._first; h; )
        h._start >= o &&
          (h instanceof G
            ? r && l.push(h)
            : (n && l.push(h), s && l.push.apply(l, h.getChildren(!0, r, n)))),
          (h = h._next);
      return l;
    }),
    (t.getById = function (s) {
      for (var r = this.getChildren(1, 1, 1), n = r.length; n--; )
        if (r[n].vars.id === s) return r[n];
    }),
    (t.remove = function (s) {
      return q(s)
        ? this.removeLabel(s)
        : U(s)
        ? this.killTweensOf(s)
        : (Wt(this, s),
          s === this._recent && (this._recent = this._last),
          Ue(this));
    }),
    (t.totalTime = function (s, r) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = Y(
              se.time -
                (this._ts > 0
                  ? s / this._ts
                  : (this.totalDuration() - s) / -this._ts)
            )),
          a.prototype.totalTime.call(this, s, r),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (t.addLabel = function (s, r) {
      return (this.labels[s] = ie(this, r)), this;
    }),
    (t.removeLabel = function (s) {
      return delete this.labels[s], this;
    }),
    (t.addPause = function (s, r, n) {
      var o = G.delayedCall(0, r || gt, n);
      return (
        (o.data = "isPause"), (this._hasPause = 1), ce(this, o, ie(this, s))
      );
    }),
    (t.removePause = function (s) {
      var r = this._first;
      for (s = ie(this, s); r; )
        r._start === s && r.data === "isPause" && pe(r), (r = r._next);
    }),
    (t.killTweensOf = function (s, r, n) {
      for (var o = this.getTweensOf(s, n), l = o.length; l--; )
        we !== o[l] && o[l].kill(s, r);
      return this;
    }),
    (t.getTweensOf = function (s, r) {
      for (var n = [], o = ne(s), l = this._first, h = _e(r), u; l; )
        l instanceof G
          ? Tn(l._targets, o) &&
            (h
              ? (!we || (l._initted && l._ts)) &&
                l.globalTime(0) <= r &&
                l.globalTime(l.totalDuration()) > r
              : !r || l.isActive()) &&
            n.push(l)
          : (u = l.getTweensOf(o, r)).length && n.push.apply(n, u),
          (l = l._next);
      return n;
    }),
    (t.tweenTo = function (s, r) {
      r = r || {};
      var n = this,
        o = ie(n, s),
        l = r,
        h = l.startAt,
        u = l.onStart,
        d = l.onStartParams,
        m = l.immediateRender,
        f,
        p = G.to(
          n,
          ae(
            {
              ease: r.ease || "none",
              lazy: !1,
              immediateRender: !1,
              time: o,
              overwrite: "auto",
              duration:
                r.duration ||
                Math.abs(
                  (o - (h && "time" in h ? h.time : n._time)) / n.timeScale()
                ) ||
                D,
              onStart: function () {
                if ((n.pause(), !f)) {
                  var g =
                    r.duration ||
                    Math.abs(
                      (o - (h && "time" in h ? h.time : n._time)) /
                        n.timeScale()
                    );
                  p._dur !== g && st(p, g, 0, 1).render(p._time, !0, !0),
                    (f = 1);
                }
                u && u.apply(p, d || []);
              },
            },
            r
          )
        );
      return m ? p.render(0) : p;
    }),
    (t.tweenFromTo = function (s, r, n) {
      return this.tweenTo(r, ae({ startAt: { time: ie(this, s) } }, n));
    }),
    (t.recent = function () {
      return this._recent;
    }),
    (t.nextLabel = function (s) {
      return s === void 0 && (s = this._time), $i(this, ie(this, s));
    }),
    (t.previousLabel = function (s) {
      return s === void 0 && (s = this._time), $i(this, ie(this, s), 1);
    }),
    (t.currentLabel = function (s) {
      return arguments.length
        ? this.seek(s, !0)
        : this.previousLabel(this._time + D);
    }),
    (t.shiftChildren = function (s, r, n) {
      n === void 0 && (n = 0);
      for (var o = this._first, l = this.labels, h; o; )
        o._start >= n && ((o._start += s), (o._end += s)), (o = o._next);
      if (r) for (h in l) l[h] >= n && (l[h] += s);
      return Ue(this);
    }),
    (t.invalidate = function () {
      var s = this._first;
      for (this._lock = 0; s; ) s.invalidate(), (s = s._next);
      return a.prototype.invalidate.call(this);
    }),
    (t.clear = function (s) {
      s === void 0 && (s = !0);
      for (var r = this._first, n; r; ) (n = r._next), this.remove(r), (r = n);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        s && (this.labels = {}),
        Ue(this)
      );
    }),
    (t.totalDuration = function (s) {
      var r = 0,
        n = this,
        o = n._last,
        l = re,
        h,
        u,
        d;
      if (arguments.length)
        return n.timeScale(
          (n._repeat < 0 ? n.duration() : n.totalDuration()) /
            (n.reversed() ? -s : s)
        );
      if (n._dirty) {
        for (d = n.parent; o; )
          (h = o._prev),
            o._dirty && o.totalDuration(),
            (u = o._start),
            u > l && n._sort && o._ts && !n._lock
              ? ((n._lock = 1), (ce(n, o, u - o._delay, 1)._lock = 0))
              : (l = u),
            u < 0 &&
              o._ts &&
              ((r -= u),
              ((!d && !n._dp) || (d && d.smoothChildTiming)) &&
                ((n._start += u / n._ts), (n._time -= u), (n._tTime -= u)),
              n.shiftChildren(-u, !1, -1 / 0),
              (l = 0)),
            o._end > r && o._ts && (r = o._end),
            (o = h);
        st(n, n === A && n._time > r ? n._time : r, 1, 1), (n._dirty = 0);
      }
      return n._tDur;
    }),
    (e.updateRoot = function (s) {
      if ((A._ts && (Ds(A, zt(s, A)), (Cs = se.frame)), se.frame >= Xi)) {
        Xi += ee.autoSleep || 120;
        var r = A._first;
        if ((!r || !r._ts) && ee.autoSleep && se._listeners.length < 2) {
          for (; r && !r._ts; ) r = r._next;
          r || se.sleep();
        }
      }
    }),
    e
  );
})(xt);
ae($.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var $n = function (e, t, i, s, r, n, o) {
    var l = new Q(this._pt, e, t, 0, 1, tr, null, r),
      h = 0,
      u = 0,
      d,
      m,
      f,
      p,
      c,
      g,
      _,
      T;
    for (
      l.b = i,
        l.e = s,
        i += "",
        s += "",
        (_ = ~s.indexOf("random(")) && (s = _t(s)),
        n && ((T = [i, s]), n(T, e, t), (i = T[0]), (s = T[1])),
        m = i.match(Ht) || [];
      (d = Ht.exec(s));

    )
      (p = d[0]),
        (c = s.substring(h, d.index)),
        f ? (f = (f + 1) % 5) : c.substr(-5) === "rgba(" && (f = 1),
        p !== m[u++] &&
          ((g = parseFloat(m[u - 1]) || 0),
          (l._pt = {
            _next: l._pt,
            p: c || u === 1 ? c : ",",
            s: g,
            c:
              p.charAt(1) === "="
                ? parseFloat(p.substr(2)) * (p.charAt(0) === "-" ? -1 : 1)
                : parseFloat(p) - g,
            m: f && f < 4 ? Math.round : 0,
          }),
          (h = Ht.lastIndex));
    return (
      (l.c = h < s.length ? s.substring(h, s.length) : ""),
      (l.fp = o),
      (bs.test(s) || _) && (l.e = 0),
      (this._pt = l),
      l
    );
  },
  Fi = function (e, t, i, s, r, n, o, l, h) {
    U(s) && (s = s(r || 0, e, n));
    var u = e[t],
      d =
        i !== "get"
          ? i
          : U(u)
          ? h
            ? e[
                t.indexOf("set") || !U(e["get" + t.substr(3)])
                  ? t
                  : "get" + t.substr(3)
              ](h)
            : e[t]()
          : u,
      m = U(u) ? (h ? eo : Js) : Oi,
      f;
    if (
      (q(s) &&
        (~s.indexOf("random(") && (s = _t(s)),
        s.charAt(1) === "=" &&
          ((f =
            parseFloat(d) +
            parseFloat(s.substr(2)) * (s.charAt(0) === "-" ? -1 : 1) +
            (j(d) || 0)),
          (f || f === 0) && (s = f))),
      d !== s)
    )
      return !isNaN(d * s) && s !== ""
        ? ((f = new Q(
            this._pt,
            e,
            t,
            +d || 0,
            s - (d || 0),
            typeof u == "boolean" ? io : er,
            0,
            m
          )),
          h && (f.fp = h),
          o && f.modifier(o, this, e),
          (this._pt = f))
        : (!u && !(t in e) && Mi(t, s),
          $n.call(this, e, t, d, s, m, l || ee.stringFilter, h));
  },
  Kn = function (e, t, i, s, r) {
    if (
      (U(e) && (e = dt(e, r, t, i, s)),
      !xe(e) || (e.style && e.nodeType) || X(e) || ys(e))
    )
      return q(e) ? dt(e, r, t, i, s) : e;
    var n = {},
      o;
    for (o in e) n[o] = dt(e[o], r, t, i, s);
    return n;
  },
  Ks = function (e, t, i, s, r, n) {
    var o, l, h, u;
    if (
      J[e] &&
      (o = new J[e]()).init(
        r,
        o.rawVars ? t[e] : Kn(t[e], s, r, n, i),
        i,
        s,
        n
      ) !== !1 &&
      ((i._pt = l = new Q(i._pt, r, e, 0, 1, o.render, o, 0, o.priority)),
      i !== Ke)
    )
      for (h = i._ptLookup[i._targets.indexOf(r)], u = o._props.length; u--; )
        h[o._props[u]] = l;
    return o;
  },
  we,
  Zn = function a(e, t) {
    var i = e.vars,
      s = i.ease,
      r = i.startAt,
      n = i.immediateRender,
      o = i.lazy,
      l = i.onUpdate,
      h = i.onUpdateParams,
      u = i.callbackScope,
      d = i.runBackwards,
      m = i.yoyoEase,
      f = i.keyframes,
      p = i.autoRevert,
      c = e._dur,
      g = e._startAt,
      _ = e._targets,
      T = e.parent,
      y = T && T.data === "nested" ? T.parent._targets : _,
      b = e._overwrite === "auto" && !Pi,
      x = e.timeline,
      w,
      S,
      P,
      v,
      C,
      F,
      N,
      I,
      O,
      B,
      R,
      V,
      Ee;
    if (
      (x && (!f || !s) && (s = "none"),
      (e._ease = qe(s, et.ease)),
      (e._yEase = m ? Vs(qe(m === !0 ? s : m, et.ease)) : 0),
      m &&
        e._yoyo &&
        !e._repeat &&
        ((m = e._yEase), (e._yEase = e._ease), (e._ease = m)),
      (e._from = !x && !!i.runBackwards),
      !x || (f && !i.stagger))
    ) {
      if (
        ((I = _[0] ? Ge(_[0]).harness : 0),
        (V = I && i[I.prop]),
        (w = Bt(i, Di)),
        g && pe(g.render(-1, !0)),
        r)
      )
        if (
          (pe(
            (e._startAt = G.set(
              _,
              ae(
                {
                  data: "isStart",
                  overwrite: !1,
                  parent: T,
                  immediateRender: !0,
                  lazy: K(o),
                  startAt: null,
                  delay: 0,
                  onUpdate: l,
                  onUpdateParams: h,
                  callbackScope: u,
                  stagger: 0,
                },
                r
              )
            ))
          ),
          t < 0 && !n && !p && e._startAt.render(-1, !0),
          n)
        ) {
          if ((t > 0 && !p && (e._startAt = 0), c && t <= 0)) {
            t && (e._zTime = t);
            return;
          }
        } else p === !1 && (e._startAt = 0);
      else if (d && c) {
        if (g) !p && (e._startAt = 0);
        else if (
          (t && (n = !1),
          (P = ae(
            {
              overwrite: !1,
              data: "isFromStart",
              lazy: n && K(o),
              immediateRender: n,
              stagger: 0,
              parent: T,
            },
            w
          )),
          V && (P[I.prop] = V),
          pe((e._startAt = G.set(_, P))),
          t < 0 && e._startAt.render(-1, !0),
          (e._zTime = t),
          !n)
        )
          a(e._startAt, D);
        else if (!t) return;
      }
      for (e._pt = 0, o = (c && K(o)) || (o && !c), S = 0; S < _.length; S++) {
        if (
          ((C = _[S]),
          (N = C._gsap || Li(_)[S]._gsap),
          (e._ptLookup[S] = B = {}),
          hi[N.id] && Se.length && It(),
          (R = y === _ ? S : y.indexOf(C)),
          I &&
            (O = new I()).init(C, V || w, e, R, y) !== !1 &&
            ((e._pt = v =
              new Q(e._pt, C, O.name, 0, 1, O.render, O, 0, O.priority)),
            O._props.forEach(function (Le) {
              B[Le] = v;
            }),
            O.priority && (F = 1)),
          !I || V)
        )
          for (P in w)
            J[P] && (O = Ks(P, w, e, R, C, y))
              ? O.priority && (F = 1)
              : (B[P] = v =
                  Fi.call(e, C, P, "get", w[P], R, y, 0, i.stringFilter));
        e._op && e._op[S] && e.kill(C, e._op[S]),
          b &&
            e._pt &&
            ((we = e),
            A.killTweensOf(C, B, e.globalTime(t)),
            (Ee = !e.parent),
            (we = 0)),
          e._pt && o && (hi[N.id] = 1);
      }
      F && ir(e), e._onInit && e._onInit(e);
    }
    (e._onUpdate = l),
      (e._initted = (!e._op || e._pt) && !Ee),
      f && t <= 0 && x.render(re, !0, !0);
  },
  Qn = function (e, t) {
    var i = e[0] ? Ge(e[0]).harness : 0,
      s = i && i.aliases,
      r,
      n,
      o,
      l;
    if (!s) return t;
    r = tt({}, t);
    for (n in s)
      if (n in r) for (l = s[n].split(","), o = l.length; o--; ) r[l[o]] = r[n];
    return r;
  },
  Jn = function (e, t, i, s) {
    var r = t.ease || s || "power1.inOut",
      n,
      o;
    if (X(t))
      (o = i[e] || (i[e] = [])),
        t.forEach(function (l, h) {
          return o.push({ t: (h / (t.length - 1)) * 100, v: l, e: r });
        });
    else
      for (n in t)
        (o = i[n] || (i[n] = [])),
          n === "ease" || o.push({ t: parseFloat(e), v: t[n], e: r });
  },
  dt = function (e, t, i, s, r) {
    return U(e)
      ? e.call(t, i, s, r)
      : q(e) && ~e.indexOf("random(")
      ? _t(e)
      : e;
  },
  Zs = Ei + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
  Qs = {};
Z(Zs + ",id,stagger,delay,duration,paused,scrollTrigger", function (a) {
  return (Qs[a] = 1);
});
var G = (function (a) {
  _s(e, a);
  function e(i, s, r, n) {
    var o;
    typeof s == "number" && ((r.duration = s), (s = r), (r = null)),
      (o = a.call(this, n ? s : ut(s)) || this);
    var l = o.vars,
      h = l.duration,
      u = l.delay,
      d = l.immediateRender,
      m = l.stagger,
      f = l.overwrite,
      p = l.keyframes,
      c = l.defaults,
      g = l.scrollTrigger,
      _ = l.yoyoEase,
      T = s.parent || A,
      y = (X(i) || ys(i) ? _e(i[0]) : "length" in s) ? [i] : ne(i),
      b,
      x,
      w,
      S,
      P,
      v,
      C,
      F;
    if (
      ((o._targets = y.length
        ? Li(y)
        : Rt(
            "GSAP target " + i + " not found. https://greensock.com",
            !ee.nullTargetWarn
          ) || []),
      (o._ptLookup = []),
      (o._overwrite = f),
      p || m || Pt(h) || Pt(u))
    ) {
      if (
        ((s = o.vars),
        (b = o.timeline = new $({ data: "nested", defaults: c || {} })),
        b.kill(),
        (b.parent = b._dp = me(o)),
        (b._start = 0),
        m || Pt(h) || Pt(u))
      ) {
        if (((S = y.length), (C = m && zs(m)), xe(m)))
          for (P in m) ~Zs.indexOf(P) && (F || (F = {}), (F[P] = m[P]));
        for (x = 0; x < S; x++)
          (w = Bt(s, Qs)),
            (w.stagger = 0),
            _ && (w.yoyoEase = _),
            F && tt(w, F),
            (v = y[x]),
            (w.duration = +dt(h, me(o), x, v, y)),
            (w.delay = (+dt(u, me(o), x, v, y) || 0) - o._delay),
            !m &&
              S === 1 &&
              w.delay &&
              ((o._delay = u = w.delay), (o._start += u), (w.delay = 0)),
            b.to(v, w, C ? C(x, v, y) : 0),
            (b._ease = k.none);
        b.duration() ? (h = u = 0) : (o.timeline = 0);
      } else if (p) {
        ut(ae(b.vars.defaults, { ease: "none" })),
          (b._ease = qe(p.ease || s.ease || "none"));
        var N = 0,
          I,
          O,
          B;
        if (X(p))
          p.forEach(function (R) {
            return b.to(y, R, ">");
          });
        else {
          w = {};
          for (P in p)
            P === "ease" || P === "easeEach" || Jn(P, p[P], w, p.easeEach);
          for (P in w)
            for (
              I = w[P].sort(function (R, V) {
                return R.t - V.t;
              }),
                N = 0,
                x = 0;
              x < I.length;
              x++
            )
              (O = I[x]),
                (B = {
                  ease: O.e,
                  duration: ((O.t - (x ? I[x - 1].t : 0)) / 100) * h,
                }),
                (B[P] = O.v),
                b.to(y, B, N),
                (N += B.duration);
          b.duration() < h && b.to({}, { duration: h - b.duration() });
        }
      }
      h || o.duration((h = b.duration()));
    } else o.timeline = 0;
    return (
      f === !0 && !Pi && ((we = me(o)), A.killTweensOf(y), (we = 0)),
      ce(T, me(o), r),
      s.reversed && o.reverse(),
      s.paused && o.paused(!0),
      (d ||
        (!h &&
          !p &&
          o._start === Y(T._time) &&
          K(d) &&
          Mn(me(o)) &&
          T.data !== "nested")) &&
        ((o._tTime = -D), o.render(Math.max(0, -u))),
      g && As(me(o), g),
      o
    );
  }
  var t = e.prototype;
  return (
    (t.render = function (s, r, n) {
      var o = this._time,
        l = this._tDur,
        h = this._dur,
        u = s > l - D && s >= 0 ? l : s < D ? 0 : s,
        d,
        m,
        f,
        p,
        c,
        g,
        _,
        T,
        y;
      if (!h) En(this, s, r, n);
      else if (
        u !== this._tTime ||
        !s ||
        n ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 != s < 0)
      ) {
        if (((d = u), (T = this.timeline), this._repeat)) {
          if (((p = h + this._rDelay), this._repeat < -1 && s < 0))
            return this.totalTime(p * 100 + s, r, n);
          if (
            ((d = Y(u % p)),
            u === l
              ? ((f = this._repeat), (d = h))
              : ((f = ~~(u / p)),
                f && f === u / p && ((d = h), f--),
                d > h && (d = h)),
            (g = this._yoyo && f & 1),
            g && ((y = this._yEase), (d = h - d)),
            (c = it(this._tTime, p)),
            d === o && !n && this._initted)
          )
            return this;
          f !== c &&
            (T && this._yEase && Hs(T, g),
            this.vars.repeatRefresh &&
              !g &&
              !this._lock &&
              ((this._lock = n = 1),
              (this.render(Y(p * f), !0).invalidate()._lock = 0)));
        }
        if (!this._initted) {
          if (Rs(this, s < 0 ? s : d, n, r)) return (this._tTime = 0), this;
          if (h !== this._dur) return this.render(s, r, n);
        }
        if (
          ((this._tTime = u),
          (this._time = d),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = _ = (y || this._ease)(d / h)),
          this._from && (this.ratio = _ = 1 - _),
          d && !o && !r && (oe(this, "onStart"), this._tTime !== u))
        )
          return this;
        for (m = this._pt; m; ) m.r(_, m.d), (m = m._next);
        (T &&
          T.render(
            s < 0 ? s : !d && g ? -D : T._dur * T._ease(d / this._dur),
            r,
            n
          )) ||
          (this._startAt && (this._zTime = s)),
          this._onUpdate &&
            !r &&
            (s < 0 && this._startAt && this._startAt.render(s, !0, n),
            oe(this, "onUpdate")),
          this._repeat &&
            f !== c &&
            this.vars.onRepeat &&
            !r &&
            this.parent &&
            oe(this, "onRepeat"),
          (u === this._tDur || !u) &&
            this._tTime === u &&
            (s < 0 &&
              this._startAt &&
              !this._onUpdate &&
              this._startAt.render(s, !0, !0),
            (s || !h) &&
              ((u === this._tDur && this._ts > 0) || (!u && this._ts < 0)) &&
              pe(this, 1),
            !r &&
              !(s < 0 && !o) &&
              (u || o) &&
              (oe(this, u === l ? "onComplete" : "onReverseComplete", !0),
              this._prom && !(u < l && this.timeScale() > 0) && this._prom()));
      }
      return this;
    }),
    (t.targets = function () {
      return this._targets;
    }),
    (t.invalidate = function () {
      return (
        (this._pt =
          this._op =
          this._startAt =
          this._onUpdate =
          this._lazy =
          this.ratio =
            0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(),
        a.prototype.invalidate.call(this)
      );
    }),
    (t.kill = function (s, r) {
      if ((r === void 0 && (r = "all"), !s && (!r || r === "all")))
        return (this._lazy = this._pt = 0), this.parent ? lt(this) : this;
      if (this.timeline) {
        var n = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(s, r, we && we.vars.overwrite !== !0)
            ._first || lt(this),
          this.parent &&
            n !== this.timeline.totalDuration() &&
            st(this, (this._dur * this.timeline._tDur) / n, 0, 1),
          this
        );
      }
      var o = this._targets,
        l = s ? ne(s) : o,
        h = this._ptLookup,
        u = this._pt,
        d,
        m,
        f,
        p,
        c,
        g,
        _;
      if ((!r || r === "all") && Pn(o, l))
        return r === "all" && (this._pt = 0), lt(this);
      for (
        d = this._op = this._op || [],
          r !== "all" &&
            (q(r) &&
              ((c = {}),
              Z(r, function (T) {
                return (c[T] = 1);
              }),
              (r = c)),
            (r = Qn(o, r))),
          _ = o.length;
        _--;

      )
        if (~l.indexOf(o[_])) {
          (m = h[_]),
            r === "all"
              ? ((d[_] = r), (p = m), (f = {}))
              : ((f = d[_] = d[_] || {}), (p = r));
          for (c in p)
            (g = m && m[c]),
              g &&
                ((!("kill" in g.d) || g.d.kill(c) === !0) && Wt(this, g, "_pt"),
                delete m[c]),
              f !== "all" && (f[c] = 1);
        }
      return this._initted && !this._pt && u && lt(this), this;
    }),
    (e.to = function (s, r) {
      return new e(s, r, arguments[2]);
    }),
    (e.from = function (s, r) {
      return ct(1, arguments);
    }),
    (e.delayedCall = function (s, r, n, o) {
      return new e(r, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: s,
        onComplete: r,
        onReverseComplete: r,
        onCompleteParams: n,
        onReverseCompleteParams: n,
        callbackScope: o,
      });
    }),
    (e.fromTo = function (s, r, n) {
      return ct(2, arguments);
    }),
    (e.set = function (s, r) {
      return (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(s, r);
    }),
    (e.killTweensOf = function (s, r, n) {
      return A.killTweensOf(s, r, n);
    }),
    e
  );
})(xt);
ae(G.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
Z("staggerTo,staggerFrom,staggerFromTo", function (a) {
  G[a] = function () {
    var e = new $(),
      t = ci.call(arguments, 0);
    return t.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), e[a].apply(e, t);
  };
});
var Oi = function (e, t, i) {
    return (e[t] = i);
  },
  Js = function (e, t, i) {
    return e[t](i);
  },
  eo = function (e, t, i, s) {
    return e[t](s.fp, i);
  },
  to = function (e, t, i) {
    return e.setAttribute(t, i);
  },
  Ai = function (e, t) {
    return U(e[t]) ? Js : ki(e[t]) && e.setAttribute ? to : Oi;
  },
  er = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
  },
  io = function (e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t);
  },
  tr = function (e, t) {
    var i = t._pt,
      s = "";
    if (!e && t.b) s = t.b;
    else if (e === 1 && t.e) s = t.e;
    else {
      for (; i; )
        (s =
          i.p +
          (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) +
          s),
          (i = i._next);
      s += t.c;
    }
    t.set(t.t, t.p, s, t);
  },
  Ri = function (e, t) {
    for (var i = t._pt; i; ) i.r(e, i.d), (i = i._next);
  },
  so = function (e, t, i, s) {
    for (var r = this._pt, n; r; )
      (n = r._next), r.p === s && r.modifier(e, t, i), (r = n);
  },
  ro = function (e) {
    for (var t = this._pt, i, s; t; )
      (s = t._next),
        (t.p === e && !t.op) || t.op === e
          ? Wt(this, t, "_pt")
          : t.dep || (i = 1),
        (t = s);
    return !i;
  },
  no = function (e, t, i, s) {
    s.mSet(e, t, s.m.call(s.tween, i, s.mt), s);
  },
  ir = function (e) {
    for (var t = e._pt, i, s, r, n; t; ) {
      for (i = t._next, s = r; s && s.pr > t.pr; ) s = s._next;
      (t._prev = s ? s._prev : n) ? (t._prev._next = t) : (r = t),
        (t._next = s) ? (s._prev = t) : (n = t),
        (t = i);
    }
    e._pt = r;
  },
  Q = (function () {
    function a(t, i, s, r, n, o, l, h, u) {
      (this.t = i),
        (this.s = r),
        (this.c = n),
        (this.p = s),
        (this.r = o || er),
        (this.d = l || this),
        (this.set = h || Oi),
        (this.pr = u || 0),
        (this._next = t),
        t && (t._prev = this);
    }
    var e = a.prototype;
    return (
      (e.modifier = function (i, s, r) {
        (this.mSet = this.mSet || this.set),
          (this.set = no),
          (this.m = i),
          (this.mt = r),
          (this.tween = s);
      }),
      a
    );
  })();
Z(
  Ei +
    "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
  function (a) {
    return (Di[a] = 1);
  }
);
te.TweenMax = te.TweenLite = G;
te.TimelineLite = te.TimelineMax = $;
A = new $({
  sortChildren: !1,
  defaults: et,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0,
});
ee.stringFilter = Xs;
var Gt = {
  registerPlugin: function () {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    t.forEach(function (s) {
      return qn(s);
    });
  },
  timeline: function (e) {
    return new $(e);
  },
  getTweensOf: function (e, t) {
    return A.getTweensOf(e, t);
  },
  getProperty: function (e, t, i, s) {
    q(e) && (e = ne(e)[0]);
    var r = Ge(e || {}).get,
      n = i ? Ls : Es;
    return (
      i === "native" && (i = ""),
      e &&
        (t
          ? n(((J[t] && J[t].get) || r)(e, t, i, s))
          : function (o, l, h) {
              return n(((J[o] && J[o].get) || r)(e, o, l, h));
            })
    );
  },
  quickSetter: function (e, t, i) {
    if (((e = ne(e)), e.length > 1)) {
      var s = e.map(function (u) {
          return de.quickSetter(u, t, i);
        }),
        r = s.length;
      return function (u) {
        for (var d = r; d--; ) s[d](u);
      };
    }
    e = e[0] || {};
    var n = J[t],
      o = Ge(e),
      l = (o.harness && (o.harness.aliases || {})[t]) || t,
      h = n
        ? function (u) {
            var d = new n();
            (Ke._pt = 0),
              d.init(e, i ? u + i : u, Ke, 0, [e]),
              d.render(1, d),
              Ke._pt && Ri(1, Ke);
          }
        : o.set(e, l);
    return n
      ? h
      : function (u) {
          return h(e, l, i ? u + i : u, o, 1);
        };
  },
  isTweening: function (e) {
    return A.getTweensOf(e, !0).length > 0;
  },
  defaults: function (e) {
    return e && e.ease && (e.ease = qe(e.ease, et.ease)), Vi(et, e || {});
  },
  config: function (e) {
    return Vi(ee, e || {});
  },
  registerEffect: function (e) {
    var t = e.name,
      i = e.effect,
      s = e.plugins,
      r = e.defaults,
      n = e.extendTimeline;
    (s || "").split(",").forEach(function (o) {
      return (
        o && !J[o] && !te[o] && Rt(t + " effect requires " + o + " plugin.")
      );
    }),
      (jt[t] = function (o, l, h) {
        return i(ne(o), ae(l || {}, r), h);
      }),
      n &&
        ($.prototype[t] = function (o, l, h) {
          return this.add(jt[t](o, xe(l) ? l : (h = l) && {}, this), h);
        });
  },
  registerEase: function (e, t) {
    k[e] = qe(t);
  },
  parseEase: function (e, t) {
    return arguments.length ? qe(e, t) : k;
  },
  getById: function (e) {
    return A.getById(e);
  },
  exportRoot: function (e, t) {
    e === void 0 && (e = {});
    var i = new $(e),
      s,
      r;
    for (
      i.smoothChildTiming = K(e.smoothChildTiming),
        A.remove(i),
        i._dp = 0,
        i._time = i._tTime = A._time,
        s = A._first;
      s;

    )
      (r = s._next),
        (t ||
          !(
            !s._dur &&
            s instanceof G &&
            s.vars.onComplete === s._targets[0]
          )) &&
          ce(i, s, s._start - s._delay),
        (s = r);
    return ce(A, i, 0), i;
  },
  utils: {
    wrap: Nn,
    wrapYoyo: Gn,
    distribute: zs,
    random: Gs,
    snap: Ns,
    normalize: zn,
    getUnit: j,
    clamp: On,
    splitColor: Ws,
    toArray: ne,
    selector: Rn,
    mapRange: qs,
    pipe: In,
    unitize: Bn,
    interpolate: Un,
    shuffle: Bs,
  },
  install: Ps,
  effects: jt,
  ticker: se,
  updateRoot: $.updateRoot,
  plugins: J,
  globalTimeline: A,
  core: {
    PropTween: Q,
    globals: ks,
    Tween: G,
    Timeline: $,
    Animation: xt,
    getCache: Ge,
    _removeLinkedListItem: Wt,
    suppressOverwrites: function (e) {
      return (Pi = e);
    },
  },
};
Z("to,from,fromTo,delayedCall,set,killTweensOf", function (a) {
  return (Gt[a] = G[a]);
});
se.add($.updateRoot);
Ke = Gt.to({}, { duration: 0 });
var oo = function (e, t) {
    for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
      i = i._next;
    return i;
  },
  ao = function (e, t) {
    var i = e._targets,
      s,
      r,
      n;
    for (s in t)
      for (r = i.length; r--; )
        (n = e._ptLookup[r][s]),
          n &&
            (n = n.d) &&
            (n._pt && (n = oo(n, s)),
            n && n.modifier && n.modifier(t[s], e, i[r], s));
  },
  Qt = function (e, t) {
    return {
      name: e,
      rawVars: 1,
      init: function (s, r, n) {
        n._onInit = function (o) {
          var l, h;
          if (
            (q(r) &&
              ((l = {}),
              Z(r, function (u) {
                return (l[u] = 1);
              }),
              (r = l)),
            t)
          ) {
            l = {};
            for (h in r) l[h] = t(r[h]);
            r = l;
          }
          ao(o, r);
        };
      },
    };
  },
  de =
    Gt.registerPlugin(
      {
        name: "attr",
        init: function (e, t, i, s, r) {
          var n, o;
          for (n in t)
            (o = this.add(
              e,
              "setAttribute",
              (e.getAttribute(n) || 0) + "",
              t[n],
              s,
              r,
              0,
              0,
              n
            )),
              o && (o.op = n),
              this._props.push(n);
        },
      },
      {
        name: "endArray",
        init: function (e, t) {
          for (var i = t.length; i--; ) this.add(e, i, e[i] || 0, t[i]);
        },
      },
      Qt("roundProps", di),
      Qt("modifiers"),
      Qt("snap", Ns)
    ) || Gt;
G.version = $.version = de.version = "3.9.1";
Ss = 1;
ws() && rt();
k.Power0;
k.Power1;
k.Power2;
k.Power3;
k.Power4;
k.Linear;
k.Quad;
k.Cubic;
k.Quart;
k.Quint;
k.Strong;
k.Elastic;
k.Back;
k.SteppedEase;
k.Bounce;
k.Sine;
k.Expo;
k.Circ;
/*!
 * CSSPlugin 3.9.1
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var Zi,
  ye,
  Qe,
  Ii,
  Ne,
  Qi,
  lo = function () {
    return typeof window != "undefined";
  },
  ke = {},
  Ie = 180 / Math.PI,
  Je = Math.PI / 180,
  Xe = Math.atan2,
  Ji = 1e8,
  sr = /([A-Z])/g,
  ho = /(?:left|right|width|margin|padding|x)/i,
  uo = /[\s,\(]\S/,
  ve = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity",
  },
  rr = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
  },
  co = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
      t
    );
  },
  fo = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  mo = function (e, t) {
    var i = t.s + t.c * e;
    t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
  },
  nr = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t);
  },
  or = function (e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
  },
  po = function (e, t, i) {
    return (e.style[t] = i);
  },
  go = function (e, t, i) {
    return e.style.setProperty(t, i);
  },
  _o = function (e, t, i) {
    return (e._gsap[t] = i);
  },
  xo = function (e, t, i) {
    return (e._gsap.scaleX = e._gsap.scaleY = i);
  },
  wo = function (e, t, i, s, r) {
    var n = e._gsap;
    (n.scaleX = n.scaleY = i), n.renderTransform(r, n);
  },
  yo = function (e, t, i, s, r) {
    var n = e._gsap;
    (n[t] = i), n.renderTransform(r, n);
  },
  W = "transform",
  Ce = W + "Origin",
  ar,
  fi = function (e, t) {
    var i = ye.createElementNS
      ? ye.createElementNS(
          (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          e
        )
      : ye.createElement(e);
    return i.style ? i : ye.createElement(e);
  },
  ge = function a(e, t, i) {
    var s = getComputedStyle(e);
    return (
      s[t] ||
      s.getPropertyValue(t.replace(sr, "-$1").toLowerCase()) ||
      s.getPropertyValue(t) ||
      (!i && a(e, nt(t) || t, 1)) ||
      ""
    );
  },
  es = "O,Moz,ms,Ms,Webkit".split(","),
  nt = function (e, t, i) {
    var s = t || Ne,
      r = s.style,
      n = 5;
    if (e in r && !i) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      n-- && !(es[n] + e in r);

    );
    return n < 0 ? null : (n === 3 ? "ms" : n >= 0 ? es[n] : "") + e;
  },
  mi = function () {
    lo() &&
      window.document &&
      ((Zi = window),
      (ye = Zi.document),
      (Qe = ye.documentElement),
      (Ne = fi("div") || { style: {} }),
      fi("div"),
      (W = nt(W)),
      (Ce = W + "Origin"),
      (Ne.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (ar = !!nt("perspective")),
      (Ii = 1));
  },
  Jt = function a(e) {
    var t = fi(
        "svg",
        (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
          "http://www.w3.org/2000/svg"
      ),
      i = this.parentNode,
      s = this.nextSibling,
      r = this.style.cssText,
      n;
    if (
      (Qe.appendChild(t),
      t.appendChild(this),
      (this.style.display = "block"),
      e)
    )
      try {
        (n = this.getBBox()),
          (this._gsapBBox = this.getBBox),
          (this.getBBox = a);
      } catch {}
    else this._gsapBBox && (n = this._gsapBBox());
    return (
      i && (s ? i.insertBefore(this, s) : i.appendChild(this)),
      Qe.removeChild(t),
      (this.style.cssText = r),
      n
    );
  },
  ts = function (e, t) {
    for (var i = t.length; i--; )
      if (e.hasAttribute(t[i])) return e.getAttribute(t[i]);
  },
  lr = function (e) {
    var t;
    try {
      t = e.getBBox();
    } catch {
      t = Jt.call(e, !0);
    }
    return (
      (t && (t.width || t.height)) || e.getBBox === Jt || (t = Jt.call(e, !0)),
      t && !t.width && !t.x && !t.y
        ? {
            x: +ts(e, ["x", "cx", "x1"]) || 0,
            y: +ts(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
        : t
    );
  },
  hr = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && lr(e));
  },
  wt = function (e, t) {
    if (t) {
      var i = e.style;
      t in ke && t !== Ce && (t = W),
        i.removeProperty
          ? ((t.substr(0, 2) === "ms" || t.substr(0, 6) === "webkit") &&
              (t = "-" + t),
            i.removeProperty(t.replace(sr, "-$1").toLowerCase()))
          : i.removeAttribute(t);
    }
  },
  be = function (e, t, i, s, r, n) {
    var o = new Q(e._pt, t, i, 0, 1, n ? or : nr);
    return (e._pt = o), (o.b = s), (o.e = r), e._props.push(i), o;
  },
  is = { deg: 1, rad: 1, turn: 1 },
  Me = function a(e, t, i, s) {
    var r = parseFloat(i) || 0,
      n = (i + "").trim().substr((r + "").length) || "px",
      o = Ne.style,
      l = ho.test(t),
      h = e.tagName.toLowerCase() === "svg",
      u = (h ? "client" : "offset") + (l ? "Width" : "Height"),
      d = 100,
      m = s === "px",
      f = s === "%",
      p,
      c,
      g,
      _;
    return s === n || !r || is[s] || is[n]
      ? r
      : (n !== "px" && !m && (r = a(e, t, i, "px")),
        (_ = e.getCTM && hr(e)),
        (f || n === "%") && (ke[t] || ~t.indexOf("adius"))
          ? ((p = _ ? e.getBBox()[l ? "width" : "height"] : e[u]),
            z(f ? (r / p) * d : (r / 100) * p))
          : ((o[l ? "width" : "height"] = d + (m ? n : s)),
            (c =
              ~t.indexOf("adius") || (s === "em" && e.appendChild && !h)
                ? e
                : e.parentNode),
            _ && (c = (e.ownerSVGElement || {}).parentNode),
            (!c || c === ye || !c.appendChild) && (c = ye.body),
            (g = c._gsap),
            g && f && g.width && l && g.time === se.time
              ? z((r / g.width) * d)
              : ((f || n === "%") && (o.position = ge(e, "position")),
                c === e && (o.position = "static"),
                c.appendChild(Ne),
                (p = Ne[u]),
                c.removeChild(Ne),
                (o.position = "absolute"),
                l && f && ((g = Ge(c)), (g.time = se.time), (g.width = c[u])),
                z(m ? (p * r) / d : p && r ? (d / p) * r : 0))));
  },
  Be = function (e, t, i, s) {
    var r;
    return (
      Ii || mi(),
      t in ve &&
        t !== "transform" &&
        ((t = ve[t]), ~t.indexOf(",") && (t = t.split(",")[0])),
      ke[t] && t !== "transform"
        ? ((r = vt(e, s)),
          (r =
            t !== "transformOrigin"
              ? r[t]
              : r.svg
              ? r.origin
              : qt(ge(e, Ce)) + " " + r.zOrigin + "px"))
        : ((r = e.style[t]),
          (!r || r === "auto" || s || ~(r + "").indexOf("calc(")) &&
            (r =
              (Ut[t] && Ut[t](e, t, i)) ||
              ge(e, t) ||
              Ms(e, t) ||
              (t === "opacity" ? 1 : 0))),
      i && !~(r + "").trim().indexOf(" ") ? Me(e, t, r, i) + i : r
    );
  },
  vo = function (e, t, i, s) {
    if (!i || i === "none") {
      var r = nt(t, e, 1),
        n = r && ge(e, r, 1);
      n && n !== i
        ? ((t = r), (i = n))
        : t === "borderColor" && (i = ge(e, "borderTopColor"));
    }
    var o = new Q(this._pt, e.style, t, 0, 1, tr),
      l = 0,
      h = 0,
      u,
      d,
      m,
      f,
      p,
      c,
      g,
      _,
      T,
      y,
      b,
      x,
      w;
    if (
      ((o.b = i),
      (o.e = s),
      (i += ""),
      (s += ""),
      s === "auto" && ((e.style[t] = s), (s = ge(e, t) || s), (e.style[t] = i)),
      (u = [i, s]),
      Xs(u),
      (i = u[0]),
      (s = u[1]),
      (m = i.match($e) || []),
      (w = s.match($e) || []),
      w.length)
    ) {
      for (; (d = $e.exec(s)); )
        (g = d[0]),
          (T = s.substring(l, d.index)),
          p
            ? (p = (p + 1) % 5)
            : (T.substr(-5) === "rgba(" || T.substr(-5) === "hsla(") && (p = 1),
          g !== (c = m[h++] || "") &&
            ((f = parseFloat(c) || 0),
            (b = c.substr((f + "").length)),
            (x = g.charAt(1) === "=" ? +(g.charAt(0) + "1") : 0),
            x && (g = g.substr(2)),
            (_ = parseFloat(g)),
            (y = g.substr((_ + "").length)),
            (l = $e.lastIndex - y.length),
            y ||
              ((y = y || ee.units[t] || b),
              l === s.length && ((s += y), (o.e += y))),
            b !== y && (f = Me(e, t, c, y) || 0),
            (o._pt = {
              _next: o._pt,
              p: T || h === 1 ? T : ",",
              s: f,
              c: x ? x * _ : _ - f,
              m: (p && p < 4) || t === "zIndex" ? Math.round : 0,
            }));
      o.c = l < s.length ? s.substring(l, s.length) : "";
    } else o.r = t === "display" && s === "none" ? or : nr;
    return bs.test(s) && (o.e = 0), (this._pt = o), o;
  },
  ss = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
  bo = function (e) {
    var t = e.split(" "),
      i = t[0],
      s = t[1] || "50%";
    return (
      (i === "top" || i === "bottom" || s === "left" || s === "right") &&
        ((e = i), (i = s), (s = e)),
      (t[0] = ss[i] || i),
      (t[1] = ss[s] || s),
      t.join(" ")
    );
  },
  To = function (e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
      var i = t.t,
        s = i.style,
        r = t.u,
        n = i._gsap,
        o,
        l,
        h;
      if (r === "all" || r === !0) (s.cssText = ""), (l = 1);
      else
        for (r = r.split(","), h = r.length; --h > -1; )
          (o = r[h]),
            ke[o] && ((l = 1), (o = o === "transformOrigin" ? Ce : W)),
            wt(i, o);
      l &&
        (wt(i, W),
        n &&
          (n.svg && i.removeAttribute("transform"), vt(i, 1), (n.uncache = 1)));
    }
  },
  Ut = {
    clearProps: function (e, t, i, s, r) {
      if (r.data !== "isFromStart") {
        var n = (e._pt = new Q(e._pt, t, i, 0, 0, To));
        return (n.u = s), (n.pr = -10), (n.tween = r), e._props.push(i), 1;
      }
    },
  },
  yt = [1, 0, 0, 1, 0, 0],
  ur = {},
  cr = function (e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
  },
  rs = function (e) {
    var t = ge(e, W);
    return cr(t) ? yt : t.substr(7).match(vs).map(z);
  },
  Bi = function (e, t) {
    var i = e._gsap || Ge(e),
      s = e.style,
      r = rs(e),
      n,
      o,
      l,
      h;
    return i.svg && e.getAttribute("transform")
      ? ((l = e.transform.baseVal.consolidate().matrix),
        (r = [l.a, l.b, l.c, l.d, l.e, l.f]),
        r.join(",") === "1,0,0,1,0,0" ? yt : r)
      : (r === yt &&
          !e.offsetParent &&
          e !== Qe &&
          !i.svg &&
          ((l = s.display),
          (s.display = "block"),
          (n = e.parentNode),
          (!n || !e.offsetParent) &&
            ((h = 1), (o = e.nextSibling), Qe.appendChild(e)),
          (r = rs(e)),
          l ? (s.display = l) : wt(e, "display"),
          h &&
            (o
              ? n.insertBefore(e, o)
              : n
              ? n.appendChild(e)
              : Qe.removeChild(e))),
        t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
  },
  pi = function (e, t, i, s, r, n) {
    var o = e._gsap,
      l = r || Bi(e, !0),
      h = o.xOrigin || 0,
      u = o.yOrigin || 0,
      d = o.xOffset || 0,
      m = o.yOffset || 0,
      f = l[0],
      p = l[1],
      c = l[2],
      g = l[3],
      _ = l[4],
      T = l[5],
      y = t.split(" "),
      b = parseFloat(y[0]) || 0,
      x = parseFloat(y[1]) || 0,
      w,
      S,
      P,
      v;
    i
      ? l !== yt &&
        (S = f * g - p * c) &&
        ((P = b * (g / S) + x * (-c / S) + (c * T - g * _) / S),
        (v = b * (-p / S) + x * (f / S) - (f * T - p * _) / S),
        (b = P),
        (x = v))
      : ((w = lr(e)),
        (b = w.x + (~y[0].indexOf("%") ? (b / 100) * w.width : b)),
        (x = w.y + (~(y[1] || y[0]).indexOf("%") ? (x / 100) * w.height : x))),
      s || (s !== !1 && o.smooth)
        ? ((_ = b - h),
          (T = x - u),
          (o.xOffset = d + (_ * f + T * c) - _),
          (o.yOffset = m + (_ * p + T * g) - T))
        : (o.xOffset = o.yOffset = 0),
      (o.xOrigin = b),
      (o.yOrigin = x),
      (o.smooth = !!s),
      (o.origin = t),
      (o.originIsAbsolute = !!i),
      (e.style[Ce] = "0px 0px"),
      n &&
        (be(n, o, "xOrigin", h, b),
        be(n, o, "yOrigin", u, x),
        be(n, o, "xOffset", d, o.xOffset),
        be(n, o, "yOffset", m, o.yOffset)),
      e.setAttribute("data-svg-origin", b + " " + x);
  },
  vt = function (e, t) {
    var i = e._gsap || new $s(e);
    if ("x" in i && !t && !i.uncache) return i;
    var s = e.style,
      r = i.scaleX < 0,
      n = "px",
      o = "deg",
      l = ge(e, Ce) || "0",
      h,
      u,
      d,
      m,
      f,
      p,
      c,
      g,
      _,
      T,
      y,
      b,
      x,
      w,
      S,
      P,
      v,
      C,
      F,
      N,
      I,
      O,
      B,
      R,
      V,
      Ee,
      Le,
      ot,
      Fe,
      zi,
      fe,
      Oe;
    return (
      (h = u = d = p = c = g = _ = T = y = 0),
      (m = f = 1),
      (i.svg = !!(e.getCTM && hr(e))),
      (w = Bi(e, i.svg)),
      i.svg &&
        ((R =
          (!i.uncache || l === "0px 0px") &&
          !t &&
          e.getAttribute("data-svg-origin")),
        pi(e, R || l, !!R || i.originIsAbsolute, i.smooth !== !1, w)),
      (b = i.xOrigin || 0),
      (x = i.yOrigin || 0),
      w !== yt &&
        ((C = w[0]),
        (F = w[1]),
        (N = w[2]),
        (I = w[3]),
        (h = O = w[4]),
        (u = B = w[5]),
        w.length === 6
          ? ((m = Math.sqrt(C * C + F * F)),
            (f = Math.sqrt(I * I + N * N)),
            (p = C || F ? Xe(F, C) * Ie : 0),
            (_ = N || I ? Xe(N, I) * Ie + p : 0),
            _ && (f *= Math.abs(Math.cos(_ * Je))),
            i.svg && ((h -= b - (b * C + x * N)), (u -= x - (b * F + x * I))))
          : ((Oe = w[6]),
            (zi = w[7]),
            (Le = w[8]),
            (ot = w[9]),
            (Fe = w[10]),
            (fe = w[11]),
            (h = w[12]),
            (u = w[13]),
            (d = w[14]),
            (S = Xe(Oe, Fe)),
            (c = S * Ie),
            S &&
              ((P = Math.cos(-S)),
              (v = Math.sin(-S)),
              (R = O * P + Le * v),
              (V = B * P + ot * v),
              (Ee = Oe * P + Fe * v),
              (Le = O * -v + Le * P),
              (ot = B * -v + ot * P),
              (Fe = Oe * -v + Fe * P),
              (fe = zi * -v + fe * P),
              (O = R),
              (B = V),
              (Oe = Ee)),
            (S = Xe(-N, Fe)),
            (g = S * Ie),
            S &&
              ((P = Math.cos(-S)),
              (v = Math.sin(-S)),
              (R = C * P - Le * v),
              (V = F * P - ot * v),
              (Ee = N * P - Fe * v),
              (fe = I * v + fe * P),
              (C = R),
              (F = V),
              (N = Ee)),
            (S = Xe(F, C)),
            (p = S * Ie),
            S &&
              ((P = Math.cos(S)),
              (v = Math.sin(S)),
              (R = C * P + F * v),
              (V = O * P + B * v),
              (F = F * P - C * v),
              (B = B * P - O * v),
              (C = R),
              (O = V)),
            c &&
              Math.abs(c) + Math.abs(p) > 359.9 &&
              ((c = p = 0), (g = 180 - g)),
            (m = z(Math.sqrt(C * C + F * F + N * N))),
            (f = z(Math.sqrt(B * B + Oe * Oe))),
            (S = Xe(O, B)),
            (_ = Math.abs(S) > 2e-4 ? S * Ie : 0),
            (y = fe ? 1 / (fe < 0 ? -fe : fe) : 0)),
        i.svg &&
          ((R = e.getAttribute("transform")),
          (i.forceCSS = e.setAttribute("transform", "") || !cr(ge(e, W))),
          R && e.setAttribute("transform", R))),
      Math.abs(_) > 90 &&
        Math.abs(_) < 270 &&
        (r
          ? ((m *= -1), (_ += p <= 0 ? 180 : -180), (p += p <= 0 ? 180 : -180))
          : ((f *= -1), (_ += _ <= 0 ? 180 : -180))),
      (i.x =
        h -
        ((i.xPercent =
          h &&
          (i.xPercent ||
            (Math.round(e.offsetWidth / 2) === Math.round(-h) ? -50 : 0)))
          ? (e.offsetWidth * i.xPercent) / 100
          : 0) +
        n),
      (i.y =
        u -
        ((i.yPercent =
          u &&
          (i.yPercent ||
            (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0)))
          ? (e.offsetHeight * i.yPercent) / 100
          : 0) +
        n),
      (i.z = d + n),
      (i.scaleX = z(m)),
      (i.scaleY = z(f)),
      (i.rotation = z(p) + o),
      (i.rotationX = z(c) + o),
      (i.rotationY = z(g) + o),
      (i.skewX = _ + o),
      (i.skewY = T + o),
      (i.transformPerspective = y + n),
      (i.zOrigin = parseFloat(l.split(" ")[2]) || 0) && (s[Ce] = qt(l)),
      (i.xOffset = i.yOffset = 0),
      (i.force3D = ee.force3D),
      (i.renderTransform = i.svg ? Po : ar ? dr : So),
      (i.uncache = 0),
      i
    );
  },
  qt = function (e) {
    return (e = e.split(" "))[0] + " " + e[1];
  },
  ei = function (e, t, i) {
    var s = j(t);
    return z(parseFloat(t) + parseFloat(Me(e, "x", i + "px", s))) + s;
  },
  So = function (e, t) {
    (t.z = "0px"),
      (t.rotationY = t.rotationX = "0deg"),
      (t.force3D = 0),
      dr(e, t);
  },
  Ae = "0deg",
  at = "0px",
  Re = ") ",
  dr = function (e, t) {
    var i = t || this,
      s = i.xPercent,
      r = i.yPercent,
      n = i.x,
      o = i.y,
      l = i.z,
      h = i.rotation,
      u = i.rotationY,
      d = i.rotationX,
      m = i.skewX,
      f = i.skewY,
      p = i.scaleX,
      c = i.scaleY,
      g = i.transformPerspective,
      _ = i.force3D,
      T = i.target,
      y = i.zOrigin,
      b = "",
      x = (_ === "auto" && e && e !== 1) || _ === !0;
    if (y && (d !== Ae || u !== Ae)) {
      var w = parseFloat(u) * Je,
        S = Math.sin(w),
        P = Math.cos(w),
        v;
      (w = parseFloat(d) * Je),
        (v = Math.cos(w)),
        (n = ei(T, n, S * v * -y)),
        (o = ei(T, o, -Math.sin(w) * -y)),
        (l = ei(T, l, P * v * -y + y));
    }
    g !== at && (b += "perspective(" + g + Re),
      (s || r) && (b += "translate(" + s + "%, " + r + "%) "),
      (x || n !== at || o !== at || l !== at) &&
        (b +=
          l !== at || x
            ? "translate3d(" + n + ", " + o + ", " + l + ") "
            : "translate(" + n + ", " + o + Re),
      h !== Ae && (b += "rotate(" + h + Re),
      u !== Ae && (b += "rotateY(" + u + Re),
      d !== Ae && (b += "rotateX(" + d + Re),
      (m !== Ae || f !== Ae) && (b += "skew(" + m + ", " + f + Re),
      (p !== 1 || c !== 1) && (b += "scale(" + p + ", " + c + Re),
      (T.style[W] = b || "translate(0, 0)");
  },
  Po = function (e, t) {
    var i = t || this,
      s = i.xPercent,
      r = i.yPercent,
      n = i.x,
      o = i.y,
      l = i.rotation,
      h = i.skewX,
      u = i.skewY,
      d = i.scaleX,
      m = i.scaleY,
      f = i.target,
      p = i.xOrigin,
      c = i.yOrigin,
      g = i.xOffset,
      _ = i.yOffset,
      T = i.forceCSS,
      y = parseFloat(n),
      b = parseFloat(o),
      x,
      w,
      S,
      P,
      v;
    (l = parseFloat(l)),
      (h = parseFloat(h)),
      (u = parseFloat(u)),
      u && ((u = parseFloat(u)), (h += u), (l += u)),
      l || h
        ? ((l *= Je),
          (h *= Je),
          (x = Math.cos(l) * d),
          (w = Math.sin(l) * d),
          (S = Math.sin(l - h) * -m),
          (P = Math.cos(l - h) * m),
          h &&
            ((u *= Je),
            (v = Math.tan(h - u)),
            (v = Math.sqrt(1 + v * v)),
            (S *= v),
            (P *= v),
            u &&
              ((v = Math.tan(u)),
              (v = Math.sqrt(1 + v * v)),
              (x *= v),
              (w *= v))),
          (x = z(x)),
          (w = z(w)),
          (S = z(S)),
          (P = z(P)))
        : ((x = d), (P = m), (w = S = 0)),
      ((y && !~(n + "").indexOf("px")) || (b && !~(o + "").indexOf("px"))) &&
        ((y = Me(f, "x", n, "px")), (b = Me(f, "y", o, "px"))),
      (p || c || g || _) &&
        ((y = z(y + p - (p * x + c * S) + g)),
        (b = z(b + c - (p * w + c * P) + _))),
      (s || r) &&
        ((v = f.getBBox()),
        (y = z(y + (s / 100) * v.width)),
        (b = z(b + (r / 100) * v.height))),
      (v =
        "matrix(" + x + "," + w + "," + S + "," + P + "," + y + "," + b + ")"),
      f.setAttribute("transform", v),
      T && (f.style[W] = v);
  },
  ko = function (e, t, i, s, r, n) {
    var o = 360,
      l = q(r),
      h = parseFloat(r) * (l && ~r.indexOf("rad") ? Ie : 1),
      u = n ? h * n : h - s,
      d = s + u + "deg",
      m,
      f;
    return (
      l &&
        ((m = r.split("_")[1]),
        m === "short" && ((u %= o), u !== u % (o / 2) && (u += u < 0 ? o : -o)),
        m === "cw" && u < 0
          ? (u = ((u + o * Ji) % o) - ~~(u / o) * o)
          : m === "ccw" && u > 0 && (u = ((u - o * Ji) % o) - ~~(u / o) * o)),
      (e._pt = f = new Q(e._pt, t, i, s, u, co)),
      (f.e = d),
      (f.u = "deg"),
      e._props.push(i),
      f
    );
  },
  ns = function (e, t) {
    for (var i in t) e[i] = t[i];
    return e;
  },
  Co = function (e, t, i) {
    var s = ns({}, i._gsap),
      r = "perspective,force3D,transformOrigin,svgOrigin",
      n = i.style,
      o,
      l,
      h,
      u,
      d,
      m,
      f,
      p;
    s.svg
      ? ((h = i.getAttribute("transform")),
        i.setAttribute("transform", ""),
        (n[W] = t),
        (o = vt(i, 1)),
        wt(i, W),
        i.setAttribute("transform", h))
      : ((h = getComputedStyle(i)[W]), (n[W] = t), (o = vt(i, 1)), (n[W] = h));
    for (l in ke)
      (h = s[l]),
        (u = o[l]),
        h !== u &&
          r.indexOf(l) < 0 &&
          ((f = j(h)),
          (p = j(u)),
          (d = f !== p ? Me(i, l, h, p) : parseFloat(h)),
          (m = parseFloat(u)),
          (e._pt = new Q(e._pt, o, l, d, m - d, rr)),
          (e._pt.u = p || 0),
          e._props.push(l));
    ns(o, s);
  };
Z("padding,margin,Width,Radius", function (a, e) {
  var t = "Top",
    i = "Right",
    s = "Bottom",
    r = "Left",
    n = (e < 3 ? [t, i, s, r] : [t + r, t + i, s + i, s + r]).map(function (o) {
      return e < 2 ? a + o : "border" + o + a;
    });
  Ut[e > 1 ? "border" + a : a] = function (o, l, h, u, d) {
    var m, f;
    if (arguments.length < 4)
      return (
        (m = n.map(function (p) {
          return Be(o, p, h);
        })),
        (f = m.join(" ")),
        f.split(m[0]).length === 5 ? m[0] : f
      );
    (m = (u + "").split(" ")),
      (f = {}),
      n.forEach(function (p, c) {
        return (f[p] = m[c] = m[c] || m[((c - 1) / 2) | 0]);
      }),
      o.init(l, f, d);
  };
});
var fr = {
  name: "css",
  register: mi,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, t, i, s, r) {
    var n = this._props,
      o = e.style,
      l = i.vars.startAt,
      h,
      u,
      d,
      m,
      f,
      p,
      c,
      g,
      _,
      T,
      y,
      b,
      x,
      w,
      S;
    Ii || mi();
    for (c in t)
      if (c !== "autoRound" && ((u = t[c]), !(J[c] && Ks(c, t, i, s, e, r)))) {
        if (
          ((f = typeof u),
          (p = Ut[c]),
          f === "function" && ((u = u.call(i, s, e, r)), (f = typeof u)),
          f === "string" && ~u.indexOf("random(") && (u = _t(u)),
          p)
        )
          p(this, e, c, u, i) && (S = 1);
        else if (c.substr(0, 2) === "--")
          (h = (getComputedStyle(e).getPropertyValue(c) + "").trim()),
            (u += ""),
            (Pe.lastIndex = 0),
            Pe.test(h) || ((g = j(h)), (_ = j(u))),
            _ ? g !== _ && (h = Me(e, c, h, _) + _) : g && (u += g),
            this.add(o, "setProperty", h, u, s, r, 0, 0, c),
            n.push(c);
        else if (f !== "undefined") {
          if (
            (l && c in l
              ? ((h = typeof l[c] == "function" ? l[c].call(i, s, e, r) : l[c]),
                q(h) && ~h.indexOf("random(") && (h = _t(h)),
                j(h + "") || (h += ee.units[c] || j(Be(e, c)) || ""),
                (h + "").charAt(1) === "=" && (h = Be(e, c)))
              : (h = Be(e, c)),
            (m = parseFloat(h)),
            (T =
              f === "string" && u.charAt(1) === "=" ? +(u.charAt(0) + "1") : 0),
            T && (u = u.substr(2)),
            (d = parseFloat(u)),
            c in ve &&
              (c === "autoAlpha" &&
                (m === 1 && Be(e, "visibility") === "hidden" && d && (m = 0),
                be(
                  this,
                  o,
                  "visibility",
                  m ? "inherit" : "hidden",
                  d ? "inherit" : "hidden",
                  !d
                )),
              c !== "scale" &&
                c !== "transform" &&
                ((c = ve[c]), ~c.indexOf(",") && (c = c.split(",")[0]))),
            (y = c in ke),
            y)
          ) {
            if (
              (b ||
                ((x = e._gsap),
                (x.renderTransform && !t.parseTransform) ||
                  vt(e, t.parseTransform),
                (w = t.smoothOrigin !== !1 && x.smooth),
                (b = this._pt =
                  new Q(this._pt, o, W, 0, 1, x.renderTransform, x, 0, -1)),
                (b.dep = 1)),
              c === "scale")
            )
              (this._pt = new Q(
                this._pt,
                x,
                "scaleY",
                x.scaleY,
                (T ? T * d : d - x.scaleY) || 0
              )),
                n.push("scaleY", c),
                (c += "X");
            else if (c === "transformOrigin") {
              (u = bo(u)),
                x.svg
                  ? pi(e, u, 0, w, 0, this)
                  : ((_ = parseFloat(u.split(" ")[2]) || 0),
                    _ !== x.zOrigin && be(this, x, "zOrigin", x.zOrigin, _),
                    be(this, o, c, qt(h), qt(u)));
              continue;
            } else if (c === "svgOrigin") {
              pi(e, u, 1, w, 0, this);
              continue;
            } else if (c in ur) {
              ko(this, x, c, m, u, T);
              continue;
            } else if (c === "smoothOrigin") {
              be(this, x, "smooth", x.smooth, u);
              continue;
            } else if (c === "force3D") {
              x[c] = u;
              continue;
            } else if (c === "transform") {
              Co(this, u, e);
              continue;
            }
          } else c in o || (c = nt(c) || c);
          if (y || ((d || d === 0) && (m || m === 0) && !uo.test(u) && c in o))
            (g = (h + "").substr((m + "").length)),
              d || (d = 0),
              (_ = j(u) || (c in ee.units ? ee.units[c] : g)),
              g !== _ && (m = Me(e, c, h, _)),
              (this._pt = new Q(
                this._pt,
                y ? x : o,
                c,
                m,
                T ? T * d : d - m,
                !y && (_ === "px" || c === "zIndex") && t.autoRound !== !1
                  ? mo
                  : rr
              )),
              (this._pt.u = _ || 0),
              g !== _ && _ !== "%" && ((this._pt.b = h), (this._pt.r = fo));
          else if (c in o) vo.call(this, e, c, h, u);
          else if (c in e) this.add(e, c, h || e[c], u, s, r);
          else {
            Mi(c, u);
            continue;
          }
          n.push(c);
        }
      }
    S && ir(this);
  },
  get: Be,
  aliases: ve,
  getSetter: function (e, t, i) {
    var s = ve[t];
    return (
      s && s.indexOf(",") < 0 && (t = s),
      t in ke && t !== Ce && (e._gsap.x || Be(e, "x"))
        ? i && Qi === i
          ? t === "scale"
            ? xo
            : _o
          : (Qi = i || {}) && (t === "scale" ? wo : yo)
        : e.style && !ki(e.style[t])
        ? po
        : ~t.indexOf("-")
        ? go
        : Ai(e, t)
    );
  },
  core: { _removeProperty: wt, _getMatrix: Bi },
};
de.utils.checkPrefix = nt;
(function (a, e, t, i) {
  var s = Z(a + "," + e + "," + t, function (r) {
    ke[r] = 1;
  });
  Z(e, function (r) {
    (ee.units[r] = "deg"), (ur[r] = 1);
  }),
    (ve[s[13]] = a + "," + e),
    Z(i, function (r) {
      var n = r.split(":");
      ve[n[1]] = s[n[0]];
    });
})(
  "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
  "rotation,rotationX,rotationY,skewX,skewY",
  "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
  "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
);
Z(
  "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
  function (a) {
    ee.units[a] = "px";
  }
);
de.registerPlugin(fr);
var L = de.registerPlugin(fr) || de;
L.core.Tween;
var mr = { exports: {} };
(function (a, e) {
  (function (t, i) {
    a.exports = i();
  })(Wr, function () {
    const t = (o, l, h, u) => {
        const d = (l * h + 2 * o) / h ** 3,
          m = -(2 * l * h + 3 * o) / h ** 2,
          f = l,
          p = o;
        return d * u ** 3 + m * u ** 2 + f * u + p;
      },
      i = (o, l, h, u) => {
        const d = (l * h + 2 * o) / h ** 3,
          m = -(2 * l * h + 3 * o) / h ** 2,
          f = l;
        return 3 * d * u ** 2 + 2 * m * u + f;
      },
      s = function (o, l) {
        Object.entries(typeof o == "number" ? { value: o } : o).map(([u, d]) =>
          l(d, u)
        );
      };
    function r(o, l) {
      (this.start = new Date() / 1e3),
        (this.time = l),
        (this.from = o),
        (this.current = o),
        (this.to = o),
        (this.speed = 0);
    }
    (r.prototype.get = function (o) {
      const l = o / 1e3 - this.start;
      if (l < 0) throw new Error("Cannot read in the past");
      return l >= this.time
        ? this.to
        : this.to - t(this.to - this.from, this.speed, this.time, l);
    }),
      (r.prototype.getSpeed = function (o) {
        const l = o / 1e3 - this.start;
        return l >= this.time
          ? 0
          : i(this.to - this.from, this.speed, this.time, l);
      }),
      (r.prototype.set = function (o, l) {
        const h = new Date(),
          u = this.get(h);
        return (
          (this.speed = this.getSpeed(h)),
          (this.start = h / 1e3),
          (this.from = u),
          (this.to = o),
          l && (this.time = l),
          u
        );
      });
    function n(o, l = 300) {
      return (
        typeof o == "number" && (o = { value: o }),
        s(o, (h, u) => {
          const d = new r(h, l / 1e3);
          Object.defineProperty(o, "_" + u, { value: d }),
            Object.defineProperty(o, "$" + u, { get: () => d.to }),
            Object.defineProperty(o, u, {
              get: () => d.get(new Date()),
              set: (m) => d.set(m),
              enumerable: !0,
            });
        }),
        Object.defineProperty(o, "get", {
          get: () =>
            function (h = "value", u = new Date()) {
              return this["_" + h].get(u);
            },
        }),
        Object.defineProperty(o, "set", {
          get: () =>
            function (h, u = 0) {
              s(h, (d, m) => {
                this["_" + m].set(d, u / 1e3);
              });
            },
        }),
        o
      );
    }
    return n;
  });
})(mr);
var os = mr.exports;
class gi {
  constructor(e) {
    var t, i, s, r, n, o, l, h, u, d;
    (this.experience = le.instance),
      (this.render = new he()),
      (this.debug = this.experience.debug),
      (this.time = this.experience.time),
      (this.resources = this.experience.resources),
      (this.debugPath = e.debugPath),
      (this.texture = e.texture),
      (this.color = (t = e.color) != null ? t : "#ffffff"),
      (this.iridescentColor = new ds(
        (i = e.iridescentColor) != null ? i : "#ffffff"
      )),
      (this.metalness = (s = e.metalness) != null ? s : 1),
      (this.roughness = (r = e.roughness) != null ? r : 0.2),
      (this.bumpScale = (n = e.bumpScale) != null ? n : 2e-4),
      (this.fesnelFrequency = (o = e.fesnelFrequency) != null ? o : 2),
      (this.positionFrequency = (l = e.positionFrequency) != null ? l : 4.5),
      (this.brightnessFrequency =
        (h = e.brightnessFrequency) != null ? h : 0.6),
      (this.brightnessOffset = (u = e.brightnessOffset) != null ? u : 0.3),
      (this.intensity = (d = e.intensity) != null ? d : 1),
      this.setGradient(),
      this.setBumpTexture(),
      this.setMaterial(),
      this.setDebug();
  }
  setGradient() {
    (this.gradient = {}),
      (this.gradient.canvas = document.createElement("canvas")),
      (this.gradient.canvas.width = 1),
      (this.gradient.canvas.height = 32),
      (this.gradient.context = this.gradient.canvas.getContext("2d")),
      (this.gradient.colors = ["#ff0000", "#00ff00", "#0000ff"]),
      (this.gradient.update = () => {
        const e = this.gradient.context.createLinearGradient(
          0,
          0,
          0,
          this.gradient.canvas.height
        );
        e.addColorStop(0, this.gradient.colors[0]),
          e.addColorStop(0.33, this.gradient.colors[1]),
          e.addColorStop(0.66, this.gradient.colors[2]),
          e.addColorStop(1, this.gradient.colors[0]),
          (this.gradient.context.fillStyle = e),
          this.gradient.context.fillRect(
            0,
            0,
            this.gradient.canvas.width,
            this.gradient.canvas.height
          ),
          this.gradient.texture
            ? (this.gradient.texture.needsUpdate = !0)
            : ((this.gradient.texture = new Yr(
                this.gradient.canvas,
                Xr,
                He,
                He
              )),
              (this.gradient.texture.minFilter = Te),
              (this.gradient.texture.magFilter = Te));
      }),
      this.gradient.update();
  }
  setBumpTexture() {
    (this.bumpTexture = this.resources.items.blueNoise32x32Texture),
      (this.bumpTexture.wrapS = He),
      (this.bumpTexture.wrapT = He),
      (this.bumpTexture.needsUpdate = !0);
  }
  setMaterial() {
    (this.material = new E({
      color: this.color,
      metalness: this.metalness,
      roughness: this.roughness,
      bumpMap: this.bumpTexture,
      bumpScale: this.bumpScale,
    })),
      (this.material.userData.encodeColor = !1),
      (this.uniforms = {}),
      (this.uniforms.uIridescentFresnelFrequency = {
        value: this.fesnelFrequency,
      }),
      (this.uniforms.uIridescentPositionFrequency = {
        value: this.positionFrequency,
      }),
      (this.uniforms.uIridescentBrightnessFrequency = {
        value: this.brightnessFrequency,
      }),
      (this.uniforms.uIridescentBrightnessOffset = {
        value: this.brightnessOffset,
      }),
      (this.uniforms.uIridescentIntensity = { value: this.intensity }),
      (this.uniforms.uIridescentGradientTexture = {
        value: this.gradient.texture,
      }),
      (this.uniforms.uIridescentMapTexture = { value: this.texture }),
      (this.material.customProgramCacheKey = () => Math.random()),
      (this.material.onBeforeCompile = (e) => {
        for (const t in this.uniforms) e.uniforms[t] = this.uniforms[t];
        (e.vertexShader = e.vertexShader.replace(
          "#include <common>",
          `
                    #include <common>

                    varying vec3 vWorldPosition;
                `
        )),
          (e.vertexShader = e.vertexShader.replace(
            "#include <worldpos_vertex>",
            `
                    #include <worldpos_vertex>

                    vWorldPosition = worldPosition.xyz;
                `
          )),
          (e.fragmentShader = e.fragmentShader.replace(
            "#include <common>",
            `
                    #include <common>

                    uniform float uIridescentFresnelFrequency;
                    uniform float uIridescentPositionFrequency;
                    uniform float uIridescentIntensity;
                    uniform float uIridescentBrightnessFrequency;
                    uniform float uIridescentBrightnessOffset;
                    uniform sampler2D uIridescentGradientTexture;
                    uniform sampler2D uIridescentMapTexture;

                    varying vec3 vWorldPosition;
                `
          )),
          (e.fragmentShader = e.fragmentShader.replace(
            "vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;",
            `
                    // Base
                    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
                    vec3 grayOutgoingLight = vec3((outgoingLight.r + outgoingLight.g + outgoingLight.b) / 3.0);

                    // Iridescent color
                    vec3 viewDirection = normalize(vWorldPosition.xyz - cameraPosition);
                    float fresnel = (1.0 + dot(viewDirection, normal));
                    float brightness = length(outgoingLight) / 3.0;

                    float iridescentPicker = fresnel * uIridescentFresnelFrequency + distance(vec3(-20.0, 6.0, 0.0), vWorldPosition) * uIridescentPositionFrequency + brightness * uIridescentBrightnessFrequency;
                    iridescentPicker = fract(iridescentPicker);

                    vec3 iridescentGradientColor = texture2D(uIridescentGradientTexture, vec2(0.5, iridescentPicker)).rgb;

                    vec3 iridescentColor = mix(outgoingLight, grayOutgoingLight, 0.0) * (1.0 + (iridescentGradientColor - 0.5) * uIridescentIntensity * (brightness + uIridescentBrightnessOffset));

                    // Map
                    float iridescentIntensity = 1.0 - texture2D(uIridescentMapTexture, vUv).r;
                    // float iridescentIntensity = 1.0;

                    // Final color
                    outgoingLight = mix(outgoingLight * 0.3, iridescentColor, iridescentIntensity);
                    // outgoingLight = vec3(iridescentPicker);
                `
          ));
      });
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    const t = e.ui.getFolder(this.debugPath);
    t.addColor(this.material, "color").name("color"),
      t
        .add(this.material, "metalness")
        .min(0)
        .max(1)
        .step(0.001)
        .name("metalness"),
      t
        .add(this.material, "roughness")
        .min(0)
        .max(1)
        .step(0.001)
        .name("roughness"),
      t
        .add(this.material, "bumpScale")
        .min(0)
        .max(0.002)
        .step(1e-5)
        .name("bumpScale"),
      t
        .addColor(this.gradient.colors, "0")
        .name("iridescentColor0")
        .onChange(this.gradient.update),
      t
        .addColor(this.gradient.colors, "1")
        .name("iridescentColor1")
        .onChange(this.gradient.update),
      t
        .addColor(this.gradient.colors, "2")
        .name("iridescentColor2")
        .onChange(this.gradient.update),
      t
        .add(this.uniforms.uIridescentFresnelFrequency, "value")
        .min(1)
        .max(10)
        .step(0.001)
        .name("uIridescentFresnelFrequency"),
      t
        .add(this.uniforms.uIridescentPositionFrequency, "value")
        .min(0)
        .max(20)
        .step(0.001)
        .name("uIridescentPositionFrequency"),
      t
        .add(this.uniforms.uIridescentBrightnessFrequency, "value")
        .min(0)
        .max(10)
        .step(0.001)
        .name("uIridescentBrightnessFrequency"),
      t
        .add(this.uniforms.uIridescentBrightnessOffset, "value")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("uIridescentBrightnessOffset"),
      t
        .add(this.uniforms.uIridescentIntensity, "value")
        .min(0)
        .max(2)
        .step(0.001)
        .name("uIridescentIntensity");
  }
}
var Mo = `uniform float uFresnelOffset; 
uniform float uFresnelScale; 
uniform float uFresnelPower; 

varying float vFresnel;
varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    vec3 viewDirection = normalize(modelPosition.xyz - cameraPosition);
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);

    float fresnel = uFresnelOffset + uFresnelScale * (1.0 + dot(viewDirection, worldNormal));
    fresnel = 1.0 - pow(1.0 - fresnel, uFresnelPower);

    vFresnel = fresnel;
    vColor = worldNormal;
}`,
  Do = `varying float vFresnel;
varying vec3 vColor;

void main()
{
    float alpha = 1.0 - vFresnel;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    
}`;
function Eo() {
  return new Vr({
    transparent: !0,
    depthTest: !1,
    uniforms: {
      uFresnelOffset: { value: -0.25 },
      uFresnelScale: { value: 1.5 },
      uFresnelPower: { value: 3 },
    },
    vertexShader: Mo,
    fragmentShader: Do,
  });
}
class Ve {
  constructor(e, t) {
    (this.application = We.instance),
      (this.experience = le.instance),
      (this.render = new he()),
      (this.debug = this.experience.debug),
      (this.time = this.experience.time),
      (this.viewport = this.experience.viewport),
      (this.mouse = this.experience.mouse),
      (this.resources = this.experience.resources),
      (this.scene = this.render.scene),
      (this.domElement = this.experience.domElement),
      (this.camera = this.render.camera),
      (this.models = e),
      (this.name = t),
      (this.hideDistance = 6),
      (this.shown = !1),
      (this.onScreen = !1),
      (this.groupA = new Ze()),
      this.models.groupC.add(this.groupA),
      (this.groupB = new Ze());
    const i =
      1 /
      Math.max(
        1,
        (this.viewport.elementHeight / this.viewport.elementWidth) * 0.7
      );
    this.groupB.scale.set(i, i, i),
      this.groupA.add(this.groupB),
      (this.position = { x: 0, y: -this.hideDistance, z: 0 }),
      (this.rotation = { x: 0, y: 0 }),
      (this.olaPosition = os(Vt({}, this.position), 500)),
      (this.olaRotation = os(Vt({}, this.rotation), 500)),
      (this.autoRotate = !0),
      this.setCursorParallax(),
      this.setPlaceholder(),
      this.setFocusPoint(),
      this.resources.on("groupEnd", (s) => {
        s.name === this.name && (this.handleAssets(s), this.setDebug());
      });
  }
  handleAssets(e) {
    (this.assets = e.items),
      this.setTextures(),
      this.setMaterials(),
      this.setBoxModel(),
      this.placeholder.hide();
  }
  setCursorParallax() {
    (this.cursorParallax = {}),
      (this.cursorParallax.easing = 5),
      (this.cursorParallax.rotationAmplitude = { x: 0.3, y: 0.6 }),
      (this.cursorParallax.positionAmplitude = { x: -0.3, y: -0 });
  }
  setPlaceholder() {
    (this.placeholder = {}),
      (this.placeholder.hide = () => {
        this.placeholder.mesh.visible = !1;
      }),
      (this.placeholder.mesh = new je(
        new fs(0.25, 32),
        new Wi({ color: 16777215 })
      ));
  }
  setFocusPoint() {
    (this.focusPoint = {}),
      (this.focusPoint.screenPosition = new cs()),
      (this.focusPoint.object = new Hr()),
      (this.focusPoint.object.position.x = 1.5),
      this.groupA.add(this.focusPoint.object),
      (this.focusPoint.dummy = new je(
        new ms(0.25, 0.25, 0.25),
        new Wi({ color: "red", wireframe: !0 })
      )),
      (this.focusPoint.element = document.querySelector(
        `.js-focus-point.is-${this.name}`
      ));
  }
  setTextures() {
    this.textures = {};
    for (const e in this.models.textures)
      this.textures[e] = this.models.textures[e];
    for (const e in this.assets) {
      const t = this.assets[e];
      if (t instanceof Mt) {
        const i = e.replace("Texture", "");
        (t.minFilter = ps),
          (t.magFilter = Te),
          (t.flipY = !1),
          ["stickerTitle", "stickerDescription"].includes(i) &&
            this.viewport.vertical &&
            ((t.minFilter = Te), (t.magFilter = Te)),
          ["socials", "woodColor", "fabricColor", "switchGradient"].includes(i)
            ? (t.encoding = jr)
            : (t.encoding = $r),
          ["stickerBottom"].includes(i) && (t.anisotropy = 2),
          ["woodColor"].includes(i)
            ? ((t.wrapS = He), (t.wrapT = He))
            : ((t.wrapS = Ot), (t.wrapT = Ot)),
          (this.textures[i] = t);
      }
    }
  }
  setMaterials() {
    (this.materials = {}),
      (this.materials.stickerSide = new E({
        metalness: 0,
        roughness: 0.5,
        alphaMap: this.textures.stickerSide,
        transparent: !0,
        alphaTest: 0.1,
      })),
      (this.materials.stickerScout = new E({
        metalness: 0,
        roughness: 0.5,
        alphaMap: this.textures.stickerScout,
        transparent: !0,
        alphaTest: 0.5,
      })),
      (this.materials.stickerScout.userData.updateEncoding = !1),
      (this.materials.stickerTitle = new E({
        metalness: 0,
        roughness: 0.5,
        alphaMap: this.textures.stickerTitle,
        transparent: !0,
        alphaTest: 0.5,
      })),
      (this.materials.stickerDescription = new E({
        metalness: 0,
        roughness: 0.5,
        alphaMap: this.textures.stickerDescription,
        transparent: !0,
        alphaTest: 0.5,
      })),
      (this.materials.stickerBottom = new E({
        metalness: 0,
        roughness: 0.5,
        alphaMap: this.textures.stickerBottom,
        transparent: !0,
        alphaTest: 0.5,
      })),
      (this.materials.stickerBottom.userData.updateEncoding = !1);
    const e = new gi({
      debugPath: `models/${this.name}/stickerSmiley`,
      texture: this.textures.stickerSmiley,
      color: "#7f7f7f",
      metalness: 0,
      roughness: 0.6,
      bumpScale: 1e-4,
      fesnelFrequency: 4,
      positionFrequency: 4.5,
      brightnessFrequency: 0.2,
      brightnessOffset: 0.3,
      intensity: 2,
    });
    switch (
      ((this.materials.stickerSmiley = e.material),
      (this.materials.stickerSmiley.userData.updateEncoding = !1),
      this.name)
    ) {
      case "crew":
        this.materials.stickerSmiley.color.set("#3b2a3c"),
          this.materials.stickerScout.color.set("#372a7a"),
          this.materials.stickerBottom.color.set("#372a7a");
        const t = new gi({
          debugPath: `models/${this.name}/pil`,
          texture: null,
          color: "#1d1aff",
          metalness: 1,
          roughness: 0.45,
          bumpScale: 2e-4,
          fesnelFrequency: 2,
          positionFrequency: 1.5,
          brightnessFrequency: 0,
          brightnessOffset: -0.6,
          intensity: 1,
        });
        (this.materials.pil = t.material),
          (this.materials.pil.userData.updateEncoding = !1);
        break;
      case "privatekey":
        this.materials.stickerSmiley.color.set("#2a3751"),
          this.materials.stickerScout.color.set("#34469d"),
          this.materials.stickerBottom.color.set("#34469d"),
          (this.materials.key = new E({
            metalness: 1,
            roughness: 0.6,
            color: "#696969",
          }));
        break;
      case "onscout":
        this.materials.stickerSmiley.color.set("#333333"),
          this.materials.stickerScout.color.set("#ffffff"),
          this.materials.stickerBottom.color.set("#ffffff"),
          (this.materials.furnitureCouch = new E({
            metalness: 0,
            roughness: 1,
            map: this.textures.fabricColor,
          })),
          (this.materials.furnitureCouchLegs = new E({
            metalness: 0,
            roughness: 0.553,
            color: "#6D6D6D",
          })),
          (this.materials.furniturePlant = new E({
            metalness: 0,
            roughness: 0.553,
            color: "#3D8058",
          })),
          (this.materials.furnitureWhitePlastic = new E({
            metalness: 0,
            roughness: 0.553,
            color: "#C6C6C6",
          })),
          (this.materials.furnitureBlackPlastic = new E({
            metalness: 0,
            roughness: 0.5,
            color: "#373737",
          })),
          (this.materials.furnitureScreen = new E({
            metalness: 0,
            roughness: 0.1,
            color: "#4E4E4E",
          })),
          (this.materials.furnitureWood = new E({
            metalness: 0,
            roughness: 0.553,
            map: this.textures.woodColor,
            color: "#ec8a6a",
          })),
          (this.materials.furnitureWood.userData.updateEncoding = !1);
        break;
      case "isonline":
        this.materials.stickerSmiley.color.set("#563e4c"),
          this.materials.stickerScout.color.set("#b63587"),
          this.materials.stickerBottom.color.set("#b63587"),
          (this.materials.switchBackground = new E({
            metalness: 0,
            roughness: 0.5,
            map: this.textures.switchGradient,
          })),
          (this.materials.switchOutline = new E({
            metalness: 0.5,
            roughness: 0.1,
            color: "#6B6B6B",
          })),
          (this.materials.switchButton = new E({
            metalness: 0.05,
            roughness: 0.3,
            color: "#ffffff",
          }));
        break;
      case "ideasby":
        this.materials.stickerSmiley.color.set("#473824"),
          this.materials.stickerScout.color.set("#db8d1f"),
          this.materials.stickerBottom.color.set("#db8d1f"),
          (this.materials.bulbScrew = new E({
            metalness: 1,
            roughness: 0.3,
            color: "#cccccc",
          })),
          (this.materials.bulbPin = new E({
            metalness: 1,
            roughness: 0.2,
            color: "#AEAEAE",
          })),
          (this.materials.bulbTip = new E({
            metalness: 0,
            roughness: 0.553,
            color: "#4D4D4D",
          })),
          (this.materials.bulbGlow = new Eo()),
          (this.materials.bulbGlass = new E({
            color: 16777215,
            metalness: 1,
            roughness: 0.15,
            opacity: 0.35,
            transparent: !0,
          }));
        break;
      case "takemeto":
        this.materials.stickerSmiley.color.set("#333333"),
          this.materials.stickerScout.color.set("#ffffff"),
          this.materials.stickerBottom.color.set("#ffffff"),
          (this.materials.socials = new E({
            metalness: 0.2,
            roughness: 0.5,
            map: this.textures.socials,
          }));
        break;
    }
    for (const t in this.materials) {
      const i = this.materials[t];
      i.color &&
        i.userData.updateEncoding !== !1 &&
        i.color.convertSRGBToLinear();
    }
    for (const t in this.models.materials)
      this.materials[t] = this.models.materials[t];
    for (const t in this.materials) {
      const i = this.materials[t];
      i.userData.regex = new RegExp(`^${t}`);
    }
  }
  setBoxModel(e) {
    (this.boxModel = this.assets.model.scene),
      (this.boxModel.rotation.order = "YXZ"),
      (this.boxModel.rotation.x = Math.PI * 0.4),
      this.groupB.add(this.boxModel),
      this.boxModel.traverse((t) => {
        if (t.isMesh) {
          for (const i in this.materials) {
            const s = this.materials[i];
            s.userData.regex.test(t.name) && (t.material = s);
          }
          if (
            (!t.name.match(/^plasticCover/) &&
              !t.name.match(/^bulbGlass/) &&
              !t.name.match(/^bulbGlow/) &&
              !t.name.match(/^bulbPin/) &&
              ((t.castShadow = !0), (t.receiveShadow = !0)),
            t.name.match(/^bulbGlass/))
          ) {
            const i = t.parent;
            window.requestAnimationFrame(() => {
              i.add(t);
            });
          }
          if (t.name.match(/^plasticCover/)) {
            const i = t.parent;
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                i.add(t);
              });
            });
          }
          if (t.name.match(/^bulbGlow/)) {
            const i = t.parent;
            window.requestAnimationFrame(() => {
              t.removeFromParent(),
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    i.add(t);
                  });
                });
            });
          }
          (t.material.wireframe = this.models.wireframe),
            (t.frustumCulled = !1),
            window.requestAnimationFrame(() => {
              t.frustumCulled = !0;
            });
        }
      });
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    const t = e.ui.getFolder(`models/${this.name}`);
    t.addColor(this.materials.stickerScout, "color").name("stickerScoutColor"),
      this.materials.furnitureWood &&
        t
          .addColor(this.materials.furnitureWood, "color")
          .name("furnitureWoodColor"),
      this.materials.bulbGlow &&
        (t
          .add(this.materials.bulbGlow.uniforms.uFresnelOffset, "value")
          .min(-2)
          .max(2)
          .step(0.01)
          .name("uFresnelOffset"),
        t
          .add(this.materials.bulbGlow.uniforms.uFresnelScale, "value")
          .min(0)
          .max(2)
          .step(0.01)
          .name("uFresnelScale"),
        t
          .add(this.materials.bulbGlow.uniforms.uFresnelPower, "value")
          .min(1)
          .max(4)
          .step(1)
          .name("uFresnelPower")),
      this.materials.bulbGlow &&
        (t
          .add(this.materials.bulbGlass, "metalness")
          .min(0)
          .max(1)
          .step(0.001)
          .name("metalness"),
        t
          .add(this.materials.bulbGlass, "roughness")
          .min(0)
          .max(1)
          .step(0.001)
          .name("roughness"),
        t
          .add(this.materials.bulbGlass, "opacity")
          .min(0)
          .max(1)
          .step(0.001)
          .name("opacity"));
  }
  show(e = !0) {
    if (this.shown) return;
    this.shown = !0;
    const t = 0.5;
    L.killTweensOf(this.position),
      L.killTweensOf(this.rotation),
      e
        ? this.position.y > 0 &&
          ((this.olaPosition._y.current = -this.hideDistance),
          (this.olaPosition._y.from = -this.hideDistance),
          (this.olaPosition._y.to = -this.hideDistance))
        : this.position.y < 0 &&
          ((this.olaPosition._y.current = this.hideDistance),
          (this.olaPosition._y.from = this.hideDistance),
          (this.olaPosition._y.to = this.hideDistance)),
      L.fromTo(
        this.position,
        { y: e ? -this.hideDistance : this.hideDistance },
        { y: 0, duration: 1, ease: "power2.out", delay: t }
      ),
      L.fromTo(
        this.rotation,
        {
          y: e ? Math.PI * 0.5 : -Math.PI * 0.5,
          x: e ? -Math.PI * 0.5 : Math.PI * 0.5,
          duration: 1,
          ease: "power2.out",
          delay: t,
        },
        { y: 0, x: 0, duration: 1, ease: "power2.out", delay: t }
      );
  }
  hide(e = !0) {
    !this.shown ||
      ((this.shown = !1),
      L.killTweensOf(this.position),
      L.killTweensOf(this.rotation),
      L.to(this.position, {
        y: e ? this.hideDistance : -this.hideDistance,
        duration: 1,
        ease: "power2.in",
      }),
      L.fromTo(
        this.rotation,
        { y: 0, x: 0, duration: 1, ease: "power2.in" },
        {
          y: e ? -Math.PI * 0.5 : Math.PI * 0.5,
          x: e ? Math.PI * 0.5 : -Math.PI * 0.5,
          duration: 1,
          ease: "power2.in",
        }
      ));
  }
  update() {
    if (
      (this.olaPosition.set({
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      }),
      this.olaRotation.set({ x: this.rotation.x, y: this.rotation.y }),
      (this.groupA.position.x = this.olaPosition.x),
      (this.groupA.position.y = this.olaPosition.y),
      (this.groupA.position.z = this.olaPosition.z),
      (this.groupA.rotation.x = this.olaRotation.x),
      (this.groupA.rotation.y = this.olaRotation.y),
      (this.onScreen =
        this.groupA.position.y < this.hideDistance * 0.9 &&
        this.groupA.position.y > -this.hideDistance * 0.9),
      this.onScreen)
    ) {
      this.autoRotate &&
        this.boxModel &&
        ((this.boxModel.rotation.y =
          Math.sin(this.time.elapsed * 0.654 * 0.5) *
          Math.sin(this.time.elapsed * 0.789 * 0.5) *
          0.15),
        (this.boxModel.rotation.x =
          Math.PI * 0.45 +
          Math.sin(this.time.elapsed * 0.456) *
            Math.sin(this.time.elapsed * 0.123) *
            0.07));
      let e = 0,
        t = 0,
        i = 0,
        s = 0;
      this.application.isMouse &&
        ((e =
          this.mouse.normalised.y * this.cursorParallax.rotationAmplitude.x),
        (t = this.mouse.normalised.x * this.cursorParallax.rotationAmplitude.y),
        (i = this.mouse.normalised.x * this.cursorParallax.positionAmplitude.x),
        (s =
          this.mouse.normalised.y * this.cursorParallax.positionAmplitude.y)),
        (this.groupB.rotation.x +=
          (e - this.groupB.rotation.x) *
          this.cursorParallax.easing *
          this.time.delta),
        (this.groupB.rotation.y +=
          (t - this.groupB.rotation.y) *
          this.cursorParallax.easing *
          this.time.delta),
        (this.groupB.position.x +=
          (i - this.groupB.position.x) *
          this.cursorParallax.easing *
          this.time.delta),
        (this.groupB.position.y +=
          (s - this.groupB.position.y) *
          this.cursorParallax.easing *
          this.time.delta),
        this.materials &&
          this.materials.bulbGlow &&
          (this.materials.bulbGlow.uniforms.uFresnelScale.value =
            1.5 + (Math.random() - 0.5) * 0.4);
    }
  }
  resize() {
    const e =
      1 /
      Math.max(
        1,
        (this.viewport.elementHeight / this.viewport.elementWidth) * 0.7
      );
    this.groupB.scale.set(e, e, e);
  }
}
class Lo {
  constructor() {
    (this.experience = le.instance),
      (this.render = new he()),
      (this.debug = this.experience.debug),
      (this.time = this.experience.time),
      (this.viewport = this.experience.viewport),
      (this.resources = this.experience.resources),
      (this.renderer = this.render.renderer),
      (this.scene = this.render.scene),
      (this.wireframe = !1),
      (this.scrollGroup = new Ze()),
      this.scene.add(this.scrollGroup),
      (this.groupB = new Ze()),
      (this.groupB.position.y = -4),
      this.scrollGroup.add(this.groupB),
      (this.groupC = new Ze()),
      this.groupB.add(this.groupC),
      this.setScroll(),
      this.setOffset(),
      this.setTextures(),
      this.setMaterials(),
      this.setItems(),
      this.setDebug();
  }
  show() {
    L.to(this.groupB.position, { y: 0, duration: 1.5, ease: "power2.inOut" });
  }
  setScroll() {
    (this.scroll = {}),
      (this.scroll.value = 0),
      (this.scroll.target = 0),
      (this.scroll.multiplier = 0.004),
      (this.scroll.easing = 8);
  }
  setOffset() {
    (this.offset = {}),
      (this.offset.value = 0),
      (this.offset.rotationMultiplier = -0.3),
      (this.offset.go = () => {
        L.to(this.offset, { value: -1, duration: 0.7, ease: "power2.inOut" });
      }),
      (this.offset.leave = () => {
        L.to(this.offset, {
          value: 0,
          duration: 0.7,
          delay: 0.25,
          ease: "power2.inOut",
        });
      });
  }
  setTextures() {
    (this.textures = {}),
      (this.textures.stickerScout = this.resources.items.stickerScoutTexture),
      (this.textures.stickerSide = this.resources.items.stickerSideTexture),
      (this.textures.stickerSmiley = this.resources.items.stickerSmileyTexture),
      (this.textures.stickerOnscout =
        this.resources.items.stickerOnscoutTexture);
    for (const e in this.textures) {
      const t = this.textures[e];
      (t.minFilter = ps),
        (t.magFilter = Te),
        (t.wrapS = Ot),
        (t.wrapT = Ot),
        (t.flipY = !1);
    }
    (this.textures.stickerScout.anisotropy = 4),
      (this.textures.stickerSide.anisotropy = 4);
  }
  setMaterials() {
    this.materials = {};
    const e = new gi({
      debugPath: "models/materials/stickerCorner",
      texture: this.textures.stickerOnscout,
      color: "#ffffff",
      iridescentColor: "#7a7a7a",
      metalness: 1,
      roughness: 0.2,
      bumpScale: 0,
      fesnelFrequency: 2,
      positionFrequency: 4.5,
      brightnessFrequency: 0.2,
      brightnessOffset: 0.3,
      intensity: 1,
    });
    (this.materials.stickerCorner = e.material),
      (this.materials.stickerCorner.wireframe = this.wireframe),
      (this.materials.plasticCover = new E({
        color: 16777215,
        metalness: 1,
        roughness: 0.25,
        opacity: 0.2,
        transparent: !0,
      })),
      (this.materials.mold = new E({
        metalness: 0.2,
        roughness: 0.5,
        color: "#353437",
      })),
      (this.materials.base = new E({
        metalness: 0.2,
        roughness: 0.5,
        color: "#353437",
      })),
      (this.materials.plasticCover.wireframe = this.wireframe),
      (this.materials.mold.wireframe = this.wireframe),
      (this.materials.base.wireframe = this.wireframe);
    for (const t in this.materials) {
      const i = this.materials[t];
      i.userData.encodeColor !== !1 && i.color.convertSRGBToLinear();
    }
  }
  setItems() {
    (this.items = new Map()),
      this.items.set("crew", new Ve(this, "crew")),
      this.items.set("privatekey", new Ve(this, "privatekey")),
      this.items.set("onscout", new Ve(this, "onscout")),
      this.items.set("isonline", new Ve(this, "isonline")),
      this.items.set("ideasby", new Ve(this, "ideasby")),
      this.items.set("takemeto", new Ve(this, "takemeto"));
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    e.ui
      .getFolder("models")
      .add(this, "wireframe")
      .onChange(() => {
        this.scene.traverse((s) => {
          s.isMesh && (s.material.wireframe = this.wireframe);
        });
      });
    const i = e.ui.getFolder("models/materials/plasticCover");
    i.addColor(this.materials.plasticCover, "color").name("color"),
      i
        .add(this.materials.plasticCover, "metalness")
        .min(0)
        .max(1)
        .step(0.001)
        .name("metalness"),
      i
        .add(this.materials.plasticCover, "roughness")
        .min(0)
        .max(1)
        .step(0.001)
        .name("roughness"),
      i
        .add(this.materials.plasticCover, "opacity")
        .min(0)
        .max(1)
        .step(0.001)
        .name("opacity");
  }
  update() {
    if (this.viewport.vertical)
      (this.groupB.position.x = 0),
        (this.groupC.position.y = 0.15 - this.offset.value * 0.7);
    else {
      const t = this.viewport.width / this.viewport.height;
      (this.groupB.position.x = this.offset.value * t),
        (this.groupC.position.y = 0);
    }
    this.groupC.rotation.y = this.offset.value * this.offset.rotationMultiplier;
    const e = this.scroll.target * this.scroll.multiplier;
    this.scrollGroup.position.y +=
      (e - this.scrollGroup.position.y) * this.scroll.easing * this.time.delta;
    for (const [t, i] of this.items) i.update();
  }
  resize() {
    for (const [e, t] of this.items) t.resize();
  }
}
class Fo {
  constructor() {
    (this.experience = le.instance),
      (this.render = new he()),
      (this.renderer = this.render.renderer),
      (this.time = this.experience.time),
      (this.resources = this.experience.resources),
      (this.scene = this.render.scene),
      (this.intensity = 0.7),
      (this.mode = "sceneTexture"),
      (this.asBackground = !1),
      (this.pmremGenerator = new Kr(this.renderer.instance)),
      this.setDummies(),
      this.setFileTexture(),
      this.setSceneTexture(),
      this.setDebug(),
      this.updateScene();
  }
  setFileTexture() {
    (this.fileTexture = {}),
      (this.fileTexture.initialised = !1),
      (this.fileTexture.initialise = () => {
        this.fileTexture.initialised ||
          ((this.fileTexture.initialised = !0),
          this.pmremGenerator.compileEquirectangularShader(),
          (this.fileTexture.renderTarget =
            this.pmremGenerator.fromEquirectangular(
              this.resources.items.environmentMap
            )),
          (this.fileTexture.texture = this.fileTexture.renderTarget.texture));
      });
  }
  setSceneTexture() {
    (this.sceneTexture = {}),
      (this.sceneTexture.blur = 0.0064),
      (this.sceneTexture.lightColor = new ds(9482458)),
      (this.sceneTexture.lightMultiplier = 0.3),
      (this.sceneTexture.initialised = !1),
      (this.sceneTexture.update = () => {
        this.sceneTexture.scene.traverse((e) => {
          e.isPointLight &&
            (e.intensity =
              e.userData.intensity * this.sceneTexture.lightMultiplier);
        }),
          (this.sceneTexture.renderTarget = this.pmremGenerator.fromScene(
            this.sceneTexture.scene,
            this.sceneTexture.blur
          )),
          (this.sceneTexture.texture = this.sceneTexture.renderTarget.texture);
      }),
      (this.sceneTexture.initialise = () => {
        this.sceneTexture.initialised ||
          ((this.sceneTexture.initialised = !0),
          (this.sceneTexture.scene = new gs()),
          this.sceneTexture.scene.add(
            this.resources.items.environmentModel.scene
          ),
          this.sceneTexture.scene.traverse((e) => {
            if (
              (e.isPointLight &&
                ((e.color = this.sceneTexture.lightColor),
                (e.userData.intensity = e.intensity)),
              e.name.match(/^areaLight/))
            ) {
              const t = new Zr(
                16777215,
                200 * this.sceneTexture.lightMultiplier,
                e.scale.x,
                e.scale.z
              );
              (t.color = this.sceneTexture.lightColor),
                (t.rotation.x = -Math.PI * 0.5),
                e.add(t);
            }
          }),
          this.sceneTexture.update());
      });
  }
  setDummies() {
    (this.dummies = {}),
      (this.dummies.autoRotate = !0),
      (this.dummies.group = new Ze()),
      (this.dummies.group.position.z = 2.5),
      (this.dummies.group.visible = !1),
      this.scene.add(this.dummies.group),
      (this.dummies.material = new E({
        color: 16777215,
        metalness: 0,
        roughness: 0.5,
        side: Qr,
      })),
      (this.dummies.cone = new je(
        new Jr(0.5, 0.75, 32),
        this.dummies.material
      )),
      (this.dummies.cone.position.x = -2.25),
      (this.dummies.box = new je(new ms(1, 1, 1), this.dummies.material)),
      (this.dummies.box.position.x = -0.75),
      (this.dummies.sphere = new je(
        new en(0.5, 32, 32),
        this.dummies.material
      )),
      (this.dummies.sphere.position.x = 0.75),
      (this.dummies.circle = new je(new fs(0.5, 32), this.dummies.material)),
      (this.dummies.circle.position.x = 2.25),
      this.dummies.group.add(this.dummies.sphere),
      this.dummies.group.add(this.dummies.cone),
      this.dummies.group.add(this.dummies.box),
      this.dummies.group.add(this.dummies.circle);
  }
  updateScene() {
    this[this.mode].initialise(),
      this.scene.traverse((e) => {
        e.isMesh &&
          e.material.isMeshStandardMaterial &&
          ((e.material.envMap = this.texture),
          (e.material.envMapIntensity = this.intensity));
      }),
      (this.scene.background = this.asBackground
        ? this[this.mode].texture
        : null),
      (this.scene.environment = this[this.mode].texture);
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    const t = e.ui.getFolder("environmentMap"),
      i = {};
    this.resources.items.environmentMap && (i.fileTexture = "fileTexture"),
      this.resources.items.environmentModel && (i.fileTexture = "sceneTexture"),
      t
        .add(this, "mode", i)
        .name("mode")
        .onChange(() => {
          this.updateScene();
        }),
      t
        .add(this, "asBackground")
        .name("asBackground")
        .onChange(() => {
          this.updateScene();
        }),
      t
        .add(this, "intensity")
        .min(0)
        .max(3)
        .step(1e-4)
        .name("intensity")
        .onChange(() => {
          this.updateScene();
        });
    const s = e.ui.getFolder("environmentMap/sceneTexture");
    s.open(),
      s
        .addColor(this.sceneTexture, "lightColor")
        .name("lightColor")
        .min(0)
        .max(1)
        .step(0.001)
        .onFinishChange(() => {
          this.sceneTexture.update(), this.updateScene();
        }),
      s
        .add(this.sceneTexture, "lightMultiplier")
        .name("lightMultiplier")
        .min(0)
        .max(1)
        .step(0.001)
        .onFinishChange(() => {
          this.sceneTexture.update(), this.updateScene();
        }),
      s
        .add(this.sceneTexture, "blur")
        .name("blur")
        .min(0)
        .max(0.041)
        .step(1e-4)
        .onFinishChange(() => {
          this.sceneTexture.update(), this.updateScene();
        });
    const r = e.ui.getFolder("environmentMap/dummies");
    r.open(),
      r.add(this.dummies, "autoRotate").name("autoRotate"),
      r.add(this.dummies.group, "visible").name("visible"),
      r.addColor(this.dummies.material, "color").name("color"),
      r
        .add(this.dummies.material, "metalness")
        .min(0)
        .max(1)
        .step(0.001)
        .name("metalness"),
      r
        .add(this.dummies.material, "roughness")
        .min(0)
        .max(1)
        .step(0.001)
        .name("roughness");
  }
  update() {
    this.dummies.autoRotate &&
      ((this.dummies.sphere.rotation.x = this.time.elapsed * 0.35),
      (this.dummies.sphere.rotation.y = this.time.elapsed * 0.5),
      (this.dummies.cone.rotation.x = this.time.elapsed * 0.35),
      (this.dummies.cone.rotation.y = this.time.elapsed * 0.5),
      (this.dummies.box.rotation.x = this.time.elapsed * 0.35),
      (this.dummies.box.rotation.y = this.time.elapsed * 0.5),
      (this.dummies.circle.rotation.x = this.time.elapsed * 0.35),
      (this.dummies.circle.rotation.y = this.time.elapsed * 0.5));
  }
}
class Oo {
  constructor() {
    (this.experience = le.instance),
      (this.render = new he()),
      (this.renderer = this.render.renderer),
      (this.camera = this.render.camera),
      (this.resources = this.experience.resources),
      (this.scene = this.render.scene),
      this.setInstance(),
      this.setInstanceHelper(),
      this.setCameraHelper(),
      this.setDebug();
  }
  setInstance() {
    (this.instance = new tn(16777215, 25, 0, Math.PI / 1.5)),
      this.instance.position.set(2.90234, 5.81491, 3),
      (this.instance.castShadow = !0),
      (this.instance.shadow.camera.near = 5),
      (this.instance.shadow.camera.far = 20),
      (this.instance.shadow.radius = 3.3),
      this.instance.shadow.mapSize.set(2048, 2048),
      (this.instance.shadow.bias = 0),
      (this.instance.shadow.normalBias = 0),
      this.scene.add(this.instance),
      this.scene.add(this.instance.target);
  }
  setInstanceHelper() {
    (this.instanceHelper = new sn(this.instance, 5)),
      (this.instanceHelper.visible = !1),
      this.scene.add(this.instanceHelper);
  }
  setCameraHelper() {
    (this.cameraHelper = new rn(this.instance.shadow.camera)),
      (this.cameraHelper.visible = !1),
      this.scene.add(this.cameraHelper);
  }
  setCustomShadow() {
    (this.customShadow = {}),
      (this.customShadow.parameters = {}),
      (this.customShadow.parameters.lightSize = 0.025),
      (this.customShadow.parameters.frustumWidth = 5),
      (this.customShadow.parameters.nearPlane = 7),
      (this.customShadow.parameters.samples = 5),
      (this.customShadow.parameters.rings = 1),
      (this.customShadow.originalShader = Yi.shadowmap_pars_fragment),
      (this.customShadow.compileShader = () => {
        let e = this.customShadow.originalShader;
        (e = e.replace(
          "#ifdef USE_SHADOWMAP",
          `
                    #ifdef USE_SHADOWMAP

                    #define LIGHT_WORLD_SIZE ${this.customShadow.parameters.lightSize.toFixed(
                      3
                    )}
                    #define LIGHT_FRUSTUM_WIDTH ${this.customShadow.parameters.frustumWidth.toFixed(
                      3
                    )}
                    #define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH)
                    #define NEAR_PLANE ${this.customShadow.parameters.nearPlane.toFixed(
                      3
                    )}

                    #define NUM_SAMPLES ${this.customShadow.parameters.samples}
                    #define NUM_RINGS ${this.customShadow.parameters.rings}
                    #define BLOCKER_SEARCH_NUM_SAMPLES NUM_SAMPLES

                    vec2 poissonDisk[NUM_SAMPLES];

                    void initPoissonSamples( const in vec2 randomSeed ) {
                        float ANGLE_STEP = PI2 * float( NUM_RINGS ) / float( NUM_SAMPLES );
                        float INV_NUM_SAMPLES = 1.0 / float( NUM_SAMPLES );

                        // jsfiddle that shows sample pattern: https://jsfiddle.net/a16ff1p7/
                        float angle = rand( randomSeed ) * PI2;
                        float radius = INV_NUM_SAMPLES;
                        float radiusStep = radius;

                        for( int i = 0; i < NUM_SAMPLES; i ++ ) {
                            poissonDisk[i] = vec2( cos( angle ), sin( angle ) ) * pow( radius, 0.75 );
                            radius += radiusStep;
                            angle += ANGLE_STEP;
                        }
                    }

                    float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
                        return (zReceiver - zBlocker) / zBlocker;
                    }

                    float findBlocker( sampler2D shadowMap, const in vec2 uv, const in float zReceiver ) {
                        // This uses similar triangles to compute what
                        // area of the shadow map we should search
                        float searchRadius = LIGHT_SIZE_UV * ( zReceiver - NEAR_PLANE ) / zReceiver;
                        float blockerDepthSum = 0.0;
                        int numBlockers = 0;

                        for( int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++ ) {
                            float shadowMapDepth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * searchRadius));
                            if ( shadowMapDepth < zReceiver ) {
                                blockerDepthSum += shadowMapDepth;
                                numBlockers ++;
                            }
                        }

                        if( numBlockers == 0 ) return -1.0;

                        return blockerDepthSum / float( numBlockers );
                    }

                    float PCF_Filter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius ) {
                        float sum = 0.0;
                        float depth;
                        #pragma unroll_loop_start
                        for( int i = 0; i < ${
                          this.customShadow.parameters.samples
                        } ; i ++ ) {
                            depth = unpackRGBAToDepth( texture2D( shadowMap, uv + poissonDisk[ i ] * filterRadius ) );
                            if( zReceiver <= depth ) sum += 1.0;
                        }
                        #pragma unroll_loop_end
                        #pragma unroll_loop_start
                        for( int i = 0; i < ${
                          this.customShadow.parameters.samples
                        } ; i ++ ) {
                            depth = unpackRGBAToDepth( texture2D( shadowMap, uv + -poissonDisk[ i ].yx * filterRadius ) );
                            if( zReceiver <= depth ) sum += 1.0;
                        }
                        #pragma unroll_loop_end
                        return sum / ( 2.0 * float( ${
                          this.customShadow.parameters.samples
                        }  ) );
                    }

                    float PCSS ( sampler2D shadowMap, vec4 coords ) {
                        vec2 uv = coords.xy;
                        float zReceiver = coords.z; // Assumed to be eye-space z in this code

                        initPoissonSamples( uv );
                        // STEP 1: blocker search
                        float avgBlockerDepth = findBlocker( shadowMap, uv, zReceiver );

                        //There are no occluders so early out (this saves filtering)
                        if( avgBlockerDepth == -1.0 ) return 1.0;

                        // STEP 2: penumbra size
                        float penumbraRatio = penumbraSize( zReceiver, avgBlockerDepth );
                        float filterRadius = penumbraRatio * LIGHT_SIZE_UV * NEAR_PLANE / zReceiver;

                        // STEP 3: filtering
                        //return avgBlockerDepth;
                        return PCF_Filter( shadowMap, uv, zReceiver, filterRadius );
                    }
                `
        )),
          (e = e.replace(
            "#if defined( SHADOWMAP_TYPE_PCF )",
            `
                    return PCSS( shadowMap, shadowCoord );
                    #if defined( SHADOWMAP_TYPE_PCF )
                `
          )),
          (Yi.shadowmap_pars_fragment = e);
      }),
      (this.customShadow.updateSceneMaterial = () => {
        this.customShadow.compileShader(),
          this.scene.traverse((e) => {
            e.isMesh &&
              ((e.material.needsUpdate = !0),
              (e.material.customProgramCacheKey = () => Math.random()));
          });
      });
  }
  setDebug() {
    const e = this.experience.debug;
    if (!e.active) return;
    const t = e.ui.getFolder("lights");
    t
      .add(this.instance.position, "x")
      .min(-10)
      .max(10)
      .step(0.01)
      .name("positionX"),
      t
        .add(this.instance.position, "y")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("positionY"),
      t
        .add(this.instance.position, "z")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("positionZ"),
      t.add(this.instance, "castShadow"),
      t
        .add(this.instance, "intensity")
        .min(0)
        .max(50)
        .step(0.001)
        .name("intensity"),
      t.add(this.instanceHelper, "visible").name("helperVisible");
    const i = e.ui.getFolder("lights/shadow");
    i.open(),
      i.add(this.cameraHelper, "visible").name("cameraHelperVisible"),
      i
        .add(this.instance.shadow, "bias")
        .min(-0.01)
        .max(0.01)
        .step(1e-4)
        .name("bias"),
      i
        .add(this.instance.shadow, "radius")
        .min(0)
        .max(10)
        .step(0.001)
        .name("radius"),
      i
        .add(this.instance.shadow, "normalBias")
        .min(-0.1)
        .max(0.1)
        .step(1e-4)
        .name("normalBias");
  }
}
const ft = class {
  constructor(e) {
    if (ft.instance) return ft.instance;
    (ft.instance = this),
      (this.experience = le.instance),
      (this.resources = this.experience.resources),
      (this.scene = new gs()),
      (this.camera = new gn()),
      (this.renderer = new _n()),
      this.resources.on("groupEnd", (t) => {
        t.name === "base" &&
          ((this.models = new Lo()),
          (this.environmentMap = new Fo()),
          (this.lights = new Oo()));
      });
  }
  resize() {
    this.camera.resize(),
      this.renderer.resize(),
      this.models && this.models.resize();
  }
  update() {
    this.models && this.models.update(),
      this.environmentMap && this.environmentMap.update(),
      this.camera.update(),
      this.renderer.update();
  }
  destroy() {}
};
let he = ft;
St(he, "instance");
const mt = class extends bt {
  constructor(e) {
    super();
    if (mt.instance) return mt.instance;
    (mt.instance = this),
      (this.application = new We()),
      (this.domElement = e.domElement),
      (this.ready = !1),
      (this.rendererInstance = new nn({
        antialias: !0,
        powerPreference: "high-performance",
      })),
      on({ glContext: this.rendererInstance.getContext() }).then((i) => {
        (this.ready = !0),
          (this.quality = i.tier < 3 ? "low" : "high"),
          (this.time = this.application.time),
          (this.viewport = this.application.viewport),
          (this.mouse = this.application.mouse),
          (this.debug = new un()),
          (this.resources = new dn(this.rendererInstance, fn)),
          (this.render = new he()),
          window.addEventListener("resize", () => {
            this.resize();
          }),
          this.trigger("ready");
      });
  }
  update() {
    !this.ready || (this.debug.update(), this.render.update());
  }
  resize() {
    !this.ready || (this.viewport.update(), this.render.resize());
  }
};
let le = mt;
St(le, "instance");
var as = !1,
  ze,
  _i,
  xi,
  Et,
  Lt,
  pr,
  Ft,
  wi,
  yi,
  vi,
  gr,
  bi,
  Ti,
  _r,
  xr;
function H() {
  if (!as) {
    as = !0;
    var a = navigator.userAgent,
      e =
        /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
          a
        ),
      t = /(Mac OS X)|(Windows)|(Linux)/.exec(a);
    if (
      ((bi = /\b(iPhone|iP[ao]d)/.exec(a)),
      (Ti = /\b(iP[ao]d)/.exec(a)),
      (vi = /Android/i.exec(a)),
      (_r = /FBAN\/\w+;/i.exec(a)),
      (xr = /Mobile/i.exec(a)),
      (gr = !!/Win64/.exec(a)),
      e)
    ) {
      (ze = e[1] ? parseFloat(e[1]) : e[5] ? parseFloat(e[5]) : NaN),
        ze && document && document.documentMode && (ze = document.documentMode);
      var i = /(?:Trident\/(\d+.\d+))/.exec(a);
      (pr = i ? parseFloat(i[1]) + 4 : ze),
        (_i = e[2] ? parseFloat(e[2]) : NaN),
        (xi = e[3] ? parseFloat(e[3]) : NaN),
        (Et = e[4] ? parseFloat(e[4]) : NaN),
        Et
          ? ((e = /(?:Chrome\/(\d+\.\d+))/.exec(a)),
            (Lt = e && e[1] ? parseFloat(e[1]) : NaN))
          : (Lt = NaN);
    } else ze = _i = xi = Lt = Et = NaN;
    if (t) {
      if (t[1]) {
        var s = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);
        Ft = s ? parseFloat(s[1].replace("_", ".")) : !0;
      } else Ft = !1;
      (wi = !!t[2]), (yi = !!t[3]);
    } else Ft = wi = yi = !1;
  }
}
var Si = {
    ie: function () {
      return H() || ze;
    },
    ieCompatibilityMode: function () {
      return H() || pr > ze;
    },
    ie64: function () {
      return Si.ie() && gr;
    },
    firefox: function () {
      return H() || _i;
    },
    opera: function () {
      return H() || xi;
    },
    webkit: function () {
      return H() || Et;
    },
    safari: function () {
      return Si.webkit();
    },
    chrome: function () {
      return H() || Lt;
    },
    windows: function () {
      return H() || wi;
    },
    osx: function () {
      return H() || Ft;
    },
    linux: function () {
      return H() || yi;
    },
    iphone: function () {
      return H() || bi;
    },
    mobile: function () {
      return H() || bi || Ti || vi || xr;
    },
    nativeApp: function () {
      return H() || _r;
    },
    android: function () {
      return H() || vi;
    },
    ipad: function () {
      return H() || Ti;
    },
  },
  Ao = Si,
  kt = !!(
    typeof window != "undefined" &&
    window.document &&
    window.document.createElement
  ),
  Ro = {
    canUseDOM: kt,
    canUseWorkers: typeof Worker != "undefined",
    canUseEventListeners:
      kt && !!(window.addEventListener || window.attachEvent),
    canUseViewport: kt && !!window.screen,
    isInWorker: !kt,
  },
  Io = Ro,
  wr = Io,
  yr;
wr.canUseDOM &&
  (yr =
    document.implementation &&
    document.implementation.hasFeature &&
    document.implementation.hasFeature("", "") !== !0);
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */ function Bo(a, e) {
  if (!wr.canUseDOM || (e && !("addEventListener" in document))) return !1;
  var t = "on" + a,
    i = t in document;
  if (!i) {
    var s = document.createElement("div");
    s.setAttribute(t, "return;"), (i = typeof s[t] == "function");
  }
  return (
    !i &&
      yr &&
      a === "wheel" &&
      (i = document.implementation.hasFeature("Events.wheel", "3.0")),
    i
  );
}
var zo = Bo,
  No = Ao,
  Go = zo,
  ls = 10,
  hs = 40,
  us = 800;
function vr(a) {
  var e = 0,
    t = 0,
    i = 0,
    s = 0;
  return (
    "detail" in a && (t = a.detail),
    "wheelDelta" in a && (t = -a.wheelDelta / 120),
    "wheelDeltaY" in a && (t = -a.wheelDeltaY / 120),
    "wheelDeltaX" in a && (e = -a.wheelDeltaX / 120),
    "axis" in a && a.axis === a.HORIZONTAL_AXIS && ((e = t), (t = 0)),
    (i = e * ls),
    (s = t * ls),
    "deltaY" in a && (s = a.deltaY),
    "deltaX" in a && (i = a.deltaX),
    (i || s) &&
      a.deltaMode &&
      (a.deltaMode == 1 ? ((i *= hs), (s *= hs)) : ((i *= us), (s *= us))),
    i && !e && (e = i < 1 ? -1 : 1),
    s && !t && (t = s < 1 ? -1 : 1),
    { spinX: e, spinY: t, pixelX: i, pixelY: s }
  );
}
vr.getEventType = function () {
  return No.firefox() ? "DOMMouseScroll" : Go("wheel") ? "wheel" : "mousewheel";
};
var Uo = vr,
  qo = Uo;
let Ct = 0,
  ti = !1,
  ii = 0,
  si = null,
  ri = null,
  ni = !1;
class Wo extends bt {
  constructor() {
    super();
    (this.onMouseWheel = this.onMouseWheel.bind(this)),
      (this.eventName = "wheel"),
      (this.preventDefault = !0),
      document.addEventListener(this.eventName, this.onMouseWheel, {
        passive: !1,
      });
  }
  onMouseWheel(e) {
    (this.triggered = !1), this.preventDefault && e.preventDefault();
    const t = qo(e),
      i = this.testWheelByDirection(t.pixelY),
      s = this.testWheelByIdle(),
      r = this.testWheelByIncrease(t.pixelY);
    (this.triggered = i || s || r),
      this.triggered &&
        Ct &&
        (this.onWheel(Ct),
        (ni = !0),
        ri && window.clearTimeout(ri),
        (ri = window.setTimeout(() => {
          ni = !1;
        }, 200)));
  }
  testWheelByDirection(e) {
    let t = !1;
    if (e) {
      const i = e > 0 ? 1 : e < 0 ? -1 : 0;
      i !== Ct && (t = !0), (Ct = i);
    }
    return t;
  }
  testWheelByIdle() {
    let e = !1;
    return (
      si && window.clearTimeout(si),
      (si = window.setTimeout(() => {
        ti = !1;
      }, 200)),
      ti || (e = !0),
      (ti = !0),
      e
    );
  }
  testWheelByIncrease(e) {
    let t = !1;
    const i = e > 0 ? 1 : e < 0 ? -1 : 0;
    return (
      ni || (i > 0 && e > ii * 2 && (t = !0), i < 0 && e < ii * 2 && (t = !0)),
      (ii = e),
      t
    );
  }
  onWheel(e) {
    this.trigger("wheel", [e]);
  }
  destructor() {
    document.removeEventListener(this.eventName, this.onMouseWheel);
  }
}
class Yo {
  constructor() {
    (this.application = new We()),
      (this.experience = new le()),
      (this.render = new he()),
      (this.mouse = this.application.mouse),
      (this.viewport = this.application.viewport),
      (this.time = this.application.time),
      (this.index = null),
      (this.section = null),
      (this.focused = !1),
      (this.canNavigate = !1),
      (this.isBaseLoaded = !1),
      (this.isFinalLoaded = !1),
      (this.started = !1),
      (this.navigatedOnce = !1),
      (this.focusedOnce = !1),
      this.setMainIntro(),
      this.setCursors(),
      this.setMainLogo(),
      this.setJoin(),
      this.setFavicons(),
      this.experience.resources.on("groupEnd", (e) => {
        e.name === "base" &&
          ((this.isBaseLoaded = !0),
          this.setSections(),
          this.setKeyboard(),
          this.setWheel(),
          this.setSwipe(),
          this.setFocusPoints(),
          this.setScrollDown(),
          this.goToIndex(0, !0),
          this.tryStart());
      }),
      this.experience.resources.on("end", (e) => {
        this.isFinalLoaded = !0;
      });
  }
  tryStart() {
    this.started ||
      !this.intro.ended ||
      !this.isBaseLoaded ||
      ((this.started = !0),
      this.cursors.box.updateBounding(),
      this.intro.leave(),
      L.delayedCall(0.6, () => {
        this.render.models.show();
      }),
      L.delayedCall(1.7, () => {
        (this.canNavigate = !0),
          document.documentElement.classList.add("is-can-navigate"),
          this.scrollDown.show();
      }),
      L.delayedCall(1.2, () => {
        this.mainLogo.headerContainer.appendChild(this.mainLogo.element),
          this.mainLogo.headerContainer.classList.add("is-visible"),
          this.join.element.classList.add("is-visible");
      }));
  }
  setMainIntro() {
    (this.intro = {}),
      (this.intro.element = document.querySelector(".js-main-intro")),
      (this.intro.ended = !1),
      (this.intro.enter = () => {
        document.documentElement.classList.add("is-intro-entering");
      }),
      (this.intro.leave = () => {
        document.documentElement.classList.add("is-intro-leaving");
      }),
      (this.intro.end = () => {
        (this.intro.ended = !0), this.tryStart();
      }),
      L.delayedCall(1, this.intro.enter),
      L.delayedCall(this.experience.debug.active ? 1.5 : 4, this.intro.end);
  }
  setSections() {
    const e = [...document.querySelectorAll(".js-section")];
    (this.sectionsElement = document.querySelector(".js-sections")),
      (this.sections = [
        {
          name: "crew",
          color: "a48bff",
          canFocus: !0,
          element: e.find((t) => t.classList.contains("is-meauxplorer")),
          model: this.render.models.items.get("crew"),
        },
        {
          name: "privatekey",
          color: "85a5ff",
          canFocus: !0,
          element: e.find((t) => t.classList.contains("is-windowsclicker")),
          model: this.render.models.items.get("privatekey"),
        },
        {
          name: "onscout",
          color: "ffffff",
          canFocus: !0,
          element: e.find((t) => t.classList.contains("is-hazardzone")),
          model: this.render.models.items.get("onscout"),
        },
        {
          name: "isonline",
          color: "f2acf2",
          canFocus: !0,
          element: e.find((t) => t.classList.contains("is-cvenligne")),
          model: this.render.models.items.get("isonline"),
        },
        {
          name: "ideasby",
          color: "f9d77f",
          canFocus: !0,
          element: e.find((t) => t.classList.contains("is-dobber")),
          model: this.render.models.items.get("ideasby"),
        },
        {
          name: "takemeto",
          color: "ffffff",
          canFocus: !0,
          element: e.find((t) => t.classList.contains("is-loles")),
          model: this.render.models.items.get("takemeto"),
        },
      ]);
  }
  setKeyboard() {
    window.addEventListener("keydown", (e) => {
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? this.next()
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
        ? this.previous()
        : e.key === "Enter"
        ? this.goFocus()
        : e.key === "Escape" && this.leaveFocus();
    });
  }
  setWheel() {
    (this.wheel = new Wo()),
      this.wheel.on("wheel", (e) => {
        e === 1 ? this.next() : e === -1 && this.previous();
      });
  }
  setSwipe() {
    (this.swipe = {}),
      (this.swipe.minDistance = 20),
      (this.swipe.startX = 0),
      (this.swipe.startY = 0),
      (this.swipe.preventDefault = !0),
      (this.swipe.touchStart = (e) => {
        (this.swipe.startX = e.changedTouches[0].screenX),
          (this.swipe.startY = e.changedTouches[0].screenY),
          document.body.addEventListener("touchmove", this.swipe.touchMove, {
            passive: !1,
          }),
          document.body.addEventListener("touchend", this.swipe.touchEnd, {
            passive: !1,
          });
      }),
      (this.swipe.touchMove = (e) => {
        this.swipe.preventDefault && e.preventDefault();
      }),
      (this.swipe.touchEnd = (e) => {
        const t = e.changedTouches[0].screenX,
          i = e.changedTouches[0].screenY,
          s = this.swipe.startX - t,
          r = this.swipe.startY - i;
        Math.abs(s) > Math.abs(r)
          ? s > this.swipe.minDistance
            ? this.goFocus()
            : s < -this.swipe.minDistance && this.leaveFocus()
          : this.focused ||
            (r > this.swipe.minDistance
              ? this.next()
              : r < -this.swipe.minDistance && this.previous()),
          document.body.removeEventListener("touchmove", this.swipe.touchMove),
          document.body.removeEventListener("touchend", this.swipe.touchEnd);
      }),
      document.body.addEventListener("touchstart", this.swipe.touchStart);
  }
  setFocusPoints() {
    (this.focusPoints = {}),
      (this.focusPoints.elements =
        document.querySelectorAll(".js-focus-point"));
    for (const e of this.focusPoints.elements)
      e.addEventListener("click", () => {
        this.goFocus();
      });
  }
  setMainLogo() {
    (this.mainLogo = {}),
      (this.mainLogo.element = document.querySelector(".js-main-logo")),
      (this.mainLogo.pivotElement =
        this.mainLogo.element.querySelector(".js-pivot")),
      (this.mainLogo.loaderContainer = document.querySelector(
        ".js-main-logo-loader"
      )),
      (this.mainLogo.headerContainer = document.querySelector(
        ".js-main-logo-header"
      )),
      (this.mainLogo.rotateX = 0),
      (this.mainLogo.rotateY = 0),
      (this.mainLogo.easing = 5),
      this.mainLogo.element.addEventListener("click", (e) => {
        e.preventDefault(), this.focused ? this.leaveFocus() : this.goTo(0);
      });
  }
  setJoin() {
    (this.join = {}), (this.join.element = document.querySelector(".js-join"));
  }
  setFavicons() {
    (this.favicons = {}),
      (this.favicons.elements = document.querySelectorAll(".js-favicon")),
      (this.favicons.update = (e) => {
        for (const t of this.favicons.elements) {
          const i = t.dataset.href.replace("{color}", e);
          t.href = i;
        }
      });
  }
  setScrollDown() {
    (this.scrollDown = {}),
      (this.scrollDown.element = document.querySelector(".js-scroll-down")),
      (this.scrollDown.hide = () => {
        this.scrollDown.element.classList.remove("is-visible");
      }),
      (this.scrollDown.show = () => {
        this.scrollDown.element.classList.add("is-visible");
      }),
      this.scrollDown.element.addEventListener("click", (e) => {
        e.preventDefault(), this.next();
      });
  }
  setCursors() {
    (this.cursors = {}),
      (this.cursors.element = document.querySelector(".js-cursor")),
      (this.cursors.x = this.viewport.width * 0.8),
      (this.cursors.y = this.viewport.height * 0.4);
    const e = document.querySelectorAll(".js-link");
    for (const t of e)
      t.addEventListener("mouseenter", () => {
        document.documentElement.classList.add("is-hovering-link");
      }),
        t.addEventListener("mouseleave", () => {
          document.documentElement.classList.remove("is-hovering-link");
        });
    (this.cursors.box = {}),
      (this.cursors.box.bounding = null),
      (this.cursors.box.updateBounding = () => {
        (this.cursors.box.bounding =
          this.cursors.box.areaElement.getBoundingClientRect()),
          this.application.isMouse &&
            (this.cursors.box.areaElement.classList.add("is-pending"),
            window.addEventListener(
              "mousemove",
              () => {
                this.cursors.box.areaElement.classList.remove("is-pending");
              },
              { once: !0 }
            ));
      }),
      window.addEventListener("resize", this.cursors.box.updateBounding),
      (this.cursors.box.areaElement = document.querySelector(".js-box-area")),
      (this.cursors.box.hovered = !1),
      (this.cursors.box.enter = () => {
        this.cursors.box.hovered = !0;
      }),
      (this.cursors.box.leave = () => {
        this.cursors.box.hovered = !1;
      }),
      this.cursors.box.areaElement.addEventListener(
        "mouseenter",
        this.cursors.box.enter
      ),
      this.cursors.box.areaElement.addEventListener(
        "mouseleave",
        this.cursors.box.leave
      ),
      this.cursors.box.areaElement.addEventListener("click", () => {
        this.focused ? this.leaveFocus() : this.goFocus();
      }),
      this.cursors.box.updateBounding();
  }
  goToName(e) {
    const t = this.sections.findIndex((i) => i.name === e);
    if (t === -1) return !1;
    this.goToIndex(t);
  }
  goToIndex(e, t = !1, i = null) {
    if ((!this.canNavigate && !t) || (this.index === e && !t)) return;
    t ||
      ((this.canNavigate = !1),
      document.documentElement.classList.remove("is-can-navigate"),
      L.delayedCall(1, () => {
        (this.canNavigate = !0),
          document.documentElement.classList.add("is-can-navigate");
      }));
    const s = this.index,
      r = e,
      n = i !== null ? i : s === null || r > s;
    if ((this.leaveFocus(), this.scrollDown.hide(), s !== null)) {
      const l = this.sections[s];
      l.model.hide(n),
        document.documentElement.classList.remove(`is-section-${l.name}`);
    }
    const o = this.sections[r];
    o.model.show(n),
      document.documentElement.classList.add(`is-section-${o.name}`),
      L.delayedCall(0.75, () => {
        this.favicons.update(o.color);
      }),
      (this.index = r),
      (this.section = o);
  }
  goTo(e) {
    if (typeof e == "string") return this.goToName(e);
    if (typeof e == "number") return this.goToIndex(e);
  }
  next() {
    this.navigatedOnce ||
      ((this.navigatedOnce = !0),
      document.documentElement.classList.add("is-navigated-once")),
      this.goToIndex((this.index + 1) % this.sections.length, !1, !0);
  }
  previous() {
    this.navigatedOnce ||
      ((this.navigatedOnce = !0),
      document.documentElement.classList.add("is-navigated-once")),
      this.goToIndex(
        this.index - 1 < 0 ? this.sections.length - 1 : this.index - 1,
        !1,
        !1
      );
  }
  goFocus() {
    this.focused ||
      !this.section ||
      !this.section.canFocus ||
      !this.canNavigate ||
      ((this.focused = !0),
      (this.canNavigate = !1),
      document.documentElement.classList.remove("is-can-navigate"),
      L.delayedCall(0.3, () => {
        (this.canNavigate = !0),
          document.documentElement.classList.add("is-can-navigate");
      }),
      this.focusedOnce ||
        ((this.focusedOnce = !0),
        document.documentElement.classList.add("is-focused-once")),
      (this.swipe.preventDefault = !1),
      this.viewport.vertical && (this.wheel.preventDefault = !1),
      document.documentElement.classList.add("is-focused"),
      this.section.element.classList.add("is-active"),
      (this.sectionsElement.scrollTop = 0),
      this.sectionsElement.classList.add("is-scrollable"),
      this.experience.render.models.offset.go(),
      (this.cursors.box.hovered = !1),
      this.cursors.box.updateBounding(),
      this.viewport.vertical &&
        L.to(this.cursors, {
          duration: 0.6,
          ease: "power2.inOut",
          x: this.viewport.width * 0.85,
          y: this.viewport.height * 0.075,
        }),
      this.scrollDown.hide(),
      this.mainLogo.headerContainer.classList.add("is-leaving"),
      this.join.element.classList.add("is-leaving"));
  }
  leaveFocus() {
    !this.focused ||
      ((this.focused = !1),
      (this.canNavigate = !1),
      document.documentElement.classList.remove("is-can-navigate"),
      L.delayedCall(0.3, () => {
        (this.canNavigate = !0),
          document.documentElement.classList.add("is-can-navigate");
      }),
      (this.swipe.preventDefault = !0),
      (this.wheel.preventDefault = !0),
      document.documentElement.classList.remove("is-focused"),
      this.section.element.classList.remove("is-active"),
      this.experience.render.models.offset.leave(),
      L.to(this.render.models.scroll, {
        target: 0,
        duration: 0.7,
        delay: 0.25,
        ease: "power2.inOut",
      }),
      (this.cursors.box.hovered = !1),
      this.cursors.box.updateBounding(),
      this.viewport.vertical &&
        L.to(this.cursors, {
          duration: 0.6,
          ease: "power2.inOut",
          x: this.viewport.width * 0.8,
          y: this.viewport.height * 0.4,
        }),
      L.delayedCall(0.6, () => {
        this.sectionsElement.classList.remove("is-scrollable"),
          this.mainLogo.headerContainer.classList.remove("is-leaving"),
          this.join.element.classList.remove("is-leaving"),
          this.navigatedOnce || this.scrollDown.show();
      }));
  }
  update() {
    if (
      (this.viewport.vertical ||
        ((this.cursors.x = this.mouse.screen.x),
        (this.cursors.y = this.mouse.screen.y)),
      (this.cursors.element.style.transform = `translate(${this.cursors.x}px, ${this.cursors.y}px)`),
      this.cursors.box.hovered
        ? document.documentElement.classList.add("is-hovering-box")
        : document.documentElement.classList.remove("is-hovering-box"),
      this.mainLogo && this.application.isMouse)
    ) {
      const e = -this.mouse.normalised.y * 20 - 15,
        t = this.mouse.normalised.x * 25;
      (this.mainLogo.rotateX +=
        (e - this.mainLogo.rotateX) * this.mainLogo.easing * this.time.delta),
        (this.mainLogo.rotateY +=
          (t - this.mainLogo.rotateY) * this.mainLogo.easing * this.time.delta),
        (this.mainLogo.pivotElement.style.transform = `rotateY(${this.mainLogo.rotateY}deg) rotateX(${this.mainLogo.rotateX}deg)`);
    }
    this.focused &&
      this.viewport.vertical &&
      this.sectionsElement &&
      (this.render.models.scroll.target = this.sectionsElement.scrollTop);
  }
}
class Xo {
  constructor(e) {
    (this.domElement = e.domElement),
      (this.width = null),
      (this.height = null),
      (this.smallestSide = null),
      (this.biggestSide = null),
      (this.pixelRatio = null),
      (this.clampedPixelRatio = null),
      (this.vertical = null);
    const t = this.domElement.getBoundingClientRect();
    (this.elementWidth = t.width),
      (this.elementHeight = t.height),
      this.update();
  }
  update() {
    (this.width = window.innerWidth),
      (this.height = window.innerHeight),
      (this.smallestSide = this.width < this.height ? this.width : this.height),
      (this.biggestSide = this.width > this.height ? this.width : this.height),
      (this.pixelRatio = window.devicePixelRatio),
      (this.clampedPixelRatio = Math.min(this.pixelRatio, 2)),
      (this.vertical = this.width / this.height < 0.8),
      this.vertical
        ? document.documentElement.classList.add("is-vertical")
        : document.documentElement.classList.remove("is-vertical");
    const e = this.domElement.getBoundingClientRect();
    (this.elementWidth = e.width), (this.elementHeight = e.height);
  }
}
class Vo {
  constructor() {
    (this.application = We.instance),
      (this.viewport = this.application.viewport),
      (this.screen = {
        x: this.viewport.width * 0.5,
        y: this.viewport.height * 0.5,
      }),
      (this.normalised = { x: 0, y: 0 }),
      window.addEventListener("mousemove", (e) => {
        (this.screen.x = e.clientX),
          (this.screen.y = e.clientY),
          (this.normalised.x = this.screen.x / this.viewport.width - 0.5),
          (this.normalised.y = this.screen.y / this.viewport.height - 0.5);
      });
  }
}
class Ho extends bt {
  constructor() {
    super();
    (this.start = Date.now() / 1e3),
      (this.current = this.start),
      (this.elapsed = 0),
      (this.delta = 16 / 1e3),
      (this.playing = !0),
      (this.tick = this.tick.bind(this)),
      this.tick();
  }
  play() {
    this.playing = !0;
  }
  pause() {
    this.playing = !1;
  }
  tick() {
    this.ticker = window.requestAnimationFrame(this.tick);
    const e = Date.now() / 1e3;
    (this.delta = e - this.current),
      (this.elapsed += this.playing ? this.delta : 0),
      (this.current = e),
      this.delta > 60 / 1e3 && (this.delta = 60 / 1e3),
      this.playing && this.trigger("tick");
  }
  stop() {
    window.cancelAnimationFrame(this.ticker);
  }
}
const pt = class {
  constructor() {
    if (pt.instance) return pt.instance;
    (pt.instance = this),
      (this.viewport = new Xo({
        domElement: document.querySelector(".experience"),
      })),
      (this.mouse = new Vo()),
      (this.time = new Ho()),
      (this.experience = new le({
        domElement: document.querySelector(".experience"),
      })),
      this.experience.on("ready", () => {
        this.navigation = new Yo();
      }),
      this.setTouch(),
      this.update();
  }
  setTouch() {
    (this.isTouch = !1),
      (this.isMouse = !1),
      window.addEventListener(
        "touchstart",
        () => {
          (this.isTouch = !0),
            document.documentElement.classList.add("is-touch");
        },
        { once: !0, passive: !0 }
      ),
      window.addEventListener(
        "mousemove",
        () => {
          this.isTouch ||
            ((this.isMouse = !0),
            document.documentElement.classList.add("is-mouse"));
        },
        { once: !0, passive: !0 }
      );
  }
  update() {
    this.experience.ready &&
      (this.experience.update(), this.navigation.update()),
      window.requestAnimationFrame(() => {
        this.update();
      });
  }
};
let We = pt;
St(We, "instance");
window.application = new We();
