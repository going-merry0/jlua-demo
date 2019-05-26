<template>
  <div id="ast" class="two-split">
    <monaco-editor 
      class="editor" 
      v-model="code" 
      language="lua"
      :amdRequire="amdRequire"
      :options="editorCfg"></monaco-editor>
    <monaco-editor 
      class="editor1" 
      v-model="js" 
      language="javascript"
      :options="editorCfg"></monaco-editor>
  </div>
</template>

<script lang="lua">
local MonacoEditor = require('vue-monaco')
local m = {
  data = function() 
    return {
      editorCfg = {
        minimap = {
          enabled = false
        }
      },
      code = '',
      js = ''
    }
  end,

  watch = {
    code = function(v, ov) 
      this.compile(v)
    end
  },

  methods = {
    compile = function(code) 
      local me = this;
      fetch('http://localhost:8081/js', {
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
        me.js = resp.data
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

.editor1 {
  width: 49%;
  height: calc(100vh - 30px);
}
</style>