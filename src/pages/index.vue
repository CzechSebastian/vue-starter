<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDefaultStore } from '@/stores/use-default-store';

const store = useDefaultStore();
const generatedSandwich = ref<{ bread: string, sauce: string, cheese: string, filling: string } | null>(null);
const ingredientFilter = ref<string>('');

const generateAndSaveSandwich = () => {
  generatedSandwich.value = store.generateSandwich();
};

const saveGeneratedSandwich = () => {
  if (generatedSandwich.value) {
    store.saveSandwich(generatedSandwich.value);
    generatedSandwich.value = null;  // Reset after saving
  }
};

const filteredSandwiches = computed(() => {
  if (ingredientFilter.value.trim() !== '') {
    return store.filterSandwiches(ingredientFilter.value);
  }
  return store.sandwiches;
});
</script>

<template>
  <div>
    <h3>Bienvenue sur le Générateur de Sandwich</h3>
    <button @click="generateAndSaveSandwich">Générer Sandwich</button>
    <div v-if="generatedSandwich">
      <p>Sandwich généré :</p>
      <p>Pain: {{ generatedSandwich.bread }}</p>
      <p>Sauce: {{ generatedSandwich.sauce }}</p>
      <p>Fromage: {{ generatedSandwich.cheese }}</p>
      <p>Garniture: {{ generatedSandwich.filling }}</p>
      <button @click="saveGeneratedSandwich">Sauvegarder Sandwich</button>
    </div>

    <h3>Liste des Sandwichs Sauvegardés</h3>
    <input v-model="ingredientFilter" placeholder="Filtrer par ingrédient" />
    <ul>
      <li v-for="sandwich in filteredSandwiches" :key="sandwich.id">
        {{ sandwich.bread }}, {{ sandwich.sauce }}, {{ sandwich.cheese }}, {{ sandwich.filling }}
      </li>
    </ul>
  </div>
</template>