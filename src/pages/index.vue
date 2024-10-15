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
  <div class="container">
    <div class="title">Bienvenue sur le Générateur de Sandwich</div>
    <div class="content" >
      <div class="generation">
        <button @click="generateAndSaveSandwich">Générer Sandwich</button>
        <div v-if="generatedSandwich" class="sandwich-list">
          <p>Sandwich généré :</p>
          <p>Pain: {{ generatedSandwich.bread }}</p>
          <p>Sauce: {{ generatedSandwich.sauce }}</p>
          <p>Fromage: {{ generatedSandwich.cheese }}</p>
          <p>Garniture: {{ generatedSandwich.filling }}</p>
          <button @click="saveGeneratedSandwich">Sauvegarder Sandwich</button>
        </div>
      </div>
      <div class="saved-list">
        <div class="subtitle">Liste des Sandwichs Sauvegardés</div>
        <input v-if="store.sandwiches.length > 1" v-model="ingredientFilter" placeholder="Filtrer par ingrédient" />
        <ul>
          <li class="sandwich-list" v-for="sandwich in filteredSandwiches" :key="sandwich.id">
            {{ sandwich.bread }}, {{ sandwich.sauce }}, {{ sandwich.cheese }}, {{ sandwich.filling }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  padding: 32px;
}
.content {
  display: flex;
  gap:32px;
}
.generation {
  margin-bottom: 32px;
  min-width: 300px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.saved-list {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 32px;
  margin-bottom: 64px;
}
li {
  padding: 16px;
}
input {
  border: 0;
  outline: 0;
  color: rgb(60, 66, 87);
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  margin-left: 16px;
  padding: 4px 8px;
  min-height: 28px;
  vertical-align: middle;
  transition: background-color .24s,box-shadow .24s;
  transition-property: background-color, box-shadow;
  transition-duration: 0.24s, 0.24s;
  transition-timing-function: ease, ease;
  transition-delay: 0s, 0s;
}
input:focus {
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(58 151 212 / 36%) 0px 0px 0px 4px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px;
}

.sandwich-list {
  font-family: "Helvetica Neue";
  text-align: center;
}
.subtitle {
  font-family: "Helvetica Neue";
  margin-bottom: 16px;
}

button {
  //margin-bottom: 32px;
  cursor: pointer;
  outline: 0;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

button:hover {
  color: #fff;
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
</style>