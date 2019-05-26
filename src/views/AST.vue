<template>
  <div id="ast" class="two-split">
    <monaco-editor 
      class="editor" 
      v-model="code" 
      language="lua"
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
local compile = require('jlua/lib/js/compile')
local lexer = require('jlua/lib/lexer')
local Lexer = lexer.Lexer
local Source = lexer.Source
local Parser = require('jlua/lib/parser').Parser
local YamlVisitor = require('jlua/lib/visitor').YamlVisitor

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
      local src = Source.new(code, "stdin")
      local lexer = Lexer.new(src)
      local parser = Parser.new(lexer)
      local chk = parser.parseChunk()
      local v = YamlVisitor.new()
      this.ast = v.visitChunk(chk)
    end
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

