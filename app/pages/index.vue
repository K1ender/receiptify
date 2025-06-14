<script lang="ts" setup>
import CardPrice from "~/components/CardPrice.vue";
import CashewLinkBuilder from "~/utils/CashewLinkBuilder";
import type { ReceiptResponse } from "~~/shared/types";

const isDragging = ref(false);
const isLoading = ref(false);
const resultLinkWeb = ref("");
const resultLinkPhone = ref("");

const fileInput = useTemplateRef("fileInput");

const result = ref<ReceiptResponse | undefined>(undefined);

async function uploadFile(file: File) {
  resultLinkPhone.value = "";
  resultLinkWeb.value = "";
  const mimetype = file.type;

  if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
    alert("Only PNG and JPEG files are allowed");
    throw new Error("Only PNG and JPEG files are allowed");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await $fetch("/api/upload", {
    body: formData,
    method: "POST",
  });

  if (res.error) {
    throw new Error("You send not a real image");
  }

  result.value = res;

  resultLinkWeb.value = CashewLinkBuilder("web", res);
  resultLinkPhone.value = CashewLinkBuilder("phone", res);
}

async function handleDrop(e: DragEvent) {
  try {
    isDragging.value = false;
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file) return;
      isLoading.value = true;
      await uploadFile(file);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
  } finally {
    isLoading.value = false;
  }
}

function onDragOver() {
  isDragging.value = true;
}

function onDragLeave() {
  isDragging.value = false;
}

function handleClick() {
  fileInput.value?.click();
}

function handleFileInput(e: Event) {
  isLoading.value = true;
  try {
    if (e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (!file) return;
        uploadFile(file);
      }
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="hero">
    <div
class="card upload-area" @click="handleClick" @drop.prevent="handleDrop" @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave">
      <Icon size="5rem" name="mdi:dropbox" />
      <p v-if="!isLoading">
        {{ isDragging ? "Feed me a file" : "Drag one file to this drop zone." }}
      </p>
      <p v-else>Loading...</p>
      <input ref="fileInput" type="file" hidden accept="image/png, image/jpeg" @change="handleFileInput">
    </div>

    <div class="card">
      <p>{{ result?.store.name ? result.store.name : "Result: " }}</p>
      <div class="result">
        <ul>
          <li v-for="item in result?.items" :key="item.id">
            <CardPrice :item="item" :currency="result?.currency" />
          </li>
        </ul>
      </div>
    </div>
    <div v-if="resultLinkWeb" class="card links">
      <a class="link" :href="resultLinkWeb" target="_blank">Add to Cashew (WEB)</a>
      <a class="link" :href="resultLinkPhone" target="_blank">Add to Cashew (PHONE)</a>
    </div>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--gap-6);

  .card {
    width: var(--width-sm);
    display: flex;
    align-items: center;
    flex-direction: column;

    border: var(--border-1) solid var(--text-color);
    border-radius: var(--card-rounded);
    padding: var(--padding-6);

    box-shadow: var(--card-shadow-x) var(--card-shadow-y) var(--card-shadow-blur) var(--card-shadow-spread) var(--card-shadow-color);
  }
}

.upload-area {
  cursor: pointer;
}

.result {
  width: 100%;
  padding-top: var(--padding-4);
}

ul {
  list-style: none;
  gap: var(--gap-6);
  display: flex;
  flex-direction: column;
}

.link {
  display: block;

  padding: var(--padding-4) var(--padding-6);
  background-color: var(--blue-700);
  color: white;
  border: none;
  border-radius: 0.375rem;
  text-align: center;
  text-decoration: none;
  width: 100%;

  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}


.like:hover {
  background-color: var(--blue-600);
}

.links {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
