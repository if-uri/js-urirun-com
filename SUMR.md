# js-urirun-com

SUMD - Structured Unified Markdown Descriptor for AI-aware project refactorization

## Contents

- [Metadata](#metadata)
- [Architecture](#architecture)
- [Call Graph](#call-graph)
- [Refactoring Analysis](#refactoring-analysis)
- [Intent](#intent)

## Metadata

- **name**: `js-urirun-com`
- **version**: `0.0.0`
- **ecosystem**: SUMD + DOQL + testql + taskfile
- **generated_from**: app.doql.less, package.json, project/(5 analysis files)

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

## Refactoring Analysis

*Pre-refactoring snapshot — use this section to identify targets. Generated from `project/` toon files.*

### Call Graph & Complexity (`project/calls.toon.yaml`)

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

### Code Analysis (`project/analysis.toon.yaml`)

```toon markpact:analysis path=project/analysis.toon.yaml
# code2llm | 7f 831L | shell:3,javascript:2,txt:1,json:1 | 2026-07-14
# generated in 0.00s
# CC̅=3.8 | critical:0/76 | dups:0 | cycles:2

HEALTH[2]:
  🔴 CYCLE Circular dependency detected: src.urirun.buildURI -> src.urirun.now -> src.urirun.send. This indicates high coupling and may lead to infinite recursion or initialization issues.
  🔴 CYCLE Circular dependency detected: urirun.send -> urirun.buildURI -> urirun.now. This indicates high coupling and may lead to infinite recursion or initialization issues.

REFACTOR[1]:
  1. break 2 circular dependencies

PIPELINES[42]:
  [1] Src [script]: script
      PURITY: 100% pure
  [2] Src [attr]: attr
      PURITY: 100% pure
  [3] Src [debugDefault]: debugDefault
      PURITY: 100% pure
  [4] Src [args]: args → log
      PURITY: 100% pure
  [5] Src [uri]: uri → log
      PURITY: 100% pure
  [6] Src [img]: img → log
      PURITY: 100% pure
  [7] Src [closest]: closest
      PURITY: 100% pure
  [8] Src [jsonResponse]: jsonResponse → text
      PURITY: 100% pure
  [9] Src [registerAction]: registerAction → normalizeURI
      PURITY: 100% pure
  [10] Src [listActions]: listActions
      PURITY: 100% pure
  [11] Src [mode]: mode → simulatedAction
      PURITY: 100% pure
  [12] Src [local]: local → simulatedAction
      PURITY: 100% pure
  [13] Src [simulated]: simulated → log
      PURITY: 100% pure
  [14] Src [simulate]: simulate → invoke → normalizeURI
      PURITY: 100% pure
  [15] Src [el]: el → text
      PURITY: 100% pure
  [16] Src [type]: type → text
      PURITY: 100% pure
  [17] Src [href]: href → sameSiteLink
      PURITY: 100% pure
  [18] Src [f]: f → send → buildURI → now
      PURITY: 100% pure
  [19] Src [lastPath]: lastPath → send → buildURI → now
      PURITY: 100% pure
  [20] Src [orig]: orig → onRouteChange → send → buildURI → ...(1 more)
      PURITY: 100% pure
  [21] Src [ret]: ret → onRouteChange → send → buildURI → ...(1 more)
      PURITY: 100% pure
  [22] Src [script]: script
      PURITY: 100% pure
  [23] Src [attr]: attr
      PURITY: 100% pure
  [24] Src [debugDefault]: debugDefault
      PURITY: 100% pure
  [25] Src [args]: args → log
      PURITY: 100% pure
  [26] Src [uri]: uri → log
      PURITY: 100% pure
  [27] Src [img]: img → log
      PURITY: 100% pure
  [28] Src [closest]: closest
      PURITY: 100% pure
  [29] Src [jsonResponse]: jsonResponse → text
      PURITY: 100% pure
  [30] Src [registerAction]: registerAction → normalizeURI
      PURITY: 100% pure
  [31] Src [listActions]: listActions
      PURITY: 100% pure
  [32] Src [mode]: mode → simulatedAction
      PURITY: 100% pure
  [33] Src [local]: local → simulatedAction
      PURITY: 100% pure
  [34] Src [simulated]: simulated → log
      PURITY: 100% pure
  [35] Src [simulate]: simulate → invoke → normalizeURI
      PURITY: 100% pure
  [36] Src [el]: el → text
      PURITY: 100% pure
  [37] Src [type]: type → text
      PURITY: 100% pure
  [38] Src [href]: href → sameSiteLink
      PURITY: 100% pure
  [39] Src [f]: f → send → buildURI → now
      PURITY: 100% pure
  [40] Src [lastPath]: lastPath → send → buildURI → now
      PURITY: 100% pure
  [41] Src [orig]: orig → onRouteChange → send → buildURI → ...(1 more)
      PURITY: 100% pure
  [42] Src [ret]: ret → onRouteChange → send → buildURI → ...(1 more)
      PURITY: 100% pure

LAYERS:
  ./                              CC̄=3.8    ←in:0  →out:0
  │ urirun.js                  362L  0C   38m  CC=11     ←0
  │ project.sh                  66L  0C    0m  CC=0.0    ←0
  │ package.json                13L  0C    0m  CC=0.0    ←0
  │ local.dev.txt                8L  0C    0m  CC=0.0    ←0
  │ tree.sh                      4L  0C    0m  CC=0.0    ←0
  │
  src/                            CC̄=3.8    ←in:0  →out:0
  │ urirun.js                  362L  0C   38m  CC=11     ←0
  │
  scripts/                        CC̄=0.0    ←in:0  →out:0
  │ deploy-plesk.sh             16L  0C    0m  CC=0.0    ←0
  │

COUPLING: no cross-package imports detected

EXTERNAL:
  validation: run `vallm batch .` → validation.toon
  duplication: run `redup scan .` → duplication.toon
```

### Duplication (`project/duplication.toon.yaml`)

```toon markpact:analysis path=project/duplication.toon.yaml
# redup/duplication | 18 groups | 5f 810L | 2026-07-14

SUMMARY:
  files_scanned: 5
  total_lines:   810
  dup_groups:    18
  dup_fragments: 36
  saved_lines:   187
  scan_ms:       36

HOTSPOTS[2] (files with most duplication):
  src/urirun.js  dup=187L  groups=18  frags=18  (23.1%)
  urirun.js  dup=187L  groups=18  frags=18  (23.1%)

DUPLICATES[18] (ranked by impact):
  [4466dc28d8a86895] ! EXAC  invoke  L=40 N=2 saved=40 sim=1.00
      src/urirun.js:212-251  (invoke)
      urirun.js:212-251  (invoke)
  [c597ff73253698b8]   EXAC  send  L=22 N=2 saved=22 sim=1.00
      src/urirun.js:96-117  (send)
      urirun.js:96-117  (send)
  [07ec0baac863e2cf]   EXAC  buildURI  L=17 N=2 saved=17 sim=1.00
      src/urirun.js:78-94  (buildURI)
      urirun.js:78-94  (buildURI)
  [44ba172f5abf3ea5]   EXAC  jsonResponse  L=16 N=2 saved=16 sim=1.00
      src/urirun.js:148-163  (jsonResponse)
      urirun.js:148-163  (jsonResponse)
  [c09a0d22e179d5a5]   EXAC  simulatedAction  L=11 N=2 saved=11 sim=1.00
      src/urirun.js:200-210  (simulatedAction)
      urirun.js:200-210  (simulatedAction)
  [dcb5ec8443e14689]   EXAC  listActions  L=9 N=2 saved=9 sim=1.00
      src/urirun.js:182-190  (listActions)
      urirun.js:182-190  (listActions)
  [a5a7c9ddd8cc5e67]   EXAC  debugDefault  L=8 N=2 saved=8 sim=1.00
      src/urirun.js:46-53  (debugDefault)
      urirun.js:46-53  (debugDefault)
  [0513fc08c134a8df]   EXAC  closest  L=8 N=2 saved=8 sim=1.00
      src/urirun.js:127-134  (closest)
      urirun.js:127-134  (closest)
  [04147f463616d783]   EXAC  registerAction  L=8 N=2 saved=8 sim=1.00
      src/urirun.js:173-180  (registerAction)
      urirun.js:173-180  (registerAction)
  [1be9d66a15218602]   EXAC  wrapLocalResult  L=7 N=2 saved=7 sim=1.00
      src/urirun.js:165-171  (wrapLocalResult)
      urirun.js:165-171  (wrapLocalResult)
  [778d55f1e4948aee]   EXAC  modeName  L=7 N=2 saved=7 sim=1.00
      src/urirun.js:192-198  (modeName)
      urirun.js:192-198  (modeName)
  [027d36800349ee62]   EXAC  log  L=6 N=2 saved=6 sim=1.00
      src/urirun.js:70-75  (log)
      urirun.js:70-75  (log)
  [0ed306369ad744ad]   EXAC  text  L=6 N=2 saved=6 sim=1.00
      src/urirun.js:120-125  (text)
      urirun.js:120-125  (text)
  [bdcc6a0a8b649e8e]   EXAC  onRouteChange  L=6 N=2 saved=6 sim=1.00
      src/urirun.js:308-313  (onRouteChange)
      urirun.js:308-313  (onRouteChange)
  [ba38db9c4e296528]   EXAC  simulate  L=5 N=2 saved=5 sim=1.00
      src/urirun.js:253-257  (simulate)
      urirun.js:253-257  (simulate)
  [74459a7cbc754486]   EXAC  attr  L=4 N=2 saved=4 sim=1.00
      src/urirun.js:40-43  (attr)
      urirun.js:40-43  (attr)
  [c1af4985c514791f]   EXAC  sameSiteLink  L=4 N=2 saved=4 sim=1.00
      src/urirun.js:136-139  (sameSiteLink)
      urirun.js:136-139  (sameSiteLink)
  [57f058c9d66b4e09]   EXAC  normalizeURI  L=3 N=2 saved=3 sim=1.00
      src/urirun.js:144-146  (normalizeURI)
      urirun.js:144-146  (normalizeURI)

REFACTOR[18] (ranked by priority):
  [1] ◐ extract_function   → utils/invoke.py
      WHY: 2 occurrences of 40-line block across 2 files — saves 40 lines
      FILES: src/urirun.js, urirun.js
  [2] ○ extract_function   → utils/send.py
      WHY: 2 occurrences of 22-line block across 2 files — saves 22 lines
      FILES: src/urirun.js, urirun.js
  [3] ○ extract_function   → utils/buildURI.py
      WHY: 2 occurrences of 17-line block across 2 files — saves 17 lines
      FILES: src/urirun.js, urirun.js
  [4] ○ extract_function   → utils/jsonResponse.py
      WHY: 2 occurrences of 16-line block across 2 files — saves 16 lines
      FILES: src/urirun.js, urirun.js
  [5] ○ extract_function   → utils/simulatedAction.py
      WHY: 2 occurrences of 11-line block across 2 files — saves 11 lines
      FILES: src/urirun.js, urirun.js
  [6] ○ extract_function   → utils/listActions.py
      WHY: 2 occurrences of 9-line block across 2 files — saves 9 lines
      FILES: src/urirun.js, urirun.js
  [7] ○ extract_function   → utils/debugDefault.py
      WHY: 2 occurrences of 8-line block across 2 files — saves 8 lines
      FILES: src/urirun.js, urirun.js
  [8] ○ extract_function   → utils/closest.py
      WHY: 2 occurrences of 8-line block across 2 files — saves 8 lines
      FILES: src/urirun.js, urirun.js
  [9] ○ extract_function   → utils/registerAction.py
      WHY: 2 occurrences of 8-line block across 2 files — saves 8 lines
      FILES: src/urirun.js, urirun.js
  [10] ○ extract_function   → utils/wrapLocalResult.py
      WHY: 2 occurrences of 7-line block across 2 files — saves 7 lines
      FILES: src/urirun.js, urirun.js
  [11] ○ extract_function   → utils/modeName.py
      WHY: 2 occurrences of 7-line block across 2 files — saves 7 lines
      FILES: src/urirun.js, urirun.js
  [12] ○ extract_function   → utils/log.py
      WHY: 2 occurrences of 6-line block across 2 files — saves 6 lines
      FILES: src/urirun.js, urirun.js
  [13] ○ extract_function   → utils/text.py
      WHY: 2 occurrences of 6-line block across 2 files — saves 6 lines
      FILES: src/urirun.js, urirun.js
  [14] ○ extract_function   → utils/onRouteChange.py
      WHY: 2 occurrences of 6-line block across 2 files — saves 6 lines
      FILES: src/urirun.js, urirun.js
  [15] ○ extract_function   → utils/simulate.py
      WHY: 2 occurrences of 5-line block across 2 files — saves 5 lines
      FILES: src/urirun.js, urirun.js
  [16] ○ extract_function   → utils/attr.py
      WHY: 2 occurrences of 4-line block across 2 files — saves 4 lines
      FILES: src/urirun.js, urirun.js
  [17] ○ extract_function   → utils/sameSiteLink.py
      WHY: 2 occurrences of 4-line block across 2 files — saves 4 lines
      FILES: src/urirun.js, urirun.js
  [18] ○ extract_function   → utils/normalizeURI.py
      WHY: 2 occurrences of 3-line block across 2 files — saves 3 lines
      FILES: src/urirun.js, urirun.js

QUICK_WINS[13] (low risk, high savings — do first):
  [2] extract_function   saved=22L  → utils/send.py
      FILES: urirun.js, urirun.js
  [3] extract_function   saved=17L  → utils/buildURI.py
      FILES: urirun.js, urirun.js
  [4] extract_function   saved=16L  → utils/jsonResponse.py
      FILES: urirun.js, urirun.js
  [5] extract_function   saved=11L  → utils/simulatedAction.py
      FILES: urirun.js, urirun.js
  [6] extract_function   saved=9L  → utils/listActions.py
      FILES: urirun.js, urirun.js
  [7] extract_function   saved=8L  → utils/debugDefault.py
      FILES: urirun.js, urirun.js
  [8] extract_function   saved=8L  → utils/closest.py
      FILES: urirun.js, urirun.js
  [9] extract_function   saved=8L  → utils/registerAction.py
      FILES: urirun.js, urirun.js
  [10] extract_function   saved=7L  → utils/wrapLocalResult.py
      FILES: urirun.js, urirun.js
  [11] extract_function   saved=7L  → utils/modeName.py
      FILES: urirun.js, urirun.js

EFFORT_ESTIMATE (total ≈ 6.9h):
  hard   invoke                              saved=40L  ~120min
  medium send                                saved=22L  ~44min
  medium buildURI                            saved=17L  ~34min
  medium jsonResponse                        saved=16L  ~32min
  easy   simulatedAction                     saved=11L  ~22min
  easy   listActions                         saved=9L  ~18min
  easy   debugDefault                        saved=8L  ~16min
  easy   closest                             saved=8L  ~16min
  easy   registerAction                      saved=8L  ~16min
  easy   wrapLocalResult                     saved=7L  ~14min
  ... +8 more (~82min)

METRICS-TARGET:
  dup_groups:  18 → 0
  saved_lines: 187 lines recoverable
```

### Evolution / Churn (`project/evolution.toon.yaml`)

```toon markpact:analysis path=project/evolution.toon.yaml
# code2llm/evolution | 76 func | 2f | 2026-07-14
# generated in 0.00s

NEXT[0]: no refactoring needed

RISKS[0]: none

METRICS-TARGET:
  CC̄:          3.8 → ≤2.7
  max-CC:      11 → ≤5
  god-modules: 0 → 0
  high-CC(≥15): 0 → ≤0
  hub-types:   0 → ≤0

PATTERNS (language parser shared logic):
  _extract_declarations() in base.py — unified extraction for:
    - TypeScript: interfaces, types, classes, functions, arrow funcs
    - PHP: namespaces, traits, classes, functions, includes
    - Ruby: modules, classes, methods, requires
    - C++: classes, structs, functions, #includes
    - C#: classes, interfaces, methods, usings
    - Java: classes, interfaces, methods, imports
    - Go: packages, functions, structs
    - Rust: modules, functions, traits, use statements

  Shared regex patterns per language:
    - import: language-specific import/require/using patterns
    - class: class/struct/trait declarations with inheritance
    - function: function/method signatures with visibility
    - brace_tracking: for C-family languages ({ })
    - end_keyword_tracking: for Ruby (module/class/def...end)

  Benefits:
    - Consistent extraction logic across all languages
    - Reduced code duplication (~70% reduction in parser LOC)
    - Easier maintenance: fix once, apply everywhere
    - Standardized FunctionInfo/ClassInfo models

HISTORY:
  (first run — no previous data)
```

## Intent

js-urirun-com
