<template>
  <div class="code-editor-wrapper">
    <div class="flex justify-between items-center mb-2">
      <label class="block text-sm font-medium text-orange-800">Code Snippet</label>
      <select
        v-model="selectedLanguage"
        @change="updateLanguage"
        class="px-3 py-1 border border-orange-200 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white text-sm"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="react">React (JSX)</option>
        <option value="angular">Angular (TypeScript)</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
        <option value="rust">Rust</option>
        <option value="go">Go</option>
        <option value="php">PHP</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="vue">Vue</option>
        <option value="sass">Sass/SCSS</option>
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="sql">SQL</option>
        <option value="markdown">Markdown</option>
      </select>
    </div>
    <div ref="editorRef" class="border border-orange-200 rounded-xl overflow-hidden"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { xml } from '@codemirror/lang-xml'
import { sql } from '@codemirror/lang-sql'
import { php } from '@codemirror/lang-php'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { rust } from '@codemirror/lang-rust'
import { go } from '@codemirror/lang-go'
import { vue } from '@codemirror/lang-vue'
import { sass } from '@codemirror/lang-sass'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  }
})

const emit = defineEmits(['update:modelValue', 'update:language'])

const editorRef = ref(null)
const selectedLanguage = ref(props.language)
let editorView = null

const languageExtensions = {
  javascript: javascript({ typescript: false, jsx: false }),
  typescript: javascript({ typescript: true, jsx: false }),
  react: javascript({ typescript: false, jsx: true }),
  angular: javascript({ typescript: true, jsx: false }),
  csharp: java(), // C# uses similar syntax to Java
  python: python(),
  html: html(),
  css: css(),
  json: json(),
  markdown: markdown(),
  xml: xml(),
  sql: sql(),
  php: php(),
  java: java(),
  cpp: cpp(),
  rust: rust(),
  go: go(),
  vue: vue(),
  sass: sass()
}

const createEditor = () => {
  if (!editorRef.value) return

  const startState = EditorState.create({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      languageExtensions[selectedLanguage.value],
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          emit('update:modelValue', update.state.doc.toString())
        }
      }),
      EditorView.theme({
        '&': {
          fontSize: '14px',
          border: 'none'
        },
        '.cm-content': {
          minHeight: '150px',
          fontFamily: 'monospace'
        },
        '.cm-scroller': {
          overflow: 'auto'
        }
      })
    ]
  })

  editorView = new EditorView({
    state: startState,
    parent: editorRef.value
  })
}

const updateLanguage = () => {
  emit('update:language', selectedLanguage.value)

  if (editorView) {
    const currentDoc = editorView.state.doc.toString()
    editorView.destroy()

    const newState = EditorState.create({
      doc: currentDoc,
      extensions: [
        basicSetup,
        languageExtensions[selectedLanguage.value],
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit('update:modelValue', update.state.doc.toString())
          }
        }),
        EditorView.theme({
          '&': {
            fontSize: '14px',
            border: 'none'
          },
          '.cm-content': {
            minHeight: '150px',
            fontFamily: 'monospace'
          },
          '.cm-scroller': {
            overflow: 'auto'
          }
        })
      ]
    })

    editorView = new EditorView({
      state: newState,
      parent: editorRef.value
    })
  }
}

watch(() => props.modelValue, (newValue) => {
  if (editorView && newValue !== editorView.state.doc.toString()) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newValue
      }
    })
  }
})

watch(() => props.language, (newLanguage) => {
  selectedLanguage.value = newLanguage
  updateLanguage()
})

onMounted(() => {
  createEditor()
})
</script>

<style scoped>
.code-editor-wrapper :deep(.cm-editor) {
  background-color: #f9fafb;
}

.code-editor-wrapper :deep(.cm-gutters) {
  background-color: #f3f4f6;
  border-right: 1px solid #e5e7eb;
}
</style>

