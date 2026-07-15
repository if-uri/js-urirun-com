# js-urirun-com

js-urirun-com

## Contents

- [Metadata](#metadata)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Node.js Scripts (`package.json`)](#nodejs-scripts-packagejson)
- [Code Analysis](#code-analysis)
- [Call Graph](#call-graph)
- [Intent](#intent)

## Metadata

- **name**: `js-urirun-com`
- **version**: `0.0.0`
- **ecosystem**: SUMD + DOQL + testql + taskfile
- **generated_from**: app.doql.less, package.json, project/(3 analysis files)

## Architecture

```
SUMD (description) → DOQL/source (code) → taskfile (automation) → testql (verification)
```

### DOQL Application Declaration (`app.doql.less`)

```less markpact:doql path=app.doql.less
// LESS format — define @variables here as needed

app {
  name: js-urirun-com;
  version: 0.1.0;
}

interface[type="web"] {
  type: spa;
  framework: static;
}

deploy {
  target: docker-compose;
}

environment[name="local"] {
  runtime: docker-compose;
}
```

## Configuration

```yaml
project:
  name: js-urirun-com
  version: 0.0.0
  env: local
```

## Deployment

```bash markpact:run
npm install js-urirun-com
```

## Node.js Scripts (`package.json`)

js.urirun.com — lekki tracker zdarzeń wysyłający zdarzenia strony jako URI do web.urirun.com

- `npm run build` — `terser src/urirun.js -c -m --comments false -o dist/urirun.min.js && cp src/urirun.js urirun.js`
- `npm run check` — `node --check src/urirun.js`

## Code Analysis

### `project/map.toon.yaml`

```toon markpact:analysis path=project/map.toon.yaml
# js-urirun-com | 7f 831L | javascript:2,txt:1,shell:3,json:1 | 2026-07-14
# generated in 0.00s
# stats: 76 func | 0 cls | 7 mod | CC̄=3.8 | critical:0 | cycles:0
# alerts[2]: fan-out invoke=12; fan-out invoke=12
# hotspots[5]: invoke fan=12; invoke fan=12; buildURI fan=6; mode fan=6; local fan=6
# evolution: baseline
# Keys: M=modules, D=details, i=imports, e=exports, c=classes, f=functions, m=methods
M[7]:
  local.dev.txt,8
  package.json,13
  project.sh,66
  scripts/deploy-plesk.sh,16
  src/urirun.js,362
  tree.sh,4
  urirun.js,362
D:
  urirun.js:
    e: script,s,attr,v,debugDefault,log,args,buildURI,send,uri,img,text,t,closest,sameSiteLink,normalizeURI,jsonResponse,err,wrapLocalResult,registerAction,listActions,modeName,mode,simulatedAction,invoke,mode,local,simulated,result,simulate,el,type,href,f,lastPath,onRouteChange,now,orig,ret
    script()
    s()
    attr()
    v()
    debugDefault()
    log()
    args()
    buildURI()
    send()
    uri()
    img()
    text()
    t()
    closest()
    sameSiteLink()
    normalizeURI()
    jsonResponse()
    err()
    wrapLocalResult()
    registerAction()
    listActions()
    modeName()
    mode()
    simulatedAction()
    invoke()
    mode()
    local()
    simulated()
    result()
    simulate()
    el()
    type()
    href()
    f()
    lastPath()
    onRouteChange()
    now()
    orig()
    ret()
  src/urirun.js:
    e: script,s,attr,v,debugDefault,log,args,buildURI,send,uri,img,text,t,closest,sameSiteLink,normalizeURI,jsonResponse,err,wrapLocalResult,registerAction,listActions,modeName,mode,simulatedAction,invoke,mode,local,simulated,result,simulate,el,type,href,f,lastPath,onRouteChange,now,orig,ret
    script()
    s()
    attr()
    v()
    debugDefault()
    log()
    args()
    buildURI()
    send()
    uri()
    img()
    text()
    t()
    closest()
    sameSiteLink()
    normalizeURI()
    jsonResponse()
    err()
    wrapLocalResult()
    registerAction()
    listActions()
    modeName()
    mode()
    simulatedAction()
    invoke()
    mode()
    local()
    simulated()
    result()
    simulate()
    el()
    type()
    href()
    f()
    lastPath()
    onRouteChange()
    now()
    orig()
    ret()
  local.dev.txt:
  tree.sh:
  package.json:
  project.sh:
  scripts/deploy-plesk.sh:
```

### `project/logic.pl`

```prolog markpact:analysis path=project/logic.pl
% ── Project Metadata ─────────────────────────────────────
project_metadata('js-urirun-com', '0.1.0', 'javascript').

% ── Project Files ────────────────────────────────────────
project_file('app.doql.less', 20, 'less').
project_file('project.sh', 66, 'shell').
project_file('scripts/deploy-plesk.sh', 17, 'shell').
project_file('src/urirun.js', 363, 'javascript').
project_file('tree.sh', 5, 'shell').
project_file('urirun.js', 363, 'javascript').

% ── Python Functions ─────────────────────────────────────

% ── Python Classes ───────────────────────────────────────

% ── Dependencies ─────────────────────────────────────────

% ── Makefile Targets ─────────────────────────────────────

% ── Taskfile Tasks ───────────────────────────────────────

% ── Environment Variables ────────────────────────────────

% ── TestQL Scenarios ─────────────────────────────────────

% ── Semantic Facts from SUMD.md ──────────────────────────
```

## Call Graph

*56 nodes · 66 edges · 2 modules · CC̄=3.8*

### Hubs (by degree)

| Function | CC | in | out | total |
|----------|----|----|-----|-------|
| `log` *(in urirun)* | 6 | 9 | 4 | **13** |
| `log` *(in src.urirun)* | 6 | 9 | 4 | **13** |
| `invoke` *(in urirun)* | 11 ⚠ | 1 | 12 | **13** |
| `invoke` *(in src.urirun)* | 11 ⚠ | 1 | 12 | **13** |
| `send` *(in urirun)* | 7 | 5 | 5 | **10** |
| `send` *(in src.urirun)* | 7 | 5 | 5 | **10** |
| `text` *(in urirun)* | 6 | 4 | 4 | **8** |
| `text` *(in src.urirun)* | 6 | 4 | 4 | **8** |

```toon markpact:analysis path=project/calls.toon.yaml
# code2llm call graph | /home/tom/github/if-uri/js-urirun-com
# generated in 0.02s
# nodes: 56 | edges: 66 | modules: 2
# CC̄=3.8

HUBS[20]:
  urirun.log
    CC=6  in:9  out:4  total:13
  src.urirun.log
    CC=6  in:9  out:4  total:13
  urirun.invoke
    CC=11  in:1  out:12  total:13
  src.urirun.invoke
    CC=11  in:1  out:12  total:13
  urirun.send
    CC=7  in:5  out:5  total:10
  src.urirun.send
    CC=7  in:5  out:5  total:10
  urirun.text
    CC=6  in:4  out:4  total:8
  src.urirun.text
    CC=6  in:4  out:4  total:8
  src.urirun.buildURI
    CC=6  in:1  out:6  total:7
  urirun.buildURI
    CC=6  in:1  out:6  total:7
  urirun.mode
    CC=5  in:0  out:6  total:6
  src.urirun.mode
    CC=5  in:0  out:6  total:6
  src.urirun.local
    CC=5  in:0  out:6  total:6
  urirun.local
    CC=5  in:0  out:6  total:6
  src.urirun.href
    CC=6  in:0  out:4  total:4
  src.urirun.normalizeURI
    CC=2  in:2  out:2  total:4
  src.urirun.jsonResponse
    CC=7  in:0  out:4  total:4
  src.urirun.wrapLocalResult
    CC=6  in:3  out:1  total:4
  urirun.wrapLocalResult
    CC=6  in:3  out:1  total:4
  urirun.jsonResponse
    CC=7  in:0  out:4  total:4

MODULES:
  src.urirun  [28 funcs]
    args  CC=2  out:2
    buildURI  CC=6  out:6
    el  CC=2  out:2
    f  CC=5  out:2
    href  CC=6  out:4
    img  CC=2  out:1
    invoke  CC=11  out:12
    jsonResponse  CC=7  out:4
    lastPath  CC=2  out:1
    local  CC=5  out:6
  urirun  [28 funcs]
    args  CC=2  out:2
    buildURI  CC=6  out:6
    el  CC=2  out:2
    f  CC=5  out:2
    href  CC=6  out:4
    img  CC=2  out:1
    invoke  CC=11  out:12
    jsonResponse  CC=7  out:4
    lastPath  CC=2  out:1
    local  CC=5  out:6

EDGES:
  urirun.args → urirun.log
  urirun.buildURI → urirun.now
  urirun.send → urirun.buildURI
  urirun.send → urirun.log
  urirun.uri → urirun.log
  urirun.img → urirun.log
  urirun.jsonResponse → urirun.text
  urirun.registerAction → urirun.normalizeURI
  urirun.registerAction → urirun.log
  urirun.mode → urirun.simulatedAction
  urirun.mode → urirun.log
  urirun.mode → urirun.wrapLocalResult
  urirun.invoke → urirun.normalizeURI
  urirun.invoke → urirun.modeName
  urirun.invoke → urirun.simulatedAction
  urirun.invoke → urirun.log
  urirun.invoke → urirun.wrapLocalResult
  urirun.local → urirun.simulatedAction
  urirun.local → urirun.log
  urirun.local → urirun.wrapLocalResult
  urirun.simulated → urirun.log
  urirun.simulate → urirun.invoke
  urirun.el → urirun.text
  urirun.type → urirun.text
  urirun.href → urirun.sameSiteLink
  urirun.href → urirun.send
  urirun.href → urirun.text
  urirun.f → urirun.send
  urirun.lastPath → urirun.send
  urirun.onRouteChange → urirun.send
  urirun.now → urirun.send
  urirun.orig → urirun.onRouteChange
  urirun.ret → urirun.onRouteChange
  src.urirun.args → src.urirun.log
  src.urirun.buildURI → src.urirun.now
  src.urirun.send → src.urirun.buildURI
  src.urirun.send → src.urirun.log
  src.urirun.uri → src.urirun.log
  src.urirun.img → src.urirun.log
  src.urirun.jsonResponse → src.urirun.text
  src.urirun.registerAction → src.urirun.normalizeURI
  src.urirun.registerAction → src.urirun.log
  src.urirun.mode → src.urirun.simulatedAction
  src.urirun.mode → src.urirun.log
  src.urirun.mode → src.urirun.wrapLocalResult
  src.urirun.invoke → src.urirun.normalizeURI
  src.urirun.invoke → src.urirun.modeName
  src.urirun.invoke → src.urirun.simulatedAction
  src.urirun.invoke → src.urirun.log
  src.urirun.invoke → src.urirun.wrapLocalResult
```

## Intent

js-urirun-com
