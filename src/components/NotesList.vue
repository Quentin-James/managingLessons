  <template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-bold text-orange-900">My Notes</h2>
        <p class="text-orange-700 font-medium">Personal notes and insights</p>
      </div>
      <button
        @click="$emit('add-note')"
        class="bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
      >
        + Add Note
      </button>
    </div>

    <div v-if="notes.length === 0" class="text-center py-12 bg-orange-50 bg-opacity-50 rounded-2xl">
      <p class="text-orange-700 text-lg">No notes yet. Create your first note!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="$emit('edit-note', $event)"
        @delete="$emit('delete-note', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import NoteCard from './NoteCard.vue'

defineProps({
  notes: {
    type: Array,
    default: () => []
  }
})

defineEmits(['add-note', 'edit-note', 'delete-note'])
</script>

