<template>
  <div id="ast" class="two-split">
    <monaco-editor 
      class="editor" 
      v-model="code" 
      language="lua"
      :amdRequire="amdRequire"
      :options="editorCfg"></monaco-editor>
    <vue-json-pretty
      class="json-viewer"
      :path="'res'"
      :data="ast"
      @click="handleClick"
    ></vue-json-pretty>
  </div>
</template>

<script lang="lua">
local MonacoEditor = require('vue-monaco')
local VueJsonPretty = require('vue-json-pretty')

local m = {
  data = function() 
    return {
      editorCfg = {
        minimap = {
          enabled = false
        }
      },
      code = '',
      ast = {}
    }
  end,

  watch = {
    code = function(v, ov) 
      this.compile(v)
    end
  },

  methods = {
    handleClick = function() end,

    compile = function(code)
      local me = this;
      fetch('http://localhost:8081/ast', {
        method = 'post',
        headers = {
          ['Content-Type'] = 'application/json',
        }
        body = JSON.stringify({
          code = me.code
        })
      }).then(function(response) 
        return response.json()
      end).then(function(resp) 
        print(resp.data)
        me.ast = resp.data
      end)
    end,

    amdRequire = window.require
  },

  mounted = function()
    this.code = [[local Person = class(function(name) 
  self.name = name
end)

function Person:sayHi() 
  return "hi"
end

local SuperMan = class(Person, function(name, skill) 
  self.skill = skill
end)

function SuperMan:sayHi() 
  return super.sayHi() .. " " .. self.name
end

local sp = SuperMan("tom", "fly")
print(sp.name)
print(sp.skill)
print(sp.sayHi())]]
  end,

  components = {
    MonacoEditor = MonacoEditor
    VueJsonPretty = VueJsonPretty
  }
}

return m
</script>

<style>
.two-split {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editor {
  width: 50%;
  height: calc(100vh - 30px);
}

.json-viewer {
  width: 49%;
  height: calc(100vh - 30px);
  overflow: scroll;
}
</style>

