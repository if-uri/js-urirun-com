# System Architecture Analysis
<!-- generated in 0.00s -->

## Overview

- **Project**: /home/tom/github/if-uri/js-urirun-com
- **Primary Language**: shell
- **Languages**: shell: 3, javascript: 2, txt: 1, json: 1
- **Analysis Mode**: static
- **Total Functions**: 76
- **Total Classes**: 0
- **Modules**: 7
- **Entry Points**: 52

## Architecture by Module

### urirun
- **Functions**: 39
- **File**: `urirun.js`

### src.urirun
- **Functions**: 39
- **File**: `urirun.js`

## Key Entry Points

Main execution flows into the system:

### urirun.mode
- **Calls**: urirun.simulatedAction, urirun.log, urirun.resolve, urirun.then, urirun.handler, urirun.wrapLocalResult

### urirun.local
- **Calls**: urirun.simulatedAction, urirun.log, urirun.resolve, urirun.then, urirun.handler, urirun.wrapLocalResult

### src.urirun.mode
- **Calls**: src.urirun.simulatedAction, src.urirun.log, src.urirun.resolve, src.urirun.then, src.urirun.handler, src.urirun.wrapLocalResult

### src.urirun.local
- **Calls**: src.urirun.simulatedAction, src.urirun.log, src.urirun.resolve, src.urirun.then, src.urirun.handler, src.urirun.wrapLocalResult

### urirun.jsonResponse
- **Calls**: urirun.text, urirun.then, urirun.parse, urirun.Error

### urirun.href
- **Calls**: urirun.test, urirun.sameSiteLink, urirun.send, urirun.text

### src.urirun.jsonResponse
- **Calls**: src.urirun.text, src.urirun.then, src.urirun.parse, src.urirun.Error

### src.urirun.href
- **Calls**: src.urirun.test, src.urirun.sameSiteLink, src.urirun.send, src.urirun.text

### urirun.registerAction
- **Calls**: urirun.normalizeURI, urirun.Error, urirun.log

### urirun.listActions
- **Calls**: urirun.call, urirun.push, urirun.sort

### src.urirun.registerAction
- **Calls**: src.urirun.normalizeURI, src.urirun.Error, src.urirun.log

### src.urirun.listActions
- **Calls**: src.urirun.call, src.urirun.push, src.urirun.sort

### urirun.args
- **Calls**: urirun.log, urirun.shift

### urirun.uri
- **Calls**: urirun.sendBeacon, urirun.log

### urirun.el
- **Calls**: urirun.text, urirun.getAttribute

### urirun.type
- **Calls**: urirun.text, urirun.getAttribute

### urirun.f
- **Calls**: urirun.send, urirun.getAttribute

### urirun.orig
- **Calls**: urirun.apply, urirun.onRouteChange

### src.urirun.args
- **Calls**: src.urirun.log, src.urirun.shift

### src.urirun.uri
- **Calls**: src.urirun.sendBeacon, src.urirun.log

### src.urirun.el
- **Calls**: src.urirun.text, src.urirun.getAttribute

### src.urirun.type
- **Calls**: src.urirun.text, src.urirun.getAttribute

### src.urirun.f
- **Calls**: src.urirun.send, src.urirun.getAttribute

### src.urirun.orig
- **Calls**: src.urirun.apply, src.urirun.onRouteChange

### urirun.script
- **Calls**: urirun.getElementsByTagName

### urirun.attr
- **Calls**: urirun.getAttribute

### urirun.debugDefault
- **Calls**: urirun.test

### urirun.img
- **Calls**: urirun.log

### urirun.closest
- **Calls**: urirun.matches

### urirun.simulated
- **Calls**: urirun.log

## Process Flows

Key execution flows identified:

### Flow 1: mode
```
mode [urirun]
  └─> simulatedAction
  └─> log
```

### Flow 2: local
```
local [urirun]
  └─> simulatedAction
  └─> log
```

### Flow 3: jsonResponse
```
jsonResponse [urirun]
  └─> text
```

### Flow 4: href
```
href [urirun]
  └─> sameSiteLink
```

### Flow 5: registerAction
```
registerAction [urirun]
  └─> normalizeURI
```

### Flow 6: listActions
```
listActions [urirun]
```

### Flow 7: args
```
args [urirun]
  └─> log
```

### Flow 8: uri
```
uri [urirun]
  └─> log
```

### Flow 9: el
```
el [urirun]
  └─> text
```

### Flow 10: type
```
type [urirun]
  └─> text
```

## Data Transformation Functions

Key functions that process and transform data:

## Public API Surface

Functions exposed as public API (no underscore prefix):

- `urirun.invoke` - 12 calls
- `src.urirun.invoke` - 12 calls
- `urirun.buildURI` - 6 calls
- `urirun.mode` - 6 calls
- `urirun.local` - 6 calls
- `src.urirun.buildURI` - 6 calls
- `src.urirun.mode` - 6 calls
- `src.urirun.local` - 6 calls
- `urirun.send` - 5 calls
- `src.urirun.send` - 5 calls
- `urirun.log` - 4 calls
- `urirun.text` - 4 calls
- `urirun.jsonResponse` - 4 calls
- `urirun.href` - 4 calls
- `src.urirun.log` - 4 calls
- `src.urirun.text` - 4 calls
- `src.urirun.jsonResponse` - 4 calls
- `src.urirun.href` - 4 calls
- `urirun.registerAction` - 3 calls
- `urirun.listActions` - 3 calls
- `src.urirun.registerAction` - 3 calls
- `src.urirun.listActions` - 3 calls
- `urirun.args` - 2 calls
- `urirun.uri` - 2 calls
- `urirun.normalizeURI` - 2 calls
- `urirun.modeName` - 2 calls
- `urirun.el` - 2 calls
- `urirun.type` - 2 calls
- `urirun.f` - 2 calls
- `urirun.orig` - 2 calls
- `src.urirun.args` - 2 calls
- `src.urirun.uri` - 2 calls
- `src.urirun.normalizeURI` - 2 calls
- `src.urirun.modeName` - 2 calls
- `src.urirun.el` - 2 calls
- `src.urirun.type` - 2 calls
- `src.urirun.f` - 2 calls
- `src.urirun.orig` - 2 calls
- `urirun.script` - 1 calls
- `urirun.attr` - 1 calls

## System Interactions

How components interact:

```mermaid
graph TD
    mode --> simulatedAction
    mode --> log
    mode --> resolve
    mode --> then
    mode --> handler
    local --> simulatedAction
    local --> log
    local --> resolve
    local --> then
    local --> handler
    jsonResponse --> text
    jsonResponse --> then
    jsonResponse --> parse
    jsonResponse --> Error
    href --> test
    href --> sameSiteLink
    href --> send
    href --> text
    registerAction --> normalizeURI
    registerAction --> Error
    registerAction --> log
    listActions --> call
    listActions --> push
    listActions --> sort
    args --> log
    args --> shift
    uri --> sendBeacon
    uri --> log
    el --> text
    el --> getAttribute
```

## Reverse Engineering Guidelines

1. **Entry Points**: Start analysis from the entry points listed above
2. **Core Logic**: Focus on classes with many methods
3. **Data Flow**: Follow data transformation functions
4. **Process Flows**: Use the flow diagrams for execution paths
5. **API Surface**: Public API functions reveal the interface

## Context for LLM

Maintain the identified architectural patterns and public API surface when suggesting changes.